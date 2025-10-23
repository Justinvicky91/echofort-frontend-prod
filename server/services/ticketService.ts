/**
 * Ticket Service
 * Handles support ticket creation, assignment, and auto-responses
 */

import { getDb } from '../db';
import { supportTickets, ticketResponses, ticketAutoResponses, ticketAssignments, users } from '../../drizzle/schema';
import { sendTicketAcknowledgmentEmail, sendTicketResponseEmail } from './emailService';
import { eq, and, lt, sql } from 'drizzle-orm';

interface CreateTicketOptions {
  customerEmail: string;
  customerName?: string;
  customerPhone?: string;
  subject: string;
  message: string;
  source?: 'email' | 'whatsapp' | 'dashboard' | 'phone';
  attachments?: string[];
  userId?: string;
}

/**
 * Generate unique ticket number
 * Format: TKT-YYYYMMDD-XXXX
 */
function generateTicketNumber(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `TKT-${dateStr}-${random}`;
}

/**
 * Extract keywords from message for auto-response matching
 */
function extractKeywords(message: string): string[] {
  const text = message.toLowerCase();
  const keywords: string[] = [];

  // Common support topics
  if (text.includes('refund') || text.includes('money back')) {
    keywords.push('refund');
  }
  if (text.includes('cancel') || text.includes('subscription')) {
    keywords.push('cancel_subscription');
  }
  if (text.includes('login') || text.includes('password') || text.includes('forgot')) {
    keywords.push('login_issue');
  }
  if (text.includes('payment') || text.includes('billing') || text.includes('charge')) {
    keywords.push('payment_issue');
  }
  if (text.includes('app') || text.includes('download') || text.includes('install')) {
    keywords.push('app_download');
  }
  if (text.includes('how to') || text.includes('how do i')) {
    keywords.push('how_to');
  }
  if (text.includes('not working') || text.includes('error') || text.includes('bug')) {
    keywords.push('technical_issue');
  }
  if (text.includes('scam') || text.includes('fraud') || text.includes('report')) {
    keywords.push('scam_report');
  }

  return keywords;
}

/**
 * Try to auto-respond to ticket using chatbot
 */
async function tryAutoResponse(ticketId: string, message: string): Promise<{
  success: boolean;
  response?: string;
  templateId?: string;
}> {
  const db = await getDb();
  if (!db) return { success: false };

  try {
    const keywords = extractKeywords(message);
    
    if (keywords.length === 0) {
      return { success: false };
    }

    // Find matching auto-response template
    const templates = await db
      .select()
      .from(ticketAutoResponses)
      .where(
        and(
          eq(ticketAutoResponses.enabled, true),
          sql`${ticketAutoResponses.keyword} IN (${keywords.join(',')})`
        )
      )
      .limit(1);

    if (templates.length === 0) {
      return { success: false };
    }

    const template = templates[0];
    
    // Get ticket details for personalization
    const tickets = await db
      .select()
      .from(supportTickets)
      .where(eq(supportTickets.id, ticketId))
      .limit(1);

    if (tickets.length === 0) {
      return { success: false };
    }

    const ticket = tickets[0];

    // Personalize response
    const response = template.responseTemplate
      .replace(/\{\{customer_name\}\}/g, ticket.customerName || 'Customer')
      .replace(/\{\{ticket_number\}\}/g, ticket.ticketNumber);

    // Update usage count
    await db
      .update(ticketAutoResponses)
      .set({ 
        usageCount: sql`${ticketAutoResponses.usageCount} + 1`,
        updatedAt: new Date()
      })
      .where(eq(ticketAutoResponses.id, template.id));

    return {
      success: true,
      response,
      templateId: template.id
    };
  } catch (error) {
    console.error('[TicketService] Auto-response error:', error);
    return { success: false };
  }
}

/**
 * Find available support employee for ticket assignment
 */
async function findAvailableSupportEmployee(): Promise<string | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    // Find support employees with fewest open tickets
    const employees = await db
      .select({
        id: users.id,
        name: users.name,
        openTickets: sql<number>`COUNT(${supportTickets.id})`
      })
      .from(users)
      .leftJoin(
        supportTickets,
        and(
          eq(supportTickets.assignedTo, users.id),
          sql`${supportTickets.status} IN ('open', 'in_progress')`
        )
      )
      .where(eq(users.department, 'support'))
      .groupBy(users.id)
      .orderBy(sql`COUNT(${supportTickets.id}) ASC`)
      .limit(1);

    if (employees.length === 0) {
      return null;
    }

    return employees[0].id;
  } catch (error) {
    console.error('[TicketService] Error finding support employee:', error);
    return null;
  }
}

/**
 * Create support ticket
 */
export async function createSupportTicket(options: CreateTicketOptions): Promise<{
  success: boolean;
  ticketId?: string;
  ticketNumber?: string;
  autoResponded?: boolean;
}> {
  const db = await getDb();
  if (!db) {
    console.error('[TicketService] Database not available');
    return { success: false };
  }

  try {
    const ticketNumber = generateTicketNumber();
    const ticketId = `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create ticket
    await db.insert(supportTickets).values({
      id: ticketId,
      ticketNumber,
      customerEmail: options.customerEmail,
      customerName: options.customerName,
      customerPhone: options.customerPhone,
      subject: options.subject,
      message: options.message,
      source: options.source || 'email',
      userId: options.userId,
      attachments: options.attachments ? JSON.stringify(options.attachments) : null,
      status: 'open',
      priority: 'normal',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('[TicketService] Ticket created:', ticketNumber);

    // Try auto-response
    const autoResponse = await tryAutoResponse(ticketId, options.message);

    if (autoResponse.success && autoResponse.response) {
      // Add auto-response to ticket
      await db.insert(ticketResponses).values({
        id: `response_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ticketId,
        senderType: 'system',
        message: autoResponse.response,
        sentVia: options.source || 'email',
        createdAt: new Date(),
      });

      // Update ticket status
      await db
        .update(supportTickets)
        .set({
          status: 'auto_responded',
          autoResponseUsed: true,
          autoResponseTemplateId: autoResponse.templateId,
          firstResponseAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(supportTickets.id, ticketId));

      // Send auto-response email
      if (options.source === 'email') {
        await sendTicketResponseEmail(
          options.customerEmail,
          ticketNumber,
          options.subject,
          autoResponse.response,
          'EchoFort AI Assistant'
        );
      }

      console.log('[TicketService] Auto-response sent for ticket:', ticketNumber);

      return {
        success: true,
        ticketId,
        ticketNumber,
        autoResponded: true,
      };
    } else {
      // No auto-response, assign to support employee
      const employeeId = await findAvailableSupportEmployee();

      if (employeeId) {
        await db
          .update(supportTickets)
          .set({
            assignedTo: employeeId,
            updatedAt: new Date(),
          })
          .where(eq(supportTickets.id, ticketId));

        // Record assignment
        await db.insert(ticketAssignments).values({
          id: `assignment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          ticketId,
          assignedTo: employeeId,
          assignedBy: 'system',
          reason: 'Auto-assigned to available support employee',
          createdAt: new Date(),
        });

        console.log('[TicketService] Ticket assigned to employee:', employeeId);
      }

      // Send acknowledgment email
      if (options.source === 'email') {
        await sendTicketAcknowledgmentEmail(
          options.customerEmail,
          ticketNumber,
          options.subject
        );
      }

      return {
        success: true,
        ticketId,
        ticketNumber,
        autoResponded: false,
      };
    }
  } catch (error) {
    console.error('[TicketService] Error creating ticket:', error);
    return { success: false };
  }
}

/**
 * Add response to ticket
 */
export async function addTicketResponse(
  ticketId: string,
  senderType: 'customer' | 'employee' | 'system',
  message: string,
  options?: {
    senderId?: string;
    senderEmail?: string;
    senderPhone?: string;
    isInternalNote?: boolean;
    attachments?: string[];
  }
): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    const responseId = `response_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    await db.insert(ticketResponses).values({
      id: responseId,
      ticketId,
      senderType,
      senderId: options?.senderId,
      senderEmail: options?.senderEmail,
      senderPhone: options?.senderPhone,
      message,
      isInternalNote: options?.isInternalNote || false,
      attachments: options?.attachments ? JSON.stringify(options.attachments) : null,
      createdAt: new Date(),
    });

    // Update ticket
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (senderType === 'employee' && !options?.isInternalNote) {
      updateData.status = 'in_progress';
      
      // Set first response time if not set
      const tickets = await db
        .select()
        .from(supportTickets)
        .where(eq(supportTickets.id, ticketId))
        .limit(1);

      if (tickets.length > 0 && !tickets[0].firstResponseAt) {
        updateData.firstResponseAt = new Date();
      }
    }

    await db
      .update(supportTickets)
      .set(updateData)
      .where(eq(supportTickets.id, ticketId));

    console.log('[TicketService] Response added to ticket:', ticketId);
    return true;
  } catch (error) {
    console.error('[TicketService] Error adding response:', error);
    return false;
  }
}

/**
 * Check for tickets needing escalation
 */
export async function checkTicketEscalations(): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const seventyTwoHoursAgo = new Date(now.getTime() - 72 * 60 * 60 * 1000);

    // Find tickets open for more than 24 hours
    const tickets24h = await db
      .select()
      .from(supportTickets)
      .where(
        and(
          sql`${supportTickets.status} IN ('open', 'in_progress')`,
          lt(supportTickets.createdAt, twentyFourHoursAgo),
          eq(supportTickets.escalatedToAdmin, false)
        )
      );

    for (const ticket of tickets24h) {
      await db
        .update(supportTickets)
        .set({
          escalatedToAdmin: true,
          escalationReason: 'No resolution within 24 hours',
          updatedAt: new Date(),
        })
        .where(eq(supportTickets.id, ticket.id));

      console.log('[TicketService] Ticket escalated to Admin:', ticket.ticketNumber);
      
      // TODO: Create admin notification
    }

    // Find tickets open for more than 72 hours
    const tickets72h = await db
      .select()
      .from(supportTickets)
      .where(
        and(
          sql`${supportTickets.status} IN ('open', 'in_progress')`,
          lt(supportTickets.createdAt, seventyTwoHoursAgo),
          eq(supportTickets.escalatedToSuperAdmin, false)
        )
      );

    for (const ticket of tickets72h) {
      await db
        .update(supportTickets)
        .set({
          escalatedToSuperAdmin: true,
          escalationReason: 'No resolution within 72 hours - CRITICAL',
          updatedAt: new Date(),
        })
        .where(eq(supportTickets.id, ticket.id));

      console.log('[TicketService] Ticket escalated to Super Admin:', ticket.ticketNumber);
      
      // TODO: Send email to Super Admin
      // TODO: Create super admin notification
    }
  } catch (error) {
    console.error('[TicketService] Error checking escalations:', error);
  }
}

/**
 * Initialize default auto-response templates
 */
export async function initializeAutoResponses(): Promise<void> {
  const db = await getDb();
  if (!db) return;

  const templates = [
    {
      keyword: 'refund',
      category: 'billing',
      responseTemplate: `Hi {{customer_name}},

Thank you for contacting us regarding your refund request (Ticket #{{ticket_number}}).

As per our 24-hour money-back guarantee, we will process your refund within 7-10 business days. Please note:
- Refunds are only available within 24 hours of first payment
- The amount will be credited to your original payment method
- You will receive a confirmation email once processed

If you have any questions, please reply to this email.

Best regards,
EchoFort Support Team`,
    },
    {
      keyword: 'login_issue',
      category: 'technical',
      responseTemplate: `Hi {{customer_name}},

We received your request for login assistance (Ticket #{{ticket_number}}).

Please try the following steps:
1. Click "Forgot Password" on the login page
2. Enter your registered email address
3. Check your inbox for password reset link (check spam folder)
4. Create a new password

If you still cannot login, please reply with your registered email address and we will assist you further.

Best regards,
EchoFort Support Team`,
    },
    {
      keyword: 'app_download',
      category: 'general',
      responseTemplate: `Hi {{customer_name}},

Thank you for your interest in downloading the EchoFort mobile app (Ticket #{{ticket_number}}).

You can download our app from:
- Android: https://play.google.com/store/apps/details?id=com.echofort.app
- iOS: https://apps.apple.com/app/echofort/idXXXXXXXXXX

Or visit https://echofort.ai/download for QR codes.

If you need help with installation, please reply to this email.

Best regards,
EchoFort Support Team`,
    },
    {
      keyword: 'cancel_subscription',
      category: 'billing',
      responseTemplate: `Hi {{customer_name}},

We received your subscription cancellation request (Ticket #{{ticket_number}}).

You can cancel your subscription at any time from your dashboard:
1. Login to https://echofort.ai/login
2. Go to Settings → Subscription
3. Click "Cancel Subscription"

Your access will continue until the end of your current billing period. No partial refunds are provided except within the 24-hour guarantee period.

If you're experiencing issues, please let us know how we can help improve your experience.

Best regards,
EchoFort Support Team`,
    },
  ];

  try {
    for (const template of templates) {
      const existing = await db
        .select()
        .from(ticketAutoResponses)
        .where(eq(ticketAutoResponses.keyword, template.keyword))
        .limit(1);

      if (existing.length === 0) {
        await db.insert(ticketAutoResponses).values({
          id: `template_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          keyword: template.keyword,
          category: template.category,
          responseTemplate: template.responseTemplate,
          enabled: true,
          usageCount: 0,
          successRate: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    console.log('[TicketService] Auto-response templates initialized');
  } catch (error) {
    console.error('[TicketService] Error initializing templates:', error);
  }
}


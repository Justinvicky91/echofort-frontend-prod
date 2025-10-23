/**
 * Webhook Routes
 * Handles incoming webhooks from external services
 */

import { Router } from 'express';
import { createSupportTicket, addTicketResponse } from '../services/ticketService';
import { getDb } from '../db';
import { supportTickets } from '../../drizzle/schema';
import { eq, sql } from 'drizzle-orm';

const router = Router();

/**
 * SendGrid Inbound Parse Webhook
 * Receives emails sent to support@echofort.ai
 * 
 * Setup instructions:
 * 1. Go to SendGrid → Settings → Inbound Parse
 * 2. Add domain: echofort.ai
 * 3. Set subdomain: support
 * 4. Set URL: https://api.echofort.ai/webhooks/email
 * 5. Check "POST the raw, full MIME message"
 */
router.post('/email', async (req, res) => {
  try {
    console.log('[Webhook] Email received:', req.body);

    const {
      from,
      subject,
      text,
      html,
      attachments,
      to,
      headers,
    } = req.body;

    // Extract sender email (format: "Name <email@example.com>" or "email@example.com")
    const emailMatch = from.match(/<(.+?)>/) || from.match(/([^\s]+@[^\s]+)/);
    const senderEmail = emailMatch ? emailMatch[1] : from;

    // Extract sender name
    const nameMatch = from.match(/^(.+?)\s*</);
    const senderName = nameMatch ? nameMatch[1].replace(/"/g, '').trim() : undefined;

    // Check if this is a reply to existing ticket
    const ticketNumberMatch = subject.match(/TKT-\d{8}-\d{4}/);
    
    if (ticketNumberMatch) {
      // This is a reply to existing ticket
      const ticketNumber = ticketNumberMatch[0];
      
      const db = await getDb();
      if (db) {
        const tickets = await db
          .select()
          .from(supportTickets)
          .where(eq(supportTickets.ticketNumber, ticketNumber))
          .limit(1);

        if (tickets.length > 0) {
          const ticket = tickets[0];
          
          // Add customer response to ticket
          await addTicketResponse(
            ticket.id,
            'customer',
            html || text,
            {
              senderEmail,
              attachments: attachments ? JSON.parse(attachments) : undefined,
            }
          );

          console.log('[Webhook] Response added to ticket:', ticketNumber);
          
          return res.json({
            success: true,
            message: 'Response added to ticket',
            ticketNumber,
          });
        }
      }
    }

    // Create new ticket
    const result = await createSupportTicket({
      customerEmail: senderEmail,
      customerName: senderName,
      subject: subject || '(No subject)',
      message: html || text || '(Empty message)',
      source: 'email',
      attachments: attachments ? JSON.parse(attachments) : undefined,
    });

    if (result.success) {
      console.log('[Webhook] Ticket created:', result.ticketNumber);
      
      return res.json({
        success: true,
        message: 'Ticket created successfully',
        ticketNumber: result.ticketNumber,
        autoResponded: result.autoResponded,
      });
    } else {
      console.error('[Webhook] Failed to create ticket');
      return res.status(500).json({
        success: false,
        error: 'Failed to create ticket',
      });
    }
  } catch (error) {
    console.error('[Webhook] Email processing error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

/**
 * Twilio WhatsApp Webhook
 * Receives WhatsApp messages sent to support number
 * 
 * Setup instructions:
 * 1. Go to Twilio Console → Messaging → WhatsApp senders
 * 2. Select your WhatsApp number
 * 3. Set webhook URL: https://api.echofort.ai/webhooks/whatsapp
 */
router.post('/whatsapp', async (req, res) => {
  try {
    console.log('[Webhook] WhatsApp message received:', req.body);

    const {
      From,
      Body,
      MediaUrl0,
      ProfileName,
    } = req.body;

    // Remove "whatsapp:" prefix
    const phoneNumber = From.replace('whatsapp:', '');

    // Check if existing ticket for this number
    const db = await getDb();
    if (db) {
      const tickets = await db
        .select()
        .from(supportTickets)
        .where(eq(supportTickets.customerPhone, phoneNumber))
        .orderBy(sql`${supportTickets.createdAt} DESC`)
        .limit(1);

      if (tickets.length > 0) {
        const ticket = tickets[0];
        
        // Check if ticket is still open
        if (ticket.status !== 'closed') {
          // Add message to existing ticket
          await addTicketResponse(
            ticket.id,
            'customer',
            Body || '(Media message)',
            {
              senderPhone: phoneNumber,
              attachments: MediaUrl0 ? [MediaUrl0] : undefined,
            }
          );

          console.log('[Webhook] Message added to ticket:', ticket.ticketNumber);
          
          // Send acknowledgment via Twilio
          // TODO: Implement sendWhatsAppMessage function
          
          return res.status(200).send();
        }
      }
    }

    // Create new ticket
    const result = await createSupportTicket({
      customerEmail: `${phoneNumber}@whatsapp.user`, // Placeholder email
      customerName: ProfileName,
      customerPhone: phoneNumber,
      subject: 'WhatsApp Support Request',
      message: Body || '(Media message)',
      source: 'whatsapp',
      attachments: MediaUrl0 ? [MediaUrl0] : undefined,
    });

    if (result.success) {
      console.log('[Webhook] WhatsApp ticket created:', result.ticketNumber);
      
      // Send acknowledgment via Twilio
      // TODO: Implement sendWhatsAppMessage function
    }

    return res.status(200).send();
  } catch (error) {
    console.error('[Webhook] WhatsApp processing error:', error);
    return res.status(500).send();
  }
});

/**
 * Test endpoint for manual ticket creation
 * Remove in production or add authentication
 */
router.post('/test-ticket', async (req, res) => {
  try {
    const { email, name, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: email, subject, message',
      });
    }

    const result = await createSupportTicket({
      customerEmail: email,
      customerName: name,
      subject,
      message,
      source: 'dashboard',
    });

    return res.json(result);
  } catch (error) {
    console.error('[Webhook] Test ticket error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

export default router;


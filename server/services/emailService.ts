/**
 * Email Service
 * Handles all email sending via SendGrid
 */

interface EmailOptions {
  to: string;
  from?: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: Array<{
    content: string; // Base64 encoded
    filename: string;
    type: string;
    disposition: string;
  }>;
}

/**
 * Send email via SendGrid
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@echofort.ai';
  const FROM_NAME = process.env.SENDGRID_FROM_NAME || 'EchoFort';

  if (!SENDGRID_API_KEY) {
    console.error('[EmailService] SendGrid API key not configured');
    return false;
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: options.to }],
            subject: options.subject,
          },
        ],
        from: {
          email: options.from || FROM_EMAIL,
          name: FROM_NAME,
        },
        reply_to: options.replyTo ? {
          email: options.replyTo,
        } : undefined,
        content: [
          {
            type: 'text/html',
            value: options.html,
          },
          options.text ? {
            type: 'text/plain',
            value: options.text,
          } : undefined,
        ].filter(Boolean),
        attachments: options.attachments,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[EmailService] SendGrid error:', error);
      return false;
    }

    console.log('[EmailService] Email sent successfully to:', options.to);
    return true;
  } catch (error) {
    console.error('[EmailService] Failed to send email:', error);
    return false;
  }
}

/**
 * Send OTP email
 */
export async function sendOTPEmail(email: string, otp: string, purpose: string): Promise<boolean> {
  const subject = purpose === 'super_admin_login' 
    ? 'Super Admin Login - Email Verification'
    : 'Your EchoFort Verification Code';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .otp-box { background: white; border: 2px solid #4F46E5; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
        .otp-code { font-size: 32px; font-weight: bold; color: #4F46E5; letter-spacing: 5px; }
        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
        .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛡️ EchoFort</h1>
          <p>${purpose === 'super_admin_login' ? 'Super Admin Verification' : 'Email Verification'}</p>
        </div>
        <div class="content">
          <p>Hi there,</p>
          <p>${purpose === 'super_admin_login' 
            ? 'Your Super Admin login verification code is:' 
            : 'Welcome to EchoFort! Your verification code is:'}</p>
          
          <div class="otp-box">
            <div class="otp-code">${otp}</div>
            <p style="margin: 10px 0 0 0; color: #6b7280;">This code will expire in 5 minutes</p>
          </div>

          ${purpose === 'super_admin_login' ? `
            <div class="warning">
              <strong>⚠️ Security Notice:</strong> After verifying this code, you will receive a WhatsApp OTP for second-factor authentication.
            </div>
          ` : ''}

          <p>If you didn't request this code, please ignore this email.</p>

          <p>Best regards,<br>The EchoFort Team</p>
        </div>
        <div class="footer">
          <p>EchoFort - India's First AI-Powered Scam Protection Platform</p>
          <p><a href="https://echofort.ai" style="color: #4F46E5;">https://echofort.ai</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject,
    html,
    text: `Your EchoFort verification code is: ${otp}. This code will expire in 5 minutes.`,
  });
}

/**
 * Send invoice email
 */
export async function sendInvoiceEmail(
  email: string,
  invoiceNumber: string,
  amount: number,
  planName: string,
  invoicePdfUrl: string
): Promise<boolean> {
  const gstAmount = Math.round(amount * 0.18);
  const totalAmount = amount + gstAmount;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .invoice-details { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .total-row { font-weight: bold; font-size: 18px; color: #4F46E5; }
        .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Payment Successful</h1>
          <p>Thank you for subscribing to EchoFort!</p>
        </div>
        <div class="content">
          <p>Hi there,</p>
          <p>Your payment of ₹${(totalAmount / 100).toFixed(2)} has been successfully processed.</p>
          
          <div class="invoice-details">
            <h3>Invoice #${invoiceNumber}</h3>
            <div class="detail-row">
              <span>Plan:</span>
              <span>${planName}</span>
            </div>
            <div class="detail-row">
              <span>Amount:</span>
              <span>₹${(amount / 100).toFixed(2)}</span>
            </div>
            <div class="detail-row">
              <span>GST (18%):</span>
              <span>₹${(gstAmount / 100).toFixed(2)}</span>
            </div>
            <div class="detail-row total-row">
              <span>Total:</span>
              <span>₹${(totalAmount / 100).toFixed(2)}</span>
            </div>
          </div>

          <p style="text-align: center;">
            <a href="${invoicePdfUrl}" class="button">Download Invoice PDF</a>
          </p>

          <p>Your subscription is now active. You can access all features from your dashboard.</p>

          <p>If you have any questions, please contact our support team at support@echofort.ai</p>

          <p>Best regards,<br>The EchoFort Team</p>
        </div>
        <div class="footer">
          <p>EchoFort - India's First AI-Powered Scam Protection Platform</p>
          <p><a href="https://echofort.ai" style="color: #4F46E5;">https://echofort.ai</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: `Your EchoFort Invoice #${invoiceNumber}`,
    html,
    text: `Thank you for subscribing to EchoFort! Your payment of ₹${(totalAmount / 100).toFixed(2)} has been processed. Invoice: ${invoiceNumber}`,
  });
}

/**
 * Send support ticket acknowledgment email
 */
export async function sendTicketAcknowledgmentEmail(
  email: string,
  ticketNumber: string,
  subject: string
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .ticket-box { background: white; border: 2px solid #4F46E5; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .ticket-number { font-size: 24px; font-weight: bold; color: #4F46E5; }
        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎫 Support Ticket Created</h1>
        </div>
        <div class="content">
          <p>Hi there,</p>
          <p>Thank you for contacting EchoFort support. Your ticket has been created successfully.</p>
          
          <div class="ticket-box">
            <p style="margin: 0 0 10px 0; color: #6b7280;">Ticket Number:</p>
            <div class="ticket-number">${ticketNumber}</div>
            <p style="margin: 15px 0 0 0; color: #6b7280;">Subject:</p>
            <p style="margin: 5px 0 0 0;">${subject}</p>
          </div>

          <p>Our support team will respond to your inquiry within 24 hours. You will receive an email notification when we reply.</p>

          <p>To add more information to your ticket, simply reply to this email.</p>

          <p>Best regards,<br>EchoFort Support Team</p>
        </div>
        <div class="footer">
          <p>EchoFort - India's First AI-Powered Scam Protection Platform</p>
          <p><a href="https://echofort.ai" style="color: #4F46E5;">https://echofort.ai</a></p>
          <p>Need help? Reply to this email or visit <a href="https://echofort.ai/support" style="color: #4F46E5;">our support center</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    replyTo: 'support@echofort.ai',
    subject: `Re: ${subject} - Ticket #${ticketNumber}`,
    html,
    text: `Thank you for contacting EchoFort. Your ticket #${ticketNumber} has been created. We will respond within 24 hours.`,
  });
}

/**
 * Send support ticket response email
 */
export async function sendTicketResponseEmail(
  email: string,
  ticketNumber: string,
  subject: string,
  responseMessage: string,
  employeeName: string
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .response-box { background: white; border-left: 4px solid #4F46E5; padding: 20px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💬 Support Team Response</h1>
          <p>Ticket #${ticketNumber}</p>
        </div>
        <div class="content">
          <p>Hi there,</p>
          <p>Our support team has responded to your ticket:</p>
          
          <div class="response-box">
            ${responseMessage}
          </div>

          <p><strong>${employeeName}</strong><br>EchoFort Support Team</p>

          <p>If you have any follow-up questions, simply reply to this email.</p>

          <p>Best regards,<br>The EchoFort Team</p>
        </div>
        <div class="footer">
          <p>EchoFort - India's First AI-Powered Scam Protection Platform</p>
          <p><a href="https://echofort.ai" style="color: #4F46E5;">https://echofort.ai</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    replyTo: 'support@echofort.ai',
    subject: `Re: ${subject} - Ticket #${ticketNumber}`,
    html,
    text: `${responseMessage}\n\n${employeeName}\nEchoFort Support Team`,
  });
}


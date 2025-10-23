/**
 * Ticket Escalation Cron Job
 * Runs every hour to check for tickets needing escalation
 */

import { checkTicketEscalations } from '../services/ticketService';

/**
 * Start escalation check cron job
 * Runs every hour
 */
export function startEscalationCron(): void {
  console.log('[TicketEscalation] Starting escalation cron job (runs every hour)');

  // Run immediately on startup
  checkTicketEscalations().catch(error => {
    console.error('[TicketEscalation] Error in initial check:', error);
  });

  // Run every hour
  setInterval(() => {
    checkTicketEscalations().catch(error => {
      console.error('[TicketEscalation] Error in scheduled check:', error);
    });
  }, 60 * 60 * 1000); // 1 hour
}


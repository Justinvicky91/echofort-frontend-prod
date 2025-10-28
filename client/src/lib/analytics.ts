// Google Analytics Integration
// Tracks user behavior, conversions, and funnel performance

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

class Analytics {
  private initialized = false;
  private websiteId: string | null = null;

  constructor() {
    this.websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID || null;
  }

  /**
   * Initialize Google Analytics
   * Call this once when the app loads
   */
  init() {
    if (this.initialized || !this.websiteId) {
      console.warn('Analytics already initialized or website ID missing');
      return;
    }

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.websiteId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer?.push(arguments);
    };

    // Configure Google Analytics
    window.gtag('js', new Date());
    window.gtag('config', this.websiteId, {
      send_page_view: true,
      anonymize_ip: true, // GDPR compliance
    });

    this.initialized = true;
    console.log('Google Analytics initialized:', this.websiteId);
  }

  /**
   * Track page view
   * @param path - Page path (e.g., '/pricing')
   * @param title - Page title
   */
  pageView(path: string, title?: string) {
    if (!this.initialized || !window.gtag) return;

    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }

  /**
   * Track custom event
   * @param eventName - Event name (e.g., 'signup_started')
   * @param params - Event parameters
   */
  event(eventName: string, params?: Record<string, any>) {
    if (!this.initialized || !window.gtag) return;

    window.gtag('event', eventName, params);
  }

  /**
   * Track conversion (e.g., subscription purchase)
   * @param value - Transaction value
   * @param currency - Currency code (default: INR)
   * @param transactionId - Unique transaction ID
   */
  conversion(value: number, currency: string = 'INR', transactionId?: string) {
    if (!this.initialized || !window.gtag) return;

    window.gtag('event', 'purchase', {
      value,
      currency,
      transaction_id: transactionId,
    });
  }

  /**
   * Track signup funnel step
   * @param step - Funnel step (e.g., 'email_entered', 'otp_sent', 'verified')
   */
  signupFunnel(step: string) {
    this.event('signup_funnel', { step });
  }

  /**
   * Track pricing page interaction
   * @param plan - Plan name (e.g., 'Personal', 'Family')
   * @param action - Action (e.g., 'viewed', 'clicked')
   */
  pricingInteraction(plan: string, action: string) {
    this.event('pricing_interaction', { plan, action });
  }

  /**
   * Track feature usage
   * @param feature - Feature name (e.g., 'call_screening', 'message_scan')
   */
  featureUsage(feature: string) {
    this.event('feature_usage', { feature });
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Auto-initialize on import
if (typeof window !== 'undefined') {
  analytics.init();
}

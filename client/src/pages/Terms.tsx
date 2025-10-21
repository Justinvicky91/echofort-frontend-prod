import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen">
      <div className="animated-bg" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <img src="/logo.png" alt="EchoFort" className="w-8 h-8" />
                <div>
                  <span className="text-xl font-bold gradient-text block">EchoFort</span>
                </div>
              </div>
            </Link>
            <Link href="/">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="dashboard-card">
            <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
            <p className="text-muted-foreground mb-8">
              Last Updated: October 21, 2025
            </p>

            <div className="space-y-8 text-foreground/90">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing and using EchoFort's services, you accept and agree to be bound by these Terms and Conditions. 
                  If you do not agree to these terms, please do not use our services.
                </p>
                <p>
                  EchoFort is operated by [Company Name], a company registered in India under the Companies Act, 2013.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
                <p className="mb-4">
                  EchoFort provides AI-powered scam protection services including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Real-time AI call screening with Trust Factor scoring</li>
                  <li>Access to scam database with 125,000+ known scam numbers</li>
                  <li>GPS tracking for family members (Family Plan only)</li>
                  <li>Screen time monitoring and child protection features (Family Plan only)</li>
                  <li>AI image and QR code scanning (Personal and Family Plans)</li>
                  <li>Legal complaint assistance and cybercrime reporting</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Subscription Plans and Pricing</h2>
                <p className="mb-4">
                  EchoFort offers three subscription tiers:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Basic Plan:</strong> ₹399/month (including GST)</li>
                  <li><strong>Personal Plan:</strong> ₹799/month (including GST)</li>
                  <li><strong>Family Plan:</strong> ₹1,499/month (including GST)</li>
                </ul>
                <p className="mt-4">
                  All plans include a 48-hour free trial. No credit card is required to start the trial.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Subscriptions are billed monthly in advance</li>
                  <li>Payments are processed through Razorpay, Stripe, or PayPal</li>
                  <li>All prices include applicable GST as per Indian tax laws</li>
                  <li>Automatic renewal unless cancelled before the next billing cycle</li>
                  <li>We reserve the right to change pricing with 30 days' notice</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Refund Policy</h2>
                <p className="mb-4">
                  We offer a 48-hour money-back guarantee from the date of purchase:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Full refund if requested within 48 hours of initial subscription</li>
                  <li>Refunds processed within 7-10 business days</li>
                  <li>No refunds for partial months or after 48-hour window</li>
                  <li>Refunds issued to original payment method</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. User Responsibilities</h2>
                <p className="mb-4">You agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete information during registration</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Use the service only for lawful purposes</li>
                  <li>Not attempt to circumvent security measures</li>
                  <li>Not share your account with others</li>
                  <li>Comply with all applicable Indian laws and regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Data Collection and Privacy</h2>
                <p className="mb-4">
                  We collect and process personal data in accordance with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Digital Personal Data Protection Act (DPDP Act), 2023</li>
                  <li>Information Technology Act, 2000</li>
                  <li>Our Privacy Policy (available separately)</li>
                </ul>
                <p className="mt-4">
                  By using our services, you consent to data collection as described in our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Service Availability</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We strive for 99.9% uptime but do not guarantee uninterrupted service</li>
                  <li>Scheduled maintenance will be announced in advance</li>
                  <li>We are not liable for service interruptions beyond our control</li>
                  <li>Mobile app requires Android 8.0+ or iOS 13.0+</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Limitations of Liability</h2>
                <p className="mb-4">
                  EchoFort provides scam detection and protection services, but:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We cannot guarantee 100% scam detection accuracy</li>
                  <li>We are not responsible for financial losses from scams</li>
                  <li>Our service is supplementary to user vigilance</li>
                  <li>Maximum liability limited to subscription fees paid in last 12 months</li>
                  <li>We are not liable for indirect, consequential, or punitive damages</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Intellectual Property</h2>
                <p className="mb-4">
                  All content, features, and functionality of EchoFort are owned by us and protected by:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Copyright laws</li>
                  <li>Trademark laws</li>
                  <li>Patent laws (where applicable)</li>
                  <li>Trade secret laws</li>
                </ul>
                <p className="mt-4">
                  You may not copy, modify, distribute, or reverse-engineer any part of our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
                <p className="mb-4">
                  We reserve the right to terminate or suspend your account:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>For violation of these Terms</li>
                  <li>For fraudulent or illegal activity</li>
                  <li>For non-payment of subscription fees</li>
                  <li>At our discretion with or without notice</li>
                </ul>
                <p className="mt-4">
                  You may cancel your subscription at any time through your account settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">12. Governing Law and Jurisdiction</h2>
                <p className="mb-4">
                  These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in [City], India.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
                <p className="mb-4">
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. 
                  Continued use of the service constitutes acceptance of modified Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
                <p className="mb-4">
                  For questions about these Terms, contact us at:
                </p>
                <ul className="space-y-2">
                  <li><strong>Email:</strong> legal@echofort.ai</li>
                  <li><strong>Support:</strong> support@echofort.ai</li>
                  <li><strong>Address:</strong> [Company Address]</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">15. Severability</h2>
                <p>
                  If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
                </p>
              </section>
            </div>

            <div className="mt-12 p-6 bg-muted rounded-lg">
              <p className="text-sm text-center">
                By clicking "I Agree" during signup, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 bg-muted/30">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 EchoFort. All rights reserved. Made in India 🇮🇳</p>
        </div>
      </footer>
    </div>
  );
}


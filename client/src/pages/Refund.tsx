import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";

export default function Refund() {
  return (
    <div className="min-h-screen">
      <div className="animated-bg" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <img src="/logo.png" alt="EchoFort" className="w-12 h-12" />
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
            <h1 className="text-4xl font-bold mb-4">Refund and Cancellation Policy</h1>
            <p className="text-muted-foreground mb-8">
              Last Updated: October 21, 2025
            </p>

            <div className="space-y-8 text-foreground/90">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. 48-Hour Money-Back Guarantee</h2>
                <p className="mb-4">
                  We offer a 24-hour money-back guarantee on all subscription plans. If you're not satisfied 
                  with EchoFort for any reason, you can request a full refund within 24 hours of your initial purchase.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold">Eligible for Refund</h3>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• First-time subscription within 24 hours</li>
                      <li>• No previous refund requests</li>
                      <li>• Account in good standing</li>
                      <li>• Request submitted through proper channels</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <h3 className="font-semibold">Not Eligible for Refund</h3>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• After 24-hour window expires</li>
                      <li>• Renewal payments (only initial purchase)</li>
                      <li>• Violated Terms of Service</li>
                      <li>• Previous refund already issued</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. How to Request a Refund</h2>
                <p className="mb-4">To request a refund within the 24-hour window:</p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>Email us at:</strong> support@echofort.ai
                    <p className="text-sm text-muted-foreground mt-1">
                      Subject line: "Refund Request - [Your Email]"
                    </p>
                  </li>
                  <li>
                    <strong>Include the following information:</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                      <li>Your registered email address</li>
                      <li>Subscription plan name</li>
                      <li>Purchase date and transaction ID</li>
                      <li>Reason for refund (optional but helpful)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Await confirmation:</strong> We'll process your request within 24 hours
                  </li>
                  <li>
                    <strong>Refund processing:</strong> Funds returned to original payment method within 7-10 business days
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Cancellation Policy</h2>
                <p className="mb-4">
                  You can cancel your subscription at any time. Here's what happens when you cancel:
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-4">3.1 During Free Trial</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cancel anytime during the 24-hour trial period</li>
                  <li>No charges will be applied</li>
                  <li>Access continues until trial end date</li>
                  <li>No refund needed as no payment was made</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-4">3.2 After Trial Period</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cancel through your account settings or by contacting support</li>
                  <li>Access continues until the end of current billing cycle</li>
                  <li>No automatic renewal for next month</li>
                  <li>No refund for partial month usage</li>
                  <li>Data retained for 90 days after cancellation</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-4">3.3 How to Cancel</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Log in to your EchoFort account</li>
                  <li>Go to Settings → Subscription</li>
                  <li>Click "Cancel Subscription"</li>
                  <li>Confirm cancellation</li>
                  <li>Receive confirmation email</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Refund Processing Time</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Request Review:</strong> Within 24 hours of submission</li>
                  <li><strong>Approval Notification:</strong> Email confirmation sent</li>
                  <li><strong>Refund Initiation:</strong> 1-2 business days after approval</li>
                  <li><strong>Bank Processing:</strong> 5-10 business days depending on payment method</li>
                  <li><strong>Total Time:</strong> Typically 7-10 business days from approval</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Payment Method-Specific Refunds</h2>
                
                <h3 className="text-xl font-semibold mb-3 mt-4">5.1 Credit/Debit Cards</h3>
                <p className="mb-2">Refunds appear as credit on your card statement within 7-10 business days</p>

                <h3 className="text-xl font-semibold mb-3 mt-4">5.2 UPI/Net Banking</h3>
                <p className="mb-2">Refunds credited to source account within 5-7 business days</p>

                <h3 className="text-xl font-semibold mb-3 mt-4">5.3 Digital Wallets (Paytm, PhonePe, etc.)</h3>
                <p className="mb-2">Refunds credited to wallet within 3-5 business days</p>

                <h3 className="text-xl font-semibold mb-3 mt-4">5.4 International Cards</h3>
                <p className="mb-2">May take up to 15 business days due to international processing</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Exceptions and Special Cases</h2>
                
                <h3 className="text-xl font-semibold mb-3 mt-4">6.1 Technical Issues</h3>
                <p className="mb-2">
                  If you experience technical issues preventing service use, contact support immediately. 
                  We may extend your subscription or offer a refund at our discretion.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-4">6.2 Unauthorized Charges</h3>
                <p className="mb-2">
                  If you notice unauthorized charges, report immediately to support@echofort.ai. 
                  We'll investigate and issue a refund if charges were made in error.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-4">6.3 Service Downtime</h3>
                <p className="mb-2">
                  Extended service outages (&gt;24 hours) may qualify for partial refunds or service credits.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-4">6.4 Account Termination</h3>
                <p className="mb-2">
                  If we terminate your account for Terms of Service violations, no refund will be issued.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Upgrade and Downgrade Policy</h2>
                
                <h3 className="text-xl font-semibold mb-3 mt-4">7.1 Upgrading Plans</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Upgrade takes effect immediately</li>
                  <li>Prorated charge for remaining days in current billing cycle</li>
                  <li>New plan price applies from next billing cycle</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-4">7.2 Downgrading Plans</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Downgrade takes effect at next billing cycle</li>
                  <li>Continue enjoying current plan features until then</li>
                  <li>No refund for difference in plan prices</li>
                  <li>Features may be restricted after downgrade</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Dispute Resolution</h2>
                <p className="mb-4">
                  If you have a dispute regarding refunds:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Contact our support team at support@echofort.ai</li>
                  <li>Provide all relevant documentation (receipts, screenshots, etc.)</li>
                  <li>We'll investigate and respond within 5 business days</li>
                  <li>If unresolved, escalate to legal@echofort.ai</li>
                  <li>Final recourse: Consumer courts in India</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
                <p className="mb-4">For refund and cancellation queries:</p>
                <ul className="space-y-2">
                  <li><strong>Email:</strong> support@echofort.ai</li>
                  <li><strong>Phone:</strong> [Support Number] (Mon-Sat, 9 AM - 6 PM IST)</li>
                  <li><strong>Support Portal:</strong> help.echofort.ai</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Changes to Refund Policy</h2>
                <p>
                  We reserve the right to modify this Refund Policy. Changes will be effective immediately 
                  upon posting. Existing subscriptions will be honored under the policy in effect at time of purchase.
                </p>
              </section>
            </div>

            <div className="mt-12 p-6 bg-primary/10 rounded-lg border border-primary/20">
              <h3 className="font-semibold mb-2 text-center">Need Help?</h3>
              <p className="text-sm text-center mb-4">
                Our support team is here to assist you with any refund or cancellation questions.
              </p>
              <div className="flex justify-center">
                <Button>Contact Support</Button>
              </div>
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


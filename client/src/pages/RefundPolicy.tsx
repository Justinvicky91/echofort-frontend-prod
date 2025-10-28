import { Link } from 'wouter';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🛡️</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">EchoFort</span>
              </a>
            </Link>
            <Link href="/">
              <a className="text-blue-600 hover:text-blue-700">← Back to Home</a>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund & Cancellation Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: October 28, 2025</p>

          <div className="prose prose-blue max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 24-Hour Money-Back Guarantee</h2>
              <p className="text-gray-700 mb-4">
                We offer a <strong>24-hour money-back guarantee</strong> for first-time subscribers:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Full refund if requested within 24 hours of your first paid subscription</li>
                <li>No questions asked - we want you to be completely satisfied</li>
                <li>Refund processed within 5-7 business days to original payment method</li>
                <li>Applies to all subscription plans (Basic, Personal, Family)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How to Request a Refund</h2>
              <p className="text-gray-700 mb-4">
                To request a refund within the 24-hour window:
              </p>
              <ol className="list-decimal pl-6 mb-4 text-gray-700">
                <li>Email us at <strong>support@echofort.ai</strong></li>
                <li>Include your registered email address and subscription details</li>
                <li>Mention "Refund Request" in the subject line</li>
                <li>We'll process your refund within 24 hours of receiving your request</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. No Refunds After 24 Hours</h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-800 font-semibold">
                  After the 24-hour period, subscription fees are non-refundable for any reason, including:
                </p>
                <ul className="list-disc pl-6 mt-2 text-red-700">
                  <li>Service dissatisfaction</li>
                  <li>Non-usage or underutilization</li>
                  <li>Technical issues or device incompatibility</li>
                  <li>Change of mind</li>
                  <li>Account termination or suspension</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Subscription Cancellation</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 How to Cancel</h3>
              <p className="text-gray-700 mb-4">
                You can cancel your subscription anytime:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Go to your Account Settings → Subscription</li>
                <li>Click "Cancel Subscription"</li>
                <li>Confirm cancellation</li>
                <li>Or email us at support@echofort.ai</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 After Cancellation</h3>
              <p className="text-gray-700 mb-4">
                When you cancel:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>You'll continue to have access until the end of your current billing period</li>
                <li>No further charges will be made</li>
                <li>Your data will be retained as per our Privacy Policy</li>
                <li>You can reactivate anytime by subscribing again</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Free Trial Cancellation</h2>
              <p className="text-gray-700 mb-4">
                If you cancel during the 24-hour free trial:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>No charges will be made</li>
                <li>Access ends immediately upon cancellation</li>
                <li>You can start a new trial later if eligible</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Refund Processing Time</h2>
              <p className="text-gray-700 mb-4">
                Approved refunds are processed as follows:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Razorpay:</strong> 5-7 business days</li>
                <li><strong>Credit/Debit Card:</strong> 7-10 business days (depending on bank)</li>
                <li><strong>UPI:</strong> 3-5 business days</li>
                <li><strong>Net Banking:</strong> 5-7 business days</li>
              </ul>
              <p className="text-gray-700">
                Note: Processing times may vary depending on your payment provider and bank.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Exceptions</h2>
              <p className="text-gray-700 mb-4">
                Refunds will not be provided in cases of:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Violation of our Terms & Conditions</li>
                <li>Fraudulent activity or misuse of services</li>
                <li>Account suspension or termination due to policy violations</li>
                <li>Requests made after the 24-hour guarantee period</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                For refund requests or questions about our policy:
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> support@echofort.ai</p>
                <p className="text-gray-700"><strong>Subject:</strong> Refund Request</p>
                <p className="text-gray-700"><strong>Response Time:</strong> Within 24 hours</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <Link href="/privacy-policy"><a className="hover:text-blue-600">Privacy Policy</a></Link>
            <Link href="/terms"><a className="hover:text-blue-600">Terms & Conditions</a></Link>
            <Link href="/refund-policy"><a className="hover:text-blue-600">Refund Policy</a></Link>
            <Link href="/contact"><a className="hover:text-blue-600">Contact Us</a></Link>
          </div>
          <p className="text-center text-gray-500 mt-4">© 2025 EchoFort. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import { Link } from 'wouter';

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: October 28, 2025</p>

          <div className="prose prose-blue max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to EchoFort ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our scam protection services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-700 mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Name, email address, and phone number</li>
                <li>Payment information (processed securely through Razorpay)</li>
                <li>Account credentials and preferences</li>
                <li>Communication records with our support team</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Scam Protection Data</h3>
              <p className="text-gray-700 mb-4">To provide our services, we collect:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Call logs and recordings (with your consent)</li>
                <li>SMS and WhatsApp message metadata</li>
                <li>Scam report details and evidence</li>
                <li>Device information and usage patterns</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the collected information to:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Provide and maintain our scam protection services</li>
                <li>Detect, prevent, and respond to scam attempts</li>
                <li>Process your payments and subscriptions</li>
                <li>Send you alerts and notifications about potential scams</li>
                <li>Improve our AI-powered scam detection algorithms</li>
                <li>Provide customer support and respond to your inquiries</li>
                <li>Comply with legal obligations and law enforcement requests</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>End-to-end encryption for sensitive data</li>
                <li>Secure data storage with regular backups</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Regular security audits and vulnerability assessments</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">We do not sell your personal information. We may share your data with:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Service Providers:</strong> Third-party vendors who assist in providing our services (e.g., Razorpay for payments)</li>
                <li><strong>Law Enforcement:</strong> When required by law or to protect against fraud and scams</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Access and receive a copy of your personal data</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Scam-related data may be retained longer for fraud prevention purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> privacy@echofort.ai</p>
                <p className="text-gray-700"><strong>Address:</strong> EchoFort Technologies, India</p>
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

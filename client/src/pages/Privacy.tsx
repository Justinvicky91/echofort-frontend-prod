import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
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
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-2">
              Last Updated: October 21, 2025
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Compliant with Digital Personal Data Protection Act (DPDP Act), 2023
            </p>

            <div className="space-y-8 text-foreground/90">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="mb-4">
                  EchoFort ("we", "our", or "us") is committed to protecting your personal data and privacy. 
                  This Privacy Policy explains how we collect, use, store, and protect your information in compliance with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Digital Personal Data Protection Act (DPDP Act), 2023</li>
                  <li>Information Technology Act, 2000</li>
                  <li>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Data Controller</h2>
                <p className="mb-4">
                  [Company Name] is the Data Fiduciary responsible for your personal data.
                </p>
                <ul className="space-y-2">
                  <li><strong>Registered Address:</strong> [Company Address]</li>
                  <li><strong>Email:</strong> privacy@echofort.ai</li>
                  <li><strong>Data Protection Officer:</strong> [Name and Contact]</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold mb-3 mt-4">3.1 Personal Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Account Information:</strong> Name, email address, phone number</li>
                  <li><strong>Payment Information:</strong> Billing address, payment method details (processed securely through third-party payment processors)</li>
                  <li><strong>Identity Verification:</strong> Government-issued ID for certain features (encrypted and stored securely)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-4">3.2 Call Data</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Incoming call numbers and metadata</li>
                  <li>Call duration and timestamps</li>
                  <li>Call recordings (only when explicitly enabled by user)</li>
                  <li>Trust Factor scores and scam detection results</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-4">3.3 Location Data (Family Plan Only)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Real-time GPS coordinates of family members</li>
                  <li>Location history (stored for 30 days)</li>
                  <li>Geofence boundaries and alerts</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-4">3.4 Device and Usage Data</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Device type, operating system, and version</li>
                  <li>App usage statistics and screen time data</li>
                  <li>IP address and network information</li>
                  <li>Crash reports and diagnostic data</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-4">3.5 Images and Documents</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Images uploaded for AI scanning</li>
                  <li>QR codes and documents for phishing detection</li>
                  <li>Evidence attachments for legal complaints</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. How We Use Your Information</h2>
                <p className="mb-4">We process your personal data for the following purposes:</p>
                
                <h3 className="text-xl font-semibold mb-3 mt-4">4.1 Service Provision</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI-powered scam detection and call screening</li>
                  <li>Real-time location tracking for family safety</li>
                  <li>Screen time monitoring and child protection</li>
                  <li>Image and QR code scanning for phishing detection</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-4">4.2 Account Management</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>User authentication and account security</li>
                  <li>Subscription billing and payment processing</li>
                  <li>Customer support and communication</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-4">4.3 Service Improvement</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI model training and improvement (anonymized data only)</li>
                  <li>Scam database updates and pattern recognition</li>
                  <li>Product development and feature enhancement</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-4">4.4 Legal Compliance</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Compliance with Indian laws and regulations</li>
                  <li>Cooperation with law enforcement when legally required</li>
                  <li>Protection of our legal rights and interests</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Legal Basis for Processing (DPDP Act Compliance)</h2>
                <p className="mb-4">We process your personal data based on:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Consent:</strong> You have provided explicit consent for data collection</li>
                  <li><strong>Contractual Necessity:</strong> Processing is necessary to provide our services</li>
                  <li><strong>Legal Obligation:</strong> We are required by law to process certain data</li>
                  <li><strong>Legitimate Interest:</strong> For fraud prevention and service improvement</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Data Sharing and Disclosure</h2>
                <p className="mb-4">We do NOT sell your personal data. We may share data with:</p>
                
                <h3 className="text-xl font-semibold mb-3 mt-4">6.1 Service Providers</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Cloud Storage:</strong> AWS/Google Cloud (data encrypted at rest and in transit)</li>
                  <li><strong>Payment Processors:</strong> Razorpay, Stripe, PayPal (PCI-DSS compliant)</li>
                  <li><strong>Email Services:</strong> SendGrid for transactional emails</li>
                  <li><strong>Analytics:</strong> Anonymized usage data for service improvement</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-4">6.2 Law Enforcement</h3>
                <p className="mb-2">We may disclose data when:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Required by Indian law or court order</li>
                  <li>Necessary to prevent fraud or criminal activity</li>
                  <li>To protect our rights, property, or safety</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-4">6.3 Business Transfers</h3>
                <p>
                  In case of merger, acquisition, or sale of assets, your data may be transferred to the acquiring entity.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Data Security</h2>
                <p className="mb-4">We implement industry-standard security measures:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Encryption:</strong> AES-256 encryption for data at rest, TLS 1.3 for data in transit</li>
                  <li><strong>Access Controls:</strong> Role-based access with multi-factor authentication</li>
                  <li><strong>Regular Audits:</strong> Third-party security audits and penetration testing</li>
                  <li><strong>Data Minimization:</strong> We collect only necessary data</li>
                  <li><strong>Anonymization:</strong> Personal identifiers removed from analytics data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Data Retention</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Account Data:</strong> Retained while account is active + 90 days after deletion</li>
                  <li><strong>Call Records:</strong> 30 days (Basic), 60 days (Personal), 90 days (Family)</li>
                  <li><strong>Location Data:</strong> 30 days rolling window</li>
                  <li><strong>Payment Records:</strong> 7 years (as per Indian tax laws)</li>
                  <li><strong>Legal Complaints:</strong> Until case resolution + 1 year</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Your Rights Under DPDP Act 2023</h2>
                <p className="mb-4">You have the following rights:</p>
                
                <h3 className="text-xl font-semibold mb-3 mt-4">9.1 Right to Access</h3>
                <p>Request a copy of your personal data we hold</p>

                <h3 className="text-xl font-semibold mb-3 mt-4">9.2 Right to Correction</h3>
                <p>Request correction of inaccurate or incomplete data</p>

                <h3 className="text-xl font-semibold mb-3 mt-4">9.3 Right to Erasure</h3>
                <p>Request deletion of your personal data (subject to legal obligations)</p>

                <h3 className="text-xl font-semibold mb-3 mt-4">9.4 Right to Data Portability</h3>
                <p>Receive your data in a structured, machine-readable format</p>

                <h3 className="text-xl font-semibold mb-3 mt-4">9.5 Right to Withdraw Consent</h3>
                <p>Withdraw consent for data processing at any time</p>

                <h3 className="text-xl font-semibold mb-3 mt-4">9.6 Right to Grievance Redressal</h3>
                <p>File complaints with our Data Protection Officer or the Data Protection Board of India</p>

                <p className="mt-4">
                  <strong>To exercise your rights, contact:</strong> privacy@echofort.ai
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
                <p className="mb-4">
                  Our service is not intended for children under 18 without parental consent. 
                  The Family Plan allows parents to monitor children's devices with appropriate consent.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Parental consent required for users under 18</li>
                  <li>Parents control all data collection for minors</li>
                  <li>Children's data processed only for safety purposes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">11. International Data Transfers</h2>
                <p className="mb-4">
                  Your data is primarily stored in India. If transferred internationally:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Only to countries with adequate data protection laws</li>
                  <li>Subject to standard contractual clauses</li>
                  <li>With your explicit consent when required</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">12. Cookies and Tracking</h2>
                <p className="mb-4">We use cookies and similar technologies for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for service functionality</li>
                  <li><strong>Analytics Cookies:</strong> To understand usage patterns (anonymized)</li>
                  <li><strong>Preference Cookies:</strong> To remember your settings</li>
                </ul>
                <p className="mt-4">
                  You can control cookies through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">13. Changes to Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy periodically. Material changes will be notified via email 
                  and in-app notifications. Continued use after changes constitutes acceptance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">14. Contact Us</h2>
                <p className="mb-4">For privacy-related questions or to exercise your rights:</p>
                <ul className="space-y-2">
                  <li><strong>Data Protection Officer:</strong> [Name]</li>
                  <li><strong>Email:</strong> privacy@echofort.ai</li>
                  <li><strong>Address:</strong> [Company Address]</li>
                  <li><strong>Phone:</strong> [Contact Number]</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">15. Grievance Redressal</h2>
                <p className="mb-4">
                  If you have concerns about how we handle your data:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Contact our Data Protection Officer at privacy@echofort.ai</li>
                  <li>We will respond within 30 days</li>
                  <li>If unsatisfied, you may file a complaint with the Data Protection Board of India</li>
                </ol>
              </section>
            </div>

            <div className="mt-12 p-6 bg-muted rounded-lg">
              <p className="text-sm text-center">
                By using EchoFort, you acknowledge that you have read and understood this Privacy Policy 
                and consent to the collection and processing of your personal data as described herein.
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


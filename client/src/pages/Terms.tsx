import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, AlertTriangle } from "lucide-react";

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
            <div className="flex items-start gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg mb-8">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Important Legal Notice</h3>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Please read these Terms and Conditions carefully before using EchoFort. By signing up or using our services, 
                  you agree to be legally bound by all terms herein. If you do not agree, do not use our services.
                </p>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
            <p className="text-muted-foreground mb-8">
              Last Updated: October 21, 2025 | Effective Date: October 21, 2025
            </p>

            <div className="space-y-8 text-foreground/90">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Definitions and Interpretation</h2>
                <p className="mb-4">
                  In these Terms and Conditions, unless the context otherwise requires:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>"EchoFort", "We", "Us", "Our"</strong> refers to the EchoFort platform, its owners, operators, and affiliates</li>
                  <li><strong>"User", "You", "Your"</strong> refers to any person accessing or using EchoFort services</li>
                  <li><strong>"Services"</strong> means all features, functionalities, and offerings provided by EchoFort</li>
                  <li><strong>"Platform"</strong> includes the website, mobile applications (Android/iOS), and all related systems</li>
                  <li><strong>"Data"</strong> includes all information, content, recordings, images, location data, and any other data collected through the Services</li>
                  <li><strong>"Subscription"</strong> means the paid plan (Basic, Personal, or Family) chosen by the User</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Acceptance of Terms</h2>
                <p className="mb-4">
                  By creating an account, accessing, or using EchoFort's Services in any manner, you:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Accept and agree to be legally bound by these Terms and Conditions</li>
                  <li>Confirm you are at least 18 years of age or have parental/guardian consent</li>
                  <li>Represent that you have the legal capacity to enter into this binding agreement</li>
                  <li>Acknowledge that you have read, understood, and agree to our Privacy Policy</li>
                  <li>Consent to the collection, storage, and use of your Data as described herein</li>
                </ul>
                <p className="mt-4 font-semibold text-red-600 dark:text-red-400">
                  IF YOU DO NOT AGREE TO THESE TERMS, YOU MUST IMMEDIATELY CEASE USING OUR SERVICES.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Service Description</h2>
                <p className="mb-4">
                  EchoFort provides AI-powered scam protection and family safety services including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Real-time AI call screening with Trust Factor scoring (0-10)</li>
                  <li>Access to database of 125,000+ known scam numbers and patterns</li>
                  <li>Call recording (selective or complete, depending on subscription plan)</li>
                  <li>GPS location tracking for family members (Family Plan)</li>
                  <li>Screen time monitoring and child protection features (Family Plan)</li>
                  <li>AI-powered image, QR code, and message scanning (Personal & Family Plans)</li>
                  <li>Legal complaint assistance and cybercrime reporting tools</li>
                  <li>Offline recording with automatic cloud upload when online</li>
                </ul>
                <p className="mt-4">
                  <strong>Service Availability:</strong> Services are provided on an "as available" basis. We do not guarantee uninterrupted, 
                  timely, secure, or error-free operation of the Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Subscription Plans and Pricing</h2>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">4.1 Available Plans</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Basic Plan:</strong> ₹399/month (including 18% GST) - AI call screening only, no recording</li>
                    <li><strong>Personal Plan:</strong> ₹799/month (including 18% GST) - All calls recorded (normal + social + scam), 90 days storage</li>
                    <li><strong>Family Plan:</strong> ₹1,499/month (including 18% GST) - Selective recording (scam/harassment/threatening only), family tracking, child protection</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">4.2 Free Trial</h3>
                  <p>
                    All new users receive a 24-hour free trial with full access to their chosen plan's features. 
                    No credit card is required to start the trial. After 24 hours, your subscription will automatically 
                    begin unless you cancel before the trial ends.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">4.3 Price Changes</h3>
                  <p>
                    We reserve the right to modify subscription prices at any time with 30 days' prior notice. 
                    Continued use of Services after price changes constitutes acceptance of the new pricing.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Subscriptions are billed monthly in advance on the same date each month</li>
                  <li>Payments are processed securely through Razorpay, Stripe, or PayPal</li>
                  <li>All prices include applicable Goods and Services Tax (GST) as per Indian tax laws</li>
                  <li>Subscriptions automatically renew unless cancelled before the next billing cycle</li>
                  <li>Failed payments may result in immediate service suspension</li>
                  <li>You authorize us to charge your payment method for all fees incurred</li>
                  <li>You are responsible for all applicable taxes and payment processing fees</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Refund Policy</h2>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">6.1 Money-Back Guarantee</h3>
                  <p className="mb-2">
                    We offer a 24-hour money-back guarantee from the date of your first paid subscription:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Full refund if requested within 24 hours of initial subscription purchase</li>
                    <li>Refund requests must be submitted via email to support@echofort.ai</li>
                    <li>Refunds are processed within 5-7 business days to the original payment method</li>
                    <li>This guarantee applies only to first-time subscribers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">6.2 No Refunds After 24 Hours</h3>
                  <p className="font-semibold text-red-600 dark:text-red-400">
                    NO REFUNDS WILL BE PROVIDED AFTER THE 24-HOUR PERIOD. Subscription fees are non-refundable 
                    for any reason, including but not limited to: service dissatisfaction, non-usage, technical issues, 
                    or account termination.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. User Responsibilities and Obligations</h2>
                <p className="mb-4">
                  By using EchoFort, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Legal Compliance:</strong> Ensure your use of call recording features complies with all applicable laws in your jurisdiction</li>
                  <li><strong>Consent Requirement:</strong> Obtain necessary consent from all parties before recording calls where required by law</li>
                  <li><strong>Accurate Information:</strong> Provide truthful, accurate, and complete information during registration and use</li>
                  <li><strong>Account Security:</strong> Maintain the confidentiality of your account credentials</li>
                  <li><strong>Prohibited Uses:</strong> Not use the Services for any illegal, harmful, or unauthorized purposes</li>
                  <li><strong>Family Plan Consent:</strong> If using Family Plan, obtain explicit consent from all family members being tracked</li>
                  <li><strong>Child Safety:</strong> Ensure proper parental authority when monitoring children's devices</li>
                  <li><strong>Data Accuracy:</strong> Understand that scam detection is AI-based and may not be 100% accurate</li>
                </ul>
                <p className="mt-4 font-semibold">
                  YOU ARE SOLELY RESPONSIBLE FOR YOUR USE OF THE SERVICES AND ANY CONSEQUENCES ARISING THEREFROM.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Data Collection, Storage, and Usage Rights</h2>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mb-4">
                  <p className="font-semibold mb-2">EXPLICIT CONSENT TO DATA STORAGE AND USAGE:</p>
                  <p className="text-sm">
                    By signing up for EchoFort, you explicitly and irrevocably consent that ALL DATA collected through 
                    the Services will be stored in EchoFort's systems for future purposes, including but not limited to:
                  </p>
                </div>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Service provision, improvement, and feature development</li>
                  <li>AI model training and scam pattern analysis</li>
                  <li>Legal compliance and evidence preservation for court proceedings</li>
                  <li>Law enforcement cooperation when legally required</li>
                  <li>Security, fraud prevention, and threat detection</li>
                  <li>Customer support and communication</li>
                  <li>Business analytics and operational optimization</li>
                  <li>Research and development purposes</li>
                </ul>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">8.1 Types of Data Collected</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Call recordings (audio files, metadata, caller information)</li>
                    <li>GPS location data and movement history</li>
                    <li>Screen time data and app usage patterns</li>
                    <li>Images, screenshots, QR codes, and documents scanned</li>
                    <li>WhatsApp, Telegram, and SMS message content (when scanned)</li>
                    <li>Device information, IP addresses, and usage logs</li>
                    <li>Payment information and transaction history</li>
                    <li>Any other data generated through your use of the Services</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">8.2 Data Retention</h3>
                  <p>
                    <strong>Super Admin Access:</strong> EchoFort's Super Admin has full access to ALL call recordings 
                    from ALL users (including Personal and Family plan users) for legal, security, and operational purposes. 
                    This data may be retained indefinitely and provided to law enforcement or courts when legally required.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">8.3 Data Sharing</h3>
                  <p>
                    We may share your Data with law enforcement agencies, government authorities, or third parties when:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Required by law, court order, or legal process</li>
                    <li>Necessary to protect our rights, property, or safety</li>
                    <li>Needed to prevent fraud, security threats, or illegal activities</li>
                    <li>Part of a business transfer, merger, or acquisition</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Call Recording Legality and User Responsibility</h2>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mb-4">
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">CRITICAL LEGAL NOTICE:</p>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Call recording laws vary by jurisdiction. YOU ARE SOLELY RESPONSIBLE for ensuring your use of 
                    call recording features complies with all applicable laws in your country, state, and locality.
                  </p>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <li>EchoFort provides call recording as a tool; legal compliance is YOUR responsibility</li>
                  <li>Some jurisdictions require "two-party consent" (all parties must consent to recording)</li>
                  <li>Other jurisdictions allow "one-party consent" (only one party needs to consent)</li>
                  <li>India generally allows call recording for personal use, but laws may vary by state</li>
                  <li>Unauthorized call recording may be illegal and subject to criminal penalties</li>
                  <li>YOU MUST obtain necessary consents before recording calls where required by law</li>
                  <li>EchoFort is NOT liable for any legal consequences arising from your use of call recording</li>
                </ul>
                <p className="mt-4 font-semibold">
                  BY USING CALL RECORDING FEATURES, YOU ACKNOWLEDGE FULL RESPONSIBILITY FOR LEGAL COMPLIANCE 
                  AND AGREE TO INDEMNIFY ECHOFORT FOR ANY CLAIMS ARISING FROM YOUR USE.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg mb-4">
                  <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">MAXIMUM LIABILITY DISCLAIMER:</p>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    TO THE FULLEST EXTENT PERMITTED BY LAW, ECHOFORT SHALL NOT BE LIABLE FOR ANY DAMAGES WHATSOEVER.
                  </p>
                </div>
                <p className="mb-4">
                  EchoFort, its owners, operators, employees, agents, and affiliates shall NOT be liable for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Scam Detection Failures:</strong> Any losses incurred due to undetected scams, false positives, or AI errors</li>
                  <li><strong>Service Interruptions:</strong> Damages from service downtime, outages, or technical failures</li>
                  <li><strong>Data Loss:</strong> Loss, corruption, or unauthorized access to your Data</li>
                  <li><strong>Third-Party Actions:</strong> Actions of scammers, hackers, or other malicious third parties</li>
                  <li><strong>Legal Consequences:</strong> Any legal issues arising from your use of call recording or other features</li>
                  <li><strong>Financial Losses:</strong> Any direct, indirect, incidental, consequential, or punitive damages</li>
                  <li><strong>Personal Injury:</strong> Any physical or emotional harm resulting from use of the Services</li>
                  <li><strong>Device Damage:</strong> Any damage to your devices or data</li>
                  <li><strong>Relationship Issues:</strong> Any disputes arising from family tracking or monitoring features</li>
                  <li><strong>Child Safety:</strong> Any harm to children despite use of child protection features</li>
                </ul>
                <p className="mt-4 font-semibold">
                  IN NO EVENT SHALL ECHOFORT'S TOTAL LIABILITY EXCEED THE AMOUNT YOU PAID FOR THE SERVICES 
                  IN THE 30 DAYS PRECEDING THE CLAIM. SOME JURISDICTIONS DO NOT ALLOW LIMITATION OF LIABILITY, 
                  SO THIS MAY NOT APPLY TO YOU.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Disclaimer of Warranties</h2>
                <p className="mb-4 font-semibold">
                  THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, 
                  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>No warranty of merchantability or fitness for a particular purpose</li>
                  <li>No warranty that the Services will be uninterrupted, timely, secure, or error-free</li>
                  <li>No warranty that scam detection will be 100% accurate</li>
                  <li>No warranty that call recordings will be successfully captured or stored</li>
                  <li>No warranty that GPS tracking will be accurate or real-time</li>
                  <li>No warranty that child protection features will prevent all harmful content</li>
                  <li>No warranty regarding the reliability, accuracy, or completeness of any information</li>
                </ul>
                <p className="mt-4">
                  YOU ACKNOWLEDGE THAT YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">12. Indemnification</h2>
                <p className="mb-4">
                  You agree to indemnify, defend, and hold harmless EchoFort, its owners, operators, employees, 
                  agents, affiliates, and partners from and against any and all claims, liabilities, damages, 
                  losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your use or misuse of the Services</li>
                  <li>Your violation of these Terms and Conditions</li>
                  <li>Your violation of any applicable laws or regulations</li>
                  <li>Your violation of any third-party rights, including privacy rights</li>
                  <li>Your use of call recording features without proper consent</li>
                  <li>Any content you submit, upload, or transmit through the Services</li>
                  <li>Any claims by family members regarding tracking or monitoring</li>
                  <li>Any disputes with other users or third parties</li>
                </ul>
                <p className="mt-4 font-semibold">
                  THIS INDEMNIFICATION OBLIGATION WILL SURVIVE TERMINATION OF THESE TERMS AND YOUR USE OF THE SERVICES.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">13. Termination and Suspension</h2>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">13.1 Termination by You</h3>
                  <p>
                    You may cancel your subscription at any time by contacting support@echofort.ai. 
                    Cancellation will take effect at the end of your current billing period. No refunds 
                    will be provided for unused time in your billing period.
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">13.2 Termination by Us</h3>
                  <p className="mb-2">
                    We reserve the right to suspend or terminate your account immediately, without notice, for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Violation of these Terms and Conditions</li>
                    <li>Fraudulent or illegal activity</li>
                    <li>Non-payment of subscription fees</li>
                    <li>Abuse of the Services or other users</li>
                    <li>Any reason we deem necessary to protect our interests or other users</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">13.3 Effect of Termination</h3>
                  <p>
                    Upon termination, your access to the Services will cease immediately. However, 
                    <strong> EchoFort retains the right to store your Data indefinitely</strong> for legal, 
                    security, and operational purposes, even after account termination.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">14. Intellectual Property Rights</h2>
                <p className="mb-4">
                  All intellectual property rights in the Services, including but not limited to software, 
                  algorithms, AI models, designs, logos, trademarks, and content, are owned by or licensed to EchoFort.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You may not copy, modify, distribute, sell, or reverse engineer any part of the Services</li>
                  <li>You may not use our trademarks, logos, or branding without written permission</li>
                  <li>You may not create derivative works based on the Services</li>
                  <li>You grant us a perpetual, worldwide, royalty-free license to use any feedback or suggestions you provide</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">15. Dispute Resolution and Arbitration</h2>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">15.1 Mandatory Arbitration</h3>
                  <p className="mb-2">
                    Any dispute, claim, or controversy arising out of or relating to these Terms or the Services 
                    shall be resolved through <strong>binding arbitration</strong> in accordance with the Arbitration 
                    and Conciliation Act, 1996.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Arbitration shall be conducted in Bangalore, Karnataka, India</li>
                    <li>The arbitration shall be conducted in English</li>
                    <li>The arbitrator's decision shall be final and binding</li>
                    <li>Each party shall bear its own costs of arbitration</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">15.2 Waiver of Class Actions</h3>
                  <p className="font-semibold">
                    YOU WAIVE ANY RIGHT TO PARTICIPATE IN CLASS ACTION LAWSUITS OR CLASS-WIDE ARBITRATION. 
                    All disputes must be brought individually.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">15.3 Informal Resolution</h3>
                  <p>
                    Before initiating arbitration, you agree to first contact us at support@echofort.ai to attempt 
                    informal resolution of the dispute.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">16. Governing Law and Jurisdiction</h2>
                <p className="mb-4">
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of India, 
                  without regard to conflict of law principles. Specifically:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Information Technology Act, 2000</li>
                  <li>Digital Personal Data Protection Act (DPDP Act), 2023</li>
                  <li>Indian Contract Act, 1872</li>
                  <li>Consumer Protection Act, 2019</li>
                  <li>Indian Penal Code, 1860</li>
                  <li>Any other applicable Indian laws and regulations</li>
                </ul>
                <p className="mt-4 font-semibold">
                  Subject to the arbitration clause above, the courts of Bangalore, Karnataka, India shall have 
                  exclusive jurisdiction over any disputes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">17. Force Majeure</h2>
                <p className="mb-4">
                  EchoFort shall not be liable for any failure or delay in performance due to circumstances beyond 
                  our reasonable control, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Acts of God, natural disasters, pandemics, or epidemics</li>
                  <li>War, terrorism, civil unrest, or government actions</li>
                  <li>Internet or telecommunications failures</li>
                  <li>Power outages or infrastructure failures</li>
                  <li>Cyberattacks, hacking, or security breaches</li>
                  <li>Third-party service provider failures (hosting, payment processors, etc.)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">18. Privacy and Data Protection</h2>
                <p className="mb-4">
                  Your use of the Services is also governed by our Privacy Policy, which is incorporated by reference 
                  into these Terms. Please review our Privacy Policy to understand our data practices.
                </p>
                <p>
                  <strong>Compliance with DPDP Act 2023:</strong> We comply with the Digital Personal Data Protection Act, 
                  2023. However, by using the Services, you consent to data processing as described in these Terms and 
                  our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">19. Modifications to Terms</h2>
                <p className="mb-4">
                  We reserve the right to modify these Terms and Conditions at any time. Changes will be effective 
                  immediately upon posting to our website. Your continued use of the Services after changes are posted 
                  constitutes acceptance of the modified Terms.
                </p>
                <p className="font-semibold">
                  IT IS YOUR RESPONSIBILITY TO REVIEW THESE TERMS PERIODICALLY FOR CHANGES.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">20. Severability</h2>
                <p>
                  If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining 
                  provisions shall continue in full force and effect. The invalid provision shall be modified to the 
                  minimum extent necessary to make it valid and enforceable.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">21. Entire Agreement</h2>
                <p>
                  These Terms and Conditions, together with our Privacy Policy and Refund Policy, constitute the entire 
                  agreement between you and EchoFort regarding the Services and supersede all prior agreements, 
                  understandings, and communications, whether written or oral.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">22. Contact Information</h2>
                <p className="mb-4">
                  For questions, concerns, or complaints regarding these Terms and Conditions, please contact us at:
                </p>
                <ul className="list-none space-y-2">
                  <li><strong>Email:</strong> support@echofort.ai</li>
                  <li><strong>Legal Email:</strong> legal@echofort.ai</li>
                  <li><strong>Support Email:</strong> hello@echofort.ai</li>
                  <li><strong>Address:</strong> Bangalore, Karnataka, India</li>
                </ul>
              </section>

              <section className="border-t pt-8 mt-8">
                <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Acknowledgment and Acceptance</h3>
                  <p className="mb-4">
                    BY CLICKING "I AGREE" DURING SIGNUP, CREATING AN ACCOUNT, OR USING THE SERVICES, YOU ACKNOWLEDGE THAT:
                  </p>
                  <ul className="list-decimal pl-6 space-y-2">
                    <li>You have read and understood these Terms and Conditions in their entirety</li>
                    <li>You agree to be legally bound by all terms herein</li>
                    <li>You consent to the collection, storage, and use of your Data as described</li>
                    <li>You understand and accept all limitations of liability and disclaimers</li>
                    <li>You agree to indemnify EchoFort for any claims arising from your use</li>
                    <li>You accept the mandatory arbitration and jurisdiction clauses</li>
                    <li>You acknowledge sole responsibility for legal compliance regarding call recording</li>
                  </ul>
                  <p className="mt-4 font-semibold text-center text-lg">
                    IF YOU DO NOT AGREE, DO NOT USE OUR SERVICES.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


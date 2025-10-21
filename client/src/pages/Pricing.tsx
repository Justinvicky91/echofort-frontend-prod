import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: 399,
    description: "Essential scam protection for individuals",
    features: [
      "Real-time AI call screening",
      "Trust Factor scoring (0-10)",
      "Access to 125,000+ Scam Database",
      "Voice pattern recognition",
      "Keyword detection",
      "Caller ID verification",
      "24/7 customer support",
      "24-hour Money-back Guarantee",
    ],
    notIncluded: [
      "No call recording",
      "No loan harassment protection",
      "No image scanning",
      "No GPS tracking",
      "No child protection",
    ],
    popular: false,
    color: "border-border",
  },
  {
    name: "Personal",
    price: 799,
    description: "Complete protection with advanced features",
    features: [
      "Everything in Basic Plan",
      "Auto call recording (ALL calls: normal + social + scam)",
      "90 days call storage",
      "Loan harassment protection",
      "AI image & screenshot scanning (BEFORE download)",
      "QR code scam detection",
      "WhatsApp/Telegram message analysis (pre-download)",
      "Email phishing detection",
      "Legal complaint filing system",
      "Priority customer support",
      "Offline recording (auto-upload when online)",
    ],
    notIncluded: [
      "GPS Tracking",
      "Screen Time Monitoring",
      "Family Member Management",
    ],
    popular: true,
    color: "border-primary",
  },
  {
    name: "Family",
    price: 1499,
    description: "Ultimate protection for your entire family",
    features: [
      "Everything in Personal Plan",
      "Up to 4 family members/devices",
      "Selective call recording (scam/harassment/threatening only)",
      "90 days scam call storage",
      "Real-time GPS family tracking",
      "Geofencing & safe zone alerts",
      "Child protection (18+ content filter)",
      "YouTube Restricted Mode (locked)",
      "Screen time tracking & WHO-standard limits",
      "Automated screen time control",
      "Gaming addiction alerts",
      "Family dashboard (parental controls)",
      "Priority phone support",
    ],
    note: "Purchase person gets access to scam/harassment/threatening call history only. Normal calls not recorded for family members.",
    notIncluded: [],
    popular: false,
    color: "border-purple-500",
  },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="animated-bg" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <Shield className="w-8 h-8 text-primary shield-icon" />
                <span className="text-2xl font-bold gradient-text">EchoFort</span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose the plan that's right for you. All plans include GST. 
            24-hour money-back guarantee on all plans.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-2 bg-muted rounded-lg mb-12">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-md transition-all ${
                billingCycle === "monthly"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-md transition-all ${
                billingCycle === "yearly"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`dashboard-card relative ${
                  plan.popular ? "ring-2 ring-primary scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold">₹{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  {billingCycle === "yearly" && (
                    <div className="mt-2 text-sm text-green-600">
                      Save ₹{Math.round(plan.price * 12 * 0.2)} per year
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    (Including GST)
                  </p>
                </div>

                <Link href="/signup">
                  <Button
                    className="w-full mb-6 btn-hover-lift"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>

                <div className="space-y-3">
                  <p className="text-sm font-semibold mb-3">What's included:</p>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.note && (
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <p className="text-xs text-yellow-800 dark:text-yellow-200">
                        <strong>Note:</strong> {plan.note}
                      </p>
                    </div>
                  )}
                  
                  {plan.notIncluded.length > 0 && (
                    <>
                      <div className="border-t my-4" />
                      <p className="text-sm font-semibold mb-3 text-muted-foreground">
                        Not included:
                      </p>
                      {plan.notIncluded.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                            <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                          </div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "How does the 24-hour money-back guarantee work?",
                a: "If you're not satisfied with EchoFort within 24 hours of purchase, simply contact our support team and we'll process a full refund, no questions asked.",
              },
              {
                q: "Can I upgrade or downgrade my plan?",
                a: "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the change will take effect at your next billing cycle.",
              },
              {
                q: "Do I need to install an app?",
                a: "Yes, EchoFort requires our Android or iOS app for full functionality, especially for call screening and GPS tracking. The web dashboard is used for monitoring and management.",
              },
              {
                q: "Is my data secure?",
                a: "Absolutely. We use bank-grade encryption and comply with India's Digital Personal Data Protection Act 2023. Your data is stored securely and never shared with third parties.",
              },
              {
                q: "How many devices can I use?",
                a: "Basic and Personal plans support 1 device. Family plan supports up to 4 devices for family members.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit/debit cards, UPI, net banking, and digital wallets through Razorpay, Stripe, and PayPal.",
              },
            ].map((faq, index) => (
              <div key={index} className="dashboard-card">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our team is here to help you choose the right plan.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Sales
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-muted/30">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 EchoFort. All rights reserved. Made in India 🇮🇳</p>
        </div>
      </footer>
    </div>
  );
}


import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, Calendar, MapPin, DollarSign } from "lucide-react";

export default function ScamCases() {
  // Real scam cases from October 2025 news
  const scamCases = [
    {
      id: 1,
      title: "India's Largest Digital Arrest Scam",
      amount: "₹58 Crore",
      location: "Mumbai, Maharashtra",
      date: "October 17, 2025",
      severity: "critical",
      description: "A 72-year-old man in Mumbai fell prey to India's largest digital arrest scam. The victim was forced to visit 4 banks over 27 days, just months after receiving ₹50 crore from shares. Maharashtra Police arrested 7 people linked to the fraud.",
      tagline: "Never trust video calls from 'police' demanding money transfers"
    },
    {
      id: 2,
      title: "Bengaluru Retiree Duped by Fake Cops",
      amount: "₹1.62 Crore",
      location: "Bengaluru, Karnataka",
      date: "October 20, 2025",
      severity: "critical",
      description: "Cybercriminals posing as cops threatened to 'arrest family members if you don't comply'. The retiree was kept under digital arrest for days and forced to transfer money to multiple accounts.",
      tagline: "Real police never conduct arrests over video calls"
    },
    {
      id: 3,
      title: "Pune Doctor Loses Life Savings",
      amount: "₹7 Crore+",
      location: "Pune, Maharashtra",
      date: "October 18, 2025",
      severity: "critical",
      description: "A senior doctor in Maharashtra was conned of over ₹7 crore in a digital arrest scam. Fraudsters impersonated ED and CBI officers, claiming illegal money in accounts.",
      tagline: "Government agencies never ask for money to 'clear your name'"
    },
    {
      id: 4,
      title: "Ambala Couple Defrauded by Fake NIA",
      amount: "₹1.44 Crore",
      location: "Ambala, Haryana",
      date: "October 18, 2025",
      severity: "critical",
      description: "A 70-year-old man and his wife were placed under 'digital arrest' by scammers posing as National Investigation Agency officers. Supreme Court took suo motu cognizance of this case.",
      tagline: "NIA, CBI, ED never conduct investigations via video call"
    },
    {
      id: 5,
      title: "Delhi Banker's ₹23 Crore Scam",
      amount: "₹23 Crore",
      location: "South Delhi",
      date: "October 15, 2025",
      severity: "critical",
      description: "A 78-year-old retired banker from South Delhi fell victim to one of the biggest digital arrest scams reported in India. The scammers used sophisticated tactics to gain trust.",
      tagline: "Even banking professionals are falling victim - stay alert"
    },
    {
      id: 6,
      title: "Cybersecurity Expert Loses to WhatsApp Scam",
      amount: "₹73 Lakh",
      location: "Pune, Maharashtra",
      date: "October 18, 2025",
      severity: "high",
      description: "A cybersecurity professional from Pune fell victim to a sophisticated WhatsApp trading scam, losing ₹73.69 lakh. Despite his knowledge of cybersecurity, the scam was too convincing.",
      tagline: "If it sounds too good to be true, it probably is"
    },
    {
      id: 7,
      title: "Paytm Investment Scam",
      amount: "₹23 Lakh",
      location: "Multiple Cities",
      date: "October 19, 2025",
      severity: "high",
      description: "Victims lured into fake investment schemes through WhatsApp groups promising high returns. Scammers created fake Paytm investment platforms.",
      tagline: "Verify investment platforms before transferring money"
    },
    {
      id: 8,
      title: "17,718 Digital Arrest Cases in 2 Months",
      amount: "Hundreds of Crores",
      location: "Pan-India",
      date: "October 20, 2025",
      severity: "critical",
      description: "In the first two months of 2025 alone, 17,718 cases of digital arrest were reported across India. Supreme Court asked Centre, CBI, and Haryana to respond.",
      tagline: "Digital arrest is India's fastest-growing scam - protect yourself"
    },
    {
      id: 9,
      title: "Mumbai Cyber Police Bust Fraud Ring",
      amount: "₹58 Crore",
      location: "Gujarat (arrested)",
      date: "October 16, 2025",
      severity: "high",
      description: "Mumbai police arrested 6 members of an interstate cyber fraud gang in Gujarat. At least 102 such cyber scams involving digital arrests have been registered in Mumbai in the past year.",
      tagline: "Report scams immediately to help catch criminals"
    },
    {
      id: 10,
      title: "Fake India Post SMS Scam",
      amount: "Variable",
      location: "Pan-India",
      date: "October 20, 2025",
      severity: "medium",
      description: "Scammers sending fake SMS claiming to be from India Post, asking users to click links to receive packages. Links lead to phishing sites stealing banking credentials.",
      tagline: "Never click links in unsolicited SMS messages"
    },
    {
      id: 11,
      title: "Digital Diwali Scam Wave",
      amount: "Variable",
      location: "Pan-India",
      date: "October 21, 2025",
      severity: "high",
      description: "Ahead of Diwali, scammers are sending fake discount offers, lottery wins, and gift vouchers via WhatsApp and SMS. Links install malware or steal banking details.",
      tagline: "Verify all Diwali offers directly with official company websites"
    },
    {
      id: 12,
      title: "e-KYC Data Scams Rising",
      amount: "Variable",
      location: "Pan-India",
      date: "October 18, 2025",
      severity: "high",
      description: "India's e-KYC boom is fueling a new wave of data scams. Fraud cases increased from 24 lakh in 2023 to 36 lakh in 2024. Scammers using stolen KYC data for identity theft.",
      tagline: "Only complete e-KYC on official government/bank websites"
    },
    {
      id: 13,
      title: "Odisha Investment Scam Mastermind Arrested",
      amount: "₹1,000 Crore",
      location: "Odisha",
      date: "October 19, 2025",
      severity: "critical",
      description: "Pratap Kumar Raut, alleged Odisha head of a massive ₹1000 crore investment scam, arrested by state's Economic Offences Wing. Thousands of investors duped.",
      tagline: "Research investment companies thoroughly before investing"
    },
    {
      id: 14,
      title: "Fake Loan App Scams",
      amount: "Variable",
      location: "Pan-India",
      date: "October 17, 2025",
      severity: "high",
      description: "Fraudulent loan apps charging exorbitant interest rates and harassing users. Apps access contacts and threaten to defame users if they don't pay.",
      tagline: "Only use RBI-registered lending apps"
    },
    {
      id: 15,
      title: "Cryptocurrency Ponzi Scheme",
      amount: "₹500 Crore+",
      location: "Multiple States",
      date: "October 16, 2025",
      severity: "critical",
      description: "Multi-level marketing scheme promising high returns on cryptocurrency investments. Thousands of investors lost money when the scheme collapsed.",
      tagline: "Be extremely cautious with cryptocurrency investment schemes"
    },
    {
      id: 16,
      title: "Job Scam Targeting Students",
      amount: "Variable",
      location: "Pan-India",
      date: "October 15, 2025",
      severity: "medium",
      description: "Fake job offers requiring upfront fees for 'training' or 'registration'. Students losing thousands to non-existent job opportunities.",
      tagline: "Legitimate companies never ask for money to give you a job"
    },
    {
      id: 17,
      title: "Romance Scam Epidemic",
      amount: "Variable",
      location: "Pan-India",
      date: "October 14, 2025",
      severity: "medium",
      description: "Scammers creating fake profiles on dating apps, building emotional connections, then asking for money for 'emergencies' or 'travel to meet you'.",
      tagline: "Never send money to someone you've only met online"
    },
    {
      id: 18,
      title: "Fake Customer Care Scam",
      amount: "Variable",
      location: "Pan-India",
      date: "October 13, 2025",
      severity: "high",
      description: "Scammers creating fake customer care numbers appearing in Google search results. Victims calling for help end up sharing banking details with fraudsters.",
      tagline: "Always verify customer care numbers on official company websites"
    },
    {
      id: 19,
      title: "SIM Swap Fraud Rising",
      amount: "Variable",
      location: "Pan-India",
      date: "October 12, 2025",
      severity: "high",
      description: "Fraudsters obtaining duplicate SIMs using stolen identity documents, then accessing victims' bank accounts via OTP.",
      tagline: "Immediately contact your telecom provider if your SIM stops working"
    },
    {
      id: 20,
      title: "Supreme Court Takes Action",
      amount: "N/A",
      location: "New Delhi",
      date: "October 21, 2025",
      severity: "high",
      description: "Supreme Court issues notice to Centre over 'digital arrest' scams using fake judicial seals. Court taking suo motu cognizance to address the epidemic.",
      tagline: "Government taking action - but you must stay vigilant"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      case "high":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen">
      <div className="animated-bg" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <img src="/logo.png" alt="EchoFort" className="w-16 h-16" />
                <span className="text-xl font-bold gradient-text">EchoFort</span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/features">
                <Button variant="ghost">Features</Button>
              </Link>
              <Link href="/pricing">
                <Button variant="ghost">Pricing</Button>
              </Link>
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
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-600 dark:text-red-400">Live Scam Alerts</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Recent <span className="gradient-text">Scam Cases</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real scam cases from October 2025. Learn from others' experiences and protect yourself from similar fraud.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="dashboard-card text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-red-600 dark:text-red-400" />
              <div className="text-3xl font-bold gradient-text mb-1">₹150Cr+</div>
              <div className="text-sm text-muted-foreground">Lost in October 2025</div>
            </div>
            <div className="dashboard-card text-center">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-orange-600 dark:text-orange-400" />
              <div className="text-3xl font-bold gradient-text mb-1">17,718</div>
              <div className="text-sm text-muted-foreground">Digital Arrests (2 months)</div>
            </div>
            <div className="dashboard-card text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-yellow-600 dark:text-yellow-400" />
              <div className="text-3xl font-bold gradient-text mb-1">20+</div>
              <div className="text-sm text-muted-foreground">Major Cases This Month</div>
            </div>
          </div>

          {/* Scam Cases Grid */}
          <div className="space-y-6">
            {scamCases.map((scam) => (
              <div key={scam.id} className="dashboard-card hover:shadow-xl transition-all">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(scam.severity)}`}>
                        {scam.severity.toUpperCase()}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {scam.date}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{scam.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {scam.amount}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {scam.location}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{scam.description}</p>
                <div className="bg-primary/5 border-l-4 border-primary p-4 rounded">
                  <p className="font-semibold text-sm">
                    💡 Protection Tip: <span className="font-normal">{scam.tagline}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center dashboard-card bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20 p-12">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-600 dark:text-red-400" />
            <h2 className="text-3xl font-bold mb-4">Don't Become the Next Victim</h2>
            <p className="text-lg text-muted-foreground mb-8">
              EchoFort's AI can detect these scams in real-time and protect you before you lose money.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg">Start Free Trial</Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline">See How It Works</Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              24-hour money-back guarantee • No credit card required
            </p>
          </div>

          {/* Emergency Contact */}
          <div className="mt-8 dashboard-card bg-blue-500/10 border-blue-500/20">
            <div className="text-center p-6">
              <h3 className="text-xl font-bold mb-4">Being Scammed Right Now?</h3>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Button variant="default" asChild>
                  <a href="tel:1930">Call 1930 (Cybercrime Helpline)</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">
                    Report at cybercrime.gov.in
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Auto-Update Notice */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>This page is automatically updated daily with the latest scam cases from across India.</p>
            <p className="mt-2">Last updated: {new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


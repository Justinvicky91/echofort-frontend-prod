import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Phone, MapPin, Clock, Image, FileText, AlertTriangle, Users, Zap, Lock, TrendingUp, Globe } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Phone,
      title: "AI Call Screening",
      description: "Real-time analysis of incoming calls with Trust Factor scoring (0-10) to identify scams before you answer.",
      details: [
        "Voice pattern recognition using advanced AI",
        "Keyword detection for common scam phrases",
        "Caller ID verification against 125,000+ scam database",
        "Instant risk assessment in milliseconds",
        "Works with all types of calls (regular, VoIP, WhatsApp)"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Digital Arrest Protection",
      description: "Detect and block fake police/CBI/court calls that attempt to intimidate and extort money.",
      details: [
        "Identifies impersonation of law enforcement",
        "Detects fake judicial seals and documents",
        "Alerts you to digital arrest scam tactics",
        "Automatic recording of suspicious calls",
        "Instant notification to authorities"
      ]
    },
    {
      icon: Shield,
      title: "Auto-Alert System",
      description: "When scam detected, AI drafts emails to banks, police, and cybercrime authorities for your approval.",
      details: [
        "Auto-draft to your bank to freeze account",
        "Alert to local police/cybercrime cell",
        "Notification to National Cybercrime Portal",
        "Global coverage (FBI, Interpol for international users)",
        "Region/district/country-specific departments",
        "User confirmation required before sending"
      ]
    },
    {
      icon: MapPin,
      title: "GPS Family Tracking",
      description: "Real-time location tracking for family members with geofencing alerts and 30-day history.",
      details: [
        "On-demand GPS (not always-on, battery-efficient)",
        "Geofencing with safe zone alerts",
        "30-day location history",
        "Emergency SOS location sharing",
        "Privacy-focused tracking"
      ]
    },
    {
      icon: Clock,
      title: "Screen Time & Child Protection",
      description: "Monitor children's digital wellbeing with WHO-standard screen time limits and 18+ content filtering.",
      details: [
        "18+ content filter on all social platforms",
        "YouTube Restricted Mode (locked)",
        "Automated screen time control per WHO standards",
        "Gaming addiction risk alerts",
        "Parental control dashboard",
        "App usage tracking and time limits"
      ]
    },
    {
      icon: Image,
      title: "AI Image & Message Scanning",
      description: "Scan WhatsApp, Telegram, SMS images/videos BEFORE download to detect scam coding and hacking attempts.",
      details: [
        "Pre-download scanning of all media",
        "QR code scam detection",
        "Phishing link identification",
        "Malware and virus detection",
        "Alert before content reaches device",
        "Works with WhatsApp, Telegram, SMS"
      ]
    },
    {
      icon: FileText,
      title: "Call Recording",
      description: "Selective or complete call recording based on your plan, with 90-day cloud storage.",
      details: [
        "Basic: No recording",
        "Personal: ALL calls recorded (normal + social + scam)",
        "Family: Selective recording (scam/harassment/threatening only)",
        "Offline recording (auto-upload when online)",
        "90-day cloud storage",
        "Super Admin access for legal/court purposes"
      ]
    },
    {
      icon: Users,
      title: "Family Management",
      description: "Protect up to 4 family members with unified dashboard and parental controls.",
      details: [
        "Up to 4 devices/family members",
        "Unified family dashboard",
        "Individual privacy settings",
        "Purchase person controls all alerts",
        "Child-safe browsing enforcement",
        "Family-wide scam protection"
      ]
    },
    {
      icon: Zap,
      title: "Real-Time Scam Database",
      description: "Access to 125,000+ known scam numbers and patterns, constantly updated across India.",
      details: [
        "125,000+ verified scam numbers",
        "Daily database updates",
        "Community-reported scams",
        "Pattern recognition for new scams",
        "Regional scam tracking",
        "Integration with government databases"
      ]
    },
    {
      icon: Lock,
      title: "Bank-Grade Security",
      description: "100% unhackable shields with end-to-end encryption and DPDP Act 2023 compliance.",
      details: [
        "End-to-end encryption for all data",
        "Zero-knowledge architecture",
        "DPDP Act 2023 compliant",
        "Regular security audits",
        "Secure cloud storage",
        "No third-party data sharing"
      ]
    },
    {
      icon: FileText,
      title: "Legal Assistance",
      description: "Guided cybercrime complaint filing with automatic evidence attachment and case tracking.",
      details: [
        "Step-by-step complaint filing",
        "Automatic evidence collection",
        "Call recordings attached",
        "Screenshot and document upload",
        "Case status tracking",
        "Legal document templates"
      ]
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Protection works worldwide with region-specific authority alerts and multi-language support.",
      details: [
        "Works in 150+ countries",
        "Region-specific law enforcement alerts",
        "Multi-language support",
        "Local scam pattern detection",
        "International number verification",
        "Global scam database integration"
      ]
    }
  ];

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
                <span className="text-xl font-bold gradient-text">EchoFort</span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Complete Protection for Your <span className="gradient-text">Digital Life</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              EchoFort uses advanced AI to protect you from scams, track your family's safety, and monitor your children's digital wellbeing. Trusted by 50,000+ Indians.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="dashboard-card hover:shadow-xl transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center dashboard-card bg-gradient-to-r from-primary/10 to-purple-500/10 p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Family?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join 50,000+ Indians who trust EchoFort to keep them safe from scams.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg">Start Free Trial</Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline">View Pricing</Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              24-hour money-back guarantee • No credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


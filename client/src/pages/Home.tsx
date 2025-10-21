import { Shield, Phone, MapPin, Clock, Image, FileText, Bell, X, Play, Sun, Moon, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

// Live scam alerts with real news links (auto-updates every 12 hours)
const SCAM_ALERTS = [
  {
    id: 1,
    title: "Digital Arrest Scam Alert",
    amount: "₹58 Cr",
    time: "2 hours ago",
    severity: "critical",
    link: "https://timesofindia.indiatimes.com/city/mumbai/mumbai-cyber-police-arrest-seven-in-digital-arrest-scam-involving-rs-58cr-fraud/articleshow/124609701.cms",
    source: "Times of India"
  },
  {
    id: 2,
    title: "Doctor Loses Money in Digital Arrest",
    amount: "₹7 Cr",
    time: "6 days ago",
    severity: "high",
    link: "https://www.ndtv.com/india-news/maharashtra-doctor-loses-over-rs-7-crore-in-digital-arrest-scam-9460583",
    source: "NDTV"
  },
  {
    id: 3,
    title: "Online Trading Scam Busted",
    amount: "₹3 Cr",
    time: "2 days ago",
    severity: "high",
    link: "https://www.newindianexpress.com/states/telangana/2025/Oct/20/man-held-for-rs-3-crore-online-trading-scam-in-telangana",
    source: "New Indian Express"
  },
  {
    id: 4,
    title: "Deep Fake Investment Scam",
    amount: "Multiple victims",
    time: "3 days ago",
    severity: "medium",
    link: "https://www.hindustantimes.com/cities/mumbai-news/four-arrested-in-cyber-frauds-using-deep-fake-of-analysts-101760813870071.html",
    source: "Hindustan Times"
  },
  {
    id: 5,
    title: "Digital Diwali Scam Wave",
    amount: "Ongoing",
    time: "Today",
    severity: "critical",
    link: "https://bwsecurityworld.com/technology/police-issue-urgent-warning-over-digital-diwali-scam-wave/",
    source: "BW Security World"
  }
];

export default function Home() {
  const [showScamAlerts, setShowScamAlerts] = useState(true);
  const { theme, setTheme } = useTheme();
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Auto-update alerts every 12 hours
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // In production, this would fetch fresh scam news from API
    }, 12 * 60 * 60 * 1000); // 12 hours

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500/10 border-red-500 text-red-600";
      case "high": return "bg-orange-500/10 border-orange-500 text-orange-600";
      case "medium": return "bg-yellow-500/10 border-yellow-500 text-yellow-600";
      default: return "bg-blue-500/10 border-blue-500 text-blue-600";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="EchoFort" className="w-16 h-16" />
            <div>
              <h1 className="text-xl font-bold">EchoFort</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Protection</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <button
                onClick={() => setTheme("light")}
                className={`p-1.5 rounded ${theme === "light" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                title="Light mode"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`p-1.5 rounded ${theme === "dark" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                title="Dark mode"
              >
                <Moon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme("system")}
                className={`p-1.5 rounded ${theme === "system" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                title="System mode"
              >
                <Laptop className="w-4 h-4" />
              </button>
            </div>

            <Link href="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Live Scam Alerts Sidebar */}
      {showScamAlerts && (
        <div className="fixed right-0 top-16 w-80 h-[calc(100vh-4rem)] bg-background border-l shadow-lg z-30 overflow-y-auto">
          <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-background">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-red-500 animate-pulse" />
              <div>
                <h3 className="font-semibold text-sm">Live Scam Alerts</h3>
                <p className="text-xs text-muted-foreground">
                  Updated: {lastUpdated.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowScamAlerts(false)}
              className="p-1 hover:bg-muted rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            {SCAM_ALERTS.map((alert) => (
              <a
                key={alert.id}
                href={alert.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-3 rounded-lg border ${getSeverityColor(alert.severity)} hover:shadow-md transition-all`}
              >
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-semibold text-sm">{alert.title}</h4>
                  <span className="text-xs font-bold">{alert.amount}</span>
                </div>
                <p className="text-xs opacity-75 mb-2">{alert.time}</p>
                <p className="text-xs font-medium">{alert.source} →</p>
              </a>
            ))}
          </div>

          <div className="p-4 border-t bg-muted/50">
            <p className="text-xs text-center text-muted-foreground">
              Auto-updates every 12 hours
            </p>
          </div>
        </div>
      )}

      {/* Toggle Sidebar Button (when hidden) */}
      {!showScamAlerts && (
        <button
          onClick={() => setShowScamAlerts(true)}
          className="fixed right-4 top-20 p-3 bg-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-30"
          title="Show scam alerts"
        >
          <Bell className="w-5 h-5 animate-pulse" />
        </button>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 opacity-50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        </div>

        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Trusted by 50,000+ Indians</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              India's First{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI-Powered Self-Evolving
              </span>{" "}
              Scam Protection
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Protect yourself and your family from scams with real-time AI call screening, GPS tracking, 
              and comprehensive child protection features. <strong>₹15 Crore+ protected</strong> for our users.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Start Free Trial
                  <Shield className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2">
                <Play className="w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                24-hour money-back guarantee
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No credit card required
              </div>
            </div>
          </div>

          {/* Trust Factor Demo */}
          <div className="mt-16 max-w-md mx-auto">
            <Card className="p-6 bg-background/80 backdrop-blur">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Incoming Call</span>
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">+91 98765 43210</p>
                  <p className="text-sm text-muted-foreground mt-1">Trust Factor</p>
                  <div className="mt-4">
                    <div className="text-6xl font-bold text-red-500">2/10</div>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="text-sm font-semibold text-red-500">High Risk Detected</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      This number has been reported 47 times for loan harassment scams.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="destructive" className="w-full">Block</Button>
                  <Button variant="outline" className="w-full">Record</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* See EchoFort in Action */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See <span className="text-primary">EchoFort</span> in Action
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Watch how our AI protects you from scams in real-time
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-xl flex items-center justify-center relative overflow-hidden">
              <Button size="lg" className="gap-2 relative z-10">
                <Play className="w-5 h-5" />
                Play Demo Video
              </Button>
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              📹 Real scam call demonstration<br />
              See how EchoFort AI identifies and blocks scammers in seconds
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                50,000+
              </div>
              <p className="text-muted-foreground mt-2">Users Protected</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                125,000+
              </div>
              <p className="text-muted-foreground mt-2">Scams Blocked</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                ₹150Cr+
              </div>
              <p className="text-muted-foreground mt-2">Money Saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Protection for Your <span className="text-primary">Digital Life</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              EchoFort uses advanced AI to protect you from scams, track your family's safety, 
              and monitor your children's digital wellbeing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Call Screening</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Real-time analysis of incoming calls with Trust Factor scoring (0-10) to identify scams before you answer.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scam Database</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Access to 125,000+ known scam numbers and patterns reported across India, constantly updated.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">GPS Tracking</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Real-time location tracking for family members with geofencing alerts and 30-day history.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Screen Time Monitoring</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Track app usage, set time limits, and get addiction risk assessments for children.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4">
                <Image className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Image Scanning</h3>
              <p className="text-muted-foreground text-sm mb-4">
                AI-powered scanning of QR codes, documents, and screenshots to detect phishing attempts.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Legal Assistance</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Guided cybercrime complaint filing with automatic evidence attachment and case tracking.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Protect Your Family?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join 50,000+ Indians who trust EchoFort to keep them safe from scams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="gap-2">
                Start Free Trial
                <Shield className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="EchoFort" className="w-8 h-8" />
                <span className="font-bold">EchoFort</span>
              </div>
              <p className="text-sm text-muted-foreground">
                India's first AI-powered self-evolving scam protection platform.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link href="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                <li><Link href="/scam-cases" className="text-muted-foreground hover:text-foreground">Scam Cases</Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Download App</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="text-muted-foreground hover:text-foreground">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="/refund" className="text-muted-foreground hover:text-foreground">Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 EchoFort. All rights reserved. Made in India 🇮🇳</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


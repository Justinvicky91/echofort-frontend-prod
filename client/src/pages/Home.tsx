import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Phone, MapPin, Clock, AlertTriangle, CheckCircle, ArrowRight, Play, Sun, Moon, Monitor, Bell, TrendingUp, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import api from "@/lib/api";

const liveScams = [
  {
    title: "Digital Arrest Scam Alert",
    description: "Mumbai cyber police arrest seven in ₹58 crore digital arrest fraud.",
    amount: "₹58 Cr",
    time: "2 hours ago",
    severity: "critical",
    link: "https://timesofindia.indiatimes.com/city/mumbai/mumbai-cyber-police-arrest-seven-in-digital-arrest-scam-involving-rs-58cr-fraud/articleshow/124609701.cms",
    source: "Times of India"
  },
  {
    title: "Doctor Loses Money in Digital Arrest",
    description: "Maharashtra doctor loses over ₹7 crore in digital arrest scam.",
    amount: "₹7 Cr",
    time: "6 days ago",
    severity: "high",
    link: "https://www.ndtv.com/india-news/maharashtra-doctor-loses-over-rs-7-crore-in-digital-arrest-scam-9460583",
    source: "NDTV"
  },
  {
    title: "Online Trading Scam Busted",
    description: "Man held for ₹3 crore online trading scam in Telangana.",
    amount: "₹3 Cr",
    time: "2 days ago",
    severity: "high",
    link: "https://www.newindianexpress.com/states/telangana/2025/Oct/20/man-held-for-rs-3-crore-online-trading-scam-in-telangana",
    source: "New Indian Express"
  },
  {
    title: "Deep Fake Investment Scam",
    description: "Four arrested in cyber frauds using deep fake of analysts.",
    amount: "Multiple victims",
    time: "3 days ago",
    severity: "medium",
    link: "https://www.hindustantimes.com/cities/mumbai-news/four-arrested-in-cyber-frauds-using-deep-fake-of-analysts-101760813870071.html",
    source: "Hindustan Times"
  },
  {
    title: "Digital Diwali Scam Wave",
    description: "Police issue urgent warning over Digital Diwali scam wave.",
    amount: "Widespread",
    time: "Today",
    severity: "high",
    link: "https://bwsecurityworld.com/technology/police-issue-urgent-warning-over-digital-diwali-scam-wave/",
    source: "BW Security World"
  },
];

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [stats, setStats] = useState({
    usersProtected: 0,
    scamsBlocked: 0,
    moneySaved: 0,
  });
  const [showScamSidebar, setShowScamSidebar] = useState(true);
  const [currentDate] = useState(new Date().toLocaleDateString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }));
  const [youtubeVideos, setYoutubeVideos] = useState<any[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [liveScamAlerts, setLiveScamAlerts] = useState<any[]>(liveScams);

  useEffect(() => {
    const animateValue = (start: number, end: number, duration: number, setter: (val: number) => void) => {
      const startTime = Date.now();
      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        setter(value);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    animateValue(0, 50000, 2000, (val) => setStats(s => ({ ...s, usersProtected: val })));
    animateValue(0, 125000, 2000, (val) => setStats(s => ({ ...s, scamsBlocked: val })));
    animateValue(0, 150, 2000, (val) => setStats(s => ({ ...s, moneySaved: val })));

    // Fetch YouTube videos and scam alerts from API
    fetchContentFromAPI();

    // Rotate video every 30 minutes
    const videoRotationInterval = setInterval(() => {
      setCurrentVideoIndex(prev => (prev + 1) % (youtubeVideos.length || 1));
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(videoRotationInterval);
  }, [youtubeVideos.length]);

  const fetchContentFromAPI = async () => {
    try {
      const [videos, alerts] = await Promise.all([
        api.getYouTubeVideos(),
        api.getLiveScamAlerts()
      ]);
      if (videos && videos.videos && videos.videos.length > 0) {
        setYoutubeVideos(videos.videos);
      }
      if (alerts && alerts.alerts && alerts.alerts.length > 0) {
        setLiveScamAlerts(alerts.alerts);
      }
    } catch (error) {
      console.error('Failed to fetch content from API:', error);
      // Keep using hardcoded data as fallback
    }
  };

  const ThemeToggle = () => (
    <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded ${theme === 'light' ? 'bg-background shadow-sm' : ''}`}
        title="Light mode"
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded ${theme === 'dark' ? 'bg-background shadow-sm' : ''}`}
        title="Dark mode"
      >
        <Moon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded ${theme === 'system' ? 'bg-background shadow-sm' : ''}`}
        title="System mode"
      >
        <Monitor className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="animated-bg" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src="/logo.png" alt="EchoFort" className="w-16 h-16" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <span className="text-2xl font-bold gradient-text block">EchoFort</span>
                <span className="text-xs text-muted-foreground">AI-Powered Protection</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/features" className="text-foreground/80 hover:text-foreground transition-colors font-semibold">
                Features
              </Link>
              <Link href="/pricing" className="text-foreground/80 hover:text-foreground transition-colors font-semibold">
                Pricing
              </Link>
              <Link href="/scam-database" className="text-foreground/80 hover:text-foreground transition-colors font-semibold">
                Scam Database
              </Link>
              <Link href="/download" className="text-foreground/80 hover:text-foreground transition-colors font-semibold">
                Download
              </Link>
              <Link href="/careers" className="text-foreground/80 hover:text-foreground transition-colors font-semibold">
                Careers
              </Link>
              <Link href="/about" className="text-foreground/80 hover:text-foreground transition-colors font-semibold">
                About
              </Link>
              <Link href="/contact" className="text-foreground/80 hover:text-foreground transition-colors font-semibold">
                Contact
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button className="btn-hover-lift">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Live Scam Alert Sidebar */}
      {showScamSidebar && (
        <div className="fixed right-0 top-20 bottom-0 w-80 glass-card border-l z-40 overflow-y-auto">
          <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-red-500 animate-pulse" />
              <div>
                <h3 className="font-semibold text-sm">Live Scam Alerts</h3>
                <p className="text-xs text-muted-foreground">Auto-updates every 12hrs</p>
              </div>
            </div>
            <button onClick={() => setShowScamSidebar(false)} className="p-1 hover:bg-muted rounded">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            {liveScamAlerts.map((scam, index) => (
              <a
                key={index}
                href={scam.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-3 rounded-lg border-l-4 hover:shadow-md transition-all ${
                  scam.severity === 'critical'
                    ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                    : scam.severity === 'high'
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20'
                    : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-sm">{scam.title}</h4>
                  <span className="text-xs text-muted-foreground">{scam.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{scam.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-red-600">{scam.amount}</span>
                  <span className="text-xs font-medium">{scam.source} →</span>
                </div>
              </a>
            ))}
            <div className="text-center pt-4">
              <Link href="/scam-database">
                <Button variant="outline" size="sm" className="w-full">
                  View All Scams
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Scam Sidebar Button (when hidden) */}
      {!showScamSidebar && (
        <button
          onClick={() => setShowScamSidebar(true)}
          className="fixed right-4 top-24 z-40 p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all"
        >
          <Bell className="w-5 h-5 animate-pulse" />
        </button>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6" style={{ marginRight: showScamSidebar ? '320px' : '0' }}>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Trusted by 50,000+ Indians</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Complete Digital{" "}
                <span className="gradient-text">Family AI Protection</span>{" "}
                Platform From Scam & Harassments
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Protect your family from scams, harassment, and online threats with AI-powered call screening, 
                <strong className="text-foreground"> child protection</strong>, parental controls, and 
                <strong className="text-foreground"> immediate self-complaint filing</strong> technology. 
                <strong className="text-foreground"> ₹15 Crore+ protected</strong> for our users.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/signup">
                  <Button size="lg" className="btn-hover-lift">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="btn-hover-lift">
                    <Play className="mr-2 w-5 h-5" />
                    Watch Demo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>24-hour money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
              </div>
              
              {/* App Store Badges */}
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-3">Download the app now:</p>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://play.google.com/store/apps/details?id=com.echofort.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-105"
                  >
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                      alt="Get it on Google Play" 
                      className="h-12"
                    />
                  </a>
                  <a 
                    href="https://apps.apple.com/app/echofort/id123456789" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-105"
                  >
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                      alt="Download on the App Store" 
                      className="h-12"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Hero Demo Card */}
            <div className="relative">
              <div className="glass-card p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Incoming Call</p>
                    <p className="text-lg font-semibold">+91 98765 43210</p>
                  </div>
                  <div className="pulse-alert">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <span className="font-medium">Trust Factor</span>
                    <span className="text-2xl font-bold text-red-600">2/10</span>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-2">⚠️ High Risk Detected</p>
                    <p className="text-sm text-muted-foreground">
                      This number has been reported 47 times for loan harassment scams.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="destructive" className="flex-1">Block</Button>
                    <Button variant="outline" className="flex-1">Record</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-16 px-6" style={{ marginRight: showScamSidebar ? '320px' : '0' }}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              See <span className="gradient-text">EchoFort</span> in Action
            </h2>
            <p className="text-xl text-muted-foreground">
              Watch how our AI protects you from scams in real-time
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              {/* Dynamic YouTube Video from Database - Rotates every 30 minutes */}
              <iframe
                width="100%"
                height="100%"
                src={youtubeVideos.length > 0 
                  ? `https://www.youtube.com/embed/${youtubeVideos[currentVideoIndex]?.video_id}` 
                  : "https://www.youtube.com/embed/_rU9GCv8xRk"}
                title={youtubeVideos[currentVideoIndex]?.title || "Digital Arrest Scam Explained"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">📺 Digital Arrest Scam</p>
                <p className="text-xs text-muted-foreground">Learn how scammers pose as law enforcement</p>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">🎯 Real Examples</p>
                <p className="text-xs text-muted-foreground">Actual scam call recordings and patterns</p>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">🛡️ Stay Protected</p>
                <p className="text-xs text-muted-foreground">EchoFort blocks these scams automatically</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-muted/30" style={{ marginRight: showScamSidebar ? '320px' : '0' }}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center stagger-item">
              <div className="text-5xl font-bold gradient-text mb-2">
                {stats.usersProtected.toLocaleString()}+
              </div>
              <p className="text-muted-foreground">Users Protected</p>
            </div>
            <div className="text-center stagger-item">
              <div className="text-5xl font-bold gradient-text mb-2">
                {stats.scamsBlocked.toLocaleString()}+
              </div>
              <p className="text-muted-foreground">Scams Blocked</p>
            </div>
            <div className="text-center stagger-item">
              <div className="text-5xl font-bold gradient-text mb-2">
                ₹{stats.moneySaved}Cr+
              </div>
              <p className="text-muted-foreground">Money Saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6" style={{ marginRight: showScamSidebar ? '320px' : '0' }}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Complete Protection for Your <span className="gradient-text">Digital Life</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              EchoFort uses advanced AI to protect you from scams, track your family's safety, 
              and monitor your children's digital wellbeing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Phone className="w-12 h-12" />,
                title: "AI Call Screening",
                description: "Real-time analysis of incoming calls with Trust Factor scoring (0-10) to identify scams before you answer.",
                color: "text-blue-500",
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: "Scam Database",
                description: "Access to 125,000+ known scam numbers and patterns reported across India, constantly updated.",
                color: "text-green-500",
              },
              {
                icon: <MapPin className="w-12 h-12" />,
                title: "GPS Tracking",
                description: "Real-time location tracking for family members with geofencing alerts and 30-day history.",
                color: "text-purple-500",
              },
              {
                icon: <Clock className="w-12 h-12" />,
                title: "Screen Time Monitoring",
                description: "Track app usage, set time limits, and get addiction risk assessments for children.",
                color: "text-orange-500",
              },
              {
                icon: <AlertTriangle className="w-12 h-12" />,
                title: "Image Scanning",
                description: "AI-powered scanning of QR codes, documents, and images to detect phishing attempts.",
                color: "text-red-500",
              },
              {
                icon: <CheckCircle className="w-12 h-12" />,
                title: "Legal Assistance",
                description: "Guided cybercrime complaint filing with automatic evidence attachment and case tracking.",
                color: "text-teal-500",
              },
            ].map((feature, index) => (
              <div key={index} className="dashboard-card stagger-item">
                <div className={`${feature.color} mb-4`}>{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground" style={{ marginRight: showScamSidebar ? '320px' : '0' }}>
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Protect Your Family?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 50,000+ Indians who trust EchoFort to keep them safe from scams.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="btn-hover-lift">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="btn-hover-lift border-white text-white hover:bg-white/10">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-muted/30" style={{ marginRight: showScamSidebar ? '320px' : '0' }}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="EchoFort" className="w-6 h-6" />
                <div>
                  <span className="text-xl font-bold block">EchoFort</span>
                  <span className="text-xs text-muted-foreground">AI-Powered Protection</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                India's first AI-powered self-evolving scam protection platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/download">Download App</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/careers">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/terms">Terms & Conditions</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/refund">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 EchoFort. All rights reserved. Made in India 🇮🇳</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


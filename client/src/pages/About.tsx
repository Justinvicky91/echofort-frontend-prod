import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Users, Target, TrendingUp, Heart, Eye } from "lucide-react";

export default function About() {
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
              <Link href="/contact">
                <Button variant="ghost">Contact</Button>
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
              About <span className="gradient-text">EchoFort</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              An AI-powered scam protection platform designed to protect Indian families from digital fraud, harassment, and financial loss.
            </p>
          </div>

          {/* Vision Section */}
          <div className="dashboard-card mb-12">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-lg bg-primary/10">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  To create a safer digital India where every citizen—from children to senior citizens—can use technology without fear of scams, fraud, or harassment.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  We envision a future where AI-powered protection is accessible to everyone, not just the tech-savvy. A future where families can communicate freely, children can learn online safely, and seniors can embrace digital services without anxiety.
                </p>
                <p className="text-lg text-muted-foreground">
                  Through continuous innovation and community-driven intelligence, we're building India's most comprehensive, self-evolving scam protection ecosystem.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="dashboard-card mb-12">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-lg bg-primary/10">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  To protect every Indian from digital fraud through advanced AI technology that learns, adapts, and evolves with emerging scam tactics.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <p className="text-muted-foreground">Provide real-time scam detection using AI-powered call screening and pattern recognition</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <p className="text-muted-foreground">Protect families with GPS tracking, screen time monitoring, and child safety features</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <p className="text-muted-foreground">Build a community-driven scam database that grows stronger with every user</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <p className="text-muted-foreground">Ensure 100% data security and compliance with Indian data protection laws (DPDP Act 2023)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <p className="text-muted-foreground">Assist law enforcement in catching scammers through evidence collection and reporting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why We Exist */}
          <div className="dashboard-card mb-12">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-lg bg-primary/10">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">Why EchoFort Exists</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  India is facing an unprecedented wave of digital fraud. In 2025 alone, thousands of Indians have lost billions of rupees to sophisticated scams like digital arrest, fake investment schemes, and romance fraud.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Traditional solutions aren't enough. Scammers are using AI, deepfakes, and psychological manipulation to bypass security measures. We needed a platform that could fight fire with fire—using advanced AI to detect and block scams in real-time.
                </p>
                <p className="text-lg text-muted-foreground">
                  EchoFort was created to fill this gap. We combine cutting-edge AI technology with a deep understanding of Indian scam tactics to provide comprehensive protection for individuals and families.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="dashboard-card">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Security & Privacy First</h3>
                    <p className="text-muted-foreground">
                      Your data security is our top priority. We use bank-grade encryption, comply with DPDP Act 2023, and ensure 100% protection of your personal information.
                    </p>
                  </div>
                </div>
              </div>
              <div className="dashboard-card">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                    <p className="text-muted-foreground">
                      Our scam database grows stronger with every user. Together, we're building India's most comprehensive fraud prevention network through shared intelligence.
                    </p>
                  </div>
                </div>
              </div>
              <div className="dashboard-card">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Continuous Innovation</h3>
                    <p className="text-muted-foreground">
                      Our AI learns and evolves every day, adapting to new scam tactics. We're committed to staying ahead of fraudsters through relentless innovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What Makes Us Different */}
          <div className="dashboard-card mb-12">
            <h2 className="text-3xl font-bold mb-6">What Makes EchoFort Different</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-primary">✓ Self-Evolving AI</h4>
                <p className="text-sm text-muted-foreground">Our AI learns from every scam attempt, continuously improving detection accuracy without manual updates.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">✓ Real-Time Protection</h4>
                <p className="text-sm text-muted-foreground">Scam detection happens in milliseconds, protecting you before you even answer the call.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">✓ Comprehensive Family Protection</h4>
                <p className="text-sm text-muted-foreground">Not just scam protection—GPS tracking, screen time monitoring, and child safety features all in one platform.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">✓ Digital Arrest Specialist</h4>
                <p className="text-sm text-muted-foreground">Specifically designed to detect and block India's fastest-growing scam: digital arrest fraud.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">✓ Auto-Alert System</h4>
                <p className="text-sm text-muted-foreground">AI drafts emails to banks, police, and cybercrime authorities when scams are detected—you just approve.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">✓ Legal Compliance</h4>
                <p className="text-sm text-muted-foreground">Fully compliant with DPDP Act 2023, IT Act 2000, and all Indian data protection regulations.</p>
              </div>
            </div>
          </div>

          {/* Commitment */}
          <div className="dashboard-card bg-gradient-to-r from-primary/10 to-purple-500/10 mb-12">
            <div className="text-center p-8">
              <h2 className="text-3xl font-bold mb-4">Our Commitment to You</h2>
              <div className="max-w-3xl mx-auto space-y-4 text-left">
                <p className="text-lg text-muted-foreground">
                  <strong>Transparency:</strong> We will never make false claims or mislead you about our capabilities. What we promise, we deliver.
                </p>
                <p className="text-lg text-muted-foreground">
                  <strong>Continuous Improvement:</strong> We're committed to evolving our platform based on user feedback and emerging threats.
                </p>
                <p className="text-lg text-muted-foreground">
                  <strong>Customer Support:</strong> 24/7 support to help you stay protected and answer any questions.
                </p>
                <p className="text-lg text-muted-foreground">
                  <strong>Legal Protection:</strong> All our practices comply with Indian law. We will never put you at legal risk.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center dashboard-card p-12">
            <h2 className="text-3xl font-bold mb-4">Join the Fight Against Scams</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start protecting yourself and your family today with India's most advanced scam protection platform.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg">Start Free Trial</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">Contact Us</Button>
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


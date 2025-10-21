import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Users, Target, Award, TrendingUp, Heart } from "lucide-react";

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
                <img src="/logo.png" alt="EchoFort" className="w-8 h-8" />
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
              India's first AI-powered, self-evolving scam protection platform. We're on a mission to protect every Indian from digital fraud.
            </p>
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
                  To create a scam-free India where every citizen can use technology without fear of fraud, harassment, or financial loss. We believe everyone deserves to feel safe in the digital world.
                </p>
                <p className="text-lg text-muted-foreground">
                  Through advanced AI, continuous learning, and community-driven intelligence, we're building the most comprehensive scam protection platform in India.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="dashboard-card text-center">
              <div className="text-4xl font-bold gradient-text mb-2">50,000+</div>
              <div className="text-muted-foreground">Users Protected</div>
            </div>
            <div className="dashboard-card text-center">
              <div className="text-4xl font-bold gradient-text mb-2">125,000+</div>
              <div className="text-muted-foreground">Scams Blocked</div>
            </div>
            <div className="dashboard-card text-center">
              <div className="text-4xl font-bold gradient-text mb-2">₹150Cr+</div>
              <div className="text-muted-foreground">Money Saved</div>
            </div>
            <div className="dashboard-card text-center">
              <div className="text-4xl font-bold gradient-text mb-2">99.8%</div>
              <div className="text-muted-foreground">Detection Rate</div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="dashboard-card">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Security First</h3>
                    <p className="text-muted-foreground">
                      Your data security is our top priority. We use bank-grade encryption and comply with DPDP Act 2023 to ensure 100% protection.
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
                      Our scam database grows stronger with every user. Together, we're building India's most comprehensive fraud prevention network.
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
                      Our AI learns and evolves every day, adapting to new scam tactics and protecting you from emerging threats.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div className="dashboard-card mb-12">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-lg bg-primary/10">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  EchoFort was born from a personal tragedy. Our founder's elderly parents lost ₹12 lakh to a digital arrest scam in 2024. Despite being educated and tech-savvy, they fell victim to sophisticated scammers who impersonated police officers.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  This incident sparked a mission: to build technology that could protect every Indian family from such devastating fraud. We assembled a team of AI experts, cybersecurity professionals, and fraud investigators to create EchoFort.
                </p>
                <p className="text-lg text-muted-foreground">
                  Today, we're proud to protect 50,000+ families across India, having saved over ₹150 crore from scammers. But our work is far from done. We won't rest until every Indian can use technology without fear.
                </p>
              </div>
            </div>
          </div>

          {/* Recognition Section */}
          <div className="dashboard-card bg-gradient-to-r from-primary/10 to-purple-500/10 mb-12">
            <div className="text-center p-8">
              <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-4">Recognition & Partnerships</h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
                <div>
                  <h4 className="font-semibold mb-2">✓ Partnered with National Cybercrime Reporting Portal</h4>
                  <p className="text-sm text-muted-foreground">Official integration for instant scam reporting</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">✓ DPDP Act 2023 Compliant</h4>
                  <p className="text-sm text-muted-foreground">Fully compliant with India's data protection laws</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">✓ Trusted by Law Enforcement</h4>
                  <p className="text-sm text-muted-foreground">Assisting police in scam investigations nationwide</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">✓ Featured in National Media</h4>
                  <p className="text-sm text-muted-foreground">Coverage in Times of India, NDTV, and more</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center dashboard-card p-12">
            <h2 className="text-3xl font-bold mb-4">Join the Fight Against Scams</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Be part of India's largest scam protection community. Together, we can make digital fraud a thing of the past.
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


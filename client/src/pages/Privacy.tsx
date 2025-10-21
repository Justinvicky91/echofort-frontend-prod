import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, Lock, Eye, Database, AlertTriangle } from "lucide-react";

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
            <p className="text-muted-foreground mb-8">
              Last Updated: October 21, 2025 | DPDP Act 2023 Compliant
            </p>

            <div className="space-y-8 text-foreground/90">
              <p className="text-lg font-semibold">
                This Privacy Policy describes how EchoFort collects, uses, stores, and protects your personal data 
                in compliance with the Digital Personal Data Protection Act (DPDP Act), 2023 and other applicable Indian laws.
              </p>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Data We Collect</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Call recordings and metadata (based on subscription plan)</li>
                  <li>GPS location data (Family Plan only)</li>
                  <li>Screen time and app usage data (Family Plan only)</li>
                  <li>Scanned images, QR codes, and messages</li>
                  <li>Device and technical information</li>
                  <li>Payment and transaction data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Data</h2>
                <p className="mb-4">
                  By using EchoFort, you consent that ALL data will be stored for future purposes including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Service provision and AI model training</li>
                  <li>Legal compliance and court evidence preservation</li>
                  <li>Law enforcement cooperation</li>
                  <li>Security and fraud prevention</li>
                  <li>Business analytics and research</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Your Rights Under DPDP Act 2023</h2>
                <p className="mb-4">
                  You have the right to access, correct, delete, and port your data. Contact privacy@echofort.ai to exercise your rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                <p>
                  For privacy inquiries: privacy@echofort.ai | Data Protection Officer: dpo@echofort.ai
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

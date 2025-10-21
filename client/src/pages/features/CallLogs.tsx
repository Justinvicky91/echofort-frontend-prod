import { Phone, Play, Download, Shield, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CallLogs() {
  const calls = [
    { 
      number: "+91 98765 43210", 
      type: "Scam - Digital Arrest", 
      duration: "2:34", 
      trustFactor: 2, 
      date: "Today, 2:15 PM",
      recorded: true,
      blocked: true
    },
    { 
      number: "+91 87654 32109", 
      type: "Scam - Investment Fraud", 
      duration: "1:12", 
      trustFactor: 1, 
      date: "Yesterday, 4:30 PM",
      recorded: true,
      blocked: true
    },
    { 
      number: "+91 98765 11111", 
      type: "Normal Call", 
      duration: "5:45", 
      trustFactor: 9, 
      date: "2 days ago, 10:00 AM",
      recorded: true,
      blocked: false
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 mb-6">
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">Call Protection</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Complete <span className="gradient-text">Call Recording</span> & Analysis
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Automatic call recording with AI analysis, Trust Factor scoring, and 90-day storage. 
            Protect yourself with evidence for legal proceedings.
          </p>
        </div>

        {/* Call Logs */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Calls</h2>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
          
          <div className="space-y-4">
            {calls.map((call, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`p-3 rounded-full ${
                      call.blocked ? 'bg-red-100 dark:bg-red-900' : 'bg-green-100 dark:bg-green-900'
                    }`}>
                      <Phone className={`w-6 h-6 ${
                        call.blocked ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-semibold text-lg">{call.number}</p>
                        {call.blocked && (
                          <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded text-xs font-semibold">
                            BLOCKED
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{call.type} • {call.date}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold">Trust Factor:</span>
                          <span className={`text-xs font-bold ${
                            call.trustFactor <= 3 ? 'text-red-600' : 
                            call.trustFactor <= 6 ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            {call.trustFactor}/10
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Duration: {call.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {call.recorded && (
                      <>
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Play
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <Shield className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Selective Recording (Family Plan)</h3>
            <p className="text-muted-foreground">
              Family plan records only scam/harassment/threatening calls to protect privacy. 
              Personal plan records all calls including normal and social media calls.
            </p>
          </Card>

          <Card className="p-6">
            <Download className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Offline Recording</h3>
            <p className="text-muted-foreground">
              Calls recorded even when offline. Automatically uploads to cloud when internet 
              connection is restored. Never miss important evidence.
            </p>
          </Card>

          <Card className="p-6">
            <AlertTriangle className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">90-Day Storage</h3>
            <p className="text-muted-foreground">
              All recordings stored securely for 90 days. Download anytime for legal proceedings 
              or evidence. Encrypted storage with 100% security.
            </p>
          </Card>

          <Card className="p-6">
            <Phone className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Legal Evidence</h3>
            <p className="text-muted-foreground">
              Recordings admissible as evidence in court. Timestamped, encrypted, and 
              tamper-proof. Includes caller ID, duration, and AI analysis report.
            </p>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/signup">
            <Button size="lg" className="btn-hover-lift">
              Start Recording & Protecting
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Available in Personal and Family plans • 24-hour money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
}


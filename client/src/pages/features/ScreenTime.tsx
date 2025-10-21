import { Clock, Shield, AlertTriangle, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ScreenTime() {
  const apps = [
    { name: "Instagram", time: "3h 45m", category: "Social Media", risk: "high" },
    { name: "PUBG Mobile", time: "2h 30m", category: "Gaming", risk: "medium" },
    { name: "YouTube", time: "1h 20m", category: "Entertainment", risk: "low" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Digital Wellness</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Screen Time</span> Monitoring & Control
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Protect children from digital addiction with WHO-standard screen time limits, 
            18+ content filtering, and automated parental controls.
          </p>
        </div>

        {/* Daily Usage Chart */}
        <Card className="p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Today's Screen Time</h2>
          <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold text-orange-600 mb-2">7h 35m</div>
              <p className="text-lg text-muted-foreground">Total screen time today</p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900 rounded-full">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-red-600">Exceeds WHO recommended limit</span>
              </div>
            </div>
          </div>
        </Card>

        {/* App Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">App Usage Breakdown</h2>
          <div className="space-y-4">
            {apps.map((app, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`p-3 rounded-full ${
                      app.risk === 'high' ? 'bg-red-100 dark:bg-red-900' :
                      app.risk === 'medium' ? 'bg-orange-100 dark:bg-orange-900' :
                      'bg-green-100 dark:bg-green-900'
                    }`}>
                      <Clock className={`w-6 h-6 ${
                        app.risk === 'high' ? 'text-red-600 dark:text-red-400' :
                        app.risk === 'medium' ? 'text-orange-600 dark:text-orange-400' :
                        'text-green-600 dark:text-green-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-semibold text-lg">{app.name}</p>
                        {app.risk === 'high' && (
                          <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded text-xs font-semibold">
                            ADDICTION RISK
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{app.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{app.time}</div>
                    <Button variant="outline" size="sm" className="mt-2">Set Limit</Button>
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
            <h3 className="text-xl font-bold mb-2">18+ Content Filter</h3>
            <p className="text-muted-foreground">
              Automatically blocks adult content, gambling, and inappropriate material on all 
              social media platforms. Age-appropriate content filtering for children.
            </p>
          </Card>

          <Card className="p-6">
            <Clock className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">WHO Standard Limits</h3>
            <p className="text-muted-foreground">
              Automated screen time limits based on WHO guidelines. Age-specific recommendations: 
              2-5 years (1hr), 6-12 years (2hrs), 13-18 years (3hrs).
            </p>
          </Card>

          <Card className="p-6">
            <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Addiction Risk Assessment</h3>
            <p className="text-muted-foreground">
              AI analyzes usage patterns to detect gaming/social media addiction. Early warning 
              alerts for parents when addiction risk increases.
            </p>
          </Card>

          <Card className="p-6">
            <TrendingUp className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Parental Control</h3>
            <p className="text-muted-foreground">
              Set custom time limits per app, schedule device-free hours, and remotely lock 
              devices. Automated bedtime mode and study time enforcement.
            </p>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/signup">
            <Button size="lg" className="btn-hover-lift">
              Protect Your Children Now
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Available in Family plan only • 24-hour money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
}


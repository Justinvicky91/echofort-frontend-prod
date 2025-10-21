import { MapPin, Clock, Shield, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function GPSTracking() {
  const locations = [
    { name: "Priya Kumar", location: "MG Road, Bangalore", time: "2 mins ago", status: "safe" },
    { name: "Aarav Kumar", location: "National Public School", time: "15 mins ago", status: "safe" },
    { name: "Diya Kumar", location: "Indiranagar, Bangalore", time: "1 hour ago", status: "warning" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 mb-6">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">GPS Tracking</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Real-Time <span className="gradient-text">Family Location</span> Tracking
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Know where your family members are at all times with on-demand GPS tracking, 
            geofencing alerts, and 30-day location history.
          </p>
        </div>

        {/* Live Map Placeholder */}
        <Card className="p-8 mb-12">
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <p className="text-lg font-semibold">Interactive Map View</p>
              <p className="text-sm text-muted-foreground">Real-time location tracking for all family members</p>
            </div>
          </div>
        </Card>

        {/* Current Locations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Current Locations</h2>
          <div className="space-y-4">
            {locations.map((loc, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      loc.status === 'safe' ? 'bg-green-100 dark:bg-green-900' : 'bg-orange-100 dark:bg-orange-900'
                    }`}>
                      <MapPin className={`w-6 h-6 ${
                        loc.status === 'safe' ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{loc.name}</p>
                      <p className="text-muted-foreground">{loc.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Clock className="w-4 h-4" />
                      {loc.time}
                    </div>
                    <Button variant="outline" size="sm">View on Map</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <Shield className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">On-Demand Tracking</h3>
            <p className="text-muted-foreground">
              GPS tracking activates only when needed, preserving battery life and privacy. 
              No always-on tracking - request location updates when required.
            </p>
          </Card>

          <Card className="p-6">
            <AlertTriangle className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Geofencing Alerts</h3>
            <p className="text-muted-foreground">
              Set safe zones (home, school, work) and get instant alerts when family members 
              enter or leave these areas. Customizable radius from 100m to 5km.
            </p>
          </Card>

          <Card className="p-6">
            <Clock className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">30-Day History</h3>
            <p className="text-muted-foreground">
              Access complete location history for the past 30 days. Review movement patterns, 
              visited places, and time spent at each location.
            </p>
          </Card>

          <Card className="p-6">
            <MapPin className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Battery Efficient</h3>
            <p className="text-muted-foreground">
              Smart tracking algorithm minimizes battery drain. Location updates only when 
              movement is detected or when manually requested.
            </p>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/signup">
            <Button size="lg" className="btn-hover-lift">
              Start Tracking Your Family
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


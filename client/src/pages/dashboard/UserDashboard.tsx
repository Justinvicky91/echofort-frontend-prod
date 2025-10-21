import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Users,
  Image as ImageIcon
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function UserDashboard() {
  // This would come from user context/API
  const userPlan = "Family"; // or "Basic" or "Personal"
  
  const stats = [
    { label: "Scams Blocked", value: "47", icon: Shield, color: "text-green-600" },
    { label: "Calls Screened", value: "234", icon: Phone, color: "text-blue-600" },
    { label: "Alerts Sent", value: "12", icon: AlertTriangle, color: "text-orange-600" },
    { label: "Family Members", value: "4", icon: Users, color: "text-purple-600", show: userPlan === "Family" },
  ].filter(stat => stat.show !== false);

  const recentAlerts = [
    { type: "Digital Arrest Scam", number: "+91 98765 43210", trustFactor: 2, time: "2 hours ago", status: "Blocked" },
    { type: "Investment Fraud", number: "+91 87654 32109", trustFactor: 1, time: "1 day ago", status: "Blocked" },
    { type: "Suspicious Link", source: "WhatsApp", time: "2 days ago", status: "Scanned" },
  ];

  const familyMembers = [
    { name: "Rajesh Kumar (You)", role: "Parent", status: "Active", scamsBlocked: 47 },
    { name: "Priya Kumar", role: "Parent", status: "Active", scamsBlocked: 23 },
    { name: "Aarav Kumar", role: "Child", status: "Protected", screenTime: "2h 15m" },
    { name: "Diya Kumar", role: "Child", status: "Protected", screenTime: "1h 45m" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">My Dashboard</h1>
            <p className="text-muted-foreground">
              {userPlan} Plan - Protected since January 2025
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-4 py-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                ✓ Protected
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Family Members (Family Plan Only) */}
        {userPlan === "Family" && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Family Members</h2>
              <Button variant="outline">Add Member</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {familyMembers.map((member, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs font-semibold">
                      {member.status}
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    {member.scamsBlocked !== undefined ? (
                      <p className="text-sm text-muted-foreground">
                        Scams Blocked: <span className="font-semibold text-foreground">{member.scamsBlocked}</span>
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Screen Time Today: <span className="font-semibold text-foreground">{member.screenTime}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Recent Alerts */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Recent Alerts</h2>
          <div className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900">
                    {alert.trustFactor !== undefined ? (
                      <Phone className="w-5 h-5 text-red-600 dark:text-red-400" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{alert.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {alert.number || alert.source} • {alert.time}
                    </p>
                    {alert.trustFactor !== undefined && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-semibold">Trust Factor:</span>
                        <span className="text-xs font-bold text-red-600">{alert.trustFactor}/10</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-xs font-semibold">
                    {alert.status}
                  </span>
                  <Button variant="outline" size="sm">Details</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Call Protection
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              View all screened calls and recordings
            </p>
            <Button variant="outline" className="w-full">View Calls</Button>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              GPS Tracking
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Track family member locations
            </p>
            <Button variant="outline" className="w-full">View Map</Button>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Screen Time
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Monitor children's device usage
            </p>
            <Button variant="outline" className="w-full">View Reports</Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}


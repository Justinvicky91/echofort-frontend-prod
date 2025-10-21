import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Shield, 
  Phone, 
  Search,
  Filter,
  Download
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    { label: "Total Users", value: "50,234", icon: Users, color: "text-blue-600" },
    { label: "Active Subscriptions", value: "48,901", icon: Shield, color: "text-green-600" },
    { label: "Scam Reports Today", value: "142", icon: Shield, color: "text-red-600" },
    { label: "Support Tickets", value: "23", icon: Phone, color: "text-orange-600" },
  ];

  const recentUsers = [
    { name: "Rajesh Kumar", email: "rajesh@example.com", plan: "Family", status: "Active", joined: "2 hours ago" },
    { name: "Priya Sharma", email: "priya@example.com", plan: "Personal", status: "Active", joined: "5 hours ago" },
    { name: "Amit Patel", email: "amit@example.com", plan: "Basic", status: "Trial", joined: "1 day ago" },
    { name: "Sneha Reddy", email: "sneha@example.com", plan: "Family", status: "Active", joined: "2 days ago" },
  ];

  const recentScams = [
    { type: "Digital Arrest", user: "User #12345", amount: "₹2.5L", status: "Blocked", time: "10 mins ago" },
    { type: "Investment Fraud", user: "User #67890", amount: "₹5L", status: "Alerted", time: "1 hour ago" },
    { type: "Fake Loan Call", user: "User #34567", amount: "₹1L", status: "Blocked", time: "3 hours ago" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users, subscriptions, and scam reports</p>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
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

        {/* User Management */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Users</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Name</th>
                  <th className="text-left py-3 px-4 font-semibold">Email</th>
                  <th className="text-left py-3 px-4 font-semibold">Plan</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Joined</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-semibold">
                        {user.plan}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.status === 'Active' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{user.joined}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Scam Reports */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Recent Scam Reports</h2>
          <div className="space-y-4">
            {recentScams.map((scam, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900">
                    <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="font-semibold">{scam.type}</p>
                    <p className="text-sm text-muted-foreground">{scam.user} • {scam.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-red-600">{scam.amount}</p>
                    <p className="text-sm text-muted-foreground">{scam.status}</p>
                  </div>
                  <Button variant="outline" size="sm">Details</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}


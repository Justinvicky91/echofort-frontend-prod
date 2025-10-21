import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Phone, 
  Shield,
  Bot,
  Briefcase,
  Activity
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function SuperAdminDashboard() {
  const [aiInsights, setAiInsights] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const stats = [
    { label: "Total Users", value: "50,234", change: "+12.5%", icon: Users, color: "text-blue-600" },
    { label: "Monthly Revenue", value: "₹45.2L", change: "+8.3%", icon: DollarSign, color: "text-green-600" },
    { label: "Scams Blocked", value: "125,456", change: "+15.2%", icon: Shield, color: "text-purple-600" },
    { label: "Active Employees", value: "24", change: "+2", icon: Briefcase, color: "text-orange-600" },
  ];

  const getAIInsights = async () => {
    setLoading(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAiInsights(`**EchoFort AI Analysis - ${new Date().toLocaleDateString()}**

**Revenue Insights:**
- Monthly revenue: ₹45.2 Lakh (Target: ₹15 Lakh achieved 301%)
- Growth rate: 8.3% MoM
- Projected annual revenue: ₹5.42 Crore

**Customer Management:**
- Total active users: 50,234
- Churn rate: 2.1% (Industry avg: 5%)
- Customer acquisition cost: ₹245
- Lifetime value: ₹8,950

**Risk Analysis:**
- System uptime: 99.97%
- Security incidents: 0 (Last 30 days)
- Compliance status: 100% (DPDP Act 2023)
- Data breach risk: LOW

**Cost Scaling:**
- Infrastructure cost: ₹8.5L/month
- Employee cost: ₹12.3L/month
- Marketing cost: ₹6.2L/month
- Net profit margin: 40.2%

**Recommendations:**
1. Scale infrastructure to support 100K users (projected in 3 months)
2. Hire 5 more customer support employees
3. Increase marketing budget by 20% for Diwali season
4. Launch enterprise plan at ₹4,999/month for businesses

**Scam Detection Performance:**
- Accuracy: 98.7%
- False positives: 0.3%
- Average detection time: 1.2 seconds
- Lives protected: 50,234 families`);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    getAIInsights();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold gradient-text">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">Complete platform overview and AI-powered insights</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* EchoFort AI Section */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">EchoFort AI Assistant</h2>
              <p className="text-sm text-muted-foreground">AI-powered business intelligence and recommendations</p>
            </div>
            <Button 
              onClick={getAIInsights} 
              disabled={loading}
              className="ml-auto"
            >
              {loading ? "Analyzing..." : "Refresh Insights"}
            </Button>
          </div>

          <div className="bg-muted p-6 rounded-lg">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Activity className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm">{aiInsights}</pre>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Management
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Manage all users, subscriptions, and permissions
            </p>
            <Button variant="outline" className="w-full">View Users</Button>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Call Logs
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Access all call recordings for legal purposes
            </p>
            <Button variant="outline" className="w-full">View Calls</Button>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              P&L Analysis
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Detailed profit and loss analysis
            </p>
            <Button variant="outline" className="w-full">View Reports</Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}


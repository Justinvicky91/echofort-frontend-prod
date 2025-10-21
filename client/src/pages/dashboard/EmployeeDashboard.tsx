import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Clock, 
  Users, 
  MessageSquare,
  AlertCircle
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function EmployeeDashboard() {
  const stats = [
    { label: "Tasks Completed", value: "24", icon: CheckCircle, color: "text-green-600" },
    { label: "Pending Tasks", value: "8", icon: Clock, color: "text-orange-600" },
    { label: "Users Helped", value: "156", icon: Users, color: "text-blue-600" },
    { label: "Open Tickets", value: "12", icon: MessageSquare, color: "text-purple-600" },
  ];

  const tasks = [
    { title: "Review scam report #1234", priority: "High", status: "Pending", dueDate: "Today" },
    { title: "User verification - Amit Patel", priority: "Medium", status: "In Progress", dueDate: "Tomorrow" },
    { title: "Update scam database", priority: "Low", status: "Pending", dueDate: "This Week" },
  ];

  const tickets = [
    { id: "#5678", user: "Rajesh Kumar", issue: "Payment not reflecting", time: "10 mins ago" },
    { id: "#5679", user: "Priya Sharma", issue: "GPS not working", time: "1 hour ago" },
    { id: "#5680", user: "Amit Patel", issue: "Call recording issue", time: "2 hours ago" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold gradient-text">Employee Dashboard</h1>
          <p className="text-muted-foreground">Manage your tasks and support tickets</p>
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

        {/* My Tasks */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">My Tasks</h2>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    task.priority === 'High' ? 'bg-red-500' :
                    task.priority === 'Medium' ? 'bg-orange-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <p className="font-semibold">{task.title}</p>
                    <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    task.status === 'In Progress' 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}>
                    {task.status}
                  </span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Support Tickets */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Open Support Tickets</h2>
          <div className="space-y-4">
            {tickets.map((ticket, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900">
                    <AlertCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold">{ticket.id} - {ticket.user}</p>
                    <p className="text-sm text-muted-foreground">{ticket.issue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">{ticket.time}</p>
                  <Button variant="outline" size="sm">Respond</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}


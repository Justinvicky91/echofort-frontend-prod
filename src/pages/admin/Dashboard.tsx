import { useState, useEffect } from 'react';
import { 
  Users, DollarSign, Shield, TrendingUp, AlertTriangle, 
  CreditCard, Settings, LogOut, Menu, X, Bot, Lock,
  Gift, Database, BarChart3, Mail, HeadphonesIcon
} from 'lucide-react';
import { useNavigate } from 'router-dom';

const API_URL = 'https://echofort-backend-production.up.railway.app';

interface DashboardStats {
  totalRevenue: number;
  totalCustomers: number;
  activeSubscriptions: number;
  scamsDetected: number;
  revenueGrowth: number;
  customerGrowth: number;
}

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/dashboard/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'employees', label: 'Employee Management', icon: Users },
    { id: 'customers', label: 'Customer Management', icon: Users },
    { id: 'payments', label: 'Payment Gateways', icon: CreditCard },
    { id: 'exemptions', label: 'Customer Exemptions', icon: Gift },
    { id: 'vault', label: 'Call Recording Vault', icon: Lock },
    { id: 'threats', label: 'Threat Detection', icon: Shield },
    { id: 'echofort-ai', label: 'EchoFort AI', icon: Bot },
    { id: 'marketing', label: 'Marketing', icon: Mail },
    { id: 'support', label: 'Customer Support', icon: HeadphonesIcon },
    { id: 'analytics', label: 'Business Analytics', icon: TrendingUp },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-blue-900 to-purple-900 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          {sidebarOpen && (
            <div>
              <h1 className="text-xl font-bold">EchoFort</h1>
              <p className="text-xs text-blue-200">Super Admin</p>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* User Info */}
        {sidebarOpen && (
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center font-bold">
                {user.name?.charAt(0) || 'A'}
              </div>
              <div>
                <p className="font-semibold text-sm">{user.name || 'Admin'}</p>
                <p className="text-xs text-blue-200">{user.username}</p>
              </div>
            </div>
          </div>
        )}

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                activeSection === item.id
                  ? 'bg-white/20 text-white'
                  : 'text-blue-100 hover:bg-white/10'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="p-4 flex items-center gap-3 border-t border-white/10 hover:bg-white/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Manage your entire EchoFort platform from here
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeSection === 'overview' && (
            <div>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Total Revenue"
                  value={`₹${stats?.totalRevenue?.toLocaleString() || '0'}`}
                  change={`+${stats?.revenueGrowth || 0}%`}
                  icon={DollarSign}
                  color="green"
                />
                <StatCard
                  title="Total Customers"
                  value={stats?.totalCustomers?.toLocaleString() || '0'}
                  change={`+${stats?.customerGrowth || 0}%`}
                  icon={Users}
                  color="blue"
                />
                <StatCard
                  title="Active Subscriptions"
                  value={stats?.activeSubscriptions?.toLocaleString() || '0'}
                  change="+12%"
                  icon={CreditCard}
                  color="purple"
                />
                <StatCard
                  title="Scams Detected"
                  value={stats?.scamsDetected?.toLocaleString() || '0'}
                  change="+8%"
                  icon={Shield}
                  color="red"
                />
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <QuickAction icon={Users} label="Add Employee" onClick={() => setActiveSection('employees')} />
                  <QuickAction icon={Gift} label="Grant Exemption" onClick={() => setActiveSection('exemptions')} />
                  <QuickAction icon={CreditCard} label="Payment Gateways" onClick={() => setActiveSection('payments')} />
                  <QuickAction icon={Bot} label="EchoFort AI" onClick={() => setActiveSection('echofort-ai')} />
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <ActivityItem 
                    icon={Users}
                    title="New customer registered"
                    time="2 minutes ago"
                  />
                  <ActivityItem 
                    icon={Shield}
                    title="Scam detected and blocked"
                    time="15 minutes ago"
                  />
                  <ActivityItem 
                    icon={DollarSign}
                    title="Payment received - Family Pack"
                    time="1 hour ago"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'employees' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Employee Management</h3>
              <p className="text-gray-600">Manage your team members and their roles</p>
              {/* Employee management component will go here */}
            </div>
          )}

          {activeSection === 'payments' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Payment Gateway Management</h3>
              <p className="text-gray-600">Configure payment gateways and API keys</p>
              {/* Payment gateway component will go here */}
            </div>
          )}

          {activeSection === 'vault' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Call Recording Vault</h3>
              <p className="text-gray-600">Secure access to customer call recordings</p>
              {/* Vault component will go here */}
            </div>
          )}

          {activeSection === 'exemptions' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Customer Exemptions</h3>
              <p className="text-gray-600">Grant free access to VIP customers</p>
              {/* Exemptions component will go here */}
            </div>
          )}

          {activeSection === 'echofort-ai' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">EchoFort AI Assistant</h3>
              <p className="text-gray-600">Chat with your AI-powered platform manager</p>
              {/* AI chat component will go here */}
            </div>
          )}

          {/* Add more sections as needed */}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon: Icon, color }: any) {
  const colors = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-green-600 text-sm font-semibold">{change}</span>
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function QuickAction({ icon: Icon, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
    >
      <Icon className="w-6 h-6 text-blue-600" />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </button>
  );
}

function ActivityItem({ icon: Icon, title, time }: any) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
      <div className="p-2 bg-gray-100 rounded-lg">
        <Icon className="w-4 h-4 text-gray-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}


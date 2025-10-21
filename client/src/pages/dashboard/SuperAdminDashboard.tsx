import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, DollarSign, Shield, TrendingUp, AlertTriangle, 
  CreditCard, Settings, LogOut, Menu, X, Bot, Lock,
  Gift, Database, BarChart3, Mail, HeadphonesIcon, Zap,
  Activity, Globe, Cpu, Eye
} from 'lucide-react';
import { useLocation } from 'wouter';
import api from '../../lib/api';
import EmployeeManagement from '../../components/admin/EmployeeManagement';
import PaymentGateways from '../../components/admin/PaymentGateways';
import CallRecordingVault from '../../components/admin/CallRecordingVault';
import CustomerExemptions from '../../components/admin/CustomerExemptions';
import EchoFortAI from '../../components/admin/EchoFortAI';

export default function SuperAdminDashboard() {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (!token) {
      setLocation('/login');
      return;
    }
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const data = await api.getDashboardStats();
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
    setLocation('/login');
  };

  const menuItems = [
    { id: 'overview', label: 'Command Center', icon: Activity, color: 'from-blue-500 to-cyan-500' },
    { id: 'employees', label: 'Team Matrix', icon: Users, color: 'from-purple-500 to-pink-500' },
    { id: 'customers', label: 'User Analytics', icon: Globe, color: 'from-green-500 to-emerald-500' },
    { id: 'payments', label: 'Payment Core', icon: CreditCard, color: 'from-yellow-500 to-orange-500' },
    { id: 'exemptions', label: 'VIP Access', icon: Gift, color: 'from-pink-500 to-rose-500' },
    { id: 'vault', label: 'Secure Vault', icon: Lock, color: 'from-red-500 to-pink-500' },
    { id: 'threats', label: 'Threat Intel', icon: Shield, color: 'from-red-600 to-orange-600' },
    { id: 'echofort-ai', label: 'EchoFort AI', icon: Bot, color: 'from-violet-500 to-purple-500' },
    { id: 'analytics', label: 'Deep Analytics', icon: BarChart3, color: 'from-blue-600 to-indigo-600' },
    { id: 'database', label: 'Data Core', icon: Database, color: 'from-gray-600 to-gray-800' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse top-0 left-0"></div>
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000 top-0 right-0"></div>
        <div className="absolute w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-3xl animate-pulse animation-delay-4000 bottom-0 left-1/2"></div>
        
        {/* Neural Network Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="1" fill="currentColor" className="text-blue-500"/>
              <line x1="25" y1="25" x2="50" y2="25" stroke="currentColor" strokeWidth="0.5" className="text-blue-500"/>
              <line x1="25" y1="25" x2="25" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-blue-500"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative flex">
        {/* Glassmorphic Sidebar */}
        <motion.div
          initial={false}
          animate={{ width: sidebarOpen ? 280 : 80 }}
          className={`${darkMode ? 'bg-gray-900/40' : 'bg-white/40'} backdrop-blur-xl border-r ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} flex flex-col relative z-10`}
        >
          {/* Logo */}
          <div className="p-6 flex items-center justify-between">
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className={`text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent`}>
                      EchoFort
                    </h1>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Super Admin</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} transition-colors`}
            >
              {sidebarOpen ? <X className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} /> : <Menu className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />}
            </button>
          </div>

          {/* User Info */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`mx-4 mb-6 p-4 rounded-xl ${darkMode ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20' : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg">
                    {user.name?.charAt(0) || 'A'}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name || 'Admin'}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>@{user.username}</p>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto px-3 space-y-1">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group ${
                  activeSection === item.id
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                    : `${darkMode ? 'text-gray-300 hover:bg-gray-800/50' : 'text-gray-700 hover:bg-gray-100'}`
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r opacity-20"
                    style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                  />
                )}
                <item.icon className="w-5 h-5 flex-shrink-0 relative z-10" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-sm font-medium relative z-10"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </nav>

          {/* Settings & Logout */}
          <div className={`p-3 border-t ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} space-y-2`}>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${darkMode ? 'hover:bg-gray-800/50 text-gray-300' : 'hover:bg-gray-100 text-gray-700'} transition-all`}
            >
              <Eye className="w-5 h-5" />
              {sidebarOpen && <span className="text-sm">Toggle Theme</span>}
            </button>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${darkMode ? 'hover:bg-red-500/10 text-red-400' : 'hover:bg-red-50 text-red-600'} transition-all`}
            >
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span className="text-sm">Logout</span>}
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className={`${darkMode ? 'bg-gray-900/40' : 'bg-white/40'} backdrop-blur-xl border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} p-6 sticky top-0 z-10`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
                </h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mt-1`}>
                  AI-Powered Platform Management
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className={`px-4 py-2 rounded-xl ${darkMode ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'} flex items-center gap-2`}>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>System Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeSection === 'overview' && <OverviewSection stats={stats} loading={loading} darkMode={darkMode} />}
                {activeSection === 'employees' && <EmployeeManagement />}
                {activeSection === 'payments' && <PaymentGateways />}
                {activeSection === 'vault' && <CallRecordingVault />}
                {activeSection === 'exemptions' && <CustomerExemptions />}
                {activeSection === 'echofort-ai' && <EchoFortAI />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewSection({ stats, loading, darkMode }: any) {
  const statCards = [
    { title: 'Total Revenue', value: `₹${stats?.totalRevenue?.toLocaleString() || '0'}`, change: '+24%', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { title: 'Active Users', value: stats?.totalCustomers?.toLocaleString() || '0', change: '+18%', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { title: 'Subscriptions', value: stats?.activeSubscriptions?.toLocaleString() || '0', change: '+12%', icon: CreditCard, color: 'from-purple-500 to-pink-500' },
    { title: 'Threats Blocked', value: stats?.scamsDetected?.toLocaleString() || '0', change: '+8%', icon: Shield, color: 'from-red-500 to-orange-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${darkMode ? 'bg-gray-800/40' : 'bg-white/40'} backdrop-blur-xl rounded-2xl p-6 border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} hover:scale-105 transition-transform cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
            </div>
            <h3 className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-1`}>{stat.title}</h3>
            <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* AI Insights */}
      <div className={`${darkMode ? 'bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-500/20' : 'bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200'} backdrop-blur-xl rounded-2xl p-6 border`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI-Generated Insights</h3>
        </div>
        <div className="space-y-3">
          <InsightCard
            title="Revenue Optimization"
            description="Family Pack subscriptions show 34% higher retention. Consider promotional campaign."
            darkMode={darkMode}
          />
          <InsightCard
            title="Threat Detection"
            description="Digital Arrest scams increased 45% this week. Auto-alert system activated."
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
}

function InsightCard({ title, description, darkMode }: any) {
  return (
    <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/40' : 'bg-white/60'} border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
      <div className="flex items-start gap-3">
        <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{title}</h4>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
        </div>
      </div>
    </div>
  );
}


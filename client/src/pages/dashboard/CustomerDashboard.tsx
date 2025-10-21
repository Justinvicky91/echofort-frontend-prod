import { useState, useEffect } from 'react';
import { Shield, Phone, Users, AlertTriangle, TrendingDown, MapPin, Clock, FileText, Settings } from 'lucide-react';
import api from '../../lib/api';

export default function CustomerDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [recentCalls, setRecentCalls] = useState<any[]>([]);
  const [familyMembers, setFamilyMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [trustFactor, setTrustFactor] = useState(0);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, callsData, familyData] = await Promise.all([
        api.getCustomerStats(),
        api.getRecentCalls(),
        api.getFamilyMembers(),
      ]);
      setStats(statsData);
      setRecentCalls(callsData.calls || []);
      setFamilyMembers(familyData.members || []);
      setTrustFactor(statsData.trust_factor || 0);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Scams Blocked', value: stats?.scams_blocked || 0, change: 'This month', icon: Shield, color: 'from-green-500 to-emerald-500' },
    { title: 'Calls Screened', value: stats?.calls_screened || 0, change: 'Last 7 days', icon: Phone, color: 'from-blue-500 to-cyan-500' },
    { title: 'Family Protected', value: familyMembers.length, change: 'Active members', icon: Users, color: 'from-purple-500 to-pink-500' },
    { title: 'Money Saved', value: `₹${stats?.money_saved?.toLocaleString() || '0'}`, change: 'Estimated', icon: TrendingDown, color: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-400">Your protection status and recent activity</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-800/40 backdrop-blur-xl rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all text-white">
          <Settings className="w-5 h-5" />
          Settings
        </button>
      </div>

      {/* Trust Factor */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Trust Factor</h2>
            <p className="text-gray-400">Your overall protection score</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {trustFactor}/10
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {trustFactor >= 8 ? 'Excellent' : trustFactor >= 6 ? 'Good' : trustFactor >= 4 ? 'Fair' : 'Needs Attention'}
            </p>
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${(trustFactor / 10) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 text-left hover:shadow-2xl transition-all group">
          <AlertTriangle className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-1">Report Scam</h3>
          <p className="text-red-100 text-sm">File a complaint to authorities</p>
        </button>

        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-left hover:shadow-2xl transition-all group">
          <Phone className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-1">Call Recordings</h3>
          <p className="text-blue-100 text-sm">Access your protected calls</p>
        </button>

        <button className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-left hover:shadow-2xl transition-all group">
          <Users className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-1">Family Members</h3>
          <p className="text-purple-100 text-sm">Manage family protection</p>
        </button>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Calls */}
        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-700/50">
            <h2 className="text-xl font-bold text-white">Recent Calls</h2>
          </div>
          <div className="p-6 space-y-4">
            {loading ? (
              <p className="text-center text-gray-500">Loading calls...</p>
            ) : recentCalls.length === 0 ? (
              <p className="text-center text-gray-500">No recent calls</p>
            ) : (
              recentCalls.slice(0, 5).map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      call.risk_level === 'high' ? 'bg-red-500/20' :
                      call.risk_level === 'medium' ? 'bg-yellow-500/20' :
                      'bg-green-500/20'
                    }`}>
                      <Phone className={`w-4 h-4 ${
                        call.risk_level === 'high' ? 'text-red-400' :
                        call.risk_level === 'medium' ? 'text-yellow-400' :
                        'text-green-400'
                      }`} />
                    </div>
                    <div>
                      <p className="text-white font-medium">{call.phone_number}</p>
                      <p className="text-xs text-gray-400">{new Date(call.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    call.risk_level === 'high' ? 'bg-red-500/20 text-red-400' :
                    call.risk_level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {call.risk_level}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Family Members */}
        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-700/50">
            <h2 className="text-xl font-bold text-white">Family Members</h2>
          </div>
          <div className="p-6 space-y-4">
            {loading ? (
              <p className="text-center text-gray-500">Loading family...</p>
            ) : familyMembers.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 mb-3">No family members added</p>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all text-sm">
                  Add Family Member
                </button>
              </div>
            ) : (
              familyMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{member.name}</p>
                      <p className="text-xs text-gray-400">{member.relationship}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">Protected</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


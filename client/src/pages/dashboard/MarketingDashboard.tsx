import { useState, useEffect } from 'react';
import { Mail, TrendingUp, Users, Target, BarChart3, Send, Eye, MousePointer } from 'lucide-react';
import api from '../../lib/api';

export default function MarketingDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketingData();
  }, []);

  const fetchMarketingData = async () => {
    try {
      const [statsData, campaignsData] = await Promise.all([
        api.getMarketingStats(),
        api.getCampaigns(),
      ]);
      setStats(statsData);
      setCampaigns(campaignsData.campaigns || []);
    } catch (error) {
      console.error('Failed to fetch marketing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Reach', value: stats?.total_reach?.toLocaleString() || '0', change: '+24%', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { title: 'Email Open Rate', value: `${stats?.open_rate || 0}%`, change: '+5%', icon: Eye, color: 'from-green-500 to-emerald-500' },
    { title: 'Click Rate', value: `${stats?.click_rate || 0}%`, change: '+8%', icon: MousePointer, color: 'from-purple-500 to-pink-500' },
    { title: 'Conversions', value: stats?.conversions?.toLocaleString() || '0', change: '+12%', icon: Target, color: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Marketing Dashboard</h1>
        <p className="text-gray-400">Manage campaigns and track performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-left hover:shadow-2xl transition-all group">
          <Mail className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-1">New Email Campaign</h3>
          <p className="text-blue-100 text-sm">Create and send email campaigns</p>
        </button>

        <button className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-left hover:shadow-2xl transition-all group">
          <BarChart3 className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-1">Analytics Report</h3>
          <p className="text-green-100 text-sm">View detailed campaign analytics</p>
        </button>

        <button className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-left hover:shadow-2xl transition-all group">
          <Target className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-1">Audience Segments</h3>
          <p className="text-pink-100 text-sm">Manage customer segments</p>
        </button>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
        <div className="p-6 border-b border-gray-700/50">
          <h2 className="text-xl font-bold text-white">Recent Campaigns</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-900/50 border-b border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Campaign Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Sent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Open Rate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Click Rate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  Loading campaigns...
                </td>
              </tr>
            ) : campaigns.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No campaigns yet
                </td>
              </tr>
            ) : (
              campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-700/30">
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    {campaign.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {campaign.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {campaign.sent_count?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="text-green-400">{campaign.open_rate}%</span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="text-blue-400">{campaign.click_rate}%</span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'sent' ? 'bg-green-500/20 text-green-400' :
                      campaign.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


import { useState, useEffect } from 'react';
import { Headphones, Ticket, Clock, CheckCircle, AlertCircle, TrendingUp, MessageSquare } from 'lucide-react';
import api from '../../lib/api';

export default function SupportDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchDashboardData();
  }, [filter]);

  const fetchDashboardData = async () => {
    try {
      const [statsData, ticketsData] = await Promise.all([
        api.getSupportStats(),
        api.getTickets(filter),
      ]);
      setStats(statsData);
      setTickets(ticketsData.tickets || []);
    } catch (error) {
      console.error('Failed to fetch support data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Open Tickets', value: stats?.open_tickets || 0, change: '+12', icon: Ticket, color: 'from-blue-500 to-cyan-500' },
    { title: 'Avg Response Time', value: `${stats?.avg_response_time || 0}m`, change: '-5m', icon: Clock, color: 'from-green-500 to-emerald-500' },
    { title: 'Resolved Today', value: stats?.resolved_today || 0, change: '+8', icon: CheckCircle, color: 'from-purple-500 to-pink-500' },
    { title: 'Customer Satisfaction', value: `${stats?.satisfaction_score || 0}%`, change: '+3%', icon: TrendingUp, color: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Customer Support</h1>
        <p className="text-gray-400">Manage customer tickets and queries</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
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

      {/* Zoho Desk Integration Status */}
      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Headphones className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Zoho Desk Integration</h3>
              <p className="text-sm text-gray-400">Syncing tickets in real-time</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400">Connected</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['all', 'open', 'pending', 'resolved', 'urgent'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                : 'bg-gray-800/40 text-gray-400 hover:bg-gray-700/50'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Tickets Table */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900/50 border-b border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Ticket ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Created</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  Loading tickets...
                </td>
              </tr>
            ) : tickets.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No tickets found
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-700/30">
                  <td className="px-6 py-4 text-sm text-white font-mono">
                    #{ticket.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    {ticket.customer_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {ticket.subject}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.priority === 'urgent' ? 'bg-red-500/20 text-red-400' :
                      ticket.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      ticket.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.status === 'resolved' ? 'bg-green-500/20 text-green-400' :
                      ticket.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                      <MessageSquare className="w-4 h-4" />
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


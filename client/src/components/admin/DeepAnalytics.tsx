import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DeepAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(false);

  const metrics = [
    { label: 'Revenue', value: '₹0', change: '+24%', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { label: 'New Users', value: '0', change: '+18%', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Conversion Rate', value: '0%', change: '+5%', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { label: 'Avg. Session', value: '0m', change: '+12%', icon: Calendar, color: 'from-orange-500 to-red-500' },
  ];

  const reports = [
    { name: 'User Growth Report', date: 'Last 30 days', size: '2.4 MB' },
    { name: 'Revenue Analysis', date: 'Last 90 days', size: '3.1 MB' },
    { name: 'Threat Detection Stats', date: 'Last 7 days', size: '1.8 MB' },
    { name: 'Subscription Trends', date: 'Last 60 days', size: '2.9 MB' },
  ];

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">Analytics Dashboard</h3>
        <div className="flex gap-2">
          {['24h', '7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                timeRange === range
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color}`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-semibold">{metric.change}</span>
            </div>
            <p className="text-gray-400 text-sm mb-1">{metric.label}</p>
            <p className="text-3xl font-bold text-white">{metric.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Revenue Trend
          </h4>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Chart visualization coming soon</p>
              <p className="text-sm mt-2">Integrate Chart.js or Recharts</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            User Growth
          </h4>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Chart visualization coming soon</p>
              <p className="text-sm mt-2">Integrate Chart.js or Recharts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Available Reports
        </h4>
        <div className="space-y-3">
          {reports.map((report, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all cursor-pointer"
            >
              <div>
                <p className="text-white font-medium">{report.name}</p>
                <p className="text-gray-400 text-sm">{report.date} • {report.size}</p>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all">
                <Download className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

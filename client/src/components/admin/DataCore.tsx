import { useState } from 'react';
import { Database, Server, HardDrive, Activity, RefreshCw, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DataCore() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const databases = [
    {
      name: 'Production DB',
      type: 'PostgreSQL',
      status: 'healthy',
      size: '2.4 GB',
      tables: 45,
      connections: 12,
      uptime: '99.9%'
    },
    {
      name: 'Analytics DB',
      type: 'PostgreSQL',
      status: 'healthy',
      size: '1.8 GB',
      tables: 28,
      connections: 8,
      uptime: '99.8%'
    },
    {
      name: 'Cache Layer',
      type: 'Redis',
      status: 'healthy',
      size: '512 MB',
      tables: 0,
      connections: 24,
      uptime: '100%'
    }
  ];

  const tables = [
    { name: 'users', rows: '0', size: '0 KB', lastUpdated: 'Just now' },
    { name: 'employees', rows: '6', size: '24 KB', lastUpdated: '2 hours ago' },
    { name: 'subscriptions', rows: '0', size: '0 KB', lastUpdated: '1 day ago' },
    { name: 'scam_alerts', rows: '125,000+', size: '45 MB', lastUpdated: '5 mins ago' },
    { name: 'call_recordings', rows: '0', size: '0 KB', lastUpdated: '1 day ago' },
    { name: 'support_tickets', rows: '0', size: '0 KB', lastUpdated: '3 hours ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'critical': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">Database Management</h3>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Database Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {databases.map((db, index) => (
          <motion.div
            key={db.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                  {db.type === 'Redis' ? <Activity className="w-6 h-6 text-white" /> : <Database className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <h4 className="text-white font-bold">{db.name}</h4>
                  <p className="text-gray-400 text-sm">{db.type}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(db.status)}`}>
                {db.status.toUpperCase()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Size</p>
                <p className="text-white font-bold">{db.size}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Tables</p>
                <p className="text-white font-bold">{db.tables}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Connections</p>
                <p className="text-white font-bold">{db.connections}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Uptime</p>
                <p className="text-green-400 font-bold">{db.uptime}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
          <Server className="w-8 h-8 text-blue-400 mb-2" />
          <p className="text-gray-400 text-sm">Total Storage</p>
          <p className="text-2xl font-bold text-white">4.7 GB</p>
        </div>
        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
          <HardDrive className="w-8 h-8 text-purple-400 mb-2" />
          <p className="text-gray-400 text-sm">Available</p>
          <p className="text-2xl font-bold text-white">95.3 GB</p>
        </div>
        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
          <Database className="w-8 h-8 text-green-400 mb-2" />
          <p className="text-gray-400 text-sm">Total Tables</p>
          <p className="text-2xl font-bold text-white">73</p>
        </div>
        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
          <Activity className="w-8 h-8 text-orange-400 mb-2" />
          <p className="text-gray-400 text-sm">Active Queries</p>
          <p className="text-2xl font-bold text-white">44</p>
        </div>
      </div>

      {/* Tables List */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Database className="w-5 h-5" />
          Database Tables
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Table Name</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Rows</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Size</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table, index) => (
                <motion.tr
                  key={table.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                >
                  <td className="py-3 px-4 text-white font-medium">{table.name}</td>
                  <td className="py-3 px-4 text-gray-300">{table.rows}</td>
                  <td className="py-3 px-4 text-gray-300">{table.size}</td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{table.lastUpdated}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Backup Status */}
      <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-green-500/20">
            <AlertCircle className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">Automatic Backups Enabled</h4>
            <p className="text-gray-400 text-sm">Last backup: 2 hours ago • Next backup: in 22 hours</p>
            <p className="text-gray-400 text-sm mt-2">Retention: 30 days • Location: Railway S3 Bucket</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Database, Server, HardDrive, Activity, RefreshCw, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DataCore() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataCore, setDataCore] = useState<any[]>([]);

  useEffect(() => {
    fetchDataCore();
  }, []);

  const fetchDataCore = async () => {
    try {
      setLoading(true);
      // Fetch real data from backend
      const response = await fetch('/api/admin/data-core', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      if (data.ok && data.data_core) {
        setDataCore(data.data_core);
      } else {
        // Fallback to empty array if API fails
        setDataCore([]);
      }
    } catch (error) {
      console.error('Failed to fetch data core:', error);
      setDataCore([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDataCore().finally(() => {
      setTimeout(() => setRefreshing(false), 1000);
    });
  };

  const databases = [
    {
      name: 'Production DB',
      type: 'PostgreSQL',
      status: 'healthy',
      size: '2.4 GB',
      tables: dataCore.length,
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">Data Core Management</h3>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white rounded-xl transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Database Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {databases.map((db, index) => (
          <motion.div
            key={db.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-white font-bold text-lg">{db.name}</h4>
                <p className="text-gray-400 text-sm">{db.type}</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                {db.status}
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
                <p className="text-white font-bold">{db.uptime}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tables Overview */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Database className="w-5 h-5" />
          Database Tables
        </h4>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading database information...</p>
          </div>
        ) : dataCore.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No database tables found or unable to fetch data</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Table Name</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Rows</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Size</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {dataCore.map((table, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="py-3 px-4 text-white font-medium">{table.table}</td>
                    <td className="py-3 px-4 text-gray-300">{table.rows?.toLocaleString() || '0'}</td>
                    <td className="py-3 px-4 text-gray-300">{table.size}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                        {table.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-sm">{table.last_updated}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <Server className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-90">API Response Time</p>
          <p className="text-3xl font-bold">45ms</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <Activity className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-90">Active Connections</p>
          <p className="text-3xl font-bold">44</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <HardDrive className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-90">Storage Used</p>
          <p className="text-3xl font-bold">4.7 GB</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
          <Database className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-90">Total Tables</p>
          <p className="text-3xl font-bold">{dataCore.length}</p>
        </div>
      </div>
    </div>
  );
}

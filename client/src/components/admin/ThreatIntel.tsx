import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, TrendingUp, MapPin, Clock, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThreatIntel() {
  const [threats, setThreats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchThreats();
  }, [filter]);

  const fetchThreats = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await fetch('/api/admin/threats');
      // const data = await response.json();
      
      // Mock data for now
      const mockThreats = [
        {
          id: 1,
          type: 'Digital Arrest Scam',
          severity: 'critical',
          count: 145,
          trend: '+23%',
          location: 'Mumbai, Delhi, Bangalore',
          lastDetected: '2 hours ago'
        },
        {
          id: 2,
          type: 'UPI Fraud',
          severity: 'high',
          count: 89,
          trend: '+15%',
          location: 'Pan India',
          lastDetected: '5 hours ago'
        },
        {
          id: 3,
          type: 'Investment Scam',
          severity: 'high',
          count: 67,
          trend: '+8%',
          location: 'Tier 1 Cities',
          lastDetected: '1 day ago'
        },
        {
          id: 4,
          type: 'Fake Job Offers',
          severity: 'medium',
          count: 45,
          trend: '-5%',
          location: 'Pune, Hyderabad',
          lastDetected: '3 hours ago'
        },
        {
          id: 5,
          type: 'Lottery Scam',
          severity: 'medium',
          count: 34,
          trend: '+12%',
          location: 'Rural Areas',
          lastDetected: '6 hours ago'
        }
      ];
      
      setThreats(mockThreats);
    } catch (error) {
      console.error('Failed to fetch threats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'from-red-500 to-red-600';
      case 'high': return 'from-orange-500 to-orange-600';
      case 'medium': return 'from-yellow-500 to-yellow-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white"
        >
          <Shield className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-90">Total Threats</p>
          <p className="text-3xl font-bold">{threats.reduce((sum, t) => sum + t.count, 0)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white"
        >
          <AlertTriangle className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-90">Critical Alerts</p>
          <p className="text-3xl font-bold">
            {threats.filter(t => t.severity === 'critical').reduce((sum, t) => sum + t.count, 0)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white"
        >
          <TrendingUp className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-90">Blocked Today</p>
          <p className="text-3xl font-bold">234</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white"
        >
          <MapPin className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-90">Active Regions</p>
          <p className="text-3xl font-bold">12</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        {['all', 'critical', 'high', 'medium', 'low'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              filter === f
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Threats List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading threat intelligence...</p>
          </div>
        ) : (
          threats.map((threat, index) => (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-red-500/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getSeverityColor(threat.severity)} text-white text-xs font-bold uppercase`}>
                      {threat.severity}
                    </div>
                    <h3 className="text-xl font-bold text-white">{threat.type}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-gray-400 text-sm">Detected Cases</p>
                      <p className="text-white text-2xl font-bold">{threat.count}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Trend</p>
                      <p className={`text-xl font-bold ${threat.trend.startsWith('+') ? 'text-red-400' : 'text-green-400'}`}>
                        {threat.trend}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Location
                      </p>
                      <p className="text-white text-sm">{threat.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Last Detected
                      </p>
                      <p className="text-white text-sm">{threat.lastDetected}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

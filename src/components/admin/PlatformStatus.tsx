import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, Globe, Database, Mail, Smartphone, 
  CheckCircle, XCircle, AlertTriangle, RefreshCw,
  Clock, Activity, TrendingUp, Zap, Eye
} from 'lucide-react';
import api from '../../lib/api';

interface PlatformStatus {
  backend: any;
  frontend: any;
  database: any;
  email: any;
  mobile: any;
  overall_status: 'healthy' | 'degraded' | 'error';
  timestamp: string;
}

interface Build {
  id: string;
  build_number: number;
  status: string;
  branch: string;
  commit_short: string;
  commit_message: string;
  started_at: string;
  finished_at: string;
  duration_seconds: number;
}

export default function PlatformStatus() {
  const [status, setStatus] = useState<PlatformStatus | null>(null);
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  useEffect(() => {
    fetchPlatformStatus();
    fetchMobileBuilds();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchPlatformStatus(true);
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchPlatformStatus = async (silent = false) => {
    if (!silent) setLoading(true);
    setRefreshing(true);
    
    try {
      const response = await fetch('/api/super-admin/platform-status/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      const data = await response.json();
      setStatus(data);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Failed to fetch platform status:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchMobileBuilds = async () => {
    try {
      const response = await fetch('/api/super-admin/platform-status/mobile/builds?limit=10', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      const data = await response.json();
      if (data.ok) {
        setBuilds(data.builds);
      }
    } catch (error) {
      console.error('Failed to fetch mobile builds:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'degraded':
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'from-green-500 to-emerald-500';
      case 'degraded':
      case 'warning':
        return 'from-yellow-500 to-orange-500';
      case 'error':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getBuildStatusColor = (status: string) => {
    switch (status) {
      case 'finished':
        return 'text-green-500 bg-green-500/10';
      case 'building':
        return 'text-blue-500 bg-blue-500/10';
      case 'failed':
        return 'text-red-500 bg-red-500/10';
      case 'canceled':
        return 'text-gray-500 bg-gray-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Platform Status</h2>
          <p className="text-gray-400">Unified monitoring of all EchoFort services</p>
        </div>
        <button
          onClick={() => fetchPlatformStatus()}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Overall Status Banner */}
      {status && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r ${getStatusColor(status.overall_status)} p-6 rounded-xl`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getStatusIcon(status.overall_status)}
              <div>
                <h3 className="text-2xl font-bold text-white capitalize">{status.overall_status}</h3>
                <p className="text-white/80">All systems operational</p>
              </div>
            </div>
            <div className="text-right text-white/80">
              <p className="text-sm">Last checked</p>
              <p className="font-mono text-xs">{formatTimestamp(lastRefresh.toISOString())}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Service Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Backend API */}
        {status?.backend && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Server className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-bold text-white">Backend API</h3>
              </div>
              {getStatusIcon(status.backend.status)}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Environment:</span>
                <span className="text-white font-mono">{status.backend.environment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Framework:</span>
                <span className="text-white">{status.backend.framework}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Python:</span>
                <span className="text-white">{status.backend.python_version}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Frontend Website */}
        {status?.frontend && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Globe className="w-8 h-8 text-green-500" />
                <h3 className="text-xl font-bold text-white">Frontend</h3>
              </div>
              {getStatusIcon(status.frontend.status)}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">URL:</span>
                <a href={status.frontend.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-mono text-xs">
                  {status.frontend.url}
                </a>
              </div>
              {status.frontend.response_time_ms && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Response Time:</span>
                  <span className="text-white">{status.frontend.response_time_ms}ms</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Accessible:</span>
                <span className={status.frontend.accessible ? 'text-green-500' : 'text-red-500'}>
                  {status.frontend.accessible ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Database */}
        {status?.database && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Database className="w-8 h-8 text-purple-500" />
                <h3 className="text-xl font-bold text-white">Database</h3>
              </div>
              {getStatusIcon(status.database.status)}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Users:</span>
                <span className="text-white font-bold">{status.database.total_users?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">New (24h):</span>
                <span className="text-green-400 font-bold">+{status.database.users_24h}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">DB Size:</span>
                <span className="text-white">{status.database.db_size_mb} MB</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Email Service */}
        {status?.email && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Mail className="w-8 h-8 text-yellow-500" />
                <h3 className="text-xl font-bold text-white">Email (SendGrid)</h3>
              </div>
              {getStatusIcon(status.email.status)}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Configured:</span>
                <span className={status.email.configured ? 'text-green-500' : 'text-red-500'}>
                  {status.email.configured ? 'Yes' : 'No'}
                </span>
              </div>
              {status.email.api_accessible !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-400">API Accessible:</span>
                  <span className={status.email.api_accessible ? 'text-green-500' : 'text-red-500'}>
                    {status.email.api_accessible ? 'Yes' : 'No'}
                  </span>
                </div>
              )}
              {status.email.error && (
                <div className="text-red-400 text-xs mt-2">{status.email.error}</div>
              )}
            </div>
          </motion.div>
        )}

        {/* Mobile App */}
        {status?.mobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Smartphone className="w-8 h-8 text-pink-500" />
                <h3 className="text-xl font-bold text-white">Mobile (Codemagic)</h3>
              </div>
              {getStatusIcon(status.mobile.status)}
            </div>
            <div className="space-y-2 text-sm">
              {status.mobile.latest_build ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Build #:</span>
                    <span className="text-white font-bold">#{status.mobile.latest_build.build_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getBuildStatusColor(status.mobile.latest_build.status)}`}>
                      {status.mobile.latest_build.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Branch:</span>
                    <span className="text-white font-mono text-xs">{status.mobile.latest_build.branch}</span>
                  </div>
                </>
              ) : (
                <p className="text-gray-400">No builds found</p>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Recent Mobile Builds */}
      {builds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Recent Mobile Builds</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Build #</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Branch</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Commit</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Duration</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Finished</th>
                </tr>
              </thead>
              <tbody>
                {builds.map((build) => (
                  <tr key={build.id} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors">
                    <td className="py-3 px-4 text-white font-bold">#{build.build_number}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${getBuildStatusColor(build.status)}`}>
                        {build.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-white font-mono text-sm">{build.branch}</td>
                    <td className="py-3 px-4">
                      <div>
                        <span className="text-blue-400 font-mono text-xs">{build.commit_short}</span>
                        <p className="text-gray-400 text-xs mt-1 truncate max-w-xs">{build.commit_message}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white">{formatDuration(build.duration_seconds)}</td>
                    <td className="py-3 px-4 text-gray-400 text-sm">{formatTimestamp(build.finished_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}

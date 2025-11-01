import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Code, 
  Database, 
  Package,
  ChevronDown,
  ChevronUp,
  Shield,
  Zap
} from 'lucide-react';
import api from '../../lib/api';

interface PendingAction {
  id: number;
  action_type: string;
  description: string;
  risk_level: string;
  sql_command?: string;
  rollback_sql?: string;
  file_path?: string;
  package_name?: string;
  requested_at: string;
  status: string;
}

const AIPendingActions: React.FC = () => {
  const [pendingActions, setPendingActions] = useState<PendingAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedAction, setExpandedAction] = useState<number | null>(null);
  const [processing, setProcessing] = useState<number | null>(null);

  useEffect(() => {
    fetchPendingActions();
  }, []);

  const fetchPendingActions = async () => {
    try {
      const response = await api.get('/api/ai-execution/pending-actions');
      setPendingActions(response.data.actions || []);
    } catch (error) {
      console.error('Error fetching pending actions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (actionId: number) => {
    if (!confirm('Are you sure you want to approve and execute this action?')) {
      return;
    }

    setProcessing(actionId);
    try {
      const response = await api.post('/api/ai-execution/approve-action', {
        action_id: actionId,
        approved: true
      });

      if (response.data.status === 'success' || response.data.status === 'executed') {
        alert('✅ Action executed successfully!');
        fetchPendingActions(); // Refresh list
      } else {
        alert(`⚠️ ${response.data.message}`);
      }
    } catch (error: any) {
      alert(`❌ Error: ${error.response?.data?.detail || error.message}`);
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (actionId: number) => {
    if (!confirm('Are you sure you want to reject this action?')) {
      return;
    }

    setProcessing(actionId);
    try {
      await api.post('/api/ai-execution/approve-action', {
        action_id: actionId,
        approved: false
      });

      alert('Action rejected');
      fetchPendingActions(); // Refresh list
    } catch (error: any) {
      alert(`❌ Error: ${error.response?.data?.detail || error.message}`);
    } finally {
      setProcessing(null);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'sql_execution': return <Database className="w-5 h-5" />;
      case 'code_modification': return <Code className="w-5 h-5" />;
      case 'package_install': return <Package className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="w-7 h-7 text-purple-400" />
            AI Pending Actions
          </h2>
          <p className="text-gray-400 mt-1">
            Review and approve AI-proposed changes before execution
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
          <Clock className="w-5 h-5 text-purple-400" />
          <span className="text-white font-semibold">{pendingActions.length} Pending</span>
        </div>
      </div>

      {/* Pending Actions List */}
      {pendingActions.length === 0 ? (
        <div className="text-center py-16 bg-gray-800/30 rounded-xl border border-gray-700/50">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No pending actions to approve</p>
          <p className="text-gray-500 text-sm mt-2">
            The AI will submit proposed changes here for your review
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingActions.map((action) => (
            <div
              key={action.id}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all"
            >
              {/* Action Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    {getActionIcon(action.action_type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {action.description}
                    </h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className={`px-3 py-1 rounded-full border ${getRiskColor(action.risk_level)}`}>
                        {action.risk_level.toUpperCase()} RISK
                      </span>
                      <span className="text-gray-400">
                        {action.action_type.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="text-gray-500">
                        {new Date(action.requested_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expand/Collapse Button */}
                <button
                  onClick={() => setExpandedAction(expandedAction === action.id ? null : action.id)}
                  className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  {expandedAction === action.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Expanded Details */}
              {expandedAction === action.id && (
                <div className="mt-4 space-y-4 border-t border-gray-700/50 pt-4">
                  {/* SQL Command */}
                  {action.sql_command && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        SQL Command
                      </h4>
                      <pre className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 text-sm text-green-400 overflow-x-auto">
                        {action.sql_command}
                      </pre>
                    </div>
                  )}

                  {/* Rollback SQL */}
                  {action.rollback_sql && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        Rollback Plan
                      </h4>
                      <pre className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 text-sm text-yellow-400 overflow-x-auto">
                        {action.rollback_sql}
                      </pre>
                    </div>
                  )}

                  {/* File Path */}
                  {action.file_path && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">File Path</h4>
                      <code className="bg-gray-900/50 border border-gray-700/50 rounded-lg px-3 py-2 text-sm text-blue-400 block">
                        {action.file_path}
                      </code>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-700/50">
                <button
                  onClick={() => handleApprove(action.id)}
                  disabled={processing === action.id}
                  className="flex items-center gap-2 px-6 py-2.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  <CheckCircle className="w-5 h-5" />
                  {processing === action.id ? 'Executing...' : 'Approve & Execute'}
                </button>
                <button
                  onClick={() => handleReject(action.id)}
                  disabled={processing === action.id}
                  className="flex items-center gap-2 px-6 py-2.5 bg-red-500/20 hover:bg-red-500/30 disabled:bg-gray-600 disabled:cursor-not-allowed text-red-400 border border-red-500/30 rounded-lg font-medium transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIPendingActions;

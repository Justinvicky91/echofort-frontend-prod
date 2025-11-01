import { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Clock, Shield, Database, Code, XCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface PendingAction {
  id: number;
  action_type: string;
  description: string;
  sql_command?: string;
  code_changes?: any;
  risk_level: string;
  status: string;
  requested_at: string;
  error_message?: string;
}

export default function AIPendingActions() {
  const [expandedAction, setExpandedAction] = useState<number | null>(null);
  
  // Use tRPC queries and mutations
  const { data, isLoading, refetch } = trpc.aiProxy.getPendingActions.useQuery();
  const approveMutation = trpc.aiProxy.approveAction.useMutation();

  const pendingActions = data?.actions || [];

  const handleApprove = async (actionId) => {
    if (!confirm('Are you sure you want to approve and execute this action?')) {
      return;
    }

    try {
      const result = await approveMutation.mutateAsync({
        action_id: actionId,
        approved: true
      });

      if (result.status === 'success' || result.status === 'executed') {
        alert('✅ Action executed successfully!');
        refetch();
      } else {
        alert(`⚠️ ${result.message}`);
      }
    } catch (error: any) {
      console.error('Error approving action:', error);
      alert(`❌ Error: ${error.message}`);
    }
  };

  const handleReject = async (actionId) => {
    if (!confirm('Are you sure you want to reject this action?')) {
      return;
    }

    try {
      await approveMutation.mutateAsync({
        action_id: actionId,
        approved: false
      });
      
      alert('✅ Action rejected successfully');
      refetch();
    } catch (error: any) {
      console.error('Error rejecting action:', error);
      alert(`❌ Error: ${error.message}`);
    }
  };

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getActionIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'sql_execution': return <Database className="w-5 h-5" />;
      case 'code_change': return <Code className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">AI Pending Actions</h1>
        </div>
        <p className="text-gray-300">
          Review and approve AI-generated fixes and improvements before they're applied to the system
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-yellow-400" />
            <div>
              <p className="text-gray-400 text-sm">Pending Actions</p>
              <p className="text-2xl font-bold text-white">{pendingActions.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Actions List */}
      {pendingActions.length === 0 ? (
        <div className="text-center py-16 bg-gray-800/30 rounded-xl border border-gray-700/50">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No pending actions to approve</p>
          <p className="text-gray-500 text-sm mt-2">The AI will submit proposed changes here for your review</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingActions.map((action: PendingAction) => (
            <div
              key={action.id}
              className="bg-gray-800/50 rounded-lg border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all"
            >
              {/* Action Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      {getActionIcon(action.action_type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">Action #{action.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(action.risk_level)}`}>
                          {action.risk_level.toUpperCase()} RISK
                        </span>
                      </div>
                      <p className="text-gray-300 mb-2">{action.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Type: {action.action_type.replace('_', ' ').toUpperCase()}</span>
                        <span>•</span>
                        <span>Requested: {new Date(action.requested_at).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Details (Expandable) */}
                {action.sql_command && (
                  <div className="mt-4">
                    <button
                      onClick={() => setExpandedAction(expandedAction === action.id ? null : action.id)}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      {expandedAction === action.id ? '▼ Hide Details' : '▶ Show SQL Command'}
                    </button>
                    
                    {expandedAction === action.id && (
                      <div className="mt-3 bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          <code>{action.sql_command}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handleApprove(action.id)}
                    disabled={approveMutation.isLoading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    {approveMutation.isLoading ? 'Processing...' : 'Approve & Execute'}
                  </button>
                  <button
                    onClick={() => handleReject(action.id)}
                    disabled={approveMutation.isLoading}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

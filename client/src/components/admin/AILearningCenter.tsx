import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Check, X, BrainCircuit } from 'lucide-react';

interface LearningEntry {
  id: number;
  topic: string;
  information: string;
  source: string;
  confidence: number;
  created_at: string;
}

export default function AILearningCenter() {
  const [pending, setPending] = useState<LearningEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const fetchPendingApprovals = async () => {
    setLoading(true);
    try {
      const data = await api.getAIPendingApprovals();
      setPending(data.entries || []);
    } catch (error) {
      console.error('Failed to fetch pending approvals:', error);
    }
    setLoading(false);
  };

  const handleApprove = async (id: number) => {
    try {
      await api.approveAILearning(id);
      setPending(prev => prev.filter(entry => entry.id !== id));
    } catch (error) {
      console.error('Failed to approve learning entry:', error);
    }
  };

  const handleReject = (id: number) => {
    // In a real app, you'd call an API to reject/delete
    setPending(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex items-center mb-6">
        <BrainCircuit className="w-8 h-8 mr-3 text-indigo-400" />
        <h1 className="text-3xl font-bold">AI Learning Approval Center</h1>
      </div>

      {loading ? (
        <p>Loading pending approvals...</p>
      ) : pending.length === 0 ? (
        <p>No pending learning entries to approve.</p>
      ) : (
        <div className="space-y-4">
          {pending.map(entry => (
            <div key={entry.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-indigo-300">{entry.topic}</h2>
                  <p className="text-gray-400 mt-2">{entry.information}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button 
                    onClick={() => handleApprove(entry.id)} 
                    className="p-2 bg-green-600 hover:bg-green-700 rounded-full text-white transition-colors"
                    title="Approve"
                  >
                    <Check size={20} />
                  </button>
                  <button 
                    onClick={() => handleReject(entry.id)} 
                    className="p-2 bg-red-600 hover:bg-red-700 rounded-full text-white transition-colors"
                    title="Reject"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500 flex justify-between">
                <span>Source: {entry.source}</span>
                <span>Confidence: {(entry.confidence * 100).toFixed(0)}%</span>
                <span>{new Date(entry.created_at).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

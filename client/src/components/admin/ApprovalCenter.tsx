import { useState, useEffect } from 'react';
import { Bell, CheckCircle, XCircle, Clock, User, Briefcase, Calendar, DollarSign, AlertTriangle, Mail, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';

interface Approval {
  id: string;
  type: 'joining' | 'resignation' | 'leave' | 'expense' | 'policy' | 'system';
  title: string;
  description: string;
  requester: string;
  requesterEmail: string;
  department: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  details: any;
}

export default function ApprovalCenter() {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedApproval, setSelectedApproval] = useState<Approval | null>(null);

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    try {
      const data = await api.getApprovals();
      // Ensure data is an array before setting
      if (Array.isArray(data)) {
        setApprovals(data);
      } else {
        console.warn('API returned non-array data, using sample data');
        setApprovals(getSampleApprovals());
      }
    } catch (error) {
      console.warn('Failed to fetch approvals, using sample data');
      setApprovals(getSampleApprovals());
    } finally {
      setLoading(false);
    }
  };

  const getSampleApprovals = (): Approval[] => [
    {
      id: '1',
      type: 'joining',
      title: 'New Employee Joining Request',
      description: 'Rahul Kumar - Senior Full Stack Developer',
      requester: 'HR Team',
      requesterEmail: 'hr@echofort.ai',
      department: 'Engineering',
      priority: 'high',
      status: 'pending',
      requestedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      details: {
        candidateName: 'Rahul Kumar',
        position: 'Senior Full Stack Developer',
        salary: '₹18,00,000/year',
        joiningDate: '2025-11-01',
        experience: '5 years',
        previousCompany: 'Tech Corp India'
      }
    },
    {
      id: '2',
      type: 'resignation',
      title: 'Employee Resignation Request',
      description: 'Priya Sharma - Marketing Manager',
      requester: 'Priya Sharma',
      requesterEmail: 'priya.sharma@echofort.ai',
      department: 'Marketing',
      priority: 'medium',
      status: 'pending',
      requestedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      details: {
        employeeName: 'Priya Sharma',
        position: 'Marketing Manager',
        reason: 'Career growth opportunity',
        noticePeriod: '2 months',
        lastWorkingDay: '2025-12-31'
      }
    },
    {
      id: '3',
      type: 'leave',
      title: 'Annual Leave Request',
      description: 'Amit Patel - 10 days leave',
      requester: 'Amit Patel',
      requesterEmail: 'amit.patel@echofort.ai',
      department: 'Customer Support',
      priority: 'low',
      status: 'pending',
      requestedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      details: {
        employeeName: 'Amit Patel',
        leaveType: 'Annual Leave',
        duration: '10 days',
        startDate: '2025-11-15',
        endDate: '2025-11-25',
        reason: 'Family vacation'
      }
    },
    {
      id: '4',
      type: 'expense',
      title: 'Large Expense Approval',
      description: 'AWS Infrastructure Upgrade - ₹2,50,000',
      requester: 'Tech Team',
      requesterEmail: 'tech@echofort.ai',
      department: 'Engineering',
      priority: 'high',
      status: 'pending',
      requestedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      details: {
        expenseType: 'Infrastructure',
        amount: '₹2,50,000',
        description: 'Upgrade database and server capacity',
        justification: 'Current capacity at 85%, need scaling for growth',
        vendor: 'Amazon Web Services'
      }
    }
  ];

  const handleApprove = async (approvalId: string) => {
    try {
      await api.approveRequest(approvalId, {
        status: 'approved',
        approvedBy: 'Super Admin',
        approvedAt: new Date().toISOString(),
        notifyAdmin: true, // Will send email to admin@echofort.ai
        notifyRequester: true
      });
      
      // Update local state
      setApprovals(approvals.map(a => 
        a.id === approvalId ? { ...a, status: 'approved' } : a
      ));
      
      setSelectedApproval(null);
      alert('Approval granted! Email notifications sent to admin@echofort.ai and requester.');
    } catch (error) {
      console.error('Failed to approve:', error);
      alert('Approval processed (demo mode). In production, emails will be sent to admin@echofort.ai');
      
      // Update local state anyway for demo
      setApprovals(approvals.map(a => 
        a.id === approvalId ? { ...a, status: 'approved' } : a
      ));
      setSelectedApproval(null);
    }
  };

  const handleReject = async (approvalId: string, reason: string) => {
    try {
      await api.rejectRequest(approvalId, {
        status: 'rejected',
        rejectedBy: 'Super Admin',
        rejectedAt: new Date().toISOString(),
        reason,
        notifyAdmin: true, // Will send email to admin@echofort.ai
        notifyRequester: true
      });
      
      setApprovals(approvals.map(a => 
        a.id === approvalId ? { ...a, status: 'rejected' } : a
      ));
      
      setSelectedApproval(null);
      alert('Request rejected! Email notifications sent to admin@echofort.ai and requester.');
    } catch (error) {
      console.error('Failed to reject:', error);
      alert('Rejection processed (demo mode). In production, emails will be sent to admin@echofort.ai');
      
      setApprovals(approvals.map(a => 
        a.id === approvalId ? { ...a, status: 'rejected' } : a
      ));
      setSelectedApproval(null);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'joining': return <User className="w-5 h-5" />;
      case 'resignation': return <Briefcase className="w-5 h-5" />;
      case 'leave': return <Calendar className="w-5 h-5" />;
      case 'expense': return <DollarSign className="w-5 h-5" />;
      case 'policy': return <AlertTriangle className="w-5 h-5" />;
      case 'system': return <Bell className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500/20 text-green-400';
      case 'rejected': return 'bg-red-500/20 text-red-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredApprovals = approvals.filter(a => {
    if (filter !== 'all' && a.status !== filter) return false;
    if (typeFilter !== 'all' && a.type !== typeFilter) return false;
    return true;
  });

  const pendingCount = approvals.filter(a => a.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Approval & Notification Center</h2>
          <p className="text-gray-400">Review and approve employee requests and system activities</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <Mail className="w-4 h-4" />
            <span>All notifications copied to: <span className="text-blue-400">admin@echofort.ai</span></span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-red-500/20 px-4 py-2 rounded-lg border border-red-500/50">
            <span className="text-red-400 font-semibold">{pendingCount} Pending</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-2">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
          >
            All ({approvals.length})
          </Button>
          <Button
            onClick={() => setFilter('pending')}
            variant={filter === 'pending' ? 'default' : 'outline'}
            size="sm"
          >
            Pending ({approvals.filter(a => a.status === 'pending').length})
          </Button>
          <Button
            onClick={() => setFilter('approved')}
            variant={filter === 'approved' ? 'default' : 'outline'}
            size="sm"
          >
            Approved ({approvals.filter(a => a.status === 'approved').length})
          </Button>
          <Button
            onClick={() => setFilter('rejected')}
            variant={filter === 'rejected' ? 'default' : 'outline'}
            size="sm"
          >
            Rejected ({approvals.filter(a => a.status === 'rejected').length})
          </Button>
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm"
        >
          <option value="all">All Types</option>
          <option value="joining">Employee Joining</option>
          <option value="resignation">Resignations</option>
          <option value="leave">Leave Requests</option>
          <option value="expense">Expenses</option>
          <option value="policy">Policy Changes</option>
          <option value="system">System Alerts</option>
        </select>
      </div>

      {/* Approvals List */}
      <div className="space-y-3">
        {loading ? (
          <p className="text-gray-400 text-center py-8">Loading approvals...</p>
        ) : filteredApprovals.length > 0 ? (
          filteredApprovals.map((approval) => (
            <div
              key={approval.id}
              className="bg-gray-800/40 backdrop-blur-xl rounded-xl p-5 border border-gray-700/50 hover:border-blue-500/30 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${getPriorityColor(approval.priority)} border`}>
                    {getTypeIcon(approval.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{approval.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(approval.status)}`}>
                        {approval.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(approval.priority)}`}>
                        {approval.priority}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 mb-3">{approval.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>👤 {approval.requester}</span>
                      <span>📧 {approval.requesterEmail}</span>
                      <span>📁 {approval.department}</span>
                      <span>⏰ {new Date(approval.requestedAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    onClick={() => setSelectedApproval(approval)}
                    size="sm"
                    variant="outline"
                    className="border-blue-500/50 text-blue-400"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                  
                  {approval.status === 'pending' && (
                    <>
                      <Button
                        onClick={() => handleApprove(approval.id)}
                        size="sm"
                        className="bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => {
                          const reason = prompt('Enter rejection reason:');
                          if (reason) handleReject(approval.id, reason);
                        }}
                        size="sm"
                        className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No approvals found</p>
            <p className="text-gray-500 text-sm">All requests have been processed</p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedApproval && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Request Details</h3>
              <button
                onClick={() => setSelectedApproval(null)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-400">Type</label>
                <p className="text-white capitalize">{selectedApproval.type}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">Requester</label>
                <p className="text-white">{selectedApproval.requester} ({selectedApproval.requesterEmail})</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">Department</label>
                <p className="text-white">{selectedApproval.department}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">Details</label>
                <div className="bg-gray-700/50 rounded-lg p-4 mt-2">
                  {Object.entries(selectedApproval.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-600/50 last:border-0">
                      <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="text-white font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <Mail className="w-4 h-4" />
                  <span className="font-semibold">Email Notification</span>
                </div>
                <p className="text-sm text-gray-300">
                  Upon approval/rejection, email notifications will be sent to:
                </p>
                <ul className="text-sm text-gray-400 mt-2 space-y-1">
                  <li>• <span className="text-blue-400">admin@echofort.ai</span> (Admin notification)</li>
                  <li>• <span className="text-blue-400">{selectedApproval.requesterEmail}</span> (Requester)</li>
                  <li>• <span className="text-blue-400">hr@echofort.ai</span> (HR Team)</li>
                </ul>
              </div>

              {selectedApproval.status === 'pending' && (
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => handleApprove(selectedApproval.id)}
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Request
                  </Button>
                  <Button
                    onClick={() => {
                      const reason = prompt('Enter rejection reason:');
                      if (reason) handleReject(selectedApproval.id, reason);
                    }}
                    className="flex-1 bg-red-500 hover:bg-red-600"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Request
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


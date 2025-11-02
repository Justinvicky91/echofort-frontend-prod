import React, { useState, useEffect } from 'react';
import { Phone, FileText, Search, Filter, Download, Eye, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface CallRecording {
  id: number;
  user_id: number;
  username: string;
  email: string;
  full_name: string;
  phone_number: string;
  caller_name: string;
  call_direction: string;
  call_duration_seconds: number;
  call_timestamp: string;
  file_url: string;
  file_size_bytes: number;
  scam_detected: boolean;
  scam_confidence_score: number;
  scam_type: string;
  threat_level: string;
  is_reported: boolean;
}

interface Evidence {
  id: number;
  user_id: number;
  username: string;
  email: string;
  full_name: string;
  evidence_type: string;
  title: string;
  description: string;
  file_url: string;
  scam_type: string;
  scam_category: string;
  reported_amount: number;
  currency: string;
  incident_date: string;
  verification_status: string;
  severity_level: string;
  police_complaint_filed: boolean;
  complaint_number: string;
  created_at: string;
}

const VaultManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recordings' | 'evidence'>('recordings');
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterScam, setFilterScam] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchVaultStats();
    if (activeTab === 'recordings') {
      fetchRecordings();
    } else {
      fetchEvidence();
    }
  }, [activeTab, searchTerm, filterScam, filterStatus]);

  const fetchVaultStats = async () => {
    try {
      const response = await fetch('/admin/vault/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data.ok) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching vault stats:', error);
    }
  };

  const fetchRecordings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterScam !== 'all') params.append('scam_detected', filterScam);

      const response = await fetch(`/admin/vault/call-recordings?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data.ok) {
        setRecordings(data.recordings);
      }
    } catch (error) {
      console.error('Error fetching recordings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvidence = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterStatus !== 'all') params.append('verification_status', filterStatus);

      const response = await fetch(`/admin/vault/evidence?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data.ok) {
        setEvidence(data.evidence);
      }
    } catch (error) {
      console.error('Error fetching evidence:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Vault Management</h2>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Total Recordings</div>
            <div className="text-2xl font-bold">{stats.call_recordings?.total_recordings || 0}</div>
            <div className="text-xs text-red-600">
              {stats.call_recordings?.scam_recordings || 0} scam detected
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Total Evidence</div>
            <div className="text-2xl font-bold">{stats.evidence?.total_evidence || 0}</div>
            <div className="text-xs text-green-600">
              {stats.evidence?.verified_evidence || 0} verified
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Storage Used</div>
            <div className="text-2xl font-bold">
              {formatFileSize((stats.call_recordings?.total_storage_bytes || 0) + (stats.evidence?.total_storage_bytes || 0))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">24h Activity</div>
            <div className="text-2xl font-bold">
              {(stats.recent_24h?.recordings || 0) + (stats.recent_24h?.evidence || 0)}
            </div>
            <div className="text-xs text-gray-600">new items</div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('recordings')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'recordings' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          <Phone className="inline mr-2" size={16} />
          Call Recordings
        </button>
        <button
          onClick={() => setActiveTab('evidence')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'evidence' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          <FileText className="inline mr-2" size={16} />
          Evidence Submissions
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search by username, email, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          {activeTab === 'recordings' && (
            <select
              value={filterScam}
              onChange={(e) => setFilterScam(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Recordings</option>
              <option value="true">Scam Detected</option>
              <option value="false">No Scam</option>
            </select>
          )}
          {activeTab === 'evidence' && (
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
              <option value="under_review">Under Review</option>
            </select>
          )}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {activeTab === 'recordings' ? (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone Number</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scam Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recordings.map((recording) => (
                  <tr key={recording.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">{recording.username}</div>
                      <div className="text-xs text-gray-500">{recording.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">{recording.phone_number}</div>
                      <div className="text-xs text-gray-500">{recording.caller_name || 'Unknown'}</div>
                    </td>
                    <td className="px-4 py-3 text-sm">{formatDuration(recording.call_duration_seconds)}</td>
                    <td className="px-4 py-3 text-sm">{new Date(recording.call_timestamp).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {recording.scam_detected ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <AlertTriangle size={12} className="mr-1" />
                          Scam ({recording.scam_confidence_score}%)
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle size={12} className="mr-1" />
                          Safe
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye size={16} />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Evidence Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scam Details</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {evidence.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">{item.username}</div>
                      <div className="text-xs text-gray-500">{item.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">{item.evidence_type}</div>
                      <div className="text-xs text-gray-500">{item.title}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">{item.scam_type}</div>
                      <div className="text-xs text-gray-500">{item.scam_category}</div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.currency} {item.reported_amount?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      {item.verification_status === 'verified' ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle size={12} className="mr-1" />
                          Verified
                        </span>
                      ) : item.verification_status === 'pending' ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <XCircle size={12} className="mr-1" />
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye size={16} />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default VaultManagement;

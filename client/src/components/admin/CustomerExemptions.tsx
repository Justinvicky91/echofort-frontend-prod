import { useState, useEffect } from 'react';
import { Gift, Plus, X, Calendar, User } from 'lucide-react';
import api from '../../lib/api';

export default function CustomerExemptions() {
  const [exemptions, setExemptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGrantModal, setShowGrantModal] = useState(false);

  useEffect(() => {
    fetchExemptions();
  }, []);

  const fetchExemptions = async () => {
    try {
      const data = await api.getExemptions();
      setExemptions(data.exemptions || []);
    } catch (error) {
      console.error('Failed to fetch exemptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGrant = async (formData: any) => {
    try {
      await api.grantExemption(formData);
      fetchExemptions();
      setShowGrantModal(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleRevoke = async (userId: number) => {
    if (!confirm('Revoke exemption for this user?')) return;
    try {
      await api.revokeExemption(userId);
      fetchExemptions();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Customer Exemptions</h2>
          <p className="text-gray-400 text-sm mt-1">Grant free access to VIP customers</p>
        </div>
        <button
          onClick={() => setShowGrantModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Grant Exemption
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['VIP', 'Partner', 'Test', 'Other'].map((type) => {
          const count = exemptions.filter(e => e.exemption_type === type.toLowerCase() && e.active).length;
          return (
            <div key={type} className="bg-gray-800/40 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50">
              <p className="text-gray-400 text-sm">{type}</p>
              <p className="text-2xl font-bold text-white mt-1">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Exemptions List */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900/50 border-b border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Tier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Granted</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Expires</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  Loading exemptions...
                </td>
              </tr>
            ) : exemptions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No exemptions granted
                </td>
              </tr>
            ) : (
              exemptions.map((exemption) => (
                <tr key={exemption.id} className="hover:bg-gray-700/30">
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    {exemption.user_email || `User #${exemption.user_id}`}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      exemption.exemption_type === 'vip' ? 'bg-purple-500/20 text-purple-400' :
                      exemption.exemption_type === 'partner' ? 'bg-blue-500/20 text-blue-400' :
                      exemption.exemption_type === 'test' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {exemption.exemption_type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {exemption.subscription_tier.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(exemption.granted_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {exemption.expires_at ? new Date(exemption.expires_at).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      exemption.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {exemption.active ? 'Active' : 'Revoked'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    {exemption.active && (
                      <button
                        onClick={() => handleRevoke(exemption.user_id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showGrantModal && (
        <GrantExemptionModal
          onClose={() => setShowGrantModal(false)}
          onSubmit={handleGrant}
        />
      )}
    </div>
  );
}

function GrantExemptionModal({ onClose, onSubmit }: any) {
  const [formData, setFormData] = useState({
    user_email: '',
    exemption_type: 'vip',
    subscription_tier: 'family_pack',
    reason: '',
    duration_days: 365,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Gift className="w-6 h-6 text-pink-400" />
            Grant Exemption
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">User Email</label>
            <input
              type="email"
              value={formData.user_email}
              onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 text-white"
              placeholder="user@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Exemption Type</label>
            <select
              value={formData.exemption_type}
              onChange={(e) => setFormData({ ...formData, exemption_type: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 text-white"
            >
              <option value="vip">VIP</option>
              <option value="partner">Partner</option>
              <option value="test">Test Account</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Subscription Tier</label>
            <select
              value={formData.subscription_tier}
              onChange={(e) => setFormData({ ...formData, subscription_tier: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 text-white"
            >
              <option value="basic_protection">Basic Protection</option>
              <option value="premium_plus">Premium Plus</option>
              <option value="family_pack">Family Pack</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Duration (days)</label>
            <input
              type="number"
              value={formData.duration_days}
              onChange={(e) => setFormData({ ...formData, duration_days: parseInt(e.target.value) })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 text-white"
              min={1}
            />
            <p className="text-xs text-gray-500 mt-1">Leave as 365 for permanent access</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Reason</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 text-white"
              rows={3}
              placeholder="Why is this exemption being granted?"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-700 rounded-lg hover:bg-gray-700/50 text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:shadow-lg font-medium"
            >
              Grant Access
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


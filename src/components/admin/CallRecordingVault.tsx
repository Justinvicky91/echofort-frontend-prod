import { useState, useEffect } from 'react';
import { Lock, Unlock, Download, Trash2, Play, Pause, Shield } from 'lucide-react';
import api from '../../lib/api';

export default function CallRecordingVault() {
  const [vaultLocked, setVaultLocked] = useState(true);
  const [vaultPassword, setVaultPassword] = useState('');
  const [recordings, setRecordings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSetPassword, setShowSetPassword] = useState(false);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.verifyVaultPassword(vaultPassword);
      const data = await api.getVaultRecordings(vaultPassword);
      setRecordings(data.recordings || []);
      setVaultLocked(false);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetPassword = async (newPassword: string) => {
    try {
      await api.setVaultPassword(newPassword);
      alert('Vault password set successfully!');
      setShowSetPassword(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Permanently delete this recording?')) return;
    try {
      await api.deleteRecording(id, vaultPassword);
      setRecordings(recordings.filter(r => r.id !== id));
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (vaultLocked) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="inline-flex p-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl mb-4">
              <Lock className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Secure Vault</h2>
            <p className="text-gray-400 text-sm">Enter vault password to access encrypted call recordings</p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <input
                type="password"
                value={vaultPassword}
                onChange={(e) => setVaultPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white text-center text-lg tracking-widest"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
            >
              {loading ? 'Verifying...' : (
                <>
                  <Unlock className="w-5 h-5" />
                  Unlock Vault
                </>
              )}
            </button>
          </form>

          <button
            onClick={() => setShowSetPassword(true)}
            className="w-full mt-4 text-sm text-gray-400 hover:text-gray-300"
          >
            Set/Change Vault Password
          </button>

          {showSetPassword && (
            <SetPasswordModal
              onClose={() => setShowSetPassword(false)}
              onSubmit={handleSetPassword}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Shield className="w-7 h-7 text-green-400" />
            Vault Unlocked
          </h2>
          <p className="text-gray-400 text-sm mt-1">{recordings.length} encrypted recordings</p>
        </div>
        <button
          onClick={() => { setVaultLocked(true); setVaultPassword(''); }}
          className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2"
        >
          <Lock className="w-4 h-4" />
          Lock Vault
        </button>
      </div>

      <div className="grid gap-4">
        {recordings.length === 0 ? (
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-12 border border-gray-700/50 text-center">
            <p className="text-gray-400">No recordings in vault</p>
          </div>
        ) : (
          recordings.map((recording) => (
            <div
              key={recording.id}
              className="bg-gray-800/40 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{recording.customer_name}</h3>
                  <p className="text-sm text-gray-400">Phone: {recording.phone_number}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(recording.recorded_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                    <Play className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(recording.id)}
                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function SetPasswordModal({ onClose, onSubmit }: any) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    onSubmit(password);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Set Vault Password</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 text-white"
              required
              minLength={8}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 text-white"
              required
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-700/50 text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:shadow-lg"
            >
              Set Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


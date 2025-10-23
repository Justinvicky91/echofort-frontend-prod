import React, { useState, useEffect } from 'react';
import { MessageCircle, Save, Phone, Users, Settings } from 'lucide-react';
import { toast } from 'sonner';

export default function WhatsAppConfig() {
  const [config, setConfig] = useState({
    support_whatsapp: '',
    personal_whatsapp: '+919361440568', // Your personal number (read-only)
    max_concurrent_chats: 3,
    auto_assign: true,
    business_hours_only: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('https://api.echofort.ai/admin/whatsapp-config', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setConfig({ ...config, ...data.config });
      }
    } catch (error) {
      console.error('Failed to fetch WhatsApp config:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.echofort.ai/admin/whatsapp-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(config)
      });

      const data = await response.json();
      if (data.success) {
        toast.success('WhatsApp configuration saved successfully!');
      } else {
        toast.error(data.message || 'Failed to save configuration');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to save configuration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-green-500" />
            WhatsApp Configuration
          </h2>
          <p className="text-gray-400 mt-1">Manage WhatsApp support numbers and settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Personal WhatsApp (Read-only) */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <Phone className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-1">Personal WhatsApp (2FA)</h3>
            <p className="text-sm text-gray-400 mb-3">
              Used for Super Admin 2FA authentication only. Cannot be changed.
            </p>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600">
              <p className="text-lg font-mono text-gray-300">{config.personal_whatsapp}</p>
              <p className="text-xs text-gray-500 mt-1">🔒 Protected - 2FA Only</p>
            </div>
          </div>
        </div>
      </div>

      {/* Support WhatsApp (Configurable) */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-1">Customer Support WhatsApp</h3>
            <p className="text-sm text-gray-400 mb-3">
              Public-facing WhatsApp number for customer support. Shown on website and app.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Support WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={config.support_whatsapp}
                  onChange={(e) => setConfig({ ...config, support_whatsapp: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors font-mono text-lg"
                />
                <p className="text-xs text-gray-500 mt-2">
                  💡 This number will be displayed on website, app, and all customer-facing pages
                </p>
              </div>

              {config.support_whatsapp && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-sm text-green-400 font-semibold mb-2">✓ Number Configured</p>
                  <p className="text-xs text-gray-300">
                    Customers will see "Chat on WhatsApp: {config.support_whatsapp}" on all support pages
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Queue Settings */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <Settings className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-1">Support Queue Settings</h3>
            <p className="text-sm text-gray-400 mb-4">
              Configure how customer support chats are handled
            </p>

            <div className="space-y-4">
              {/* Max Concurrent Chats */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Concurrent Chats per Employee
                </label>
                <input
                  type="number"
                  value={config.max_concurrent_chats}
                  onChange={(e) => setConfig({ ...config, max_concurrent_chats: parseInt(e.target.value) })}
                  min="1"
                  max="10"
                  className="w-32 px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Number of simultaneous chats one support employee can handle
                </p>
              </div>

              {/* Auto Assign */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="auto_assign"
                  checked={config.auto_assign}
                  onChange={(e) => setConfig({ ...config, auto_assign: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-600 bg-gray-900/50 text-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="auto_assign" className="text-sm text-gray-300">
                  Auto-assign chats to available employees
                </label>
              </div>

              {/* Business Hours Only */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="business_hours"
                  checked={config.business_hours_only}
                  onChange={(e) => setConfig({ ...config, business_hours_only: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-600 bg-gray-900/50 text-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="business_hours" className="text-sm text-gray-300">
                  Accept chats only during business hours (9 AM - 6 PM IST)
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
        <h3 className="font-semibold text-blue-400 mb-3">📋 How Support Queue Works</h3>
        <ol className="space-y-2 text-sm text-gray-300">
          <li className="flex gap-2">
            <span className="text-blue-400">1.</span>
            <span>Customer clicks "Chat on WhatsApp" on website/app</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">2.</span>
            <span>System checks for available support employees</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">3.</span>
            <span>If employee is free (less than {config.max_concurrent_chats} chats) → Auto-assign</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">4.</span>
            <span>If all employees busy → Add to queue (FIFO)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">5.</span>
            <span>When employee finishes chat → Next customer from queue auto-assigned</span>
          </li>
        </ol>
      </div>
    </div>
  );
}


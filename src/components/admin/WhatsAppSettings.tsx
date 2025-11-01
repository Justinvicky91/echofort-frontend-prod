import { useState, useEffect } from 'react';
import { MessageCircle, Phone, Save, Loader2 } from 'lucide-react';
import api from '../../lib/api';

interface WhatsAppConfig {
  enabled: boolean;
  number: string;
  message: string;
}

export default function WhatsAppSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<WhatsAppConfig>({
    enabled: true,
    number: '+919361440568',
    message: 'Hello! How can we help you today?'
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/admin/settings/whatsapp-chat');
      
      if (response.ok && response.config) {
        setConfig(response.config);
      }
    } catch (error: any) {
      console.error('Failed to fetch WhatsApp settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: string) => {
    try {
      setSaving(true);
      await api.post('/api/admin/settings/update', {
        setting_key: key,
        setting_value: value
      });
    } catch (error: any) {
      console.error('Failed to update setting:', error);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const handleToggleEnabled = async (checked: boolean) => {
    const newValue = checked;
    setConfig(prev => ({ ...prev, enabled: newValue }));
    
    try {
      await updateSetting('whatsapp_chat_enabled', newValue.toString());
    } catch {
      // Revert on error
      setConfig(prev => ({ ...prev, enabled: !newValue }));
    }
  };

  const handleSaveNumber = async () => {
    await updateSetting('whatsapp_chat_number', config.number);
  };

  const handleSaveMessage = async () => {
    await updateSetting('whatsapp_chat_message', config.message);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
            <MessageCircle className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">WhatsApp Chat Settings</h2>
            <p className="text-green-100 mt-1">Manage WhatsApp chat widget on your website</p>
          </div>
        </div>
      </div>

      {/* Enable/Disable Toggle */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900">Enable WhatsApp Chat</h3>
            <p className="text-sm text-gray-600">Show WhatsApp chat widget to website visitors</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(e) => handleToggleEnabled(e.target.checked)}
              disabled={saving}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>
      </div>

      {/* WhatsApp Number */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">WhatsApp Number</h3>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={config.number}
              onChange={(e) => setConfig(prev => ({ ...prev, number: e.target.value }))}
              placeholder="+919361440568"
              disabled={saving}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={handleSaveNumber}
              disabled={saving}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[120px] justify-center"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save
                </>
              )}
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Enter the WhatsApp number with country code (e.g., +919361440568)
          </p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Default Welcome Message</h3>
          <textarea
            value={config.message}
            onChange={(e) => setConfig(prev => ({ ...prev, message: e.target.value }))}
            placeholder="Hello! How can we help you today?"
            rows={3}
            disabled={saving}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            onClick={handleSaveMessage}
            disabled={saving}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Message
              </>
            )}
          </button>
          <p className="text-sm text-gray-600">
            This message will be pre-filled when users click the WhatsApp chat button
          </p>
        </div>
      </div>

      {/* Status Indicator */}
      <div className={`rounded-xl p-6 border-2 ${config.enabled ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <div className={`h-4 w-4 rounded-full ${config.enabled ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
          <div>
            <p className="font-semibold text-gray-900">
              WhatsApp Chat is currently {config.enabled ? 'ENABLED' : 'DISABLED'}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {config.enabled 
                ? 'Visitors can see and use the WhatsApp chat widget on your website'
                : 'WhatsApp chat widget is hidden from website visitors'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

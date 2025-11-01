import { useState, useEffect } from 'react';
import { CreditCard, Plus, Check, X, Loader, Eye, EyeOff } from 'lucide-react';
import api from '../../lib/api';

const GATEWAYS = [
  { id: 'razorpay', name: 'Razorpay', logo: '🇮🇳', region: 'India' },
  { id: 'stripe', name: 'Stripe', logo: '🌍', region: 'Global' },
  { id: 'paypal', name: 'PayPal', logo: '🌎', region: 'Global' },
  { id: 'square', name: 'Square', logo: '🇺🇸', region: 'USA/UK/AU' },
  { id: 'adyen', name: 'Adyen', logo: '🇪🇺', region: 'Europe' },
  { id: 'alipay', name: 'Alipay', logo: '🇨🇳', region: 'China' },
  { id: 'wechat', name: 'WeChat Pay', logo: '🇨🇳', region: 'China' },
];

export default function PaymentGateways() {
  const [gateways, setGateways] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGateway, setSelectedGateway] = useState<any>(null);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchGateways();
  }, []);

  const fetchGateways = async () => {
    try {
      const data = await api.getPaymentGateways();
      setGateways(data.gateways || data.items || []);
    } catch (error) {
      console.error('Failed to fetch gateways:', error);
      // Set empty array on error - API endpoint may not be fully configured
      setGateways([]);
    } finally {
      setLoading(false);
    }
  };

  const handleConfigure = async (formData: any) => {
    try {
      await api.configurePaymentGateway(formData);
      fetchGateways();
      setSelectedGateway(null);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleTest = async (gateway_name: string) => {
    try {
      const result = await api.testPaymentGateway(gateway_name);
      alert(result.success ? 'Connection successful!' : 'Connection failed');
    } catch (error: any) {
      alert('Connection failed: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Payment Gateway Management</h2>
          <p className="text-gray-400 text-sm mt-1">Configure payment gateways - No code deployment needed!</p>
        </div>
      </div>

      {/* Gateway Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GATEWAYS.map((gateway) => {
          const configured = gateways.find(g => g.gateway_name === gateway.id);
          return (
            <div
              key={gateway.id}
              className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all cursor-pointer"
              onClick={() => setSelectedGateway(gateway)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{gateway.logo}</span>
                  <div>
                    <h3 className="font-semibold text-white">{gateway.name}</h3>
                    <p className="text-xs text-gray-400">{gateway.region}</p>
                  </div>
                </div>
                {configured?.enabled ? (
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                ) : (
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                )}
              </div>

              {configured ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      configured.enabled ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {configured.enabled ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Mode</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      configured.test_mode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {configured.test_mode ? 'Test' : 'Live'}
                    </span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleTest(configured.gateway_name); }}
                    className="w-full mt-3 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium"
                  >
                    Test Connection
                  </button>
                </div>
              ) : (
                <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Configure
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Configuration Modal */}
      {selectedGateway && (
        <ConfigureGatewayModal
          gateway={selectedGateway}
          existing={gateways.find(g => g.gateway_name === selectedGateway.id)}
          onClose={() => setSelectedGateway(null)}
          onSubmit={handleConfigure}
        />
      )}
    </div>
  );
}

function ConfigureGatewayModal({ gateway, existing, onClose, onSubmit }: any) {
  const [formData, setFormData] = useState({
    gateway_name: gateway.id,
    api_key: existing?.api_key || '',
    secret_key: existing?.secret_key || '',
    webhook_secret: existing?.webhook_secret || '',
    enabled: existing?.enabled || false,
    test_mode: existing?.test_mode || true,
    supported_currencies: existing?.supported_currencies || 'INR,USD',
    supported_regions: existing?.supported_regions || gateway.region || 'Global',
    priority: existing?.priority || 1,
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert comma-separated strings to arrays for backend
    const payload = {
      ...formData,
      supported_currencies: typeof formData.supported_currencies === 'string' 
        ? formData.supported_currencies.split(',').map(c => c.trim())
        : formData.supported_currencies,
      supported_regions: typeof formData.supported_regions === 'string'
        ? formData.supported_regions.split(',').map(r => r.trim())
        : formData.supported_regions,
    };
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{gateway.logo}</span>
            <div>
              <h3 className="text-xl font-bold text-white">Configure {gateway.name}</h3>
              <p className="text-sm text-gray-400">{gateway.region}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">API Key</label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={formData.api_key}
                onChange={(e) => setFormData({ ...formData, api_key: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white pr-12"
                placeholder="Enter API key"
                required
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Secret Key</label>
            <div className="relative">
              <input
                type={showSecretKey ? 'text' : 'password'}
                value={formData.secret_key}
                onChange={(e) => setFormData({ ...formData, secret_key: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white pr-12"
                placeholder="Enter secret key"
                required
              />
              <button
                type="button"
                onClick={() => setShowSecretKey(!showSecretKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showSecretKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Webhook URL</label>
            <input
              type="url"
              value={formData.webhook_secret}
              onChange={(e) => setFormData({ ...formData, webhook_secret: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              placeholder="https://api.echofort.ai/webhooks/payment"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Supported Currencies</label>
            <input
              type="text"
              value={formData.supported_currencies}
              onChange={(e) => setFormData({ ...formData, supported_currencies: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              placeholder="INR,USD,EUR"
            />
            <p className="text-xs text-gray-500 mt-1">Comma-separated currency codes</p>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.enabled}
                onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                className="w-5 h-5 rounded border-gray-700 bg-gray-900/50 text-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-300">Enable Gateway</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.test_mode}
                onChange={(e) => setFormData({ ...formData, test_mode: e.target.checked })}
                className="w-5 h-5 rounded border-gray-700 bg-gray-900/50 text-yellow-500 focus:ring-2 focus:ring-yellow-500"
              />
              <span className="text-sm text-gray-300">Test Mode</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-700 rounded-lg hover:bg-gray-700/50 text-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { Key, Download, RefreshCw, Copy, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function RecoveryCodes() {
  const [codes, setCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasExisting, setHasExisting] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    checkExistingCodes();
  }, []);

  const checkExistingCodes = async () => {
    try {
      const response = await fetch('https://api.echofort.ai/auth/check-recovery-codes', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      const data = await response.json();
      setHasExisting(data.has_codes);
    } catch (error) {
      console.error('Failed to check recovery codes:', error);
    }
  };

  const generateCodes = async () => {
    if (hasExisting && !confirm('This will invalidate your existing recovery codes. Continue?')) {
      return;
    }

    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await fetch('https://api.echofort.ai/auth/generate-recovery-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ email: user.email })
      });

      const data = await response.json();
      if (data.success) {
        setCodes(data.recovery_codes);
        setHasExisting(true);
        toast.success('Recovery codes generated successfully!');
      } else {
        toast.error(data.message || 'Failed to generate recovery codes');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate recovery codes');
    } finally {
      setLoading(false);
    }
  };

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadCodes = () => {
    const text = `EchoFort Super Admin Recovery Codes
Generated: ${new Date().toLocaleString()}

⚠️ IMPORTANT: Save these codes in a secure location!
Each code can only be used ONCE for emergency login if your mobile is lost or hacked.

Recovery Codes:
${codes.map((code, i) => `${i + 1}. ${code}`).join('\n')}

---
DO NOT share these codes with anyone.
Store them in a password manager or print and keep in a safe place.
`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `echofort-recovery-codes-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Recovery codes downloaded!');
  };

  const printCodes = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>EchoFort Recovery Codes</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; }
              h1 { color: #333; }
              .warning { background: #fff3cd; border: 2px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 8px; }
              .codes { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
              .code { background: #f8f9fa; padding: 15px; border: 1px solid #dee2e6; border-radius: 4px; font-family: monospace; font-size: 18px; }
              .footer { margin-top: 40px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <h1>🔐 EchoFort Super Admin Recovery Codes</h1>
            <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
            
            <div class="warning">
              <strong>⚠️ IMPORTANT SECURITY NOTICE:</strong>
              <ul>
                <li>Save these codes in a secure location</li>
                <li>Each code can only be used ONCE</li>
                <li>Use only if your mobile is lost or hacked</li>
                <li>DO NOT share with anyone</li>
              </ul>
            </div>

            <h2>Recovery Codes:</h2>
            <div class="codes">
              ${codes.map((code, i) => `<div class="code">${i + 1}. ${code}</div>`).join('')}
            </div>

            <div class="footer">
              <p>Echofort Technology | Confidential</p>
              <p>Store this document in a safe place or use a password manager</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Key className="w-6 h-6 text-yellow-500" />
            Recovery Codes Management
          </h2>
          <p className="text-gray-400 mt-1">Backup codes for 2FA emergency access</p>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-yellow-400 mb-2">⚠️ Critical Security Information</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Recovery codes are for emergency use only (mobile lost/hacked)</li>
              <li>• Each code can only be used <strong>ONCE</strong></li>
              <li>• After using a code, generate new ones immediately</li>
              <li>• Store codes in a password manager or secure physical location</li>
              <li>• Never share codes with anyone - not even EchoFort support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Status */}
      {hasExisting && codes.length === 0 && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-green-400 font-semibold">
              ✓ Recovery codes are already configured for your account
            </p>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            You can regenerate new codes if needed (this will invalidate existing ones)
          </p>
        </div>
      )}

      {/* Generate Button */}
      {codes.length === 0 && (
        <div className="text-center py-8">
          <button
            onClick={generateCodes}
            disabled={loading}
            className="px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg flex items-center gap-3 mx-auto transition-colors disabled:opacity-50 text-lg font-semibold"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            {hasExisting ? 'Regenerate Recovery Codes' : 'Generate Recovery Codes'}
          </button>
          <p className="text-sm text-gray-400 mt-3">
            {hasExisting ? 'This will create 10 new codes and invalidate old ones' : 'This will create 10 backup codes for emergency access'}
          </p>
        </div>
      )}

      {/* Display Codes */}
      {codes.length > 0 && (
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={downloadCodes}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download as Text File
            </button>
            <button
              onClick={printCodes}
              className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-5 h-5" />
              Print Codes
            </button>
          </div>

          {/* Codes Grid */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-yellow-400" />
              Your Recovery Codes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {codes.map((code, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 border border-gray-600 rounded-lg p-4 flex items-center justify-between group hover:border-yellow-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 font-semibold">{index + 1}.</span>
                    <span className="font-mono text-lg text-white">{code}</span>
                  </div>
                  <button
                    onClick={() => copyCode(code, index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-700 rounded"
                  >
                    {copiedIndex === index ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
            <h3 className="font-semibold text-red-400 mb-3">🚨 Save These Codes NOW!</h3>
            <p className="text-sm text-gray-300 mb-3">
              These codes will <strong>NOT be shown again</strong>. Make sure to:
            </p>
            <ol className="space-y-2 text-sm text-gray-300 ml-4">
              <li>1. Download or print the codes using the buttons above</li>
              <li>2. Store them in a password manager (recommended)</li>
              <li>3. Or keep the printed copy in a secure physical location</li>
              <li>4. Test one code to ensure it works (optional but recommended)</li>
            </ol>
          </div>

          {/* Regenerate */}
          <div className="text-center">
            <button
              onClick={generateCodes}
              disabled={loading}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 mx-auto transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Generate New Codes
            </button>
            <p className="text-xs text-gray-500 mt-2">
              This will invalidate all current codes
            </p>
          </div>
        </div>
      )}

      {/* How to Use */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
        <h3 className="font-semibold text-blue-400 mb-3">📋 How to Use Recovery Codes</h3>
        <ol className="space-y-2 text-sm text-gray-300">
          <li className="flex gap-2">
            <span className="text-blue-400">1.</span>
            <span>Go to login page and enter your email</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">2.</span>
            <span>Enter the email OTP you receive</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">3.</span>
            <span>When asked for WhatsApp OTP, click "Use Recovery Code Instead"</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">4.</span>
            <span>Enter one of your recovery codes (format: XXXX-XXXX)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">5.</span>
            <span>After successful login, generate new recovery codes immediately</span>
          </li>
        </ol>
      </div>
    </div>
  );
}


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

const API_URL = 'https://echofort-backend-production.up.railway.app';

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'identifier' | 'otp' | 'password'>('identifier');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState<'customer' | 'employee' | 'super_admin' | null>(null);
  const [requiresOtp, setRequiresOtp] = useState(false);
  const [requiresPassword, setRequiresPassword] = useState(false);

  const handleInitiateLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/unified/login/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier })
      });

      const data = await response.json();

      if (response.ok) {
        setUserType(data.user_type);
        setRequiresOtp(data.requires_otp);
        setRequiresPassword(data.requires_password);

        // Determine next step
        if (data.requires_otp) {
          setStep('otp');
        } else if (data.requires_password) {
          setStep('password');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload: any = { identifier };
      
      if (requiresOtp) payload.otp = otp;
      if (requiresPassword) payload.password = password;
      
      payload.device_id = 'web-browser';
      payload.device_name = navigator.userAgent;

      const response = await fetch(`${API_URL}/auth/unified/login/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        // Save token
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect based on user type
        navigate(data.redirect);
      } else {
        setError(data.message || 'Verification failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob top-0 left-0"></div>
        <div className="absolute w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 top-0 right-0"></div>
        <div className="absolute w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 bottom-0 left-1/2"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Shield className="w-10 h-10 text-blue-600" />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EchoFort
            </span>
          </div>
          <p className="text-gray-600">AI-Powered Protection</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {step === 'identifier' && 'Welcome Back'}
            {step === 'otp' && 'Verify OTP'}
            {step === 'password' && 'Enter Password'}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Identifier */}
          {step === 'identifier' && (
            <form onSubmit={handleInitiateLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email, Phone, or Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email, phone, or username"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Processing...' : 'Continue'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 'otp' && (
            <form onSubmit={requiresPassword ? (e) => { e.preventDefault(); setStep('password'); } : handleVerifyLogin} className="space-y-4">
              <div className="text-center mb-4">
                <Mail className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  We've sent a 6-digit code to your registered email
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Verifying...' : requiresPassword ? 'Next' : 'Login'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {/* Step 3: Password (Super Admin & Employees) */}
          {step === 'password' && (
            <form onSubmit={handleVerifyLogin} className="space-y-4">
              <div className="text-center mb-4">
                <Lock className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {userType === 'super_admin' ? 'Super Admin Authentication' : 'Employee Login'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Logging in...' : 'Login'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {/* Back button */}
          {step !== 'identifier' && (
            <button
              onClick={() => {
                if (step === 'password' && requiresOtp) {
                  setStep('otp');
                } else {
                  setStep('identifier');
                }
                setError('');
              }}
              className="mt-4 w-full text-gray-600 hover:text-gray-900 text-sm"
            >
              ← Back
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a></p>
        </div>
      </motion.div>
    </div>
  );
}


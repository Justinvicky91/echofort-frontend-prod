import { useState } from 'react';
import { Shield, Phone, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Demo() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [testResult, setTestResult] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);

  const scamExamples = [
    {
      number: '+91 98765 43210',
      type: 'Digital Arrest Scam',
      riskLevel: 'high',
      description: 'This number has been reported 47 times for impersonating police officers and threatening digital arrest.',
      reports: 47,
      lastReported: '2 hours ago'
    },
    {
      number: '+91 87654 32109',
      type: 'Investment Fraud',
      riskLevel: 'high',
      description: 'Known for fake investment schemes promising unrealistic returns.',
      reports: 32,
      lastReported: '5 hours ago'
    },
    {
      number: '+91 76543 21098',
      type: 'Fake Loan Offer',
      riskLevel: 'medium',
      description: 'Offers instant loans but asks for advance fees.',
      reports: 18,
      lastReported: '1 day ago'
    },
    {
      number: '+91 65432 10987',
      type: 'Prize/Lottery Scam',
      riskLevel: 'medium',
      description: 'Claims you won a lottery and asks for processing fees.',
      reports: 25,
      lastReported: '3 hours ago'
    }
  ];

  const handleCheckNumber = () => {
    setIsChecking(true);
    
    // Simulate API call
    setTimeout(() => {
      // Check if it matches any scam example
      const scam = scamExamples.find(s => s.number.replace(/\s/g, '') === phoneNumber.replace(/\s/g, ''));
      
      if (scam) {
        setTestResult({
          isScam: true,
          ...scam
        });
      } else {
        setTestResult({
          isScam: false,
          message: 'No reports found for this number. Appears safe!',
          trustScore: 8.5
        });
      }
      
      setIsChecking(false);
    }, 1500);
  };

  const tryExample = (number: string) => {
    setPhoneNumber(number);
    setTestResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800/50 backdrop-blur-xl bg-gray-900/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-white">EchoFort Demo</span>
          </div>
          <a 
            href="/"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Back to Home
          </a>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Try EchoFort <span className="text-blue-400">AI Protection</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Test our AI-powered scam detection system with real examples
          </motion.p>
        </div>

        {/* Demo Tool */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Phone className="w-6 h-6 text-blue-400" />
              Check a Phone Number
            </h2>
            
            <div className="flex gap-4 mb-6">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number (e.g., +91 98765 43210)"
                className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
              />
              <button
                onClick={handleCheckNumber}
                disabled={!phoneNumber || isChecking}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isChecking ? 'Checking...' : 'Check Now'}
              </button>
            </div>

            {/* Result Display */}
            <AnimatePresence>
              {testResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  {testResult.isScam ? (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-red-500 rounded-xl">
                          <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-red-400 mb-2">
                            ⚠️ SCAM DETECTED!
                          </h3>
                          <p className="text-white font-semibold mb-2">{testResult.type}</p>
                          <p className="text-gray-300 mb-4">{testResult.description}</p>
                          <div className="flex gap-4 text-sm">
                            <span className="text-red-400">
                              <strong>{testResult.reports}</strong> reports
                            </span>
                            <span className="text-gray-400">
                              Last reported: {testResult.lastReported}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-500 rounded-xl">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-green-400 mb-2">
                            ✓ Number Appears Safe
                          </h3>
                          <p className="text-gray-300 mb-4">{testResult.message}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">Trust Score:</span>
                            <div className="flex-1 max-w-xs bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${testResult.trustScore * 10}%` }}
                              ></div>
                            </div>
                            <span className="text-green-400 font-semibold">{testResult.trustScore}/10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Example Scams */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Try These <span className="text-red-400">Real Scam Examples</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scamExamples.map((scam, index) => (
              <motion.div
                key={scam.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-red-500/30 transition-all group cursor-pointer"
                onClick={() => tryExample(scam.number)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{scam.type}</h3>
                    <p className="text-blue-400 font-mono text-sm">{scam.number}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    scam.riskLevel === 'high' 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {scam.riskLevel.toUpperCase()} RISK
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">{scam.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>{scam.reports} reports</span>
                    <span>Last: {scam.lastReported}</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-semibold group-hover:bg-blue-500 group-hover:text-white transition-all">
                    Try This
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Preview */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Want Full Protection?
            </h3>
            <p className="text-gray-300 mb-6">
              Get real-time call screening, GPS tracking, screen time monitoring, and 24/7 AI protection for your entire family
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/pricing"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                View Pricing
              </a>
              <a
                href="/signup"
                className="px-8 py-3 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-600 transition-all"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';

export default function SystemConfiguration() {
  const [activeTab, setActiveTab] = useState('platforms');

  const platformsConfig = [
    {
      name: 'Railway',
      purpose: 'Backend Hosting & Database',
      url: 'https://railway.app',
      details: {
        service: 'Backend API',
        endpoint: 'https://api.echofort.ai',
        database: 'PostgreSQL',
        region: 'Asia',
        plan: 'Pro Plan',
        cost: '~₹2,500/month'
      },
      credentials: 'Railway Dashboard',
      envVars: [
        'DATABASE_URL',
        'OPENAI_API_KEY',
        'SENDGRID_API_KEY',
        'JWT_SECRET',
        'RAZORPAY_KEY_ID',
        'RAZORPAY_KEY_SECRET',
        'STRIPE_SECRET_KEY',
        'PAYPAL_CLIENT_ID'
      ]
    },
    {
      name: 'Namecheap',
      purpose: 'Domain & Email Hosting',
      url: 'https://namecheap.com',
      details: {
        domain: 'echofort.ai',
        emails: ['noreply@echofort.ai', 'support@echofort.ai', 'hello@echofort.ai', 'admin@echofort.ai'],
        dns: 'Managed DNS',
        ssl: 'Free SSL Certificate',
        cost: '~₹1,200/year'
      },
      credentials: 'Namecheap Account',
      setup: 'Email forwarding configured to Zoho'
    },
    {
      name: 'Zoho Workplace',
      purpose: 'Team Email & Collaboration',
      url: 'https://workplace.zoho.com',
      details: {
        domain: 'echofort.io',
        emails: ['support@echofort.io'],
        users: '1 active',
        storage: '30 GB',
        cost: 'Free tier'
      },
      credentials: 'Zoho Account'
    },
    {
      name: 'OpenAI',
      purpose: 'AI-Powered Scam Detection',
      url: 'https://platform.openai.com',
      details: {
        model: 'GPT-4',
        usage: 'EchoFort AI Assistant',
        features: ['Scam analysis', 'Threat detection', 'Natural language processing'],
        cost: 'Pay per use (~₹850/month estimated)'
      },
      credentials: 'OpenAI API Dashboard',
      apiKey: 'OPENAI_API_KEY (in Railway)'
    },
    {
      name: 'SendGrid',
      purpose: 'Email Delivery Service',
      url: 'https://sendgrid.com',
      details: {
        sender: 'noreply@echofort.ai',
        volume: 'Up to 100 emails/day (Free)',
        types: ['OTP', 'Invoices', 'Notifications', 'Password Reset'],
        cost: 'Free tier'
      },
      credentials: 'SendGrid Dashboard',
      apiKey: 'SENDGRID_API_KEY (in Railway)'
    },
    {
      name: 'Razorpay',
      purpose: 'Payment Gateway (India)',
      url: 'https://razorpay.com',
      details: {
        methods: ['UPI', 'Cards', 'Net Banking', 'Wallets'],
        currency: 'INR',
        fees: '2% + GST per transaction',
        settlement: 'T+2 days'
      },
      credentials: 'Razorpay Dashboard',
      apiKeys: ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET']
    },
    {
      name: 'Stripe',
      purpose: 'International Payments',
      url: 'https://stripe.com',
      details: {
        methods: ['Credit/Debit Cards', 'Apple Pay', 'Google Pay'],
        currency: 'USD, EUR, GBP',
        fees: '2.9% + $0.30 per transaction',
        settlement: '2-7 days'
      },
      credentials: 'Stripe Dashboard',
      apiKey: 'STRIPE_SECRET_KEY (in Railway)'
    },
    {
      name: 'PayPal',
      purpose: 'Alternative Payment Method',
      url: 'https://paypal.com',
      details: {
        methods: ['PayPal Balance', 'Linked Cards'],
        currency: 'Multi-currency',
        fees: '3.49% + fixed fee',
        settlement: 'Instant to PayPal balance'
      },
      credentials: 'PayPal Business Account',
      apiKey: 'PAYPAL_CLIENT_ID (in Railway)'
    },
    {
      name: 'Google Play Console',
      purpose: 'Android App Distribution',
      url: 'https://play.google.com/console',
      details: {
        appId: 'com.echofort.app',
        status: 'Published',
        version: '1.0.0',
        downloads: 'Tracking active',
        cost: '$25 one-time registration'
      },
      credentials: 'Google Play Console'
    },
    {
      name: 'Apple Developer',
      purpose: 'iOS App Distribution',
      url: 'https://developer.apple.com',
      details: {
        bundleId: 'com.echofort.app',
        status: 'In Review / Published',
        version: '1.0.0',
        cost: '$99/year'
      },
      credentials: 'Apple Developer Account'
    },
    {
      name: 'Manus',
      purpose: 'Development & AI Platform',
      url: 'https://manus.im',
      details: {
        usage: 'Website development, AI assistance',
        features: ['Web development', 'Database management', 'Deployment'],
        cost: 'Subscription based'
      },
      credentials: 'Manus Account'
    }
  ];

  const technicalStack = {
    frontend: {
      framework: 'React + TypeScript',
      styling: 'Tailwind CSS',
      routing: 'React Router',
      stateManagement: 'Context API',
      hosting: 'Manus Platform',
      domain: 'echofort.ai'
    },
    backend: {
      framework: 'FastAPI (Python)',
      database: 'PostgreSQL',
      orm: 'SQLAlchemy',
      authentication: 'JWT Tokens',
      hosting: 'Railway',
      apiEndpoint: 'https://api.echofort.ai'
    },
    mobile: {
      framework: 'React Native (Expo)',
      platforms: ['Android', 'iOS'],
      navigation: 'React Navigation',
      storage: 'AsyncStorage',
      apiIntegration: 'Axios'
    }
  };

  const businessInfo = {
    companyName: 'EchoFort',
    gst: '33AMTPV8141Q1ZY',
    domain: 'echofort.ai',
    email: 'admin@echofort.ai',
    supportEmail: 'support@echofort.ai',
    founded: '2025',
    location: 'India'
  };

  const securityConfig = {
    authentication: [
      'JWT Token-based authentication',
      'Bcrypt password hashing',
      'OTP verification via SendGrid',
      'Session management',
      'Role-based access control (RBAC)'
    ],
    dataProtection: [
      'SSL/TLS encryption (HTTPS)',
      'Database encryption at rest',
      'Secure API endpoints',
      'Environment variables for secrets',
      'Regular security audits'
    ],
    compliance: [
      'GDPR compliant',
      'Data privacy policy',
      'Terms of service',
      'Cookie consent',
      'User data deletion on request'
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">System Configuration</h2>
          <p className="text-gray-400 mt-1">Complete platform documentation and configuration</p>
        </div>
        <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30">
          🔒 Confidential - Super Admin Only
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-700">
        {['platforms', 'technical', 'business', 'security'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Platforms Tab */}
      {activeTab === 'platforms' && (
        <div className="grid gap-6">
          {platformsConfig.map((platform, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{platform.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{platform.purpose}</p>
                </div>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm"
                >
                  Open Dashboard →
                </a>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(platform.details).map(([key, value]) => (
                  <div key={key} className="bg-gray-900/50 rounded-lg p-4">
                    <div className="text-gray-400 text-xs uppercase mb-1">{key.replace(/([A-Z])/g, ' $1')}</div>
                    <div className="text-white font-medium">
                      {Array.isArray(value) ? (
                        <ul className="space-y-1">
                          {value.map((item, i) => (
                            <li key={i} className="text-sm">• {item}</li>
                          ))}
                        </ul>
                      ) : (
                        value
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {platform.envVars && (
                <div className="mt-4 bg-gray-900/50 rounded-lg p-4">
                  <div className="text-gray-400 text-xs uppercase mb-2">Environment Variables (Railway)</div>
                  <div className="flex flex-wrap gap-2">
                    {platform.envVars.map((envVar, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-800 text-green-400 rounded text-xs font-mono">
                        {envVar}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {platform.credentials && (
                <div className="mt-4 text-sm text-gray-400">
                  <span className="font-medium">Access:</span> {platform.credentials}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Technical Stack Tab */}
      {activeTab === 'technical' && (
        <div className="grid gap-6">
          {Object.entries(technicalStack).map(([category, config]) => (
            <div key={category} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white capitalize mb-4">{category}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(config).map(([key, value]) => (
                  <div key={key} className="bg-gray-900/50 rounded-lg p-4">
                    <div className="text-gray-400 text-xs uppercase mb-1">{key.replace(/([A-Z])/g, ' $1')}</div>
                    <div className="text-white font-medium">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Business Info Tab */}
      {activeTab === 'business' && (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Business Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(businessInfo).map(([key, value]) => (
              <div key={key} className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-gray-400 text-xs uppercase mb-1">{key.replace(/([A-Z])/g, ' $1')}</div>
                <div className="text-white font-medium text-lg">{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="grid gap-6">
          {Object.entries(securityConfig).map(([category, items]) => (
            <div key={category} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white capitalize mb-4">{category.replace(/([A-Z])/g, ' $1')}</h3>
              <ul className="space-y-3">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Footer Note */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-yellow-400 text-xl">⚠️</span>
          <div>
            <div className="text-yellow-400 font-semibold">Confidential Information</div>
            <div className="text-gray-300 text-sm mt-1">
              This configuration data is highly sensitive. Never share API keys, credentials, or access details.
              All secrets are stored securely in Railway environment variables.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


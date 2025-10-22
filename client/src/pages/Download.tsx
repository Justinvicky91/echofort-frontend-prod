import { Shield, Smartphone, Download as DownloadIcon, CheckCircle, Star, QrCode } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Download() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800/50 backdrop-blur-xl bg-gray-900/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">EchoFort</span>
            </div>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-white">Back to Home</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-blue-500/10 rounded-2xl mb-6">
            <Smartphone className="w-16 h-16 text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Download <span className="text-blue-400">EchoFort</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get 24/7 AI-powered scam protection on your mobile device
          </p>
        </div>

        {/* Download Options */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Android */}
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 text-center">
            <div className="mb-6">
              <svg className="w-20 h-20 mx-auto text-green-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 15.341c-.759 0-1.373.614-1.373 1.373s.614 1.373 1.373 1.373 1.373-.614 1.373-1.373-.614-1.373-1.373-1.373zm-11.046 0c-.759 0-1.373.614-1.373 1.373s.614 1.373 1.373 1.373 1.373-.614 1.373-1.373-.614-1.373-1.373-1.373zm12.015-7.341c-.206 0-.414.042-.611.126l-1.797-3.168c.035-.071.064-.144.064-.223 0-.319-.261-.58-.58-.58s-.58.261-.58.58c0 .08.029.153.064.223l-1.797 3.168c-.197-.084-.405-.126-.611-.126-1.001 0-1.812.811-1.812 1.812s.811 1.812 1.812 1.812 1.812-.811 1.812-1.812c0-.206-.042-.414-.126-.611l1.797-3.168c.071.035.144.064.223.064s.153-.029.223-.064l1.797 3.168c-.084.197-.126.405-.126.611 0 1.001.811 1.812 1.812 1.812s1.812-.811 1.812-1.812-.811-1.812-1.812-1.812z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Android App</h3>
            <p className="text-gray-400 mb-6">Available on Google Play Store</p>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all"
            >
              <DownloadIcon className="w-5 h-5" />
              Download for Android
            </a>
            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <p className="text-sm text-gray-500">Version 1.0.0 • 25 MB</p>
            </div>
          </div>

          {/* iOS */}
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 text-center">
            <div className="mb-6">
              <svg className="w-20 h-20 mx-auto text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">iOS App</h3>
            <p className="text-gray-400 mb-6">Coming Soon to App Store</p>
            <button
              disabled
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-700 text-gray-400 rounded-xl font-semibold cursor-not-allowed"
            >
              <DownloadIcon className="w-5 h-5" />
              Coming Soon
            </button>
            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <p className="text-sm text-gray-500">Launching Q2 2025</p>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="max-w-2xl mx-auto bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 text-center mb-16">
          <QrCode className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Scan to Download</h3>
          <p className="text-gray-400 mb-6">Scan the QR code with your phone camera</p>
          <div className="inline-block p-4 bg-white rounded-xl">
            {/* Placeholder for QR code - in production, generate actual QR code */}
            <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
              <QrCode className="w-24 h-24 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Download <span className="text-blue-400">EchoFort</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Shield, title: 'Real-time Protection', description: 'AI-powered scam detection works 24/7 in the background' },
              { icon: CheckCircle, title: 'Call Screening', description: 'Automatically identifies and blocks suspicious calls' },
              { icon: Star, title: 'Family Safety', description: 'Monitor and protect your entire family with one account' },
              { icon: Smartphone, title: 'Easy to Use', description: 'Simple interface that anyone can understand' }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800/40 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
                <feature.icon className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* System Requirements */}
        <div className="max-w-2xl mx-auto bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">System Requirements</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-semibold">Android 8.0 or higher</p>
                <p className="text-sm text-gray-400">Recommended: Android 11+</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-semibold">25 MB free storage space</p>
                <p className="text-sm text-gray-400">Additional space for updates</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-semibold">Internet connection required</p>
                <p className="text-sm text-gray-400">For real-time scam database updates</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-semibold">Permissions: Phone, SMS, Location</p>
                <p className="text-sm text-gray-400">Required for full protection features</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">Need help with installation?</p>
          <Link href="/contact">
            <Button variant="outline" className="text-white border-gray-700">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


import { useState } from 'react';
import { Shield, Search, AlertTriangle, TrendingUp, Phone, Mail, Link as LinkIcon, Filter } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ScamDatabase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  const scamTypes = [
    {
      id: 1,
      name: 'Digital Arrest Scam',
      description: 'Fraudsters impersonate law enforcement and threaten victims with fake arrest warrants',
      severity: 'critical',
      reports: 2847,
      avgLoss: '₹5.2 Lakhs',
      trend: 'up',
      indicators: ['Video call from "police"', 'Immediate payment demand', 'Threats of arrest', 'Fake ID cards'],
      prevention: 'Never make payments over video calls. Police never conduct arrests via video calls.'
    },
    {
      id: 2,
      name: 'Investment Fraud',
      description: 'Fake investment schemes promising unrealistic returns through trading or crypto',
      severity: 'high',
      reports: 1923,
      avgLoss: '₹8.7 Lakhs',
      trend: 'up',
      indicators: ['Guaranteed high returns', 'Pressure to invest quickly', 'Fake trading platforms', 'Celebrity endorsements'],
      prevention: 'Verify investment platforms with SEBI. Never invest based on WhatsApp/Telegram tips.'
    },
    {
      id: 3,
      name: 'Fake Loan Offers',
      description: 'Scammers offer instant loans but demand advance fees before disbursement',
      severity: 'high',
      reports: 1654,
      avgLoss: '₹45,000',
      trend: 'stable',
      indicators: ['No credit check loans', 'Advance fee required', 'Unregistered lenders', 'Too-good-to-be-true terms'],
      prevention: 'Only use RBI-registered lenders. Never pay advance fees for loans.'
    },
    {
      id: 4,
      name: 'Prize/Lottery Scam',
      description: 'Victims are told they won a prize but must pay taxes or fees to claim it',
      severity: 'medium',
      reports: 1432,
      avgLoss: '₹32,000',
      trend: 'down',
      indicators: ['Unexpected prize notification', 'Payment for taxes/fees', 'Urgency to claim', 'Foreign lottery'],
      prevention: 'Legitimate prizes never require upfront payment. Verify with official sources.'
    },
    {
      id: 5,
      name: 'Job Scam',
      description: 'Fake job offers requiring payment for training, equipment, or registration',
      severity: 'medium',
      reports: 1287,
      avgLoss: '₹28,000',
      trend: 'stable',
      indicators: ['Upfront payment required', 'Work from home with high pay', 'No interview process', 'Vague job description'],
      prevention: 'Research companies thoroughly. Never pay for job opportunities.'
    },
    {
      id: 6,
      name: 'Romance Scam',
      description: 'Scammers build fake romantic relationships to manipulate victims into sending money',
      severity: 'high',
      reports: 987,
      avgLoss: '₹6.3 Lakhs',
      trend: 'up',
      indicators: ['Quick profession of love', 'Never meets in person', 'Financial emergency', 'Overseas location'],
      prevention: 'Be cautious of online relationships. Never send money to someone you haven\'t met.'
    },
    {
      id: 7,
      name: 'Tech Support Scam',
      description: 'Fake tech support claiming your device is infected and demanding payment for fixes',
      severity: 'medium',
      reports: 876,
      avgLoss: '₹18,000',
      trend: 'down',
      indicators: ['Unsolicited tech support call', 'Remote access request', 'Virus/malware warnings', 'Immediate payment demand'],
      prevention: 'Never give remote access to unsolicited callers. Use official support channels.'
    },
    {
      id: 8,
      name: 'Phishing/Vishing',
      description: 'Attempts to steal personal information through fake emails, calls, or messages',
      severity: 'high',
      reports: 3421,
      avgLoss: '₹42,000',
      trend: 'up',
      indicators: ['Urgent action required', 'Suspicious links', 'Requests for OTP/password', 'Impersonates banks'],
      prevention: 'Never share OTP or passwords. Verify sender identity through official channels.'
    }
  ];

  const filteredScams = scamTypes.filter(scam => {
    const matchesSearch = scam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scam.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || scam.name.toLowerCase().includes(filterType.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || scam.severity === filterSeverity;
    return matchesSearch && matchesType && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

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
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-red-500/10 rounded-2xl mb-6">
            <AlertTriangle className="w-16 h-16 text-red-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Scam <span className="text-red-400">Database</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Learn about common scams and how to protect yourself
          </p>
        </div>

        {/* Stats */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
            <div className="text-3xl font-bold text-blue-400 mb-2">125,000+</div>
            <div className="text-gray-400">Scams Blocked</div>
          </div>
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
            <div className="text-3xl font-bold text-green-400 mb-2">₹150 Cr+</div>
            <div className="text-gray-400">Money Saved</div>
          </div>
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
            <div className="text-3xl font-bold text-purple-400 mb-2">50,000+</div>
            <div className="text-gray-400">Users Protected</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search scams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-700/50 text-white"
                />
              </div>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-full md:w-[180px] bg-gray-900/50 border-gray-700/50 text-white">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Scam Cards */}
        <div className="max-w-6xl mx-auto space-y-6">
          {filteredScams.map((scam) => (
            <div key={scam.id} className="bg-gray-800/40 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{scam.name}</h3>
                      <p className="text-gray-400">{scam.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(scam.severity)}`}>
                      {scam.severity.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Reports</div>
                      <div className="text-lg font-semibold text-white">{scam.reports.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Avg Loss</div>
                      <div className="text-lg font-semibold text-white">{scam.avgLoss}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Trend</div>
                      <div className={`text-lg font-semibold flex items-center gap-1 ${
                        scam.trend === 'up' ? 'text-red-400' : scam.trend === 'down' ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        <TrendingUp className={`w-4 h-4 ${scam.trend === 'down' ? 'rotate-180' : ''}`} />
                        {scam.trend}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-semibold text-white mb-2">Warning Signs:</div>
                    <div className="flex flex-wrap gap-2">
                      {scam.indicators.map((indicator, idx) => (
                        <span key={idx} className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-xs">
                          {indicator}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="text-sm font-semibold text-green-400 mb-1">How to Protect Yourself:</div>
                    <div className="text-sm text-gray-300">{scam.prevention}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Report Scam CTA */}
        <div className="max-w-6xl mx-auto mt-12 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Encountered a New Scam?
          </h3>
          <p className="text-gray-300 mb-6">
            Help protect others by reporting scams you've encountered
          </p>
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              Report a Scam
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


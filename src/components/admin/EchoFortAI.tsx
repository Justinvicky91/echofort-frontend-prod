import { useState, useEffect, useRef } from 'react';
import { Bot, Send, Zap, TrendingUp, AlertCircle, Code, Database, Mail } from 'lucide-react';
import api from '../../lib/api';

export default function EchoFortAI() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchInsights();
    // Welcome message
    setMessages([{
      role: 'assistant',
      content: 'Hello! I\'m EchoFort AI, your autonomous platform manager. I can help you with business analytics, code changes, marketing campaigns, and more. What would you like to know?',
      timestamp: new Date(),
    }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchInsights = async () => {
    try {
      const data = await api.getAIInsights();
      setInsights(data);
    } catch (error) {
      console.error('Failed to fetch insights:', error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await api.chatWithAI(input);
      
      const aiMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
        action: response.suggested_action,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { label: 'Revenue Analysis', icon: TrendingUp, prompt: 'Analyze this month\'s revenue trends' },
    { label: 'User Growth', icon: Zap, prompt: 'Show user growth predictions' },
    { label: 'Threat Intel', icon: AlertCircle, prompt: 'What are the top scam threats this week?' },
    { label: 'Code Review', icon: Code, prompt: 'Review recent backend changes' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Chat Area */}
      <div className="lg:col-span-2 flex flex-col bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
        <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-violet-500/10 to-purple-500/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">EchoFort AI</h3>
              <p className="text-xs text-gray-400">Autonomous Platform Manager</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400">Learning Progress: {insights?.learning_progress || 0}%</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gray-700/50 text-gray-100'
              } rounded-2xl px-4 py-3`}>
                <p className="text-sm">{msg.content}</p>
                {msg.action && (
                  <div className="mt-3 pt-3 border-t border-gray-600/50">
                    <p className="text-xs text-gray-300 mb-2">Suggested Action:</p>
                    <button className="px-3 py-1 bg-white/10 rounded-lg text-xs hover:bg-white/20 transition-colors">
                      {msg.action}
                    </button>
                  </div>
                )}
                <p className="text-xs opacity-60 mt-2">
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-700/50 rounded-2xl px-4 py-3">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700/50">
          <div className="flex gap-2 mb-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => setInput(action.prompt)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors text-xs text-gray-300"
              >
                <action.icon className="w-3 h-3" />
                {action.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask EchoFort AI anything..."
              className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="space-y-4">
        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            AI Capabilities
          </h3>
          <div className="space-y-3">
            <CapabilityItem icon={Code} label="Code Generation" enabled />
            <CapabilityItem icon={Database} label="Database Operations" enabled />
            <CapabilityItem icon={Mail} label="Marketing Campaigns" enabled />
            <CapabilityItem icon={TrendingUp} label="Predictive Analytics" enabled />
          </div>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
          <h3 className="font-semibold text-white mb-4">Learning Progress</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Platform Data</span>
                <span className="text-white">{insights?.data_points_analyzed || 0}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">User Patterns</span>
                <span className="text-white">{insights?.patterns_learned || 0}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Threat Intel</span>
                <span className="text-white">{insights?.threats_analyzed || 0}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-6 border border-violet-500/20">
          <h3 className="font-semibold text-white mb-2">Autonomy Timeline</h3>
          <p className="text-sm text-gray-400 mb-3">
            {insights?.days_until_autonomy || 180} days until full autonomy
          </p>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 h-3 rounded-full" style={{ width: `${insights?.learning_progress || 0}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CapabilityItem({ icon: Icon, label, enabled }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-purple-400" />
        <span className="text-sm text-gray-300">{label}</span>
      </div>
      {enabled && <div className="w-2 h-2 bg-green-400 rounded-full"></div>}
    </div>
  );
}


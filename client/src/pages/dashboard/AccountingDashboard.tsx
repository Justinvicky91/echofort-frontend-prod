import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, PieChart, FileText, CreditCard, Wallet, BarChart3 } from 'lucide-react';
import api from '../../lib/api';

export default function AccountingDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccountingData();
  }, []);

  const fetchAccountingData = async () => {
    try {
      const [statsData, transactionsData] = await Promise.all([
        api.getAccountingStats(),
        api.getRecentTransactions(),
      ]);
      setStats(statsData);
      setTransactions(transactionsData.transactions || []);
    } catch (error) {
      console.error('Failed to fetch accounting data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Revenue', value: `₹${stats?.total_revenue?.toLocaleString() || '0'}`, change: '+24%', icon: DollarSign, color: 'from-green-500 to-emerald-500', trend: 'up' },
    { title: 'Total Expenses', value: `₹${stats?.total_expenses?.toLocaleString() || '0'}`, change: '-5%', icon: TrendingDown, color: 'from-red-500 to-pink-500', trend: 'down' },
    { title: 'Net Profit', value: `₹${stats?.net_profit?.toLocaleString() || '0'}`, change: '+18%', icon: TrendingUp, color: 'from-blue-500 to-cyan-500', trend: 'up' },
    { title: 'Profit Margin', value: `${stats?.profit_margin || 0}%`, change: '+3%', icon: PieChart, color: 'from-purple-500 to-pink-500', trend: 'up' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Accounting Dashboard</h1>
        <p className="text-gray-400">Financial overview and P&L management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-left hover:shadow-2xl transition-all group">
          <FileText className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-1">P&L Report</h3>
          <p className="text-green-100 text-sm">Generate profit & loss statement</p>
        </button>

        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-left hover:shadow-2xl transition-all group">
          <Wallet className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-1">Expense Tracking</h3>
          <p className="text-blue-100 text-sm">Track and categorize expenses</p>
        </button>

        <button className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-left hover:shadow-2xl transition-all group">
          <BarChart3 className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-1">Revenue Analytics</h3>
          <p className="text-purple-100 text-sm">Analyze revenue streams</p>
        </button>
      </div>

      {/* Monthly Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Breakdown</h3>
          <div className="space-y-3">
            <RevenueItem label="Subscriptions" amount={stats?.subscription_revenue || 0} percentage={65} color="bg-blue-500" />
            <RevenueItem label="One-time Payments" amount={stats?.onetime_revenue || 0} percentage={25} color="bg-green-500" />
            <RevenueItem label="Other" amount={stats?.other_revenue || 0} percentage={10} color="bg-purple-500" />
          </div>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">Expense Breakdown</h3>
          <div className="space-y-3">
            <RevenueItem label="Infrastructure" amount={stats?.infrastructure_cost || 0} percentage={40} color="bg-red-500" />
            <RevenueItem label="Payroll" amount={stats?.payroll_cost || 0} percentage={35} color="bg-orange-500" />
            <RevenueItem label="Marketing" amount={stats?.marketing_cost || 0} percentage={15} color="bg-yellow-500" />
            <RevenueItem label="Other" amount={stats?.other_cost || 0} percentage={10} color="bg-gray-500" />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
        <div className="p-6 border-b border-gray-700/50">
          <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-900/50 border-b border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Type</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Loading transactions...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No transactions yet
                </td>
              </tr>
            ) : (
              transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-700/30">
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(txn.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    {txn.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {txn.category}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      txn.type === 'income' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {txn.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm text-right font-semibold ${
                    txn.type === 'income' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {txn.type === 'income' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RevenueItem({ label, amount, percentage, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-semibold">₹{amount.toLocaleString()}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}


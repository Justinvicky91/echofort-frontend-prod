import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, PieChart, BarChart3, Calendar, Plus } from 'lucide-react';
import api from '../../lib/api';

export default function FinancialManagement() {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<any>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [revenue, setRevenue] = useState<any>(null);
  const [expenses, setExpenses] = useState<any>(null);
  const [showAddExpense, setShowAddExpense] = useState(false);

  useEffect(() => {
    fetchFinancialData();
  }, [selectedMonth, selectedYear]);

  const fetchFinancialData = async () => {
    try {
      const [overviewData, revenueData, expenseData] = await Promise.all([
        api.getFinancialOverview().catch(e => ({})),
        api.getRevenueBreakdown(selectedMonth, selectedYear).catch(e => ({ total_revenue: 0, revenue_by_plan: [] })),
        api.getExpenseBreakdown(selectedMonth, selectedYear).catch(e => ({ total_expenses: 0, expenses_by_category: [] }))
      ]);
      setOverview(overviewData);
      setRevenue(revenueData);
      setExpenses(expenseData);
    } catch (error) {
      console.error('Failed to fetch financial data:', error);
      setOverview({});
      setRevenue({ total_revenue: 0, revenue_by_plan: [] });
      setExpenses({ total_expenses: 0, expenses_by_category: [] });
    } finally {
      setLoading(false);
    }
  };

  const profitLoss = (revenue?.total_revenue || 0) - (expenses?.total_expenses || 0);
  const profitMargin = revenue?.total_revenue > 0 
    ? ((profitLoss / revenue.total_revenue) * 100).toFixed(1) 
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex items-center gap-4 bg-gray-800/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50">
        <Calendar className="w-5 h-5 text-gray-400" />
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          className="px-4 py-2 bg-gray-900/40 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(2025, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="px-4 py-2 bg-gray-900/40 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
        >
          {[2024, 2025, 2026].map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-green-400 text-sm font-semibold">Revenue</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-white">
            ₹{revenue?.total_revenue?.toLocaleString() || '0'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-red-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-500 rounded-xl">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <span className="text-red-400 text-sm font-semibold">Expenses</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Total Expenses</h3>
          <p className="text-3xl font-bold text-white">
            ₹{expenses?.total_expenses?.toLocaleString() || '0'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`bg-gradient-to-br ${profitLoss >= 0 ? 'from-blue-500/10 to-cyan-500/10 border-blue-500/20' : 'from-orange-500/10 to-red-500/10 border-orange-500/20'} backdrop-blur-xl rounded-2xl p-6 border`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 ${profitLoss >= 0 ? 'bg-blue-500' : 'bg-orange-500'} rounded-xl`}>
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className={`${profitLoss >= 0 ? 'text-blue-400' : 'text-orange-400'} text-sm font-semibold`}>
              {profitLoss >= 0 ? 'Profit' : 'Loss'}
            </span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Net P&L</h3>
          <p className="text-3xl font-bold text-white">
            ₹{Math.abs(profitLoss).toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500 rounded-xl">
              <PieChart className="w-6 h-6 text-white" />
            </div>
            <span className="text-purple-400 text-sm font-semibold">Margin</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Profit Margin</h3>
          <p className="text-3xl font-bold text-white">{profitMargin}%</p>
        </motion.div>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-green-400" />
          Revenue Breakdown by Plan
        </h3>
        <div className="space-y-4">
          {revenue?.revenue_by_plan?.map((plan: any, index: number) => (
            <motion.div
              key={plan.plan}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-900/40 rounded-xl border border-gray-700/50"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  plan.plan === 'family' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                  plan.plan === 'personal' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                  'bg-gradient-to-br from-green-500 to-emerald-500'
                }`}>
                  <span className="text-white font-bold text-lg">
                    {plan.plan.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-semibold capitalize">{plan.plan} Plan</h4>
                  <p className="text-gray-400 text-sm">
                    {plan.subscriber_count} subscriber{plan.subscriber_count !== 1 ? 's' : ''} × ₹{plan.plan_price}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">₹{plan.total_revenue?.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">
                  {((plan.total_revenue / revenue.total_revenue) * 100).toFixed(1)}% of total
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-400" />
            Expense Breakdown by Category
          </h3>
          <button
            onClick={() => setShowAddExpense(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" />
            Add Expense
          </button>
        </div>
        <div className="space-y-4">
          {expenses?.expenses_by_category?.map((category: any, index: number) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-900/40 rounded-xl border border-gray-700/50"
            >
              <div>
                <h4 className="text-white font-semibold capitalize">{category.category}</h4>
                <p className="text-gray-400 text-sm">{category.expense_count} transaction{category.expense_count !== 1 ? 's' : ''}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">₹{category.total_amount?.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">
                  {((category.total_amount / expenses.total_expenses) * 100).toFixed(1)}% of total
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setShowAddExpense(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Record New Expense</h2>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              // Handle form submission
              setShowAddExpense(false);
            }}>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Category</label>
                <select className="w-full px-4 py-3 bg-gray-800/40 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50">
                  <option value="infrastructure">Infrastructure</option>
                  <option value="marketing">Marketing</option>
                  <option value="operations">Operations</option>
                  <option value="salary">Salary</option>
                  <option value="misc">Miscellaneous</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Amount (₹)</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-gray-800/40 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Description</label>
                <textarea
                  className="w-full px-4 py-3 bg-gray-800/40 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                  rows={3}
                  placeholder="Expense details..."
                  required
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-gray-800/40 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                  required
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddExpense(false)}
                  className="flex-1 px-4 py-3 bg-gray-800 rounded-xl text-white font-semibold hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                >
                  Record Expense
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}


import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, TrendingUp, CreditCard, Shield, Eye, UserCheck, UserX } from 'lucide-react';
import api from '../../lib/api';

export default function CustomerManagement() {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await api.getAllCustomers();
      setCustomers(data.customers || []);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const viewCustomerDetails = async (customerId: number) => {
    try {
      const [details, activity, subscription] = await Promise.all([
        api.getCustomerDetails(customerId),
        api.getCustomerActivity(customerId),
        api.getCustomerSubscription(customerId)
      ]);
      setSelectedCustomer({ ...details, activity, subscription });
    } catch (error) {
      console.error('Failed to fetch customer details:', error);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'all' || customer.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    trial: customers.filter(c => c.status === 'trial').length,
    churned: customers.filter(c => c.status === 'churned').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Total Customers</h3>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500 rounded-xl">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Active Subscriptions</h3>
          <p className="text-3xl font-bold text-white">{stats.active}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-500 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Trial Users</h3>
          <p className="text-3xl font-bold text-white">{stats.trial}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-red-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-500 rounded-xl">
              <UserX className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Churned</h3>
          <p className="text-3xl font-bold text-white">{stats.churned}</p>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-900/40 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="px-4 py-3 bg-gray-900/40 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
            >
              <option value="all">All Plans</option>
              <option value="basic">Basic</option>
              <option value="personal">Personal</option>
              <option value="family">Family</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-bold text-white mb-6">Customer Directory</h3>
        <div className="space-y-3">
          {filteredCustomers.map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 bg-gray-900/40 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all cursor-pointer"
              onClick={() => viewCustomerDetails(customer.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-lg">
                  {customer.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{customer.name || 'Unknown'}</h4>
                  <p className="text-gray-400 text-sm">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className={`text-sm font-semibold ${
                    customer.plan === 'family' ? 'text-purple-400' :
                    customer.plan === 'personal' ? 'text-blue-400' : 'text-green-400'
                  }`}>
                    {customer.plan?.toUpperCase()}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {customer.status === 'active' ? '✓ Active' : 
                     customer.status === 'trial' ? '⏱ Trial' : '✗ Churned'}
                  </p>
                </div>
                <button className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg border border-blue-500/20 transition-all">
                  <Eye className="w-5 h-5 text-blue-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedCustomer(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Customer Details</h2>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-all"
              >
                <span className="text-gray-400 text-2xl">×</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-800/40 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Name</p>
                  <p className="text-white font-semibold">{selectedCustomer.name}</p>
                </div>
                <div className="p-4 bg-gray-800/40 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Email</p>
                  <p className="text-white font-semibold">{selectedCustomer.email}</p>
                </div>
                <div className="p-4 bg-gray-800/40 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Phone</p>
                  <p className="text-white font-semibold">{selectedCustomer.phone || 'Not provided'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-800/40 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Subscription Plan</p>
                  <p className="text-white font-semibold capitalize">{selectedCustomer.subscription?.plan}</p>
                </div>
                <div className="p-4 bg-gray-800/40 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Status</p>
                  <p className="text-white font-semibold capitalize">{selectedCustomer.status}</p>
                </div>
                <div className="p-4 bg-gray-800/40 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Joined Date</p>
                  <p className="text-white font-semibold">
                    {new Date(selectedCustomer.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Activity Summary */}
            {selectedCustomer.activity && (
              <div className="mt-6 p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  Activity Summary
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{selectedCustomer.activity.calls_screened || 0}</p>
                    <p className="text-gray-400 text-sm">Calls Screened</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{selectedCustomer.activity.scams_blocked || 0}</p>
                    <p className="text-gray-400 text-sm">Scams Blocked</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">₹{selectedCustomer.activity.money_saved || 0}</p>
                    <p className="text-gray-400 text-sm">Money Saved</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}


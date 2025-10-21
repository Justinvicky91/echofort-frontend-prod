import { useState, useEffect } from 'react';
import { Users, Calendar, DollarSign, Award, Clock, UserPlus, FileText, TrendingUp } from 'lucide-react';
import api from '../../lib/api';

export default function HRDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHRData();
  }, []);

  const fetchHRData = async () => {
    try {
      const [statsData, employeesData] = await Promise.all([
        api.getHRStats(),
        api.getEmployees(),
      ]);
      setStats(statsData);
      setEmployees(employeesData.employees || []);
    } catch (error) {
      console.error('Failed to fetch HR data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Employees', value: stats?.total_employees || 0, change: '+3', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { title: 'On Leave Today', value: stats?.on_leave_today || 0, change: '-', icon: Calendar, color: 'from-yellow-500 to-orange-500' },
    { title: 'Monthly Payroll', value: `₹${stats?.monthly_payroll?.toLocaleString() || '0'}`, change: '+5%', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { title: 'Avg Attendance', value: `${stats?.avg_attendance || 0}%`, change: '+2%', icon: Clock, color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">HR Dashboard</h1>
        <p className="text-gray-400">Employee management and payroll</p>
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
              <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-left hover:shadow-2xl transition-all group">
          <UserPlus className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-1">Add Employee</h3>
          <p className="text-blue-100 text-sm">Onboard new team member</p>
        </button>

        <button className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-left hover:shadow-2xl transition-all group">
          <DollarSign className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-1">Process Payroll</h3>
          <p className="text-green-100 text-sm">Run monthly payroll</p>
        </button>

        <button className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-left hover:shadow-2xl transition-all group">
          <FileText className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-1">Leave Requests</h3>
          <p className="text-purple-100 text-sm">Review pending requests</p>
        </button>
      </div>

      {/* Department Breakdown */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Department Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['Marketing', 'Customer Support', 'Accounting', 'HR', 'Admin'].map((dept, idx) => {
            const count = employees.filter(e => e.department === dept.toLowerCase().replace(' ', '_')).length;
            return (
              <div key={dept} className="bg-gray-700/30 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white mb-1">{count}</p>
                <p className="text-xs text-gray-400">{dept}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
        <div className="p-6 border-b border-gray-700/50">
          <h2 className="text-xl font-bold text-white">Employee Directory</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-900/50 border-b border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Loading employees...
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-700/30">
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {employee.department?.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      employee.role === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                      employee.role === 'marketing' ? 'bg-blue-500/20 text-blue-400' :
                      employee.role === 'customer_support' ? 'bg-green-500/20 text-green-400' :
                      employee.role === 'accounting' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {employee.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    ₹{employee.salary?.toLocaleString() || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      employee.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {employee.active ? 'Active' : 'Inactive'}
                    </span>
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


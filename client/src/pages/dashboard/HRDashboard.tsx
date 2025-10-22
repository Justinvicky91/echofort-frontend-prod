import { useState, useEffect } from 'react';
import { Users, Calendar, DollarSign, Clock, UserPlus, FileText, Briefcase, Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '../../lib/api';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  status: 'active' | 'inactive';
  postedDate: string;
}

export default function HRDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [employees, setEmployees] = useState<any[]>([]);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [jobForm, setJobForm] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    experience: '',
    description: '',
    status: 'active' as 'active' | 'inactive'
  });

  useEffect(() => {
    fetchHRData();
  }, []);

  const fetchHRData = async () => {
    try {
      const [statsData, employeesData, jobsData] = await Promise.all([
        api.getHRStats().catch(() => ({ total_employees: 0, on_leave_today: 0, monthly_payroll: 0, avg_attendance: 0 })),
        api.getEmployees().catch(() => ({ employees: [] })),
        api.getJobOpenings().catch(() => [])
      ]);
      setStats(statsData);
      setEmployees(employeesData.employees || []);
      setJobOpenings(jobsData || []);
    } catch (error) {
      console.error('Failed to fetch HR data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async () => {
    try {
      await api.createJobOpening({
        ...jobForm,
        postedDate: new Date().toISOString()
      });
      setShowJobForm(false);
      setJobForm({
        title: '',
        department: '',
        location: '',
        type: 'Full-time',
        experience: '',
        description: '',
        status: 'active'
      });
      fetchHRData();
    } catch (error) {
      console.error('Failed to create job opening:', error);
      alert('Failed to create job opening. Please try again.');
    }
  };

  const handleUpdateJob = async () => {
    if (!editingJob) return;
    try {
      await api.updateJobOpening(editingJob.id, jobForm);
      setEditingJob(null);
      setShowJobForm(false);
      setJobForm({
        title: '',
        department: '',
        location: '',
        type: 'Full-time',
        experience: '',
        description: '',
        status: 'active'
      });
      fetchHRData();
    } catch (error) {
      console.error('Failed to update job opening:', error);
      alert('Failed to update job opening. Please try again.');
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job opening?')) return;
    try {
      await api.deleteJobOpening(id);
      fetchHRData();
    } catch (error) {
      console.error('Failed to delete job opening:', error);
      alert('Failed to delete job opening. Please try again.');
    }
  };

  const handleEditJob = (job: JobOpening) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      description: job.description,
      status: job.status
    });
    setShowJobForm(true);
  };

  const statCards = [
    { title: 'Total Employees', value: stats?.total_employees || 0, change: '+3', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { title: 'On Leave Today', value: stats?.on_leave_today || 0, change: '-', icon: Calendar, color: 'from-yellow-500 to-orange-500' },
    { title: 'Monthly Payroll', value: `₹${stats?.monthly_payroll?.toLocaleString() || '0'}`, change: '+5%', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { title: 'Open Positions', value: jobOpenings.filter(j => j.status === 'active').length, change: '+2', icon: Briefcase, color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">HR Dashboard</h1>
        <p className="text-gray-400">Employee management, payroll, and recruitment</p>
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

      {/* Job Requirements Section */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">Job Requirements</h3>
            <p className="text-sm text-gray-400">Post and manage job openings</p>
          </div>
          <Button
            onClick={() => {
              setEditingJob(null);
              setJobForm({
                title: '',
                department: '',
                location: '',
                type: 'Full-time',
                experience: '',
                description: '',
                status: 'active'
              });
              setShowJobForm(!showJobForm);
            }}
            className="bg-gradient-to-r from-blue-500 to-cyan-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </div>

        {/* Job Form */}
        {showJobForm && (
          <div className="bg-gray-700/30 rounded-xl p-6 mb-6 border border-gray-600/50">
            <h4 className="text-lg font-semibold text-white mb-4">
              {editingJob ? 'Edit Job Opening' : 'Create New Job Opening'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Job Title *</label>
                <input
                  type="text"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Senior Full Stack Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Department *</label>
                <select
                  value={jobForm.department}
                  onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Product">Product</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Customer Support">Customer Support</option>
                  <option value="Accounting">Accounting</option>
                  <option value="HR">HR</option>
                  <option value="Security">Security</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location *</label>
                <input
                  type="text"
                  value={jobForm.location}
                  onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Remote / Bangalore"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Job Type *</label>
                <select
                  value={jobForm.type}
                  onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Experience Required *</label>
                <input
                  type="text"
                  value={jobForm.experience}
                  onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 3-5 years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status *</label>
                <select
                  value={jobForm.status}
                  onChange={(e) => setJobForm({ ...jobForm, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Job Description *</label>
                <textarea
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the role, responsibilities, and requirements..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Button
                onClick={editingJob ? handleUpdateJob : handleCreateJob}
                className="bg-gradient-to-r from-green-500 to-emerald-500"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {editingJob ? 'Update Job' : 'Post Job'}
              </Button>
              <Button
                onClick={() => {
                  setShowJobForm(false);
                  setEditingJob(null);
                }}
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Job Openings List */}
        <div className="space-y-3">
          {loading ? (
            <p className="text-gray-400 text-center py-8">Loading job openings...</p>
          ) : jobOpenings.length > 0 ? (
            jobOpenings.map((job) => (
              <div
                key={job.id}
                className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/50 hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-white">{job.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        job.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>📁 {job.department}</span>
                      <span>📍 {job.location}</span>
                      <span>⏰ {job.type}</span>
                      <span>🎯 {job.experience}</span>
                      <span>📅 Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => handleEditJob(job)}
                      size="sm"
                      variant="outline"
                      className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteJob(job.id)}
                      size="sm"
                      variant="outline"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No job openings posted yet</p>
              <p className="text-gray-500 text-sm">Click "Post New Job" to create your first opening</p>
            </div>
          )}
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Department Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['Marketing', 'Customer Support', 'Accounting', 'HR', 'Admin'].map((dept) => {
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
    </div>
  );
}


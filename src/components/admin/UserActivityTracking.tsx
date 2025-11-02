import React, { useState, useEffect } from 'react';
import { Activity, Search, Filter, Download, User, Clock, MapPin, Smartphone } from 'lucide-react';

interface UserActivity {
  id: number;
  user_id: number;
  username: string;
  email: string;
  full_name: string;
  activity_type: string;
  activity_description: string;
  ip_address: string;
  user_agent: string;
  device_type: string;
  location_city: string;
  location_country: string;
  timestamp: string;
}

interface ActivityStats {
  total_activities: number;
  unique_users: number;
  activities_today: number;
  activities_this_week: number;
  top_activity_types: Array<{ activity_type: string; count: number }>;
  active_users_24h: number;
}

const UserActivityTracking: React.FC = () => {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [stats, setStats] = useState<ActivityStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('24h');

  useEffect(() => {
    fetchActivityStats();
    fetchActivities();
  }, [searchTerm, filterType, timeRange]);

  const fetchActivityStats = async () => {
    try {
      const response = await fetch('/admin/user-activity/stats/overview', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data.ok) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching activity stats:', error);
    }
  };

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterType !== 'all') params.append('activity_type', filterType);
      params.append('time_range', timeRange);
      params.append('limit', '100');

      const response = await fetch(`/admin/user-activity?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data.ok) {
        setActivities(data.activities);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login':
      case 'logout':
        return <User size={16} />;
      case 'profile_update':
      case 'settings_change':
        return <Activity size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'login':
        return 'bg-green-100 text-green-800';
      case 'logout':
        return 'bg-gray-100 text-gray-800';
      case 'failed_login':
        return 'bg-red-100 text-red-800';
      case 'profile_update':
      case 'settings_change':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Activity Tracking</h2>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Total Activities</div>
            <div className="text-2xl font-bold">{stats.total_activities.toLocaleString()}</div>
            <div className="text-xs text-gray-500">all time</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Unique Users</div>
            <div className="text-2xl font-bold">{stats.unique_users.toLocaleString()}</div>
            <div className="text-xs text-green-600">{stats.active_users_24h} active in 24h</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Today</div>
            <div className="text-2xl font-bold">{stats.activities_today.toLocaleString()}</div>
            <div className="text-xs text-gray-500">activities</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">This Week</div>
            <div className="text-2xl font-bold">{stats.activities_this_week.toLocaleString()}</div>
            <div className="text-xs text-gray-500">activities</div>
          </div>
        </div>
      )}

      {/* Top Activity Types */}
      {stats && stats.top_activity_types && stats.top_activity_types.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Top Activity Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.top_activity_types.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-blue-600">{item.count}</div>
                <div className="text-sm text-gray-600">{item.activity_type.replace('_', ' ')}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search by username, email, IP address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Activities</option>
            <option value="login">Login</option>
            <option value="logout">Logout</option>
            <option value="failed_login">Failed Login</option>
            <option value="profile_update">Profile Update</option>
            <option value="settings_change">Settings Change</option>
            <option value="subscription_change">Subscription</option>
            <option value="payment">Payment</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
          <button
            onClick={() => {/* Export to CSV */}}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
          >
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Activity Timeline */}
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Activity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(activity.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">{activity.username}</div>
                    <div className="text-xs text-gray-500">{activity.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(activity.activity_type)}`}>
                      {getActivityIcon(activity.activity_type)}
                      <span className="ml-1">{activity.activity_type.replace('_', ' ')}</span>
                    </span>
                    <div className="text-xs text-gray-500 mt-1">{activity.activity_description}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <Smartphone size={14} className="mr-1 text-gray-400" />
                      {activity.device_type || 'Unknown'}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <MapPin size={14} className="mr-1 text-gray-400" />
                      {activity.location_city && activity.location_country
                        ? `${activity.location_city}, ${activity.location_country}`
                        : 'Unknown'}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {activity.ip_address || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {activities.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No activities found for the selected filters
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserActivityTracking;

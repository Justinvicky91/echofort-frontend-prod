import React, { useState, useEffect } from 'react';
import { Shield, Smartphone, Camera, Mic, MapPin, MessageSquare, Phone, HardDrive, Bell, AlertTriangle } from 'lucide-react';

const DevicePermissions: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPermissionsOverview();
    fetchUserPermissions();
    fetchPermissionAlerts();
  }, []);

  const fetchPermissionsOverview = async () => {
    try {
      const response = await fetch('/admin/permissions/overview', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      if (data.ok) setStats(data.stats);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUserPermissions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/admin/permissions/users?limit=50', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      if (data.ok) setUsers(data.permissions);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissionAlerts = async () => {
    try {
      const response = await fetch('/admin/permissions/alerts', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      if (data.ok) setAlerts(data.alerts);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getPermissionIcon = (perm: string) => {
    const icons: any = {
      camera: Camera,
      microphone: Mic,
      location: MapPin,
      sms: MessageSquare,
      phone: Phone,
      storage: HardDrive,
      notification: Bell,
    };
    const Icon = icons[perm] || Shield;
    return <Icon size={20} />;
  };

  const getPermissionColor = (status: string) => {
    if (status === 'granted') return 'text-green-600';
    if (status === 'denied') return 'text-red-600';
    return 'text-gray-400';
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Device Permissions Management</h2>

      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {['camera', 'microphone', 'location', 'sms', 'phone', 'storage', 'notification'].map((perm) => (
            stats[perm] && (
              <div key={perm} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-600 capitalize">{perm}</div>
                  {getPermissionIcon(perm)}
                </div>
                <div className="text-2xl font-bold">{stats[perm].granted_percentage}%</div>
                <div className="text-xs text-gray-500">
                  {stats[perm].granted} granted, {stats[perm].denied} denied
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <AlertTriangle className="mr-2 text-red-600" size={20} />
            Permission Alerts
          </h3>
          <div className="space-y-2">
            {alerts.slice(0, 5).map((alert, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium">{alert.user}:</span> {alert.message}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Permissions Matrix */}
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Camera</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Mic</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">SMS</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Storage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Platform</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium">{user.username}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </td>
                  {['camera', 'microphone', 'location', 'sms', 'phone', 'storage'].map((perm) => (
                    <td key={perm} className="px-4 py-3 text-center">
                      <span className={getPermissionColor(user[`${perm}_permission`])}>
                        {user[`${perm}_permission`] === 'granted' ? '✓' : user[`${perm}_permission`] === 'denied' ? '✗' : '-'}
                      </span>
                    </td>
                  ))}
                  <td className="px-4 py-3 text-sm">{user.platform}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DevicePermissions;

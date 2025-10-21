/**
 * EchoFort API Service
 * Connects to FastAPI backend at https://api.echofort.ai
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.echofort.ai';

class APIError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message);
    this.name = 'APIError';
  }
}

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  // Add auth token if available
  const token = localStorage.getItem('auth_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Request failed' }));
      throw new APIError(response.status, error.detail || 'Request failed', error);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(0, 'Network error', error);
  }
}

// ==================== AUTH API ====================

export const authAPI = {
  sendOTP: (email: string) =>
    fetchAPI('/otp/send', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  verifyOTP: (email: string, otp: string) =>
    fetchAPI<{ token: string; user: any }>('/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    }),

  getMe: () =>
    fetchAPI<any>('/auth/me'),

  logout: () => {
    localStorage.removeItem('auth_token');
    return Promise.resolve();
  },
};

// ==================== USER API ====================

export const userAPI = {
  getProfile: () =>
    fetchAPI<any>('/user/profile'),

  updateProfile: (data: any) =>
    fetchAPI('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getSubscription: () =>
    fetchAPI<any>('/subscription/me'),

  getCallLogs: (limit = 50, offset = 0) =>
    fetchAPI<any[]>(`/calls?limit=${limit}&offset=${offset}`),

  getNotifications: (unreadOnly = false) =>
    fetchAPI<any[]>(`/notifications?unread_only=${unreadOnly}`),

  markNotificationRead: (id: string) =>
    fetchAPI(`/notifications/${id}/read`, { method: 'POST' }),
};

// ==================== SUBSCRIPTION API ====================

export const subscriptionAPI = {
  create: (plan: string, paymentGateway: string) =>
    fetchAPI<any>('/subscription/create', {
      method: 'POST',
      body: JSON.stringify({ plan, payment_gateway: paymentGateway }),
    }),

  cancel: () =>
    fetchAPI('/subscription/cancel', { method: 'POST' }),

  upgrade: (newPlan: string) =>
    fetchAPI('/subscription/upgrade', {
      method: 'POST',
      body: JSON.stringify({ new_plan: newPlan }),
    }),

  getPlans: () =>
    fetchAPI<any[]>('/subscription/plans'),
};

// ==================== PAYMENT API ====================

export const paymentAPI = {
  createOrder: (amount: number, plan: string, gateway: string) =>
    fetchAPI<any>('/payment/create-order', {
      method: 'POST',
      body: JSON.stringify({ amount, plan, gateway }),
    }),

  verifyPayment: (paymentId: string, orderId: string, signature?: string) =>
    fetchAPI<any>('/payment/verify', {
      method: 'POST',
      body: JSON.stringify({ payment_id: paymentId, order_id: orderId, signature }),
    }),

  getHistory: (limit = 20) =>
    fetchAPI<any[]>(`/payment/history?limit=${limit}`),
};

// ==================== FAMILY API ====================

export const familyAPI = {
  create: (familyName: string) =>
    fetchAPI<any>('/family/create', {
      method: 'POST',
      body: JSON.stringify({ family_name: familyName }),
    }),

  getFamily: () =>
    fetchAPI<any>('/family/me'),

  addMember: (data: any) =>
    fetchAPI<any>('/family/members', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  removeMember: (memberId: string) =>
    fetchAPI(`/family/members/${memberId}`, { method: 'DELETE' }),

  getLocations: (memberId?: string, hours = 24) =>
    fetchAPI<any[]>(`/gps/locations?member_id=${memberId || ''}&hours=${hours}`),

  getScreenTime: (memberId: string, days = 7) =>
    fetchAPI<any[]>(`/screentime/${memberId}?days=${days}`),
};

// ==================== SCAM API ====================

export const scamAPI = {
  checkNumber: (phoneNumber: string) =>
    fetchAPI<any>(`/scam/check?phone=${encodeURIComponent(phoneNumber)}`),

  reportScam: (data: any) =>
    fetchAPI<any>('/scam/report', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getRecentScams: (limit = 10) =>
    fetchAPI<any[]>(`/scam/recent?limit=${limit}`),
};

// ==================== IMAGE SCAN API ====================

export const imageScanAPI = {
  scanImage: (imageUrl: string) =>
    fetchAPI<any>('/ai/image/scan', {
      method: 'POST',
      body: JSON.stringify({ image_url: imageUrl }),
    }),

  getHistory: (limit = 20) =>
    fetchAPI<any[]>(`/ai/image/history?limit=${limit}`),
};

// ==================== LEGAL COMPLAINT API ====================

export const legalAPI = {
  createComplaint: (data: any) =>
    fetchAPI<any>('/legal/complaint', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getComplaints: () =>
    fetchAPI<any[]>('/legal/complaints'),

  updateComplaint: (id: string, data: any) =>
    fetchAPI<any>(`/legal/complaint/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// ==================== ADMIN API ====================

export const adminAPI = {
  getUsers: (limit = 50, offset = 0, role?: string) =>
    fetchAPI<any[]>(`/admin/users?limit=${limit}&offset=${offset}${role ? `&role=${role}` : ''}`),

  updateUser: (userId: string, data: any) =>
    fetchAPI(`/admin/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getAnalytics: () =>
    fetchAPI<any>('/admin/analytics'),

  getScamReports: (limit = 50, verified?: boolean) =>
    fetchAPI<any[]>(`/admin/scams?limit=${limit}${verified !== undefined ? `&verified=${verified}` : ''}`),

  verifyScam: (scamId: string, verified: boolean) =>
    fetchAPI(`/admin/scams/${scamId}/verify`, {
      method: 'POST',
      body: JSON.stringify({ verified }),
    }),

  exportData: (type: string) =>
    fetchAPI<any>(`/admin/export/${type}`),
};

// ==================== SUPER ADMIN API ====================

export const superAdminAPI = {
  getDashboard: () =>
    fetchAPI<any>('/admin/dashboard'),

  getRevenue: (startDate: string, endDate: string) =>
    fetchAPI<any>(`/admin/revenue?start=${startDate}&end=${endDate}`),

  getProfitLoss: (month: string) =>
    fetchAPI<any>(`/admin/profit-loss?month=${month}`),

  getInfraCosts: (months = 6) =>
    fetchAPI<any[]>(`/admin/infra-costs?months=${months}`),

  updateInfraCost: (month: string, data: any) =>
    fetchAPI(`/admin/infra-costs/${month}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getPayroll: (month: string) =>
    fetchAPI<any[]>(`/admin/payroll?month=${month}`),

  processPayroll: (data: any) =>
    fetchAPI('/admin/payroll', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getAuditLogs: (limit = 100, userId?: string, action?: string) =>
    fetchAPI<any[]>(`/admin/audit?limit=${limit}${userId ? `&user_id=${userId}` : ''}${action ? `&action=${action}` : ''}`),

  // EchoFort AI
  askAI: (question: string, context?: string) =>
    fetchAPI<{ answer: string }>('/ai-assistant/ask', {
      method: 'POST',
      body: JSON.stringify({ question, context }),
    }),

  getAIInsights: () =>
    fetchAPI<any>('/ai-assistant/insights'),

  executeSQL: (query: string, key: string) =>
    fetchAPI<any>('/admin/execute-sql', {
      method: 'POST',
      body: JSON.stringify({ query, key }),
    }),
};

// ==================== EMPLOYEE API ====================

export const employeeAPI = {
  getDashboard: () =>
    fetchAPI<any>('/employee/dashboard'),

  getTasks: () =>
    fetchAPI<any[]>('/employee/tasks'),

  updateTaskStatus: (taskId: string, status: string) =>
    fetchAPI(`/employee/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
};

// ==================== STATS API ====================

export const statsAPI = {
  getPlatformStats: () =>
    fetchAPI<any>('/stats/platform'),

  getTrustFactorDemo: (phoneNumber: string) =>
    fetchAPI<any>(`/stats/trust-factor?phone=${encodeURIComponent(phoneNumber)}`),
};

// Export all APIs
export const api = {
  auth: authAPI,
  user: userAPI,
  subscription: subscriptionAPI,
  payment: paymentAPI,
  family: familyAPI,
  scam: scamAPI,
  imageScan: imageScanAPI,
  legal: legalAPI,
  admin: adminAPI,
  superAdmin: superAdminAPI,
  employee: employeeAPI,
  stats: statsAPI,
};

export default api;


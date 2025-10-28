// API Service for EchoFort Backend
const API_URL = import.meta.env.VITE_API_URL || 'https://api.echofort.ai';

class ApiService {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  async request(endpoint: string, options: RequestInit = {}) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers
        }
      });

      if (response.status === 401) {
        // Only redirect if not already on login page
        if (!window.location.pathname.includes('/login')) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        throw new Error('Unauthorized');
      }

      const data = await response.json();
      
      if (!response.ok) {
        // Silently fail for expected missing endpoints (404, 500)
        if (response.status === 404 || response.status === 500) {
          console.warn(`API endpoint not available: ${endpoint}`);
          return { items: [], success: false, message: 'Endpoint not available' };
        }
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error: any) {
      // Handle network errors gracefully
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        console.warn(`Network error for ${endpoint}, returning empty data`);
        return { items: [], success: false, message: 'Network error' };
      }
      throw error;
    }
  }

  // Auth
  auth = {
    signup: async (data: any) => {
      return this.request('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },
    sendOTP: async (email: string) => {
      // Normalize email (lowercase, trim)
      const normalizedEmail = email.toLowerCase().trim();
      return this.request('/auth/otp/request', {
        method: 'POST',
        body: JSON.stringify({ email: normalizedEmail })
      });
    },
    verifyOTP: async (email: string, otp: string) => {
      // Normalize email (lowercase, trim)
      const normalizedEmail = email.toLowerCase().trim();
      
      // Generate device_id from browser fingerprint or use stored value
      let device_id = localStorage.getItem('echofort_device_id');
      if (!device_id) {
        // Generate unique device ID
        device_id = `web_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('echofort_device_id', device_id);
      }
      
      return this.request('/auth/otp/verify', {
        method: 'POST',
        body: JSON.stringify({ email: normalizedEmail, otp, device_id })
      });
    },
    setPassword: async (data: { email: string; password: string }) => {
      const normalizedEmail = data.email.toLowerCase().trim();
      return this.request('/auth/password/set', {
        method: 'POST',
        body: JSON.stringify({ email: normalizedEmail, password: data.password })
      });
    },
    loginWithPassword: async (email: string, password: string) => {
      const normalizedEmail = email.toLowerCase().trim();
      let device_id = localStorage.getItem('echofort_device_id');
      if (!device_id) {
        device_id = `web_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('echofort_device_id', device_id);
      }
      return this.request('/auth/password/login', {
        method: 'POST',
        body: JSON.stringify({ email: normalizedEmail, password, device_id })
      });
    },
    forgotPassword: async (email: string) => {
      const normalizedEmail = email.toLowerCase().trim();
      return this.request('/auth/password/forgot', {
        method: 'POST',
        body: JSON.stringify({ email: normalizedEmail })
      });
    },
    resetPassword: async (email: string, otp: string, new_password: string) => {
      const normalizedEmail = email.toLowerCase().trim();
      return this.request('/auth/password/reset', {
        method: 'POST',
        body: JSON.stringify({ email: normalizedEmail, otp, new_password })
      });
    }
  };

  async initiateLogin(identifier: string) {
    return this.request('/auth/unified/login/initiate', {
      method: 'POST',
      body: JSON.stringify({ identifier })
    });
  }

  async verifyLogin(payload: any) {
    return this.request('/auth/unified/login/verify', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  // Employee Management
  async getEmployees() {
    return this.request('/admin/employees');
  }

  async createEmployee(data: any) {
    return this.request('/admin/employees', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateEmployee(id: number, data: any) {
    return this.request(`/admin/employees/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  async resetEmployeePassword(id: number, newPassword: string) {
    return this.request(`/admin/employees/${id}/reset-password`, {
      method: 'POST',
      body: JSON.stringify({ new_password: newPassword })
    });
  }

  async deleteEmployee(id: number) {
    return this.request(`/admin/employees/${id}`, {
      method: 'DELETE'
    });
  }

  // Payment Gateways
  async getPaymentGateways() {
    return this.request('/api/admin/payment-gateways/active');
  }

  async configurePaymentGateway(data: any) {
    return this.request('/api/admin/payment-gateways/configure', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updatePaymentGateway(id: number, data: any) {
    return this.request(`/admin/payment-gateways/${id}/update`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async testPaymentGateway(id: number) {
    return this.request(`/admin/payment-gateways/${id}/test`, {
      method: 'POST'
    });
  }

  // Call Recording Vault
  async setVaultPassword(password: string) {
    return this.request('/admin/vault/set-password', {
      method: 'POST',
      body: JSON.stringify({ vault_password: password })
    });
  }

  async verifyVaultPassword(password: string) {
    return this.request('/admin/vault/verify-password', {
      method: 'POST',
      body: JSON.stringify({ vault_password: password })
    });
  }

  async getVaultRecordings(vaultPassword: string) {
    return this.request(`/admin/vault/recordings/list?vault_password=${vaultPassword}`);
  }

  async deleteRecording(id: number, vaultPassword: string) {
    return this.request(`/admin/vault/recordings/${id}?vault_password=${vaultPassword}`, {
      method: 'DELETE'
    });
  }

  // Customer Exemptions
  async getExemptions() {
    return this.request('/admin/exemptions/list');
  }

  async grantExemption(data: any) {
    return this.request('/admin/exemptions/grant', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async revokeExemption(userId: number) {
    return this.request(`/admin/exemptions/revoke/${userId}`, {
      method: 'POST'
    });
  }

  async extendExemption(userId: number, additionalDays: number) {
    return this.request(`/admin/exemptions/extend/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ additional_days: additionalDays })
    });
  }

  // EchoFort AI
  async sendAICommand(command: string) {
    return this.request('/api/echofort-ai/command', {
      method: 'POST',
      body: JSON.stringify({ command })
    });
  }

  async approveAITask(taskId: number, approved: boolean) {
    return this.request('/api/echofort-ai/approve', {
      method: 'POST',
      body: JSON.stringify({ task_id: taskId, approved })
    });
  }

  async getPendingAITasks() {
    return this.request('/api/echofort-ai/pending-tasks');
  }

  async getAIInsights() {
    return this.request('/api/echofort-ai/insights');
  }

  async chatWithAI(message: string) {
    return this.request('/api/ai-assistant/chat', {
      method: 'POST',
      body: JSON.stringify({ message })
    });
  }

  async chatWithEchoFortAI(message: string) {
    return this.request('/api/echofort-ai-intelligent/chat', {
      method: 'POST',
      body: JSON.stringify({ message, execute_directly: true })
    });
  }

  // Dashboard Stats
  async getDashboardStats() {
    return this.request('/admin/dashboard/stats');
  }

  // Customers
  async getCustomers() {
    return this.request('/admin/customers/list');
  }

  async getCustomerDetails(id: number) {
    return this.request(`/admin/customers/${id}/details`);
  }

  // Subscriptions
  async getSubscriptions() {
    return this.request('/admin/subscriptions/list');
  }

  // Threats
  async getThreatDashboard() {
    return this.request('/admin/threats/dashboard');
  }

  async getLiveThreats() {
    return this.request('/admin/threats/live');
  }

  // Marketing
  async getMarketingStats() {
    return this.request('/admin/marketing/stats');
  }

  async createCampaign(data: any) {
    return this.request('/admin/marketing/campaign/create', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async getCampaigns() {
    return this.request('/admin/marketing/campaigns');
  }

  async getMarketingAnalytics() {
    return this.request('/admin/marketing/analytics');
  }

  // P&L
  async getMonthlyPL() {
    return this.request('/admin/profit-loss/monthly');
  }

  async getYearlyPL() {
    return this.request('/admin/profit-loss/yearly');
  }

  // Payroll
  async getCurrentPayroll() {
    return this.request('/admin/payroll/current');
  }

  async processPayroll() {
    return this.request('/admin/payroll/process', {
      method: 'POST'
    });
  }

  // Database
  async executeSQL(query: string) {
    return this.request('/admin/execute-sql', {
      method: 'POST',
      body: JSON.stringify({ query })
    });
  }

  // Payment
  payment = {
    createOrder: async (amount: number) => {
      return this.request('/api/payment/create-order', {
        method: 'POST',
        body: JSON.stringify({ amount })
      });
    },
    verifyPayment: async (paymentData: any) => {
      return this.request('/api/payment/verify', {
        method: 'POST',
        body: JSON.stringify(paymentData)
      });
    }
  };

  // Audit
  async getAuditLogs() {
    return this.request('/admin/audit/logs');
  }

  // Support
  async getSupportStats() {
    return this.request('/admin/support/stats');
  }

  async getTickets(filters?: any) {
    const params = filters ? `?${new URLSearchParams(filters).toString()}` : '';
    return this.request(`/admin/support/tickets${params}`);
  }

  async assignTicket(ticketId: number, employeeId: number) {
    return this.request('/admin/support/ticket/assign', {
      method: 'POST',
      body: JSON.stringify({ ticket_id: ticketId, employee_id: employeeId })
    });
  }

  async updateTicketStatus(ticketId: number, status: string) {
    return this.request(`/admin/support/ticket/${ticketId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  }

  async addTicketNote(ticketId: number, note: string) {
    return this.request(`/admin/support/ticket/${ticketId}/note`, {
      method: 'POST',
      body: JSON.stringify({ note })
    });
  }

  async getTicketConversation(ticketId: number) {
    return this.request(`/admin/support/ticket/${ticketId}/conversation`);
  }

  async replyToTicket(ticketId: number, data: { message: string; status?: string }) {
    return this.request(`/admin/support/ticket/${ticketId}/reply`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // Accounting
  async getRecentTransactions() {
    return this.request('/admin/accounting/transactions/recent');
  }

  async getAccountingStats() {
    return this.request('/admin/accounting/stats');
  }

  async getRevenue(period: string) {
    return this.request(`/admin/accounting/revenue?period=${period}`);
  }

  async getExpenses(period: string) {
    return this.request(`/admin/accounting/expenses?period=${period}`);
  }

  // HR
  async getHRStats() {
    return this.request('/admin/hr/stats');
  }

  async getAttendance() {
    return this.request('/admin/hr/attendance');
  }

  async getLeaveRequests() {
    return this.request('/admin/hr/leave-requests');
  }

  async approveLeave(requestId: number) {
    return this.request(`/admin/hr/leave/${requestId}/approve`, {
      method: 'POST'
    });
  }

  async rejectLeave(requestId: number, reason: string) {
    return this.request(`/admin/hr/leave/${requestId}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    });
  }

  // Customer Dashboard
  async getRecentCalls() {
    return this.request('/api/customer/recent-calls');
  }

  async getCustomerStats() {
    return this.request('/api/customer/stats');
  }

  async getScamAlerts() {
    return this.request('/api/customer/scam-alerts');
  }

  async getFamilyMembers() {
    return this.request('/api/customer/family');
  }

  async getCallRecordings() {
    return this.request('/api/customer/call-recordings');
  }

  async reportScam(data: any) {
    return this.request('/api/customer/report-scam', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // Infrastructure Costs
  async getInfrastructureCosts() {
    return this.request('/admin/infra-costs/current-month');
  }

  async getScalingRecommendations() {
    return this.request('/admin/infra-costs/recommendations');
  }

  // Service Integrations (Railway, OpenAI, etc.)
  async getRailwayCosts() {
    return this.request('/admin/integrations/railway/costs');
  }

  async getOpenAIUsage() {
    return this.request('/admin/integrations/openai/usage');
  }

  async getAllServicesSummary() {
    return this.request('/admin/integrations/all-services/summary');
  }

  async syncServiceCosts() {
    return this.request('/admin/integrations/sync-costs', {
      method: 'POST'
    });
  }

  async recordInfrastructureCost(data: any) {
    return this.request('/admin/infra-costs/record', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // Customer Management
  async getAllCustomers(filters?: any) {
    const params = filters ? `?${new URLSearchParams(filters).toString()}` : '';
    return this.request(`/admin/customers${params}`);
  }

  async getCustomerActivity(userId: number) {
    return this.request(`/admin/customers/${userId}/activity`);
  }

  async getCustomerSubscription(userId: number) {
    return this.request(`/admin/customers/${userId}/subscription`);
  }

  // Financial Management
  async getFinancialOverview() {
    return this.request('/admin/profit-loss/statement');
  }

  async getRevenueBreakdown(month: number, year: number) {
    return this.request(`/admin/profit-loss/revenue?month=${month}&year=${year}`);
  }

  async getExpenseBreakdown(month: number, year: number) {
    return this.request(`/admin/profit-loss/expenses?month=${month}&year=${year}`);
  }

  async recordExpense(data: any) {
    return this.request('/admin/profit-loss/expense', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // YouTube Videos
  async getYouTubeVideos() {
    return this.request('/api/public/youtube/all');
  }

  // Live Scam Alerts
  async getLiveScamAlerts() {
    return this.request('/api/public/scam-alerts/live');
  }

  // Job Openings/Requirements
  async getJobOpenings() {
    return this.request('/admin/job-openings');
  }

  async createJobOpening(data: any) {
    return this.request('/admin/job-openings', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateJobOpening(id: string, data: any) {
    return this.request(`/admin/job-openings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteJobOpening(id: string) {
    return this.request(`/admin/job-openings/${id}`, {
      method: 'DELETE'
    });
  }

  // Approvals & Notifications
  async getApprovals(filters?: any) {
    const params = filters ? `?${new URLSearchParams(filters).toString()}` : '';
    return this.request(`/admin/approvals${params}`);
  }

  async approveRequest(approvalId: string, data: any) {
    return this.request(`/admin/approvals/${approvalId}/approve`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async rejectRequest(approvalId: string, data: any) {
    return this.request(`/admin/approvals/${approvalId}/reject`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async getNotifications() {
    return this.request('/admin/notifications');
  }

  async markNotificationRead(notificationId: string) {
    return this.request(`/admin/notifications/${notificationId}/read`, {
      method: 'POST'
    });
  }
}

export const api = new ApiService();
export default api;


// API Service for EchoFort Backend
const API_URL = 'https://echofort-backend-production.up.railway.app';

class ApiService {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers
      }
    });

    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  }

  // Auth
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
    return this.request('/admin/employees/list');
  }

  async createEmployee(data: any) {
    return this.request('/admin/employees/create', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateEmployee(id: number, data: any) {
    return this.request(`/admin/employees/${id}/update`, {
      method: 'PUT',
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
    return this.request('/admin/payment-gateways/list');
  }

  async configurePaymentGateway(data: any) {
    return this.request('/admin/payment-gateways/configure', {
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
    return this.request('/api/ai-assistant/insights');
  }

  async chatWithAI(message: string) {
    return this.request('/api/ai-assistant/chat', {
      method: 'POST',
      body: JSON.stringify({ message })
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

  // Audit
  async getAuditLogs() {
    return this.request('/admin/audit/logs');
  }

  // Support
  async getTickets() {
    return this.request('/admin/support/tickets');
  }

  async assignTicket(ticketId: number, employeeId: number) {
    return this.request('/admin/support/ticket/assign', {
      method: 'POST',
      body: JSON.stringify({ ticket_id: ticketId, employee_id: employeeId })
    });
  }
}

export const api = new ApiService();
export default api;


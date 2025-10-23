import { mysqlEnum, mysqlTable, text, timestamp, varchar, int, boolean, decimal } from "drizzle-orm/mysql-core";

/**
 * EchoFort Database Schema
 * Comprehensive schema for AI-powered scam protection platform
 */

// User roles enum
export const userRoleEnum = mysqlEnum("role", ["user", "employee", "admin", "super_admin"]);

// Subscription plan enum
export const subscriptionPlanEnum = mysqlEnum("subscription_plan", ["basic", "premium", "family"]);

// Subscription status enum
export const subscriptionStatusEnum = mysqlEnum("subscription_status", ["active", "inactive", "trial", "expired", "canceled"]);

// Employee department enum
export const employeeDepartmentEnum = mysqlEnum("department", ["marketing", "support", "accounting", "operations"]);

/**
 * Core Users Table
 * Single table for all user types (customers, employees, admins)
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 15 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRoleEnum.default("user").notNull(),
  
  // Employee-specific fields
  department: employeeDepartmentEnum,
  employeeId: varchar("employeeId", { length: 50 }),
  managerId: varchar("managerId", { length: 64 }), // References users.id
  
  // Subscription fields
  subscriptionPlan: subscriptionPlanEnum,
  subscriptionStatus: subscriptionStatusEnum.default("inactive"),
  subscriptionStartDate: timestamp("subscriptionStartDate"),
  subscriptionEndDate: timestamp("subscriptionEndDate"),
  trialEndedAt: timestamp("trialEndedAt"),
  
  // Payment fields
  razorpayCustomerId: varchar("razorpayCustomerId", { length: 100 }),
  razorpaySubscriptionId: varchar("razorpaySubscriptionId", { length: 100 }),
  stripeCustomerId: varchar("stripeCustomerId", { length: 100 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 100 }),
  
  // Device info
  deviceId: varchar("deviceId", { length: 100 }),
  deviceName: varchar("deviceName", { length: 100 }),
  
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
  emailVerified: boolean("emailVerified").default(false),
  phoneVerified: boolean("phoneVerified").default(false),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Subscriptions Table
 * Tracks subscription history and details
 */
export const subscriptions = mysqlTable("subscriptions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  plan: subscriptionPlanEnum.notNull(),
  status: subscriptionStatusEnum.notNull(),
  amount: int("amount").notNull(), // in paise/cents
  currency: varchar("currency", { length: 3 }).default("INR"),
  billingCycle: varchar("billingCycle", { length: 20 }).default("monthly"),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  autoRenew: boolean("autoRenew").default(true),
  paymentGateway: varchar("paymentGateway", { length: 20 }), // razorpay, stripe, paypal
  gatewaySubscriptionId: varchar("gatewaySubscriptionId", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Subscription = typeof subscriptions.$inferSelect;

/**
 * Payments Table
 * Tracks all payment transactions
 */
export const payments = mysqlTable("payments", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  subscriptionId: varchar("subscriptionId", { length: 64 }),
  amount: int("amount").notNull(),
  currency: varchar("currency", { length: 3 }).default("INR"),
  status: varchar("status", { length: 20 }).notNull(), // success, failed, pending, refunded
  paymentGateway: varchar("paymentGateway", { length: 20 }).notNull(),
  gatewayPaymentId: varchar("gatewayPaymentId", { length: 100 }),
  gatewayOrderId: varchar("gatewayOrderId", { length: 100 }),
  paymentMethod: varchar("paymentMethod", { length: 50 }), // card, upi, netbanking, wallet
  invoiceUrl: text("invoiceUrl"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Payment = typeof payments.$inferSelect;

/**
 * Call Logs Table
 * Stores call screening data and Trust Factor scores
 */
export const callLogs = mysqlTable("call_logs", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  phoneNumber: varchar("phoneNumber", { length: 15 }).notNull(),
  callerName: varchar("callerName", { length: 100 }),
  trustFactor: int("trustFactor"), // 0-10 scale
  isScam: boolean("isScam").default(false),
  scamType: varchar("scamType", { length: 50 }), // loan, lottery, phishing, etc.
  callDuration: int("callDuration"), // in seconds
  callStatus: varchar("callStatus", { length: 20 }), // answered, rejected, missed
  timestamp: timestamp("timestamp").defaultNow(),
  recordingUrl: text("recordingUrl"), // S3 URL for call recording
  aiAnalysis: text("aiAnalysis"), // JSON string with AI analysis results
  createdAt: timestamp("createdAt").defaultNow(),
});

export type CallLog = typeof callLogs.$inferSelect;

/**
 * Scam Database Table
 * Known scam numbers and patterns
 */
export const scamDatabase = mysqlTable("scam_database", {
  id: varchar("id", { length: 64 }).primaryKey(),
  phoneNumber: varchar("phoneNumber", { length: 15 }).notNull(),
  scamType: varchar("scamType", { length: 50 }).notNull(),
  description: text("description"),
  reportCount: int("reportCount").default(1),
  verifiedBy: varchar("verifiedBy", { length: 20 }), // user, admin, cybercrime
  severity: int("severity").default(5), // 1-10 scale
  lastReportedAt: timestamp("lastReportedAt").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type ScamEntry = typeof scamDatabase.$inferSelect;

/**
 * Families Table
 * Family groups for Family Pack subscribers
 */
export const families = mysqlTable("families", {
  id: varchar("id", { length: 64 }).primaryKey(),
  ownerId: varchar("ownerId", { length: 64 }).notNull(), // Primary subscriber
  familyName: varchar("familyName", { length: 100 }),
  memberCount: int("memberCount").default(1),
  maxMembers: int("maxMembers").default(3),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Family = typeof families.$inferSelect;

/**
 * Family Members Table
 * Members in a family group
 */
export const familyMembers = mysqlTable("family_members", {
  id: varchar("id", { length: 64 }).primaryKey(),
  familyId: varchar("familyId", { length: 64 }).notNull(),
  userId: varchar("userId", { length: 64 }), // If they have an account
  name: varchar("name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 15 }),
  relationship: varchar("relationship", { length: 50 }), // parent, child, spouse
  isMinor: boolean("isMinor").default(false),
  gpsEnabled: boolean("gpsEnabled").default(false),
  screenTimeEnabled: boolean("screenTimeEnabled").default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type FamilyMember = typeof familyMembers.$inferSelect;

/**
 * GPS Locations Table
 * Real-time location tracking for Family Pack
 */
export const gpsLocations = mysqlTable("gps_locations", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  familyMemberId: varchar("familyMemberId", { length: 64 }),
  latitude: varchar("latitude", { length: 20 }).notNull(),
  longitude: varchar("longitude", { length: 20 }).notNull(),
  accuracy: int("accuracy"), // in meters
  address: text("address"),
  timestamp: timestamp("timestamp").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type GpsLocation = typeof gpsLocations.$inferSelect;

/**
 * Geofences Table
 * Safe zones for family members
 */
export const geofences = mysqlTable("geofences", {
  id: varchar("id", { length: 64 }).primaryKey(),
  familyId: varchar("familyId", { length: 64 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  latitude: varchar("latitude", { length: 20 }).notNull(),
  longitude: varchar("longitude", { length: 20 }).notNull(),
  radius: int("radius").notNull(), // in meters
  alertOnEntry: boolean("alertOnEntry").default(true),
  alertOnExit: boolean("alertOnExit").default(true),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Geofence = typeof geofences.$inferSelect;

/**
 * Screen Time Logs Table
 * App usage monitoring for child protection
 */
export const screenTimeLogs = mysqlTable("screen_time_logs", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  familyMemberId: varchar("familyMemberId", { length: 64 }),
  appName: varchar("appName", { length: 100 }).notNull(),
  packageName: varchar("packageName", { length: 200 }),
  usageDuration: int("usageDuration").notNull(), // in seconds
  openCount: int("openCount").default(1),
  date: varchar("date", { length: 10 }).notNull(), // YYYY-MM-DD
  addictionRisk: int("addictionRisk"), // 0-10 scale
  createdAt: timestamp("createdAt").defaultNow(),
});

export type ScreenTimeLog = typeof screenTimeLogs.$inferSelect;

/**
 * Image Scans Table
 * AI-powered image analysis for phishing detection
 */
export const imageScans = mysqlTable("image_scans", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  imageUrl: text("imageUrl").notNull(),
  scanResult: varchar("scanResult", { length: 20 }), // safe, suspicious, dangerous
  threatType: varchar("threatType", { length: 50 }), // phishing, fake_qr, fraudulent_message
  confidence: int("confidence"), // 0-100
  aiAnalysis: text("aiAnalysis"), // JSON string with detailed analysis
  createdAt: timestamp("createdAt").defaultNow(),
});

export type ImageScan = typeof imageScans.$inferSelect;

/**
 * Legal Complaints Table
 * Tracks cybercrime complaints filed by users
 */
export const legalComplaints = mysqlTable("legal_complaints", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  complaintType: varchar("complaintType", { length: 50 }).notNull(),
  scammerPhone: varchar("scammerPhone", { length: 15 }),
  description: text("description").notNull(),
  evidenceUrls: text("evidenceUrls"), // JSON array of URLs
  status: varchar("status", { length: 20 }).default("draft"), // draft, submitted, in_progress, resolved
  referenceNumber: varchar("referenceNumber", { length: 100 }),
  filedAt: timestamp("filedAt"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type LegalComplaint = typeof legalComplaints.$inferSelect;

/**
 * System Settings Table
 * Platform-wide configuration (Super Admin only)
 */
export const systemSettings = mysqlTable("system_settings", {
  id: varchar("id", { length: 64 }).primaryKey(),
  settingKey: varchar("settingKey", { length: 100 }).notNull(),
  settingValue: text("settingValue"),
  category: varchar("category", { length: 50 }), // payment, ai, security, etc.
  description: text("description"),
  updatedBy: varchar("updatedBy", { length: 64 }), // User ID of admin who updated
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type SystemSetting = typeof systemSettings.$inferSelect;

/**
 * Payroll Table
 * Employee salary management
 */
export const payroll = mysqlTable("payroll", {
  id: varchar("id", { length: 64 }).primaryKey(),
  employeeId: varchar("employeeId", { length: 64 }).notNull(),
  month: varchar("month", { length: 7 }).notNull(), // YYYY-MM
  baseSalary: int("baseSalary").notNull(),
  bonus: int("bonus").default(0),
  deductions: int("deductions").default(0),
  netSalary: int("netSalary").notNull(),
  status: varchar("status", { length: 20 }).default("pending"), // pending, paid, failed
  paidAt: timestamp("paidAt"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Payroll = typeof payroll.$inferSelect;

/**
 * Infrastructure Costs Table
 * Tracks platform operational costs
 */
export const infraCosts = mysqlTable("infra_costs", {
  id: varchar("id", { length: 64 }).primaryKey(),
  month: varchar("month", { length: 7 }).notNull(), // YYYY-MM
  railwayHosting: int("railwayHosting").default(0),
  openaiApi: int("openaiApi").default(0),
  sendgridEmail: int("sendgridEmail").default(0),
  storageS3: int("storageS3").default(0),
  paymentGatewayFees: int("paymentGatewayFees").default(0),
  other: int("other").default(0),
  totalCost: int("totalCost").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type InfraCost = typeof infraCosts.$inferSelect;

/**
 * Audit Logs Table
 * Tracks all admin and system actions
 */
export const auditLogs = mysqlTable("audit_logs", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  action: varchar("action", { length: 100 }).notNull(),
  entityType: varchar("entityType", { length: 50 }), // user, subscription, payment, etc.
  entityId: varchar("entityId", { length: 64 }),
  details: text("details"), // JSON string with action details
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export type AuditLog = typeof auditLogs.$inferSelect;

/**
 * Notifications Table
 * In-app notifications for users
 */
export const notifications = mysqlTable("notifications", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  message: text("message").notNull(),
  type: varchar("type", { length: 20 }).default("info"), // info, warning, alert, success
  isRead: boolean("isRead").default(false),
  actionUrl: text("actionUrl"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Notification = typeof notifications.$inferSelect;

/**
 * OTP Table
 * Temporary storage for email/phone verification codes
 */
export const otps = mysqlTable("otps", {
  id: varchar("id", { length: 64 }).primaryKey(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 15 }),
  otp: varchar("otp", { length: 6 }).notNull(),
  purpose: varchar("purpose", { length: 50 }).notNull(), // signup, login, reset_password
  expiresAt: timestamp("expiresAt").notNull(),
  verified: boolean("verified").default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Otp = typeof otps.$inferSelect;



/**
 * Support Tickets Table
 * Customer support ticket management system
 */
export const supportTickets = mysqlTable("support_tickets", {
  id: varchar("id", { length: 64 }).primaryKey(),
  ticketNumber: varchar("ticketNumber", { length: 20 }).notNull(), // Format: TKT-YYYYMMDD-XXXX
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  customerName: varchar("customerName", { length: 100 }),
  customerPhone: varchar("customerPhone", { length: 15 }),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 20 }).default("open"), // open, in_progress, auto_responded, resolved, closed
  priority: varchar("priority", { length: 20 }).default("normal"), // low, normal, high, urgent
  assignedTo: varchar("assignedTo", { length: 64 }), // Employee user ID
  resolvedAt: timestamp("resolvedAt"),
  firstResponseAt: timestamp("firstResponseAt"),
  category: varchar("category", { length: 50 }), // technical, billing, general, complaint
  source: varchar("source", { length: 20 }).default("email"), // email, whatsapp, dashboard, phone
  
  // Escalation tracking
  escalatedToAdmin: boolean("escalatedToAdmin").default(false),
  escalatedToSuperAdmin: boolean("escalatedToSuperAdmin").default(false),
  escalationReason: text("escalationReason"),
  
  // Metadata
  userId: varchar("userId", { length: 64 }), // If customer is registered user
  subscriptionId: varchar("subscriptionId", { length: 64 }),
  attachments: text("attachments"), // JSON array of file URLs
  tags: text("tags"), // JSON array of tags
  
  // Auto-response tracking
  autoResponseUsed: boolean("autoResponseUsed").default(false),
  autoResponseTemplateId: varchar("autoResponseTemplateId", { length: 64 }),
  
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type SupportTicket = typeof supportTickets.$inferSelect;
export type InsertSupportTicket = typeof supportTickets.$inferInsert;

/**
 * Ticket Responses Table
 * All messages in a support ticket thread
 */
export const ticketResponses = mysqlTable("ticket_responses", {
  id: varchar("id", { length: 64 }).primaryKey(),
  ticketId: varchar("ticketId", { length: 64 }).notNull(),
  senderType: varchar("senderType", { length: 20 }).notNull(), // customer, employee, system
  senderId: varchar("senderId", { length: 64 }), // Employee user ID if sender is employee
  senderEmail: varchar("senderEmail", { length: 320 }), // Customer email if sender is customer
  senderPhone: varchar("senderPhone", { length: 15 }), // For WhatsApp messages
  message: text("message").notNull(),
  isInternalNote: boolean("isInternalNote").default(false), // Internal notes not sent to customer
  sentVia: varchar("sentVia", { length: 20 }).default("email"), // email, whatsapp, dashboard
  attachments: text("attachments"), // JSON array of file URLs
  createdAt: timestamp("createdAt").defaultNow(),
});

export type TicketResponse = typeof ticketResponses.$inferSelect;
export type InsertTicketResponse = typeof ticketResponses.$inferInsert;

/**
 * Ticket Auto-Responses Table
 * Chatbot templates for common questions
 */
export const ticketAutoResponses = mysqlTable("ticket_auto_responses", {
  id: varchar("id", { length: 64 }).primaryKey(),
  keyword: varchar("keyword", { length: 100 }).notNull(),
  responseTemplate: text("responseTemplate").notNull(),
  category: varchar("category", { length: 50 }),
  enabled: boolean("enabled").default(true),
  usageCount: int("usageCount").default(0),
  successRate: int("successRate").default(0), // Percentage of tickets resolved without human intervention
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type TicketAutoResponse = typeof ticketAutoResponses.$inferSelect;
export type InsertTicketAutoResponse = typeof ticketAutoResponses.$inferInsert;

/**
 * Ticket Assignments Table
 * Tracks ticket assignment history
 */
export const ticketAssignments = mysqlTable("ticket_assignments", {
  id: varchar("id", { length: 64 }).primaryKey(),
  ticketId: varchar("ticketId", { length: 64 }).notNull(),
  assignedTo: varchar("assignedTo", { length: 64 }).notNull(), // Employee user ID
  assignedBy: varchar("assignedBy", { length: 64 }), // Admin/System who assigned
  reason: text("reason"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type TicketAssignment = typeof ticketAssignments.$inferSelect;

/**
 * Support Metrics Table
 * Daily/weekly/monthly support performance metrics
 */
export const supportMetrics = mysqlTable("support_metrics", {
  id: varchar("id", { length: 64 }).primaryKey(),
  date: varchar("date", { length: 10 }).notNull(), // YYYY-MM-DD
  period: varchar("period", { length: 20 }).default("daily"), // daily, weekly, monthly
  
  // Ticket metrics
  totalTickets: int("totalTickets").default(0),
  openTickets: int("openTickets").default(0),
  resolvedTickets: int("resolvedTickets").default(0),
  closedTickets: int("closedTickets").default(0),
  
  // Response metrics
  avgFirstResponseTime: int("avgFirstResponseTime").default(0), // in minutes
  avgResolutionTime: int("avgResolutionTime").default(0), // in minutes
  
  // Escalation metrics
  escalatedToAdmin: int("escalatedToAdmin").default(0),
  escalatedToSuperAdmin: int("escalatedToSuperAdmin").default(0),
  
  // Auto-response metrics
  autoResponsesUsed: int("autoResponsesUsed").default(0),
  autoResponseSuccessRate: int("autoResponseSuccessRate").default(0), // percentage
  
  // Employee metrics
  employeeId: varchar("employeeId", { length: 64 }), // If tracking per-employee metrics
  ticketsHandled: int("ticketsHandled").default(0),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type SupportMetric = typeof supportMetrics.$inferSelect;


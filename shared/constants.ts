/**
 * EchoFort Shared Constants
 * Configuration values used across client and server
 */

export const SUBSCRIPTION_PLANS = {
  basic: {
    id: 'basic',
    name: 'Basic Protection',
    price: 399,
    currency: 'INR',
    features: [
      'Real-time call screening',
      'Trust Factor scoring (0-10)',
      'Scam database access',
      'Image scanning',
      'Basic support',
    ],
    limits: {
      members: 1,
      callRecording: false,
      dashboard: false,
      gps: false,
      screenTime: false,
    },
  },
  premium: {
    id: 'premium',
    name: 'Premium Plus',
    price: 799,
    currency: 'INR',
    features: [
      'All Basic features',
      'Call recording & playback',
      'Dashboard access',
      'Legal complaint assistance',
      'Priority support',
      'Evidence management',
    ],
    limits: {
      members: 1,
      callRecording: true,
      dashboard: true,
      gps: false,
      screenTime: false,
    },
  },
  family: {
    id: 'family',
    name: 'Family Pack',
    price: 1499,
    currency: 'INR',
    features: [
      'All Premium features',
      'Up to 3 family members',
      'GPS tracking & geofencing',
      'Screen time monitoring',
      'Child protection features',
      'Family management dashboard',
      'Addiction risk assessment',
      'Dedicated support',
    ],
    limits: {
      members: 3,
      callRecording: true,
      dashboard: true,
      gps: true,
      screenTime: true,
    },
  },
} as const;

export const SCAM_TYPES = [
  { value: 'loan', label: 'Loan Harassment' },
  { value: 'lottery', label: 'Lottery/Prize Scam' },
  { value: 'phishing', label: 'Phishing' },
  { value: 'investment', label: 'Investment Fraud' },
  { value: 'impersonation', label: 'Impersonation (Bank/Police)' },
  { value: 'job', label: 'Job Scam' },
  { value: 'romance', label: 'Romance Scam' },
  { value: 'tech_support', label: 'Tech Support Scam' },
  { value: 'other', label: 'Other' },
] as const;

export const TRUST_FACTOR_LABELS = {
  0: { label: 'Extreme Danger', color: 'text-red-600', bg: 'bg-red-100' },
  1: { label: 'Very High Risk', color: 'text-red-500', bg: 'bg-red-50' },
  2: { label: 'High Risk', color: 'text-orange-600', bg: 'bg-orange-100' },
  3: { label: 'Significant Risk', color: 'text-orange-500', bg: 'bg-orange-50' },
  4: { label: 'Moderate Risk', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  5: { label: 'Caution Advised', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  6: { label: 'Slightly Suspicious', color: 'text-blue-600', bg: 'bg-blue-100' },
  7: { label: 'Likely Safe', color: 'text-green-500', bg: 'bg-green-50' },
  8: { label: 'Safe', color: 'text-green-600', bg: 'bg-green-100' },
  9: { label: 'Very Safe', color: 'text-green-700', bg: 'bg-green-200' },
  10: { label: 'Completely Trusted', color: 'text-green-800', bg: 'bg-green-300' },
} as const;

export const EMPLOYEE_DEPARTMENTS = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'support', label: 'Customer Support' },
  { value: 'accounting', label: 'Accounting' },
  { value: 'operations', label: 'Operations' },
] as const;

export const USER_ROLES = [
  { value: 'user', label: 'User' },
  { value: 'employee', label: 'Employee' },
  { value: 'admin', label: 'Admin' },
  { value: 'super_admin', label: 'Super Admin' },
] as const;

export const PAYMENT_GATEWAYS = [
  { value: 'razorpay', label: 'Razorpay', logo: '/logos/razorpay.svg' },
  { value: 'stripe', label: 'Stripe', logo: '/logos/stripe.svg' },
  { value: 'paypal', label: 'PayPal', logo: '/logos/paypal.svg' },
] as const;

export const COMPLAINT_TYPES = [
  { value: 'financial_fraud', label: 'Financial Fraud' },
  { value: 'loan_harassment', label: 'Loan App Harassment' },
  { value: 'phishing', label: 'Phishing/Vishing' },
  { value: 'identity_theft', label: 'Identity Theft' },
  { value: 'cyberbullying', label: 'Cyberbullying' },
  { value: 'other', label: 'Other' },
] as const;

export const NOTIFICATION_TYPES = {
  info: { icon: 'ℹ️', color: 'blue' },
  warning: { icon: '⚠️', color: 'yellow' },
  alert: { icon: '🚨', color: 'red' },
  success: { icon: '✅', color: 'green' },
} as const;

export const APP_CONFIG = {
  name: 'EchoFort',
  tagline: "India's First AI-Powered Self-Evolving Scam Protection Platform",
  description: 'Protect yourself and your family from scams with AI-powered call screening, GPS tracking, and comprehensive child protection features.',
  supportEmail: 'support@echofort.ai',
  legalEmail: 'legal@echofort.ai',
  privacyEmail: 'privacy@echofort.ai',
  grievanceEmail: 'grievance@echofort.ai',
  helplineNumber: '1800-ECHOFORT',
  moneyBackGuarantee: 48, // hours
  trialPeriod: 7, // days
} as const;

export const FEATURE_HIGHLIGHTS = [
  {
    title: 'AI-Powered Call Screening',
    description: 'Real-time analysis of incoming calls with Trust Factor scoring (0-10) to identify potential scams before you answer.',
    icon: '🛡️',
  },
  {
    title: 'Scam Database',
    description: 'Access to constantly updated database of known scam numbers, patterns, and techniques reported across India.',
    icon: '📊',
  },
  {
    title: 'Call Recording & Evidence',
    description: 'Securely record and store suspicious calls as evidence for legal complaints and cybercrime reporting.',
    icon: '🎙️',
  },
  {
    title: 'GPS Tracking & Geofencing',
    description: 'Keep your family safe with real-time location tracking and instant alerts when members enter or leave safe zones.',
    icon: '📍',
  },
  {
    title: 'Child Protection',
    description: 'Monitor screen time, track app usage, and get addiction risk assessments to protect children from digital harm.',
    icon: '👨‍👩‍👧‍👦',
  },
  {
    title: 'Legal Assistance',
    description: 'Guided complaint filing with cybercrime authorities, automatic evidence attachment, and case tracking.',
    icon: '⚖️',
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'How does EchoFort detect scams?',
    answer: 'EchoFort uses advanced AI algorithms to analyze incoming calls in real-time. Our system checks the caller number against our constantly updated scam database, analyzes calling patterns, and uses machine learning to identify suspicious behavior. Each call receives a Trust Factor score from 0 (extreme danger) to 10 (completely trusted).',
  },
  {
    question: 'Is call recording legal in India?',
    answer: 'Call recording laws vary by state in India. In most cases, you are allowed to record calls for personal use and evidence purposes. However, we recommend informing the other party that the call is being recorded. EchoFort provides call recording features for Premium Plus and Family Pack subscribers, but users are responsible for complying with applicable laws.',
  },
  {
    question: 'What is the 48-hour money-back guarantee?',
    answer: 'If you are not satisfied with EchoFort for any reason, you can request a full refund within 48 hours of your first subscription payment. Simply contact our support team at support@echofort.ai, and we will process your refund within 7-10 business days.',
  },
  {
    question: 'How does GPS tracking work in the Family Pack?',
    answer: 'Family Pack subscribers can add up to 3 family members to their account. Once the EchoFort mobile app is installed on family members\' devices (with their consent), you can view their real-time location on a map, set up geofences (safe zones), and receive instant alerts when they enter or leave these zones.',
  },
  {
    question: 'Can I use EchoFort without the mobile app?',
    answer: 'The web dashboard provides access to your account settings, subscription management, scam database search, and analytics. However, core features like real-time call screening, call recording, GPS tracking, and screen time monitoring require the EchoFort mobile app to be installed on your Android or iOS device.',
  },
  {
    question: 'How is my data protected?',
    answer: 'EchoFort takes data security very seriously. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We comply with the Digital Personal Data Protection Act, 2023 and never sell your data to third parties. Call recordings are automatically deleted after 180 days, and GPS location history is retained for only 60 days.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major payment methods through our integrated payment gateways: credit/debit cards (Visa, Mastercard, RuPay), UPI, net banking, and digital wallets (Paytm, PhonePe, Google Pay). Payments are processed securely by Razorpay, Stripe, or PayPal.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time from your account settings. Upon cancellation, you will retain access to EchoFort until the end of your current billing period. No partial refunds are provided for unused time (except within the 48-hour guarantee period).',
  },
  {
    question: 'How do I file a cybercrime complaint?',
    answer: 'Premium Plus and Family Pack subscribers have access to our Legal Complaint Assistance feature. This provides a step-by-step guided process to file complaints with the National Cyber Crime Reporting Portal, automatically attaches evidence (call recordings, screenshots), and tracks the status of your complaint.',
  },
  {
    question: 'Is EchoFort available in all Indian states?',
    answer: 'Yes, EchoFort is available throughout India. Our scam database covers scam reports from all states and union territories. However, please note that call recording laws may vary by state, and users are responsible for complying with local regulations.',
  },
] as const;

export const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    location: 'Mumbai, Maharashtra',
    plan: 'Premium Plus',
    rating: 5,
    text: 'EchoFort saved me from a loan app scam that was harassing me daily. The Trust Factor scoring immediately flagged the calls, and I was able to record evidence for my cybercrime complaint. Highly recommended!',
    avatar: '/avatars/user1.jpg',
  },
  {
    name: 'Priya Sharma',
    location: 'Bangalore, Karnataka',
    plan: 'Family Pack',
    rating: 5,
    text: 'As a working mother, the Family Pack gives me peace of mind. I can track my kids\' location and monitor their screen time. The geofencing alerts are incredibly useful when they reach school or home.',
    avatar: '/avatars/user2.jpg',
  },
  {
    name: 'Amit Patel',
    location: 'Ahmedabad, Gujarat',
    plan: 'Basic Protection',
    rating: 4,
    text: 'The AI-powered call screening is impressive. It accurately identified several lottery scam calls that I would have otherwise answered. The scam database is comprehensive and constantly updated.',
    avatar: '/avatars/user3.jpg',
  },
] as const;

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/echofortai',
  linkedin: 'https://linkedin.com/company/echofort',
  facebook: 'https://facebook.com/echofortai',
  instagram: 'https://instagram.com/echofort.ai',
  youtube: 'https://youtube.com/@echofortai',
} as const;

export const LEGAL_RESOURCES = [
  {
    title: 'National Cyber Crime Reporting Portal',
    url: 'https://cybercrime.gov.in',
    description: 'Report cybercrime and track your complaint status',
  },
  {
    title: 'Consumer Helpline',
    phone: '1800-11-4000',
    description: 'National Consumer Helpline for grievances',
  },
  {
    title: 'Cyber Crime Helpline',
    phone: '1930',
    description: 'Report financial fraud and cyber crimes',
  },
] as const;


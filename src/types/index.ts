// ============================================
// YASS Gold & YASS Bullion — Type Definitions
// A product by YASS Group, Dubai
// ============================================

export interface UserProfile {
  fullName: string;
  mobile: string;
  countryCode?: string;
  email: string;
  avatar?: string;
  createdAt: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  emiratesId?: string;
}

export interface GoldHolding {
  totalGrams: number;
  totalInvested: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'sip' | 'redemption';
  date: string;
  goldGrams: number;
  amount: number;
  rate: number;
  status: 'completed' | 'pending' | 'failed' | 'processing';
  paymentMethod?: string;
  reference: string;
}

export interface SIPRecord {
  id: string;
  nickname: string;
  amount: number;
  frequency: 'weekly' | 'monthly' | 'quarterly';
  status: 'active' | 'paused' | 'cancelled';
  nextDate: string;
  startDate: string;
  paymentMethod: string;
  totalInstallments: number;
  completedInstallments: number;
  totalGoldAccumulated: number;
  totalAmountInvested: number;
}

export interface DeliveryOrder {
  id: string;
  productType: 'coin' | 'bar';
  weight: number;
  purity: string;
  goldRequired: number;
  makingCharges: number;
  deliveryCharges: number;
  totalCharges: number;
  address: DeliveryAddress;
  status: 'created' | 'processing' | 'dispatched' | 'delivered';
  createdAt: string;
  estimatedDelivery?: string;
  trackingId?: string;
}

export interface DeliveryAddress {
  recipientName: string;
  mobile: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
  deliveryOption?: 'home' | 'vault_pickup';
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  iban?: string;
  ifsc?: string;
  holderName: string;
  isPrimary: boolean;
}

export interface NotificationPreferences {
  priceAlerts: boolean;
  sipReminders: boolean;
  transactionUpdates: boolean;
  promotions: boolean;
}

export type Screen =
  | 'splash'
  | 'signup'
  | 'dashboard'
  | 'buy'
  | 'sell'
  | 'sip'
  | 'portfolio'
  | 'transactions'
  | 'delivery'
  | 'profile'
  | 'buyReview'
  | 'buySuccess'
  | 'sellReview'
  | 'sellSuccess'
  | 'sipReview'
  | 'sipSuccess'
  | 'sipManage'
  | 'deliveryAddress'
  | 'deliveryReview'
  | 'deliverySuccess'
  | 'deliveryTracking'
  | 'kyc'
  | 'bankAccounts'
  | 'notifications'
  | 'helpSupport'
  | 'aboutUs'
  | 'terms'
  | 'privacy'
  | 'transactionDetail'
  | 'goldPriceDetail'
  | 'settings';

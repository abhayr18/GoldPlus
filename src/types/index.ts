// ============================================
// YASS Gold & YASS Bullion — Production Fintech Type Definitions
// Inspired by Gullak & SafeGold (Dubai Market Edition)
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
  savingsStreakDays: number;
  freeGoldRewardsMg: number;
}

export interface GoldHolding {
  totalGrams: number;
  totalInvested: number;
  leasedGrams: number;
  yieldEarnedGrams: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'sip' | 'redemption' | 'lease' | 'gift';
  date: string;
  goldGrams: number;
  amount: number;
  rate: number;
  status: 'completed' | 'pending' | 'failed' | 'processing';
  paymentMethod?: string;
  reference: string;
  meta?: string;
}

export interface SIPRecord {
  id: string;
  nickname: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  status: 'active' | 'paused' | 'cancelled';
  nextDate: string;
  startDate: string;
  paymentMethod: string;
  totalInstallments: number;
  completedInstallments: number;
  totalGoldAccumulated: number;
  totalAmountInvested: number;
}

export interface GoldLease {
  id: string;
  grams: number;
  annualYieldPercent: number; // e.g. 5.2%
  startDate: string;
  durationMonths: number;
  accruedYieldGrams: number;
  status: 'active' | 'completed';
  jewelerPartner: string;
  bankGuaranteeRef: string;
}

export interface GiftRecord {
  id: string;
  recipientName: string;
  recipientMobile: string;
  goldGrams: number;
  amount: number;
  occasion: string;
  message?: string;
  date: string;
  status: 'sent' | 'claimed';
  greetingCardTheme: string;
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetGrams: number;
  currentGrams: number;
  targetDate: string;
  category: 'bullion' | 'wedding' | 'property' | 'hajj' | 'education' | 'custom';
  monthlyContributionAED: number;
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
  courier?: string;
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
  | 'lease'
  | 'gift'
  | 'goals'
  | 'vaultProof'
  | 'soukPartners'
  | 'transactionDetail'
  | 'goldPriceDetail'
  | 'settings';

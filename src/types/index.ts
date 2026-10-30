// ============================================
// OGold Wallet - Type Definitions
// The Precious Metals & Lifestyle Super App (Dubai, UAE)
// Dual-metal: 24K Gold & .999 Silver | OGold Mastercard
// ============================================

export type MetalType = 'gold' | 'silver';

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
  freeSilverRewardsMg: number;
  xpPoints: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum VIP';
  spinsAvailable: number;
  lastSpinTimestamp?: string;
}

export interface MetalHolding {
  totalGrams: number; // 24K Gold in grams
  silverGrams: number; // .999 Silver in grams
  totalInvested: number;
  leasedGrams: number; // Gold in Wakala yield pool
  leasedSilverGrams: number; // Silver in Wakala yield pool
  yieldEarnedGrams: number;
  yieldEarnedSilverGrams: number;
  transactions: Transaction[];
}

export interface OGoldCard {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
  isFrozen: boolean;
  isOnlineEnabled: boolean;
  isAtmEnabled: boolean;
  spendingLimitMonthly: number;
  spendingAsset: MetalType;
  physicalCardStatus: 'none' | 'ordered' | 'shipped' | 'active';
  appleWalletAdded: boolean;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'sip' | 'redemption' | 'lease' | 'gift' | 'card_spend' | 'spin_reward';
  metal: MetalType;
  date: string;
  goldGrams: number; // Metal grams (gold or silver)
  amount: number; // In AED
  rate: number;
  status: 'completed' | 'pending' | 'failed' | 'processing';
  paymentMethod?: string;
  reference: string;
  meta?: string;
}

export interface SIPRecord {
  id: string;
  nickname: string;
  metal: MetalType;
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  status: 'active' | 'paused' | 'cancelled';
  nextDate: string;
  startDate: string;
  paymentMethod: string;
  totalInstallments: number;
  completedInstallments: number;
  totalAccumulatedGrams: number;
  totalGoldAccumulated?: number;
  totalAmountInvested: number;
}

export interface WakalaDeposit {
  id: string;
  metal: MetalType;
  grams: number;
  aprYieldPercent: number; // e.g. 4.8% p.a.
  startDate: string;
  durationMonths: number;
  accruedYieldGrams: number;
  status: 'active' | 'completed';
  depositoryPartner: string;
  shariahCertRef: string;
}

export interface GiftRecord {
  id: string;
  metal: MetalType;
  recipientName: string;
  recipientMobile: string;
  grams: number;
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
  metal?: MetalType;
  targetGrams: number;
  currentGrams: number;
  targetDate: string;
  category: 'bullion' | 'wedding' | 'property' | 'hajj' | 'education' | 'custom';
  monthlyContributionAED: number;
}

export interface DeliveryOrder {
  id: string;
  metal: MetalType;
  productType: 'coin' | 'bar';
  weight: number;
  purity: string;
  metalRequired: number;
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
  holderName: string;
  isPrimary: boolean;
}

export interface NotificationPreferences {
  priceAlerts: boolean;
  sipReminders: boolean;
  transactionUpdates: boolean;
  promotions: boolean;
}

export interface LifestyleService {
  id: string;
  category: 'esim' | 'giftcard';
  title: string;
  provider: string;
  priceAED: number;
  goldEquivalentGrams: number;
  tag: string;
  image: string;
}

export type Screen =
  | 'splash'
  | 'signup'
  | 'dashboard'
  | 'card'
  | 'earn'
  | 'rewards'
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

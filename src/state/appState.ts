// ============================================
// YASS Gold & YASS Bullion — Application State Manager
// Manages all demo state with localStorage persistence
// A product by YASS Group, Dubai
// ============================================

import type {
  UserProfile,
  GoldHolding,
  Transaction,
  SIPRecord,
  DeliveryOrder,
  BankAccount,
  NotificationPreferences,
  Screen,
  GoldLease,
  GiftRecord,
  SavingsGoal,
} from '../types';
import { DEMO_USER, DEMO_INITIAL_HOLDINGS, INITIAL_TRANSACTIONS, DEMO_GOLD_RATE } from '../constants';

const STORAGE_KEY = 'yass_gold_fintech_state_v2';

export interface AppState {
  isLoggedIn: boolean;
  user: UserProfile | null;
  holdings: GoldHolding;
  sips: SIPRecord[];
  leases: GoldLease[];
  gifts: GiftRecord[];
  goals: SavingsGoal[];
  deliveryOrders: DeliveryOrder[];
  bankAccounts: BankAccount[];
  notificationPrefs: NotificationPreferences;
  currentScreen: Screen;
  screenHistory: Screen[];
  selectedTransaction: Transaction | null;
  selectedDeliveryOrder: DeliveryOrder | null;
}

function getDefaultState(): AppState {
  return {
    isLoggedIn: false,
    user: {
      fullName: DEMO_USER.fullName,
      mobile: DEMO_USER.mobile,
      countryCode: '+971',
      email: DEMO_USER.email,
      createdAt: new Date().toISOString(),
      kycStatus: 'verified',
      emiratesId: DEMO_USER.emiratesId,
      savingsStreakDays: DEMO_USER.savingsStreakDays,
      freeGoldRewardsMg: DEMO_USER.freeGoldRewardsMg,
    },
    holdings: {
      totalGrams: DEMO_INITIAL_HOLDINGS.totalGrams,
      totalInvested: DEMO_INITIAL_HOLDINGS.totalInvested,
      leasedGrams: DEMO_INITIAL_HOLDINGS.leasedGrams,
      yieldEarnedGrams: DEMO_INITIAL_HOLDINGS.yieldEarnedGrams,
      transactions: [...INITIAL_TRANSACTIONS],
    },
    sips: [
      {
        id: 'SIP-YASS-001',
        nickname: 'Daily Gold Micro-Savings',
        amount: 25,
        frequency: 'daily',
        status: 'active',
        nextDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        startDate: '2025-03-01',
        paymentMethod: 'Aani Direct Debit',
        totalInstallments: 60,
        completedInstallments: 28,
        totalGoldAccumulated: 2.1978,
        totalAmountInvested: 700,
      },
      {
        id: 'SIP-YASS-002',
        nickname: 'Monthly Bullion Accumulator',
        amount: 1000,
        frequency: 'monthly',
        status: 'active',
        nextDate: getNextSIPDate(),
        startDate: '2025-02-01',
        paymentMethod: 'Emirates NBD Auto-Debit',
        totalInstallments: 12,
        completedInstallments: 4,
        totalGoldAccumulated: 12.5584,
        totalAmountInvested: 4000,
      },
    ],
    leases: [
      {
        id: 'LEASE-YASS-001',
        grams: 10.0,
        annualYieldPercent: 5.2,
        startDate: '2025-03-15',
        durationMonths: 6,
        accruedYieldGrams: 0.13,
        status: 'active',
        jewelerPartner: 'Damas Jewellery Dubai',
        bankGuaranteeRef: 'BG-ENBD-2025-9921',
      },
    ],
    gifts: [
      {
        id: 'GIFT-YASS-001',
        recipientName: 'Fatima Al Mansoori',
        recipientMobile: '559876543',
        goldGrams: 1.0,
        amount: 318.5,
        occasion: 'Eid Mubarak',
        message: 'May this pure 24K gold bring prosperity and happiness!',
        date: '2025-04-10T11:00:00',
        status: 'claimed',
        greetingCardTheme: 'eid',
      },
    ],
    goals: [
      {
        id: 'GOAL-001',
        title: '100g Dubai Good Delivery Ingot',
        targetGrams: 100,
        currentGrams: 39.1209,
        targetDate: '2026-12-31',
        category: 'bullion',
        monthlyContributionAED: 1500,
      },
      {
        id: 'GOAL-002',
        title: 'Family Wedding Gold Set',
        targetGrams: 50,
        currentGrams: 15.0,
        targetDate: '2027-06-30',
        category: 'wedding',
        monthlyContributionAED: 1000,
      },
    ],
    deliveryOrders: [],
    bankAccounts: [
      {
        id: 'BA-001',
        bankName: 'Emirates NBD (Dubai)',
        accountNumber: '****9821',
        iban: 'AE290260000123456789012',
        holderName: 'Tariq Al Mansoori',
        isPrimary: true,
      },
      {
        id: 'BA-002',
        bankName: 'First Abu Dhabi Bank (FAB)',
        accountNumber: '****4412',
        iban: 'AE030330000987654321098',
        holderName: 'Tariq Al Mansoori',
        isPrimary: false,
      },
    ],
    notificationPrefs: {
      priceAlerts: true,
      sipReminders: true,
      transactionUpdates: true,
      promotions: false,
    },
    currentScreen: 'splash',
    screenHistory: [],
    selectedTransaction: null,
    selectedDeliveryOrder: null,
  };
}

function getNextSIPDate(): string {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 5);
  return next.toISOString().split('T')[0];
}

export function loadState(): AppState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...getDefaultState(), ...parsed };
    }
  } catch (e) {
    console.warn('Failed to load state from localStorage:', e);
  }
  return getDefaultState();
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save state to localStorage:', e);
  }
}

export function resetState(): AppState {
  localStorage.removeItem(STORAGE_KEY);
  return getDefaultState();
}

// ============================================
// State action helpers
// ============================================

export function generateTransactionId(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `TXN-YASS-${dateStr}-${rand}`;
}

export function generateSIPId(): string {
  return `SIP-YASS-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
}

export function generateDeliveryId(): string {
  return `DEL-YASS-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
}

export function buyGold(state: AppState, amount: number, paymentMethod: string): AppState {
  const rate = DEMO_GOLD_RATE;
  const grams = Math.round((amount / rate) * 10000) / 10000;

  const transaction: Transaction = {
    id: generateTransactionId(),
    type: 'buy',
    date: new Date().toISOString(),
    goldGrams: grams,
    amount: amount,
    rate: rate,
    status: 'completed',
    paymentMethod: paymentMethod,
    reference: generateTransactionId(),
    meta: '5-Minute Price Lock Purchase',
  };

  // Streak increment
  const streak = (state.user?.savingsStreakDays || 0) + 1;

  return {
    ...state,
    user: state.user ? { ...state.user, savingsStreakDays: streak } : null,
    holdings: {
      ...state.holdings,
      totalGrams: Math.round((state.holdings.totalGrams + grams) * 10000) / 10000,
      totalInvested: state.holdings.totalInvested + amount,
      transactions: [transaction, ...state.holdings.transactions],
    },
  };
}

export function sellGold(state: AppState, grams: number): AppState {
  const rate = DEMO_GOLD_RATE;
  const amount = Math.round(grams * rate * 100) / 100;

  const transaction: Transaction = {
    id: generateTransactionId(),
    type: 'sell',
    date: new Date().toISOString(),
    goldGrams: grams,
    amount: amount,
    rate: rate,
    status: 'completed',
    paymentMethod: 'Emirates NBD Transfer',
    reference: generateTransactionId(),
    meta: 'Instant Souk Price Withdrawal',
  };

  return {
    ...state,
    holdings: {
      ...state.holdings,
      totalGrams: Math.round((state.holdings.totalGrams - grams) * 10000) / 10000,
      totalInvested: state.holdings.totalInvested,
      transactions: [transaction, ...state.holdings.transactions],
    },
  };
}

export function createSIP(
  state: AppState,
  amount: number,
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly',
  paymentMethod: string,
  nickname: string
): AppState {
  const sip: SIPRecord = {
    id: generateSIPId(),
    nickname: nickname || `${frequency.charAt(0).toUpperCase() + frequency.slice(1)} YASS Gold SIP`,
    amount,
    frequency,
    status: 'active',
    nextDate: getNextSIPDate(),
    startDate: new Date().toISOString().split('T')[0],
    paymentMethod,
    totalInstallments: 0,
    completedInstallments: 0,
    totalGoldAccumulated: 0,
    totalAmountInvested: 0,
  };

  return {
    ...state,
    sips: [...state.sips, sip],
  };
}

export function updateSIPStatus(state: AppState, sipId: string, status: 'active' | 'paused' | 'cancelled'): AppState {
  return {
    ...state,
    sips: state.sips.map((sip) =>
      sip.id === sipId ? { ...sip, status } : sip
    ),
  };
}

export function leaseGoldAction(state: AppState, grams: number, partner: string): AppState {
  const newLease: GoldLease = {
    id: `LEASE-YASS-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    grams,
    annualYieldPercent: 5.2,
    startDate: new Date().toISOString().split('T')[0],
    durationMonths: 6,
    accruedYieldGrams: 0,
    status: 'active',
    jewelerPartner: partner,
    bankGuaranteeRef: `BG-ENBD-${Math.floor(Math.random() * 100000)}`,
  };

  const transaction: Transaction = {
    id: generateTransactionId(),
    type: 'lease',
    date: new Date().toISOString(),
    goldGrams: grams,
    amount: Math.round(grams * DEMO_GOLD_RATE),
    rate: DEMO_GOLD_RATE,
    status: 'completed',
    reference: newLease.id,
    meta: `Leased to ${partner} (5.2% p.a. extra gold yield)`,
  };

  return {
    ...state,
    holdings: {
      ...state.holdings,
      leasedGrams: Math.round((state.holdings.leasedGrams + grams) * 10000) / 10000,
      transactions: [transaction, ...state.holdings.transactions],
    },
    leases: [newLease, ...state.leases],
  };
}

export function sendGiftAction(
  state: AppState,
  recipientName: string,
  recipientMobile: string,
  grams: number,
  occasion: string,
  message: string,
  theme: string
): AppState {
  const amount = Math.round(grams * DEMO_GOLD_RATE * 100) / 100;
  const gift: GiftRecord = {
    id: `GIFT-YASS-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    recipientName,
    recipientMobile,
    goldGrams: grams,
    amount,
    occasion,
    message,
    date: new Date().toISOString(),
    status: 'sent',
    greetingCardTheme: theme,
  };

  const transaction: Transaction = {
    id: generateTransactionId(),
    type: 'gift',
    date: new Date().toISOString(),
    goldGrams: grams,
    amount,
    rate: DEMO_GOLD_RATE,
    status: 'completed',
    reference: gift.id,
    meta: `Gifted to ${recipientName} (${occasion})`,
  };

  return {
    ...state,
    holdings: {
      ...state.holdings,
      totalGrams: Math.round((state.holdings.totalGrams - grams) * 10000) / 10000,
      transactions: [transaction, ...state.holdings.transactions],
    },
    gifts: [gift, ...state.gifts],
  };
}

export function createDeliveryOrder(
  state: AppState,
  productType: 'coin' | 'bar',
  weight: number,
  purity: string,
  makingCharges: number,
  deliveryCharges: number,
  address: import('../types').DeliveryAddress
): AppState {
  const goldRequired = weight;
  const order: DeliveryOrder = {
    id: generateDeliveryId(),
    productType,
    weight,
    purity,
    goldRequired,
    makingCharges,
    deliveryCharges,
    totalCharges: makingCharges + deliveryCharges,
    address,
    status: 'created',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    courier: 'Transguard Armoured Bullion Logistics',
  };

  const newGrams = Math.round((state.holdings.totalGrams - goldRequired) * 10000) / 10000;

  const transaction: Transaction = {
    id: generateTransactionId(),
    type: 'redemption',
    date: new Date().toISOString(),
    goldGrams: goldRequired,
    amount: Math.round(goldRequired * DEMO_GOLD_RATE),
    rate: DEMO_GOLD_RATE,
    status: 'completed',
    reference: order.id,
    meta: `${weight}g 24K ${purity} Minted Bullion`,
  };

  return {
    ...state,
    holdings: {
      ...state.holdings,
      totalGrams: newGrams,
      transactions: [transaction, ...state.holdings.transactions],
    },
    deliveryOrders: [order, ...state.deliveryOrders],
  };
}

export function loginUser(state: AppState, fullName: string, mobile: string, email: string): AppState {
  const user: UserProfile = {
    fullName: fullName || DEMO_USER.fullName,
    mobile: mobile || DEMO_USER.mobile,
    countryCode: '+971',
    email: email || DEMO_USER.email,
    createdAt: new Date().toISOString(),
    kycStatus: 'verified',
    emiratesId: DEMO_USER.emiratesId,
    savingsStreakDays: 5,
    freeGoldRewardsMg: 25,
  };

  return {
    ...state,
    isLoggedIn: true,
    user,
  };
}

export function logoutUser(state: AppState): AppState {
  return {
    ...state,
    isLoggedIn: false,
    currentScreen: 'splash',
    screenHistory: [],
  };
}

// Navigation helpers
export function navigateTo(state: AppState, screen: Screen): AppState {
  return {
    ...state,
    screenHistory: [...state.screenHistory, state.currentScreen],
    currentScreen: screen,
  };
}

export function goBack(state: AppState): AppState {
  const history = [...state.screenHistory];
  const prev = history.pop() || 'dashboard';
  return {
    ...state,
    screenHistory: history,
    currentScreen: prev,
  };
}

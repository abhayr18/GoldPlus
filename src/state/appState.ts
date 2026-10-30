// ============================================
// GoldPlus — Application State Manager
// Manages all demo state with localStorage persistence
// ============================================

import type { UserProfile, GoldHolding, Transaction, SIPRecord, DeliveryOrder, BankAccount, NotificationPreferences, Screen } from '../types';
import { DEMO_USER, DEMO_INITIAL_HOLDINGS, INITIAL_TRANSACTIONS, DEMO_GOLD_RATE } from '../constants';

const STORAGE_KEY = 'goldplus_demo_state';

export interface AppState {
  isLoggedIn: boolean;
  user: UserProfile | null;
  holdings: GoldHolding;
  sips: SIPRecord[];
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
    user: null,
    holdings: {
      totalGrams: DEMO_INITIAL_HOLDINGS.totalGrams,
      totalInvested: DEMO_INITIAL_HOLDINGS.totalInvested,
      transactions: [...INITIAL_TRANSACTIONS],
    },
    sips: [
      {
        id: 'SIP-GP-001',
        nickname: 'Monthly Gold',
        amount: 1000,
        frequency: 'monthly',
        status: 'active',
        nextDate: getNextSIPDate(),
        startDate: '2025-03-01',
        paymentMethod: 'UPI',
        totalInstallments: 12,
        completedInstallments: 3,
        totalGoldAccumulated: 0.1000 * 3,
        totalAmountInvested: 750 * 3,
      },
    ],
    deliveryOrders: [],
    bankAccounts: [
      {
        id: 'BA-001',
        bankName: 'HDFC Bank',
        accountNumber: '****6789',
        ifsc: 'HDFC0001234',
        holderName: 'Rahul Sharma',
        isPrimary: true,
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
      // Ensure all fields exist (for forward compatibility)
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
  return `TXN-GP-${dateStr}-${rand}`;
}

export function generateSIPId(): string {
  return `SIP-GP-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
}

export function generateDeliveryId(): string {
  return `DEL-GP-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
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
  };

  return {
    ...state,
    holdings: {
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
    paymentMethod: 'Bank Account',
    reference: generateTransactionId(),
  };

  return {
    ...state,
    holdings: {
      totalGrams: Math.round((state.holdings.totalGrams - grams) * 10000) / 10000,
      totalInvested: state.holdings.totalInvested,
      transactions: [transaction, ...state.holdings.transactions],
    },
  };
}

export function createSIP(
  state: AppState,
  amount: number,
  frequency: 'weekly' | 'monthly' | 'quarterly',
  paymentMethod: string,
  nickname: string
): AppState {
  const sip: SIPRecord = {
    id: generateSIPId(),
    nickname: nickname || `${frequency.charAt(0).toUpperCase() + frequency.slice(1)} Gold SIP`,
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
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  };

  // Deduct gold from holdings
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
    email: email || DEMO_USER.email,
    createdAt: new Date().toISOString(),
    kycStatus: 'verified',
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


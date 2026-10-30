// ============================================
// OGold Wallet — Application State Manager
// The Precious Metals & Lifestyle Super App (Dubai, UAE)
// Manages Gold & Silver balances, OGold Mastercard,
// Wakala Yield, SIP, Spin & Win, and Bullion Delivery
// ============================================

import type {
  UserProfile,
  MetalHolding,
  OGoldCard,
  Transaction,
  SIPRecord,
  DeliveryOrder,
  BankAccount,
  NotificationPreferences,
  Screen,
  WakalaDeposit,
  GiftRecord,
  SavingsGoal,
  MetalType,
} from '../types';
import {
  DEMO_USER,
  DEMO_INITIAL_HOLDINGS,
  DEMO_OGOLD_CARD,
  INITIAL_TRANSACTIONS,
  DEMO_GOLD_RATE,
  DEMO_SILVER_RATE,
} from '../constants';

const STORAGE_KEY = 'ogold_wallet_app_state_v3';

export interface AppState {
  isLoggedIn: boolean;
  user: UserProfile | null;
  holdings: MetalHolding;
  card: OGoldCard;
  sips: SIPRecord[];
  leases: WakalaDeposit[];
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
      freeSilverRewardsMg: DEMO_USER.freeSilverRewardsMg,
      xpPoints: DEMO_USER.xpPoints,
      tier: DEMO_USER.tier,
      spinsAvailable: DEMO_USER.spinsAvailable,
    },
    holdings: {
      totalGrams: DEMO_INITIAL_HOLDINGS.totalGrams,
      silverGrams: DEMO_INITIAL_HOLDINGS.silverGrams,
      totalInvested: DEMO_INITIAL_HOLDINGS.totalInvested,
      leasedGrams: DEMO_INITIAL_HOLDINGS.leasedGrams,
      leasedSilverGrams: DEMO_INITIAL_HOLDINGS.leasedSilverGrams,
      yieldEarnedGrams: DEMO_INITIAL_HOLDINGS.yieldEarnedGrams,
      yieldEarnedSilverGrams: DEMO_INITIAL_HOLDINGS.yieldEarnedSilverGrams,
      transactions: [...INITIAL_TRANSACTIONS],
    },
    card: { ...DEMO_OGOLD_CARD },
    sips: [
      {
        id: 'SIP-OGOLD-001',
        nickname: 'Daily Gold Micro-Savings',
        metal: 'gold',
        amount: 25,
        frequency: 'daily',
        status: 'active',
        nextDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        startDate: '2025-03-01',
        paymentMethod: 'Aani Direct Debit',
        totalInstallments: 60,
        completedInstallments: 28,
        totalAccumulatedGrams: 2.1978,
        totalAmountInvested: 700,
      },
      {
        id: 'SIP-OGOLD-002',
        nickname: 'Pure Silver Bullion Stack',
        metal: 'silver',
        amount: 150,
        frequency: 'weekly',
        status: 'active',
        nextDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        startDate: '2025-03-10',
        paymentMethod: 'OGold Card Auto-Debit',
        totalInstallments: 20,
        completedInstallments: 8,
        totalAccumulatedGrams: 311.68,
        totalAmountInvested: 1200,
      },
    ],
    leases: [
      {
        id: 'WAKALA-OGOLD-001',
        metal: 'gold',
        grams: 10.0,
        aprYieldPercent: 4.8,
        startDate: '2025-03-15',
        durationMonths: 6,
        accruedYieldGrams: 0.13,
        status: 'active',
        depositoryPartner: 'DMCC Insured Depository',
        shariahCertRef: 'SHAR-OGOLD-2025-091',
      },
    ],
    gifts: [
      {
        id: 'GIFT-OGOLD-001',
        metal: 'gold',
        recipientName: 'Fatima Al Mansoori',
        recipientMobile: '559876543',
        grams: 1.0,
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
        title: '100g 24K Dubai Bullion Ingot',
        metal: 'gold',
        targetGrams: 100,
        currentGrams: 39.1209,
        targetDate: '2026-12-31',
        category: 'bullion',
        monthlyContributionAED: 1500,
      },
      {
        id: 'GOAL-002',
        title: '1 Kilogram .999 Silver Cast Bar',
        metal: 'silver',
        targetGrams: 1000,
        currentGrams: 425.5,
        targetDate: '2026-08-31',
        category: 'bullion',
        monthlyContributionAED: 500,
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
  return `TXN-OGOLD-${dateStr}-${rand}`;
}

export function generateSIPId(): string {
  return `SIP-OGOLD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
}

export function generateDeliveryId(): string {
  return `DEL-OGOLD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
}

// Universal Buy Metal (Gold or Silver)
export function buyMetalAction(
  state: AppState,
  metal: MetalType,
  amountAED: number,
  paymentMethod: string
): AppState {
  const rate = metal === 'gold' ? DEMO_GOLD_RATE : DEMO_SILVER_RATE;
  const grams = Math.round((amountAED / rate) * 10000) / 10000;

  const transaction: Transaction = {
    id: generateTransactionId(),
    type: 'buy',
    metal,
    date: new Date().toISOString(),
    goldGrams: grams,
    amount: amountAED,
    rate,
    status: 'completed',
    paymentMethod,
    reference: generateTransactionId(),
    meta: `Purchased ${grams}g ${metal === 'gold' ? '24K Gold' : '.999 Silver'}`,
  };

  const streak = (state.user?.savingsStreakDays || 0) + 1;
  const xpEarned = Math.round(amountAED * 2);

  const updatedUser = state.user
    ? {
        ...state.user,
        savingsStreakDays: streak,
        xpPoints: (state.user.xpPoints || 0) + xpEarned,
      }
    : null;

  const newTotalGrams =
    metal === 'gold'
      ? Math.round((state.holdings.totalGrams + grams) * 10000) / 10000
      : state.holdings.totalGrams;

  const newSilverGrams =
    metal === 'silver'
      ? Math.round((state.holdings.silverGrams + grams) * 10000) / 10000
      : state.holdings.silverGrams;

  return {
    ...state,
    user: updatedUser,
    holdings: {
      ...state.holdings,
      totalGrams: newTotalGrams,
      silverGrams: newSilverGrams,
      totalInvested: state.holdings.totalInvested + amountAED,
      transactions: [transaction, ...state.holdings.transactions],
    },
  };
}

// Universal Sell Metal
export function sellMetalAction(
  state: AppState,
  metal: MetalType,
  grams: number,
  payoutMethod: string
): AppState {
  const rate = metal === 'gold' ? DEMO_GOLD_RATE : DEMO_SILVER_RATE;
  const amountAED = Math.round(grams * rate * 100) / 100;

  const transaction: Transaction = {
    id: generateTransactionId(),
    type: 'sell',
    metal,
    date: new Date().toISOString(),
    goldGrams: grams,
    amount: amountAED,
    rate,
    status: 'completed',
    paymentMethod: payoutMethod || 'Emirates NBD Transfer',
    reference: generateTransactionId(),
    meta: `Sold ${grams}g ${metal === 'gold' ? '24K Gold' : '.999 Silver'} at Spot Rate`,
  };

  const newTotalGrams =
    metal === 'gold'
      ? Math.max(0, Math.round((state.holdings.totalGrams - grams) * 10000) / 10000)
      : state.holdings.totalGrams;

  const newSilverGrams =
    metal === 'silver'
      ? Math.max(0, Math.round((state.holdings.silverGrams - grams) * 10000) / 10000)
      : state.holdings.silverGrams;

  return {
    ...state,
    holdings: {
      ...state.holdings,
      totalGrams: newTotalGrams,
      silverGrams: newSilverGrams,
      transactions: [transaction, ...state.holdings.transactions],
    },
  };
}

// Backwards compatibility wrappers
export function buyGold(state: AppState, amount: number, paymentMethod: string): AppState {
  return buyMetalAction(state, 'gold', amount, paymentMethod);
}

export function sellGold(state: AppState, grams: number): AppState {
  return sellMetalAction(state, 'gold', grams, 'Emirates NBD Transfer');
}

// OGold Mastercard Actions
export function spendWithCardAction(
  state: AppState,
  amountAED: number,
  merchantName: string
): AppState {
  const metal = state.card.spendingAsset;
  const rate = metal === 'gold' ? DEMO_GOLD_RATE : DEMO_SILVER_RATE;
  const metalGrams = Math.round((amountAED / rate) * 10000) / 10000;

  const transaction: Transaction = {
    id: generateTransactionId(),
    type: 'card_spend',
    metal,
    date: new Date().toISOString(),
    goldGrams: metalGrams,
    amount: amountAED,
    rate,
    status: 'completed',
    paymentMethod: 'OGold Platinum Mastercard',
    reference: `POS-${merchantName.toUpperCase().replace(/\s+/g, '-')}`,
    meta: `Real-time liquidation of ${metalGrams}g ${metal} for ${merchantName}`,
  };

  const newTotalGrams =
    metal === 'gold'
      ? Math.max(0, Math.round((state.holdings.totalGrams - metalGrams) * 10000) / 10000)
      : state.holdings.totalGrams;

  const newSilverGrams =
    metal === 'silver'
      ? Math.max(0, Math.round((state.holdings.silverGrams - metalGrams) * 10000) / 10000)
      : state.holdings.silverGrams;

  return {
    ...state,
    holdings: {
      ...state.holdings,
      totalGrams: newTotalGrams,
      silverGrams: newSilverGrams,
      transactions: [transaction, ...state.holdings.transactions],
    },
  };
}

export function toggleCardFreeze(state: AppState): AppState {
  return {
    ...state,
    card: {
      ...state.card,
      isFrozen: !state.card.isFrozen,
    },
  };
}

export function toggleCardOnline(state: AppState): AppState {
  return {
    ...state,
    card: {
      ...state.card,
      isOnlineEnabled: !state.card.isOnlineEnabled,
    },
  };
}

export function setCardSpendingLimit(state: AppState, limit: number): AppState {
  return {
    ...state,
    card: {
      ...state.card,
      spendingLimitMonthly: limit,
    },
  };
}

export function switchCardAsset(state: AppState, asset: MetalType): AppState {
  return {
    ...state,
    card: {
      ...state.card,
      spendingAsset: asset,
    },
  };
}

export function addCardToAppleWallet(state: AppState): AppState {
  return {
    ...state,
    card: {
      ...state.card,
      appleWalletAdded: true,
    },
  };
}

export function orderPhysicalCard(state: AppState): AppState {
  return {
    ...state,
    card: {
      ...state.card,
      physicalCardStatus: 'ordered',
    },
  };
}

// Daily Spin & Win Game
export function spinWheelAction(state: AppState, rewardType: 'gold' | 'silver' | 'xp', value: number): AppState {
  if ((state.user?.spinsAvailable || 0) <= 0) return state;

  let addedGoldGrams = 0;
  let addedSilverGrams = 0;
  let addedXP = 0;

  if (rewardType === 'gold') {
    addedGoldGrams = value / 1000; // mg to g
  } else if (rewardType === 'silver') {
    addedSilverGrams = value / 1000;
  } else {
    addedXP = value;
  }

  const transaction: Transaction = {
    id: generateTransactionId(),
    type: 'spin_reward',
    metal: rewardType === 'silver' ? 'silver' : 'gold',
    date: new Date().toISOString(),
    goldGrams: addedGoldGrams || addedSilverGrams,
    amount: Math.round((addedGoldGrams * DEMO_GOLD_RATE || addedSilverGrams * DEMO_SILVER_RATE) * 100) / 100,
    rate: rewardType === 'silver' ? DEMO_SILVER_RATE : DEMO_GOLD_RATE,
    status: 'completed',
    paymentMethod: 'Daily Spin & Win Wheel',
    reference: `SPIN-${Date.now()}`,
    meta: `Won ${value}${rewardType === 'xp' ? ' XP' : `mg ${rewardType}`}`,
  };

  const updatedUser: UserProfile = {
    ...state.user!,
    spinsAvailable: 0,
    lastSpinTimestamp: new Date().toISOString(),
    freeGoldRewardsMg: (state.user?.freeGoldRewardsMg || 0) + (rewardType === 'gold' ? value : 0),
    freeSilverRewardsMg: (state.user?.freeSilverRewardsMg || 0) + (rewardType === 'silver' ? value : 0),
    xpPoints: (state.user?.xpPoints || 0) + addedXP,
  };

  return {
    ...state,
    user: updatedUser,
    holdings: {
      ...state.holdings,
      totalGrams: Math.round((state.holdings.totalGrams + addedGoldGrams) * 10000) / 10000,
      silverGrams: Math.round((state.holdings.silverGrams + addedSilverGrams) * 10000) / 10000,
      transactions: [transaction, ...state.holdings.transactions],
    },
  };
}

export function createSIP(
  state: AppState,
  amount: number,
  frequency: 'daily' | 'weekly' | 'monthly',
  paymentMethod: string,
  nickname: string,
  metal: MetalType = 'gold'
): AppState {
  const sip: SIPRecord = {
    id: generateSIPId(),
    nickname: nickname || `${frequency.charAt(0).toUpperCase() + frequency.slice(1)} ${metal.toUpperCase()} SIP`,
    metal,
    amount,
    frequency,
    status: 'active',
    nextDate: getNextSIPDate(),
    startDate: new Date().toISOString().split('T')[0],
    paymentMethod,
    totalInstallments: 0,
    completedInstallments: 0,
    totalAccumulatedGrams: 0,
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
  const newLease: WakalaDeposit = {
    id: `WAKALA-OGOLD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    metal: 'gold',
    grams,
    aprYieldPercent: 4.8,
    startDate: new Date().toISOString().split('T')[0],
    durationMonths: 6,
    accruedYieldGrams: 0,
    status: 'active',
    depositoryPartner: partner,
    shariahCertRef: `SHAR-OGOLD-${Math.floor(Math.random() * 100000)}`,
  };

  const transaction: Transaction = {
    id: generateTransactionId(),
    type: 'lease',
    metal: 'gold',
    date: new Date().toISOString(),
    goldGrams: grams,
    amount: Math.round(grams * DEMO_GOLD_RATE),
    rate: DEMO_GOLD_RATE,
    status: 'completed',
    reference: newLease.id,
    meta: `Deposited into ${partner} (4.8% APR Wakala Yield)`,
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
    id: `GIFT-OGOLD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    metal: 'gold',
    recipientName,
    recipientMobile,
    grams,
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
    metal: 'gold',
    date: new Date().toISOString(),
    goldGrams: grams,
    amount,
    rate: DEMO_GOLD_RATE,
    status: 'completed',
    reference: gift.id,
    meta: `Gifted 24K Gold to ${recipientName} (${occasion})`,
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
  address: import('../types').DeliveryAddress,
  metal: MetalType = 'gold'
): AppState {
  const rate = metal === 'gold' ? DEMO_GOLD_RATE : DEMO_SILVER_RATE;
  const order: DeliveryOrder = {
    id: generateDeliveryId(),
    metal,
    productType,
    weight,
    purity,
    metalRequired: weight,
    makingCharges,
    deliveryCharges,
    totalCharges: makingCharges + deliveryCharges,
    address,
    status: 'created',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    courier: 'Transguard Armoured Bullion Courier',
  };

  const newTotalGrams =
    metal === 'gold'
      ? Math.max(0, Math.round((state.holdings.totalGrams - weight) * 10000) / 10000)
      : state.holdings.totalGrams;

  const newSilverGrams =
    metal === 'silver'
      ? Math.max(0, Math.round((state.holdings.silverGrams - weight) * 10000) / 10000)
      : state.holdings.silverGrams;

  const transaction: Transaction = {
    id: generateTransactionId(),
    type: 'redemption',
    metal,
    date: new Date().toISOString(),
    goldGrams: weight,
    amount: Math.round(weight * rate),
    rate,
    status: 'completed',
    reference: order.id,
    meta: `${weight}g ${purity} Minted Bullion Delivery`,
  };

  return {
    ...state,
    holdings: {
      ...state.holdings,
      totalGrams: newTotalGrams,
      silverGrams: newSilverGrams,
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
    savingsStreakDays: 6,
    freeGoldRewardsMg: 35,
    freeSilverRewardsMg: 150,
    xpPoints: 2450,
    tier: 'Gold',
    spinsAvailable: 1,
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

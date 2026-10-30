// ============================================
// YASS Gold & Bullion - Design Tokens & Constants
// A product by YASS Group, Dubai
// DMCC Accredited Precious Metals Depository
// White + Gold Clean Executive Theme
// ============================================

import type { OGoldCard, LifestyleService } from '../types';

export const BRAND = {
  parentCompany: 'YASS Group Dubai',
  name: 'YASS Gold',
  bullionBrand: 'YASS Bullion',
  descriptor: 'Dubai Digital Gold & Doorstep Physical Bullion Delivery',
  tagline: 'The Gold Standard of Dubai. Save, Trade & Receive Bullion.',
  heading: 'Buy 24K Digital Gold. Receive Minted Bullion at Your Doorstep.',
  subheading: '100% physically backed 24K 999.9 gold vaulted at Brink’s DMCC with tamper-proof assay delivery across the UAE.',
  attribution: 'A product by YASS Group, Dubai • DMCC Member Depository',
  headquarters: 'Almas Tower, JLT & Gold Souk, Deira, Dubai, UAE',
  certification: 'Dubai Good Delivery (DGD) 999.9 Purity • BDO Dubai Audited',
  currency: 'AED',
  currencySymbol: 'AED ',
} as const;

export const COLORS = {
  // White + Golden Clean Executive Palette
  bgApp: '#FFFFFF',
  bgPage: '#F8FAFC',
  bgSubtle: '#F9FAFB',
  cardBg: '#FFFFFF',
  ivoryBg: '#FFFFFF',
  bgInput: '#FFFFFF',

  // Dubai Executive Bullion Gold
  primaryGold: '#C59B27',
  secondaryGold: '#D4AF37',
  goldDark: '#A67C1E',
  goldSurface: '#FEFBF2',
  goldBorder: '#EED8A1',
  goldGradient: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
  goldCardGradient: 'linear-gradient(135deg, #FFFDF7 0%, #FEFBF0 100%)',

  // High-legibility neutrals
  darkCharcoal: '#0F172A',
  deepNavy: '#0F172A',
  mainText: '#0F172A',
  secondaryText: '#64748B',
  mutedText: '#94A3B8',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',

  // Functional Status
  positive: '#059669',
  positiveBg: '#ECFDF5',
  negative: '#DC2626',
  negativeBg: '#FEF2F2',
  streakOrange: '#EA580C',
  streakBg: '#FFF7ED',
  yieldPurple: '#6366F1',
  yieldBg: '#EEF2FF',
} as const;

// Live Dubai Gold Souk & DMCC Spot Benchmark Rates (AED per gram)
export const DUBAI_MARKET_RATES = {
  rate24K: 318.50,
  rate22K: 295.20,
  rate21K: 281.80,
  rate18K: 241.50,
  rateSilver999: 3.85,
  dailyChangeGold: '+0.75%',
  dailyChangeSilver: '+1.20%',
  marketStatus: 'Open (Live Souk Rate)',
};

export const DEMO_GOLD_RATE = DUBAI_MARKET_RATES.rate24K; // AED 318.50 per gram
export const DEMO_SILVER_RATE = DUBAI_MARKET_RATES.rateSilver999;

export const DEMO_USER = {
  fullName: 'Tariq Al Mansoori',
  mobile: '501234567',
  countryCode: '+971',
  email: 'tariq.mansoori@yassgroup.ae',
  kycStatus: 'verified' as const,
  emiratesId: '784-1988-1234567-1',
  savingsStreakDays: 6,
  freeGoldRewardsMg: 35,
  freeSilverRewardsMg: 150,
  xpPoints: 2450,
  tier: 'Gold' as const,
  spinsAvailable: 1,
};

export const DEMO_INITIAL_HOLDINGS = {
  totalGrams: 39.1209, // ~AED 12,460.00
  silverGrams: 425.5000,
  totalInvested: 11500,
  leasedGrams: 10.0000,
  leasedSilverGrams: 100.0000,
  yieldEarnedGrams: 0.1300,
  yieldEarnedSilverGrams: 2.1500,
};

// Depository Custody & Independent Audit
export const YASS_VAULT_AUDIT = {
  auditor: 'BDO Chartered Accountants (Dubai)',
  auditDate: '30 October 2026',
  vaultLocation: 'Brink’s Global Services, Almas Tower, JLT Dubai',
  secondaryVault: 'Transguard Vaults, Emirates Group HQ Dubai',
  totalPhysicalBarsKg: 2540.85,
  digitalGoldIssuedKg: 2540.85,
  backingRatio: '100.0% Physical Bullion Custody',
  assayCertificateId: 'DMCC-DGD-2026-9999-AU',
};

export const OGOLD_VAULT_AUDIT = YASS_VAULT_AUDIT;

// Doorstep Physical Bullion Delivery Catalog (24K 999.9 Certified Assay)
export const DELIVERY_PRODUCTS = {
  coins: [
    { weight: 1, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'coin' as const, makingCharges: 35, deliveryCharges: 25 },
    { weight: 5, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'coin' as const, makingCharges: 65, deliveryCharges: 25 },
    { weight: 10, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'coin' as const, makingCharges: 110, deliveryCharges: 30 },
    { weight: 20, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'coin' as const, makingCharges: 180, deliveryCharges: 35 },
    { weight: 50, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'coin' as const, makingCharges: 350, deliveryCharges: 50 },
  ],
  bars: [
    { weight: 1, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'bar' as const, makingCharges: 30, deliveryCharges: 25 },
    { weight: 5, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'bar' as const, makingCharges: 55, deliveryCharges: 25 },
    { weight: 10, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'bar' as const, makingCharges: 95, deliveryCharges: 30 },
    { weight: 20, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'bar' as const, makingCharges: 160, deliveryCharges: 35 },
    { weight: 50, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'bar' as const, makingCharges: 300, deliveryCharges: 50 },
    { weight: 100, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'bar' as const, makingCharges: 550, deliveryCharges: 60 },
    { weight: 1000, metal: 'gold' as const, purity: '24K (999.9 Fine 1kg Bar)', type: 'bar' as const, makingCharges: 1500, deliveryCharges: 100 },
  ],
};

export const INITIAL_TRANSACTIONS = [
  {
    id: 'TXN-YASS-20250410-001',
    type: 'buy' as const,
    metal: 'gold' as const,
    date: '2025-04-10T10:30:00',
    goldGrams: 5.0000,
    amount: 1592.50,
    rate: 318.50,
    status: 'completed' as const,
    paymentMethod: 'Apple Pay (Emirates NBD)',
    reference: 'YASS-AU-88912',
    meta: 'Direct Purchase 24K 999.9',
  },
  {
    id: 'TXN-YASS-20250414-002',
    type: 'redemption' as const,
    metal: 'gold' as const,
    date: '2025-04-14T14:30:00',
    goldGrams: 10.0000,
    amount: 3185.00,
    rate: 318.50,
    status: 'completed' as const,
    paymentMethod: 'Physical Bullion Redemption',
    reference: 'DEL-YASS-7891',
    meta: '10g 24K Minted Gold Bar Dispatched',
  },
  {
    id: 'TXN-YASS-20250418-003',
    type: 'buy' as const,
    metal: 'gold' as const,
    date: '2025-04-18T12:15:00',
    goldGrams: 3.1400,
    amount: 1000.00,
    rate: 318.50,
    status: 'completed' as const,
    paymentMethod: 'Aani Instant Pay',
    reference: 'YASS-AU-23190',
    meta: '24K Gold Vault Accumulation',
  },
];

export const DEMO_OGOLD_CARD: OGoldCard = {
  cardNumber: '5412 8899 3421 9081',
  cardHolder: 'TARIQ AL MANSOORI',
  expiry: '09/29',
  cvv: '882',
  isFrozen: false,
  isOnlineEnabled: true,
  isAtmEnabled: true,
  spendingLimitMonthly: 25000,
  spendingAsset: 'gold',
  physicalCardStatus: 'shipped',
  appleWalletAdded: true,
};

export const OGOLD_WAKALA_POOLS = [
  {
    id: 'pool-brinks-30',
    name: "Brink's 30-Day Liquidity Pool",
    metal: 'gold' as const,
    tenure: '30 Days',
    insurance: "100% Brink's DMCC Insured",
    annualYield: '4.8% APR',
  },
  {
    id: 'pool-emirates-90',
    name: 'Emirates Gold 90-Day Yield Pool',
    metal: 'gold' as const,
    tenure: '90 Days',
    insurance: '100% Vault Insured',
    annualYield: '5.2% APR',
  },
  {
    id: 'pool-silver-60',
    name: 'Dubai Souk Silver Reserve Pool',
    metal: 'silver' as const,
    tenure: '60 Days',
    insurance: 'Transguard Protected',
    annualYield: '5.5% APR',
  },
];

export const LIFESTYLE_SERVICES: LifestyleService[] = [
  {
    id: 'esim-uae-gcc',
    category: 'esim',
    title: 'GCC Regional 10GB Data eSIM',
    provider: 'Breeze eSIM / e& (Etisalat)',
    priceAED: 95.0,
    goldEquivalentGrams: 0.298,
    tag: 'GCC ROAMING',
    image: '',
  },
  {
    id: 'esim-europe-usa',
    category: 'esim',
    title: 'Global Traveler 20GB Unlimited',
    provider: 'Airalo Global / Du',
    priceAED: 180.0,
    goldEquivalentGrams: 0.565,
    tag: 'GLOBAL 120+ COUNTRIES',
    image: '',
  },
  {
    id: 'gift-noon',
    category: 'giftcard',
    title: 'Noon UAE AED 250 Shopping Card',
    provider: 'Noon E-Commerce',
    priceAED: 250.0,
    goldEquivalentGrams: 0.785,
    tag: 'INSTANT E-CODE',
    image: '',
  },
  {
    id: 'gift-amazon-ae',
    category: 'giftcard',
    title: 'Amazon.ae AED 500 Gift Card',
    provider: 'Amazon UAE',
    priceAED: 500.0,
    goldEquivalentGrams: 1.570,
    tag: 'DIGITAL DELIVERY',
    image: '',
  },
];

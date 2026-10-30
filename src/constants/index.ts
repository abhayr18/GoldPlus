// ============================================
// OGold Wallet — Design Tokens & Brand Constants
// The Precious Metals & Lifestyle Super App (Dubai, UAE)
// Buy, Sell, Save, Spend Gold & Silver with OGold Mastercard
// ============================================

export const BRAND = {
  parentCompany: 'O Gold Precious Metals Trading L.L.C.',
  name: 'OGold Wallet',
  appTitle: 'OGold: Buy Gold & Silver',
  descriptor: 'Gold & Silver Digital Wallet & Mastercard Super App',
  tagline: 'Buy, Sell, Save & Spend Physical Gold & Silver in UAE',
  heading: 'Turn Your Gold & Silver into Real Spending Power',
  subheading: 'Hold 100% insured physical bullion vaulted in Dubai. Spend gold globally with the OGold Mastercard.',
  attribution: 'O Gold Precious Metals Trading L.L.C. • Regulated in Dubai, UAE',
  headquarters: 'Downtown Dubai & DMCC Precious Metals Free Zone, Dubai, UAE',
  certification: 'Shariah-Compliant • Dubai Economic Department Licensed • DNI Insured',
  currency: 'AED',
  currencySymbol: 'AED ',
} as const;

export const COLORS = {
  // OGold Signature Luxury Obsidian & Metallic Gold Palette
  bgBlack: '#0A0D14',
  bgDark: '#101522',
  bgCard: '#161D2D',
  bgCardHover: '#1D263B',
  bgInput: '#131927',
  
  // Metallic 24K Gold Accents
  primaryGold: '#F59E0B',
  secondaryGold: '#E5C05B',
  goldMetallic: '#D4AF37',
  goldBright: '#FBBF24',
  goldLight: '#FEF3C7',
  goldGlow: 'rgba(245, 158, 11, 0.25)',
  goldGradient: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)',
  goldCardGradient: 'linear-gradient(135deg, #2A2210 0%, #171510 50%, #0D0E12 100%)',

  // Silver Accents (.999 Fine)
  silverAccent: '#94A3B8',
  silverLight: '#E2E8F0',
  silverGlow: 'rgba(148, 163, 184, 0.2)',
  silverGradient: 'linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)',

  // Master Neutrals
  white: '#FFFFFF',
  textMuted: '#64748B',
  textDim: '#94A3B8',
  borderDark: '#1E293B',
  borderGold: 'rgba(245, 158, 11, 0.3)',
  
  // Functional
  positive: '#10B981',
  positiveBg: 'rgba(16, 185, 129, 0.15)',
  negative: '#EF4444',
  negativeBg: 'rgba(239, 68, 68, 0.15)',

  // Legacy mappings for existing screens
  darkCharcoal: '#0A0D14',
  deepNavy: '#101522',
  navyGradient: 'linear-gradient(135deg, #101522 0%, #161D2D 100%)',
  ivoryBg: '#0A0D14',
  cardBg: '#161D2D',
  mainText: '#FFFFFF',
  secondaryText: '#94A3B8',
  mutedText: '#64748B',
  border: '#1E293B',
  borderLight: '#26334A',
  streakOrange: '#F97316',
  streakBg: 'rgba(249, 115, 22, 0.15)',
  yieldPurple: '#8B5CF6',
  yieldBg: 'rgba(139, 92, 246, 0.15)',
  darkOverlay: 'rgba(10, 13, 20, 0.85)',
} as const;

// Live Dubai Precious Metals Spot Benchmark Rates (AED per gram)
export const DUBAI_MARKET_RATES = {
  rate24K: 318.50,
  rate22K: 295.20,
  rate21K: 281.80,
  rate18K: 241.50,
  rateSilver999: 3.85,
  dailyChangeGold: '+0.75%',
  dailyChangeSilver: '+1.20%',
  marketStatus: 'Live (Updated every 1s)',
};

export const DEMO_GOLD_RATE = DUBAI_MARKET_RATES.rate24K; // AED per gram 24K Gold
export const DEMO_SILVER_RATE = DUBAI_MARKET_RATES.rateSilver999; // AED per gram .999 Silver

export const DEMO_USER = {
  fullName: 'Tariq Al Mansoori',
  mobile: '501234567',
  countryCode: '+971',
  email: 'tariq.mansoori@ogold.app',
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
  totalGrams: 39.1209, // ~AED 12,460 Gold
  silverGrams: 425.5000, // ~AED 1,638 Silver
  totalInvested: 13500,
  leasedGrams: 10.0000, // In Wakala Yield pool
  leasedSilverGrams: 100.0000,
  yieldEarnedGrams: 0.1300,
  yieldEarnedSilverGrams: 2.1500,
};

export const DEMO_OGOLD_CARD = {
  cardNumber: '5412 8899 3421 9081',
  cardHolder: 'TARIQ AL MANSOORI',
  expiry: '08/29',
  cvv: '824',
  isFrozen: false,
  isOnlineEnabled: true,
  isAtmEnabled: true,
  spendingLimitMonthly: 25000,
  spendingAsset: 'gold' as const,
  physicalCardStatus: 'shipped' as const,
  appleWalletAdded: true,
};

// Sharia-Compliant Wakala Yield Pools
export const OGOLD_WAKALA_POOLS = [
  {
    id: 'gold-wakala-6m',
    metal: 'gold' as const,
    name: 'OGold 24K Bullion Pool',
    partner: 'DMCC Insured Depository',
    annualYield: '4.8% APR',
    tenure: '6 Months',
    insurance: '100% Insured by Dubai National Insurance (DNI)',
    minDeposit: '1 Gram',
  },
  {
    id: 'silver-wakala-12m',
    metal: 'silver' as const,
    name: 'OGold Pure Silver Reserve',
    partner: 'Emirates Precious Metals Depository',
    annualYield: '5.2% APR',
    tenure: '12 Months',
    insurance: '100% Insured by Dubai National Insurance (DNI)',
    minDeposit: '50 Grams',
  },
];

// Depository Custody & Independent Audit
export const OGOLD_VAULT_AUDIT = {
  auditor: 'BDO Chartered Accountants & DNI',
  auditDate: '30 October 2026',
  vaultLocation: 'Brink’s Global Services, Almas Tower, JLT Dubai',
  secondaryVault: 'Transguard Vaults, Emirates Group HQ Dubai',
  insuranceProvider: 'Dubai National Insurance (DNI)',
  totalPhysicalGoldKg: 1840.50,
  totalPhysicalSilverKg: 14250.00,
  backingRatio: '100.0% Physical Bullion Custody',
  assayCertificateId: 'DED-OGOLD-2026-VAL-AUAG',
};

// Lifestyle Super App Services (spend with gold / silver)
export const LIFESTYLE_SERVICES = [
  {
    id: 'esim-uae-gcc',
    category: 'esim' as const,
    title: '5GB Regional eSIM (UAE & GCC)',
    provider: 'OGold Roam (Breeze / 1Global)',
    priceAED: 65,
    goldEquivalentGrams: 0.204,
    tag: 'Instant Activation',
    image: 'globe',
  },
  {
    id: 'esim-global-10gb',
    category: 'esim' as const,
    title: '10GB Global Travel eSIM (160 Countries)',
    provider: 'OGold Roam Global',
    priceAED: 120,
    goldEquivalentGrams: 0.377,
    tag: 'Bestseller',
    image: 'plane',
  },
  {
    id: 'giftcard-amazon-100',
    category: 'giftcard' as const,
    title: 'Amazon.ae AED 100 e-Gift Card',
    provider: 'Amazon UAE',
    priceAED: 100,
    goldEquivalentGrams: 0.314,
    tag: 'Digital Code',
    image: 'shopping-bag',
  },
  {
    id: 'giftcard-noon-250',
    category: 'giftcard' as const,
    title: 'Noon.com AED 250 e-Voucher',
    provider: 'Noon UAE',
    priceAED: 250,
    goldEquivalentGrams: 0.785,
    tag: 'Supermall',
    image: 'shopping-bag',
  },
];

// Physical Delivery Products for Gold & Silver
export const DELIVERY_PRODUCTS = {
  coins: [
    { weight: 1, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'coin' as const, makingCharges: 35, deliveryCharges: 25 },
    { weight: 5, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'coin' as const, makingCharges: 65, deliveryCharges: 25 },
    { weight: 10, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'coin' as const, makingCharges: 110, deliveryCharges: 30 },
    { weight: 31.1, metal: 'silver' as const, purity: '.999 Fine Silver (1 oz)', type: 'coin' as const, makingCharges: 20, deliveryCharges: 25 },
    { weight: 100, metal: 'silver' as const, purity: '.999 Fine Silver', type: 'coin' as const, makingCharges: 35, deliveryCharges: 25 },
  ],
  bars: [
    { weight: 1, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'bar' as const, makingCharges: 30, deliveryCharges: 25 },
    { weight: 5, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'bar' as const, makingCharges: 55, deliveryCharges: 25 },
    { weight: 10, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'bar' as const, makingCharges: 95, deliveryCharges: 30 },
    { weight: 50, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'bar' as const, makingCharges: 300, deliveryCharges: 50 },
    { weight: 100, metal: 'gold' as const, purity: '24K (999.9 Fine)', type: 'bar' as const, makingCharges: 550, deliveryCharges: 60 },
    { weight: 250, metal: 'silver' as const, purity: '.999 Fine Cast Bar', type: 'bar' as const, makingCharges: 50, deliveryCharges: 30 },
    { weight: 1000, metal: 'silver' as const, purity: '.999 Fine 1kg Bullion Bar', type: 'bar' as const, makingCharges: 120, deliveryCharges: 40 },
  ],
};

// Aliases for compatibility
export const YASS_LEASE_PARTNERS = OGOLD_WAKALA_POOLS;
export const YASS_VAULT_AUDIT = OGOLD_VAULT_AUDIT;

export const INITIAL_TRANSACTIONS = [
  {
    id: 'TXN-OGOLD-20250410-001',
    type: 'buy' as const,
    metal: 'gold' as const,
    date: '2025-04-10T10:30:00',
    goldGrams: 5.0000,
    amount: 1592.50,
    rate: 318.50,
    status: 'completed' as const,
    paymentMethod: 'Apple Pay (Emirates NBD)',
    reference: 'OGOLD-AU-88912',
    meta: 'Direct Purchase 24K 999.9',
  },
  {
    id: 'TXN-OGOLD-20250414-002',
    type: 'card_spend' as const,
    metal: 'gold' as const,
    date: '2025-04-14T18:45:00',
    goldGrams: 0.785,
    amount: 250.00,
    rate: 318.50,
    status: 'completed' as const,
    paymentMethod: 'OGold Platinum Mastercard',
    reference: 'POS-DUBAI-MALL-STARBUCKS',
    meta: 'Automatic Gold Liquidation at POS',
  },
  {
    id: 'TXN-OGOLD-20250418-003',
    type: 'buy' as const,
    metal: 'silver' as const,
    date: '2025-04-18T12:15:00',
    goldGrams: 200.0000, // 200g silver
    amount: 770.00,
    rate: 3.85,
    status: 'completed' as const,
    paymentMethod: 'Aani Instant Pay',
    reference: 'OGOLD-AG-23190',
    meta: 'Purchased 200g .999 Silver',
  },
  {
    id: 'TXN-OGOLD-20250422-004',
    type: 'spin_reward' as const,
    metal: 'gold' as const,
    date: '2025-04-22T08:00:00',
    goldGrams: 0.050,
    amount: 15.92,
    rate: 318.50,
    status: 'completed' as const,
    paymentMethod: 'Daily Spin & Win Bonus',
    reference: 'SPIN-WIN-DAILY-991',
    meta: 'Credited 50mg Pure Gold',
  },
];

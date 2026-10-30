// ============================================
// YASS Gold & YASS Bullion — Design Tokens & Brand Constants
// A product by YASS Group, Dubai
// Inspired by Gullak & SafeGold (Dubai Market Edition)
// ============================================

export const BRAND = {
  parentCompany: 'YASS Group of Dubai',
  name: 'YASS Gold',
  bullionBrand: 'YASS Bullion',
  descriptor: 'Dubai Digital Gold & Physical Bullion',
  tagline: 'The Gold Standard of Dubai. Save & Invest with Confidence.',
  heading: 'Dubai Digital Gold for a Brighter Future',
  subheading: 'Trade, save, and redeem 24K 999.9 pure gold backed by physical bullion in Dubai vaults.',
  attribution: 'A product by YASS Group, Dubai',
  headquarters: 'Almas Tower, JLT / Gold Souk, Dubai, United Arab Emirates',
  certification: 'Dubai Good Delivery (DGD) & DMCC Accredited 999.9 Purity',
  currency: 'AED',
  currencySymbol: 'AED ',
} as const;

export const COLORS = {
  primaryGold: '#F59E0B',
  secondaryGold: '#FBBF24',
  goldDark: '#D97706',
  goldSurface: '#FEF3C7',
  darkCharcoal: '#0F172A',
  deepNavy: '#0B1426',
  navyGradient: 'linear-gradient(135deg, #0B1426 0%, #152238 100%)',
  goldGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  ivoryBg: '#F8FAFC',
  cardBg: '#FFFFFF',
  mainText: '#0F172A',
  secondaryText: '#64748B',
  positive: '#10B981',
  positiveBg: '#ECFDF5',
  negative: '#EF4444',
  negativeBg: '#FEF2F2',
  border: '#E2E8F0',
  goldGradientStart: '#F59E0B',
  goldGradientEnd: '#D97706',
  streakOrange: '#FF5722',
  streakBg: '#FFF7ED',
  goldPlusPurple: '#7C3AED',
  goldPlusBg: '#F3E8FF',
  darkOverlay: 'rgba(11, 20, 38, 0.85)',
} as const;

// Live Dubai Gold Souk & DMCC Market Rates (AED per gram)
export const DUBAI_MARKET_RATES = {
  rate24K: 318.50,
  rate22K: 295.20,
  rate21K: 281.80,
  rate18K: 241.50,
  rateSilver999: 3.85,
  dailyChange: '+0.75%',
  marketStatus: 'Open',
};

// Illustrative gold rate — single source of truth for 24K 999.9
export const DEMO_GOLD_RATE = DUBAI_MARKET_RATES.rate24K; // AED per gram

export const DEMO_USER = {
  fullName: 'Tariq Al Mansoori',
  mobile: '501234567',
  countryCode: '+971',
  email: 'tariq.mansoori@yassgroup.ae',
  kycStatus: 'verified' as const,
  emiratesId: '784-1988-1234567-1',
  savingsStreakDays: 5,
  freeGoldRewardsMg: 25, // 25 mg gold earned as streak rewards
};

export const DEMO_INITIAL_HOLDINGS = {
  totalGrams: 39.1209, // ~AED 12,460.00 at AED 318.50/g
  totalInvested: 11200,
  leasedGrams: 10.0000, // 10g actively leased earning 5.2% p.a.
  yieldEarnedGrams: 0.1300, // ~AED 41.40 earned passively in extra gold
};

export const GULLAK_LEASE_PARTNERS = [
  {
    name: 'Damas Jewellery Dubai',
    rating: 'AAA Bank Guaranteed',
    annualYield: '5.2% p.a.',
    tenure: '6 Months',
    insurance: '100% Insured by Dubai Insurance Co.',
  },
  {
    name: 'Malabar Gold & Diamonds (UAE)',
    rating: 'A+ Rated Institutional',
    annualYield: '5.5% p.a.',
    tenure: '12 Months',
    insurance: '100% Backed by FAB Bank Guarantee',
  },
  {
    name: 'Joyalukkas International',
    rating: 'Tier-1 DGJG Member',
    annualYield: '5.0% p.a.',
    tenure: '3 Months',
    insurance: '100% Bank Guaranteed',
  },
];

export const SAFE_GOLD_VAULT_AUDIT = {
  auditor: 'BDO Chartered Accountants (Dubai)',
  auditDate: '30 October 2026',
  vaultLocation: 'Brink’s Global Services, Almas Tower, JLT Dubai',
  secondaryVault: 'Transguard Vaults, Emirates Group HQ Dubai',
  totalPhysicalBarsKg: 2540.85,
  digitalGoldIssuedKg: 2540.85,
  backingRatio: '100.0% Fully Physical Backed',
  assayCertificateId: 'DMCC-DGD-2026-9999-AU',
};

export const DELIVERY_PRODUCTS = {
  coins: [
    { weight: 1, purity: '24K (999.9 Fine)', type: 'coin' as const, makingCharges: 35, deliveryCharges: 25 },
    { weight: 5, purity: '24K (999.9 Fine)', type: 'coin' as const, makingCharges: 65, deliveryCharges: 25 },
    { weight: 10, purity: '24K (999.9 Fine)', type: 'coin' as const, makingCharges: 110, deliveryCharges: 30 },
    { weight: 20, purity: '24K (999.9 Fine)', type: 'coin' as const, makingCharges: 180, deliveryCharges: 35 },
    { weight: 50, purity: '24K (999.9 Fine)', type: 'coin' as const, makingCharges: 350, deliveryCharges: 50 },
  ],
  bars: [
    { weight: 1, purity: '24K (999.9 Fine)', type: 'bar' as const, makingCharges: 30, deliveryCharges: 25 },
    { weight: 5, purity: '24K (999.9 Fine)', type: 'bar' as const, makingCharges: 55, deliveryCharges: 25 },
    { weight: 10, purity: '24K (999.9 Fine)', type: 'bar' as const, makingCharges: 95, deliveryCharges: 30 },
    { weight: 20, purity: '24K (999.9 Fine)', type: 'bar' as const, makingCharges: 160, deliveryCharges: 35 },
    { weight: 50, purity: '24K (999.9 Fine)', type: 'bar' as const, makingCharges: 300, deliveryCharges: 50 },
    { weight: 100, purity: '24K (999.9 Fine)', type: 'bar' as const, makingCharges: 550, deliveryCharges: 60 },
  ],
};

export const INITIAL_TRANSACTIONS = [
  {
    id: 'TXN-YASS-20250328-001',
    type: 'buy' as const,
    date: '2025-03-28T10:30:00',
    goldGrams: 5.0000,
    amount: 1592.50,
    rate: 318.50,
    status: 'completed' as const,
    paymentMethod: 'Aani Instant Pay',
    reference: 'TXN-YASS-20250328-001',
    meta: 'Direct Buy 24K 999.9',
  },
  {
    id: 'TXN-YASS-20250405-002',
    type: 'sell' as const,
    date: '2025-04-05T14:20:00',
    goldGrams: 1.0000,
    amount: 320.00,
    rate: 320.00,
    status: 'completed' as const,
    paymentMethod: 'Emirates NBD Transfer',
    reference: 'TXN-YASS-20250405-002',
    meta: 'Instant Withdrawal',
  },
  {
    id: 'TXN-YASS-20250412-003',
    type: 'sip' as const,
    date: '2025-04-12T09:00:00',
    goldGrams: 3.1446,
    amount: 1000.00,
    rate: 318.00,
    status: 'completed' as const,
    paymentMethod: 'UAE Direct Debit',
    reference: 'TXN-YASS-20250412-003',
    meta: 'Monthly Gold Accumulator',
  },
  {
    id: 'TXN-YASS-20250418-004',
    type: 'lease' as const,
    date: '2025-04-18T16:00:00',
    goldGrams: 10.0000,
    amount: 3185.00,
    rate: 318.50,
    status: 'completed' as const,
    paymentMethod: 'Vault Lock',
    reference: 'TXN-YASS-20250418-004',
    meta: 'YASS Gold+ 5.2% Yield Lease',
  },
  {
    id: 'TXN-YASS-20250420-005',
    type: 'buy' as const,
    date: '2025-04-20T11:45:00',
    goldGrams: 15.6986,
    amount: 5000.00,
    rate: 318.50,
    status: 'completed' as const,
    paymentMethod: 'Apple Pay',
    reference: 'TXN-YASS-20250420-005',
    meta: '5-min Price Lock Purchase',
  },
];

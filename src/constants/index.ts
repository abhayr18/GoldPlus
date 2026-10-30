// ============================================
// YASS Gold & YASS Bullion — Design Tokens & Brand Constants
// A product by YASS Group, Dubai
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
  primaryGold: '#E8B63F',
  secondaryGold: '#F4D681',
  darkCharcoal: '#171A1D',
  deepNavy: '#17232D',
  ivoryBg: '#F7F5EF',
  cardBg: '#FFFFFF',
  mainText: '#20252B',
  secondaryText: '#7C858D',
  positive: '#16865B',
  negative: '#DC3545',
  border: '#E9E7E0',
  goldGradientStart: '#E8B63F',
  goldGradientEnd: '#F4D681',
  darkOverlay: 'rgba(23, 26, 29, 0.85)',
} as const;

// Live Dubai Gold Souk / DMCC illustrative gold rate (AED per gram for 24K 999.9 Fine Gold)
export const DEMO_GOLD_RATE = 318.50; // AED per gram

export const DEMO_USER = {
  fullName: 'Tariq Al Mansoori',
  mobile: '501234567',
  countryCode: '+971',
  email: 'tariq.mansoori@yassgroup.ae',
  kycStatus: 'verified' as const,
  emiratesId: '784-1988-1234567-1',
};

export const DEMO_INITIAL_HOLDINGS = {
  totalGrams: 39.1209, // ~AED 12,460.00 at AED 318.50/g
  totalInvested: 11200, // AED 11,200
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
  },
  {
    id: 'TXN-YASS-20250420-004',
    type: 'buy' as const,
    date: '2025-04-20T11:45:00',
    goldGrams: 15.6986,
    amount: 5000.00,
    rate: 318.50,
    status: 'completed' as const,
    paymentMethod: 'Apple Pay',
    reference: 'TXN-YASS-20250420-004',
  },
  {
    id: 'TXN-YASS-20250512-005',
    type: 'sip' as const,
    date: '2025-05-12T09:00:00',
    goldGrams: 3.1446,
    amount: 1000.00,
    rate: 318.00,
    status: 'completed' as const,
    paymentMethod: 'UAE Direct Debit',
    reference: 'TXN-YASS-20250512-005',
  },
];

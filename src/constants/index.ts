// ============================================
// GoldPlus — Design Tokens & Brand Constants
// A product by Urbanspire Group
// ============================================

export const BRAND = {
  parentCompany: 'Urbanspire Group',
  name: 'GoldPlus',
  descriptor: 'Digital Gold & Savings',
  tagline: 'Save Today. Secure Tomorrow.',
  heading: 'Digital Gold for a Brighter Future',
  subheading: 'Start your gold savings journey with a simple digital experience.',
  attribution: 'A product by Urbanspire Group',
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

// Illustrative gold rate — single source of truth
export const DEMO_GOLD_RATE = 7382; // ₹ per gram

export const DEMO_USER = {
  fullName: 'Rahul Sharma',
  mobile: '9876543210',
  email: 'rahul@example.com',
  kycStatus: 'verified' as const,
};

export const DEMO_INITIAL_HOLDINGS = {
  totalGrams: 0.5321,
  totalInvested: 11200,
};

export const DELIVERY_PRODUCTS = {
  coins: [
    { weight: 1, purity: '24K (99.9%)', type: 'coin' as const, makingCharges: 350, deliveryCharges: 150 },
    { weight: 5, purity: '24K (99.9%)', type: 'coin' as const, makingCharges: 750, deliveryCharges: 150 },
    { weight: 10, purity: '24K (99.9%)', type: 'coin' as const, makingCharges: 1200, deliveryCharges: 200 },
    { weight: 20, purity: '24K (99.9%)', type: 'coin' as const, makingCharges: 2000, deliveryCharges: 250 },
  ],
  bars: [
    { weight: 1, purity: '24K (99.9%)', type: 'bar' as const, makingCharges: 300, deliveryCharges: 150 },
    { weight: 5, purity: '24K (99.9%)', type: 'bar' as const, makingCharges: 650, deliveryCharges: 150 },
    { weight: 10, purity: '24K (99.9%)', type: 'bar' as const, makingCharges: 1000, deliveryCharges: 200 },
    { weight: 20, purity: '24K (99.9%)', type: 'bar' as const, makingCharges: 1800, deliveryCharges: 250 },
  ],
};

export const INITIAL_TRANSACTIONS = [
  {
    id: 'TXN-GP-20250328-001',
    type: 'buy' as const,
    date: '2025-03-28T10:30:00',
    goldGrams: 0.2000,
    amount: 1500,
    rate: 7500,
    status: 'completed' as const,
    paymentMethod: 'UPI',
    reference: 'TXN-GP-20250328-001',
  },
  {
    id: 'TXN-GP-20250405-002',
    type: 'sell' as const,
    date: '2025-04-05T14:20:00',
    goldGrams: 0.0500,
    amount: 380,
    rate: 7600,
    status: 'completed' as const,
    paymentMethod: 'Bank Account',
    reference: 'TXN-GP-20250405-002',
  },
  {
    id: 'TXN-GP-20250412-003',
    type: 'sip' as const,
    date: '2025-04-12T09:00:00',
    goldGrams: 0.1000,
    amount: 750,
    rate: 7500,
    status: 'completed' as const,
    paymentMethod: 'UPI',
    reference: 'TXN-GP-20250412-003',
  },
  {
    id: 'TXN-GP-20250420-004',
    type: 'buy' as const,
    date: '2025-04-20T11:45:00',
    goldGrams: 0.1354,
    amount: 1000,
    rate: 7386,
    status: 'completed' as const,
    paymentMethod: 'UPI',
    reference: 'TXN-GP-20250420-004',
  },
  {
    id: 'TXN-GP-20250512-005',
    type: 'sip' as const,
    date: '2025-05-12T09:00:00',
    goldGrams: 0.1000,
    amount: 750,
    rate: 7500,
    status: 'completed' as const,
    paymentMethod: 'UPI',
    reference: 'TXN-GP-20250512-005',
  },
];


// ============================================
// GoldPlus — Dashboard / Home Screen
// Premium digital gold fintech dashboard
// A product by Urbanspire Group
// ============================================

import React, { useMemo } from 'react';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCw,
  Gift,
  TrendingUp,
  ChevronRight,
  Inbox,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { GoldBarIllustration, MiniLineChart } from '../components/BrandLogo';
import { DEMO_GOLD_RATE, COLORS } from '../constants';
import type { Transaction } from '../types';

// ============================================
// Helpers
// ============================================

/** Format a number as Indian-style ₹ currency (e.g. ₹3,92,818) */
function formatCurrency(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  // Use en-IN locale for comma grouping (lakh-crore style)
  return '₹' + rounded.toLocaleString('en-IN', {
    minimumFractionDigits: rounded % 1 !== 0 ? 2 : 0,
    maximumFractionDigits: 2,
  });
}

/** Format gold grams to 4 decimal places */
function formatGrams(grams: number): string {
  return grams.toFixed(4);
}

/** Get a time-aware greeting */
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

/** Format a date string to a short readable format (e.g. "28 Mar 2025") */
function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Extract user initials (e.g. "Rahul Sharma" → "RS") */
function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/** Human-readable transaction type label */
function txnLabel(type: Transaction['type']): string {
  switch (type) {
    case 'buy': return 'Gold Purchase';
    case 'sell': return 'Gold Sold';
    case 'sip': return 'SIP Investment';
    case 'redemption': return 'Gold Redeemed';
    default: return 'Transaction';
  }
}

// ============================================
// Component
// ============================================

const DashboardScreen: React.FC = () => {
  const { state, navigate } = useApp();
  const userName = state.user?.fullName || 'Rahul';
  const firstName = userName.split(' ')[0];

  // Derived values
  const currentValue = useMemo(
    () => state.holdings.totalGrams * DEMO_GOLD_RATE,
    [state.holdings.totalGrams],
  );

  const recentTransactions = useMemo(
    () => state.holdings.transactions.slice(0, 3),
    [state.holdings.transactions],
  );

  // Quick action items configuration
  const quickActions = [
    { label: 'Buy Gold',    icon: ArrowDownCircle, screen: 'buy' as const },
    { label: 'Sell Gold',   icon: ArrowUpCircle,   screen: 'sell' as const },
    { label: 'Start SIP',   icon: RefreshCw,       screen: 'sip' as const },
    { label: 'Redeem Gold', icon: Gift,            screen: 'delivery' as const },
  ];

  return (
    <div className="screen-container">
      <div className="screen-content" style={{ paddingTop: 20 }}>

        {/* ── 1. Header ─────────────────────────────── */}
        <div style={styles.header}>
          <div style={{ flex: 1 }}>
            <h1 style={styles.greeting}>
              {getGreeting()}, {firstName} 👋
            </h1>
            <p style={styles.subtitle}>
              Grow your wealth with digital gold.
            </p>
          </div>

          {/* User avatar */}
          <button
            onClick={() => navigate('profile')}
            style={styles.avatar}
            aria-label="Profile"
          >
            {getInitials(userName)}
          </button>
        </div>

        {/* ── 2. Demo Banner ─────────────────────────── */}
        <div className="demo-banner">DEMO MODE — NO REAL GOLD OR MONEY</div>

        {/* ── 3. Gold Balance Card ────────────────────── */}
        <div className="card card-gold" style={styles.balanceCard}>
          <div style={styles.balanceTop}>
            {/* Left content */}
            <div style={{ flex: 1 }}>
              <p style={styles.balanceLabel}>Total Gold Value</p>
              <h2 style={styles.balanceAmount}>{formatCurrency(currentValue)}</h2>

              <div style={styles.balanceMeta}>
                <span style={styles.goldGrams}>
                  {formatGrams(state.holdings.totalGrams)} g
                </span>
                <span style={styles.purityBadge}>24K Digital Gold</span>
              </div>

              {/* Illustrative gain indicator */}
              <div style={styles.gainIndicator}>
                <TrendingUp size={13} />
                <span>↑ 8.4% (last 30 days)</span>
              </div>
            </div>

            {/* Gold bar illustration */}
            <div style={styles.goldBarWrap}>
              <GoldBarIllustration size={72} />
            </div>
          </div>

          {/* Action buttons inside card */}
          <div style={styles.balanceActions}>
            <button
              className="btn btn-outline-gold btn-sm"
              onClick={() => navigate('buy')}
              style={styles.balanceBtn}
            >
              Buy Gold
            </button>
            <button
              className="btn btn-outline-gold btn-sm"
              onClick={() => navigate('sell')}
              style={styles.balanceBtn}
            >
              Sell Gold
            </button>
          </div>
        </div>

        {/* ── 4. Quick Actions Grid ──────────────────── */}
        <div style={{ marginTop: 20 }}>
          <div className="quick-actions">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  className="quick-action-item"
                  onClick={() => navigate(action.screen)}
                >
                  <div className="quick-action-icon">
                    <Icon size={20} />
                  </div>
                  <span className="quick-action-label">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 5. Gold SIP Promotional Card ────────────── */}
        <div
          className="card"
          style={styles.sipPromoCard}
          onClick={() => navigate('sip')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('sip')}
        >
          <div style={styles.sipPromoInner}>
            <div style={{ flex: 1 }}>
              <h3 style={styles.sipPromoTitle}>Gold SIP</h3>
              <p style={styles.sipPromoSubtitle}>
                Build your future, one gram at a time.
              </p>
              <span style={styles.sipPromoLink}>
                Start Saving <ChevronRight size={14} style={{ verticalAlign: 'middle' }} />
              </span>
            </div>

            {/* Small gold coin icon */}
            <div className="gold-coin-icon" style={{ fontSize: 12, flexShrink: 0 }}>
              Au
            </div>
          </div>
        </div>

        {/* ── 6. Live Gold Price Card ────────────────── */}
        <div
          className="card"
          style={styles.livePriceCard}
          onClick={() => navigate('goldPriceDetail')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('goldPriceDetail')}
        >
          <div style={styles.livePriceRow}>
            <div style={{ flex: 1 }}>
              <div style={styles.livePriceLabelRow}>
                <span style={styles.livePriceLabel}>Live Gold Price</span>
                <span style={styles.livePriceTag}>(Illustrative)</span>
              </div>
              <h3 style={styles.livePriceAmount}>
                ₹{DEMO_GOLD_RATE.toLocaleString('en-IN')}/g
              </h3>
              <div style={styles.livePriceChange}>
                <TrendingUp size={13} />
                <span>↑ 0.66% today</span>
              </div>
            </div>

            <div style={{ flexShrink: 0, marginLeft: 12 }}>
              <MiniLineChart />
            </div>
          </div>
        </div>

        {/* ── 7. Recent Activity ─────────────────────── */}
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Recent Activity</h3>
          <button
            style={styles.viewAllBtn}
            onClick={() => navigate('transactions')}
          >
            View All <ChevronRight size={14} style={{ verticalAlign: 'middle' }} />
          </button>
        </div>

        <div className="card" style={{ padding: '4px 16px' }}>
          {recentTransactions.length === 0 ? (
            /* Empty state */
            <div className="empty-state" style={{ padding: '32px 16px' }}>
              <div className="empty-state-icon">
                <Inbox size={28} />
              </div>
              <p className="empty-state-title">No transactions yet</p>
              <p className="empty-state-desc">
                Start your gold journey by buying your first gram!
              </p>
            </div>
          ) : (
            recentTransactions.map((txn) => (
              <TransactionRow
                key={txn.id}
                txn={txn}
                onClick={() => {
                  // Could navigate to transaction detail in the future
                  navigate('transactions');
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// Transaction Row Sub-component
// ============================================

interface TransactionRowProps {
  txn: Transaction;
  onClick?: () => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ txn, onClick }) => {
  const isBuyOrSip = txn.type === 'buy' || txn.type === 'sip';

  // Pick appropriate icon
  const Icon = (() => {
    switch (txn.type) {
      case 'buy': return ArrowDownCircle;
      case 'sell': return ArrowUpCircle;
      case 'sip': return RefreshCw;
      default: return Gift;
    }
  })();

  // CSS class for icon background colour
  const iconClass = txn.type === 'redemption' ? 'redemption' : txn.type;

  return (
    <div className="txn-row" onClick={onClick}>
      <div className={`txn-icon ${iconClass}`}>
        <Icon size={18} />
      </div>

      <div className="txn-details">
        <div className="txn-type">{txnLabel(txn.type)}</div>
        <div className="txn-date">{formatDate(txn.date)}</div>
      </div>

      <div className="txn-amounts">
        <div className={`txn-grams ${isBuyOrSip ? 'positive' : 'negative'}`}>
          {isBuyOrSip ? '+' : '−'}{formatGrams(txn.goldGrams)} g
        </div>
        <div className="txn-rupees">{formatCurrency(txn.amount)}</div>
      </div>
    </div>
  );
};

// ============================================
// Inline Styles (premium fintech aesthetic)
// ============================================

const styles: Record<string, React.CSSProperties> = {
  // Header
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 700,
    color: COLORS.mainText,
    lineHeight: 1.3,
    margin: 0,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: COLORS.primaryGold,
    color: COLORS.darkCharcoal,
    fontWeight: 700,
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    flexShrink: 0,
    letterSpacing: '0.5px',
    fontFamily: 'inherit',
  },

  // Balance card
  balanceCard: {
    padding: 20,
    marginBottom: 0,
  },
  balanceTop: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
  },
  balanceLabel: {
    fontSize: 13,
    color: '#B8A06A',
    marginBottom: 4,
    fontWeight: 500,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 700,
    color: '#FFFFFF',
    margin: 0,
    lineHeight: 1.2,
    fontVariantNumeric: 'tabular-nums' as React.CSSProperties['fontVariantNumeric'],
  },
  balanceMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    flexWrap: 'wrap' as React.CSSProperties['flexWrap'],
  },
  goldGrams: {
    fontSize: 15,
    fontWeight: 600,
    color: COLORS.primaryGold,
  },
  purityBadge: {
    fontSize: 10,
    fontWeight: 600,
    color: '#B8A06A',
    background: 'rgba(232, 182, 63, 0.12)',
    padding: '3px 8px',
    borderRadius: 6,
    letterSpacing: '0.3px',
    textTransform: 'uppercase' as React.CSSProperties['textTransform'],
  },
  gainIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 12,
    fontWeight: 500,
    color: COLORS.positive,
    marginTop: 10,
  },
  goldBarWrap: {
    opacity: 0.9,
    marginTop: 4,
  },
  balanceActions: {
    display: 'flex',
    gap: 10,
    marginTop: 18,
    borderTop: '1px solid rgba(232, 182, 63, 0.12)',
    paddingTop: 16,
  },
  balanceBtn: {
    flex: 1,
    width: 'auto',
  },

  // SIP Promo card
  sipPromoCard: {
    marginTop: 16,
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #FBF7EC 0%, #F7F0DE 100%)',
    borderColor: 'rgba(232, 182, 63, 0.2)',
  },
  sipPromoInner: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  sipPromoTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.mainText,
    margin: 0,
  },
  sipPromoSubtitle: {
    fontSize: 13,
    color: COLORS.secondaryText,
    marginTop: 3,
  },
  sipPromoLink: {
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.primaryGold,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 2,
    marginTop: 8,
  },

  // Live price card
  livePriceCard: {
    marginTop: 16,
    cursor: 'pointer',
  },
  livePriceRow: {
    display: 'flex',
    alignItems: 'center',
  },
  livePriceLabelRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  livePriceLabel: {
    fontSize: 13,
    fontWeight: 500,
    color: COLORS.secondaryText,
  },
  livePriceTag: {
    fontSize: 10,
    color: COLORS.secondaryText,
    fontStyle: 'italic',
  },
  livePriceAmount: {
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.mainText,
    margin: '4px 0',
    fontVariantNumeric: 'tabular-nums' as React.CSSProperties['fontVariantNumeric'],
  },
  livePriceChange: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 12,
    fontWeight: 500,
    color: COLORS.positive,
  },

  // Recent activity section
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 600,
    color: COLORS.mainText,
    margin: 0,
  },
  viewAllBtn: {
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.primaryGold,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 2,
    fontFamily: 'inherit',
    padding: 0,
  },
};

export default DashboardScreen;

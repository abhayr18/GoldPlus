// ============================================
// YASS Gold & YASS Bullion — Dashboard Screen
// High-Fidelity Fintech UI (Dubai Market Edition)
// Inspired by Gullak (Gold+, Daily Streaks) & SafeGold (Vault Custody, Gifting)
// A product by YASS Group, Dubai
// ============================================

import React, { useMemo } from 'react';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCw,
  Gift,
  TrendingUp,
  ChevronRight,
  Flame,
  ShieldCheck,
  Percent,
  Target,
  Award,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { GoldBarIllustration, MiniLineChart } from '../components/BrandLogo';
import { DUBAI_MARKET_RATES, DEMO_GOLD_RATE, COLORS } from '../constants';
import { buyGold } from '../state/appState';
import type { Transaction } from '../types';

function formatCurrency(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  return (
    'AED ' +
    rounded.toLocaleString('en-US', {
      minimumFractionDigits: rounded % 1 !== 0 ? 2 : 0,
      maximumFractionDigits: 2,
    })
  );
}

function formatGrams(grams: number): string {
  return grams.toFixed(4);
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-AE', {
    day: 'numeric',
    month: 'short',
  });
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function txnLabel(type: Transaction['type']): string {
  switch (type) {
    case 'buy':
      return 'Gold Purchase';
    case 'sell':
      return 'Gold Sold';
    case 'sip':
      return 'SIP Auto-Save';
    case 'lease':
      return 'YASS Gold+ Leased';
    case 'gift':
      return 'Gold Gift Sent';
    case 'redemption':
      return 'Bullion Delivery';
    default:
      return 'Transaction';
  }
}

export const DashboardScreen: React.FC = () => {
  const { state, setState, navigate, showToast } = useApp();
  const userName = state.user?.fullName || 'Tariq Al Mansoori';
  const firstName = userName.split(' ')[0];

  const currentValue = useMemo(
    () => state.holdings.totalGrams * DEMO_GOLD_RATE,
    [state.holdings.totalGrams]
  );

  const recentTransactions = useMemo(
    () => state.holdings.transactions.slice(0, 4),
    [state.holdings.transactions]
  );

  // Quick action items (Fintech features from Gullak & SafeGold)
  const quickActions = [
    { label: 'Buy Gold', icon: ArrowDownCircle, screen: 'buy' as const, color: '#16865B' },
    { label: 'Sell Gold', icon: ArrowUpCircle, screen: 'sell' as const, color: '#DC3545' },
    { label: 'Gold SIP', icon: RefreshCw, screen: 'sip' as const, color: '#E8B63F' },
    { label: 'YASS Gold+', icon: Percent, screen: 'lease' as const, color: '#9333EA', badge: '5.2%' },
    { label: 'Goals', icon: Target, screen: 'goals' as const, color: '#0284C7' },
    { label: 'Gift Gold', icon: Gift, screen: 'gift' as const, color: '#EA580C' },
    { label: 'Redeem Bar', icon: Award, screen: 'delivery' as const, color: '#CA8A04' },
    { label: 'Vault Proof', icon: ShieldCheck, screen: 'vaultProof' as const, color: '#16865B' },
  ];

  // 1-Tap Quick Daily Save Streak Action (Gullak signature)
  const handleDailyStreakSave = () => {
    const newState = buyGold(state, 20, 'Aani Instant Pay');
    const updatedUser = {
      ...newState.user!,
      savingsStreakDays: (newState.user?.savingsStreakDays || 5) + 1,
      freeGoldRewardsMg: (newState.user?.freeGoldRewardsMg || 25) + 5,
    };
    setState({
      ...newState,
      user: updatedUser,
    });
    showToast('Saved AED 20! Streak increased to 6 days (+5mg gold reward unlocked)', 'success');
  };

  return (
    <div className="screen-container" style={{ paddingBottom: 90 }}>
      {/* ── 1. Live Dubai Souk Ticker ─────────────────────────── */}
      <div
        style={{
          background: '#17232D',
          color: '#FFF',
          padding: '7px 16px',
          fontSize: 11,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(232, 182, 63, 0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: '#4ADE80', fontSize: 10 }}>●</span>
          <span style={{ fontWeight: 600 }}>Dubai Gold Souk:</span>
          <span style={{ color: COLORS.secondaryGold, fontWeight: 700 }}>Open</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span>
            24K: <strong style={{ color: COLORS.primaryGold }}>AED {DUBAI_MARKET_RATES.rate24K.toFixed(2)}</strong>
          </span>
          <span>
            22K: <strong>AED {DUBAI_MARKET_RATES.rate22K.toFixed(2)}</strong>
          </span>
          <span style={{ color: '#4ADE80', fontWeight: 600 }}>0% VAT</span>
        </div>
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        {/* ── 2. Top Header with User Info ────────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: COLORS.darkCharcoal, margin: 0 }}>
                {getGreeting()}, {firstName}
              </h1>
              <span
                style={{
                  background: '#E6F4EA',
                  color: '#137333',
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 12,
                }}
              >
                UAE PASS ✓
              </span>
            </div>
            <p style={{ fontSize: 12, color: COLORS.secondaryText, margin: '2px 0 0 0' }}>
              The Gold Standard of Dubai • Backed by YASS Group
            </p>
          </div>

          <button
            onClick={() => navigate('profile')}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: COLORS.darkCharcoal,
              color: COLORS.primaryGold,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 13,
              border: '2px solid #E8B63F',
              cursor: 'pointer',
            }}
          >
            {getInitials(userName)}
          </button>
        </div>

        {/* ── 3. Main Gold Balance Hero Card ────────────────────── */}
        <div
          className="card card-gold"
          style={{
            background: 'linear-gradient(135deg, #17232D 0%, #171A1D 100%)',
            color: '#FFF',
            borderRadius: 18,
            padding: '20px',
            marginBottom: 16,
            border: '1px solid rgba(232, 182, 63, 0.4)',
            boxShadow: '0 8px 24px rgba(23, 35, 45, 0.25)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 12, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Total Vault Gold Value
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#FFF', marginTop: 4 }}>
                {formatCurrency(currentValue)}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.primaryGold }}>
                  {formatGrams(state.holdings.totalGrams)} g
                </span>
                <span
                  style={{
                    background: 'rgba(232, 182, 63, 0.2)',
                    color: COLORS.primaryGold,
                    padding: '2px 6px',
                    borderRadius: 4,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  24K 999.9 DGD
                </span>
              </div>

              {state.holdings.leasedGrams > 0 && (
                <div style={{ fontSize: 11, color: '#38BDF8', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Percent size={12} />
                  <span>{state.holdings.leasedGrams.toFixed(2)}g actively earning 5.2% p.a. yield</span>
                </div>
              )}
            </div>

            <div style={{ width: 68, height: 68 }}>
              <GoldBarIllustration size={68} />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
              marginTop: 18,
              paddingTop: 16,
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <button
              onClick={() => navigate('buy')}
              style={{
                background: 'linear-gradient(135deg, #E8B63F 0%, #F4D681 100%)',
                color: '#171A1D',
                border: 'none',
                borderRadius: 10,
                padding: '10px 14px',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <ArrowDownCircle size={16} />
              <span>Buy Gold</span>
            </button>

            <button
              onClick={() => navigate('sell')}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#FFF',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 10,
                padding: '10px 14px',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <ArrowUpCircle size={16} />
              <span>Sell Gold</span>
            </button>
          </div>
        </div>

        {/* ── 4. Gullak-Style Daily Savings Streak Banner ─────────── */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
            border: '1px solid #FED7AA',
            borderRadius: 14,
            padding: '14px 16px',
            marginBottom: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: '#FFedd5',
                border: '2px solid #FB923C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Flame size={20} color="#EA580C" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#9A3412' }}>
                {state.user?.savingsStreakDays || 5}-Day Savings Streak!
              </div>
              <div style={{ fontSize: 11, color: '#C2410C' }}>
                Save AED 20 today to unlock +5mg free gold
              </div>
            </div>
          </div>

          <button
            onClick={handleDailyStreakSave}
            style={{
              background: '#EA580C',
              color: '#FFF',
              border: 'none',
              padding: '8px 12px',
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Save AED 20
          </button>
        </div>

        {/* ── 5. Quick Actions 8-Grid (Fintech Super-App) ──────────── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.darkCharcoal, marginBottom: 10 }}>
            Features & Services
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 10,
            }}
          >
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.screen)}
                  style={{
                    background: '#FFF',
                    border: '1px solid #E9E7E0',
                    borderRadius: 12,
                    padding: '12px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    cursor: 'pointer',
                    position: 'relative',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  }}
                >
                  {action.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: -6,
                        right: -4,
                        background: '#9333EA',
                        color: '#FFF',
                        fontSize: 9,
                        fontWeight: 800,
                        padding: '1px 5px',
                        borderRadius: 8,
                      }}
                    >
                      {action.badge}
                    </span>
                  )}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: `${action.color}15`,
                      color: action.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.darkCharcoal, textAlign: 'center' }}>
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 6. Gullak Gold+ Leasing Hero Banner ─────────────────── */}
        <div
          onClick={() => navigate('lease')}
          style={{
            background: 'linear-gradient(135deg, #2E1065 0%, #171A1D 100%)',
            border: '1px solid #A855F7',
            borderRadius: 14,
            padding: '16px 18px',
            color: '#FFF',
            marginBottom: 16,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span
                style={{
                  background: '#A855F7',
                  color: '#FFF',
                  fontSize: 10,
                  fontWeight: 800,
                  padding: '2px 6px',
                  borderRadius: 4,
                }}
              >
                YASS GOLD+
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#E9D5FF' }}>
                Earn 5.2% Extra Gold Yield
              </span>
            </div>
            <div style={{ fontSize: 11, color: '#D8B4FE', lineHeight: 1.4 }}>
              Lease to top Dubai jewelers (Damas, Joyalukkas) backed 100% by bank guarantees.
            </div>
          </div>
          <ChevronRight size={20} color="#E9D5FF" />
        </div>

        {/* ── 7. SafeGold Vault Security Card ──────────────────────── */}
        <div
          onClick={() => navigate('vaultProof')}
          style={{
            background: '#FFF',
            border: '1px solid #E9E7E0',
            borderRadius: 14,
            padding: '14px 16px',
            marginBottom: 20,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#E6F4EA',
                color: '#137333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.darkCharcoal }}>
                100% Physically Backed in Dubai Vaults
              </div>
              <div style={{ fontSize: 11, color: COLORS.secondaryText }}>
                Brink's DMCC & Transguard • Audited by BDO Dubai
              </div>
            </div>
          </div>
          <ChevronRight size={18} color={COLORS.secondaryText} />
        </div>

        {/* ── 8. Live Gold Price Chart Widget ─────────────────────── */}
        <div
          className="card"
          style={{
            padding: '16px',
            marginBottom: 20,
            cursor: 'pointer',
          }}
          onClick={() => navigate('goldPriceDetail')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: COLORS.secondaryText, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Dubai Gold Souk Benchmark
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.darkCharcoal, marginTop: 2 }}>
                AED {DEMO_GOLD_RATE.toFixed(2)} /g
              </div>
              <div style={{ fontSize: 12, color: '#16865B', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <TrendingUp size={13} />
                <span>+0.75% today (24K 999.9 Fine)</span>
              </div>
            </div>
            <MiniLineChart />
          </div>
        </div>

        {/* ── 9. Recent Activity ───────────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.darkCharcoal, margin: 0 }}>
            Recent Activity
          </h3>
          <button
            onClick={() => navigate('transactions')}
            style={{
              background: 'none',
              border: 'none',
              color: COLORS.primaryGold,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <span>View All</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="card" style={{ padding: '4px 14px' }}>
          {recentTransactions.map((txn) => (
            <TransactionRow key={txn.id} txn={txn} onClick={() => navigate('transactions')} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Transaction Row
const TransactionRow: React.FC<{ txn: Transaction; onClick?: () => void }> = ({ txn, onClick }) => {
  const isPositive = txn.type === 'buy' || txn.type === 'sip' || txn.type === 'lease';

  const getIcon = () => {
    switch (txn.type) {
      case 'buy':
        return ArrowDownCircle;
      case 'sell':
        return ArrowUpCircle;
      case 'sip':
        return RefreshCw;
      case 'lease':
        return Percent;
      case 'gift':
        return Gift;
      default:
        return Award;
    }
  };

  const Icon = getIcon();

  return (
    <div className="txn-row" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className={`txn-icon ${txn.type}`}>
        <Icon size={18} />
      </div>

      <div className="txn-details">
        <div className="txn-type">{txnLabel(txn.type)}</div>
        <div className="txn-date">{formatDate(txn.date)}</div>
      </div>

      <div className="txn-amounts">
        <div className={`txn-grams ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '+' : '−'}
          {formatGrams(txn.goldGrams)} g
        </div>
        <div className="txn-rupees">{formatCurrency(txn.amount)}</div>
      </div>
    </div>
  );
};

export default DashboardScreen;

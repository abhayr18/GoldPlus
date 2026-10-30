// ============================================
// YASS Gold & YASS Bullion — Dashboard Screen
// Mobile-First Gullak Theme (Dubai Market Edition)
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
  Zap,
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
      return 'Daily SIP Save';
    case 'lease':
      return 'YASS Gold+ Leased';
    case 'gift':
      return '24K Gift Sent';
    case 'redemption':
      return 'Minted Bullion Bar';
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

  // Gullak Quick Action Grid (Symmetrical 4x2)
  const quickActions = [
    { label: 'Buy Gold', icon: ArrowDownCircle, screen: 'buy' as const, color: '#10B981', bg: '#ECFDF5' },
    { label: 'Sell Gold', icon: ArrowUpCircle, screen: 'sell' as const, color: '#EF4444', bg: '#FEF2F2' },
    { label: 'Daily SIP', icon: RefreshCw, screen: 'sip' as const, color: '#D97706', bg: '#FEF3C7' },
    { label: 'Gold+ Yield', icon: Percent, screen: 'lease' as const, color: '#7C3AED', bg: '#F5F3FF', badge: '5.2%' },
    { label: 'Goals', icon: Target, screen: 'goals' as const, color: '#0284C7', bg: '#F0F9FF' },
    { label: 'Gift Gold', icon: Gift, screen: 'gift' as const, color: '#EA580C', bg: '#FFF7ED' },
    { label: 'Redeem Bar', icon: Award, screen: 'delivery' as const, color: '#B45309', bg: '#FFFBEB' },
    { label: 'Vault Proof', icon: ShieldCheck, screen: 'vaultProof' as const, color: '#059669', bg: '#ECFDF5' },
  ];

  // 1-Tap Daily Savings Streak action (Gullak Hallmark)
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
    showToast('Saved AED 20! 6-Day Streak unlocked (+5mg free gold credited)', 'success');
  };

  return (
    <div className="screen-container">
      {/* ── 1. Top App Bar (Gullak Mobile Style) ──────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        {/* User Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => navigate('profile')}
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: '#0B1426',
              color: '#F59E0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 13,
              border: '2px solid #F59E0B',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {getInitials(userName)}
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>
                Hi, {firstName} 👋
              </span>
              <span
                style={{
                  background: '#ECFDF5',
                  color: '#059669',
                  fontSize: 9,
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: 10,
                }}
              >
                UAE PASS
              </span>
            </div>
            <div style={{ fontSize: 10, color: '#64748B', fontWeight: 500 }}>
              YASS Bullion Dubai
            </div>
          </div>
        </div>

        {/* Live Souk Ticker Pill */}
        <div
          onClick={() => navigate('goldPriceDetail')}
          style={{
            background: '#FEF3C7',
            border: '1px solid #FDE68A',
            borderRadius: 20,
            padding: '4px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            cursor: 'pointer',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#92400E' }}>
            24K AED {DUBAI_MARKET_RATES.rate24K.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        {/* Demo banner */}
        <div className="demo-banner">DUBAI FINTECH PROTOTYPE • GULLAK THEME</div>

        {/* ── 2. Gullak Signature Hero Gold Wealth Card ────────────── */}
        <div
          className="card-navy"
          style={{
            borderRadius: 18,
            padding: '18px 20px',
            marginBottom: 14,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top Row: Label & Purity Badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>
              Total Gold Wealth
            </span>
            <span
              style={{
                background: 'rgba(245, 158, 11, 0.2)',
                color: '#FBBF24',
                fontSize: 10,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 10,
                border: '1px solid rgba(245, 158, 11, 0.3)',
              }}
            >
              24K 999.9 DGD
            </span>
          </div>

          {/* Amount & Grams */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 8 }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', letterSpacing: -0.5 }}>
                {formatCurrency(currentValue)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#F59E0B' }}>
                  {formatGrams(state.holdings.totalGrams)} grams
                </span>
                <span style={{ color: '#94A3B8', fontSize: 12 }}>•</span>
                <span style={{ fontSize: 12, color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TrendingUp size={12} />
                  <span>+0.75% today</span>
                </span>
              </div>
            </div>

            <div style={{ width: 56, height: 56, flexShrink: 0 }}>
              <GoldBarIllustration size={56} />
            </div>
          </div>

          {/* Active Lease Tracker */}
          {state.holdings.leasedGrams > 0 && (
            <div
              onClick={() => navigate('lease')}
              style={{
                background: 'rgba(124, 58, 237, 0.2)',
                border: '1px solid rgba(124, 58, 237, 0.4)',
                borderRadius: 8,
                padding: '6px 10px',
                marginTop: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#DDD6FE' }}>
                <Percent size={13} color="#C4B5FD" />
                <span><strong>{state.holdings.leasedGrams.toFixed(2)}g</strong> earning 5.2% p.a. yield</span>
              </div>
              <ChevronRight size={14} color="#DDD6FE" />
            </div>
          )}

          {/* Dual Action Buttons (Side by Side) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: 10,
              marginTop: 16,
              paddingTop: 14,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <button
              onClick={() => navigate('buy')}
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#0F172A',
                border: 'none',
                borderRadius: 12,
                height: 42,
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)',
              }}
            >
              <Zap size={15} fill="#0F172A" />
              <span>Instant Buy</span>
            </button>

            <button
              onClick={() => navigate('sell')}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#FFF',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 12,
                height: 42,
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <ArrowUpCircle size={15} />
              <span>Sell Gold</span>
            </button>
          </div>
        </div>

        {/* ── 3. Gullak Daily Savings Streak Card ─────────────────── */}
        <div
          style={{
            background: '#FFF7ED',
            border: '1px solid #FED7AA',
            borderRadius: 14,
            padding: '12px 14px',
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: '#FFEDD5',
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
              boxShadow: '0 2px 6px rgba(234, 88, 12, 0.3)',
            }}
          >
            Save AED 20
          </button>
        </div>

        {/* ── 4. Gullak 8-Service Symmetrical Grid ─────────────────── */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.darkCharcoal, marginBottom: 8, paddingLeft: 2 }}>
            Services & FinTech Features
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 8,
            }}
          >
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.screen)}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    padding: '12px 4px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    cursor: 'pointer',
                    position: 'relative',
                    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
                    transition: 'transform 0.15s',
                  }}
                >
                  {action.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: -5,
                        right: -3,
                        background: '#7C3AED',
                        color: '#FFF',
                        fontSize: 8,
                        fontWeight: 800,
                        padding: '1px 5px',
                        borderRadius: 6,
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
                      background: action.bg,
                      color: action.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 600,
                      color: '#0F172A',
                      textAlign: 'center',
                      lineHeight: 1.2,
                    }}
                  >
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 5. Gullak Gold+ Leasing Hero Card ───────────────────── */}
        <div
          onClick={() => navigate('lease')}
          style={{
            background: 'linear-gradient(135deg, #2E1065 0%, #1E1B4B 100%)',
            border: '1.5px solid #A855F7',
            borderRadius: 14,
            padding: '14px 16px',
            color: '#FFF',
            marginBottom: 14,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 14px rgba(124, 58, 237, 0.25)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span
                style={{
                  background: '#A855F7',
                  color: '#FFF',
                  fontSize: 9,
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
              Lease to top Dubai jewellers (Damas, Joyalukkas) with 100% bank guarantees.
            </div>
          </div>
          <ChevronRight size={18} color="#E9D5FF" />
        </div>

        {/* ── 6. Gullak Active Goal Progress Card ─────────────────── */}
        {state.goals.length > 0 && (
          <div
            onClick={() => navigate('goals')}
            className="card"
            style={{
              padding: '14px 16px',
              marginBottom: 14,
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Target size={16} color="#0284C7" />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>
                  {state.goals[0].title}
                </span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#F59E0B' }}>
                {Math.round((state.goals[0].currentGrams / state.goals[0].targetGrams) * 100)}%
              </span>
            </div>

            <div
              style={{
                width: '100%',
                height: 6,
                background: '#E2E8F0',
                borderRadius: 4,
                overflow: 'hidden',
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: `${Math.min(100, (state.goals[0].currentGrams / state.goals[0].targetGrams) * 100)}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #F59E0B, #FBBF24)',
                  borderRadius: 4,
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748B' }}>
              <span>{state.goals[0].currentGrams.toFixed(1)}g accumulated</span>
              <span>Target: {state.goals[0].targetGrams}g</span>
            </div>
          </div>
        )}

        {/* ── 7. SafeGold Vault Security Card ──────────────────────── */}
        <div
          onClick={() => navigate('vaultProof')}
          className="card"
          style={{
            padding: '12px 14px',
            marginBottom: 14,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={18} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>
                100% Vaulted at Brink's DMCC & Transguard
              </div>
              <div style={{ fontSize: 10.5, color: '#64748B' }}>
                Independent physical audit by BDO Dubai • Verified 1:1
              </div>
            </div>
          </div>
          <ChevronRight size={16} color="#64748B" />
        </div>

        {/* ── 8. Live Souk Chart Card ─────────────────────────────── */}
        <div
          className="card"
          style={{
            padding: '14px 16px',
            marginBottom: 14,
            cursor: 'pointer',
          }}
          onClick={() => navigate('goldPriceDetail')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>
                Dubai Gold Souk Benchmark
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginTop: 2 }}>
                AED {DEMO_GOLD_RATE.toFixed(2)} /g
              </div>
              <div style={{ fontSize: 11, color: '#10B981', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontWeight: 600 }}>
                <TrendingUp size={12} />
                <span>+0.75% today (24K 999.9 Fine)</span>
              </div>
            </div>
            <MiniLineChart />
          </div>
        </div>

        {/* ── 9. Recent Activity List ──────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: 0 }}>
            Recent Activity
          </h3>
          <button
            onClick={() => navigate('transactions')}
            style={{
              background: 'none',
              border: 'none',
              color: '#D97706',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <span>View All</span>
            <ChevronRight size={13} />
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
    <div className="txn-row" onClick={onClick}>
      <div className={`txn-icon ${txn.type}`}>
        <Icon size={17} />
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

// ============================================
// YASS Gold & Bullion — Executive Dashboard
// High-End Mobile UI with SafeGold, Gullak & OGold Features
// A Product by YASS Group, Dubai
// ============================================

import React, { useMemo } from 'react';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Package,
  ShieldCheck,
  TrendingUp,
  ChevronRight,
  Truck,
  CheckCircle2,
  Calendar,
  Percent,
  Target,
  Gift,
  Sparkles,
  CreditCard,
  Bell,
  Flame,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { GoldBarIllustration } from '../components/BrandLogo';
import { DUBAI_MARKET_RATES, DEMO_GOLD_RATE, DEMO_SILVER_RATE } from '../constants';
import type { Transaction } from '../types';

function formatCurrency(value: number): string {
  return (
    'AED ' +
    value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
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

export const DashboardScreen: React.FC = () => {
  const { state, navigate } = useApp();
  const userName = state.user?.fullName || 'Tariq Al Mansoori';
  const firstName = userName.split(' ')[0];

  const totalGoldValuation = useMemo(
    () => state.holdings.totalGrams * DEMO_GOLD_RATE,
    [state.holdings.totalGrams]
  );

  const totalSilverValuation = useMemo(
    () => state.holdings.silverGrams * DEMO_SILVER_RATE,
    [state.holdings.silverGrams]
  );

  const totalVaultValue = totalGoldValuation + totalSilverValuation;

  const recentTransactions = useMemo(
    () => state.holdings.transactions.slice(0, 3),
    [state.holdings.transactions]
  );

  const activeGoal = state.goals[0] || {
    title: 'Dubai Property Bullion Reserve',
    currentGrams: 18.5,
    targetGrams: 50.0,
  };
  const goalPercent = Math.min(
    100,
    Math.round((activeGoal.currentGrams / activeGoal.targetGrams) * 100)
  );

  const activeSIP = state.sips.find((s) => s.status === 'active') || state.sips[0];

  return (
    <div className="screen-container">
      {/* ── 1. Clean Mobile Header with Quick Tickers ───────────── */}
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
        {/* User Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => navigate('profile')}
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: '#FEFBF2',
              color: '#B8860B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 13,
              border: '1.5px solid #EED8A1',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'transform 0.15s ease',
            }}
          >
            {getInitials(userName)}
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>
                Hi, {firstName} 👋
              </span>
              <span
                style={{
                  background: '#ECFDF5',
                  color: '#059669',
                  fontSize: 9.5,
                  fontWeight: 800,
                  padding: '1px 6px',
                  borderRadius: 4,
                  border: '1px solid #A7F3D0',
                }}
              >
                UAE PASS
              </span>
            </div>
            <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>
              YASS Bullion Dubai
            </div>
          </div>
        </div>

        {/* Live Dubai Souk Benchmark Pill & Alert Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            onClick={() => navigate('goldPriceDetail')}
            style={{
              background: '#FEFBF2',
              border: '1px solid #EED8A1',
              borderRadius: 20,
              padding: '5px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#059669',
                display: 'inline-block',
              }}
            />
            <span style={{ fontSize: 11, fontWeight: 800, color: '#854D0E' }}>
              24K AED {DUBAI_MARKET_RATES.rate24K.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => navigate('goldPriceDetail')}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Price Alerts"
          >
            <Bell size={15} />
          </button>
        </div>
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        {/* ── 2. Clean Executive Vault Wealth Hero Card ───────── */}
        <div className="card-gold" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#854D0E', textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 800 }}>
              Total Vaulted Wealth
            </span>
            <span
              style={{
                background: '#FFFFFF',
                color: '#854D0E',
                fontSize: 10,
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: 6,
                border: '1px solid #EED8A1',
              }}
            >
              24K 999.9 FINE GOLD
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 10 }}>
            <div>
              <div style={{ fontSize: 30, fontWeight: 900, color: '#0F172A', letterSpacing: -0.5 }}>
                {formatCurrency(totalVaultValue)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#B8860B' }}>
                  {state.holdings.totalGrams.toFixed(4)} grams
                </span>
                <span style={{ color: '#CBD5E1' }}>•</span>
                <span style={{ fontSize: 12, color: '#059669', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TrendingUp size={13} />
                  <span>+0.75% today</span>
                </span>
              </div>
            </div>

            <div style={{ width: 56, height: 56, flexShrink: 0 }}>
              <GoldBarIllustration size={56} />
            </div>
          </div>

          {/* Metal Split Sub-Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 14,
              paddingTop: 12,
              borderTop: '1px solid #F1E1B8',
              fontSize: 11.5,
              color: '#64748B',
            }}
          >
            <span>
              24K Gold: <strong style={{ color: '#0F172A' }}>{state.holdings.totalGrams.toFixed(2)}g</strong> ({formatCurrency(totalGoldValuation)})
            </span>
            <span>
              .999 Silver: <strong style={{ color: '#0F172A' }}>{state.holdings.silverGrams.toFixed(0)}g</strong> ({formatCurrency(totalSilverValuation)})
            </span>
          </div>
        </div>

        {/* ── 3. Primary Action Trio (Instant Buy, Get Bullion, Sell) ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 10,
            marginBottom: 16,
          }}
        >
          {/* Buy Gold */}
          <button
            onClick={() => navigate('buy')}
            className="feature-tile"
          >
            <div
              className="feature-tile-icon"
              style={{
                background: '#ECFDF5',
                color: '#059669',
                border: '1px solid #A7F3D0',
              }}
            >
              <ArrowDownCircle size={22} />
            </div>
            <div>
              <div className="feature-tile-label">Buy Gold</div>
              <div className="feature-tile-sub">From AED 10</div>
            </div>
          </button>

          {/* Physical Delivery (Core Client Feature) */}
          <button
            onClick={() => navigate('delivery')}
            className="feature-tile"
            style={{
              background: '#FEFBF2',
              borderColor: '#EED8A1',
              boxShadow: '0 2px 8px rgba(197, 155, 39, 0.12)',
            }}
          >
            <div
              className="feature-tile-icon"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                color: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(212, 175, 55, 0.35)',
              }}
            >
              <Package size={22} />
            </div>
            <div>
              <div className="feature-tile-label" style={{ color: '#854D0E', fontWeight: 800 }}>
                Get Bullion
              </div>
              <div className="feature-tile-sub" style={{ color: '#B8860B' }}>
                1g–1kg Bars
              </div>
            </div>
          </button>

          {/* Sell to Bank */}
          <button
            onClick={() => navigate('sell')}
            className="feature-tile"
          >
            <div
              className="feature-tile-icon"
              style={{
                background: '#FEF2F2',
                color: '#DC2626',
                border: '1px solid #FECACA',
              }}
            >
              <ArrowUpCircle size={22} />
            </div>
            <div>
              <div className="feature-tile-label">Sell to Cash</div>
              <div className="feature-tile-sub" style={{ color: '#DC2626' }}>Instant Bank</div>
            </div>
          </button>
        </div>

        {/* ── 4. Gullak, SafeGold & OGold Signature Features Hub ── */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <h3 style={{ fontSize: 13.5, fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Bullion Services & Wealth Hub
            </h3>
            <span style={{ fontSize: 11, color: '#B8860B', fontWeight: 700 }}>
              Dubai DMCC Accredited
            </span>
          </div>

          {/* 6-Grid Feature Tiles */}
          <div className="feature-grid">
            {/* 1. Daily Auto-Save (Gullak AutoPay / SafeGold SIP) */}
            <div
              className="feature-tile"
              onClick={() => navigate('sip')}
            >
              <span className="feature-tile-badge">🔥 AUTO</span>
              <div
                className="feature-tile-icon"
                style={{ background: '#FFF7ED', color: '#EA580C', border: '1px solid #FFEDD5' }}
              >
                <Calendar size={20} />
              </div>
              <div>
                <div className="feature-tile-label">Daily Auto-Save</div>
                <div className="feature-tile-sub">From AED 10/day</div>
              </div>
            </div>

            {/* 2. Wakala Yield / Gold Lease (Gullak Gold+ / SafeGold Lease) */}
            <div
              className="feature-tile"
              onClick={() => navigate('lease')}
            >
              <span className="feature-tile-badge" style={{ background: '#EEF2FF', color: '#4F46E5', borderColor: '#C7D2FE' }}>
                +4.8% APR
              </span>
              <div
                className="feature-tile-icon"
                style={{ background: '#F5F3FF', color: '#7C3AED', border: '1px solid #DDD6FE' }}
              >
                <Percent size={20} />
              </div>
              <div>
                <div className="feature-tile-label">Wakala Earn</div>
                <div className="feature-tile-sub" style={{ color: '#7C3AED' }}>Pure Gold Yield</div>
              </div>
            </div>

            {/* 3. Savings Goals (Gullak Goals / Piggy Bank) */}
            <div
              className="feature-tile"
              onClick={() => navigate('goals')}
            >
              <div
                className="feature-tile-icon"
                style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE' }}
              >
                <Target size={20} />
              </div>
              <div>
                <div className="feature-tile-label">Savings Goals</div>
                <div className="feature-tile-sub" style={{ color: '#2563EB' }}>Target Vault</div>
              </div>
            </div>

            {/* 4. Gift 24K Gold (SafeGold Shagun / Luxury Gifting) */}
            <div
              className="feature-tile"
              onClick={() => navigate('gift')}
            >
              <div
                className="feature-tile-icon"
                style={{ background: '#FEFBF2', color: '#B8860B', border: '1px solid #F3E8C8' }}
              >
                <Gift size={20} />
              </div>
              <div>
                <div className="feature-tile-label">Gift 24K Gold</div>
                <div className="feature-tile-sub">Occasion Cards</div>
              </div>
            </div>

            {/* 5. Daily Spin & Win (OGold Daily Luck / Gullak Rewards) */}
            <div
              className="feature-tile"
              onClick={() => navigate('rewards')}
            >
              <span className="feature-tile-badge" style={{ background: '#FEF2F2', color: '#DC2626', borderColor: '#FECACA' }}>
                FREE
              </span>
              <div
                className="feature-tile-icon"
                style={{ background: '#FEF9C3', color: '#CA8A04', border: '1px solid #FEF08A' }}
              >
                <Sparkles size={20} />
              </div>
              <div>
                <div className="feature-tile-label">Spin & Win</div>
                <div className="feature-tile-sub" style={{ color: '#CA8A04' }}>Daily Milligrams</div>
              </div>
            </div>

            {/* 6. Bullion Spending Card (OGold Visa/Mastercard) */}
            <div
              className="feature-tile"
              onClick={() => navigate('card')}
            >
              <div
                className="feature-tile-icon"
                style={{ background: '#F8FAFC', color: '#334155', border: '1px solid #E2E8F0' }}
              >
                <CreditCard size={20} />
              </div>
              <div>
                <div className="feature-tile-label">Bullion Card</div>
                <div className="feature-tile-sub" style={{ color: '#334155' }}>Spend at POS</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 5. Active Auto-Save & Goal Progress (Gullak Widget) ─ */}
        <div
          onClick={() => navigate('goals')}
          className="card card-interactive"
          style={{ marginBottom: 16, padding: '14px 16px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: '#EFF6FF',
                  color: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Target size={16} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>
                  {activeGoal.title}
                </div>
                <div style={{ fontSize: 11, color: '#64748B' }}>
                  {activeGoal.currentGrams.toFixed(1)}g of {activeGoal.targetGrams}g target reached
                </div>
              </div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 900, color: '#2563EB' }}>
              {goalPercent}%
            </span>
          </div>

          {/* Goal Progress bar */}
          <div
            style={{
              width: '100%',
              height: 6,
              background: '#F1F5F9',
              borderRadius: 3,
              overflow: 'hidden',
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: `${goalPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #3B82F6, #2563EB)',
                borderRadius: 3,
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: '#64748B' }}>
            <span>
              {activeSIP ? (
                <>🔄 {activeSIP.nickname}: <strong>AED {activeSIP.amount}/{activeSIP.frequency}</strong></>
              ) : (
                'Set up Daily Micro-Savings'
              )}
            </span>
            <span style={{ color: '#2563EB', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
              <span>View Goal</span>
              <ChevronRight size={12} />
            </span>
          </div>
        </div>

        {/* ── 6. Doorstep Physical Bullion Delivery Banner ─────── */}
        <div
          onClick={() => navigate('delivery')}
          className="card card-interactive"
          style={{
            border: '1.5px solid #EED8A1',
            padding: '16px',
            marginBottom: 16,
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FEFBF2 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: '#FEFBF2',
                  border: '1px solid #EED8A1',
                  color: '#B8860B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Truck size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Doorstep Physical Bullion Delivery
                  </h3>
                  <span
                    style={{
                      background: '#ECFDF5',
                      color: '#059669',
                      fontSize: 9.5,
                      fontWeight: 800,
                      padding: '1px 6px',
                      borderRadius: 4,
                    }}
                  >
                    100% INSURED
                  </span>
                </div>
                <p style={{ fontSize: 11.5, color: '#64748B', lineHeight: 1.4, marginTop: 4 }}>
                  Minted 24K 999.9 Good Delivery bars & coins in tamper-evident assay certicards. Insured courier across Dubai and all 7 Emirates.
                </p>
              </div>
            </div>
            <ChevronRight size={18} color="#B8860B" />
          </div>

          <div
            style={{
              display: 'flex',
              gap: 12,
              marginTop: 12,
              paddingTop: 10,
              borderTop: '1px solid #F1F5F9',
              fontSize: 11,
              color: '#059669',
              fontWeight: 700,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <CheckCircle2 size={13} /> 1g to 1kg Bars
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <CheckCircle2 size={13} /> Sealed Certicard
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <CheckCircle2 size={13} /> Transguard Armoured
            </span>
          </div>
        </div>

        {/* ── 7. Daily Savings Streak & Spin Reward Banner ────── */}
        <div
          onClick={() => navigate('rewards')}
          className="card card-interactive"
          style={{
            padding: '12px 14px',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FFF7ED',
            border: '1px solid #FED7AA',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: '#EA580C',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Flame size={20} />
            </div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: '#9A3412' }}>
                6-Day Bullion Savings Streak!
              </div>
              <div style={{ fontSize: 11, color: '#C2410C' }}>
                +35mg Gold Earned • Tap to spin today’s free daily wheel
              </div>
            </div>
          </div>
          <ChevronRight size={16} color="#EA580C" />
        </div>

        {/* ── 8. Vault Custody & Certificate Verification ──────── */}
        <div
          onClick={() => navigate('vaultProof')}
          className="card card-interactive"
          style={{
            padding: '12px 14px',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A' }}>
                100% Backed at Brink's DMCC Dubai
              </div>
              <div style={{ fontSize: 10.5, color: '#64748B' }}>
                Quarterly physical audit by BDO Dubai • Verified 1:1 allocated
              </div>
            </div>
          </div>
          <ChevronRight size={16} color="#64748B" />
        </div>

        {/* ── 9. Recent Activity ──────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h3 style={{ fontSize: 13.5, fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Recent Activity
          </h3>
          <button
            onClick={() => navigate('transactions')}
            style={{
              background: 'none',
              border: 'none',
              color: '#B8860B',
              fontSize: 12,
              fontWeight: 800,
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

const TransactionRow: React.FC<{ txn: Transaction; onClick?: () => void }> = ({ txn, onClick }) => {
  const isCredit = txn.type === 'buy' || txn.type === 'sip' || txn.type === 'spin_reward';

  const getIcon = () => {
    switch (txn.type) {
      case 'buy':
        return ArrowDownCircle;
      case 'sell':
        return ArrowUpCircle;
      case 'redemption':
        return Package;
      case 'spin_reward':
        return Sparkles;
      case 'card_spend':
        return CreditCard;
      default:
        return ArrowDownCircle;
    }
  };

  const getLabel = () => {
    switch (txn.type) {
      case 'buy':
        return '24K Gold Purchase';
      case 'sell':
        return 'Gold Sold to Bank';
      case 'redemption':
        return 'Physical Bullion Dispatched';
      case 'spin_reward':
        return 'Spin & Win Free Gold';
      case 'card_spend':
        return 'Bullion Card Payment';
      default:
        return txn.meta || 'Transaction';
    }
  };

  const Icon = getIcon();

  return (
    <div className="txn-row" onClick={onClick}>
      <div className={`txn-icon ${txn.type}`}>
        <Icon size={17} />
      </div>

      <div className="txn-details">
        <div className="txn-type">{getLabel()}</div>
        <div className="txn-date">{formatDate(txn.date)}</div>
      </div>

      <div className="txn-amounts">
        <div className={`txn-grams ${isCredit ? 'positive' : 'negative'}`}>
          {isCredit ? '+' : '−'}
          {txn.goldGrams.toFixed(4)} g
        </div>
        <div className="txn-rupees">{formatCurrency(txn.amount)}</div>
      </div>
    </div>
  );
};

export default DashboardScreen;

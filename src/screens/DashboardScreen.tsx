// ============================================
// OGold Wallet — Executive Home & Dual Metal Dashboard
// The Precious Metals & Lifestyle Super App (Dubai, UAE)
// App Store ID: 6504926022
// ============================================

import React, { useMemo } from 'react';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Send,
  Package,
  CreditCard,
  Percent,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ChevronRight,
  Gift,
  RefreshCw,
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

  const goldValueAED = useMemo(
    () => state.holdings.totalGrams * DEMO_GOLD_RATE,
    [state.holdings.totalGrams]
  );

  const silverValueAED = useMemo(
    () => state.holdings.silverGrams * DEMO_SILVER_RATE,
    [state.holdings.silverGrams]
  );

  const totalPortfolioAED = goldValueAED + silverValueAED;

  const recentTransactions = useMemo(
    () => state.holdings.transactions.slice(0, 5),
    [state.holdings.transactions]
  );

  return (
    <div className="screen-container">
      {/* ── 1. Top App Header ───────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: '#0A0D14',
          borderBottom: '1px solid #1E293B',
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
              background: '#161D2D',
              color: '#F59E0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 13,
              border: '2px solid rgba(245, 158, 11, 0.4)',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {getInitials(userName)}
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: '#FFFFFF' }}>
                Hi, {firstName} 👋
              </span>
              <span
                style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10B981',
                  fontSize: 9.5,
                  fontWeight: 800,
                  padding: '1px 6px',
                  borderRadius: 6,
                }}
              >
                UAE PASS
              </span>
            </div>
            <div style={{ fontSize: 10.5, color: '#94A3B8', fontWeight: 500 }}>
              OGold Wallet Dubai
            </div>
          </div>
        </div>

        {/* Live Spot Rates Pill */}
        <div
          onClick={() => navigate('goldPriceDetail')}
          style={{
            background: '#161D2D',
            border: '1px solid #1E293B',
            borderRadius: 20,
            padding: '5px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#10B981',
              boxShadow: '0 0 6px #10B981',
            }}
          />
          <div style={{ display: 'flex', gap: 8, fontSize: 10, fontWeight: 700 }}>
            <span style={{ color: '#FBBF24' }}>
              AU AED {DUBAI_MARKET_RATES.rate24K.toFixed(1)}
            </span>
            <span style={{ color: '#94A3B8' }}>
              AG AED {DUBAI_MARKET_RATES.rateSilver999.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        {/* ── 2. Dual-Metal Executive Wealth Card ─────────────── */}
        <div className="card-gold-glow" style={{ marginBottom: 14 }}>
          {/* Top Row: Portfolio Title & DMCC Purity */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 700 }}>
              Total Precious Metals Vault
            </span>
            <span
              style={{
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#FBBF24',
                fontSize: 9.5,
                fontWeight: 800,
                padding: '2px 7px',
                borderRadius: 6,
                border: '1px solid rgba(245, 158, 11, 0.3)',
              }}
            >
              100% DNI INSURED
            </span>
          </div>

          {/* Big Portfolio Balance */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 8 }}>
            <div>
              <div style={{ fontSize: 29, fontWeight: 900, color: '#FFFFFF', letterSpacing: -0.5 }}>
                {formatCurrency(totalPortfolioAED)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <span style={{ fontSize: 11.5, color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <TrendingUp size={13} />
                  <span>+0.85% today across metals</span>
                </span>
              </div>
            </div>

            <div style={{ width: 52, height: 52, flexShrink: 0 }}>
              <GoldBarIllustration size={52} />
            </div>
          </div>

          {/* Dual Metal Vault Breakdown */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
              marginTop: 14,
              paddingTop: 12,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Gold Vault */}
            <div
              onClick={() => navigate('buy')}
              style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: 10,
                padding: '8px 10px',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#FBBF24', letterSpacing: 0.5 }}>
                  24K GOLD
                </span>
                <span style={{ fontSize: 9.5, color: '#10B981', fontWeight: 700 }}>+0.75%</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF', marginTop: 3 }}>
                {state.holdings.totalGrams.toFixed(4)} g
              </div>
              <div style={{ fontSize: 10.5, color: '#94A3B8', marginTop: 1 }}>
                {formatCurrency(goldValueAED)}
              </div>
            </div>

            {/* Silver Vault */}
            <div
              onClick={() => navigate('buy')}
              style={{
                background: 'rgba(148, 163, 184, 0.08)',
                border: '1px solid rgba(148, 163, 184, 0.25)',
                borderRadius: 10,
                padding: '8px 10px',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#E2E8F0', letterSpacing: 0.5 }}>
                  .999 SILVER
                </span>
                <span style={{ fontSize: 9.5, color: '#10B981', fontWeight: 700 }}>+1.20%</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF', marginTop: 3 }}>
                {state.holdings.silverGrams.toFixed(1)} g
              </div>
              <div style={{ fontSize: 10.5, color: '#94A3B8', marginTop: 1 }}>
                {formatCurrency(silverValueAED)}
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. The 4 Big Core Action Buttons ────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 8,
            marginBottom: 16,
          }}
        >
          {/* Buy */}
          <button
            onClick={() => navigate('buy')}
            style={{
              background: '#161D2D',
              border: '1px solid #1E293B',
              borderRadius: 14,
              padding: '12px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowDownCircle size={20} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#FFFFFF' }}>Buy Metal</span>
          </button>

          {/* Sell */}
          <button
            onClick={() => navigate('sell')}
            style={{
              background: '#161D2D',
              border: '1px solid #1E293B',
              borderRadius: 14,
              padding: '12px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowUpCircle size={20} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#FFFFFF' }}>Sell Cash</span>
          </button>

          {/* Send / Transfer */}
          <button
            onClick={() => navigate('gift')}
            style={{
              background: '#161D2D',
              border: '1px solid #1E293B',
              borderRadius: 14,
              padding: '12px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Send size={18} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#FFFFFF' }}>Transfer</span>
          </button>

          {/* Redeem Physical */}
          <button
            onClick={() => navigate('delivery')}
            style={{
              background: '#161D2D',
              border: '1px solid #1E293B',
              borderRadius: 14,
              padding: '12px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'rgba(139, 92, 246, 0.15)',
                color: '#A78BFA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Package size={18} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#FFFFFF' }}>Bullion</span>
          </button>
        </div>

        {/* ── 4. Signature OGold Mastercard Spend Widget ───────── */}
        <div
          onClick={() => navigate('card')}
          style={{
            background: 'linear-gradient(135deg, #1C1810 0%, #121824 100%)',
            border: '1.5px solid rgba(245, 158, 11, 0.4)',
            borderRadius: 16,
            padding: '14px 16px',
            marginBottom: 14,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 18px rgba(0,0,0,0.4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)',
                color: '#0A0D14',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
              }}
            >
              <CreditCard size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 13.5, fontWeight: 800, color: '#FFFFFF' }}>
                  OGold Platinum Mastercard
                </span>
                <span
                  style={{
                    background: 'rgba(245, 158, 11, 0.15)',
                    color: '#FBBF24',
                    fontSize: 8.5,
                    fontWeight: 800,
                    padding: '2px 5px',
                    borderRadius: 4,
                  }}
                >
                  ACTIVE
                </span>
              </div>
              <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>
                Spend gold globally with Apple Pay & auto-conversion
              </div>
            </div>
          </div>

          <ChevronRight size={18} color="#94A3B8" />
        </div>

        {/* ── 5. Wakala Sharia Yield Banner (4.8% APR) ────────── */}
        <div
          onClick={() => navigate('lease')}
          style={{
            background: 'linear-gradient(135deg, #182238 0%, #101522 100%)',
            border: '1px solid #1E293B',
            borderRadius: 14,
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
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'rgba(139, 92, 246, 0.15)',
                color: '#A78BFA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Percent size={18} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF' }}>
                OGold Earn (Wakala Pools)
              </div>
              <div style={{ fontSize: 11, color: '#94A3B8' }}>
                Earn 4.8% APR in pure 24K gold grams • Monthly payouts
              </div>
            </div>
          </div>

          <span
            style={{
              background: '#8B5CF6',
              color: '#FFFFFF',
              fontSize: 10.5,
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: 6,
            }}
          >
            4.8% APR
          </span>
        </div>

        {/* ── 6. Daily Spin & Win Quick Card ──────────────────── */}
        {state.user?.spinsAvailable ? (
          <div
            onClick={() => navigate('rewards')}
            style={{
              background: 'linear-gradient(135deg, #241D12 0%, #161D2D 100%)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              borderRadius: 14,
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
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'rgba(245, 158, 11, 0.2)',
                  color: '#FBBF24',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Sparkles size={18} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#FBBF24' }}>
                  🎡 1 Daily Spin Ready!
                </div>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>
                  Spin the lucky wheel now to win free gold & silver
                </div>
              </div>
            </div>

            <ChevronRight size={18} color="#FBBF24" />
          </div>
        ) : null}

        {/* ── 7. Depository & DNI Insurance Proof ─────────────── */}
        <div
          onClick={() => navigate('vaultProof')}
          className="card"
          style={{
            padding: '12px 14px',
            marginBottom: 16,
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
                borderRadius: 8,
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={18} />
            </div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#FFFFFF' }}>
                100% Physical Custody at Brink's DMCC
              </div>
              <div style={{ fontSize: 10.5, color: '#94A3B8' }}>
                Insured by Dubai National Insurance (DNI) • BDO Audited
              </div>
            </div>
          </div>
          <ChevronRight size={16} color="#64748B" />
        </div>

        {/* ── 8. Recent Activity ──────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
            Recent Activity
          </h3>
          <button
            onClick={() => navigate('transactions')}
            style={{
              background: 'none',
              border: 'none',
              color: '#F59E0B',
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

const TransactionRow: React.FC<{ txn: Transaction; onClick?: () => void }> = ({ txn, onClick }) => {
  const isCredit = txn.type === 'buy' || txn.type === 'sip' || txn.type === 'spin_reward';

  const getIcon = () => {
    switch (txn.type) {
      case 'buy':
        return ArrowDownCircle;
      case 'sell':
        return ArrowUpCircle;
      case 'sip':
        return RefreshCw;
      case 'card_spend':
        return CreditCard;
      case 'spin_reward':
        return Sparkles;
      case 'gift':
        return Gift;
      default:
        return Package;
    }
  };

  const getLabel = () => {
    switch (txn.type) {
      case 'buy':
        return `Bought ${txn.metal === 'gold' ? '24K Gold' : '.999 Silver'}`;
      case 'sell':
        return `Sold ${txn.metal === 'gold' ? 'Gold' : 'Silver'}`;
      case 'card_spend':
        return 'Mastercard Spend';
      case 'spin_reward':
        return 'Spin & Win Reward';
      case 'sip':
        return 'Auto-Invest Deposit';
      case 'gift':
        return 'Transferred Gold';
      default:
        return 'Bullion Delivery';
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

// ============================================
// YASS Gold & Bullion — Executive Dashboard
// White + Gold Standard & Clean Professional UI
// Core Focus: Digital Gold & Doorstep Physical Delivery
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
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { GoldBarIllustration } from '../components/BrandLogo';
import { DUBAI_MARKET_RATES, DEMO_GOLD_RATE } from '../constants';
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

  const totalVaultValue = useMemo(
    () => state.holdings.totalGrams * DEMO_GOLD_RATE,
    [state.holdings.totalGrams]
  );

  const recentTransactions = useMemo(
    () => state.holdings.transactions.slice(0, 4),
    [state.holdings.transactions]
  );

  return (
    <div className="screen-container">
      {/* ── 1. Clean Top Header ──────────────────────────────── */}
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
              background: '#FEFBF2',
              color: '#A67C1E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 13,
              border: '1.5px solid #EED8A1',
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
            <div style={{ fontSize: 11, color: '#64748B', fontWeight: 500 }}>
              YASS Gold & Bullion Dubai
            </div>
          </div>
        </div>

        {/* Live Dubai Souk Benchmark Pill */}
        <div
          onClick={() => navigate('goldPriceDetail')}
          style={{
            background: '#FEFBF2',
            border: '1px solid #EED8A1',
            borderRadius: 20,
            padding: '5px 11px',
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
              background: '#059669',
            }}
          />
          <span style={{ fontSize: 11, fontWeight: 800, color: '#8F6914' }}>
            24K AED {DUBAI_MARKET_RATES.rate24K.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        {/* ── 2. Clean Executive Gold Vault Wealth Card ─────────── */}
        <div className="card-gold" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 700 }}>
              Total Vaulted Wealth
            </span>
            <span
              style={{
                background: '#FFFFFF',
                color: '#8F6914',
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
                <span style={{ fontSize: 15, fontWeight: 700, color: '#A67C1E' }}>
                  {state.holdings.totalGrams.toFixed(4)} grams
                </span>
                <span style={{ color: '#CBD5E1' }}>•</span>
                <span style={{ fontSize: 12, color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TrendingUp size={13} />
                  <span>+0.75% today</span>
                </span>
              </div>
            </div>

            <div style={{ width: 60, height: 60, flexShrink: 0 }}>
              <GoldBarIllustration size={60} />
            </div>
          </div>

          {/* Quick Stats Footnote */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 14,
              paddingTop: 12,
              borderTop: '1px solid #EED8A1',
              fontSize: 11.5,
              color: '#64748B',
            }}
          >
            <span>Physically Allocated: <strong>100% Backed</strong></span>
            <span>Vault: <strong>Brink’s DMCC Dubai</strong></span>
          </div>
        </div>

        {/* ── 3. The 3 Core Action Buttons (Digital Gold & Physical) ─ */}
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
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 14,
              padding: '14px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
              transition: 'border-color 0.15s ease',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowDownCircle size={22} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>Buy Gold</span>
          </button>

          {/* Physical Delivery (Core Client Feature) */}
          <button
            onClick={() => navigate('delivery')}
            style={{
              background: '#FEFBF2',
              border: '1.5px solid #EED8A1',
              borderRadius: 14,
              padding: '14px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(197, 155, 39, 0.1)',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Package size={22} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#8F6914' }}>Get Bullion</span>
          </button>

          {/* Sell to Cash */}
          <button
            onClick={() => navigate('sell')}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 14,
              padding: '14px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
              transition: 'border-color 0.15s ease',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: '#FEF2F2',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowUpCircle size={22} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>Sell to Cash</span>
          </button>
        </div>

        {/* ── 4. Main Client Feature: Physical Bullion Delivery Banner ── */}
        <div
          onClick={() => navigate('delivery')}
          style={{
            background: '#FFFFFF',
            border: '1.5px solid #EED8A1',
            borderRadius: 14,
            padding: '16px',
            marginBottom: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: '#FEFBF2',
                  border: '1px solid #EED8A1',
                  color: '#A67C1E',
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
                    Doorstep Bullion Delivery
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
                  Convert your digital gold into certified 24K minted coins & bars. Sealed in tamper-proof assay certicards delivered via Transguard armoured logistics.
                </p>
              </div>
            </div>
            <ChevronRight size={18} color="#A67C1E" />
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
              fontWeight: 600,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <CheckCircle2 size={13} /> 1g to 1kg Minted Bars
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <CheckCircle2 size={13} /> Tamper-Proof Certicard
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <CheckCircle2 size={13} /> UAE Wide 48h
            </span>
          </div>
        </div>

        {/* ── 5. Vault Custody & Certificate Verification ──────── */}
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
                100% Physically Vaulted at Brink's DMCC
              </div>
              <div style={{ fontSize: 10.5, color: '#64748B' }}>
                Quarterly independent physical audit by BDO Dubai • Verified 1:1
              </div>
            </div>
          </div>
          <ChevronRight size={16} color="#64748B" />
        </div>

        {/* ── 6. Recent Activity ──────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#0F172A', margin: 0 }}>
            Recent Activity
          </h3>
          <button
            onClick={() => navigate('transactions')}
            style={{
              background: 'none',
              border: 'none',
              color: '#A67C1E',
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
  const isCredit = txn.type === 'buy' || txn.type === 'sip';

  const getIcon = () => {
    switch (txn.type) {
      case 'buy':
        return ArrowDownCircle;
      case 'sell':
        return ArrowUpCircle;
      case 'redemption':
        return Package;
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

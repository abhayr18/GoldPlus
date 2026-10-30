// ============================================
// YASS Gold & Bullion - Executive Dashboard
// Clean, Visual Financial Dashboard
// Focus: Vault Valuation, Interactive Spot Chart, Physical Delivery
// ============================================

import React, { useState, useMemo } from 'react';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Package,
  TrendingUp,
  ChevronRight,
  Truck,
  Calendar,
  Percent,
  Target,
  Gift,
  Bell,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { GoldBarIllustration } from '../components/BrandLogo';
import { DUBAI_MARKET_RATES, DEMO_GOLD_RATE, DEMO_SILVER_RATE } from '../constants';
import type { Transaction } from '../types';

type Timeframe = '1D' | '1W' | '1M' | '1Y';

const CHART_DATA: Record<Timeframe, { rate: string; change: string; isPositive: boolean; path: string; area: string }> = {
  '1D': {
    rate: 'AED 318.50',
    change: '+0.75% today',
    isPositive: true,
    path: 'M0,65 C40,68 70,55 110,58 C150,62 180,42 220,40 C260,38 290,20 330,12',
    area: 'M0,65 C40,68 70,55 110,58 C150,62 180,42 220,40 C260,38 290,20 330,12 L330,85 L0,85 Z',
  },
  '1W': {
    rate: 'AED 318.50',
    change: '+1.95% this week',
    isPositive: true,
    path: 'M0,72 C40,65 80,68 120,52 C160,54 200,38 240,32 C280,28 305,18 330,10',
    area: 'M0,72 C40,65 80,68 120,52 C160,54 200,38 240,32 C280,28 305,18 330,10 L330,85 L0,85 Z',
  },
  '1M': {
    rate: 'AED 318.50',
    change: '+4.60% this month',
    isPositive: true,
    path: 'M0,78 C50,72 90,60 140,55 C190,50 230,36 270,25 C295,20 315,14 330,8',
    area: 'M0,78 C50,72 90,60 140,55 C190,50 230,36 270,25 C295,20 315,14 330,8 L330,85 L0,85 Z',
  },
  '1Y': {
    rate: 'AED 318.50',
    change: '+21.56% past year',
    isPositive: true,
    path: 'M0,82 C45,76 90,68 135,54 C180,48 225,30 270,20 C295,15 315,10 330,6',
    area: 'M0,82 C45,76 90,68 135,54 C180,48 225,30 270,20 C295,15 315,10 330,6 L330,85 L0,85 Z',
  },
};

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
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');

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
  const goldRatio = Math.round((totalGoldValuation / totalVaultValue) * 100);

  const recentTransactions = useMemo(
    () => state.holdings.transactions.slice(0, 3),
    [state.holdings.transactions]
  );

  const activeChart = CHART_DATA[timeframe];

  return (
    <div className="screen-container">
      {/* ── 1. Top Header ─────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: '#FFFFFF',
          borderBottom: '1px solid #E5E5EA',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => navigate('profile')}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#F8F5EE',
              color: '#8A6718',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 13,
              border: '1px solid #DCD2BE',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            aria-label="Profile"
          >
            {getInitials(userName)}
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#1D1D1F' }}>
                Hi, {firstName}
              </span>
              <span
                style={{
                  background: '#ECFDF5',
                  color: '#059669',
                  fontSize: 9.5,
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: 4,
                  border: '1px solid #A7F3D0',
                }}
              >
                UAE PASS
              </span>
            </div>
            <div style={{ fontSize: 11, color: '#6E6E73', fontWeight: 500 }}>
              YASS Bullion Dubai
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            onClick={() => navigate('goldPriceDetail')}
            style={{
              background: '#F8F5EE',
              border: '1px solid #DCD2BE',
              borderRadius: 6,
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              cursor: 'pointer',
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
            <span style={{ fontSize: 11, fontWeight: 700, color: '#735510' }}>
              24K AED {DUBAI_MARKET_RATES.rate24K.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => navigate('goldPriceDetail')}
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: '#FFFFFF',
              border: '1px solid #D2D2D7',
              color: '#6E6E73',
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
        {/* ── 2. Focused Vault Wealth Card ─────────────────────── */}
        <div
          className="card"
          style={{
            marginBottom: 14,
            padding: '18px',
            border: '1px solid #DCD2BE',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FBF9F4 100%)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#735510', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 700 }}>
              Total Vaulted Wealth
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: '#059669',
                background: '#ECFDF5',
                padding: '2px 7px',
                borderRadius: 4,
                border: '1px solid #A7F3D0',
              }}
            >
              100% Backed at Brink's DMCC
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 8 }}>
            <div>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#1D1D1F', letterSpacing: -0.6 }}>
                {formatCurrency(totalVaultValue)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <span style={{ fontSize: 14.5, fontWeight: 700, color: '#8A6718' }}>
                  {state.holdings.totalGrams.toFixed(4)} g gold
                </span>
                <span style={{ color: '#D2D2D7' }}>&bull;</span>
                <span style={{ fontSize: 12, color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TrendingUp size={12} />
                  <span>+0.75% today</span>
                </span>
              </div>
            </div>

            <div style={{ width: 52, height: 52, flexShrink: 0 }}>
              <GoldBarIllustration size={50} />
            </div>
          </div>

          {/* Asset Allocation Segmented Bar */}
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #EBE4D5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6E6E73', marginBottom: 6 }}>
              <span>24K Gold: <strong>{state.holdings.totalGrams.toFixed(2)}g</strong> ({goldRatio}%)</span>
              <span>Silver: <strong>{state.holdings.silverGrams.toFixed(0)}g</strong> ({100 - goldRatio}%)</span>
            </div>
            <div style={{ width: '100%', height: 5, background: '#E5E5EA', borderRadius: 3, overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: `${goldRatio}%`, height: '100%', background: '#8A6718' }} />
              <div style={{ width: `${100 - goldRatio}%`, height: '100%', background: '#8E8E93' }} />
            </div>
          </div>
        </div>

        {/* ── 3. Primary Action Trio ───────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 8,
            marginBottom: 16,
          }}
        >
          {/* Buy Gold */}
          <button
            onClick={() => navigate('buy')}
            className="feature-tile"
            style={{ minHeight: 74, padding: '10px 6px' }}
          >
            <div
              className="feature-tile-icon"
              style={{ width: 34, height: 34, background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0' }}
            >
              <ArrowDownCircle size={18} />
            </div>
            <div className="feature-tile-label" style={{ fontSize: 12 }}>Buy Gold</div>
          </button>

          {/* Physical Delivery */}
          <button
            onClick={() => navigate('delivery')}
            className="feature-tile"
            style={{
              minHeight: 74,
              padding: '10px 6px',
              background: '#F8F5EE',
              borderColor: '#DCD2BE',
            }}
          >
            <div
              className="feature-tile-icon"
              style={{ width: 34, height: 34, background: '#8A6718', color: '#FFFFFF' }}
            >
              <Package size={18} />
            </div>
            <div className="feature-tile-label" style={{ fontSize: 12, color: '#735510', fontWeight: 800 }}>
              Get Bullion
            </div>
          </button>

          {/* Sell to Bank */}
          <button
            onClick={() => navigate('sell')}
            className="feature-tile"
            style={{ minHeight: 74, padding: '10px 6px' }}
          >
            <div
              className="feature-tile-icon"
              style={{ width: 34, height: 34, background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}
            >
              <ArrowUpCircle size={18} />
            </div>
            <div className="feature-tile-label" style={{ fontSize: 12 }}>Sell to Cash</div>
          </button>
        </div>

        {/* ── 4. Live Spot Performance & Visual Chart ──────────── */}
        <div
          className="card"
          style={{
            marginBottom: 16,
            padding: '16px',
            border: '1px solid #E5E5EA',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: '#6E6E73', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                24K Dubai Souk Benchmark
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#1D1D1F', marginTop: 2 }}>
                {activeChart.rate}
                <span style={{ fontSize: 12, fontWeight: 500, color: '#6E6E73' }}> / gram</span>
              </div>
              <div style={{ fontSize: 11.5, color: '#059669', fontWeight: 600, marginTop: 1 }}>
                {activeChart.change}
              </div>
            </div>

            {/* Timeframe Chips */}
            <div style={{ display: 'flex', gap: 4 }}>
              {(['1D', '1W', '1M', '1Y'] as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    border: 'none',
                    background: timeframe === tf ? '#1D1D1F' : '#EDEDF0',
                    color: timeframe === tf ? '#FFFFFF' : '#6E6E73',
                    fontSize: 10.5,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Area Chart */}
          <div style={{ width: '100%', height: 95, position: 'relative' }}>
            <svg
              width="100%"
              height="95"
              viewBox="0 0 330 85"
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="chartGoldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8A6718" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#8A6718" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Shaded Area Fill */}
              <path d={activeChart.area} fill="url(#chartGoldGrad)" />

              {/* Trend Line */}
              <path
                d={activeChart.path}
                fill="none"
                stroke="#8A6718"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Final Benchmark Point */}
              <circle cx="330" cy="12" r="3.5" fill="#8A6718" stroke="#FFFFFF" strokeWidth="1.5" />
            </svg>
          </div>

          <div
            onClick={() => navigate('goldPriceDetail')}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 10,
              marginTop: 6,
              borderTop: '1px solid #F2F2F7',
              fontSize: 11,
              color: '#8A6718',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <span>Live DMCC International Feed &bull; 0% VAT</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <span>Full Market Depth</span>
              <ChevronRight size={12} />
            </span>
          </div>
        </div>

        {/* ── 5. Compact Bullion Services Dock (1 Row) ─────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 8,
            marginBottom: 16,
          }}
        >
          {/* Daily Auto-Save (SIP) */}
          <div
            onClick={() => navigate('sip')}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E5EA',
              borderRadius: 10,
              padding: '10px 4px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#FFF7ED',
                color: '#EA580C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 6px',
              }}
            >
              <Calendar size={15} />
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#1D1D1F' }}>Auto-Save</div>
            <div style={{ fontSize: 9.5, color: '#8A6718', fontWeight: 600 }}>AED 25/d</div>
          </div>

          {/* Wakala Yield / Gold Lease */}
          <div
            onClick={() => navigate('lease')}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E5EA',
              borderRadius: 10,
              padding: '10px 4px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#F5F3FF',
                color: '#7C3AED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 6px',
              }}
            >
              <Percent size={15} />
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#1D1D1F' }}>Earn Yield</div>
            <div style={{ fontSize: 9.5, color: '#7C3AED', fontWeight: 600 }}>+4.8% APR</div>
          </div>

          {/* Savings Goals */}
          <div
            onClick={() => navigate('goals')}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E5EA',
              borderRadius: 10,
              padding: '10px 4px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#EFF6FF',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 6px',
              }}
            >
              <Target size={15} />
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#1D1D1F' }}>Goals</div>
            <div style={{ fontSize: 9.5, color: '#2563EB', fontWeight: 600 }}>37% reached</div>
          </div>

          {/* Gift 24K Gold */}
          <div
            onClick={() => navigate('gift')}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E5EA',
              borderRadius: 10,
              padding: '10px 4px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#F8F5EE',
                color: '#8A6718',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 6px',
              }}
            >
              <Gift size={15} />
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#1D1D1F' }}>Gift Gold</div>
            <div style={{ fontSize: 9.5, color: '#8A6718', fontWeight: 600 }}>Occasions</div>
          </div>
        </div>

        {/* ── 6. Client Spotlight: Physical Bullion Delivery ───── */}
        <div
          onClick={() => navigate('delivery')}
          className="card card-interactive"
          style={{
            border: '1px solid #DCD2BE',
            padding: '14px 16px',
            marginBottom: 16,
            background: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: '#F8F5EE',
                  border: '1px solid #DCD2BE',
                  color: '#8A6718',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Truck size={20} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: '#1D1D1F' }}>
                    Doorstep Bullion Delivery
                  </span>
                  <span
                    style={{
                      background: '#ECFDF5',
                      color: '#059669',
                      fontSize: 9,
                      fontWeight: 700,
                      padding: '1px 5px',
                      borderRadius: 4,
                    }}
                  >
                    INSURED
                  </span>
                </div>
                <div style={{ fontSize: 11, color: '#6E6E73', marginTop: 2 }}>
                  1g to 1kg minted bars in tamper-proof certicards via Transguard
                </div>
              </div>
            </div>
            <ChevronRight size={16} color="#8A6718" />
          </div>
        </div>

        {/* ── 7. Recent Activity ──────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#1D1D1F', margin: 0 }}>
            Recent Activity
          </h3>
          <button
            onClick={() => navigate('transactions')}
            style={{
              background: 'none',
              border: 'none',
              color: '#8A6718',
              fontSize: 12,
              fontWeight: 600,
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

        <div className="card" style={{ padding: '2px 14px', marginBottom: 20 }}>
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

  const getLabel = () => {
    switch (txn.type) {
      case 'buy':
        return '24K Gold Purchase';
      case 'sell':
        return 'Gold Sold to Bank';
      case 'redemption':
        return 'Physical Bullion Dispatched';
      case 'spin_reward':
        return 'Spin & Win Reward';
      default:
        return txn.meta || 'Transaction';
    }
  };

  return (
    <div className="txn-row" onClick={onClick} style={{ padding: '11px 0' }}>
      <div className={`txn-icon ${txn.type}`} style={{ width: 34, height: 34 }}>
        {txn.type === 'buy' ? (
          <ArrowDownCircle size={17} />
        ) : txn.type === 'sell' ? (
          <ArrowUpCircle size={17} />
        ) : (
          <Package size={17} />
        )}
      </div>

      <div className="txn-details">
        <div className="txn-type" style={{ fontSize: 13, fontWeight: 600, color: '#1D1D1F' }}>
          {getLabel()}
        </div>
        <div className="txn-date" style={{ fontSize: 11, color: '#6E6E73' }}>
          {formatDate(txn.date)}
        </div>
      </div>

      <div className="txn-amounts">
        <div
          className={`txn-grams ${isCredit ? 'positive' : 'negative'}`}
          style={{ fontSize: 13, fontWeight: 700, color: isCredit ? '#059669' : '#1D1D1F' }}
        >
          {isCredit ? '+' : '-'}
          {txn.goldGrams.toFixed(4)} g
        </div>
        <div className="txn-rupees" style={{ fontSize: 11, color: '#6E6E73' }}>
          {formatCurrency(txn.amount)}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;

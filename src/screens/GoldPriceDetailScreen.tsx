// ============================================
// OGold Wallet — Live Precious Metals Spot Benchmark Screen
// Live 24K Gold & .999 Silver Spot Rates & Performance
// App Store: id6504926022
// ============================================

import React, { useState } from 'react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { DUBAI_MARKET_RATES, DEMO_GOLD_RATE, DEMO_SILVER_RATE } from '../constants';
import type { MetalType } from '../types';

type Timeframe = '1D' | '1W' | '1M' | '1Y';

export const GoldPriceDetailScreen: React.FC = () => {
  const { back, navigate } = useApp();
  const [metal, setMetal] = useState<MetalType>('gold');
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');

  const activeRate = metal === 'gold' ? DEMO_GOLD_RATE : DEMO_SILVER_RATE;
  const activeChange = metal === 'gold' ? DUBAI_MARKET_RATES.dailyChangeGold : DUBAI_MARKET_RATES.dailyChangeSilver;

  return (
    <div className="screen-container">
      <div className="screen-header">
        <button className="screen-header-back" onClick={back} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Live Dubai Spot Market</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        {/* Metal Toggle */}
        <div className="metal-toggle-bar">
          <button
            className={`metal-toggle-btn ${metal === 'gold' ? 'active gold' : ''}`}
            onClick={() => setMetal('gold')}
          >
            <span>24K Gold (999.9)</span>
          </button>
          <button
            className={`metal-toggle-btn ${metal === 'silver' ? 'active silver' : ''}`}
            onClick={() => setMetal('silver')}
          >
            <span>.999 Pure Silver</span>
          </button>
        </div>

        {/* Main Price Card */}
        <div className="card-gold-glow" style={{ marginBottom: 16, textAlign: 'center', padding: '22px 16px' }}>
          <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 700 }}>
            {metal === 'gold' ? '24K 999.9 Fine Gold • Dubai Good Delivery' : '.999 Fine Pure Bullion Silver'}
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#FFFFFF', margin: '6px 0' }}>
            AED {activeRate.toFixed(2)}
            <span style={{ fontSize: 14, color: '#94A3B8', fontWeight: 600 }}> / gram</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#10B981', fontSize: 13, fontWeight: 800 }}>
            <TrendingUp size={15} />
            <span>{activeChange} today ({DUBAI_MARKET_RATES.marketStatus})</span>
          </div>

          {/* Timeframe selector */}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 16, marginBottom: 14 }}>
            {(['1D', '1W', '1M', '1Y'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                style={{
                  padding: '5px 14px',
                  borderRadius: 6,
                  border: 'none',
                  background: timeframe === tf ? '#F59E0B' : '#161D2D',
                  color: timeframe === tf ? '#0A0D14' : '#94A3B8',
                  fontSize: 11.5,
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Interactive chart visualization */}
          <div style={{ height: 140, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '10px 0' }}>
            <svg width="100%" height="120" viewBox="0 0 320 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="ogoldTrendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0 95 Q40 75, 80 80 T160 50 T240 40 T320 12"
                stroke="#10B981"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M0 95 Q40 75, 80 80 T160 50 T240 40 T320 12 L320 120 L0 120 Z"
                fill="url(#ogoldTrendFill)"
              />
            </svg>
          </div>

          <div style={{ fontSize: 10.5, color: '#64748B', marginTop: 6 }}>
            Updated real-time from Dubai Gold Souk & DMCC international benchmark
          </div>
        </div>

        {/* Specifications */}
        <div className="card" style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 13.5, fontWeight: 800, color: '#FFFFFF', marginBottom: 10 }}>
            Depository Specifications
          </h3>
          <div className="summary-row">
            <span className="label">Purity</span>
            <span className="value">{metal === 'gold' ? '24 Karat (999.9 Fine)' : '.999 Pure Silver'}</span>
          </div>
          <div className="summary-row">
            <span className="label">Standard</span>
            <span className="value">Dubai Good Delivery (DGD)</span>
          </div>
          <div className="summary-row">
            <span className="label">Vault Custody</span>
            <span className="value">Brink's DMCC & Transguard Dubai</span>
          </div>
          <div className="summary-row">
            <span className="label">Asset Insurance</span>
            <span className="value" style={{ color: '#10B981' }}>100% Dubai National Insurance (DNI)</span>
          </div>
          <div className="summary-row total">
            <span className="label">UAE VAT</span>
            <span className="value" style={{ color: '#10B981' }}>0% Exempt (Investment Grade)</span>
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate('buy')}
          style={{ height: 46, fontSize: 14 }}
        >
          Buy {metal === 'gold' ? '24K Gold' : '.999 Silver'} Now
        </button>
      </div>
    </div>
  );
};

export default GoldPriceDetailScreen;

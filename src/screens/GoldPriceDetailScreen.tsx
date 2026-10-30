// ============================================
// YASS Gold — Live Dubai Spot Market Benchmark Screen
// DMCC & Dubai Gold Souk Benchmark Rates
// A Product by YASS Group, Dubai
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
        <div className="card-gold" style={{ marginBottom: 16, textAlign: 'center', padding: '22px 16px' }}>
          <div style={{ fontSize: 11, color: '#854D0E', textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 800 }}>
            {metal === 'gold' ? '24K 999.9 Fine Gold • Dubai Good Delivery' : '.999 Fine Pure Bullion Silver'}
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', margin: '6px 0' }}>
            AED {activeRate.toFixed(2)}
            <span style={{ fontSize: 14, color: '#64748B', fontWeight: 600 }}> / gram</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#059669', fontSize: 13, fontWeight: 800 }}>
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
                  padding: '6px 14px',
                  borderRadius: 8,
                  border: timeframe === tf ? '1px solid #C59B27' : '1px solid #E2E8F0',
                  background: timeframe === tf ? 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)' : '#FFFFFF',
                  color: timeframe === tf ? '#FFFFFF' : '#64748B',
                  fontSize: 11.5,
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Interactive chart visualization */}
          <div style={{ height: 130, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '10px 0' }}>
            <svg width="100%" height="110" viewBox="0 0 320 110" preserveAspectRatio="none">
              <defs>
                <linearGradient id="yassTrendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0 90 Q40 70, 80 75 T160 45 T240 35 T320 10"
                stroke="#059669"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M0 90 Q40 70, 80 75 T160 45 T240 35 T320 10 L320 110 L0 110 Z"
                fill="url(#yassTrendFill)"
              />
            </svg>
          </div>

          <div style={{ fontSize: 11, color: '#64748B', marginTop: 6, fontWeight: 500 }}>
            Real-time feed from Dubai Gold Souk & DMCC international benchmark
          </div>
        </div>

        {/* Specifications */}
        <div className="card" style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 10 }}>
            Depository & Purity Specifications
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
            <span className="label">Physical Audit</span>
            <span className="value" style={{ color: '#059669' }}>BDO Dubai Verified 1:1</span>
          </div>
          <div className="summary-row total">
            <span className="label">UAE VAT</span>
            <span className="value" style={{ color: '#059669' }}>0% Exempt (Investment Bullion)</span>
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate('buy')}
          style={{ height: 48, fontSize: 14 }}
        >
          Buy {metal === 'gold' ? '24K Gold' : '.999 Silver'} Now
        </button>
      </div>
    </div>
  );
};

export default GoldPriceDetailScreen;

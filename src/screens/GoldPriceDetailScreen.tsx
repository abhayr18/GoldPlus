// ============================================
// YASS Gold & YASS Bullion — Gold Price Detail Screen
// A product by YASS Group, Dubai
// ============================================

import React, { useState } from 'react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { DEMO_GOLD_RATE, COLORS } from '../constants';

type Timeframe = '1D' | '1W' | '1M' | '1Y';

const GoldPriceDetailScreen: React.FC = () => {
  const { back, navigate } = useApp();
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');

  return (
    <div className="screen-container">
      <div className="screen-content">
        <div className="screen-header">
          <button className="screen-header-back" onClick={back} aria-label="Back">
            <ArrowLeft size={18} />
          </button>
          <h2 className="screen-header-title">Live Dubai Gold Rate</h2>
        </div>

        <div style={{ padding: '0 4px', marginTop: 16 }}>
          {/* Main Price Card */}
          <div className="card" style={{ marginBottom: 16, textAlign: 'center', padding: '24px 16px' }}>
            <div style={{ fontSize: 13, color: COLORS.secondaryText, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              24K 999.9 Fine Gold • Dubai Good Delivery
            </div>
            <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.mainText, margin: '8px 0' }}>
              AED {DEMO_GOLD_RATE.toFixed(2)}<span style={{ fontSize: 18, color: COLORS.secondaryText }}> / gram</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: COLORS.positive, fontSize: 14, fontWeight: 600 }}>
              <TrendingUp size={16} /> +AED 2.40 (+0.75%) today
            </div>

            {/* Timeframe selector */}
            <div className="tab-bar" style={{ marginTop: 20, marginBottom: 16 }}>
              {(['1D', '1W', '1M', '1Y'] as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  className={`tab-item ${timeframe === tf ? 'active' : ''}`}
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Interactive chart visualization */}
            <div style={{ height: 160, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '10px 0' }}>
              <svg width="100%" height="140" viewBox="0 0 320 120" preserveAspectRatio="none">
                <path
                  d="M0 100 Q40 80, 80 85 T160 55 T240 45 T320 15"
                  stroke={COLORS.positive}
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M0 100 Q40 80, 80 85 T160 55 T240 45 T320 15 L320 120 L0 120 Z"
                  fill="url(#goldTrendFill)"
                />
                <defs>
                  <linearGradient id="goldTrendFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={COLORS.positive} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={COLORS.positive} stopOpacity="0.0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div style={{ fontSize: 11, color: COLORS.secondaryText, marginTop: 8 }}>
              Linked directly to live Dubai Gold Souk & DMCC benchmark bullion rates
            </div>
          </div>

          {/* Key Specifications */}
          <div className="card" style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: COLORS.mainText, marginBottom: 12 }}>
              Dubai Bullion Standards
            </h3>
            <div className="summary-row">
              <span className="label">Purity</span>
              <span className="value">24 Karat (999.9 Fine Gold)</span>
            </div>
            <div className="summary-row">
              <span className="label">Standard</span>
              <span className="value">Dubai Good Delivery (DGD)</span>
            </div>
            <div className="summary-row">
              <span className="label">Storage Vaults</span>
              <span className="value">Transguard & Brink's DMCC Dubai</span>
            </div>
            <div className="summary-row">
              <span className="label">Insurance</span>
              <span className="value" style={{ color: COLORS.positive }}>100% Lloyds Underwritten</span>
            </div>
            <div className="summary-row">
              <span className="label">UAE VAT</span>
              <span className="value" style={{ color: COLORS.positive }}>0% (Investment Precious Metal)</span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <button className="btn btn-primary" onClick={() => navigate('buy')}>
              Buy at AED {DEMO_GOLD_RATE.toFixed(2)}/g
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('sell')}>
              Sell Gold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldPriceDetailScreen;

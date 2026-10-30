// ============================================
// OGold Wallet — Sell Gold & Silver Screen
// Instant Liquidation to Bank or OGold Mastercard
// App Store: id6504926022
// ============================================

import React, { useState, useMemo } from 'react';
import { ArrowLeft, Check, CreditCard, Building2 } from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { sellMetalAction } from '../state/appState';
import { DEMO_GOLD_RATE, DEMO_SILVER_RATE } from '../constants';
import type { MetalType } from '../types';

type FlowState = 'input' | 'review' | 'success';

const formatCurrency = (val: number): string =>
  'AED ' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const formatGrams = (val: number): string => val.toFixed(4) + ' g';

export const SellGoldScreen: React.FC = () => {
  const { state, setState, navigate, back, showToast } = useApp();

  const [metal, setMetal] = useState<MetalType>('gold');
  const [flowState, setFlowState] = useState<FlowState>('input');
  const [weightStr, setWeightStr] = useState<string>('');
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [payoutDestination, setPayoutDestination] = useState<'card' | 'bank'>('card');

  const activeRate = metal === 'gold' ? DEMO_GOLD_RATE : DEMO_SILVER_RATE;
  const availableGrams = metal === 'gold' ? state.holdings.totalGrams : state.holdings.silverGrams;
  const availableValue = availableGrams * activeRate;

  const grams = parseFloat(weightStr) || 0;
  const expectedAmount = useMemo(() => Math.round(grams * activeRate * 100) / 100, [grams, activeRate]);

  const isValid = grams > 0 && grams <= availableGrams;

  const percentageChips = [
    { label: '25%', factor: 0.25 },
    { label: '50%', factor: 0.5 },
    { label: '75%', factor: 0.75 },
    { label: 'Max', factor: 1 },
  ];

  const handlePercentageChip = (label: string, factor: number) => {
    const val = Math.round(availableGrams * factor * 10000) / 10000;
    setWeightStr(val.toString());
    setActiveChip(label);
  };

  const handleConfirm = () => {
    const destinationLabel =
      payoutDestination === 'card' ? 'OGold Platinum Mastercard' : 'Emirates NBD (AE29026...)';
    setState(sellMetalAction(state, metal, grams, destinationLabel));
    showToast(`Successfully sold ${formatGrams(grams)}! AED ${expectedAmount.toFixed(2)} credited.`, 'success');
    setFlowState('success');
  };

  return (
    <div className="screen-container">
      {/* ── Screen Header ────────────────────────────────────── */}
      <div className="screen-header">
        <button className="screen-header-back" onClick={back} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Liquidate Precious Metals</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        {flowState === 'input' && (
          <>
            {/* Metal Toggle */}
            <div className="metal-toggle-bar">
              <button
                className={`metal-toggle-btn ${metal === 'gold' ? 'active gold' : ''}`}
                onClick={() => {
                  setMetal('gold');
                  setWeightStr('');
                  setActiveChip(null);
                }}
              >
                <span>24K Gold ({state.holdings.totalGrams.toFixed(2)}g)</span>
              </button>
              <button
                className={`metal-toggle-btn ${metal === 'silver' ? 'active silver' : ''}`}
                onClick={() => {
                  setMetal('silver');
                  setWeightStr('');
                  setActiveChip(null);
                }}
              >
                <span>.999 Silver ({state.holdings.silverGrams.toFixed(1)}g)</span>
              </button>
            </div>

            {/* Available Balance Card */}
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700 }}>
                Available in Insured Vault
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#FFFFFF', marginTop: 4 }}>
                {formatGrams(availableGrams)}
              </div>
              <div style={{ fontSize: 12, color: '#FBBF24', marginTop: 2, fontWeight: 600 }}>
                ≈ {formatCurrency(availableValue)} at live spot rate ({formatCurrency(activeRate)}/g)
              </div>
            </div>

            {/* Weight Input */}
            <div className="card" style={{ marginBottom: 16 }}>
              <label className="form-label">How much {metal} do you want to liquidate?</label>
              <div className="form-input-prefix">
                <span className="prefix">Grams</span>
                <input
                  type="number"
                  step="0.0001"
                  placeholder="0.0000"
                  value={weightStr}
                  onChange={(e) => {
                    setWeightStr(e.target.value);
                    setActiveChip(null);
                  }}
                  autoFocus
                />
              </div>

              {/* Percentage Chips */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginTop: 12 }}>
                {percentageChips.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => handlePercentageChip(chip.label, chip.factor)}
                    style={{
                      padding: '8px 0',
                      borderRadius: 8,
                      border: '1px solid',
                      borderColor: activeChip === chip.label ? '#F59E0B' : '#1E293B',
                      background: activeChip === chip.label ? 'rgba(245, 158, 11, 0.15)' : '#121826',
                      color: activeChip === chip.label ? '#FBBF24' : '#94A3B8',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Payout Destination */}
            <div className="card" style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', marginBottom: 10 }}>
                Deposit Funds To:
              </div>

              {/* OGold Mastercard option */}
              <div
                onClick={() => setPayoutDestination('card')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: '1px solid',
                  borderColor: payoutDestination === 'card' ? '#F59E0B' : '#1E293B',
                  background: payoutDestination === 'card' ? 'rgba(245, 158, 11, 0.1)' : '#121826',
                  marginBottom: 8,
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CreditCard size={18} color={payoutDestination === 'card' ? '#FBBF24' : '#94A3B8'} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>
                      OGold Platinum Mastercard
                    </div>
                    <div style={{ fontSize: 11, color: '#94A3B8' }}>Instant spending availability</div>
                  </div>
                </div>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    border: `2px solid ${payoutDestination === 'card' ? '#F59E0B' : '#64748B'}`,
                    background: payoutDestination === 'card' ? '#F59E0B' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {payoutDestination === 'card' && <Check size={12} color="#0A0D14" strokeWidth={3} />}
                </div>
              </div>

              {/* Linked Bank */}
              <div
                onClick={() => setPayoutDestination('bank')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: '1px solid',
                  borderColor: payoutDestination === 'bank' ? '#F59E0B' : '#1E293B',
                  background: payoutDestination === 'bank' ? 'rgba(245, 158, 11, 0.1)' : '#121826',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Building2 size={18} color={payoutDestination === 'bank' ? '#FBBF24' : '#94A3B8'} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>
                      Emirates NBD (AE29026...)
                    </div>
                    <div style={{ fontSize: 11, color: '#94A3B8' }}>Direct UAE bank transfer</div>
                  </div>
                </div>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    border: `2px solid ${payoutDestination === 'bank' ? '#F59E0B' : '#64748B'}`,
                    background: payoutDestination === 'bank' ? '#F59E0B' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {payoutDestination === 'bank' && <Check size={12} color="#0A0D14" strokeWidth={3} />}
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary"
              disabled={!isValid}
              onClick={() => setFlowState('review')}
              style={{ height: 46, fontSize: 14 }}
            >
              Continue to Sell ({formatCurrency(expectedAmount)})
            </button>
          </>
        )}

        {flowState === 'review' && (
          <>
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>Sale Summary</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#FFFFFF', marginTop: 4 }}>
                {formatGrams(grams)} {metal === 'gold' ? '24K Gold' : '.999 Silver'}
              </div>

              <div style={{ height: 1, background: '#1E293B', margin: '14px 0' }} />

              <div className="summary-row">
                <span className="label">Applicable Spot Rate</span>
                <span className="value">{formatCurrency(activeRate)}/g</span>
              </div>
              <div className="summary-row">
                <span className="label">Destination</span>
                <span className="value">
                  {payoutDestination === 'card' ? 'OGold Mastercard' : 'Emirates NBD'}
                </span>
              </div>
              <div className="summary-row total">
                <span className="label">Net Payout to You</span>
                <span className="value">{formatCurrency(expectedAmount)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary" onClick={() => setFlowState('input')}>
                Back
              </button>
              <button className="btn btn-primary" onClick={handleConfirm}>
                Confirm Instant Sale
              </button>
            </div>
          </>
        )}

        {flowState === 'success' && (
          <div style={{ textAlign: 'center', padding: '36px 16px' }}>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '2px solid #10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10B981',
                margin: '0 auto 16px',
              }}
            >
              <Check size={36} strokeWidth={3} />
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#FFFFFF', marginBottom: 6 }}>
              Payout Processed!
            </h2>
            <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 20 }}>
              {formatCurrency(expectedAmount)} has been credited to your {payoutDestination === 'card' ? 'OGold Mastercard' : 'bank account'}.
            </p>

            <button className="btn btn-primary" onClick={() => navigate('dashboard')}>
              Back to Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellGoldScreen;

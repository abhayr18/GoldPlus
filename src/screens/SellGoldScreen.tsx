// ============================================
// YASS Gold & Bullion — Sell Gold Screen
// Instant Liquidation to UAE Bank Account
// White + Gold Clean Minimalist Theme
// ============================================

import React, { useState, useMemo } from 'react';
import { ArrowLeft, Check, Building2 } from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { sellMetalAction } from '../state/appState';
import { DEMO_GOLD_RATE } from '../constants';

type FlowState = 'input' | 'review' | 'success';

const formatCurrency = (val: number): string =>
  'AED ' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const formatGrams = (val: number): string => val.toFixed(4) + ' g';

export const SellGoldScreen: React.FC = () => {
  const { state, setState, navigate, back, showToast } = useApp();

  const [flowState, setFlowState] = useState<FlowState>('input');
  const [weightStr, setWeightStr] = useState<string>('');
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const activeRate = DEMO_GOLD_RATE;
  const availableGrams = state.holdings.totalGrams;
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
    setState(sellMetalAction(state, 'gold', grams, 'Emirates NBD Bank (AE29026...)'));
    showToast(`Successfully liquidated ${formatGrams(grams)}! AED ${expectedAmount.toFixed(2)} credited to bank.`, 'success');
    setFlowState('success');
  };

  return (
    <div className="screen-container">
      {/* Header */}
      <div className="screen-header">
        <button className="screen-header-back" onClick={back} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Sell 24K Gold</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        {flowState === 'input' && (
          <>
            {/* Available Balance Card */}
            <div className="card-gold" style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700 }}>
                Available Vault Balance
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', marginTop: 4 }}>
                {formatGrams(availableGrams)}
              </div>
              <div style={{ fontSize: 12, color: '#8F6914', marginTop: 2, fontWeight: 700 }}>
                ≈ {formatCurrency(availableValue)} at current Souk spot rate ({formatCurrency(activeRate)}/g)
              </div>
            </div>

            {/* Input Card */}
            <div className="card" style={{ marginBottom: 16 }}>
              <label className="form-label">How much gold do you want to sell?</label>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 12 }}>
                {percentageChips.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => handlePercentageChip(chip.label, chip.factor)}
                    className={`chip ${activeChip === chip.label ? 'active' : ''}`}
                    style={{ textAlign: 'center', padding: '9px 0' }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Payout Destination */}
            <div className="card" style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A', marginBottom: 10 }}>
                Payout Destination
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: '1px solid #C59B27',
                  background: '#FEFBF2',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Building2 size={20} color="#8F6914" />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
                      Emirates NBD Bank (Primary)
                    </div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>IBAN: AE290260000123456789012</div>
                  </div>
                </div>
                <Check size={16} color="#059669" />
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
              <div style={{ fontSize: 12, color: '#64748B' }}>Sale Summary</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', marginTop: 4 }}>
                {formatGrams(grams)} 24K 999.9 Fine Gold
              </div>

              <div style={{ height: 1, background: '#E2E8F0', margin: '14px 0' }} />

              <div className="summary-row">
                <span className="label">Applicable Spot Rate</span>
                <span className="value">{formatCurrency(activeRate)}/g</span>
              </div>
              <div className="summary-row">
                <span className="label">Destination Account</span>
                <span className="value">Emirates NBD (AE29026...)</span>
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
                Confirm Sale & Transfer Cash
              </button>
            </div>
          </>
        )}

        {flowState === 'success' && (
          <div style={{ textAlign: 'center', padding: '40px 16px' }}>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                background: '#ECFDF5',
                border: '2px solid #059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#059669',
                margin: '0 auto 16px',
              }}
            >
              <Check size={36} strokeWidth={3} />
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 6 }}>
              Payout Processed!
            </h2>
            <p style={{ fontSize: 13, color: '#64748B', maxWidth: 300, margin: '0 auto 20px', lineHeight: 1.5 }}>
              {formatCurrency(expectedAmount)} has been credited to your Emirates NBD bank account.
            </p>

            <button className="btn btn-primary" onClick={() => navigate('dashboard')} style={{ maxWidth: 260, margin: '0 auto' }}>
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellGoldScreen;

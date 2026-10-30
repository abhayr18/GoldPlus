// ============================================
// GoldPlus — Sell Gold Screen
// Three-step flow: Input → Review → Success
// ============================================

import React, { useState, useMemo } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { sellGold } from '../state/appState';
import { DEMO_GOLD_RATE, COLORS } from '../constants';

type FlowState = 'input' | 'review' | 'success';

// ---------- Local formatting helpers ----------
const formatCurrency = (val: number): string =>
  '₹' + val.toLocaleString('en-IN', { maximumFractionDigits: 2 });

const formatGrams = (val: number): string =>
  val.toFixed(4) + ' g';

const SellGoldScreen: React.FC = () => {
  const { state, setState, navigate, back, showToast } = useApp();

  // ---------- Local state ----------
  const [flowState, setFlowState] = useState<FlowState>('input');
  const [weightStr, setWeightStr] = useState<string>('');
  const [activeChip, setActiveChip] = useState<string | null>(null);

  // Available gold balance from holdings
  const availableGrams = state.holdings.totalGrams;
  const availableValue = Math.round(availableGrams * DEMO_GOLD_RATE * 100) / 100;

  // Parsed weight
  const grams = parseFloat(weightStr) || 0;

  // Expected payout
  const expectedAmount = useMemo(
    () => Math.round(grams * DEMO_GOLD_RATE * 100) / 100,
    [grams],
  );

  // Validation
  const isValid = grams > 0 && grams <= availableGrams;

  // Quick-selection chips (percentage of holdings)
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

  // Continue to review
  const handleContinue = () => {
    if (!isValid) return;
    setFlowState('review');
  };

  // Confirm sale
  const handleConfirm = () => {
    const newState = sellGold(state, grams);
    setState(newState);
    showToast('Gold sold successfully!', 'success');
    setFlowState('success');
  };

  // =============================================
  // INPUT STATE
  // =============================================
  const renderInputState = () => (
    <>
      {/* Screen header */}
      <div className="screen-header">
        <button className="screen-header-back" onClick={back}>
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Sell Gold</span>
      </div>

      <div className="screen-content">
        {/* Demo disclaimer */}
        <div className="demo-banner">Illustrative Demo — No real money involved</div>

        {/* Available balance card */}
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, color: COLORS.secondaryText, marginBottom: 4 }}>
                Available Balance
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.mainText }}>
                {availableGrams.toFixed(4)} g
              </div>
              <div style={{ fontSize: 13, color: COLORS.secondaryText, marginTop: 2 }}>
                ({formatCurrency(availableValue)} approx.)
              </div>
            </div>
            {/* Small gold bar decoration */}
            <div className="gold-bar-icon" style={{ width: 44, height: 28 }} />
          </div>
        </div>

        {/* Weight input */}
        <div style={{ marginBottom: 12 }}>
          <label className="form-label">Enter weight to sell</label>
          <div className="form-input-prefix">
            <input
              type="number"
              placeholder="e.g. 0.1"
              step="0.0001"
              min="0"
              max={availableGrams}
              value={weightStr}
              onChange={(e) => {
                setWeightStr(e.target.value);
                setActiveChip(null);
              }}
              style={{ textAlign: 'left' }}
            />
            <span className="prefix">g</span>
          </div>
          {weightStr !== '' && grams > availableGrams && (
            <div className="form-error" style={{ marginTop: 6 }}>
              Insufficient gold balance
            </div>
          )}
          {weightStr !== '' && grams <= 0 && (
            <div className="form-error" style={{ marginTop: 6 }}>
              Please enter a valid weight
            </div>
          )}
        </div>

        {/* Quick percentage chips */}
        <div className="chip-row" style={{ marginBottom: 24 }}>
          {percentageChips.map((chip) => (
            <button
              key={chip.label}
              className={`chip ${activeChip === chip.label ? 'active' : ''}`}
              onClick={() => handlePercentageChip(chip.label, chip.factor)}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Expected amount section */}
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: COLORS.secondaryText, marginBottom: 4 }}>
            Expected Amount
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.mainText }}>
            {formatCurrency(expectedAmount)}
          </div>
          <div style={{ fontSize: 12, color: COLORS.secondaryText, marginTop: 4 }}>
            Based on current gold price (₹{DEMO_GOLD_RATE.toLocaleString('en-IN')}/g)
          </div>
        </div>

        {/* Continue CTA */}
        <button
          className="btn btn-primary"
          disabled={!isValid}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </>
  );

  // =============================================
  // REVIEW STATE
  // =============================================
  const renderReviewState = () => (
    <>
      {/* Screen header */}
      <div className="screen-header">
        <button className="screen-header-back" onClick={() => setFlowState('input')}>
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Sell Review</span>
      </div>

      <div className="screen-content">
        <div className="demo-banner">Illustrative Demo — No real money involved</div>

        <div className="card" style={{ marginBottom: 24 }}>
          {/* Gold Quantity */}
          <div className="summary-row">
            <span className="label">Gold Quantity</span>
            <span className="value">{formatGrams(grams)}</span>
          </div>

          {/* Sell Rate */}
          <div className="summary-row">
            <span className="label">Sell Rate</span>
            <span className="value">
              ₹{DEMO_GOLD_RATE.toLocaleString('en-IN')}/g{' '}
              <span style={{ fontSize: 11, color: COLORS.secondaryText, fontWeight: 400 }}>
                (Illustrative)
              </span>
            </span>
          </div>

          {/* Estimated Payout */}
          <div className="summary-row total">
            <span className="label">Estimated Payout</span>
            <span className="value">{formatCurrency(expectedAmount)}</span>
          </div>

          {/* Payout To */}
          <div className="summary-row">
            <span className="label">Payout To</span>
            <span className="value">HDFC Bank ****6789</span>
          </div>
        </div>

        {/* Confirm CTA */}
        <button className="btn btn-primary" onClick={handleConfirm}>
          Confirm Demo Sale
        </button>
      </div>
    </>
  );

  // =============================================
  // SUCCESS STATE
  // =============================================
  const renderSuccessState = () => (
    <div className="success-screen">
      {/* Green checkmark */}
      <div className="success-check">
        <Check size={36} strokeWidth={3} />
      </div>

      <div className="success-title">Sale Successful!</div>
      <div className="success-desc">
        Your gold has been sold and the payout will be credited to your bank account
      </div>

      {/* Sold quantity in large gold text */}
      <div className="success-detail">{formatGrams(grams)}</div>

      {/* Back to Dashboard */}
      <button
        className="btn btn-primary"
        style={{ maxWidth: 280 }}
        onClick={() => navigate('dashboard')}
      >
        Back to Dashboard
      </button>
    </div>
  );

  // =============================================
  // RENDER
  // =============================================
  return (
    <div className="screen-container">
      {flowState === 'input' && renderInputState()}
      {flowState === 'review' && renderReviewState()}
      {flowState === 'success' && renderSuccessState()}
    </div>
  );
};

export default SellGoldScreen;

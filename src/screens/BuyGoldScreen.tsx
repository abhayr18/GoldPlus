// ============================================
// GoldPlus — Buy Gold Screen
// Three-step flow: Input → Review → Success
// ============================================

import React, { useState, useMemo } from 'react';
import { ArrowLeft, Check, Smartphone, Building2 } from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { buyGold, generateTransactionId } from '../state/appState';
import { DEMO_GOLD_RATE, COLORS } from '../constants';

type FlowState = 'input' | 'review' | 'success';
type InputMode = 'amount' | 'weight';
type PaymentMethod = 'UPI' | 'Bank Account';

const BuyGoldScreen: React.FC = () => {
  const { state, setState, navigate, back, showToast } = useApp();

  // ---------- Local state ----------
  const [flowState, setFlowState] = useState<FlowState>('input');
  const [inputMode, setInputMode] = useState<InputMode>('amount');
  const [amountStr, setAmountStr] = useState<string>('');
  const [weightStr, setWeightStr] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  const [reference] = useState<string>(generateTransactionId());

  // ---------- Derived values ----------
  const amount = parseFloat(amountStr) || 0;
  const weight = parseFloat(weightStr) || 0;

  /** Effective rupee amount for the transaction */
  const effectiveAmount = useMemo(() => {
    if (inputMode === 'amount') return amount;
    return Math.round(weight * DEMO_GOLD_RATE * 100) / 100;
  }, [inputMode, amount, weight]);

  /** Gold grams the user will receive */
  const goldGrams = useMemo(() => {
    if (inputMode === 'weight') return weight;
    return Math.round((amount / DEMO_GOLD_RATE) * 10000) / 10000;
  }, [inputMode, amount, weight]);

  /** Whether the CTA should be enabled */
  const isValid = useMemo(() => {
    if (inputMode === 'amount') return amount >= 100;
    return weight > 0;
  }, [inputMode, amount, weight]);

  // ---------- Helpers ----------
  const formatCurrency = (val: number): string =>
    '₹' + val.toLocaleString('en-IN', { maximumFractionDigits: 2 });

  const formatGrams = (val: number): string =>
    val.toFixed(4) + ' g';

  // Quick-amount chip handler
  const handleChip = (value: number) => {
    setSelectedChip(value);
    setAmountStr(value.toString());
  };

  // Percentage chip for weight mode (based on current holdings)
  const quickAmounts = [1000, 2000, 5000, 10000];

  // Proceed to review
  const handleProceed = () => {
    if (!isValid) return;
    setFlowState('review');
  };

  // Confirm purchase
  const handleConfirm = () => {
    const newState = buyGold(state, effectiveAmount, paymentMethod);
    setState(newState);
    showToast('Gold purchased successfully!', 'success');
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
        <span className="screen-header-title">Buy Gold</span>
      </div>

      <div className="screen-content">
        {/* Demo disclaimer banner */}
        <div className="demo-banner">Illustrative Demo — No real money involved</div>

        {/* Segmented control: Amount / Weight */}
        <div className="segmented-control" style={{ marginBottom: 24 }}>
          <button
            className={`segmented-item ${inputMode === 'amount' ? 'active' : ''}`}
            onClick={() => { setInputMode('amount'); setWeightStr(''); setSelectedChip(null); }}
          >
            Amount (₹)
          </button>
          <button
            className={`segmented-item ${inputMode === 'weight' ? 'active' : ''}`}
            onClick={() => { setInputMode('weight'); setAmountStr(''); setSelectedChip(null); }}
          >
            Weight (g)
          </button>
        </div>

        {/* ------- Amount mode ------- */}
        {inputMode === 'amount' && (
          <>
            {/* Large amount display */}
            <div className="amount-display">
              <span className="currency">₹ </span>
              {amountStr || '0'}
            </div>

            {/* Hidden-ish input — styled to blend in */}
            <div style={{ marginBottom: 16 }}>
              <input
                type="number"
                className="form-input"
                placeholder="Enter amount (min ₹100)"
                value={amountStr}
                min={100}
                onChange={(e) => {
                  setAmountStr(e.target.value);
                  setSelectedChip(null);
                }}
                style={{ textAlign: 'center', fontSize: 16 }}
              />
              {amountStr !== '' && amount < 100 && (
                <div className="form-error" style={{ textAlign: 'center', marginTop: 6 }}>
                  Minimum amount is ₹100
                </div>
              )}
            </div>

            {/* Quick amount chips */}
            <div className="chip-row" style={{ justifyContent: 'center', marginBottom: 24 }}>
              {quickAmounts.map((val) => (
                <button
                  key={val}
                  className={`chip ${selectedChip === val ? 'active' : ''}`}
                  onClick={() => handleChip(val)}
                >
                  ₹{val.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </>
        )}

        {/* ------- Weight mode ------- */}
        {inputMode === 'weight' && (
          <div style={{ marginBottom: 24 }}>
            <label className="form-label">Enter gold weight</label>
            <div className="form-input-prefix">
              <input
                type="number"
                placeholder="e.g. 0.5"
                step="0.0001"
                min="0"
                value={weightStr}
                onChange={(e) => setWeightStr(e.target.value)}
                style={{ textAlign: 'left' }}
              />
              <span className="prefix">g</span>
            </div>
            {weightStr !== '' && weight <= 0 && (
              <div className="form-error" style={{ marginTop: 6 }}>
                Please enter a valid weight
              </div>
            )}
          </div>
        )}

        {/* Gold quote card */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, color: COLORS.secondaryText, marginBottom: 4 }}>
                You will receive
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.primaryGold }}>
                {goldGrams.toFixed(4)} g
              </div>
              <div style={{ fontSize: 12, color: COLORS.secondaryText, marginTop: 4 }}>
                Gold price: ₹{DEMO_GOLD_RATE.toLocaleString('en-IN')}/g
              </div>
            </div>
            {/* Small gold coin decoration */}
            <div className="gold-coin-icon">Au</div>
          </div>
          <div
            style={{
              fontSize: 10,
              color: COLORS.secondaryText,
              marginTop: 10,
              fontStyle: 'italic',
            }}
          >
            (Illustrative quote)
          </div>
        </div>

        {/* Payment method section */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.mainText,
              marginBottom: 10,
            }}
          >
            Payment Method
          </div>

          {/* UPI option */}
          <div
            className={`payment-card ${paymentMethod === 'UPI' ? 'selected' : ''}`}
            style={{ marginBottom: 10 }}
            onClick={() => setPaymentMethod('UPI')}
          >
            <div className="payment-card-icon">
              <Smartphone size={18} />
            </div>
            <div className="payment-card-info">
              <div className="payment-card-name">UPI</div>
              <div className="payment-card-desc">Pay via any UPI app</div>
            </div>
            <div className="payment-card-check">
              {paymentMethod === 'UPI' && <Check size={14} />}
            </div>
          </div>

          {/* Bank Account option */}
          <div
            className={`payment-card ${paymentMethod === 'Bank Account' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('Bank Account')}
          >
            <div className="payment-card-icon">
              <Building2 size={18} />
            </div>
            <div className="payment-card-info">
              <div className="payment-card-name">Bank Account</div>
              <div className="payment-card-desc">HDFC Bank ****6789</div>
            </div>
            <div className="payment-card-check">
              {paymentMethod === 'Bank Account' && <Check size={14} />}
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          className="btn btn-primary"
          disabled={!isValid}
          onClick={handleProceed}
        >
          Proceed to Pay
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
        <span className="screen-header-title">Order Review</span>
      </div>

      <div className="screen-content">
        <div className="demo-banner">Illustrative Demo — No real money involved</div>

        <div className="card" style={{ marginBottom: 24 }}>
          {/* Amount */}
          <div className="summary-row">
            <span className="label">Amount</span>
            <span className="value">{formatCurrency(effectiveAmount)}</span>
          </div>

          {/* Gold Quantity */}
          <div className="summary-row">
            <span className="label">Gold Quantity</span>
            <span className="value">{formatGrams(goldGrams)}</span>
          </div>

          {/* Gold Rate */}
          <div className="summary-row">
            <span className="label">Gold Rate</span>
            <span className="value">
              ₹{DEMO_GOLD_RATE.toLocaleString('en-IN')}/g{' '}
              <span style={{ fontSize: 11, color: COLORS.secondaryText, fontWeight: 400 }}>
                (Illustrative)
              </span>
            </span>
          </div>

          {/* Payment Method */}
          <div className="summary-row">
            <span className="label">Payment Method</span>
            <span className="value">{paymentMethod}</span>
          </div>

          {/* Reference */}
          <div className="summary-row">
            <span className="label">Reference</span>
            <span className="value" style={{ fontSize: 12, fontFamily: 'monospace' }}>
              {reference}
            </span>
          </div>
        </div>

        {/* Confirm CTA */}
        <button className="btn btn-primary" onClick={handleConfirm}>
          Confirm Demo Purchase
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

      <div className="success-title">Purchase Successful!</div>
      <div className="success-desc">
        Your gold has been added to your portfolio
      </div>

      {/* Gold quantity in large gold text */}
      <div className="success-detail">{formatGrams(goldGrams)}</div>

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

export default BuyGoldScreen;

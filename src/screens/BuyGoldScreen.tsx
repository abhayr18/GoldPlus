// ============================================
// YASS Gold & Bullion - Buy Digital Gold Screen
// White + Gold Clean Minimalist & Professional Flow
// Real-time Dubai Gold Souk Benchmark
// ============================================

import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  Check,
  CreditCard,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { buyMetalAction, generateTransactionId } from '../state/appState';
import { DEMO_GOLD_RATE } from '../constants';

type FlowState = 'input' | 'review' | 'success';
type InputMode = 'amount' | 'weight';
type PaymentMethod = 'Apple Pay / Card' | 'Aani Instant Pay' | 'Emirates NBD Bank';

export const BuyGoldScreen: React.FC = () => {
  const { state, setState, navigate, back, showToast } = useApp();

  const [flowState, setFlowState] = useState<FlowState>('input');
  const [inputMode, setInputMode] = useState<InputMode>('amount');
  const [amountStr, setAmountStr] = useState<string>('500');
  const [weightStr, setWeightStr] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Apple Pay / Card');
  const [selectedChip, setSelectedChip] = useState<number | null>(500);
  const [reference] = useState<string>(generateTransactionId());

  // 60-Second Real-Time Price Lock Timer
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          showToast('Gold rate refreshed from Dubai Gold Souk benchmark', 'info');
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showToast]);

  const activeRate = DEMO_GOLD_RATE;
  const amount = parseFloat(amountStr) || 0;
  const weight = parseFloat(weightStr) || 0;

  const effectiveAmount = useMemo(() => {
    if (inputMode === 'amount') return amount;
    return Math.round(weight * activeRate * 100) / 100;
  }, [inputMode, amount, weight, activeRate]);

  const goldGrams = useMemo(() => {
    if (inputMode === 'weight') return weight;
    return Math.round((amount / activeRate) * 10000) / 10000;
  }, [inputMode, amount, weight, activeRate]);

  const isValid = useMemo(() => {
    if (inputMode === 'amount') return amount >= 10;
    return weight > 0;
  }, [inputMode, amount, weight]);

  const formatCurrency = (val: number): string =>
    'AED ' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const formatGrams = (val: number): string => val.toFixed(4) + ' g';

  const handleChip = (value: number) => {
    setSelectedChip(value);
    setAmountStr(value.toString());
  };

  const quickAmounts = [100, 250, 500, 1000, 5000];

  const handleProceed = () => {
    if (!isValid) return;
    setFlowState('review');
  };

  const handleConfirm = () => {
    setState(buyMetalAction(state, 'gold', effectiveAmount, paymentMethod));
    setFlowState('success');
    showToast(`Successfully bought ${formatGrams(goldGrams)} of 24K Gold!`, 'success');
  };

  // ── 1. INPUT STATE ─────────────────────────────────────────
  const renderInputState = () => (
    <>
      <div className="screen-header">
        <button className="screen-header-back" onClick={back} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Buy 24K Digital Gold</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        {/* Live Spot Rate Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 16px',
            borderRadius: 12,
            background: '#FEFBF2',
            border: '1px solid #EED8A1',
            marginBottom: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 10.5, color: '#64748B', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 0.5 }}>
              Dubai Gold Souk Benchmark (24K 999.9)
            </div>
            <div style={{ fontSize: 19, fontWeight: 900, color: '#0F172A', marginTop: 2 }}>
              {formatCurrency(activeRate)} <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>/ gram</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 11,
              fontWeight: 800,
              color: '#8F6914',
              background: '#FFFFFF',
              border: '1px solid #EED8A1',
              padding: '4px 10px',
              borderRadius: 20,
            }}
          >
            <Clock size={13} />
            <span>Lock: {secondsRemaining}s</span>
          </div>
        </div>

        {/* Input Mode Selector */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          <button
            onClick={() => setInputMode('amount')}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid',
              borderColor: inputMode === 'amount' ? '#C59B27' : '#E2E8F0',
              background: inputMode === 'amount' ? '#FEFBF2' : '#FFFFFF',
              color: inputMode === 'amount' ? '#8F6914' : '#64748B',
              fontSize: 12.5,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Buy in AED (Cash)
          </button>
          <button
            onClick={() => setInputMode('weight')}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid',
              borderColor: inputMode === 'weight' ? '#C59B27' : '#E2E8F0',
              background: inputMode === 'weight' ? '#FEFBF2' : '#FFFFFF',
              color: inputMode === 'weight' ? '#8F6914' : '#64748B',
              fontSize: 12.5,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Buy in Grams (Weight)
          </button>
        </div>

        {/* Amount Input Card */}
        <div className="card" style={{ marginBottom: 14 }}>
          {inputMode === 'amount' ? (
            <div>
              <label className="form-label">How much would you like to buy?</label>
              <div className="form-input-prefix">
                <span className="prefix">AED</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={amountStr}
                  onChange={(e) => {
                    setAmountStr(e.target.value);
                    setSelectedChip(null);
                  }}
                  autoFocus
                />
              </div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 8 }}>
                You will receive:{' '}
                <strong style={{ color: '#0F172A' }}>{formatGrams(goldGrams)}</strong> of pure 24K gold
              </div>
            </div>
          ) : (
            <div>
              <label className="form-label">Weight of 24K gold to purchase:</label>
              <div className="form-input-prefix">
                <span className="prefix">Grams</span>
                <input
                  type="number"
                  step="0.0001"
                  placeholder="e.g. 5.0000"
                  value={weightStr}
                  onChange={(e) => setWeightStr(e.target.value)}
                  autoFocus
                />
              </div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 8 }}>
                Total payable:{' '}
                <strong style={{ color: '#0F172A' }}>{formatCurrency(effectiveAmount)}</strong>
              </div>
            </div>
          )}

          {/* Quick Amount Chips */}
          {inputMode === 'amount' && (
            <div className="chip-row" style={{ marginTop: 14 }}>
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  className={`chip ${selectedChip === amt ? 'active' : ''}`}
                  onClick={() => handleChip(amt)}
                >
                  +{amt} AED
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 0% VAT Notice */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 14px',
            background: '#ECFDF5',
            border: '1px solid #A7F3D0',
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <ShieldCheck size={16} color="#059669" />
          <span style={{ fontSize: 11.5, color: '#059669', fontWeight: 600 }}>
            0% UAE VAT on Investment Grade Gold • Instant Brink's Vault Deposit
          </span>
        </div>

        <button
          className="btn btn-primary"
          disabled={!isValid}
          onClick={handleProceed}
          style={{ height: 46, fontSize: 14 }}
        >
          Review Order ({formatCurrency(effectiveAmount)})
        </button>
      </div>
    </>
  );

  // ── 2. REVIEW STATE ────────────────────────────────────────
  const renderReviewState = () => (
    <>
      <div className="screen-header">
        <button className="screen-header-back" onClick={() => setFlowState('input')} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Confirm Order</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#64748B' }}>Purchase Breakdown</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>
            {formatGrams(goldGrams)} 24K 999.9 Fine Gold
          </div>

          <div style={{ height: 1, background: '#E2E8F0', margin: '14px 0' }} />

          <div className="summary-row">
            <span className="label">Spot Benchmark Rate</span>
            <span className="value">{formatCurrency(activeRate)}/g</span>
          </div>
          <div className="summary-row">
            <span className="label">Assay Purity Standard</span>
            <span className="value">999.9 Dubai Good Delivery</span>
          </div>
          <div className="summary-row">
            <span className="label">Brink’s DMCC Custody</span>
            <span className="value" style={{ color: '#059669' }}>FREE</span>
          </div>
          <div className="summary-row">
            <span className="label">UAE VAT (0% Exempt)</span>
            <span className="value" style={{ color: '#059669' }}>AED 0.00</span>
          </div>
          <div className="summary-row total">
            <span className="label">Total Amount Payable</span>
            <span className="value">{formatCurrency(effectiveAmount)}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>
            Select Payment Method
          </div>

          {(['Apple Pay / Card', 'Aani Instant Pay', 'Emirates NBD Bank'] as const).map((method) => (
            <div
              key={method}
              onClick={() => setPaymentMethod(method)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: 10,
                border: '1px solid',
                borderColor: paymentMethod === method ? '#C59B27' : '#E2E8F0',
                background: paymentMethod === method ? '#FEFBF2' : '#FFFFFF',
                marginBottom: 8,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CreditCard size={18} color={paymentMethod === method ? '#8F6914' : '#64748B'} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{method}</span>
              </div>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  border: `2px solid ${paymentMethod === method ? '#C59B27' : '#CBD5E1'}`,
                  background: paymentMethod === method ? '#C59B27' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {paymentMethod === method && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-primary" onClick={handleConfirm} style={{ height: 48, fontSize: 14.5 }}>
          Pay {formatCurrency(effectiveAmount)} via {paymentMethod}
        </button>
      </div>
    </>
  );

  // ── 3. SUCCESS STATE ───────────────────────────────────────
  const renderSuccessState = () => (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: '#ECFDF5',
          border: '2px solid #059669',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#059669',
          marginBottom: 16,
        }}
      >
        <Check size={38} strokeWidth={3} />
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 6 }}>
        Gold Purchase Completed!
      </h2>
      <p style={{ fontSize: 13, color: '#64748B', maxWidth: 300, lineHeight: 1.5, marginBottom: 20 }}>
        Your pure 24K gold is securely allocated and stored in your Brink’s DMCC vault.
      </p>

      <div
        style={{
          padding: '16px 24px',
          borderRadius: 14,
          background: '#FEFBF2',
          border: '1px solid #EED8A1',
          marginBottom: 24,
          width: '100%',
          maxWidth: 320,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 900, color: '#8F6914' }}>
          +{formatGrams(goldGrams)}
        </div>
        <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
          24K 999.9 Dubai Good Delivery Gold
        </div>
        <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 8 }}>
          Ref: {reference}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 320 }}>
        <button className="btn btn-primary" onClick={() => navigate('delivery')}>
          Order Doorstep Physical Bullion
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('dashboard')}>
          Back to Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="screen-container">
      {flowState === 'input' && renderInputState()}
      {flowState === 'review' && renderReviewState()}
      {flowState === 'success' && renderSuccessState()}
    </div>
  );
};

export default BuyGoldScreen;

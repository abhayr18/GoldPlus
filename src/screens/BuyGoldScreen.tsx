// ============================================
// OGold Wallet — Buy Gold & Silver Screen
// Buy 24K Gold & .999 Silver Instantly from AED 1
// App Store: id6504926022
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
import { DEMO_GOLD_RATE, DEMO_SILVER_RATE } from '../constants';
import type { MetalType } from '../types';

type FlowState = 'input' | 'review' | 'success';
type InputMode = 'amount' | 'weight';
type PaymentMethod = 'Apple Pay / Card' | 'Aani Instant Pay' | 'Emirates NBD Transfer';

export const BuyGoldScreen: React.FC = () => {
  const { state, setState, navigate, back, showToast } = useApp();

  // ---------- Local state ----------
  const [metal, setMetal] = useState<MetalType>('gold');
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
          showToast('Spot rate refreshed to live Dubai benchmark', 'info');
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showToast]);

  const activeRate = metal === 'gold' ? DEMO_GOLD_RATE : DEMO_SILVER_RATE;

  // ---------- Derived values ----------
  const amount = parseFloat(amountStr) || 0;
  const weight = parseFloat(weightStr) || 0;

  const effectiveAmount = useMemo(() => {
    if (inputMode === 'amount') return amount;
    return Math.round(weight * activeRate * 100) / 100;
  }, [inputMode, amount, weight, activeRate]);

  const metalGrams = useMemo(() => {
    if (inputMode === 'weight') return weight;
    return Math.round((amount / activeRate) * 10000) / 10000;
  }, [inputMode, amount, weight, activeRate]);

  const isValid = useMemo(() => {
    if (inputMode === 'amount') return amount >= 1; // OGold allows buying from 1 AED
    return weight > 0;
  }, [inputMode, amount, weight]);

  const formatCurrency = (val: number): string =>
    'AED ' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const formatGrams = (val: number): string => val.toFixed(4) + ' g';

  const handleChip = (value: number) => {
    setSelectedChip(value);
    setAmountStr(value.toString());
  };

  const quickAmounts = metal === 'gold' ? [100, 250, 500, 1000, 5000] : [50, 100, 250, 500, 1000];

  const handleProceed = () => {
    if (!isValid) return;
    setFlowState('review');
  };

  const handleConfirm = () => {
    setState(buyMetalAction(state, metal, effectiveAmount, paymentMethod));
    setFlowState('success');
    showToast(`Successfully bought ${formatGrams(metalGrams)} of ${metal === 'gold' ? '24K Gold' : '.999 Silver'}!`, 'success');
  };

  // ── 1. INPUT STATE ─────────────────────────────────────────
  const renderInputState = () => (
    <>
      <div className="screen-header">
        <button className="screen-header-back" onClick={back} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Buy Precious Metals</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        {/* Metal Toggle: Gold vs Silver */}
        <div className="metal-toggle-bar">
          <button
            className={`metal-toggle-btn ${metal === 'gold' ? 'active gold' : ''}`}
            onClick={() => {
              setMetal('gold');
              setSelectedChip(500);
              setAmountStr('500');
            }}
          >
            <span>24K Gold (999.9)</span>
          </button>
          <button
            className={`metal-toggle-btn ${metal === 'silver' ? 'active silver' : ''}`}
            onClick={() => {
              setMetal('silver');
              setSelectedChip(250);
              setAmountStr('250');
            }}
          >
            <span>.999 Pure Silver</span>
          </button>
        </div>

        {/* Live Spot Rate Banner with Timer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            borderRadius: 12,
            background: '#161D2D',
            border: `1px solid ${metal === 'gold' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(148, 163, 184, 0.3)'}`,
            marginBottom: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 10.5, color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 0.5 }}>
              Live Dubai Spot Benchmark
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#FFFFFF', marginTop: 2 }}>
              {formatCurrency(activeRate)} <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>/ gram</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 11,
              fontWeight: 800,
              color: '#FBBF24',
              background: 'rgba(245, 158, 11, 0.15)',
              padding: '4px 10px',
              borderRadius: 20,
            }}
          >
            <Clock size={13} />
            <span>Lock: {secondsRemaining}s</span>
          </div>
        </div>

        {/* Amount / Weight Input Mode Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          <button
            onClick={() => setInputMode('amount')}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 8,
              border: 'none',
              background: inputMode === 'amount' ? '#F59E0B' : '#161D2D',
              color: inputMode === 'amount' ? '#0A0D14' : '#94A3B8',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Enter in AED (Cash)
          </button>
          <button
            onClick={() => setInputMode('weight')}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 8,
              border: 'none',
              background: inputMode === 'weight' ? '#F59E0B' : '#161D2D',
              color: inputMode === 'weight' ? '#0A0D14' : '#94A3B8',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Enter in Grams (Weight)
          </button>
        </div>

        {/* Input Card */}
        <div className="card" style={{ marginBottom: 14 }}>
          {inputMode === 'amount' ? (
            <div>
              <label className="form-label">How much would you like to invest?</label>
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
              <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 8 }}>
                You will receive:{' '}
                <strong style={{ color: '#FBBF24' }}>{formatGrams(metalGrams)}</strong> of {metal === 'gold' ? '24K 999.9 Gold' : '.999 Silver'}
              </div>
            </div>
          ) : (
            <div>
              <label className="form-label">Weight of bullion to purchase:</label>
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
              <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 8 }}>
                Total payable:{' '}
                <strong style={{ color: '#FBBF24' }}>{formatCurrency(effectiveAmount)}</strong>
              </div>
            </div>
          )}

          {/* Quick Selection Chips */}
          {inputMode === 'amount' && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleChip(amt)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 8,
                    border: '1px solid',
                    borderColor: selectedChip === amt ? '#F59E0B' : '#1E293B',
                    background: selectedChip === amt ? 'rgba(245, 158, 11, 0.15)' : '#121826',
                    color: selectedChip === amt ? '#FBBF24' : '#94A3B8',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  +{amt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 0% VAT Notice & Shariah Shield */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 14px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <ShieldCheck size={16} color="#10B981" />
          <span style={{ fontSize: 11.5, color: '#10B981', fontWeight: 600 }}>
            0% UAE VAT on Investment Grade Bullion • Instant Depository Credit
          </span>
        </div>

        {/* Continue Button */}
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
          <div style={{ fontSize: 12, color: '#94A3B8' }}>Asset Details</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
            {formatGrams(metalGrams)} {metal === 'gold' ? '24K 999.9 Fine Gold' : '.999 Pure Silver'}
          </div>

          <div style={{ height: 1, background: '#1E293B', margin: '14px 0' }} />

          <div className="summary-row">
            <span className="label">Spot Benchmark Rate</span>
            <span className="value">{formatCurrency(activeRate)}/g</span>
          </div>
          <div className="summary-row">
            <span className="label">Assay Purity Standard</span>
            <span className="value">{metal === 'gold' ? '999.9 Dubai Good Delivery' : '.999 Fine Bullion'}</span>
          </div>
          <div className="summary-row">
            <span className="label">Vault Custody & Insurance</span>
            <span className="value" style={{ color: '#10B981' }}>FREE (DNI Insured)</span>
          </div>
          <div className="summary-row">
            <span className="label">UAE VAT (Investment Grade)</span>
            <span className="value" style={{ color: '#10B981' }}>AED 0.00 (0% Exempt)</span>
          </div>
          <div className="summary-row total">
            <span className="label">Total Amount Payable</span>
            <span className="value">{formatCurrency(effectiveAmount)}</span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', marginBottom: 12 }}>
            Select Payment Method
          </div>

          {(['Apple Pay / Card', 'Aani Instant Pay', 'Emirates NBD Transfer'] as const).map((method) => (
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
                borderColor: paymentMethod === method ? '#F59E0B' : '#1E293B',
                background: paymentMethod === method ? 'rgba(245, 158, 11, 0.1)' : '#121826',
                marginBottom: 8,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CreditCard size={18} color={paymentMethod === method ? '#FBBF24' : '#94A3B8'} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>{method}</span>
              </div>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  border: `2px solid ${paymentMethod === method ? '#F59E0B' : '#64748B'}`,
                  background: paymentMethod === method ? '#F59E0B' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {paymentMethod === method && <Check size={12} color="#0A0D14" strokeWidth={3} />}
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
        background: '#0A0D14',
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '2px solid #10B981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#10B981',
          marginBottom: 16,
          boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)',
        }}
      >
        <Check size={38} strokeWidth={3} />
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 900, color: '#FFFFFF', marginBottom: 6 }}>
        Purchase Completed!
      </h2>
      <p style={{ fontSize: 13, color: '#94A3B8', maxWidth: 300, lineHeight: 1.5, marginBottom: 20 }}>
        Your bullion is securely deposited into your Brink’s DMCC insured vault.
      </p>

      <div
        style={{
          padding: '16px 24px',
          borderRadius: 14,
          background: '#161D2D',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          marginBottom: 24,
          width: '100%',
          maxWidth: 320,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 900, color: '#FBBF24' }}>
          +{formatGrams(metalGrams)}
        </div>
        <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>
          {metal === 'gold' ? '24K 999.9 Fine Gold' : '.999 Pure Silver'}
        </div>
        <div style={{ fontSize: 11, color: '#64748B', marginTop: 8 }}>
          Ref: {reference}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 320 }}>
        <button className="btn btn-primary" onClick={() => navigate('card')}>
          View in OGold Mastercard
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('dashboard')}>
          Back to Wallet
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

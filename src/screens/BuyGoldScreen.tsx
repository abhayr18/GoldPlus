// ============================================
// YASS Gold & YASS Bullion — Buy Gold Screen
// Enhanced with SafeGold 5-min price lock & Karat selection
// A product by YASS Group, Dubai
// ============================================

import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  Check,
  Smartphone,
  Building2,
  CreditCard,
  Clock,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { buyGold, generateTransactionId } from '../state/appState';
import { DUBAI_MARKET_RATES, COLORS } from '../constants';

type FlowState = 'input' | 'review' | 'success';
type InputMode = 'amount' | 'weight';
type KaratChoice = '24K' | '22K';
type PaymentMethod = 'Aani Instant Pay' | 'Emirates NBD Bank' | 'Apple Pay / Card';

export const BuyGoldScreen: React.FC = () => {
  const { state, setState, navigate, back, showToast } = useApp();

  // ---------- Local state ----------
  const [flowState, setFlowState] = useState<FlowState>('input');
  const [inputMode, setInputMode] = useState<InputMode>('amount');
  const [karat, setKarat] = useState<KaratChoice>('24K');
  const [amountStr, setAmountStr] = useState<string>('500');
  const [weightStr, setWeightStr] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Aani Instant Pay');
  const [selectedChip, setSelectedChip] = useState<number | null>(500);
  const [reference] = useState<string>(generateTransactionId());

  // SafeGold 5-Minute Price Lock Timer
  const [secondsRemaining, setSecondsRemaining] = useState<number>(298);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          showToast('Gold rate refreshed from Dubai Gold Souk & DMCC benchmark', 'info');
          return 300; // Reset 5-min window
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showToast]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Rates based on karat choice
  const activeRate = karat === '24K' ? DUBAI_MARKET_RATES.rate24K : DUBAI_MARKET_RATES.rate22K;

  // ---------- Derived values ----------
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

  // ---------- Helpers ----------
  const formatCurrency = (val: number): string =>
    'AED ' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const formatGrams = (val: number): string =>
    val.toFixed(4) + ' g';

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
    const newState = buyGold(state, effectiveAmount, paymentMethod);
    setState(newState);
    showToast(`Purchased ${goldGrams.toFixed(4)}g 24K pure gold!`, 'success');
    setFlowState('success');
  };

  // =============================================
  // INPUT STATE
  // =============================================
  const renderInputState = () => (
    <>
      <div className="screen-header">
        <button className="screen-header-back" onClick={back}>
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Buy Digital Gold</span>
        <div style={{ width: 24 }} />
      </div>

      <div className="screen-content" style={{ paddingBottom: 80 }}>
        {/* SafeGold 5-Minute Price Lock Timer Banner */}
        <div
          style={{
            background: '#FFF9E6',
            border: '1px solid #F4D681',
            borderRadius: 12,
            padding: '10px 14px',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#8F6600', fontWeight: 600 }}>
            <Clock size={16} />
            <span>Rate locked for:</span>
            <span style={{ fontWeight: 800, fontSize: 14, fontFamily: 'monospace' }}>
              {formatTimer(secondsRemaining)}
            </span>
          </div>

          <div style={{ fontSize: 11, color: '#8F6600', display: 'flex', alignItems: 'center', gap: 4 }}>
            <ShieldCheck size={14} color="#16865B" />
            <span>DMCC Guaranteed</span>
          </div>
        </div>

        {/* Karat Selector (24K vs 22K) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            marginBottom: 20,
          }}
        >
          <div
            onClick={() => setKarat('24K')}
            style={{
              padding: '12px 14px',
              borderRadius: 12,
              border: karat === '24K' ? '2px solid #E8B63F' : '1px solid #E2E8F0',
              background: karat === '24K' ? '#FFF' : '#FAFAFA',
              boxShadow: karat === '24K' ? '0 4px 12px rgba(232, 182, 63, 0.15)' : 'none',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: '#16865B', textTransform: 'uppercase' }}>
              0% VAT • 999.9 Purity
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.darkCharcoal, marginTop: 2 }}>
              24K Bullion Gold
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.primaryGold, marginTop: 2 }}>
              AED {DUBAI_MARKET_RATES.rate24K.toFixed(2)} /g
            </div>
          </div>

          <div
            onClick={() => setKarat('22K')}
            style={{
              padding: '12px 14px',
              borderRadius: 12,
              border: karat === '22K' ? '2px solid #E8B63F' : '1px solid #E2E8F0',
              background: karat === '22K' ? '#FFF' : '#FAFAFA',
              boxShadow: karat === '22K' ? '0 4px 12px rgba(232, 182, 63, 0.15)' : 'none',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.secondaryText, textTransform: 'uppercase' }}>
              916 Jewellery Grade
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.darkCharcoal, marginTop: 2 }}>
              22K Standard Gold
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.darkCharcoal, marginTop: 2 }}>
              AED {DUBAI_MARKET_RATES.rate22K.toFixed(2)} /g
            </div>
          </div>
        </div>

        {/* Segmented control: Amount / Weight */}
        <div className="segmented-control" style={{ marginBottom: 20 }}>
          <button
            className={`segmented-item ${inputMode === 'amount' ? 'active' : ''}`}
            onClick={() => {
              setInputMode('amount');
              setWeightStr('');
              setSelectedChip(500);
              setAmountStr('500');
            }}
          >
            Buy in AED
          </button>
          <button
            className={`segmented-item ${inputMode === 'weight' ? 'active' : ''}`}
            onClick={() => {
              setInputMode('weight');
              setAmountStr('');
              setSelectedChip(null);
              setWeightStr('1.0');
            }}
          >
            Buy in Grams
          </button>
        </div>

        {/* ------- Amount mode ------- */}
        {inputMode === 'amount' && (
          <>
            <div className="amount-display">
              <span className="currency">AED </span>
              {amountStr || '0'}
            </div>

            <div style={{ marginBottom: 16 }}>
              <input
                type="number"
                className="form-input"
                placeholder="Enter amount (min AED 10)"
                value={amountStr}
                min={10}
                onChange={(e) => {
                  setAmountStr(e.target.value);
                  setSelectedChip(null);
                }}
                style={{ textAlign: 'center', fontSize: 18, fontWeight: 700 }}
              />
              {amountStr !== '' && amount < 10 && (
                <div className="form-error" style={{ textAlign: 'center', marginTop: 6 }}>
                  Minimum purchase is AED 10
                </div>
              )}
            </div>

            <div className="chip-row" style={{ justifyContent: 'center', marginBottom: 20 }}>
              {quickAmounts.map((val) => (
                <button
                  key={val}
                  className={`chip ${selectedChip === val ? 'active' : ''}`}
                  onClick={() => handleChip(val)}
                >
                  AED {val}
                </button>
              ))}
            </div>
          </>
        )}

        {/* ------- Weight mode ------- */}
        {inputMode === 'weight' && (
          <div style={{ marginBottom: 20 }}>
            <label className="form-label">Enter gold weight</label>
            <div className="form-input-prefix">
              <input
                type="number"
                placeholder="e.g. 1.0"
                step="0.0001"
                min="0"
                value={weightStr}
                onChange={(e) => setWeightStr(e.target.value)}
                style={{ textAlign: 'left', fontSize: 16, fontWeight: 600 }}
              />
              <span className="prefix">g</span>
            </div>

            <div className="chip-row" style={{ marginTop: 10, justifyContent: 'center' }}>
              {[1, 5, 10, 20, 50, 100].map((g) => (
                <button
                  key={g}
                  className={`chip ${weightStr === g.toString() ? 'active' : ''}`}
                  onClick={() => setWeightStr(g.toString())}
                >
                  {g}g
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Gold Quote Card (Gullak & SafeGold style) */}
        <div
          className="card"
          style={{
            marginBottom: 20,
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FDFBF7 100%)',
            border: '1px solid #E8B63F',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: COLORS.secondaryText, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Estimated Pure Gold Credited
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.primaryGold, marginTop: 4 }}>
                {goldGrams.toFixed(4)} <span style={{ fontSize: 16, color: COLORS.darkCharcoal }}>g</span>
              </div>
              <div style={{ fontSize: 12, color: COLORS.secondaryText, marginTop: 4 }}>
                Live Dubai Gold Souk Rate: <strong>AED {activeRate.toFixed(2)}/g</strong>
              </div>
            </div>
            <div className="gold-coin-icon">
              <Sparkles size={20} color="#FFF" />
            </div>
          </div>

          <div
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: '1px solid #E9E7E0',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 11,
              color: '#16865B',
              fontWeight: 600,
            }}
          >
            <span>✓ 0% UAE VAT (Investment Gold)</span>
            <span>✓ Free Lifetime Brink's Vaulting</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.darkCharcoal, marginBottom: 12 }}>
            Instant UAE Payment Method
          </div>

          {/* Aani */}
          <div
            className={`payment-card ${paymentMethod === 'Aani Instant Pay' ? 'selected' : ''}`}
            style={{ marginBottom: 10 }}
            onClick={() => setPaymentMethod('Aani Instant Pay')}
          >
            <div className="payment-card-icon">
              <Smartphone size={18} />
            </div>
            <div className="payment-card-info">
              <div className="payment-card-name">Aani Instant Pay</div>
              <div className="payment-card-desc">Central Bank of UAE instant debit • 0% fee</div>
            </div>
            <div className="payment-card-check">
              {paymentMethod === 'Aani Instant Pay' && <Check size={14} />}
            </div>
          </div>

          {/* Apple Pay */}
          <div
            className={`payment-card ${paymentMethod === 'Apple Pay / Card' ? 'selected' : ''}`}
            style={{ marginBottom: 10 }}
            onClick={() => setPaymentMethod('Apple Pay / Card')}
          >
            <div className="payment-card-icon">
              <CreditCard size={18} />
            </div>
            <div className="payment-card-info">
              <div className="payment-card-name">Apple Pay / Cards</div>
              <div className="payment-card-desc">Instant 1-tap checkout with Face ID</div>
            </div>
            <div className="payment-card-check">
              {paymentMethod === 'Apple Pay / Card' && <Check size={14} />}
            </div>
          </div>

          {/* Emirates NBD */}
          <div
            className={`payment-card ${paymentMethod === 'Emirates NBD Bank' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('Emirates NBD Bank')}
          >
            <div className="payment-card-icon">
              <Building2 size={18} />
            </div>
            <div className="payment-card-info">
              <div className="payment-card-name">Emirates NBD Direct Debit</div>
              <div className="payment-card-desc">IBAN: AE290260...9821</div>
            </div>
            <div className="payment-card-check">
              {paymentMethod === 'Emirates NBD Bank' && <Check size={14} />}
            </div>
          </div>
        </div>

        {/* Proceed Button */}
        <button className="btn btn-primary" disabled={!isValid} onClick={handleProceed}>
          Proceed to Order Review ({formatCurrency(effectiveAmount)})
        </button>
      </div>
    </>
  );

  // =============================================
  // REVIEW STATE
  // =============================================
  const renderReviewState = () => (
    <>
      <div className="screen-header">
        <button className="screen-header-back" onClick={() => setFlowState('input')}>
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Order Confirmation</span>
        <div style={{ width: 24 }} />
      </div>

      <div className="screen-content">
        <div className="demo-banner">Dubai Financial Prototype — Live Sim Mode</div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="summary-row">
            <span className="label">Total Amount</span>
            <span className="value">{formatCurrency(effectiveAmount)}</span>
          </div>

          <div className="summary-row">
            <span className="label">Pure Gold Credited</span>
            <span className="value" style={{ color: COLORS.primaryGold, fontWeight: 700 }}>
              {formatGrams(goldGrams)}
            </span>
          </div>

          <div className="summary-row">
            <span className="label">Grade & Purity</span>
            <span className="value">{karat} (999.9 Fine DGD)</span>
          </div>

          <div className="summary-row">
            <span className="label">Dubai Gold Souk Benchmark</span>
            <span className="value">AED {activeRate.toFixed(2)} /g</span>
          </div>

          <div className="summary-row">
            <span className="label">Physical Custody</span>
            <span className="value">Brink’s DMCC Vault</span>
          </div>

          <div className="summary-row">
            <span className="label">Payment Channel</span>
            <span className="value">{paymentMethod}</span>
          </div>

          <div className="summary-row">
            <span className="label">Transaction Reference</span>
            <span className="value" style={{ fontSize: 12, fontFamily: 'monospace' }}>
              {reference}
            </span>
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleConfirm}>
          Confirm Purchase of {formatGrams(goldGrams)}
        </button>
      </div>
    </>
  );

  // =============================================
  // SUCCESS STATE
  // =============================================
  const renderSuccessState = () => (
    <div className="success-screen">
      <div className="success-check">
        <Check size={36} strokeWidth={3} />
      </div>

      <div className="success-title">24K Gold Credited to Vault!</div>
      <div className="success-desc">
        Your gold has been securely deposited at Brink's DMCC Vault.
      </div>

      <div className="success-detail">{formatGrams(goldGrams)}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 300, marginTop: 10 }}>
        <button className="btn btn-primary" onClick={() => navigate('vaultProof')}>
          View Vault Certificate
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('dashboard')}>
          Back to Dashboard
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

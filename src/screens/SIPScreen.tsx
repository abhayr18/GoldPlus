// ============================================
// YASS Gold & YASS Bullion — Gold Auto-Save Screen
// Daily Micro-Savings & Central Bank Aani Direct Debit
// A product by YASS Group, Dubai
// ============================================

import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Check,
  Calendar,
  Pause,
  Play,
  Trash2,
  ShieldCheck,
  Sparkles,
  Plus,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { createSIP, updateSIPStatus } from '../state/appState';
import { DEMO_GOLD_RATE } from '../constants';
import type { SIPRecord } from '../types';

type FlowState = 'setup' | 'review' | 'success' | 'manage';
type Frequency = 'daily' | 'weekly' | 'monthly';

const formatCurrency = (val: number): string =>
  'AED ' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const formatGrams = (val: number): string =>
  val.toFixed(4) + ' g';

export const SIPScreen: React.FC = () => {
  const { state, setState, navigate, back, showToast } = useApp();

  const [flowState, setFlowState] = useState<FlowState>(
    state.sips.length > 0 ? 'manage' : 'setup'
  );

  const [frequency, setFrequency] = useState<Frequency>('daily');
  const [amountStr, setAmountStr] = useState<string>('25');
  const [nickname, setNickname] = useState<string>('Daily Gold Micro-Savings');
  const [paymentMethod] = useState<string>('UAE Direct Debit (Aani Pay)');
  const [selectedChip, setSelectedChip] = useState<number>(25);
  const [cancelModalSipId, setCancelModalSipId] = useState<string | null>(null);

  const amount = parseFloat(amountStr) || 0;

  // Estimated gold per installment
  const estimatedGrams = useMemo(() => {
    if (amount <= 0) return 0;
    return Math.round((amount / DEMO_GOLD_RATE) * 10000) / 10000;
  }, [amount]);

  // Projected 1-year accumulation
  const yearlyAccumulation = useMemo(() => {
    let multiplier = 365;
    if (frequency === 'weekly') multiplier = 52;
    if (frequency === 'monthly') multiplier = 12;
    const totalAED = amount * multiplier;
    const totalGrams = totalAED / DEMO_GOLD_RATE;
    return { totalAED, totalGrams };
  }, [amount, frequency]);

  const minAmount = frequency === 'daily' ? 10 : frequency === 'weekly' ? 50 : 100;
  const isValid = amount >= minAmount;

  const quickChips = frequency === 'daily' ? [10, 25, 50, 100] : [100, 250, 500, 1000];

  const handleChipClick = (val: number) => {
    setSelectedChip(val);
    setAmountStr(val.toString());
  };

  const handleConfirmSIP = () => {
    const newState = createSIP(
      state,
      amount,
      frequency,
      paymentMethod,
      nickname.trim() || `${frequency.charAt(0).toUpperCase() + frequency.slice(1)} Gold Auto-Save`
    );
    setState(newState);
    showToast(`Created ${frequency} Gold Auto-Save of AED ${amount}!`, 'success');
    setFlowState('success');
  };

  const handleToggleStatus = (sip: SIPRecord) => {
    const nextStatus = sip.status === 'active' ? 'paused' : 'active';
    const newState = updateSIPStatus(state, sip.id, nextStatus);
    setState(newState);
    showToast(`Auto-Save ${nextStatus === 'active' ? 'resumed' : 'paused'}`, 'info');
  };

  const handleCancelSIP = (id: string) => {
    const newState = updateSIPStatus(state, id, 'cancelled');
    setState(newState);
    setCancelModalSipId(null);
    showToast('Auto-Save plan cancelled', 'info');
  };

  // =============================================
  // SETUP STATE (Micro-Savings Form)
  // =============================================
  const renderSetupState = () => (
    <div className="screen-container">
      <div className="screen-header">
        <button
          className="screen-header-back"
          onClick={() => {
            if (state.sips.length > 0) setFlowState('manage');
            else back();
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Daily Gold Auto-Save</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        {state.sips.length > 0 && (
          <div style={{ marginBottom: 12, textAlign: 'right' }}>
            <button
              onClick={() => setFlowState('manage')}
              style={{
                background: 'none',
                border: 'none',
                color: '#D97706',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← View Active Plans ({state.sips.length})
            </button>
          </div>
        )}

        {/* Frequency Selector */}
        <div style={{ marginBottom: 16 }}>
          <label className="form-label">Auto-Save Frequency</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { id: 'daily', label: 'Daily', badge: '🔥 Popular' },
              { id: 'weekly', label: 'Weekly', badge: null },
              { id: 'monthly', label: 'Monthly', badge: null },
            ].map((item) => {
              const isSelected = frequency === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setFrequency(item.id as Frequency);
                    if (item.id === 'daily') setAmountStr('25');
                    else if (item.id === 'weekly') setAmountStr('100');
                    else setAmountStr('500');
                  }}
                  style={{
                    padding: '10px 6px',
                    borderRadius: 12,
                    border: isSelected ? '2px solid #F59E0B' : '1px solid #E2E8F0',
                    background: isSelected ? '#FEF3C7' : '#FFFFFF',
                    textAlign: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.15s',
                  }}
                >
                  {item.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: -6,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#EA580C',
                        color: '#FFF',
                        fontSize: 8,
                        fontWeight: 800,
                        padding: '1px 5px',
                        borderRadius: 6,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  <div style={{ fontSize: 13, fontWeight: 700, color: isSelected ? '#B45309' : '#0F172A' }}>
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Amount Input */}
        <div className="form-group">
          <label className="form-label">Amount per installment</label>
          <div className="form-input-prefix">
            <span className="prefix">AED</span>
            <input
              type="number"
              value={amountStr}
              onChange={(e) => {
                setAmountStr(e.target.value);
                setSelectedChip(parseFloat(e.target.value) || 0);
              }}
              placeholder={`Min AED ${minAmount}`}
              min={minAmount}
            />
          </div>
        </div>

        {/* Quick Amount Chips */}
        <div className="chip-row" style={{ marginBottom: 16 }}>
          {quickChips.map((val) => (
            <button
              key={val}
              type="button"
              className={`chip ${selectedChip === val ? 'active' : ''}`}
              onClick={() => handleChipClick(val)}
            >
              AED {val}
            </button>
          ))}
        </div>

        {/* 1-Year Projected Accumulation Widget */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
            border: '1px solid #FDE68A',
            borderRadius: 14,
            padding: '14px 16px',
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <Sparkles size={16} color="#D97706" />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#92400E' }}>
              1-Year Wealth Projection
            </span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#78350F' }}>
            ~{yearlyAccumulation.totalGrams.toFixed(2)} grams{' '}
            <span style={{ fontSize: 13, fontWeight: 600, color: '#92400E' }}>
              (AED {yearlyAccumulation.totalAED.toLocaleString('en-US')})
            </span>
          </div>
          <div style={{ fontSize: 11, color: '#B45309', marginTop: 2 }}>
            Small daily discipline builds serious physical gold wealth with 0% fees.
          </div>
        </div>

        {/* Plan Configuration Summary */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="summary-row">
            <span className="label">Plan Nickname</span>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              style={{
                textAlign: 'right',
                border: 'none',
                background: 'transparent',
                fontWeight: 700,
                color: '#0F172A',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: 13,
              }}
            />
          </div>
          <div className="summary-row">
            <span className="label">Debit Method</span>
            <span className="value">Central Bank Aani Pay</span>
          </div>
          <div className="summary-row">
            <span className="label">Est. Gold / Debit</span>
            <span className="value" style={{ color: '#D97706' }}>
              ~{formatGrams(estimatedGrams)}
            </span>
          </div>
        </div>

        {/* Trust Guarantee */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            padding: '10px 12px',
            borderRadius: 10,
            background: '#ECFDF5',
            border: '1px solid #BBF7D0',
            marginBottom: 20,
            alignItems: 'center',
          }}
        >
          <ShieldCheck size={18} color="#059669" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: 11, color: '#047857', fontWeight: 600 }}>
            Zero lock-in. Pause, skip, or cancel your auto-save plan anytime with 1 tap.
          </div>
        </div>

        <button
          className="btn btn-primary"
          disabled={!isValid}
          onClick={() => setFlowState('review')}
        >
          Start {frequency.charAt(0).toUpperCase() + frequency.slice(1)} Auto-Save (AED {amount})
        </button>
      </div>
    </div>
  );

  // =============================================
  // REVIEW STATE
  // =============================================
  const renderReviewState = () => (
    <div className="screen-container">
      <div className="screen-header">
        <button className="screen-header-back" onClick={() => setFlowState('setup')}>
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Confirm Auto-Save</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        <div className="demo-banner">DUBAI FINANCIAL SIMULATION</div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="summary-row">
            <span className="label">Plan Name</span>
            <span className="value">{nickname}</span>
          </div>
          <div className="summary-row">
            <span className="label">Installment Amount</span>
            <span className="value">{formatCurrency(amount)}</span>
          </div>
          <div className="summary-row">
            <span className="label">Frequency</span>
            <span className="value" style={{ textTransform: 'capitalize' }}>{frequency}</span>
          </div>
          <div className="summary-row">
            <span className="label">Estimated Gold / Debit</span>
            <span className="value" style={{ color: '#D97706' }}>~{formatGrams(estimatedGrams)}</span>
          </div>
          <div className="summary-row">
            <span className="label">Debit Gateway</span>
            <span className="value">{paymentMethod}</span>
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleConfirmSIP}>
          Activate Auto-Save Mandate
        </button>
      </div>
    </div>
  );

  // =============================================
  // SUCCESS STATE
  // =============================================
  const renderSuccessState = () => (
    <div className="screen-container" style={{ justifyContent: 'center', alignItems: 'center', padding: 24, textAlign: 'center' }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: '#ECFDF5',
          color: '#10B981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
        }}
      >
        <Check size={36} strokeWidth={3} />
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
        Auto-Save Plan Active!
      </h2>
      <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>
        Your {frequency} debit of AED {amount} will automatically convert to 24K gold in your DMCC vault.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 280 }}>
        <button className="btn btn-primary" onClick={() => setFlowState('manage')}>
          View Active Plans
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('dashboard')}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );

  // =============================================
  // MANAGE STATE (List of active SIPs)
  // =============================================
  const renderManageState = () => (
    <div className="screen-container">
      <div className="screen-header">
        <button className="screen-header-back" onClick={() => navigate('dashboard')}>
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">My Auto-Save Plans</span>
        <button
          onClick={() => setFlowState('setup')}
          style={{
            background: 'none',
            border: 'none',
            color: '#D97706',
            fontWeight: 700,
            fontSize: 12,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Plus size={16} />
          <span>New</span>
        </button>
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        {state.sips.map((sip) => {
          const isActive = sip.status === 'active';
          return (
            <div
              key={sip.id}
              className="card"
              style={{
                borderRadius: 14,
                marginBottom: 12,
                opacity: sip.status === 'cancelled' ? 0.6 : 1,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>
                    {sip.nickname}
                  </div>
                  <div style={{ fontSize: 11, color: '#64748B', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <Calendar size={12} />
                    <span>Next debit: {sip.nextDate}</span>
                  </div>
                </div>

                <span
                  style={{
                    background: isActive ? '#ECFDF5' : '#F1F5F9',
                    color: isActive ? '#059669' : '#64748B',
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 10,
                    textTransform: 'uppercase',
                  }}
                >
                  {sip.status}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 0', borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9' }}>
                <div>
                  <div style={{ fontSize: 10, color: '#64748B' }}>Installment</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{formatCurrency(sip.amount)}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: '#64748B' }}>Gold Accumulated</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#D97706' }}>{formatGrams(sip.totalGoldAccumulated)}</div>
                </div>
              </div>

              {sip.status !== 'cancelled' && (
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <button
                    onClick={() => handleToggleStatus(sip)}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                  >
                    {isActive ? <Pause size={14} /> : <Play size={14} />}
                    <span>{isActive ? 'Pause' : 'Resume'}</span>
                  </button>

                  <button
                    onClick={() => setCancelModalSipId(sip.id)}
                    className="btn btn-secondary btn-sm"
                    style={{ color: '#EF4444' }}
                  >
                    <Trash2 size={14} />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Cancel Confirmation Modal */}
      {cancelModalSipId && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 20,
          }}
        >
          <div style={{ background: '#FFF', borderRadius: 16, padding: 20, maxWidth: 360, width: '100%' }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Cancel Auto-Save Plan?</div>
            <div style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>
              Future debits will stop immediately. All gold accumulated so far remains 100% in your vault.
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary" onClick={() => setCancelModalSipId(null)}>
                Keep Plan
              </button>
              <button
                className="btn btn-primary"
                style={{ background: '#EF4444', color: '#FFF' }}
                onClick={() => handleCancelSIP(cancelModalSipId)}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {flowState === 'setup' && renderSetupState()}
      {flowState === 'review' && renderReviewState()}
      {flowState === 'success' && renderSuccessState()}
      {flowState === 'manage' && renderManageState()}
    </>
  );
};

export default SIPScreen;

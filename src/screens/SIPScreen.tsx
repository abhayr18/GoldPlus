// ============================================
// YASS Gold & YASS Bullion — Gold SIP Screen
// A product by YASS Group, Dubai
// ============================================

import React, { useState, useMemo } from 'react';
import { ArrowLeft, Check, Calendar, PlusCircle, Pause, Play, Trash2, ShieldCheck } from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { createSIP, updateSIPStatus } from '../state/appState';
import { DEMO_GOLD_RATE, COLORS } from '../constants';
import type { SIPRecord } from '../types';

type FlowState = 'setup' | 'review' | 'success' | 'manage';
type Frequency = 'weekly' | 'monthly' | 'quarterly';

const formatCurrency = (val: number): string =>
  'AED ' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const formatGrams = (val: number): string =>
  val.toFixed(4) + ' g';

const SIPScreen: React.FC = () => {
  const { state, setState, navigate, back, showToast } = useApp();

  // If user already has active SIPs, they might start on 'setup' or toggle to 'manage'
  const [flowState, setFlowState] = useState<FlowState>(
    state.sips.length > 0 ? 'manage' : 'setup'
  );

  // Setup form states
  const [frequency, setFrequency] = useState<Frequency>('monthly');
  const [amountStr, setAmountStr] = useState<string>('1000');
  const [nickname, setNickname] = useState<string>('Dubai Gold Accumulator');
  const [paymentMethod] = useState<string>('UAE Direct Debit (Aani)');
  const [selectedChip, setSelectedChip] = useState<number>(1000);
  const [cancelModalSipId, setCancelModalSipId] = useState<string | null>(null);

  const amount = parseFloat(amountStr) || 0;

  // Estimated gold per installment
  const estimatedGrams = useMemo(() => {
    if (amount <= 0) return 0;
    return Math.round((amount / DEMO_GOLD_RATE) * 10000) / 10000;
  }, [amount]);

  // Next installment date display
  const nextDateFormatted = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    d.setDate(5);
    return `5th of ${d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}`;
  }, []);

  const isValid = amount >= 100;

  const handleChipClick = (val: number) => {
    setSelectedChip(val);
    setAmountStr(val.toString());
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAmountStr(val);
    setSelectedChip(parseFloat(val) || 0);
  };

  const handleConfirmSIP = () => {
    const newState = createSIP(
      state,
      amount,
      frequency,
      paymentMethod,
      nickname.trim() || `${frequency.charAt(0).toUpperCase() + frequency.slice(1)} Gold SIP`
    );
    setState(newState);
    showToast('Gold SIP created successfully!', 'success');
    setFlowState('success');
  };

  const handleToggleStatus = (sip: SIPRecord) => {
    const nextStatus = sip.status === 'active' ? 'paused' : 'active';
    const newState = updateSIPStatus(state, sip.id, nextStatus);
    setState(newState);
    showToast(`SIP ${nextStatus === 'active' ? 'resumed' : 'paused'}`, 'info');
  };

  const handleCancelSIP = (id: string) => {
    const newState = updateSIPStatus(state, id, 'cancelled');
    setState(newState);
    setCancelModalSipId(null);
    showToast('SIP cancelled successfully', 'info');
  };

  // =============================================
  // SETUP STATE
  // =============================================
  const renderSetupState = () => (
    <div className="screen-content">
      {/* Header */}
      <div className="screen-header">
        <button
          className="screen-header-back"
          onClick={() => {
            if (state.sips.length > 0) setFlowState('manage');
            else back();
          }}
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="screen-header-title">Start Gold SIP</h2>
          <p style={{ fontSize: 13, color: COLORS.secondaryText, marginTop: 2 }}>
            Invest regularly. Build more gold.
          </p>
        </div>
      </div>

      <div style={{ padding: '0 4px', marginTop: 12 }}>
        {/* Toggle to manage if SIPs exist */}
        {state.sips.length > 0 && (
          <div style={{ marginBottom: 16, textAlign: 'right' }}>
            <button
              onClick={() => setFlowState('manage')}
              style={{
                background: 'none',
                border: 'none',
                color: COLORS.primaryGold,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              ← View Active SIPs ({state.sips.length})
            </button>
          </div>
        )}

        {/* Frequency selector */}
        <label className="form-label" style={{ marginBottom: 8 }}>
          Select Frequency
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
          {(['weekly', 'monthly', 'quarterly'] as Frequency[]).map((freq) => {
            const isSelected = frequency === freq;
            return (
              <div
                key={freq}
                onClick={() => setFrequency(freq)}
                style={{
                  padding: '14px 8px',
                  borderRadius: 12,
                  border: `1.5px solid ${isSelected ? COLORS.primaryGold : COLORS.border}`,
                  background: isSelected ? 'rgba(232, 182, 63, 0.08)' : COLORS.cardBg,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? COLORS.primaryGold : COLORS.border}`,
                    margin: '0 auto 8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isSelected ? COLORS.primaryGold : 'transparent',
                  }}
                >
                  {isSelected && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, textTransform: 'capitalize', color: COLORS.mainText }}>
                  {freq}
                </div>
              </div>
            );
          })}
        </div>

        {/* Amount Input */}
        <div className="form-group">
          <label className="form-label">Amount per installment</label>
          <div className="form-input-prefix">
            <span className="prefix">AED</span>
            <input
              type="number"
              value={amountStr}
              onChange={handleAmountChange}
              placeholder="e.g. 1000"
              min={100}
            />
          </div>
        </div>

        {/* Quick Amount Chips */}
        <div className="chip-row" style={{ marginBottom: 24 }}>
          {[500, 1000, 2000, 5000, 10000].map((val) => (
            <button
              key={val}
              type="button"
              className={`chip ${selectedChip === val ? 'active' : ''}`}
              onClick={() => handleChipClick(val)}
            >
              AED {val.toLocaleString('en-US')}
            </button>
          ))}
        </div>

        {/* SIP Schedule Card */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'rgba(232, 182, 63, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: COLORS.primaryGold,
              }}
            >
              <Calendar size={18} />
            </div>
            <div>
              <div style={{ fontSize: 13, color: COLORS.secondaryText }}>First Installment Date</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.mainText }}>{nextDateFormatted}</div>
            </div>
          </div>

          <div className="divider" style={{ margin: '8px 0' }} />

          <div className="summary-row">
            <span className="label">SIP Nickname</span>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="e.g. Dream House Gold"
              style={{
                textAlign: 'right',
                border: 'none',
                background: 'transparent',
                fontWeight: 600,
                color: COLORS.mainText,
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
          </div>
          <div className="summary-row">
            <span className="label">Payment Mode</span>
            <span className="value">{paymentMethod}</span>
          </div>
          <div className="summary-row">
            <span className="label">Estimated Gold / Installment</span>
            <span className="value" style={{ color: COLORS.primaryGold }}>
              ~{formatGrams(estimatedGrams)}
            </span>
          </div>
        </div>

        {/* Info notice */}
        <div
          style={{
            display: 'flex',
            gap: 10,
            padding: '12px 14px',
            borderRadius: 10,
            background: 'rgba(22, 134, 91, 0.08)',
            marginBottom: 24,
            alignItems: 'flex-start',
          }}
        >
          <ShieldCheck size={18} color={COLORS.positive} style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ fontSize: 12, color: COLORS.positive, lineHeight: 1.4 }}>
            Zero lock-in. You can pause, modify or cancel your Gold SIP anytime with no penalty.
          </div>
        </div>

        {/* Primary CTA */}
        <button
          className="btn btn-primary"
          disabled={!isValid}
          onClick={() => setFlowState('review')}
        >
          Start SIP
        </button>
      </div>
    </div>
  );

  // =============================================
  // REVIEW STATE
  // =============================================
  const renderReviewState = () => (
    <div className="screen-content">
      <div className="screen-header">
        <button
          className="screen-header-back"
          onClick={() => setFlowState('setup')}
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="screen-header-title">Review Gold SIP</h2>
      </div>

      <div style={{ padding: '0 4px', marginTop: 16 }}>
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ textAlign: 'center', padding: '12px 0 16px' }}>
            <div style={{ fontSize: 13, color: COLORS.secondaryText }}>Recurring Amount</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.mainText, marginTop: 4 }}>
              {formatCurrency(amount)}
              <span style={{ fontSize: 15, fontWeight: 500, color: COLORS.secondaryText }}>
                {' '}/ {frequency}
              </span>
            </div>
          </div>

          <div className="divider" />

          <div className="summary-row">
            <span className="label">Plan Name</span>
            <span className="value">{nickname || 'Gold SIP'}</span>
          </div>
          <div className="summary-row">
            <span className="label">Frequency</span>
            <span className="value" style={{ textTransform: 'capitalize' }}>
              {frequency}
            </span>
          </div>
          <div className="summary-row">
            <span className="label">First Debit Date</span>
            <span className="value">{nextDateFormatted}</span>
          </div>
          <div className="summary-row">
            <span className="label">Dubai Gold Rate</span>
            <span className="value">AED {DEMO_GOLD_RATE.toFixed(2)}/g</span>
          </div>
          <div className="summary-row">
            <span className="label">Est. Gold per cycle</span>
            <span className="value" style={{ color: COLORS.primaryGold }}>
              ~{formatGrams(estimatedGrams)}
            </span>
          </div>
          <div className="summary-row">
            <span className="label">Payment Mode</span>
            <span className="value">{paymentMethod}</span>
          </div>
        </div>

        <div className="demo-banner">
          DEMO MODE — SIMULATED MANDATE, NO ACTUAL BANK DEBIT
        </div>

        <button className="btn btn-primary" onClick={handleConfirmSIP}>
          Confirm & Schedule SIP
        </button>
      </div>
    </div>
  );

  // =============================================
  // SUCCESS STATE
  // =============================================
  const renderSuccessState = () => (
    <div className="success-screen">
      <div className="success-check">
        <Check size={36} strokeWidth={3} />
      </div>

      <div className="success-title">SIP Started Successfully!</div>
      <div className="success-desc">
        Your automated gold savings plan is now active. Your first installment will be credited on schedule.
      </div>

      <div className="success-detail">
        {formatCurrency(amount)} / {frequency}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 280 }}>
        <button
          className="btn btn-primary"
          onClick={() => setFlowState('manage')}
        >
          View Active SIPs
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate('dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );

  // =============================================
  // MANAGE STATE (List existing SIPs)
  // =============================================
  const renderManageState = () => (
    <div className="screen-content">
      <div className="screen-header">
        <button
          className="screen-header-back"
          onClick={() => navigate('dashboard')}
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="screen-header-title">My Gold SIPs</h2>
      </div>

      <div style={{ padding: '0 4px', marginTop: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 13, color: COLORS.secondaryText }}>
            Active Plans ({state.sips.filter(s => s.status !== 'cancelled').length})
          </span>
          <button
            onClick={() => setFlowState('setup')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              color: COLORS.primaryGold,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <PlusCircle size={16} /> Start New SIP
          </button>
        </div>

        {state.sips.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Calendar size={32} />
            </div>
            <div className="empty-state-title">No Active SIPs</div>
            <div className="empty-state-desc">
              Start a recurring daily, weekly or monthly SIP to build gold savings steadily.
            </div>
            <button
              className="btn btn-primary"
              style={{ marginTop: 20, maxWidth: 220 }}
              onClick={() => setFlowState('setup')}
            >
              Start First SIP
            </button>
          </div>
        ) : (
          state.sips.map((sip) => (
            <div key={sip.id} className="card" style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.mainText }}>
                    {sip.nickname}
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.secondaryText, marginTop: 2 }}>
                    ID: {sip.id} • Started {sip.startDate}
                  </div>
                </div>
                <span className={`status-badge ${sip.status}`}>
                  {sip.status}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, margin: '14px 0' }}>
                <div style={{ padding: 10, background: COLORS.ivoryBg, borderRadius: 8 }}>
                  <div style={{ fontSize: 11, color: COLORS.secondaryText }}>Installment</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.mainText }}>
                    {formatCurrency(sip.amount)}
                    <span style={{ fontSize: 11, fontWeight: 500, color: COLORS.secondaryText }}>
                      /{sip.frequency}
                    </span>
                  </div>
                </div>

                <div style={{ padding: 10, background: COLORS.ivoryBg, borderRadius: 8 }}>
                  <div style={{ fontSize: 11, color: COLORS.secondaryText }}>Accumulated Gold</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.primaryGold }}>
                    {formatGrams(sip.totalGoldAccumulated)}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 12, color: COLORS.secondaryText, marginBottom: 14 }}>
                Next scheduled debit: <strong>{sip.nextDate}</strong>
              </div>

              {sip.status !== 'cancelled' ? (
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                    onClick={() => handleToggleStatus(sip)}
                  >
                    {sip.status === 'active' ? (
                      <>
                        <Pause size={14} /> Pause SIP
                      </>
                    ) : (
                      <>
                        <Play size={14} /> Resume SIP
                      </>
                    )}
                  </button>

                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ color: COLORS.negative, borderColor: 'rgba(220, 53, 69, 0.3)' }}
                    onClick={() => setCancelModalSipId(sip.id)}
                    title="Cancel SIP"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ) : (
                <div style={{ fontSize: 12, color: COLORS.negative, fontStyle: 'italic' }}>
                  This SIP has been cancelled.
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Cancel confirmation modal */}
      {cancelModalSipId && (
        <div className="modal-overlay" onClick={() => setCancelModalSipId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: COLORS.mainText }}>
              Cancel Gold SIP?
            </h3>
            <p style={{ fontSize: 14, color: COLORS.secondaryText, marginBottom: 20 }}>
              Are you sure you want to stop this automated savings plan? Your existing accumulated gold stays safe in your portfolio.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                className="btn btn-secondary"
                onClick={() => setCancelModalSipId(null)}
              >
                Keep SIP
              </button>
              <button
                className="btn btn-danger"
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
    <div className="screen-container">
      {flowState === 'setup' && renderSetupState()}
      {flowState === 'review' && renderReviewState()}
      {flowState === 'success' && renderSuccessState()}
      {flowState === 'manage' && renderManageState()}
    </div>
  );
};

export default SIPScreen;

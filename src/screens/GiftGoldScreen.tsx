// ============================================
// YASS Gold — Gift Gold Screen (SafeGold-inspired)
// Send 24K digital gold to family & friends with luxury greeting cards
// A product by YASS Group, Dubai
// ============================================

import React, { useState } from 'react';
import { ArrowLeft, Send, Check } from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { sendGiftAction } from '../state/appState';
import { DEMO_GOLD_RATE, COLORS } from '../constants';

const OCCASIONS = [
  { id: 'eid', label: 'Eid Mubarak 🌙', icon: '🌙' },
  { id: 'wedding', label: 'Wedding / Shadi 💍', icon: '💍' },
  { id: 'birthday', label: 'Birthday 🎂', icon: '🎂' },
  { id: 'dubai', label: 'Dubai Souvenir ✨', icon: '✨' },
];

const GiftGoldScreen: React.FC = () => {
  const { state, setState, back, navigate, showToast } = useApp();

  const [recipientName, setRecipientName] = useState<string>('');
  const [recipientMobile, setRecipientMobile] = useState<string>('');
  const [gramsStr, setGramsStr] = useState<string>('1.0');
  const [occasion, setOccasion] = useState<string>('eid');
  const [message, setMessage] = useState<string>('Wishing you prosperity, joy, and endless blessings with pure 24K Dubai gold!');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const grams = parseFloat(gramsStr) || 0;
  const costAED = grams * DEMO_GOLD_RATE;
  const availableGrams = state.holdings.totalGrams;

  const isValid =
    recipientName.trim().length >= 2 &&
    recipientMobile.trim().length >= 9 &&
    grams > 0 &&
    grams <= availableGrams;

  const handleSendGift = () => {
    if (!isValid) return;
    const newState = sendGiftAction(
      state,
      recipientName.trim(),
      recipientMobile.trim(),
      grams,
      OCCASIONS.find((o) => o.id === occasion)?.label || occasion,
      message.trim(),
      occasion
    );
    setState(newState);
    setIsSuccess(true);
    showToast(`Gift sent to ${recipientName} successfully!`, 'success');
  };

  if (isSuccess) {
    return (
      <div className="success-screen">
        <div className="success-check">
          <Check size={36} strokeWidth={3} />
        </div>
        <div className="success-title">24K Gold Gift Sent!</div>
        <div className="success-desc">
          Your gift of <strong>{grams.toFixed(4)} g</strong> gold has been sent to{' '}
          <strong>{recipientName}</strong> (+971 {recipientMobile}). An instant SMS with claim link has been dispatched.
        </div>
        <div className="success-detail">AED {costAED.toFixed(2)}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 280 }}>
          <button className="btn btn-primary" onClick={() => navigate('dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-container">
      <div className="screen-content">
        {/* Header */}
        <div className="screen-header">
          <button className="screen-header-back" onClick={back} aria-label="Back">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="screen-header-title">Gift 24K Gold</h2>
            <p style={{ fontSize: 13, color: COLORS.secondaryText, marginTop: 2 }}>
              SafeGold-Style instant digital gold gifting
            </p>
          </div>
        </div>

        <div style={{ padding: '0 4px', marginTop: 12 }}>
          {/* Greeting Card Preview */}
          <div
            style={{
              padding: '20px',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #2E2718 0%, #15181D 100%)',
              border: '1.5px solid rgba(232, 182, 63, 0.4)',
              color: '#fff',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              marginBottom: 20,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span
                style={{
                  fontSize: 11,
                  padding: '4px 10px',
                  borderRadius: 999,
                  background: 'rgba(232,182,63,0.15)',
                  color: COLORS.secondaryGold,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                }}
              >
                {OCCASIONS.find((o) => o.id === occasion)?.label}
              </span>
              <span style={{ fontSize: 13, color: COLORS.secondaryGold, fontWeight: 700 }}>
                {grams.toFixed(4)} g (24K 999.9)
              </span>
            </div>

            <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: '8px 0' }}>
              To: {recipientName || 'Recipient Name'}
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', lineHeight: 1.5 }}>
              "{message}"
            </p>
            <div style={{ textAlign: 'right', marginTop: 12, fontSize: 12, color: COLORS.primaryGold }}>
              — From {state.user?.fullName || 'Tariq Al Mansoori'} (YASS Bullion Vault)
            </div>
          </div>

          {/* Occasion Selector */}
          <div style={{ marginBottom: 16 }}>
            <label className="form-label">Select Occasion</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {OCCASIONS.map((occ) => {
                const isSelected = occasion === occ.id;
                return (
                  <button
                    key={occ.id}
                    onClick={() => setOccasion(occ.id)}
                    className={`chip ${isSelected ? 'active' : ''}`}
                    style={{
                      justifyContent: 'center',
                      padding: '12px',
                      fontSize: 13,
                      borderRadius: 12,
                    }}
                  >
                    {occ.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Fields */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="form-group">
              <label className="form-label">Recipient Full Name</label>
              <input
                className="form-input"
                placeholder="e.g. Fatima Al Mansoori"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Recipient Mobile (+971)</label>
              <div className="form-input-prefix">
                <span className="prefix">+971</span>
                <input
                  type="tel"
                  placeholder="50 123 4567"
                  value={recipientMobile}
                  onChange={(e) => setRecipientMobile(e.target.value.replace(/\D/g, ''))}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Gold Weight to Gift</label>
              <div className="form-input-prefix">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max={availableGrams}
                  value={gramsStr}
                  onChange={(e) => setGramsStr(e.target.value)}
                />
                <span className="prefix">g 24K</span>
              </div>
            </div>

            {/* Quick chips */}
            <div className="chip-row" style={{ marginBottom: 16 }}>
              {[0.5, 1, 2, 5].map((g) => (
                <button
                  key={g}
                  className={`chip ${grams === g ? 'active' : ''}`}
                  onClick={() => setGramsStr(g.toString())}
                  disabled={availableGrams < g}
                >
                  {g}g
                </button>
              ))}
            </div>

            <div className="form-group">
              <label className="form-label">Personal Message</label>
              <textarea
                className="form-input"
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your wishes..."
              />
            </div>

            <div className="summary-row">
              <span className="label">Total Gift Valuation</span>
              <span className="value" style={{ color: COLORS.primaryGold }}>
                AED {costAED.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action */}
          <button
            className="btn btn-primary"
            disabled={!isValid}
            onClick={handleSendGift}
          >
            <Send size={18} style={{ marginRight: 6 }} />
            Send 24K Gold Gift Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiftGoldScreen;

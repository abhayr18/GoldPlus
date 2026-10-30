// ============================================
// YASS Gold — Gold Lease / "YASS Gold+" (Gullak-inspired)
// Earn up to 5.5% extra gold p.a. on your vaulted bullion
// A product by YASS Group, Dubai
// ============================================

import React, { useState } from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, Building2 } from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { leaseGoldAction } from '../state/appState';
import { GULLAK_LEASE_PARTNERS, DEMO_GOLD_RATE, COLORS } from '../constants';

const formatCurrency = (val: number): string =>
  'AED ' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const formatGrams = (val: number): string =>
  val.toFixed(4) + ' g';

const GoldLeaseScreen: React.FC = () => {
  const { state, setState, back, navigate, showToast } = useApp();
  const [selectedPartner, setSelectedPartner] = useState(GULLAK_LEASE_PARTNERS[0]);
  const [leaseGramsStr, setLeaseGramsStr] = useState<string>('5');
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const availableGrams = Math.max(0, state.holdings.totalGrams - state.holdings.leasedGrams);
  const leaseGrams = parseFloat(leaseGramsStr) || 0;

  // 5.2% p.a. yield calculations
  const annualYieldGrams = (leaseGrams * 5.2) / 100;
  const annualYieldAED = annualYieldGrams * DEMO_GOLD_RATE;

  const isValid = leaseGrams > 0 && leaseGrams <= availableGrams;

  const handleConfirmLease = () => {
    if (!isValid) return;
    const newState = leaseGoldAction(state, leaseGrams, selectedPartner.name);
    setState(newState);
    setShowConfirmModal(false);
    showToast(`Successfully leased ${formatGrams(leaseGrams)} gold to ${selectedPartner.name}!`, 'success');
    navigate('portfolio');
  };

  return (
    <div className="screen-container">
      <div className="screen-content">
        {/* Header */}
        <div className="screen-header">
          <button className="screen-header-back" onClick={back} aria-label="Back">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="screen-header-title">YASS Gold+ (Gold Lease)</h2>
            <p style={{ fontSize: 13, color: COLORS.secondaryText, marginTop: 2 }}>
              Earn 5.2% p.a. extra gold on idle bullion
            </p>
          </div>
        </div>

        <div style={{ padding: '0 4px', marginTop: 12 }}>
          {/* Top Hero Banner */}
          <div
            style={{
              padding: '20px',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #242017 0%, #15181C 100%)',
              border: '1.5px solid rgba(232, 182, 63, 0.3)',
              color: '#fff',
              marginBottom: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Sparkles size={20} color={COLORS.primaryGold} />
              <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.secondaryGold, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                Gullak-Style Yield on Gold
              </span>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: '4px 0', color: '#fff' }}>
              Grow Your Gold by 5.2% Every Year
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginTop: 6 }}>
              Instead of keeping your vaulted bullion idle, lease it to vetted institutional jewelers in Dubai with <strong>100% Bank Guarantees</strong>. Earn passive gold yield credited monthly.
            </p>

            <div style={{ display: 'flex', gap: 16, marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Available to Lease</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.primaryGold }}>
                  {formatGrams(availableGrams)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Actively Leased</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#4ADE80' }}>
                  {formatGrams(state.holdings.leasedGrams)}
                </div>
              </div>
            </div>
          </div>

          {/* Grams to lease input */}
          <div className="card" style={{ marginBottom: 16 }}>
            <label className="form-label">How much gold do you want to lease?</label>
            <div className="form-input-prefix">
              <input
                type="number"
                placeholder="e.g. 5"
                step="0.1"
                min="0.1"
                max={availableGrams}
                value={leaseGramsStr}
                onChange={(e) => setLeaseGramsStr(e.target.value)}
              />
              <span className="prefix">g 24K</span>
            </div>

            {/* Quick chips */}
            <div className="chip-row" style={{ marginTop: 12, marginBottom: 16 }}>
              {[1, 5, 10, 20].map((g) => (
                <button
                  key={g}
                  className={`chip ${leaseGrams === g ? 'active' : ''}`}
                  onClick={() => setLeaseGramsStr(g.toString())}
                  disabled={availableGrams < g}
                >
                  {g}g
                </button>
              ))}
              <button
                className={`chip ${leaseGrams === availableGrams ? 'active' : ''}`}
                onClick={() => setLeaseGramsStr(availableGrams.toFixed(4))}
              >
                Max ({availableGrams.toFixed(2)}g)
              </button>
            </div>

            {/* Yield Estimator Card */}
            <div
              style={{
                padding: '14px',
                background: COLORS.ivoryBg,
                borderRadius: 12,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: COLORS.secondaryText }}>Estimated Extra Gold (1 Year)</span>
                <strong style={{ fontSize: 15, color: COLORS.positive, fontWeight: 700 }}>
                  +{formatGrams(annualYieldGrams)}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                <span style={{ fontSize: 13, color: COLORS.secondaryText }}>Passive AED Return</span>
                <strong style={{ fontSize: 15, color: COLORS.mainText, fontWeight: 700 }}>
                  +{formatCurrency(annualYieldAED)}
                </strong>
              </div>
            </div>
          </div>

          {/* Select Institutional Partner */}
          <div style={{ marginBottom: 16 }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: COLORS.mainText, marginBottom: 10 }}>
              Select Institutional Jeweler Partner
            </h4>

            {GULLAK_LEASE_PARTNERS.map((partner) => {
              const isSelected = selectedPartner.name === partner.name;
              return (
                <div
                  key={partner.name}
                  onClick={() => setSelectedPartner(partner)}
                  className={`card ${isSelected ? 'selected' : ''}`}
                  style={{
                    padding: '14px 16px',
                    marginBottom: 10,
                    cursor: 'pointer',
                    borderColor: isSelected ? COLORS.primaryGold : COLORS.border,
                    background: isSelected ? 'rgba(232, 182, 63, 0.05)' : COLORS.cardBg,
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Building2 size={20} color={COLORS.primaryGold} />
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.mainText }}>
                          {partner.name}
                        </div>
                        <div style={{ fontSize: 12, color: COLORS.secondaryText, marginTop: 2 }}>
                          {partner.rating} • {partner.tenure} lock-in
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          padding: '4px 8px',
                          borderRadius: 6,
                          background: 'rgba(22, 134, 91, 0.12)',
                          color: COLORS.positive,
                        }}
                      >
                        {partner.annualYield}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Safety & Bank Guarantee Banner */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              padding: '14px',
              borderRadius: 12,
              background: 'rgba(22, 134, 91, 0.08)',
              border: '1px solid rgba(22, 134, 91, 0.2)',
              marginBottom: 20,
              alignItems: 'flex-start',
            }}
          >
            <ShieldCheck size={22} color={COLORS.positive} style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: 12, color: COLORS.positive, lineHeight: 1.5 }}>
              <strong>100% Capital Protection Guarantee:</strong> All gold leased under YASS Gold+ is secured by unconditional bank guarantees from Tier-1 UAE Banks (Emirates NBD / FAB) and insured by Dubai Insurance Co.
            </div>
          </div>

          {/* Action CTA */}
          <button
            className="btn btn-primary"
            disabled={!isValid}
            onClick={() => setShowConfirmModal(true)}
          >
            Lease {formatGrams(leaseGrams)} for 5.2% Yield
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.mainText, marginBottom: 8 }}>
              Confirm Gold Lease
            </h3>
            <p style={{ fontSize: 14, color: COLORS.secondaryText, marginBottom: 16 }}>
              You are leasing your 24K gold to earn passive yield.
            </p>

            <div className="summary-row">
              <span className="label">Gold Leased</span>
              <span className="value" style={{ color: COLORS.primaryGold }}>{formatGrams(leaseGrams)}</span>
            </div>
            <div className="summary-row">
              <span className="label">Jeweler Partner</span>
              <span className="value">{selectedPartner.name}</span>
            </div>
            <div className="summary-row">
              <span className="label">Annual Yield</span>
              <span className="value" style={{ color: COLORS.positive }}>{selectedPartner.annualYield}</span>
            </div>
            <div className="summary-row">
              <span className="label">Security Guarantee</span>
              <span className="value">100% UAE Bank Guaranteed</span>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleConfirmLease}>
                Confirm Lease
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoldLeaseScreen;

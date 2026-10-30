// ============================================
// YASS Gold & YASS Bullion — Vault Certificate & Audit Screen
// Inspired by SafeGold physical custody transparency
// A product by YASS Group, Dubai
// ============================================

import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Building,
  Download,
  QrCode,
  Award,
  Lock,
  Eye,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { SAFE_GOLD_VAULT_AUDIT, COLORS } from '../constants';

export const VaultCertificateScreen: React.FC = () => {
  const { state, navigate, back, showToast } = useApp();
  const { user, holdings } = state;
  const [showInspectionModal, setShowInspectionModal] = useState(false);

  const totalValuation = (holdings.totalGrams * 318.5).toFixed(2);
  const formattedDate = new Date().toLocaleDateString('en-AE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleDownload = () => {
    showToast('Vault Certificate downloaded (PDF with DMCC digital signature)', 'success');
  };

  const handleScheduleVisit = () => {
    setShowInspectionModal(false);
    showToast('Inspection request submitted. YASS Bullion concierge will call you.', 'success');
  };

  return (
    <div className="screen-container" style={{ paddingBottom: 90 }}>
      {/* Header */}
      <div className="screen-header">
        <button className="screen-header-back" onClick={back}>
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Vault Audit & Certificate</span>
        <div style={{ width: 24 }} />
      </div>

      <div className="screen-content">
        {/* Top Trust Notice */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(22, 134, 91, 0.1) 0%, rgba(232, 182, 63, 0.1) 100%)',
            border: '1px solid rgba(22, 134, 91, 0.25)',
            borderRadius: 14,
            padding: '14px 16px',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: '#16865B',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#16865B' }}>
              100% Physically Backed & Insured
            </div>
            <div style={{ fontSize: 12, color: COLORS.secondaryText, lineHeight: 1.4 }}>
              Every milligram of YASS Gold is stored as 24K 999.9 physical bullion in Brink’s & Transguard vaults in Dubai.
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* PHYSICAL GOLD HOLDING CERTIFICATE (SafeGold Style) */}
        {/* ================================================= */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            border: '2px solid #E8B63F',
            boxShadow: '0 8px 30px rgba(232, 182, 63, 0.15)',
            overflow: 'hidden',
            marginBottom: 24,
            position: 'relative',
          }}
        >
          {/* Certificate Top Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #17232D 0%, #171A1D 100%)',
              color: '#FFF',
              padding: '18px 20px',
              textAlign: 'center',
              borderBottom: '2px solid #E8B63F',
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: COLORS.primaryGold,
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              DUBAI MULTI COMMODITIES CENTRE (DMCC) ACCREDITED
            </div>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: 0.5 }}>
              CERTIFICATE OF PHYSICAL GOLD ALLOCATION
            </div>
            <div style={{ fontSize: 11, color: '#A0AEC0', marginTop: 3 }}>
              Ref: {SAFE_GOLD_VAULT_AUDIT.assayCertificateId}
            </div>
          </div>

          {/* Certificate Body */}
          <div style={{ padding: '20px 22px' }}>
            {/* User Credentials */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                paddingBottom: 16,
                borderBottom: '1px dashed #E2E8F0',
                marginBottom: 16,
              }}
            >
              <div>
                <div style={{ fontSize: 11, color: COLORS.secondaryText }}>Allocated To</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.darkCharcoal }}>
                  {user?.fullName || 'Tariq Al Mansoori'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: COLORS.secondaryText }}>Emirates ID</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.darkCharcoal }}>
                  {user?.emiratesId || '784-1988-1234567-1'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: COLORS.secondaryText }}>Issue Date</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.darkCharcoal }}>
                  {formattedDate}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: COLORS.secondaryText }}>Purity Specification</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#16865B' }}>
                  24K (999.9 Fine Gold)
                </div>
              </div>
            </div>

            {/* Holdings Big Box */}
            <div
              style={{
                background: '#F7F5EF',
                borderRadius: 12,
                padding: '16px',
                textAlign: 'center',
                border: '1px solid #E9E7E0',
                marginBottom: 18,
              }}
            >
              <div style={{ fontSize: 12, color: COLORS.secondaryText, textTransform: 'uppercase', letterSpacing: 1 }}>
                Physical Gold Allocated & Held
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: COLORS.primaryGold,
                  marginTop: 4,
                  marginBottom: 2,
                }}
              >
                {holdings.totalGrams.toFixed(4)} <span style={{ fontSize: 16, color: COLORS.darkCharcoal }}>grams</span>
              </div>
              <div style={{ fontSize: 13, color: COLORS.secondaryText }}>
                Current Valuation: <strong style={{ color: COLORS.darkCharcoal }}>AED {totalValuation}</strong>
              </div>
            </div>

            {/* Vault Breakdown */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.darkCharcoal, marginBottom: 8 }}>
                Secure Custody Vault Distribution:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: '#FAFAFA',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Building size={16} color={COLORS.primaryGold} />
                    <div>
                      <div style={{ fontWeight: 600 }}>Brink's Global Services</div>
                      <div style={{ fontSize: 11, color: COLORS.secondaryText }}>Almas Tower, JLT, Dubai</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: COLORS.darkCharcoal }}>
                    {(holdings.totalGrams * 0.7).toFixed(4)} g (70%)
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: '#FAFAFA',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Building size={16} color={COLORS.primaryGold} />
                    <div>
                      <div style={{ fontWeight: 600 }}>Transguard Depository</div>
                      <div style={{ fontSize: 11, color: COLORS.secondaryText }}>Emirates Group HQ, Dubai</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: COLORS.darkCharcoal }}>
                    {(holdings.totalGrams * 0.3).toFixed(4)} g (30%)
                  </div>
                </div>
              </div>
            </div>

            {/* Auditor & Guarantee */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
                fontSize: 11,
                padding: '10px 12px',
                background: '#F0FFF4',
                borderRadius: 8,
                border: '1px solid #C6F6D5',
                marginBottom: 16,
              }}
            >
              <div>
                <span style={{ color: '#2F855A', fontWeight: 600 }}>Statutory Auditor:</span>
                <div style={{ fontWeight: 700, color: '#1C4532' }}>{SAFE_GOLD_VAULT_AUDIT.auditor}</div>
              </div>
              <div>
                <span style={{ color: '#2F855A', fontWeight: 600 }}>Backing Ratio:</span>
                <div style={{ fontWeight: 700, color: '#1C4532' }}>{SAFE_GOLD_VAULT_AUDIT.backingRatio}</div>
              </div>
            </div>

            {/* QR Code & Official Seal Simulation */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 54,
                    height: 54,
                    background: '#F7F5EF',
                    border: '1px solid #CBD5E0',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <QrCode size={40} color="#17232D" />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.darkCharcoal }}>
                    Scan to Verify Online
                  </div>
                  <div style={{ fontSize: 10, color: COLORS.secondaryText }}>
                    dmcc.ae/verify-vault/{SAFE_GOLD_VAULT_AUDIT.assayCertificateId}
                  </div>
                </div>
              </div>

              {/* Gold Official Stamp */}
              <div
                style={{
                  border: '2px solid #E8B63F',
                  borderRadius: '50%',
                  width: 58,
                  height: 58,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9C6F19',
                  textAlign: 'center',
                  fontSize: 7,
                  fontWeight: 800,
                  transform: 'rotate(-8deg)',
                  boxShadow: '0 0 0 1px #F4D681 inset',
                }}
              >
                <span>YASS</span>
                <span style={{ fontSize: 9 }}>★ SEAL ★</span>
                <span>DUBAI</span>
              </div>
            </div>
          </div>

          {/* Action buttons on Certificate */}
          <div
            style={{
              display: 'flex',
              borderTop: '1px solid #E9E7E0',
              background: '#F9FAFB',
            }}
          >
            <button
              onClick={handleDownload}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                background: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontSize: 13,
                fontWeight: 600,
                color: COLORS.darkCharcoal,
                cursor: 'pointer',
                borderRight: '1px solid #E9E7E0',
              }}
            >
              <Download size={16} />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => setShowInspectionModal(true)}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                background: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontSize: 13,
                fontWeight: 600,
                color: COLORS.primaryGold,
                cursor: 'pointer',
              }}
            >
              <Eye size={16} />
              <span>Inspect Vault</span>
            </button>
          </div>
        </div>

        {/* ================================================= */}
        {/* SAFE-GOLD COMPLIANCE & PROOF PILLARS */}
        {/* ================================================= */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.darkCharcoal, marginBottom: 12 }}>
            Trust & Security Guarantees
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 12,
                padding: '14px',
                border: '1px solid #E9E7E0',
                display: 'flex',
                gap: 12,
              }}
            >
              <Award size={20} color={COLORS.primaryGold} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.darkCharcoal }}>
                  Dubai Good Delivery (DGD) Standard
                </div>
                <div style={{ fontSize: 12, color: COLORS.secondaryText, marginTop: 2 }}>
                  Administered by the DMCC, ensuring only internationally recognized 999.9 purity bars are accepted and deposited.
                </div>
              </div>
            </div>

            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 12,
                padding: '14px',
                border: '1px solid #E9E7E0',
                display: 'flex',
                gap: 12,
              }}
            >
              <FileCheck size={20} color="#16865B" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.darkCharcoal }}>
                  Daily Independent Reconciliation
                </div>
                <div style={{ fontSize: 12, color: COLORS.secondaryText, marginTop: 2 }}>
                  Vault weights are audited daily. Total digital credits equal total grams vaulted to 4 decimal places.
                </div>
              </div>
            </div>

            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 12,
                padding: '14px',
                border: '1px solid #E9E7E0',
                display: 'flex',
                gap: 12,
              }}
            >
              <Lock size={20} color={COLORS.primaryGold} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.darkCharcoal }}>
                  Lloyd's of London All-Risk Insurance
                </div>
                <div style={{ fontSize: 12, color: COLORS.secondaryText, marginTop: 2 }}>
                  100% insured against physical loss, theft, and natural catastrophe through Brink's & Transguard master policies.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA to Physical Delivery */}
        <div
          style={{
            background: 'linear-gradient(135deg, #17232D 0%, #171A1D 100%)',
            borderRadius: 14,
            padding: '18px 20px',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Want to hold your gold physically?</div>
            <div style={{ fontSize: 12, color: '#A0AEC0', marginTop: 2 }}>
              Convert your digital grams into certified 24K minted coins & bars anytime.
            </div>
          </div>
          <button
            onClick={() => navigate('delivery')}
            className="btn btn-primary"
            style={{ flexShrink: 0, padding: '10px 16px', fontSize: 13 }}
          >
            Redeem Gold
          </button>
        </div>
      </div>

      {/* Vault Inspection Modal */}
      {showInspectionModal && (
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
          <div
            style={{
              background: '#FFF',
              borderRadius: 16,
              padding: 24,
              maxWidth: 420,
              width: '100%',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.darkCharcoal, marginBottom: 8 }}>
              Schedule Vault Inspection
            </div>
            <div style={{ fontSize: 13, color: COLORS.secondaryText, lineHeight: 1.5, marginBottom: 16 }}>
              In accordance with DMCC bullion regulations, holders of over 25 grams may inspect their physical bar custody at Brink's Global Services vault at Almas Tower, JLT.
            </div>

            <div style={{ background: '#F7F5EF', padding: 12, borderRadius: 10, fontSize: 12, marginBottom: 18 }}>
              <div><strong>Location:</strong> Brink’s Vaults, Level B3, Almas Tower, JLT Dubai</div>
              <div style={{ marginTop: 4 }}><strong>Security Requirement:</strong> Original Emirates ID or Passport</div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={() => setShowInspectionModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={handleScheduleVisit}
              >
                Request Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaultCertificateScreen;

// ============================================
// OGold Wallet — Insured Vault Certificate & Depository Audit
// Dubai National Insurance (DNI) & DMCC Brink's Vaults
// App Store: id6504926022
// ============================================

import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Building,
  Download,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { OGoldMark } from '../components/BrandLogo';
import { DEMO_GOLD_RATE, DEMO_SILVER_RATE } from '../constants';

export const VaultCertificateScreen: React.FC = () => {
  const { state, back, showToast } = useApp();
  const { user, holdings } = state;
  const [showInspectionModal, setShowInspectionModal] = useState(false);

  const totalValuation = (
    holdings.totalGrams * DEMO_GOLD_RATE +
    holdings.silverGrams * DEMO_SILVER_RATE
  ).toFixed(2);

  const formattedDate = new Date().toLocaleDateString('en-AE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleDownload = () => {
    showToast('Vault Certificate downloaded (PDF signed by DNI & DMCC depository)', 'success');
  };

  const handleScheduleVisit = () => {
    setShowInspectionModal(false);
    showToast('Inspection request submitted. OGold VIP concierge will contact you.', 'success');
  };

  return (
    <div className="screen-container">
      {/* Header */}
      <div className="screen-header">
        <button className="screen-header-back" onClick={back} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Vault Custody & Audit</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        {/* Top Trust Notice */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(245, 158, 11, 0.12) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 14,
            padding: '14px 16px',
            marginBottom: 16,
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
              background: '#10B981',
              color: '#0A0D14',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#10B981' }}>
              100% Insured by Dubai National Insurance (DNI)
            </div>
            <div style={{ fontSize: 11.5, color: '#94A3B8', lineHeight: 1.4 }}>
              Every fraction of gold and silver on OGold is held 1:1 in Brink’s & Transguard high-security vaults in Dubai.
            </div>
          </div>
        </div>

        {/* ── Official Depository Certificate ─────────────────── */}
        <div
          style={{
            background: '#161D2D',
            borderRadius: 18,
            border: '1.5px solid rgba(245, 158, 11, 0.45)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
            padding: '20px',
            marginBottom: 20,
            position: 'relative',
            color: '#FFFFFF',
          }}
        >
          {/* Certificate Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #1E293B', paddingBottom: 14 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <OGoldMark size={22} />
                <span style={{ fontSize: 14, fontWeight: 900, color: '#F59E0B' }}>OGOLD</span>
                <span style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700 }}>PRECIOUS METALS</span>
              </div>
              <div style={{ fontSize: 10, color: '#64748B', marginTop: 2 }}>
                Regulated by Dubai Economic Department
              </div>
            </div>

            <div
              style={{
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#FBBF24',
                padding: '3px 8px',
                borderRadius: 6,
                fontSize: 9.5,
                fontWeight: 800,
                border: '1px solid rgba(245, 158, 11, 0.3)',
              }}
            >
              DNI POLICY: DNI-AUAG-991
            </div>
          </div>

          {/* Certificate Title */}
          <div style={{ textAlign: 'center', padding: '16px 0 12px' }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: 0.8 }}>
              Certificate of Physical Bullion Custody
            </h2>
            <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>
              Issued on: {formattedDate} • Recipient: <strong style={{ color: '#FFFFFF' }}>{user?.fullName}</strong> (Emirates ID: {user?.emiratesId})
            </div>
          </div>

          {/* Verified Allocated Amounts */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
              background: '#0F1624',
              borderRadius: 12,
              padding: '12px',
              border: '1px solid #1E293B',
              marginBottom: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 10, color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>
                Allocated 24K Gold
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#FBBF24', marginTop: 2 }}>
                {holdings.totalGrams.toFixed(4)} g
              </div>
              <div style={{ fontSize: 10, color: '#10B981', marginTop: 1 }}>999.9 Dubai Good Delivery</div>
            </div>

            <div>
              <div style={{ fontSize: 10, color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>
                Allocated .999 Silver
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#E2E8F0', marginTop: 2 }}>
                {holdings.silverGrams.toFixed(1)} g
              </div>
              <div style={{ fontSize: 10, color: '#10B981', marginTop: 1 }}>.999 Pure Bullion Bar</div>
            </div>
          </div>

          {/* Summary Details */}
          <div className="summary-row">
            <span className="label">Total Valuation</span>
            <span className="value" style={{ color: '#FBBF24' }}>AED {totalValuation}</span>
          </div>
          <div className="summary-row">
            <span className="label">Primary Depository</span>
            <span className="value">Brink’s Global Services, Almas Tower (DMCC)</span>
          </div>
          <div className="summary-row">
            <span className="label">Secondary Depository</span>
            <span className="value">Transguard Vaults, Emirates Group HQ</span>
          </div>
          <div className="summary-row">
            <span className="label">Independent Auditor</span>
            <span className="value">BDO Chartered Accountants (Dubai)</span>
          </div>
          <div className="summary-row">
            <span className="label">Insurance Underwriter</span>
            <span className="value" style={{ color: '#10B981' }}>Dubai National Insurance (DNI)</span>
          </div>
          <div className="summary-row total">
            <span className="label">Verification Status</span>
            <span className="value" style={{ color: '#10B981' }}>100% Backed (1:1 Ratio)</span>
          </div>

          {/* Download & QR Action */}
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button
              className="btn btn-primary"
              onClick={handleDownload}
              style={{ flex: 1, height: 42, fontSize: 12.5 }}
            >
              <Download size={15} />
              <span>Download PDF</span>
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowInspectionModal(true)}
              style={{ flex: 1, height: 42, fontSize: 12.5 }}
            >
              <Building size={15} />
              <span>Inspect Vault</span>
            </button>
          </div>
        </div>
      </div>

      {/* Inspection Modal */}
      {showInspectionModal && (
        <div className="modal-overlay" onClick={() => setShowInspectionModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
              Schedule Vault Inspection
            </h3>
            <p style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.4, marginBottom: 14 }}>
              OGold allows VIP holders holding over 50g of physical bullion to schedule an escorted audit inspection at Brink's DMCC in Almas Tower.
            </p>

            <div className="summary-row">
              <span className="label">Location</span>
              <span className="value">Brink's Depository, Almas Tower, JLT, Dubai</span>
            </div>
            <div className="summary-row">
              <span className="label">Security Escort</span>
              <span className="value">Transguard Armed Security</span>
            </div>
            <div className="summary-row total">
              <span className="label">ID Verification</span>
              <span className="value">Emirates ID Required</span>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <button className="btn btn-secondary" onClick={() => setShowInspectionModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleScheduleVisit}>
                Confirm Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaultCertificateScreen;

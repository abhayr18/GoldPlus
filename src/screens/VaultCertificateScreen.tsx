// ============================================
// YASS Gold & Bullion - Vault Certificate & Audit Screen
// Official DMCC & Dubai Good Delivery Physical Allocation
// White + Gold Clean Executive Theme
// ============================================

import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Building,
  Download,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { GoldEmblemMark } from '../components/BrandLogo';
import { YASS_VAULT_AUDIT, DEMO_GOLD_RATE } from '../constants';

export const VaultCertificateScreen: React.FC = () => {
  const { state, back, showToast } = useApp();
  const { user, holdings } = state;
  const [showInspectionModal, setShowInspectionModal] = useState(false);

  const totalValuation = (holdings.totalGrams * DEMO_GOLD_RATE).toFixed(2);
  const formattedDate = new Date().toLocaleDateString('en-AE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleDownload = () => {
    showToast('Vault Certificate downloaded (PDF signed by DMCC depository)', 'success');
  };

  const handleScheduleVisit = () => {
    setShowInspectionModal(false);
    showToast('Inspection request submitted. YASS Bullion concierge will call you.', 'success');
  };

  return (
    <div className="screen-container">
      {/* Header */}
      <div className="screen-header">
        <button className="screen-header-back" onClick={back} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Vault Audit & Certificate</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        {/* Top Trust Notice */}
        <div
          style={{
            background: '#ECFDF5',
            border: '1px solid #A7F3D0',
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
              background: '#059669',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#059669' }}>
              100% Physically Backed & Audited
            </div>
            <div style={{ fontSize: 11.5, color: '#334155', lineHeight: 1.4 }}>
              Every milligram of gold is physically allocated and stored in Brink’s & Transguard vaults in Dubai.
            </div>
          </div>
        </div>

        {/* ── Official Depository Certificate Card ───────────── */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            border: '1.5px solid #C59B27',
            boxShadow: '0 4px 16px rgba(197, 155, 39, 0.1)',
            padding: '20px',
            marginBottom: 16,
            position: 'relative',
          }}
        >
          {/* Certificate Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #E2E8F0', paddingBottom: 14 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <GoldEmblemMark size={22} />
                <span style={{ fontSize: 14, fontWeight: 900, color: '#0F172A' }}>YASS GOLD</span>
                <span style={{ fontSize: 10, color: '#8F6914', fontWeight: 700, background: '#FEFBF2', padding: '1px 5px', borderRadius: 4, border: '1px solid #EED8A1' }}>
                  DMCC CUSTODY
                </span>
              </div>
              <div style={{ fontSize: 10, color: '#64748B', marginTop: 3 }}>
                Assay Certificate: {YASS_VAULT_AUDIT.assayCertificateId}
              </div>
            </div>

            <span
              style={{
                fontSize: 9.5,
                fontWeight: 800,
                color: '#059669',
                background: '#ECFDF5',
                padding: '3px 8px',
                borderRadius: 4,
                border: '1px solid #A7F3D0',
              }}
            >
              100% PHYSICAL
            </span>
          </div>

          {/* Certificate Title */}
          <div style={{ textAlign: 'center', padding: '16px 0 12px' }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: 0.8 }}>
              Certificate of Physical Bullion Allocation
            </h2>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 3 }}>
              Issued on: {formattedDate} • Recipient: <strong style={{ color: '#0F172A' }}>{user?.fullName}</strong>
            </div>
          </div>

          {/* Holdings Highlight */}
          <div
            style={{
              background: '#FEFBF2',
              border: '1px solid #EED8A1',
              borderRadius: 12,
              padding: '14px',
              textAlign: 'center',
              marginBottom: 16,
            }}
          >
            <div style={{ fontSize: 11, color: '#8F6914', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 0.5 }}>
              Total Physically Allocated 24K Gold
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#0F172A', marginTop: 2 }}>
              {holdings.totalGrams.toFixed(4)} grams
            </div>
            <div style={{ fontSize: 12, color: '#059669', fontWeight: 700, marginTop: 2 }}>
              Valuation: AED {totalValuation} (999.9 Dubai Good Delivery)
            </div>
          </div>

          {/* Audit Details */}
          <div className="summary-row">
            <span className="label">Primary Depository</span>
            <span className="value">Brink’s Global Services, Almas Tower (DMCC Dubai)</span>
          </div>
          <div className="summary-row">
            <span className="label">Secondary Vault</span>
            <span className="value">Transguard Vaults, Emirates Group HQ</span>
          </div>
          <div className="summary-row">
            <span className="label">Independent Custody Auditor</span>
            <span className="value">BDO Chartered Accountants (Dubai)</span>
          </div>
          <div className="summary-row">
            <span className="label">Last Physical Bar Audit</span>
            <span className="value">{YASS_VAULT_AUDIT.auditDate}</span>
          </div>
          <div className="summary-row total">
            <span className="label">Depository Backing Ratio</span>
            <span className="value" style={{ color: '#059669' }}>100.0% Allocated Physical Ingot</span>
          </div>

          {/* Action Buttons */}
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
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
              Schedule Brink’s Vault Inspection
            </h3>
            <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.4, marginBottom: 14 }}>
              YASS Gold clients holding physical bullion allocations can request an escorted audit inspection at Brink’s DMCC Depository in Almas Tower, Dubai.
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
              <span className="label">ID Required</span>
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

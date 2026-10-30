// ============================================
// YASS Bullion Dubai - Product Marketing Website
// Apple-Grade Restraint, Clean Typography, Product Focus
// A product by YASS Group, Dubai
// ============================================

import React, { useState } from 'react';
import yassGoldBarImg from '../assets/yass-gold-bar.png';
import { useApp } from '../components/AppProvider';
import { DUBAI_MARKET_RATES, DEMO_GOLD_RATE } from '../constants';

const BAR_PRESETS = [
  { label: '1g', weight: 1, making: 30, shipping: 25 },
  { label: '5g', weight: 5, making: 55, shipping: 25 },
  { label: '10g', weight: 10, making: 95, shipping: 30 },
  { label: '20g', weight: 20, making: 160, shipping: 35 },
  { label: '50g', weight: 50, making: 300, shipping: 50 },
  { label: '100g', weight: 100, making: 550, shipping: 60 },
  { label: '1kg', weight: 1000, making: 1500, shipping: 100 },
];

export const MarketingWebsite: React.FC = () => {
  const { navigate } = useApp();
  const [selectedWeight, setSelectedWeight] = useState<number>(10);
  const [customGrams, setCustomGrams] = useState<string>('10');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<'none' | 'terms' | 'privacy'>('none');

  const currentPreset = BAR_PRESETS.find((p) => p.weight === selectedWeight) || {
    label: `${selectedWeight}g`,
    weight: selectedWeight,
    making: Math.round(selectedWeight * 8),
    shipping: 35,
  };

  const parsedGrams = Math.max(0.1, parseFloat(customGrams) || selectedWeight);
  const metalValueAED = parsedGrams * DEMO_GOLD_RATE;
  const makingChargesAED = currentPreset.making;
  const deliveryChargesAED = currentPreset.shipping;
  const totalPayableAED = metalValueAED + makingChargesAED + deliveryChargesAED;

  const handleSelectWeight = (weight: number) => {
    setSelectedWeight(weight);
    setCustomGrams(weight.toString());
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="site-root">
      {/* ── 1. Global Navigation Bar ─────────────────────────── */}
      <nav className="site-nav">
        <div className="site-nav-inner">
          <div className="site-brand" onClick={() => scrollToSection('hero')}>
            <span style={{ fontWeight: 700, letterSpacing: '-0.02em', fontSize: 16 }}>YASS</span>
            <span style={{ fontWeight: 400, color: '#6E6E73', marginLeft: -4 }}>BULLION</span>
            <span className="site-brand-tag">Dubai</span>
          </div>

          <ul className="site-nav-links">
            <li>
              <button
                className="site-nav-link"
                style={{ background: 'none', border: 'none' }}
                onClick={() => scrollToSection('delivery-section')}
              >
                Physical Bullion
              </button>
            </li>
            <li>
              <button
                className="site-nav-link"
                style={{ background: 'none', border: 'none' }}
                onClick={() => scrollToSection('vault-section')}
              >
                Vault Custody
              </button>
            </li>
            <li>
              <button
                className="site-nav-link"
                style={{ background: 'none', border: 'none' }}
                onClick={() => scrollToSection('calculator-section')}
              >
                Calculator
              </button>
            </li>
            <li>
              <button
                className="site-nav-link"
                style={{ background: 'none', border: 'none' }}
                onClick={() => scrollToSection('specs-section')}
              >
                Specifications
              </button>
            </li>
            <li>
              <button
                className="site-nav-link"
                style={{ background: 'none', border: 'none' }}
                onClick={() => setActiveModal('terms')}
              >
                Terms
              </button>
            </li>
          </ul>

          <div className="site-nav-actions">
            <div className="site-rate-pill">
              <span className="site-rate-dot" />
              <span>24K AED {DUBAI_MARKET_RATES.rate24K.toFixed(2)}</span>
            </div>

            <button className="site-btn-nav" onClick={() => navigate('dashboard')}>
              Launch App
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: '#1D1D1F',
                cursor: 'pointer',
                padding: 6,
              }}
              className="site-mobile-toggle"
              aria-label="Toggle navigation menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              background: '#FFFFFF',
              borderBottom: '1px solid #D2D2D7',
              padding: '16px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <button
              className="site-nav-link"
              style={{ textAlign: 'left', background: 'none', border: 'none', padding: '6px 0', fontSize: 15 }}
              onClick={() => scrollToSection('delivery-section')}
            >
              Physical Bullion
            </button>
            <button
              className="site-nav-link"
              style={{ textAlign: 'left', background: 'none', border: 'none', padding: '6px 0', fontSize: 15 }}
              onClick={() => scrollToSection('vault-section')}
            >
              Vault Custody
            </button>
            <button
              className="site-nav-link"
              style={{ textAlign: 'left', background: 'none', border: 'none', padding: '6px 0', fontSize: 15 }}
              onClick={() => scrollToSection('calculator-section')}
            >
              Calculator
            </button>
            <button
              className="site-nav-link"
              style={{ textAlign: 'left', background: 'none', border: 'none', padding: '6px 0', fontSize: 15 }}
              onClick={() => scrollToSection('specs-section')}
            >
              Specifications
            </button>
            <button
              className="site-nav-link"
              style={{ textAlign: 'left', background: 'none', border: 'none', padding: '6px 0', fontSize: 15 }}
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveModal('terms');
              }}
            >
              Terms of Service
            </button>
            <button
              className="site-btn site-btn-dark"
              style={{ width: '100%', marginTop: 8 }}
              onClick={() => navigate('dashboard')}
            >
              Launch Web App
            </button>
          </div>
        )}
      </nav>

      {/* ── 2. Hero Section (Product Focus) ──────────────────── */}
      <header id="hero" className="site-hero">
        <span className="site-eyebrow">YASS Group Dubai &bull; DMCC Accredited Depository</span>

        <h1 className="site-headline">
          Physical bullion.<br />Digital custody.
        </h1>

        <p className="site-subhead">
          Direct title ownership of 24K 999.9 Good Delivery gold. Vaulted under bailment with Brink's in Almas Tower, or delivered to your doorstep in tamper-evident assay certicards across the United Arab Emirates.
        </p>

        <div className="site-cta-group">
          <button className="site-btn site-btn-dark" onClick={() => navigate('dashboard')}>
            Launch Web App
          </button>
          <button className="site-btn site-btn-outline" onClick={() => scrollToSection('calculator-section')}>
            Calculate Value
          </button>
        </div>

        {/* Hero Product Stage */}
        <div className="site-product-stage">
          <img
            src={yassGoldBarImg}
            alt="YASS Bullion 24K 999.9 Fine Gold Bar"
            className="site-product-image"
          />

          <div className="site-product-caption">
            <span>
              <strong>Dubai Good Delivery (DGD)</strong> &bull; 999.9 Purity Fineness
            </span>
            <span>
              Vault Custody: <strong>Brink's Global Services, Almas Tower</strong>
            </span>
            <span>
              Audited by <strong>BDO Dubai</strong> &bull; 0% UAE VAT
            </span>
          </div>
        </div>
      </header>

      {/* ── 3. Interactive Spot Valuation Calculator ─────────── */}
      <section id="calculator-section" className="site-section site-section-alt">
        <div className="site-container">
          <div className="site-section-head">
            <span className="site-eyebrow">Live Dubai Benchmark</span>
            <h2 className="site-section-title">Transparent pricing down to the milligram.</h2>
            <p className="site-section-desc">
              Calculate bullion purchase values in real time based on the official Dubai Gold Souk benchmark. Fractional digital accumulation begins at 10 AED. Minted physical delivery begins at 1 gram.
            </p>
          </div>

          <div className="site-calc-box">
            <label
              htmlFor="weight-selector"
              style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1D1D1F', marginBottom: 12 }}
            >
              Select Minted Weight (Grams):
            </label>

            {/* Quick preset chips */}
            <div id="weight-selector" className="site-weight-selector">
              {BAR_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className={`site-weight-btn ${selectedWeight === p.weight ? 'active' : ''}`}
                  onClick={() => handleSelectWeight(p.weight)}
                >
                  {p.label} Bar
                </button>
              ))}
            </div>

            {/* Custom weight input */}
            <div style={{ marginBottom: 24 }}>
              <label
                htmlFor="custom-grams"
                style={{ display: 'block', fontSize: 12, color: '#6E6E73', marginBottom: 6 }}
              >
                Or enter exact weight in grams:
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#FFFFFF',
                  border: '1px solid #D2D2D7',
                  borderRadius: 6,
                  padding: '8px 14px',
                }}
              >
                <input
                  id="custom-grams"
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="10000"
                  value={customGrams}
                  onChange={(e) => {
                    setCustomGrams(e.target.value);
                    const val = parseFloat(e.target.value);
                    if (val && !isNaN(val)) setSelectedWeight(val);
                  }}
                  style={{
                    border: 'none',
                    outline: 'none',
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#1D1D1F',
                    width: '100%',
                    background: 'transparent',
                  }}
                />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#86868B', marginLeft: 8 }}>
                  Grams 24K
                </span>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="site-calc-result">
              <div className="site-calc-row">
                <span>Gold Spot Valuation ({parsedGrams.toFixed(2)}g @ AED {DEMO_GOLD_RATE.toFixed(2)}/g)</span>
                <span style={{ color: '#1D1D1F', fontWeight: 600 }}>
                  AED {metalValueAED.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="site-calc-row">
                <span>Tamper-evident assay sealing and minting</span>
                <span style={{ color: '#1D1D1F' }}>AED {makingChargesAED.toFixed(2)}</span>
              </div>
              <div className="site-calc-row">
                <span>Insured courier transport (Transguard Armoured across UAE)</span>
                <span style={{ color: '#1D1D1F' }}>AED {deliveryChargesAED.toFixed(2)}</span>
              </div>
              <div className="site-calc-row total">
                <span>Total Delivery Settlement</span>
                <span style={{ color: '#8A6718' }}>
                  AED {totalPayableAED.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div style={{ fontSize: 11, color: '#86868B', marginTop: 10, textAlign: 'right' }}>
                Simulated calculation based on live Dubai spot benchmark. UAE VAT rate is 0%.
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                className="site-btn site-btn-dark"
                style={{ flex: 1 }}
                onClick={() => navigate('delivery')}
              >
                Order {parsedGrams}g Bullion Delivery in App
              </button>
              <button
                className="site-btn site-btn-outline"
                style={{ flex: 1 }}
                onClick={() => navigate('buy')}
              >
                Buy as Vaulted Digital Gold
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Physical Bullion Delivery Section ─────────────── */}
      <section id="delivery-section" className="site-section">
        <div className="site-container">
          <div className="site-section-head">
            <span className="site-eyebrow">Physical Redemption</span>
            <h2 className="site-section-title">Minted bars in tamper-evident certicards.</h2>
            <p className="site-section-desc">
              Every physical bar is individually numbered, tested for 999.9 fineness, and sealed inside an assay card. Shipments are transported by Transguard armoured logistics across all seven Emirates with door-to-door insurance.
            </p>
          </div>

          <div className="site-grid-2">
            <div className="site-panel">
              <h3 className="site-panel-title">Assay Certification Packaging</h3>
              <p className="site-panel-desc">
                Physical gold bars are packaged in credit-card format certicards. The seal contains anti-counterfeiting optical film, an individual laser-etched serial number, and an assayer signature verifying weight and fineness.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', gap: 10, fontSize: 13.5, color: '#1D1D1F' }}>
                  <span style={{ color: '#8A6718', fontWeight: 700 }}>&bull;</span>
                  <span><strong>Serial tracking:</strong> Unique alphanumeric code recorded on the depository ledger.</span>
                </div>
                <div style={{ display: 'flex', gap: 10, fontSize: 13.5, color: '#1D1D1F' }}>
                  <span style={{ color: '#8A6718', fontWeight: 700 }}>&bull;</span>
                  <span><strong>Assayer sign-off:</strong> Formal metallurgical certification of 999.9 parts per thousand.</span>
                </div>
                <div style={{ display: 'flex', gap: 10, fontSize: 13.5, color: '#1D1D1F' }}>
                  <span style={{ color: '#8A6718', fontWeight: 700 }}>&bull;</span>
                  <span><strong>Tamper detection:</strong> Visual pattern destructs permanently if opened.</span>
                </div>
              </div>
            </div>

            <div className="site-panel">
              <h3 className="site-panel-title">Transguard Armoured Logistics</h3>
              <p className="site-panel-desc">
                Deliveries are executed through Transguard, the cash-in-transit subsidiary of the Emirates Group. Orders are tracked continuously from vault dispatch to physical recipient handover.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', gap: 10, fontSize: 13.5, color: '#1D1D1F' }}>
                  <span style={{ color: '#8A6718', fontWeight: 700 }}>&bull;</span>
                  <span><strong>Identity verification:</strong> Handover requires original Emirates ID matching account holder.</span>
                </div>
                <div style={{ display: 'flex', gap: 10, fontSize: 13.5, color: '#8A6718', fontWeight: 700 }}>
                  <span style={{ color: '#8A6718' }}>&bull;</span>
                  <span style={{ color: '#1D1D1F', fontWeight: 400 }}><strong>100% Transit insurance:</strong> Comprehensive coverage up to the moment of physical handover.</span>
                </div>
                <div style={{ display: 'flex', gap: 10, fontSize: 13.5, color: '#1D1D1F' }}>
                  <span style={{ color: '#8A6718', fontWeight: 700 }}>&bull;</span>
                  <span><strong>UAE wide coverage:</strong> Deliveries to Dubai, Abu Dhabi, Sharjah, and all Northern Emirates.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Vault Custody & DMCC Bailment Section ─────────── */}
      <section id="vault-section" className="site-section site-section-alt">
        <div className="site-container">
          <div className="site-section-head">
            <span className="site-eyebrow">Institutional Depository</span>
            <h2 className="site-section-title">Vaulted in Almas Tower, Dubai.</h2>
            <p className="site-section-desc">
              Your gold is held under bailment with Brink's Global Services in Jumeirah Lakes Towers. Title remains exclusively in your name. Assets are segregated from corporate operating capital.
            </p>
          </div>

          <div className="site-grid-2">
            <div className="site-panel">
              <h3 className="site-panel-title">1:1 Physical Allocation</h3>
              <p className="site-panel-desc">
                For every gram shown on your account balance, an equivalent quantity of Dubai Good Delivery gold sits physically in Brink's vaults. Fractional ownership represents undivided beneficial interest in certified wholesale bars.
              </p>
              <button
                className="site-btn site-btn-outline"
                style={{ width: '100%' }}
                onClick={() => navigate('vaultProof')}
              >
                Inspect Vault Custody Certificate in App
              </button>
            </div>

            <div className="site-panel">
              <h3 className="site-panel-title">Independent BDO Quarterly Audits</h3>
              <p className="site-panel-desc">
                BDO Chartered Accountants performs quarterly on-site physical bar counts and reconciliation audits at Almas Tower. Inspection certificates verifying 100 percent backing are published directly to account holders.
              </p>
              <button
                className="site-btn site-btn-outline"
                style={{ width: '100%' }}
                onClick={() => navigate('dashboard')}
              >
                View Audit Ledger in App
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Technical Specifications Table ────────────────── */}
      <section id="specs-section" className="site-section">
        <div className="site-container">
          <div className="site-section-head">
            <span className="site-eyebrow">Technical Parameters</span>
            <h2 className="site-section-title">Depository Specifications</h2>
            <p className="site-section-desc">
              Standardized parameters governing purity, custody, taxation, and liquidation under DMCC regulatory oversight.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="site-specs-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>24K Gold Bullion</th>
                  <th>Investment Silver</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="label-col">Purity Fineness</td>
                  <td>999.9 parts per thousand (24 Karat)</td>
                  <td>999.0 parts per thousand</td>
                </tr>
                <tr>
                  <td className="label-col">Accreditation Standard</td>
                  <td>Dubai Good Delivery (DGD)</td>
                  <td>DGD Silver Standard</td>
                </tr>
                <tr>
                  <td className="label-col">Primary Depository</td>
                  <td>Brink's Global Services (Almas Tower, JLT Dubai)</td>
                  <td>Brink's DMCC Depository</td>
                </tr>
                <tr>
                  <td className="label-col">Secondary Depository</td>
                  <td>Transguard Vaults (Emirates Group HQ, Dubai)</td>
                  <td>Transguard Vaults</td>
                </tr>
                <tr>
                  <td className="label-col">Independent Auditor</td>
                  <td>BDO Chartered Accountants (Dubai)</td>
                  <td>BDO Chartered Accountants</td>
                </tr>
                <tr>
                  <td className="label-col">Minimum Transaction</td>
                  <td>10 AED (digital) or 1g (minted bar)</td>
                  <td>10 AED (digital) or 50g (bullion)</td>
                </tr>
                <tr>
                  <td className="label-col">UAE Value Added Tax</td>
                  <td>0% Exempt (Investment Precious Metals)</td>
                  <td>0% Exempt (Investment Grade)</td>
                </tr>
                <tr>
                  <td className="label-col">Liquidation Settlement</td>
                  <td>Instant cash credit to UAE Central Bank IBAN</td>
                  <td>Instant cash credit to UAE IBAN</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 7. Working Web App Launch Banner ─────────────────── */}
      <section className="site-section site-section-alt" style={{ textAlign: 'center' }}>
        <div className="site-container" style={{ maxWidth: 640 }}>
          <span className="site-eyebrow">Interactive Prototype</span>
          <h2 className="site-section-title" style={{ fontSize: 36, marginBottom: 16 }}>
            Experience the full digital depository.
          </h2>
          <p className="site-section-desc" style={{ margin: '0 auto 28px' }}>
            Test digital gold purchases, physical certicard delivery workflows, automated micro-savings, and vault custody certificates directly in your browser.
          </p>
          <button
            className="site-btn site-btn-dark"
            style={{ fontSize: 15, padding: '14px 28px' }}
            onClick={() => navigate('dashboard')}
          >
            Launch Interactive Web App
          </button>
        </div>
      </section>

      {/* ── 8. Global Clean Footer ───────────────────────────── */}
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-grid">
            <div className="site-footer-col">
              <h4>YASS Bullion Dubai</h4>
              <p style={{ maxWidth: 320, lineHeight: 1.5, color: '#6E6E73' }}>
                A product by YASS Group, Dubai. DMCC member depository providing institutional physical gold vaulting and insured doorstep delivery across the United Arab Emirates.
              </p>
              <div style={{ marginTop: 14, color: '#86868B', fontSize: 11.5 }}>
                Almas Tower, JLT &bull; Dubai Gold Souk, Deira, Dubai, UAE
              </div>
            </div>

            <div className="site-footer-col">
              <h4>Depository</h4>
              <ul>
                <li><a onClick={() => scrollToSection('delivery-section')}>Physical Delivery</a></li>
                <li><a onClick={() => scrollToSection('vault-section')}>Brink's Custody</a></li>
                <li><a onClick={() => scrollToSection('specs-section')}>Specifications</a></li>
                <li><a onClick={() => scrollToSection('calculator-section')}>Live Calculator</a></li>
              </ul>
            </div>

            <div className="site-footer-col">
              <h4>Application</h4>
              <ul>
                <li><a onClick={() => navigate('dashboard')}>Executive Dashboard</a></li>
                <li><a onClick={() => navigate('buy')}>Buy 24K Gold</a></li>
                <li><a onClick={() => navigate('delivery')}>Redeem Bullion</a></li>
                <li><a onClick={() => navigate('vaultProof')}>Audit Certificate</a></li>
              </ul>
            </div>

            <div className="site-footer-col">
              <h4>Legal & Policy</h4>
              <ul>
                <li><a onClick={() => setActiveModal('terms')}>Terms of Service</a></li>
                <li><a onClick={() => setActiveModal('privacy')}>Privacy Policy</a></li>
                <li><a onClick={() => navigate('vaultProof')}>Assay Certificate</a></li>
              </ul>
            </div>
          </div>

          <div className="site-footer-legal">
            <div>
              &copy; 2026 YASS Group Dubai. DMCC Member Depository. All rights reserved.
            </div>
            <div>
              Physical precious metals custody conducted in compliance with DMCC guidelines and UAE Federal regulations.
            </div>
          </div>
        </div>
      </footer>

      {/* ── TERMS MODAL ──────────────────────────────────────── */}
      {activeModal === 'terms' && (
        <div className="modal-overlay" onClick={() => setActiveModal('none')}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 720, padding: 32 }}
          >
            <div className="modal-drag-handle" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1D1D1F' }}>Terms of Service</h3>
                <span style={{ fontSize: 11, color: '#8A6718', fontWeight: 600 }}>
                  DRAFT FOR REVIEW BY YASS GROUP COMPLIANCE
                </span>
              </div>
              <button
                onClick={() => setActiveModal('none')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 18,
                  cursor: 'pointer',
                  color: '#6E6E73',
                  padding: 4,
                }}
              >
                &times;
              </button>
            </div>

            <div style={{ fontSize: 13, lineHeight: 1.6, color: '#333336', maxHeight: '60vh', overflowY: 'auto' }}>
              <p style={{ marginBottom: 12 }}>
                <strong>1. Depository Relationship and Bailment</strong><br />
                YASS Bullion (operating under YASS Group, Dubai) acts as custodian and bailee of physical precious metals on behalf of verified account holders. Title to allocated 24K gold remains at all times the sole legal property of the user. Bullion is vaulted under bailment agreements with Brink's Global Services at Almas Tower, Jumeirah Lakes Towers, Dubai.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>2. Purity and Dubai Good Delivery Standard</strong><br />
                All gold allocated or delivered through the service conforms to Dubai Good Delivery (DGD) specifications, with a minimum fineness of 999.9 parts per thousand (24 Karat). Independent verification is performed quarterly by BDO Chartered Accountants (Dubai).
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>3. Physical Delivery and Handover</strong><br />
                Delivery orders of minted bullion bars and coins are executed through Transguard armoured logistics. Handover requires the physical presence of the account holder with a valid original Emirates ID. Transit insurance covers 100 percent of the product value up to verified physical delivery.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>4. Value Added Tax (VAT) Exemption</strong><br />
                Under UAE Federal Decree-Law No. (8) of 2017 on Value Added Tax, precious metals of 99 percent purity or greater are treated as investment grade and are exempt from standard 5 percent UAE VAT.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>5. Governing Law and Jurisdiction</strong><br />
                These terms are governed by the laws of the Emirate of Dubai and the federal laws of the United Arab Emirates. Disputes are subject to the exclusive jurisdiction of the competent courts of Dubai.
              </p>
            </div>

            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <button
                className="site-btn site-btn-dark"
                onClick={() => setActiveModal('none')}
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PRIVACY POLICY MODAL ─────────────────────────────── */}
      {activeModal === 'privacy' && (
        <div className="modal-overlay" onClick={() => setActiveModal('none')}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 720, padding: 32 }}
          >
            <div className="modal-drag-handle" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1D1D1F' }}>Privacy Policy</h3>
                <span style={{ fontSize: 11, color: '#8A6718', fontWeight: 600 }}>
                  DRAFT FOR REVIEW BY YASS GROUP COMPLIANCE
                </span>
              </div>
              <button
                onClick={() => setActiveModal('none')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 18,
                  cursor: 'pointer',
                  color: '#6E6E73',
                  padding: 4,
                }}
              >
                &times;
              </button>
            </div>

            <div style={{ fontSize: 13, lineHeight: 1.6, color: '#333336', maxHeight: '60vh', overflowY: 'auto' }}>
              <p style={{ marginBottom: 12 }}>
                <strong>1. Data Collection and Legal Basis</strong><br />
                YASS Bullion collects identification details including full legal name, Emirates ID number, registered mobile number, email address, and UAE bank account details. This data is collected to fulfill Know Your Customer (KYC) requirements under UAE Central Bank regulations and Anti-Money Laundering (AML) directives.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>2. UAE PASS Integration</strong><br />
                Where users authenticate via UAE PASS, identity verification records are handled in accordance with UAE Federal Decree-Law No. (45) of 2021 on Personal Data Protection. Cryptographic verification tokens are validated directly with authorized UAE Digital Government infrastructure.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>3. Storage and Custody Records</strong><br />
                Physical custody allocations, bar serial numbers, and transaction logs are maintained in tamper-evident electronic ledgers. Vault records are audited quarterly by third-party auditors (BDO Dubai) without disclosing personal identifying information to unauthorized parties.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>4. Third-Party Sharing Limitations</strong><br />
                Personal data is shared strictly with authorized partners required for service delivery: Brink's Global Services (custody allocation records), Transguard (armoured courier delivery verification), and regulated UAE banking partners (funds settlement). Personal information is never sold or used for marketing by third parties.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>5. Contact and Data Rights</strong><br />
                Users may request access, correction, or audit of their stored records by contacting the compliance officer at YASS Group Dubai, Almas Tower, JLT, Dubai, UAE.
              </p>
            </div>

            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <button
                className="site-btn site-btn-dark"
                onClick={() => setActiveModal('none')}
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingWebsite;

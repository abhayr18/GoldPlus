// ============================================
// YASS Gold & Bullion — Executive Landing Page
// White + Gold Clean Minimalist & Professional Design
// Digital Gold & Doorstep Physical Bullion Delivery
// ============================================

import React from 'react';
import {
  ShieldCheck,
  ArrowRight,
  Package,
  Lock,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { BrandLogo, GoldBarIllustration } from '../components/BrandLogo';
import { BRAND, DUBAI_MARKET_RATES } from '../constants';

export const SplashScreen: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="screen-container" style={{ background: '#FFFFFF' }}>
      {/* ── 1. Clean Top Header ──────────────────────────────── */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 18px',
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <BrandLogo size="sm" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              background: '#FEFBF2',
              border: '1px solid #EED8A1',
              borderRadius: 20,
              padding: '4px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#059669',
              }}
            />
            <span style={{ fontSize: 11, fontWeight: 800, color: '#8F6914' }}>
              24K AED {DUBAI_MARKET_RATES.rate24K.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => navigate('dashboard')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 12.5,
              fontWeight: 700,
              color: '#0F172A',
              cursor: 'pointer',
            }}
          >
            Open App
          </button>
        </div>
      </header>

      {/* ── 2. Hero Section ─────────────────────────────────── */}
      <section style={{ padding: '24px 18px 20px', textAlign: 'center' }}>
        {/* Trust badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: '#FEFBF2',
            border: '1px solid #EED8A1',
            borderRadius: 20,
            padding: '5px 12px',
            marginBottom: 16,
          }}
        >
          <ShieldCheck size={14} color="#8F6914" />
          <span style={{ fontSize: 11, fontWeight: 800, color: '#8F6914', letterSpacing: 0.3 }}>
            DMCC ACCREDITED • DUBAI GOOD DELIVERY (999.9)
          </span>
        </div>

        {/* Hero Headline */}
        <h1
          style={{
            fontSize: 27,
            fontWeight: 900,
            color: '#0F172A',
            lineHeight: 1.25,
            letterSpacing: -0.5,
            marginBottom: 10,
          }}
        >
          Buy 24K Digital Gold.{' '}
          <span style={{ color: '#C59B27' }}>
            Receive Minted Bullion at Your Doorstep.
          </span>
        </h1>

        <p
          style={{
            fontSize: 13,
            color: '#64748B',
            lineHeight: 1.5,
            maxWidth: 380,
            margin: '0 auto 20px',
          }}
        >
          The official gold depository of Dubai. Save in 24K 999.9 pure gold vaulted at Brink’s DMCC with tamper-proof certified bullion delivery across the UAE.
        </p>

        {/* Official Gold Bullion Image Display */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div
            style={{
              position: 'relative',
              padding: '16px 24px',
              borderRadius: 20,
              background: 'linear-gradient(135deg, #FFFDF7 0%, #FEFBF0 100%)',
              border: '1.5px solid #EED8A1',
              boxShadow: '0 8px 24px rgba(197, 155, 39, 0.12)',
            }}
          >
            <GoldBarIllustration size={110} />
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#FFFFFF',
                border: '1px solid #EED8A1',
                borderRadius: 20,
                padding: '3px 12px',
                fontSize: 10,
                fontWeight: 800,
                color: '#8F6914',
                whiteSpace: 'nowrap',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              100% Physical Custody at Brink’s DMCC
            </div>
          </div>
        </div>

        {/* Live Dubai Benchmark Rate Card */}
        <div
          style={{
            background: '#FEFBF2',
            border: '1px solid #EED8A1',
            borderRadius: 14,
            padding: '14px 16px',
            marginBottom: 20,
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#8F6914', textTransform: 'uppercase' }}>
                Dubai Gold Souk Spot Benchmark
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginTop: 2 }}>
                AED {DUBAI_MARKET_RATES.rate24K.toFixed(2)} <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>/ gram</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: '#059669', background: '#ECFDF5', padding: '3px 8px', borderRadius: 6, border: '1px solid #A7F3D0' }}>
                +0.75% Today
              </span>
              <div style={{ fontSize: 10, color: '#64748B', marginTop: 4 }}>
                0% UAE VAT
              </div>
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          className="btn btn-primary"
          onClick={() => navigate('dashboard')}
          style={{
            height: 48,
            fontSize: 15,
            fontWeight: 800,
            marginBottom: 8,
          }}
        >
          <span>Get Started with YASS Gold</span>
          <ArrowRight size={17} />
        </button>

        <div style={{ fontSize: 11, color: '#64748B' }}>
          Instant setup with UAE PASS • 0% VAT on investment gold
        </div>
      </section>

      {/* ── 3. Core Feature Pillars ──────────────────────────── */}
      <section style={{ padding: '0 18px 24px' }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#8F6914', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>
          Depository Capabilities
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Feature 1: Digital Gold */}
          <div
            className="card"
            onClick={() => navigate('buy')}
            style={{ cursor: 'pointer', padding: '14px 16px' }}
          >
            <div style={{ display: 'flex', gap: 12 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: '#FEFBF2',
                  border: '1px solid #EED8A1',
                  color: '#A67C1E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Instant 24K Digital Gold
                  </h3>
                  <ChevronRight size={16} color="#64748B" />
                </div>
                <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.4, marginTop: 3 }}>
                  Buy from as little as AED 10 with live Dubai Souk rates, zero lock-in, and 0% VAT exemption on investment gold.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2: Physical Bullion Delivery */}
          <div
            className="card"
            onClick={() => navigate('delivery')}
            style={{ cursor: 'pointer', padding: '14px 16px' }}
          >
            <div style={{ display: 'flex', gap: 12 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Package size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Doorstep Bullion Delivery
                  </h3>
                  <ChevronRight size={16} color="#64748B" />
                </div>
                <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.4, marginTop: 3 }}>
                  Convert vaulted grams into minted 24K bars (1g to 1kg) and coins in tamper-proof certicards with Transguard armoured courier.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3: Brink's DMCC Vaulting */}
          <div
            className="card"
            onClick={() => navigate('vaultProof')}
            style={{ cursor: 'pointer', padding: '14px 16px' }}
          >
            <div style={{ display: 'flex', gap: 12 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Lock size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    100% Backed at Brink's DMCC
                  </h3>
                  <ChevronRight size={16} color="#64748B" />
                </div>
                <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.4, marginTop: 3 }}>
                  Physical custody at Almas Tower, JLT Dubai. Quarterly independent audit by BDO Chartered Accountants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Clean Footer ─────────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid #E2E8F0',
          padding: '24px 18px 36px',
          background: '#F8FAFC',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#64748B', fontWeight: 600 }}>
            <CheckCircle2 size={14} color="#059669" />
            <span>Brink's DMCC Vaulted</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#64748B', fontWeight: 600 }}>
            <CheckCircle2 size={14} color="#059669" />
            <span>BDO Audited</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#64748B', fontWeight: 600 }}>
            <CheckCircle2 size={14} color="#059669" />
            <span>0% UAE VAT</span>
          </div>
        </div>

        <p style={{ fontSize: 11, color: '#94A3B8', lineHeight: 1.5, maxWidth: 380, margin: '0 auto' }}>
          {BRAND.attribution}<br />
          Almas Tower, JLT & Dubai Gold Souk, Deira, Dubai, UAE
        </p>
      </footer>
    </div>
  );
};

export default SplashScreen;

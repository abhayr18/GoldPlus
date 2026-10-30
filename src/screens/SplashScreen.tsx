// ============================================
// OGold Wallet — Executive Landing Page & Onboarding
// The Precious Metals & Lifestyle Super App (Dubai, UAE)
// App Store ID: 6504926022
// ============================================

import React from 'react';
import {
  ShieldCheck,
  CreditCard,
  Percent,
  ArrowRight,
  Gift,
  Lock,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { BrandLogo, GoldBarIllustration } from '../components/BrandLogo';
import { BRAND, DUBAI_MARKET_RATES } from '../constants';

export const SplashScreen: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="screen-container" style={{ background: '#0A0D14' }}>
      {/* ── 1. Top Navigation Bar ────────────────────────────── */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 18px',
          background: '#0A0D14',
          borderBottom: '1px solid #1E293B',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <BrandLogo size="sm" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              background: '#161D2D',
              border: '1px solid #1E293B',
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
                background: '#10B981',
                boxShadow: '0 0 6px #10B981',
              }}
            />
            <span style={{ fontSize: 10.5, fontWeight: 700, color: '#FBBF24' }}>
              AU AED {DUBAI_MARKET_RATES.rate24K.toFixed(1)}
            </span>
          </div>

          <button
            onClick={() => navigate('dashboard')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 12.5,
              fontWeight: 700,
              color: '#FFFFFF',
              cursor: 'pointer',
            }}
          >
            Open App
          </button>
        </div>
      </header>

      {/* ── 2. Hero Section ─────────────────────────────────── */}
      <section style={{ padding: '24px 18px 20px', textAlign: 'center' }}>
        {/* Trust pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: 20,
            padding: '5px 12px',
            marginBottom: 16,
          }}
        >
          <ShieldCheck size={14} color="#FBBF24" />
          <span style={{ fontSize: 10.5, fontWeight: 800, color: '#FBBF24', letterSpacing: 0.5 }}>
            DUBAI ECONOMIC DEPT LICENSED • SHARIAH COMPLIANT
          </span>
        </div>

        {/* Hero Headline */}
        <h1
          style={{
            fontSize: 27,
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 1.25,
            letterSpacing: -0.5,
            marginBottom: 10,
          }}
        >
          Buy Gold & Silver.{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Spend Everywhere.
          </span>
        </h1>

        <p
          style={{
            fontSize: 13,
            color: '#94A3B8',
            lineHeight: 1.5,
            maxWidth: 380,
            margin: '0 auto 20px',
          }}
        >
          The UAE’s premier digital precious metals super app. Buy 24K gold & .999 silver from AED 1, earn 4.8% APR Wakala yield, and spend gold globally with the OGold Mastercard.
        </p>

        {/* Official Bullion Hero Graphic */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div
            style={{
              position: 'relative',
              padding: '16px 20px',
              borderRadius: 20,
              background: 'linear-gradient(145deg, #1A2234 0%, #0F1624 100%)',
              border: '1.5px solid rgba(245, 158, 11, 0.35)',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7), 0 0 24px rgba(245, 158, 11, 0.2)',
            }}
          >
            <GoldBarIllustration size={110} />
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(10, 13, 20, 0.85)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                borderRadius: 20,
                padding: '3px 12px',
                fontSize: 10,
                fontWeight: 800,
                color: '#FBBF24',
                whiteSpace: 'nowrap',
              }}
            >
              100% Insured by Dubai National Insurance (DNI)
            </div>
          </div>
        </div>

        {/* Live Spot Prices Grid (AU & AG) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            marginBottom: 20,
          }}
        >
          {/* 24K Gold Card */}
          <div
            style={{
              background: '#161D2D',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: 14,
              padding: '12px 14px',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#FBBF24' }}>24K GOLD</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#10B981' }}>+0.75%</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
              AED {DUBAI_MARKET_RATES.rate24K.toFixed(2)}
            </div>
            <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>
              Per gram • 999.9 Fine
            </div>
          </div>

          {/* .999 Silver Card */}
          <div
            style={{
              background: '#161D2D',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              borderRadius: 14,
              padding: '12px 14px',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#E2E8F0' }}>.999 SILVER</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#10B981' }}>+1.20%</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
              AED {DUBAI_MARKET_RATES.rateSilver999.toFixed(2)}
            </div>
            <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>
              Per gram • Pure Bullion
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          className="btn btn-primary"
          onClick={() => navigate('dashboard')}
          style={{
            height: 48,
            fontSize: 14.5,
            fontWeight: 800,
            marginBottom: 8,
          }}
        >
          <span>Open OGold Wallet</span>
          <ArrowRight size={17} />
        </button>

        <div style={{ fontSize: 11, color: '#64748B' }}>
          Free instant account setup with UAE PASS • 0% VAT on investment metals
        </div>
      </section>

      {/* ── 3. The 4 Super App Value Pillars ──────────────────── */}
      <section style={{ padding: '0 18px 24px' }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#FBBF24', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>
          Why OGold Wallet
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Card Feature */}
          <div
            className="card"
            onClick={() => navigate('card')}
            style={{ cursor: 'pointer', padding: '14px 16px' }}
          >
            <div style={{ display: 'flex', gap: 12 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: 'rgba(245, 158, 11, 0.15)',
                  color: '#FBBF24',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <CreditCard size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: 13.5, fontWeight: 800, color: '#FFFFFF' }}>
                    OGold Platinum Mastercard
                  </h3>
                  <ChevronRight size={16} color="#64748B" />
                </div>
                <p style={{ fontSize: 11.5, color: '#94A3B8', lineHeight: 1.4, marginTop: 3 }}>
                  Spend your gold anywhere Mastercard is accepted. Instant auto-conversion with zero liquidation lag, plus Apple Pay integration.
                </p>
              </div>
            </div>
          </div>

          {/* Wakala Yield */}
          <div
            className="card"
            onClick={() => navigate('lease')}
            style={{ cursor: 'pointer', padding: '14px 16px' }}
          >
            <div style={{ display: 'flex', gap: 12 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: 'rgba(139, 92, 246, 0.15)',
                  color: '#A78BFA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Percent size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: 13.5, fontWeight: 800, color: '#FFFFFF' }}>
                    OGold Earn: 4.8% APR Wakala Yield
                  </h3>
                  <ChevronRight size={16} color="#64748B" />
                </div>
                <p style={{ fontSize: 11.5, color: '#94A3B8', lineHeight: 1.4, marginTop: 3 }}>
                  Put idle precious metals to work in Shariah-compliant profit-share pools. Earn passive yield paid directly in physical grams every month.
                </p>
              </div>
            </div>
          </div>

          {/* DNI Insured Vaulting */}
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
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10B981',
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
                  <h3 style={{ fontSize: 13.5, fontWeight: 800, color: '#FFFFFF' }}>
                    100% Physically Backed & DNI Insured
                  </h3>
                  <ChevronRight size={16} color="#64748B" />
                </div>
                <p style={{ fontSize: 11.5, color: '#94A3B8', lineHeight: 1.4, marginTop: 3 }}>
                  Every gram is physically vaulted at Brink's DMCC in Dubai, independently audited quarterly by BDO, and insured by Dubai National Insurance.
                </p>
              </div>
            </div>
          </div>

          {/* Bullion Delivery & Rewards */}
          <div
            className="card"
            onClick={() => navigate('rewards')}
            style={{ cursor: 'pointer', padding: '14px 16px' }}
          >
            <div style={{ display: 'flex', gap: 12 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: 'rgba(249, 115, 22, 0.15)',
                  color: '#FB923C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Gift size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: 13.5, fontWeight: 800, color: '#FFFFFF' }}>
                    Daily Spin & Win + Travel eSIMs
                  </h3>
                  <ChevronRight size={16} color="#64748B" />
                </div>
                <p style={{ fontSize: 11.5, color: '#94A3B8', lineHeight: 1.4, marginTop: 3 }}>
                  Spin the wheel daily to claim bonus gold & silver. Plus, spend precious metals on global eSIMs and gift cards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Institutional Trust Footer ───────────────────── */}
      <footer
        style={{
          borderTop: '1px solid #1E293B',
          padding: '24px 18px 40px',
          background: '#0E131F',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#94A3B8' }}>
            <ShieldCheck size={14} color="#10B981" />
            <span>DNI Insured</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#94A3B8' }}>
            <ShieldCheck size={14} color="#FBBF24" />
            <span>Shariah Certified</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#94A3B8' }}>
            <ShieldCheck size={14} color="#38BDF8" />
            <span>BDO Audited</span>
          </div>
        </div>

        <p style={{ fontSize: 11, color: '#64748B', lineHeight: 1.5, maxWidth: 380, margin: '0 auto' }}>
          {BRAND.attribution}<br />
          Licensed by Dubai Department of Economy and Tourism (DED) for Precious Metals Trading.
        </p>
      </footer>
    </div>
  );
};

export default SplashScreen;

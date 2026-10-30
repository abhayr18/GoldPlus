// ============================================
// YASS Gold & YASS Bullion — Executive Landing Page
// A product by YASS Group, Dubai
// DMCC Accredited Precious Metals Depository
// ============================================

import React from 'react';
import {
  ShieldCheck,
  Percent,
  Truck,
  ArrowRight,
  Award,
  Lock,
  ChevronRight,
  Coins,
  Building,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { BrandLogo, GoldBarIllustration } from '../components/BrandLogo';
import { BRAND, DUBAI_MARKET_RATES, COLORS } from '../constants';

export const SplashScreen: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="screen-container" style={{ background: '#FFFFFF' }}>
      {/* ── 1. Top Navigation Bar ────────────────────────────── */}
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
        <BrandLogo size="sm" variant="gold" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              background: '#FDF8EC',
              border: '1px solid #F4D681',
              borderRadius: 20,
              padding: '4px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#A67C1E' }}>
              24K AED {DUBAI_MARKET_RATES.rate24K.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => navigate('signup')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 12.5,
              fontWeight: 700,
              color: '#0F172A',
              cursor: 'pointer',
            }}
          >
            Sign In
          </button>
        </div>
      </header>

      {/* ── 2. Hero Section with Gold Bullion Image ───────────── */}
      <section style={{ padding: '24px 18px 20px', textAlign: 'center' }}>
        {/* Trust pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: 20,
            padding: '5px 12px',
            marginBottom: 16,
          }}
        >
          <ShieldCheck size={14} color="#059669" />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#0F172A', letterSpacing: 0.2 }}>
            DMCC ACCREDITED • DUBAI GOOD DELIVERY (999.9)
          </span>
        </div>

        {/* Hero Headline */}
        <h1
          style={{
            fontSize: 27,
            fontWeight: 800,
            lineHeight: 1.25,
            color: '#0F172A',
            letterSpacing: -0.5,
            marginBottom: 10,
          }}
        >
          Dubai’s Gold Standard.
          <br />
          <span style={{ color: COLORS.primaryGold }}>Save, Earn & Trade 24K Bullion.</span>
        </h1>

        <p
          style={{
            fontSize: 13.5,
            color: '#64748B',
            lineHeight: 1.5,
            maxWidth: 380,
            margin: '0 auto 20px',
          }}
        >
          Trade pure 24K gold starting from just AED 10. Physically vaulted at Brink's DMCC with 0% UAE VAT and doorstep delivery.
        </p>

        {/* Gold Bullion Hero Visual */}
        <div
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 22px',
            padding: '16px',
            borderRadius: 24,
            background: 'radial-gradient(circle, rgba(197, 155, 39, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
          }}
        >
          <GoldBarIllustration size={130} />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 360, margin: '0 auto' }}>
          <button
            className="btn btn-primary"
            onClick={() => navigate('signup')}
            style={{ height: 50, fontSize: 15 }}
          >
            <span>Start Saving in 24K Gold</span>
            <ArrowRight size={17} />
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigate('dashboard')}
            style={{ height: 46, fontSize: 13.5 }}
          >
            <span>Explore Live Souk Rates</span>
          </button>
        </div>

        <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 12 }}>
          Instant setup with <strong>UAE PASS</strong> • No paperwork required
        </div>
      </section>

      {/* ── 3. Live Souk Benchmark Rates Card ─────────────────── */}
      <section style={{ padding: '0 18px 24px' }}>
        <div
          style={{
            background: '#0B1220',
            color: '#FFFFFF',
            borderRadius: 18,
            padding: '18px 20px',
            border: '1px solid rgba(197, 155, 39, 0.3)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 10.5, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 700 }}>
                Dubai Gold Souk & DMCC Benchmark
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF', marginTop: 2 }}>
                Live Market Rates (AED/gram)
              </div>
            </div>
            <span
              style={{
                background: 'rgba(5, 150, 105, 0.2)',
                color: '#34D399',
                padding: '2px 8px',
                borderRadius: 12,
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              Souk Open
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, textAlign: 'center' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '10px 6px', borderRadius: 10 }}>
              <div style={{ fontSize: 10.5, color: '#94A3B8' }}>24K 999.9</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#F4D681', marginTop: 2 }}>
                AED {DUBAI_MARKET_RATES.rate24K.toFixed(2)}
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '10px 6px', borderRadius: 10 }}>
              <div style={{ fontSize: 10.5, color: '#94A3B8' }}>22K 916</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#FFFFFF', marginTop: 2 }}>
                AED {DUBAI_MARKET_RATES.rate22K.toFixed(2)}
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '10px 6px', borderRadius: 10 }}>
              <div style={{ fontSize: 10.5, color: '#94A3B8' }}>18K 750</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#FFFFFF', marginTop: 2 }}>
                AED {DUBAI_MARKET_RATES.rate18K.toFixed(2)}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 14,
              paddingTop: 12,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: 11,
              color: '#34D399',
            }}
          >
            <span>✓ 0% UAE VAT on 24K Bullion</span>
            <span>✓ Guaranteed Buyback Rate</span>
          </div>
        </div>
      </section>

      {/* ── 4. Key Platform Features (Figma Clean Cards) ─────── */}
      <section style={{ padding: '0 18px 24px' }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 14 }}>
          Why Invest with YASS Gold
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Feature 1: Yield */}
          <div
            onClick={() => navigate('signup')}
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              borderRadius: 16,
              padding: '16px',
              display: 'flex',
              gap: 14,
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: '#EEF2FF',
                color: '#6366F1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Percent size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>
                  YASS Gold+ (5.2% Yield)
                </span>
                <span
                  style={{
                    background: '#EEF2FF',
                    color: '#4F46E5',
                    fontSize: 9.5,
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: 6,
                  }}
                >
                  UNIQUE
                </span>
              </div>
              <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.45, marginTop: 4 }}>
                Lease your vaulted gold to vetted institutional Dubai jewellers (Damas, Joyalukkas) with 100% bank guarantees.
              </p>
            </div>
          </div>

          {/* Feature 2: Micro-Savings */}
          <div
            onClick={() => navigate('signup')}
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              borderRadius: 16,
              padding: '16px',
              display: 'flex',
              gap: 14,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Coins size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>
                Daily Micro-Savings from AED 10
              </div>
              <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.45, marginTop: 4 }}>
                Automate small daily savings with Central Bank of UAE Aani Pay. Accumulate pure gold gram-by-gram with zero fees.
              </p>
            </div>
          </div>

          {/* Feature 3: Vaulting */}
          <div
            onClick={() => navigate('signup')}
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              borderRadius: 16,
              padding: '16px',
              display: 'flex',
              gap: 14,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: '#FEF3C7',
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>
                100% Vaulted in Brink’s DMCC
              </div>
              <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.45, marginTop: 4 }}>
                Your gold is physically held at Brink's Global Services (Almas Tower, JLT) & Transguard. Audited by BDO Dubai.
              </p>
            </div>
          </div>

          {/* Feature 4: Physical Delivery */}
          <div
            onClick={() => navigate('signup')}
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              borderRadius: 16,
              padding: '16px',
              display: 'flex',
              gap: 14,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: '#F1F5F9',
                color: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Truck size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>
                Physical Coins & Bars Delivery
              </div>
              <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.45, marginTop: 4 }}>
                Convert your digital balance into 1g to 100g 24K minted gold bullion delivered in tamper-proof assay certicards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Trust & Accreditation Grid ────────────────────── */}
      <section style={{ padding: '0 18px 28px', background: '#F8FAFC' }}>
        <div style={{ paddingTop: 20, textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.8 }}>
            Institutional Trust & Regulation
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: 12, border: '1px solid #E2E8F0' }}>
            <Award size={20} color={COLORS.primaryGold} style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A' }}>DMCC Accredited</div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>Licensed Dubai Bullion Entity</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: 12, border: '1px solid #E2E8F0' }}>
            <ShieldCheck size={20} color="#059669" style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A' }}>BDO Audited</div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>Quarterly 1:1 Physical Audit</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: 12, border: '1px solid #E2E8F0' }}>
            <Building size={20} color="#0F172A" style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A' }}>Brink's & Transguard</div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>Almas Tower, JLT Vaults</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: 12, border: '1px solid #E2E8F0' }}>
            <Lock size={20} color="#6366F1" style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A' }}>Lloyd’s Insured</div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>100% Comprehensive Policy</div>
          </div>
        </div>
      </section>

      {/* ── 6. Bottom Sticky Action Section ──────────────────── */}
      <section
        style={{
          padding: '16px 18px 24px',
          background: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          position: 'sticky',
          bottom: 0,
          boxShadow: '0 -4px 16px rgba(0,0,0,0.04)',
        }}
      >
        <button
          className="btn btn-primary"
          onClick={() => navigate('signup')}
          style={{ height: 48, fontSize: 14.5 }}
        >
          <span>Get Started with YASS Gold</span>
          <ChevronRight size={18} />
        </button>

        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <span style={{ fontSize: 11, color: '#94A3B8' }}>{BRAND.attribution}</span>
        </div>
      </section>
    </div>
  );
};

export default SplashScreen;

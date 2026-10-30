// ============================================
// YASS Gold - Rewards & Bullion Privileges Screen
// Daily Spin & Win, Tier Benefits & Gold Gifting
// A Product by YASS Group, Dubai
// ============================================

import React, { useState } from 'react';
import {
  Gift,
  Sparkles,
  Wifi,
  ShoppingBag,
  Award,
  Share2,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { spinWheelAction } from '../state/appState';
import { LIFESTYLE_SERVICES, DEMO_GOLD_RATE } from '../constants';
import type { LifestyleService } from '../types';

const WHEEL_SEGMENTS = [
  { label: '+10mg Gold', type: 'gold' as const, value: 10, color: '#B8860B' },
  { label: '+50mg Silver', type: 'silver' as const, value: 50, color: '#64748B' },
  { label: '100 XP', type: 'xp' as const, value: 100, color: '#4F46E5' },
  { label: '+25mg Gold', type: 'gold' as const, value: 25, color: '#D4AF37' },
  { label: '+100mg Silver', type: 'silver' as const, value: 100, color: '#475569' },
  { label: '250 XP', type: 'xp' as const, value: 250, color: '#7C3AED' },
  { label: '+50mg Gold', type: 'gold' as const, value: 50, color: '#92400E' },
  { label: '1g Silver Jackpot', type: 'silver' as const, value: 1000, color: '#334155' },
];

export const RewardsScreen: React.FC = () => {
  const { state, setState, showToast } = useApp();
  const user = state.user;

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'esim' | 'giftcard'>('all');
  const [selectedService, setSelectedService] = useState<LifestyleService | null>(null);

  const spinsLeft = user?.spinsAvailable || 0;
  const currentXP = user?.xpPoints || 2450;
  const nextTierXP = 5000;
  const progressPercent = Math.min(100, Math.round((currentXP / nextTierXP) * 100));

  // Handle Wheel Spin
  const handleSpin = () => {
    if (spinsLeft <= 0 || isSpinning) return;

    setIsSpinning(true);
    const winningIndex = 3;
    const segmentAngle = 360 / WHEEL_SEGMENTS.length;
    const randomExtraSpins = 5 * 360;
    const finalAngle = randomExtraSpins + (360 - winningIndex * segmentAngle - segmentAngle / 2);

    setRotationDegree(finalAngle);

    setTimeout(() => {
      setIsSpinning(false);
      const won = WHEEL_SEGMENTS[winningIndex];
      setState(spinWheelAction(state, won.type, won.value));
      showToast(`🎉 Congratulations! You won ${won.label}! Credited to your vault.`, 'success');
    }, 3800);
  };

  const handleBuyLifestyle = (service: LifestyleService) => {
    const goldNeeded = service.priceAED / DEMO_GOLD_RATE;
    if (state.holdings.totalGrams < goldNeeded) {
      showToast(`Insufficient gold balance. Need ${goldNeeded.toFixed(4)}g.`, 'error');
      return;
    }
    showToast(`Order placed for ${service.title}! Voucher delivered to SMS & Email.`, 'success');
    setSelectedService(null);
  };

  const filteredServices =
    selectedCategory === 'all'
      ? LIFESTYLE_SERVICES
      : LIFESTYLE_SERVICES.filter((s) => s.category === selectedCategory);

  return (
    <div className="screen-container">
      {/* ── Top Header ─────────────────────────────────────── */}
      <div className="screen-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Gift size={18} color="#C59B27" />
          <span className="screen-header-title">Rewards & Privileges</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: '#FEFBF2',
            border: '1px solid #EED8A1',
            padding: '3px 10px',
            borderRadius: 12,
            fontSize: 11,
            fontWeight: 800,
            color: '#B8860B',
          }}
        >
          <Sparkles size={12} />
          <span>{currentXP} XP</span>
        </div>
      </div>

      <div className="screen-content" style={{ paddingTop: 16 }}>
        {/* ── 1. Daily Spin & Win Game ────────────────────────── */}
        <div className="card-gold" style={{ marginBottom: 16, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: '#FFFFFF',
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                padding: '2px 8px',
                borderRadius: 4,
                letterSpacing: 0.5,
              }}
            >
              DAILY LUCK
            </span>
            <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>
              {spinsLeft > 0 ? '1 Free Spin Available' : 'Next Spin in 14h 22m'}
            </span>
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', marginTop: 8 }}>
            Spin & Win Free Gold Bullion
          </h3>
          <p style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
            Spin daily to earn free 24K gold milligrams, bonus XP, and VIP perks
          </p>

          {/* Interactive Wheel Graphic */}
          <div className="spin-wheel-container">
            <div className="spin-pointer" />
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'conic-gradient(#FEFBF2 0deg 45deg, #FFFDF7 45deg 90deg, #FEFBF2 90deg 135deg, #FFFDF7 135deg 180deg, #FEFBF2 180deg 225deg, #FFFDF7 225deg 270deg, #FEFBF2 270deg 315deg, #FFFDF7 315deg 360deg)',
                border: '4px solid #EED8A1',
                transform: `rotate(${rotationDegree}deg)`,
                transition: isSpinning ? 'transform 3.8s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'inset 0 0 16px rgba(212, 175, 55, 0.2)',
              }}
            >
              {WHEEL_SEGMENTS.map((seg, idx) => {
                const angle = idx * 45;
                return (
                  <div
                    key={seg.label}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '50%',
                      transformOrigin: '0 118px',
                      transform: `rotate(${angle}deg)`,
                      fontSize: 9.5,
                      fontWeight: 800,
                      color: seg.color,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {seg.label}
                  </div>
                );
              })}
            </div>

            <button
              className="spin-center-hub"
              disabled={spinsLeft <= 0 || isSpinning}
              onClick={handleSpin}
              style={{
                cursor: spinsLeft > 0 && !isSpinning ? 'pointer' : 'not-allowed',
                opacity: spinsLeft > 0 && !isSpinning ? 1 : 0.6,
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                color: '#FFFFFF',
                boxShadow: '0 2px 10px rgba(212, 175, 55, 0.4)',
              }}
            >
              {isSpinning ? 'SPINNING' : spinsLeft > 0 ? 'SPIN' : 'CLAIMED'}
            </button>
          </div>

          <button
            className="btn btn-primary"
            disabled={spinsLeft <= 0 || isSpinning}
            onClick={handleSpin}
            style={{ height: 44, fontSize: 13 }}
          >
            {spinsLeft > 0 ? '🎡 Tap to Spin Wheel' : '✓ Daily Spin Used - Come Back Tomorrow'}
          </button>
        </div>

        {/* ── 2. VIP Tier & XP Progress ──────────────────────── */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Award size={18} color="#C59B27" />
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 800, color: '#0F172A' }}>
                  {user?.tier || 'Gold'} Member Tier
                </div>
                <div style={{ fontSize: 11, color: '#64748B' }}>
                  Enjoy 0% making charges on 100g bars & higher vault limits
                </div>
              </div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 900, color: '#B8860B' }}>
              {currentXP} / {nextTierXP} XP
            </span>
          </div>

          <div
            style={{
              width: '100%',
              height: 6,
              background: '#F1F5F9',
              borderRadius: 3,
              overflow: 'hidden',
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #D4AF37, #B8860B)',
                borderRadius: 3,
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: '#64748B' }}>
            <span>Gold Tier</span>
            <span>Platinum VIP (5,000 XP)</span>
          </div>
        </div>

        {/* ── 3. Lifestyle Services Marketplace ────────────────── */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>
                Lifestyle & Travel Privileges
              </div>
              <div style={{ fontSize: 11.5, color: '#64748B' }}>
                Purchase global travel eSIMs and gift cards directly with gold
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {(['all', 'esim', 'giftcard'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 8,
                  border: selectedCategory === cat ? '1px solid #C59B27' : '1px solid #E2E8F0',
                  background: selectedCategory === cat ? 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)' : '#FFFFFF',
                  color: selectedCategory === cat ? '#FFFFFF' : '#64748B',
                  fontSize: 11.5,
                  fontWeight: 800,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat === 'all' ? 'All Services' : cat === 'esim' ? 'Travel eSIMs' : 'Gift Cards'}
              </button>
            ))}
          </div>

          {/* Services List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="card"
                onClick={() => setSelectedService(service)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: service.category === 'esim' ? '#EFF6FF' : '#FEFBF2',
                      color: service.category === 'esim' ? '#3B82F6' : '#C59B27',
                      border: `1px solid ${service.category === 'esim' ? '#BFDBFE' : '#F3E8C8'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {service.category === 'esim' ? <Wifi size={20} /> : <ShoppingBag size={20} />}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 800, color: '#0F172A' }}>
                        {service.title}
                      </span>
                      <span
                        style={{
                          fontSize: 9.5,
                          fontWeight: 800,
                          padding: '1px 6px',
                          borderRadius: 4,
                          background: '#D1FAE5',
                          color: '#059669',
                        }}
                      >
                        {service.tag}
                      </span>
                    </div>
                    <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2 }}>
                      {service.provider}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13.5, fontWeight: 900, color: '#B8860B' }}>
                    AED {service.priceAED}
                  </div>
                  <div style={{ fontSize: 10.5, color: '#64748B' }}>
                    ≈ {service.goldEquivalentGrams}g 24K
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. Refer & Earn Free Gold ───────────────────────── */}
        <div
          className="card-gold"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            padding: '16px',
          }}
        >
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 900, color: '#0F172A' }}>
              Gift & Invite across UAE
            </div>
            <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2 }}>
              Get +50mg pure gold for every friend who vaults on YASS Gold
            </div>
          </div>
          <button
            onClick={() => showToast('Referral link copied to clipboard: https://yassbullion.com/r/tariq', 'success')}
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
              color: '#FFFFFF',
              border: 'none',
              padding: '9px 16px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 2px 8px rgba(212, 175, 55, 0.25)',
            }}
          >
            <Share2 size={14} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* ── Buy Lifestyle Modal ──────────────────────────────── */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 17, fontWeight: 900, color: '#0F172A', marginBottom: 6 }}>
              Confirm Privilege Redemption
            </h3>
            <div style={{ fontSize: 12, color: '#64748B', marginBottom: 14 }}>
              Pay instantly using your vaulted 24K gold balance
            </div>

            <div className="summary-row">
              <span className="label">Item</span>
              <span className="value">{selectedService.title}</span>
            </div>
            <div className="summary-row">
              <span className="label">Price in AED</span>
              <span className="value">AED {selectedService.priceAED.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="label">Gold Deducted</span>
              <span className="value" style={{ color: '#B8860B', fontWeight: 800 }}>
                ≈ {selectedService.goldEquivalentGrams}g 24K Gold
              </span>
            </div>
            <div className="summary-row total">
              <span className="label">Delivery Method</span>
              <span className="value">Instant In-App & Email Code</span>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <button className="btn btn-secondary" onClick={() => setSelectedService(null)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={() => handleBuyLifestyle(selectedService)}>
                Confirm with Gold
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsScreen;

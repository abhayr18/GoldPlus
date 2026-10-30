// ============================================
// OGold Wallet — Rewards & Lifestyle Super App Screen
// Daily Spin & Win, XP Tiers, eSIMs & Gift Cards
// App Store: id6504926022
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
  { label: '+10mg Gold', type: 'gold' as const, value: 10, color: '#F59E0B' },
  { label: '+50mg Silver', type: 'silver' as const, value: 50, color: '#94A3B8' },
  { label: '100 XP', type: 'xp' as const, value: 100, color: '#6366F1' },
  { label: '+25mg Gold', type: 'gold' as const, value: 25, color: '#FBBF24' },
  { label: '+100mg Silver', type: 'silver' as const, value: 100, color: '#CBD5E1' },
  { label: '250 XP', type: 'xp' as const, value: 250, color: '#8B5CF6' },
  { label: '+50mg Gold', type: 'gold' as const, value: 50, color: '#D97706' },
  { label: '1g Silver Jackpot', type: 'silver' as const, value: 1000, color: '#E2E8F0' },
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
    // Pick winning segment (e.g. index 3: +25mg Gold)
    const winningIndex = 3;
    const segmentAngle = 360 / WHEEL_SEGMENTS.length;
    // 5 full rotations + landing on segment
    const randomExtraSpins = 5 * 360;
    const finalAngle = randomExtraSpins + (360 - winningIndex * segmentAngle - segmentAngle / 2);

    setRotationDegree(finalAngle);

    setTimeout(() => {
      setIsSpinning(false);
      const won = WHEEL_SEGMENTS[winningIndex];
      setState(spinWheelAction(state, won.type, won.value));
      showToast(`🎉 Congratulations! You won ${won.label}! Added to your wallet.`, 'success');
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
          <Gift size={18} color="#F59E0B" />
          <span className="screen-header-title">Rewards & Lifestyle</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            padding: '3px 8px',
            borderRadius: 12,
            fontSize: 11,
            fontWeight: 800,
            color: '#FBBF24',
          }}
        >
          <Sparkles size={12} />
          <span>{currentXP} XP</span>
        </div>
      </div>

      <div className="screen-content" style={{ paddingTop: 16 }}>
        {/* ── 1. Daily Spin & Win Game ────────────────────────── */}
        <div className="card-gold-glow" style={{ marginBottom: 16, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: '#0A0D14',
                background: '#FBBF24',
                padding: '2px 8px',
                borderRadius: 4,
                letterSpacing: 0.5,
              }}
            >
              DAILY LUCK
            </span>
            <span style={{ fontSize: 11, color: '#94A3B8' }}>
              {spinsLeft > 0 ? '1 Free Spin Available' : 'Next Spin in 14h 22m'}
            </span>
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF', marginTop: 8 }}>
            Spin & Win Free Gold & Silver
          </h3>
          <p style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 2 }}>
            Spin daily to earn free bullion milligrams, bonus XP, and exclusive perks
          </p>

          {/* Interactive Wheel Graphic */}
          <div className="spin-wheel-container">
            <div className="spin-pointer" />
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'conic-gradient(#1E293B 0deg 45deg, #161D2D 45deg 90deg, #1E293B 90deg 135deg, #161D2D 135deg 180deg, #1E293B 180deg 225deg, #161D2D 225deg 270deg, #1E293B 270deg 315deg, #161D2D 315deg 360deg)',
                transform: `rotate(${rotationDegree}deg)`,
                transition: isSpinning ? 'transform 3.8s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none',
                position: 'relative',
                overflow: 'hidden',
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
              }}
            >
              {isSpinning ? 'SPINNING' : spinsLeft > 0 ? 'SPIN' : 'CLAIMED'}
            </button>
          </div>

          <button
            className="btn btn-primary"
            disabled={spinsLeft <= 0 || isSpinning}
            onClick={handleSpin}
            style={{ height: 42, fontSize: 13 }}
          >
            {spinsLeft > 0 ? '🎡 Tap to Spin Wheel' : '✓ Daily Spin Used — Come Back Tomorrow'}
          </button>
        </div>

        {/* ── 2. VIP Tier & XP Progress ──────────────────────── */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Award size={18} color="#FBBF24" />
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF' }}>
                  {user?.tier || 'Gold'} Member Tier
                </div>
                <div style={{ fontSize: 10.5, color: '#94A3B8' }}>
                  Enjoy 0% making charges on 100g bars & higher card limits
                </div>
              </div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#FBBF24' }}>
              {currentXP} / {nextTierXP} XP
            </span>
          </div>

          <div
            style={{
              width: '100%',
              height: 6,
              background: '#1E293B',
              borderRadius: 3,
              overflow: 'hidden',
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #F59E0B, #FBBF24)',
                borderRadius: 3,
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#64748B' }}>
            <span>Gold Tier</span>
            <span>Platinum VIP (5,000 XP)</span>
          </div>
        </div>

        {/* ── 3. Lifestyle Services Marketplace ────────────────── */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 800, color: '#FFFFFF' }}>
                Lifestyle Super App Services
              </div>
              <div style={{ fontSize: 11, color: '#94A3B8' }}>
                Purchase global travel eSIMs and gift cards directly with gold
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            {(['all', 'esim', 'giftcard'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: 'none',
                  background: selectedCategory === cat ? '#F59E0B' : '#161D2D',
                  color: selectedCategory === cat ? '#0A0D14' : '#94A3B8',
                  fontSize: 11.5,
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
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
                      background: service.category === 'esim' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: service.category === 'esim' ? '#60A5FA' : '#FBBF24',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {service.category === 'esim' ? <Wifi size={20} /> : <ShoppingBag size={20} />}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>
                        {service.title}
                      </span>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 800,
                          padding: '1px 5px',
                          borderRadius: 4,
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#10B981',
                        }}
                      >
                        {service.tag}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>
                      {service.provider}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#FBBF24' }}>
                    AED {service.priceAED}
                  </div>
                  <div style={{ fontSize: 10, color: '#64748B' }}>
                    ≈ {service.goldEquivalentGrams}g 24K
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. Refer & Earn Free Gold ───────────────────────── */}
        <div
          className="card"
          style={{
            background: 'linear-gradient(135deg, #1E1B15 0%, #161D2D 100%)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF' }}>
              Gift & Refer in UAE
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>
              Get +50mg pure gold for every friend who joins & vaults on OGold
            </div>
          </div>
          <button
            onClick={() => showToast('Referral link copied to clipboard: https://ogold.app/r/tariq', 'success')}
            style={{
              background: '#F59E0B',
              color: '#0A0D14',
              border: 'none',
              padding: '8px 14px',
              borderRadius: 8,
              fontSize: 11.5,
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Share2 size={13} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* ── Buy Lifestyle Modal ──────────────────────────────── */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
              Confirm Redemption
            </h3>
            <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 14 }}>
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
              <span className="value" style={{ color: '#FBBF24' }}>
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

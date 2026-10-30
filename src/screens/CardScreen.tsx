// ============================================
// OGold Wallet — OGold Platinum Mastercard Hub
// Spend your Gold & Silver anywhere globally
// App Store: id6504926022 Signature Feature
// ============================================

import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  CreditCard,
  Wifi,
  Eye,
  EyeOff,
  Sliders,
  Globe,
  Truck,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { OGoldMark } from '../components/BrandLogo';
import { DEMO_GOLD_RATE, DEMO_SILVER_RATE } from '../constants';
import {
  toggleCardFreeze,
  toggleCardOnline,
  setCardSpendingLimit,
  switchCardAsset,
  addCardToAppleWallet,
  spendWithCardAction,
} from '../state/appState';
import type { MetalType } from '../types';

export const CardScreen: React.FC = () => {
  const { state, setState, showToast } = useApp();
  const { card, holdings } = state;

  const [showCvv, setShowCvv] = useState(false);
  const [sliderLimit, setSliderLimit] = useState(card.spendingLimitMonthly);
  const [isSimulating, setIsSimulating] = useState(false);

  const activeRate = card.spendingAsset === 'gold' ? DEMO_GOLD_RATE : DEMO_SILVER_RATE;
  const activeBalanceGrams = card.spendingAsset === 'gold' ? holdings.totalGrams : holdings.silverGrams;
  const activeBalanceAED = activeBalanceGrams * activeRate;

  // Toggle Freeze
  const handleToggleFreeze = () => {
    setState(toggleCardFreeze(state));
    showToast(
      card.isFrozen ? 'Card has been unfrozen and is ready for use.' : 'Card frozen. Transactions blocked.',
      card.isFrozen ? 'success' : 'info'
    );
  };

  // Toggle Online Payments
  const handleToggleOnline = () => {
    setState(toggleCardOnline(state));
    showToast(`Online transactions ${card.isOnlineEnabled ? 'disabled' : 'enabled'}.`, 'info');
  };

  // Switch Asset
  const handleSwitchAsset = (asset: MetalType) => {
    setState(switchCardAsset(state, asset));
    showToast(`Mastercard spending switched to ${asset === 'gold' ? '24K Gold' : '.999 Silver'}.`, 'success');
  };

  // Add to Apple Wallet
  const handleAppleWallet = () => {
    setState(addCardToAppleWallet(state));
    showToast('OGold Mastercard added to Apple Wallet! ✨', 'success');
  };

  // Save Limit
  const handleSaveLimit = () => {
    setState(setCardSpendingLimit(state, sliderLimit));
    showToast(`Monthly spending limit updated to AED ${sliderLimit.toLocaleString()}`, 'success');
  };

  // Simulate Instant Spend (e.g. Dubai Mall)
  const handleSimulateSpend = (amount: number, merchant: string) => {
    if (card.isFrozen) {
      showToast('Cannot spend: OGold Mastercard is currently frozen.', 'error');
      return;
    }
    const neededGrams = amount / activeRate;
    if (activeBalanceGrams < neededGrams) {
      showToast(`Insufficient ${card.spendingAsset} balance for this transaction.`, 'error');
      return;
    }

    setIsSimulating(true);
    setTimeout(() => {
      setState(spendWithCardAction(state, amount, merchant));
      setIsSimulating(false);
      showToast(
        `Spent AED ${amount.toFixed(2)} at ${merchant}! Liquidated ${(amount / activeRate).toFixed(4)}g ${card.spendingAsset}.`,
        'success'
      );
    }, 600);
  };

  return (
    <div className="screen-container">
      {/* ── Top Header ─────────────────────────────────────── */}
      <div className="screen-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CreditCard size={18} color="#F59E0B" />
          <span className="screen-header-title">OGold Mastercard</span>
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 800,
            background: 'rgba(245, 158, 11, 0.15)',
            color: '#F59E0B',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            padding: '2px 8px',
            borderRadius: 6,
            textTransform: 'uppercase',
          }}
        >
          Platinum Prepaid
        </span>
      </div>

      <div className="screen-content" style={{ paddingTop: 16 }}>
        {/* ── 1. The OGold Luxury Metallic Mastercard ────────── */}
        <div className="ogold-card-container">
          <div
            className="ogold-mastercard"
            style={{
              filter: card.isFrozen ? 'grayscale(0.85) contrast(0.9)' : 'none',
              transition: 'filter 0.3s ease',
            }}
          >
            {/* Frozen Overlay Badge */}
            {card.isFrozen && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(10, 13, 20, 0.75)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  zIndex: 20,
                  borderRadius: 18,
                }}
              >
                <Lock size={22} color="#EF4444" />
                <span style={{ fontSize: 16, fontWeight: 800, color: '#EF4444', letterSpacing: 1 }}>
                  CARD TEMPORARILY FROZEN
                </span>
              </div>
            )}

            {/* Card Top Row: Brand & Contactless */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <OGoldMark size={24} />
                <span style={{ fontSize: 14, fontWeight: 900, color: '#F59E0B', letterSpacing: 0.5 }}>
                  OGOLD
                </span>
                <span style={{ fontSize: 9.5, fontWeight: 700, color: '#94A3B8', letterSpacing: 1 }}>
                  PLATINUM
                </span>
              </div>
              <Wifi size={20} color="#E5C05B" style={{ transform: 'rotate(90deg)' }} />
            </div>

            {/* Chip & Source Asset Indicator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 5 }}>
              <div className="mastercard-chip" />
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: 6,
                  background: card.spendingAsset === 'gold' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(148, 163, 184, 0.2)',
                  color: card.spendingAsset === 'gold' ? '#FBBF24' : '#E2E8F0',
                  border: `1px solid ${card.spendingAsset === 'gold' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(148, 163, 184, 0.4)'}`,
                  letterSpacing: 0.5,
                }}
              >
                PAYING WITH {card.spendingAsset === 'gold' ? '24K GOLD' : '.999 SILVER'}
              </div>
            </div>

            {/* Card Number */}
            <div style={{ zIndex: 5 }}>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: 19,
                  fontWeight: 700,
                  letterSpacing: 2.5,
                  color: '#FFFFFF',
                  textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                }}
              >
                5412 &nbsp; 8899 &nbsp; 3421 &nbsp; 9081
              </div>
            </div>

            {/* Bottom Row: Holder, Expiry, CVV & Mastercard Circles */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 5 }}>
              <div>
                <div style={{ fontSize: 8.5, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  Cardholder
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', letterSpacing: 0.8, marginTop: 1 }}>
                  {card.cardHolder}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 8.5, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                    Expires
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF' }}>{card.expiry}</div>
                </div>

                <div>
                  <div style={{ fontSize: 8.5, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                    CVV
                  </div>
                  <div
                    onClick={() => setShowCvv(!showCvv)}
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#F59E0B',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                    }}
                  >
                    <span>{showCvv ? card.cvv : '•••'}</span>
                    {showCvv ? <EyeOff size={11} /> : <Eye size={11} />}
                  </div>
                </div>
              </div>

              <div className="mastercard-circles">
                <div className="mastercard-circle-red" />
                <div className="mastercard-circle-yellow" />
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. Add to Apple Wallet Button ───────────────────── */}
        <div style={{ marginBottom: 16 }}>
          <button
            className="apple-wallet-btn"
            style={{ width: '100%' }}
            onClick={handleAppleWallet}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.74 1.02-1.77.91-2.8-.88.04-1.95.59-2.58 1.33-.56.64-1.05 1.69-.92 2.7.98.08 1.98-.49 2.59-1.23z" />
            </svg>
            <span>
              {card.appleWalletAdded ? '✓ Added to Apple Wallet' : 'Add to Apple Wallet'}
            </span>
          </button>
        </div>

        {/* ── 3. Spending Asset Switcher (Spend Gold or Silver) ── */}
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Primary Spending Metal</div>
              <div style={{ fontSize: 11, color: '#94A3B8' }}>
                Auto-converted into fiat AED in real-time upon point-of-sale tap
              </div>
            </div>
            <Sparkles size={16} color="#F59E0B" />
          </div>

          <div className="metal-toggle-bar">
            <button
              className={`metal-toggle-btn ${card.spendingAsset === 'gold' ? 'active gold' : ''}`}
              onClick={() => handleSwitchAsset('gold')}
            >
              <span>24K Gold ({holdings.totalGrams.toFixed(2)}g)</span>
            </button>
            <button
              className={`metal-toggle-btn ${card.spendingAsset === 'silver' ? 'active silver' : ''}`}
              onClick={() => handleSwitchAsset('silver')}
            >
              <span>.999 Silver ({holdings.silverGrams.toFixed(1)}g)</span>
            </button>
          </div>

          <div
            style={{
              padding: '10px 12px',
              borderRadius: 8,
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 11.5,
            }}
          >
            <span style={{ color: '#94A3B8' }}>Available Spending Power:</span>
            <span style={{ color: '#FBBF24', fontWeight: 800 }}>
              AED {activeBalanceAED.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* ── 4. Security & Controls ───────────────────────────── */}
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', marginBottom: 12 }}>
            Security & Controls
          </div>

          {/* Freeze / Unfreeze Switch */}
          <div
            onClick={handleToggleFreeze}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: card.isFrozen ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                  color: card.isFrozen ? '#EF4444' : '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {card.isFrozen ? <Lock size={17} /> : <Unlock size={17} />}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>
                  {card.isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
                </div>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>
                  {card.isFrozen ? 'Tap to reactivate transactions' : 'Instantly block all card transactions'}
                </div>
              </div>
            </div>

            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: card.isFrozen ? '#EF4444' : '#10B981',
                padding: '3px 8px',
                borderRadius: 6,
                background: card.isFrozen ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)',
              }}
            >
              {card.isFrozen ? 'FROZEN' : 'ACTIVE'}
            </span>
          </div>

          {/* Online Payments Toggle */}
          <div
            onClick={handleToggleOnline}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: 'rgba(245, 158, 11, 0.12)',
                  color: '#F59E0B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Globe size={17} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Online Purchases</div>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>Allow e-commerce and app payments</div>
              </div>
            </div>

            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: card.isOnlineEnabled ? '#10B981' : '#64748B',
              }}
            >
              {card.isOnlineEnabled ? 'ENABLED' : 'DISABLED'}
            </span>
          </div>

          {/* Monthly Limit Slider */}
          <div style={{ paddingTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sliders size={15} color="#F59E0B" />
                <span style={{ fontSize: 12.5, fontWeight: 700, color: '#FFFFFF' }}>Monthly Spending Limit</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#FBBF24' }}>
                AED {sliderLimit.toLocaleString()}
              </span>
            </div>

            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={sliderLimit}
              onChange={(e) => setSliderLimit(Number(e.target.value))}
              onMouseUp={handleSaveLimit}
              onTouchEnd={handleSaveLimit}
              style={{
                width: '100%',
                accentColor: '#F59E0B',
                cursor: 'pointer',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#64748B', marginTop: 2 }}>
              <span>AED 1,000</span>
              <span>AED 50,000</span>
            </div>
          </div>
        </div>

        {/* ── 5. Physical Card Status & Tracking ─────────────── */}
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Truck size={17} color="#10B981" />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Physical Metal Card</span>
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                padding: '2px 7px',
                borderRadius: 5,
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
              }}
            >
              SHIPPED
            </span>
          </div>
          <div style={{ fontSize: 11.5, color: '#94A3B8', lineHeight: 1.4 }}>
            Your heavyweight physical metal card is dispatched via Transguard Armoured Courier.
            Expected delivery: Tomorrow by 2:00 PM.
          </div>
        </div>

        {/* ── 6. Live POS Spend Simulator (Interactive Test) ─── */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1C243A 0%, #101522 100%)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: 14,
            padding: '14px 16px',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <ShoppingBag size={16} color="#F59E0B" />
            <span style={{ fontSize: 12.5, fontWeight: 700, color: '#FFFFFF' }}>
              Test Spend at Real-World Merchant
            </span>
          </div>
          <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 10 }}>
            Simulate an instant point-of-sale checkout at Dubai Mall Starbucks (AED 28.50)
          </div>

          <button
            className="btn btn-secondary"
            disabled={isSimulating || card.isFrozen}
            onClick={() => handleSimulateSpend(28.50, 'Dubai Mall Starbucks')}
            style={{
              padding: '10px 14px',
              fontSize: 12.5,
              fontWeight: 700,
              gap: 6,
              background: '#0F1624',
            }}
          >
            {isSimulating ? (
              <span>Authorizing via Mastercard POS...</span>
            ) : (
              <>
                <span>💳 Tap to Pay AED 28.50 (Starbucks Coffee)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardScreen;

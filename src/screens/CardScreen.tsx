// ============================================
// YASS Gold - Platinum Bullion Card Hub
// Spend your physical vaulted gold globally
// A Product by YASS Group, Dubai
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
import { BrandLogo } from '../components/BrandLogo';
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
    showToast(`Card spending switched to ${asset === 'gold' ? '24K Gold' : '.999 Silver'}.`, 'success');
  };

  // Add to Apple Wallet
  const handleAppleWallet = () => {
    setState(addCardToAppleWallet(state));
    showToast('YASS Gold Card added to Apple Wallet! ✨', 'success');
  };

  // Save Limit
  const handleSaveLimit = () => {
    setState(setCardSpendingLimit(state, sliderLimit));
    showToast(`Monthly spending limit updated to AED ${sliderLimit.toLocaleString()}`, 'success');
  };

  // Simulate Instant Spend (e.g. Dubai Mall)
  const handleSimulateSpend = (amount: number, merchant: string) => {
    if (card.isFrozen) {
      showToast('Cannot spend: YASS Gold Card is currently frozen.', 'error');
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
          <CreditCard size={18} color="#C59B27" />
          <span className="screen-header-title">YASS Bullion Card</span>
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 800,
            background: '#FEFBF2',
            color: '#B8860B',
            border: '1px solid #EED8A1',
            padding: '3px 8px',
            borderRadius: 6,
            textTransform: 'uppercase',
          }}
        >
          Platinum Prepaid
        </span>
      </div>

      <div className="screen-content" style={{ paddingTop: 16 }}>
        {/* ── 1. The Luxury Metallic Card ────────── */}
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
                  background: 'rgba(15, 23, 42, 0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  zIndex: 20,
                  borderRadius: 18,
                }}
              >
                <Lock size={22} color="#EF4444" />
                <span style={{ fontSize: 15, fontWeight: 800, color: '#EF4444', letterSpacing: 1 }}>
                  CARD TEMPORARILY FROZEN
                </span>
              </div>
            )}

            {/* Card Top Row: Brand & Contactless */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BrandLogo size="sm" />
                <span style={{ fontSize: 9.5, fontWeight: 800, color: '#E2E8F0', letterSpacing: 1 }}>
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
                  background: card.spendingAsset === 'gold' ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  border: `1px solid rgba(255, 255, 255, 0.3)`,
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
                  fontSize: 18,
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
                <div style={{ fontSize: 8.5, color: '#E2E8F0', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  Cardholder
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', letterSpacing: 0.8, marginTop: 1 }}>
                  {card.cardHolder}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 8.5, color: '#E2E8F0', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                    Expires
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF' }}>{card.expiry}</div>
                </div>

                <div>
                  <div style={{ fontSize: 8.5, color: '#E2E8F0', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                    CVV
                  </div>
                  <div
                    onClick={() => setShowCvv(!showCvv)}
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#FBBF24',
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
              <div style={{ fontSize: 13.5, fontWeight: 800, color: '#0F172A' }}>Primary Spending Bullion</div>
              <div style={{ fontSize: 11, color: '#64748B' }}>
                Auto-converted into fiat AED in real-time upon point-of-sale tap
              </div>
            </div>
            <Sparkles size={16} color="#C59B27" />
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
              background: '#FEFBF2',
              border: '1px solid #F3E8C8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 12,
            }}
          >
            <span style={{ color: '#64748B', fontWeight: 600 }}>Available Spending Power:</span>
            <span style={{ color: '#B8860B', fontWeight: 900 }}>
              AED {activeBalanceAED.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* ── 4. Security & Controls ───────────────────────────── */}
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>
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
              borderBottom: '1px solid #F1F5F9',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: card.isFrozen ? '#FEF2F2' : '#ECFDF5',
                  color: card.isFrozen ? '#EF4444' : '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {card.isFrozen ? <Lock size={17} /> : <Unlock size={17} />}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
                  {card.isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
                </div>
                <div style={{ fontSize: 11, color: '#64748B' }}>
                  {card.isFrozen ? 'Tap to reactivate transactions' : 'Instantly block all card transactions'}
                </div>
              </div>
            </div>

            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: card.isFrozen ? '#DC2626' : '#059669',
                padding: '3px 8px',
                borderRadius: 6,
                background: card.isFrozen ? '#FEE2E2' : '#D1FAE5',
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
              borderBottom: '1px solid #F1F5F9',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: '#FEFBF2',
                  color: '#C59B27',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Globe size={17} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Online Purchases</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>Allow e-commerce and app payments</div>
              </div>
            </div>

            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: card.isOnlineEnabled ? '#059669' : '#64748B',
                padding: '3px 8px',
                borderRadius: 6,
                background: card.isOnlineEnabled ? '#D1FAE5' : '#F1F5F9',
              }}
            >
              {card.isOnlineEnabled ? 'ENABLED' : 'DISABLED'}
            </span>
          </div>

          {/* Monthly Limit Slider */}
          <div style={{ paddingTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sliders size={15} color="#C59B27" />
                <span style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A' }}>Monthly Spending Limit</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#B8860B' }}>
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
                accentColor: '#C59B27',
                cursor: 'pointer',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: '#64748B', marginTop: 2 }}>
              <span>AED 1,000</span>
              <span>AED 50,000</span>
            </div>
          </div>
        </div>

        {/* ── 5. Physical Card Status & Tracking ─────────────── */}
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Truck size={17} color="#059669" />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Physical Metal Card</span>
            </div>
            <span
              style={{
                fontSize: 10.5,
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: 6,
                background: '#D1FAE5',
                color: '#059669',
              }}
            >
              SHIPPED
            </span>
          </div>
          <div style={{ fontSize: 11.5, color: '#64748B', lineHeight: 1.4 }}>
            Your custom engraved metal card is dispatched via Transguard Armoured Courier.
            Expected doorstep delivery: Tomorrow by 2:00 PM across UAE.
          </div>
        </div>

        {/* ── 6. Live POS Spend Simulator (Interactive Test) ─── */}
        <div
          style={{
            background: '#FEFBF2',
            border: '1px solid #EED8A1',
            borderRadius: 14,
            padding: '14px 16px',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <ShoppingBag size={16} color="#C59B27" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>
              Test Real-World Merchant Checkout
            </span>
          </div>
          <div style={{ fontSize: 11.5, color: '#64748B', marginBottom: 10 }}>
            Simulate an instant point-of-sale tap at Dubai Mall Starbucks (AED 28.50)
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
              background: '#FFFFFF',
              borderColor: '#E2E8F0',
              color: '#0F172A',
            }}
          >
            {isSimulating ? (
              <span>Authorizing via Visa / Mastercard POS...</span>
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

// ============================================
// OGold Wallet — Physical Bullion Redemption & Delivery
// 24K Gold & .999 Silver Minted Coins & Bars
// App Store: id6504926022
// ============================================

import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { createDeliveryOrder } from '../state/appState';
import { DELIVERY_PRODUCTS } from '../constants';
import type { DeliveryAddress, MetalType } from '../types';

type FlowState = 'catalog' | 'address' | 'review' | 'success' | 'orders';
type Category = 'coins' | 'bars';

interface ProductItem {
  weight: number;
  metal: MetalType;
  purity: string;
  type: 'coin' | 'bar';
  makingCharges: number;
  deliveryCharges: number;
}

const formatCurrency = (val: number): string =>
  'AED ' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const PhysicalDeliveryScreen: React.FC = () => {
  const { state, setState, navigate, showToast } = useApp();

  const [flowState, setFlowState] = useState<FlowState>(
    state.deliveryOrders.length > 0 ? 'orders' : 'catalog'
  );
  const [category, setCategory] = useState<Category>('coins');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(
    DELIVERY_PRODUCTS.coins[0]
  );

  // Address form (Dubai / UAE default)
  const [address, setAddress] = useState<DeliveryAddress>({
    recipientName: state.user?.fullName || 'Tariq Al Mansoori',
    mobile: state.user?.mobile || '501234567',
    addressLine1: 'Apartment 1804, Burj Crown',
    addressLine2: 'Sheikh Mohammed bin Rashid Blvd, Downtown Dubai',
    city: 'Dubai',
    state: 'Dubai (UAE)',
    pinCode: 'PO Box 12345',
  });

  const availableGrams =
    selectedProduct.metal === 'gold' ? state.holdings.totalGrams : state.holdings.silverGrams;
  const isBalanceSufficient = availableGrams >= selectedProduct.weight;
  const totalCharges = selectedProduct.makingCharges + selectedProduct.deliveryCharges;

  const isAddressValid =
    address.recipientName.trim().length > 0 &&
    address.mobile.trim().length >= 9 &&
    address.addressLine1.trim().length > 0 &&
    address.city.trim().length > 0;

  const handleConfirmOrder = () => {
    if (!isBalanceSufficient) {
      showToast('Insufficient precious metal balance for this bullion product', 'error');
      return;
    }

    const newState = createDeliveryOrder(
      state,
      selectedProduct.type,
      selectedProduct.weight,
      selectedProduct.purity,
      selectedProduct.makingCharges,
      selectedProduct.deliveryCharges,
      address,
      selectedProduct.metal
    );

    setState(newState);
    showToast('Delivery order placed successfully! Transguard will dispatch soon.', 'success');
    setFlowState('success');
  };

  // ── CATALOG ────────────────────────────────────────────────
  const renderCatalogState = () => (
    <>
      <div className="screen-header">
        <button
          className="screen-header-back"
          onClick={() => {
            if (state.deliveryOrders.length > 0) setFlowState('orders');
            else navigate('dashboard');
          }}
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Physical Bullion Delivery</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        {state.deliveryOrders.length > 0 && (
          <div style={{ marginBottom: 14, textAlign: 'right' }}>
            <button
              onClick={() => setFlowState('orders')}
              style={{
                background: 'none',
                border: 'none',
                color: '#F59E0B',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Track Orders ({state.deliveryOrders.length})
            </button>
          </div>
        )}

        {/* Available Balances Pill */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            background: '#161D2D',
            borderRadius: 12,
            marginBottom: 16,
            border: '1px solid #1E293B',
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: '#94A3B8' }}>Vaulted Gold: <strong style={{ color: '#FBBF24' }}>{state.holdings.totalGrams.toFixed(2)}g</strong></div>
            <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>Vaulted Silver: <strong style={{ color: '#E2E8F0' }}>{state.holdings.silverGrams.toFixed(1)}g</strong></div>
          </div>
          <span
            style={{
              fontSize: 10,
              padding: '3px 8px',
              borderRadius: 6,
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10B981',
              fontWeight: 800,
            }}
          >
            CERTIFIED ASSAY
          </span>
        </div>

        {/* Category: Coins vs Bars */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          <button
            onClick={() => {
              setCategory('coins');
              setSelectedProduct(DELIVERY_PRODUCTS.coins[0]);
            }}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 8,
              border: 'none',
              background: category === 'coins' ? '#F59E0B' : '#161D2D',
              color: category === 'coins' ? '#0A0D14' : '#94A3B8',
              fontSize: 12.5,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Bullion Coins
          </button>
          <button
            onClick={() => {
              setCategory('bars');
              setSelectedProduct(DELIVERY_PRODUCTS.bars[0]);
            }}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 8,
              border: 'none',
              background: category === 'bars' ? '#F59E0B' : '#161D2D',
              color: category === 'bars' ? '#0A0D14' : '#94A3B8',
              fontSize: 12.5,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Minted Bullion Bars
          </button>
        </div>

        {/* Product List */}
        <div style={{ marginBottom: 20 }}>
          {DELIVERY_PRODUCTS[category].map((prod) => {
            const isSelected =
              selectedProduct.weight === prod.weight &&
              selectedProduct.type === prod.type &&
              selectedProduct.metal === prod.metal;
            const userMetalBalance =
              prod.metal === 'gold' ? state.holdings.totalGrams : state.holdings.silverGrams;
            const canAfford = userMetalBalance >= prod.weight;

            return (
              <div
                key={`${prod.metal}-${prod.type}-${prod.weight}`}
                className={`product-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedProduct(prod)}
                style={{ opacity: canAfford ? 1 : 0.6 }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: prod.type === 'coin' ? '50%' : 8,
                    background:
                      prod.metal === 'gold'
                        ? 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)'
                        : 'linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0A0D14',
                    fontWeight: 900,
                    fontSize: 13,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                    flexShrink: 0,
                  }}
                >
                  {prod.weight}g
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>
                    {prod.weight}g {prod.purity} {prod.metal.toUpperCase()} {prod.type === 'coin' ? 'Coin' : 'Bar'}
                  </div>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>
                    Tamper-proof certicard with QR verification
                  </div>
                  <div style={{ fontSize: 11.5, color: '#FBBF24', fontWeight: 700, marginTop: 4 }}>
                    Minting & Insured Shipping: {formatCurrency(prod.makingCharges + prod.deliveryCharges)}
                  </div>
                </div>

                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? '#F59E0B' : '#64748B'}`,
                    background: isSelected ? '#F59E0B' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isSelected && <Check size={12} color="#0A0D14" strokeWidth={3} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Warning if insufficient balance */}
        {!isBalanceSufficient && (
          <div
            style={{
              display: 'flex',
              gap: 8,
              padding: '10px 12px',
              borderRadius: 10,
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              marginBottom: 16,
              alignItems: 'center',
            }}
          >
            <AlertCircle size={16} color="#EF4444" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: 11.5, color: '#EF4444' }}>
              You need {selectedProduct.weight}g {selectedProduct.metal}. Your vault holds {availableGrams.toFixed(2)}g.
            </div>
          </div>
        )}

        <button
          className="btn btn-primary"
          disabled={!isBalanceSufficient}
          onClick={() => setFlowState('address')}
          style={{ height: 46, fontSize: 14 }}
        >
          Proceed to Delivery Destination
        </button>
      </div>
    </>
  );

  // ── ADDRESS ────────────────────────────────────────────────
  const renderAddressState = () => (
    <>
      <div className="screen-header">
        <button className="screen-header-back" onClick={() => setFlowState('catalog')} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Delivery Address</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        <div className="form-group">
          <label className="form-label">Recipient Full Name</label>
          <input
            className="form-input"
            value={address.recipientName}
            onChange={(e) => setAddress({ ...address, recipientName: e.target.value })}
            placeholder="Recipient's Name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Mobile Number</label>
          <div className="form-input-prefix">
            <span className="prefix">+971</span>
            <input
              type="tel"
              value={address.mobile}
              onChange={(e) => setAddress({ ...address, mobile: e.target.value.replace(/\D/g, '') })}
              placeholder="50 123 4567"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Address Line (Building, Apt, Villa)</label>
          <input
            className="form-input"
            value={address.addressLine1}
            onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
            placeholder="Burj Crown, Apt 1804"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Street / Landmark</label>
          <input
            className="form-input"
            value={address.addressLine2 || ''}
            onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
            placeholder="Downtown Dubai"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="form-group">
            <label className="form-label">City</label>
            <input
              className="form-input"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              placeholder="Dubai"
            />
          </div>
          <div className="form-group">
            <label className="form-label">PO Box / Area Code</label>
            <input
              className="form-input"
              value={address.pinCode}
              onChange={(e) => setAddress({ ...address, pinCode: e.target.value })}
              placeholder="PO Box 12345"
            />
          </div>
        </div>

        <button
          className="btn btn-primary"
          disabled={!isAddressValid}
          onClick={() => setFlowState('review')}
          style={{ height: 46, fontSize: 14 }}
        >
          Review Bullion Order
        </button>
      </div>
    </>
  );

  // ── REVIEW ─────────────────────────────────────────────────
  const renderReviewState = () => (
    <>
      <div className="screen-header">
        <button className="screen-header-back" onClick={() => setFlowState('address')} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Review Delivery Order</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#94A3B8' }}>Selected Bullion</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
            {selectedProduct.weight}g {selectedProduct.purity} {selectedProduct.metal.toUpperCase()} {selectedProduct.type === 'coin' ? 'Coin' : 'Bar'}
          </div>

          <div style={{ height: 1, background: '#1E293B', margin: '14px 0' }} />

          <div className="summary-row">
            <span className="label">Vault Deduction</span>
            <span className="value" style={{ color: '#EF4444' }}>
              -{selectedProduct.weight}.0000 g {selectedProduct.metal}
            </span>
          </div>
          <div className="summary-row">
            <span className="label">Assay Minting Charges</span>
            <span className="value">{formatCurrency(selectedProduct.makingCharges)}</span>
          </div>
          <div className="summary-row">
            <span className="label">Insured Transguard Courier</span>
            <span className="value">{formatCurrency(selectedProduct.deliveryCharges)}</span>
          </div>
          <div className="summary-row total">
            <span className="label">Payable Charges</span>
            <span className="value">{formatCurrency(totalCharges)}</span>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <MapPin size={16} color="#F59E0B" />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Destination</span>
          </div>
          <div style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.4 }}>
            {address.recipientName} ({address.mobile})<br />
            {address.addressLine1}, {address.city} — {address.pinCode}
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleConfirmOrder} style={{ height: 46, fontSize: 14 }}>
          Confirm & Dispatch Bullion
        </button>
      </div>
    </>
  );

  // ── SUCCESS ────────────────────────────────────────────────
  const renderSuccessState = () => (
    <div style={{ textAlign: 'center', padding: '40px 16px' }}>
      <div
        style={{
          width: 68,
          height: 68,
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '2px solid #10B981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#10B981',
          margin: '0 auto 16px',
        }}
      >
        <Check size={36} strokeWidth={3} />
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 900, color: '#FFFFFF', marginBottom: 6 }}>
        Delivery Order Placed!
      </h2>
      <p style={{ fontSize: 13, color: '#94A3B8', maxWidth: 300, margin: '0 auto 20px', lineHeight: 1.5 }}>
        Your certified bullion will be packaged in a sealed tamper-proof assay certicard and dispatched via Transguard.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 280, margin: '0 auto' }}>
        <button className="btn btn-primary" onClick={() => setFlowState('orders')}>
          Track Courier Status
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('dashboard')}>
          Back to Wallet
        </button>
      </div>
    </div>
  );

  // ── ORDERS LIST ────────────────────────────────────────────
  const renderOrdersState = () => (
    <>
      <div className="screen-header">
        <button className="screen-header-back" onClick={() => navigate('dashboard')} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Bullion Shipments</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 12, color: '#94A3B8' }}>
            Active Orders ({state.deliveryOrders.length})
          </span>
          <button
            onClick={() => setFlowState('catalog')}
            style={{
              background: 'none',
              border: 'none',
              color: '#F59E0B',
              fontSize: 12.5,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            + Order More
          </button>
        </div>

        {state.deliveryOrders.map((ord) => (
          <div key={ord.id} className="card" style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#FFFFFF' }}>
                  {ord.weight}g {ord.purity} {ord.metal.toUpperCase()} {ord.productType === 'coin' ? 'Coin' : 'Bar'}
                </div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                  Order: {ord.id} • {new Date(ord.createdAt).toLocaleDateString('en-AE')}
                </div>
              </div>
              <span className={`status-badge ${ord.status}`}>{ord.status}</span>
            </div>

            <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 10 }}>
              Courier: Transguard Armoured Bullion Logistics<br />
              Delivering to: {ord.address.city}, UAE (Est. {ord.estimatedDelivery})
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="screen-container">
      {flowState === 'catalog' && renderCatalogState()}
      {flowState === 'address' && renderAddressState()}
      {flowState === 'review' && renderReviewState()}
      {flowState === 'success' && renderSuccessState()}
      {flowState === 'orders' && renderOrdersState()}
    </div>
  );
};

export default PhysicalDeliveryScreen;

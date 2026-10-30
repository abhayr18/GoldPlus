// ============================================
// GoldPlus — Physical Gold Delivery Screen
// Flow states: 'catalog' | 'address' | 'review' | 'success' | 'orders'
// A product by Urbanspire Group
// ============================================

import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  Truck,
  Shield,
  MapPin,
  Package,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { createDeliveryOrder } from '../state/appState';
import { DELIVERY_PRODUCTS, DEMO_GOLD_RATE, COLORS } from '../constants';
import type { DeliveryAddress } from '../types';

type FlowState = 'catalog' | 'address' | 'review' | 'success' | 'orders';
type Category = 'coins' | 'bars';

interface ProductItem {
  weight: number;
  purity: string;
  type: 'coin' | 'bar';
  makingCharges: number;
  deliveryCharges: number;
}

const formatCurrency = (val: number): string =>
  '₹' + Math.round(val).toLocaleString('en-IN');

const PhysicalDeliveryScreen: React.FC = () => {
  const { state, setState, navigate, showToast } = useApp();

  const [flowState, setFlowState] = useState<FlowState>(
    state.deliveryOrders.length > 0 ? 'orders' : 'catalog'
  );
  const [category, setCategory] = useState<Category>('coins');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(
    DELIVERY_PRODUCTS.coins[0]
  );

  // Address form
  const [address, setAddress] = useState<DeliveryAddress>({
    recipientName: state.user?.fullName || 'Rahul Sharma',
    mobile: state.user?.mobile || '9876543210',
    addressLine1: 'Flat 402, Sunshine Heights, MG Road',
    addressLine2: 'Near Central Mall',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400001',
  });

  const availableGrams = state.holdings.totalGrams;
  const isBalanceSufficient = availableGrams >= selectedProduct.weight;

  const totalCharges = selectedProduct.makingCharges + selectedProduct.deliveryCharges;

  // Address validation
  const isAddressValid =
    address.recipientName.trim().length > 0 &&
    address.mobile.trim().length === 10 &&
    address.addressLine1.trim().length > 0 &&
    address.city.trim().length > 0 &&
    address.state.trim().length > 0 &&
    address.pinCode.trim().length === 6;

  const handleConfirmOrder = () => {
    if (!isBalanceSufficient) {
      showToast('Insufficient gold balance for this product', 'error');
      return;
    }

    const newState = createDeliveryOrder(
      state,
      selectedProduct.type,
      selectedProduct.weight,
      selectedProduct.purity,
      selectedProduct.makingCharges,
      selectedProduct.deliveryCharges,
      address
    );

    setState(newState);
    showToast('Delivery order placed successfully!', 'success');
    setFlowState('success');
  };

  // =============================================
  // CATALOG STATE
  // =============================================
  const renderCatalogState = () => (
    <div className="screen-content">
      {/* Header */}
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
        <div>
          <h2 className="screen-header-title">Physical Delivery</h2>
          <p style={{ fontSize: 13, color: COLORS.secondaryText, marginTop: 2 }}>
            Turn your digital gold into physical 24K bullion
          </p>
        </div>
      </div>

      <div style={{ padding: '0 4px', marginTop: 12 }}>
        {/* Toggle to view existing orders */}
        {state.deliveryOrders.length > 0 && (
          <div style={{ marginBottom: 14, textAlign: 'right' }}>
            <button
              onClick={() => setFlowState('orders')}
              style={{
                background: 'none',
                border: 'none',
                color: COLORS.primaryGold,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              ← Track Existing Orders ({state.deliveryOrders.length})
            </button>
          </div>
        )}

        {/* Available Balance Pill */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            background: COLORS.ivoryBg,
            borderRadius: 12,
            marginBottom: 16,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: COLORS.secondaryText }}>Available in Vault</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.mainText }}>
              {availableGrams.toFixed(4)} g
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span
              style={{
                fontSize: 11,
                padding: '4px 8px',
                borderRadius: 999,
                background: 'rgba(232, 182, 63, 0.15)',
                color: COLORS.primaryGold,
                fontWeight: 600,
              }}
            >
              24K 99.9% Pure
            </span>
          </div>
        </div>

        {/* Category Tabs: Coins vs Bars */}
        <div className="tab-bar" style={{ marginBottom: 16 }}>
          <button
            className={`tab-item ${category === 'coins' ? 'active' : ''}`}
            onClick={() => {
              setCategory('coins');
              setSelectedProduct(DELIVERY_PRODUCTS.coins[0]);
            }}
          >
            Gold Coins
          </button>
          <button
            className={`tab-item ${category === 'bars' ? 'active' : ''}`}
            onClick={() => {
              setCategory('bars');
              setSelectedProduct(DELIVERY_PRODUCTS.bars[0]);
            }}
          >
            Gold Bars
          </button>
        </div>

        {/* Products List */}
        <div style={{ marginBottom: 20 }}>
          {DELIVERY_PRODUCTS[category].map((prod) => {
            const isSelected =
              selectedProduct.weight === prod.weight &&
              selectedProduct.type === prod.type;
            const canAfford = availableGrams >= prod.weight;

            return (
              <div
                key={`${prod.type}-${prod.weight}`}
                className={`product-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedProduct(prod)}
                style={{
                  opacity: canAfford ? 1 : 0.65,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: prod.type === 'coin' ? '50%' : 8,
                    background: 'linear-gradient(135deg, #F4D681 0%, #E8B63F 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 14,
                    boxShadow: '0 2px 6px rgba(232, 182, 63, 0.3)',
                    flexShrink: 0,
                  }}
                >
                  {prod.weight}g
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.mainText }}>
                    {prod.weight}g {prod.purity} Gold {prod.type === 'coin' ? 'Coin' : 'Bar'}
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.secondaryText, marginTop: 2 }}>
                    Tamper-proof certified assay packaging
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.primaryGold, fontWeight: 600, marginTop: 4 }}>
                    Making & Insured Shipping: {formatCurrency(prod.makingCharges + prod.deliveryCharges)}
                  </div>
                </div>

                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? COLORS.primaryGold : COLORS.border}`,
                    background: isSelected ? COLORS.primaryGold : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isSelected && <Check size={14} color="#fff" strokeWidth={3} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Warning if balance insufficient */}
        {!isBalanceSufficient && (
          <div
            style={{
              display: 'flex',
              gap: 10,
              padding: '12px 14px',
              borderRadius: 10,
              background: 'rgba(220, 53, 69, 0.08)',
              marginBottom: 16,
              alignItems: 'center',
            }}
          >
            <AlertCircle size={18} color={COLORS.negative} style={{ flexShrink: 0 }} />
            <div style={{ fontSize: 13, color: COLORS.negative }}>
              You need {selectedProduct.weight}g gold. You currently hold {availableGrams.toFixed(4)}g.
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            padding: '14px',
            background: '#fff',
            borderRadius: 12,
            border: `1px solid ${COLORS.border}`,
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Shield size={18} color={COLORS.positive} />
            <span style={{ fontSize: 12, color: COLORS.mainText, fontWeight: 500 }}>
              100% Insured Delivery
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Truck size={18} color={COLORS.positive} />
            <span style={{ fontSize: 12, color: COLORS.mainText, fontWeight: 500 }}>
              Dispatched in 48 hrs
            </span>
          </div>
        </div>

        {/* Proceed CTA */}
        <button
          className="btn btn-primary"
          disabled={!isBalanceSufficient}
          onClick={() => setFlowState('address')}
        >
          Proceed to Delivery Address
        </button>
      </div>
    </div>
  );

  // =============================================
  // ADDRESS STATE
  // =============================================
  const renderAddressState = () => (
    <div className="screen-content">
      <div className="screen-header">
        <button className="screen-header-back" onClick={() => setFlowState('catalog')} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <h2 className="screen-header-title">Delivery Address</h2>
      </div>

      <div style={{ padding: '0 4px', marginTop: 16 }}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
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
            <span className="prefix">+91</span>
            <input
              type="tel"
              maxLength={10}
              value={address.mobile}
              onChange={(e) => setAddress({ ...address, mobile: e.target.value.replace(/\D/g, '') })}
              placeholder="10-digit mobile number"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Address Line 1 (Flat, House No., Building)</label>
          <input
            className="form-input"
            value={address.addressLine1}
            onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
            placeholder="House / Flat No., Street"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Address Line 2 (Landmark, Area)</label>
          <input
            className="form-input"
            value={address.addressLine2 || ''}
            onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
            placeholder="Optional landmark"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="form-group">
            <label className="form-label">City</label>
            <input
              className="form-input"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              placeholder="City"
            />
          </div>
          <div className="form-group">
            <label className="form-label">PIN Code</label>
            <input
              className="form-input"
              maxLength={6}
              value={address.pinCode}
              onChange={(e) => setAddress({ ...address, pinCode: e.target.value.replace(/\D/g, '') })}
              placeholder="6 digits"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">State</label>
          <input
            className="form-input"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            placeholder="State"
          />
        </div>

        <button
          className="btn btn-primary"
          disabled={!isAddressValid}
          onClick={() => setFlowState('review')}
        >
          Review Order
        </button>
      </div>
    </div>
  );

  // =============================================
  // REVIEW STATE
  // =============================================
  const renderReviewState = () => (
    <div className="screen-content">
      <div className="screen-header">
        <button className="screen-header-back" onClick={() => setFlowState('address')} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <h2 className="screen-header-title">Review Delivery Order</h2>
      </div>

      <div style={{ padding: '0 4px', marginTop: 16 }}>
        {/* Product card */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: COLORS.secondaryText }}>Selected Bullion</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.mainText, marginTop: 4 }}>
            {selectedProduct.weight}g 24K Gold {selectedProduct.type === 'coin' ? 'Coin' : 'Bar'}
          </div>
          <div style={{ fontSize: 12, color: COLORS.secondaryText }}>
            Tamper-proof certified certicard
          </div>

          <div className="divider" />

          <div className="summary-row">
            <span className="label">Gold Deducted from Vault</span>
            <span className="value" style={{ color: COLORS.negative }}>
              -{selectedProduct.weight}.0000 g
            </span>
          </div>
          <div className="summary-row">
            <span className="label">Vault Value Equivalent</span>
            <span className="value">
              {formatCurrency(selectedProduct.weight * DEMO_GOLD_RATE)}
            </span>
          </div>
          <div className="summary-row">
            <span className="label">Making & Minting Charges</span>
            <span className="value">{formatCurrency(selectedProduct.makingCharges)}</span>
          </div>
          <div className="summary-row">
            <span className="label">Insured Logistics</span>
            <span className="value">{formatCurrency(selectedProduct.deliveryCharges)}</span>
          </div>
          <div className="summary-row total">
            <span className="label">Total Charges Payable</span>
            <span className="value">{formatCurrency(totalCharges)}</span>
          </div>
        </div>

        {/* Address Card */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <MapPin size={18} color={COLORS.primaryGold} />
            <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.mainText }}>
              Delivery Destination
            </span>
          </div>
          <div style={{ fontSize: 13, color: COLORS.mainText, lineHeight: 1.5 }}>
            <strong>{address.recipientName}</strong> ({address.mobile})<br />
            {address.addressLine1}, {address.addressLine2 ? `${address.addressLine2}, ` : ''}
            {address.city}, {address.state} — {address.pinCode}
          </div>
        </div>

        <div className="demo-banner">
          DEMO MODE — GOLD WILL BE DEDUCTED FROM DEMO VAULT
        </div>

        <button className="btn btn-primary" onClick={handleConfirmOrder}>
          Confirm & Place Delivery Order
        </button>
      </div>
    </div>
  );

  // =============================================
  // SUCCESS STATE
  // =============================================
  const renderSuccessState = () => (
    <div className="success-screen">
      <div className="success-check">
        <Check size={36} strokeWidth={3} />
      </div>

      <div className="success-title">Order Placed Successfully!</div>
      <div className="success-desc">
        Your physical gold redemption has been registered. Your package will be securely minted and dispatched.
      </div>

      <div className="success-detail">
        {selectedProduct.weight}g 24K Gold
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 280 }}>
        <button className="btn btn-primary" onClick={() => setFlowState('orders')}>
          Track Delivery Status
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('dashboard')}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );

  // =============================================
  // ORDERS / TRACKING STATE
  // =============================================
  const renderOrdersState = () => (
    <div className="screen-content">
      <div className="screen-header">
        <button className="screen-header-back" onClick={() => navigate('dashboard')} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <h2 className="screen-header-title">Delivery Orders</h2>
      </div>

      <div style={{ padding: '0 4px', marginTop: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 13, color: COLORS.secondaryText }}>
            Redemptions ({state.deliveryOrders.length})
          </span>
          <button
            onClick={() => setFlowState('catalog')}
            style={{
              background: 'none',
              border: 'none',
              color: COLORS.primaryGold,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            + Order More Physical Gold
          </button>
        </div>

        {state.deliveryOrders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Package size={32} />
            </div>
            <div className="empty-state-title">No Physical Redemptions Yet</div>
            <div className="empty-state-desc">
              Convert your digital gold into physical 24K coins or bars delivered to your doorstep.
            </div>
            <button
              className="btn btn-primary"
              style={{ marginTop: 20, maxWidth: 220 }}
              onClick={() => setFlowState('catalog')}
            >
              Order Gold Coins
            </button>
          </div>
        ) : (
          state.deliveryOrders.map((ord) => (
            <div
              key={ord.id}
              className="card"
              style={{ marginBottom: 16 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.mainText }}>
                    {ord.weight}g 24K Gold {ord.productType === 'coin' ? 'Coin' : 'Bar'}
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.secondaryText, marginTop: 2 }}>
                    Order ID: {ord.id} • {new Date(ord.createdAt).toLocaleDateString('en-IN')}
                  </div>
                </div>
                <span className={`status-badge ${ord.status}`}>
                  {ord.status}
                </span>
              </div>

              {/* Status Timeline Progress */}
              <div style={{ margin: '14px 0' }}>
                <div className="timeline">
                  <div className="timeline-item completed">
                    <div className="timeline-dot completed" />
                    <div className="timeline-content">
                      <div className="timeline-title">Request Created</div>
                      <div className="timeline-date">{new Date(ord.createdAt).toLocaleDateString('en-IN')}</div>
                    </div>
                  </div>

                  <div className="timeline-item active">
                    <div className="timeline-dot active" />
                    <div className="timeline-content">
                      <div className="timeline-title">Processing & Minting</div>
                      <div className="timeline-date">Certified 24K Assay</div>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-dot" />
                    <div className="timeline-content">
                      <div className="timeline-title">Dispatched with Armoured Courier</div>
                      <div className="timeline-date">Pending tracking generation</div>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-dot" />
                    <div className="timeline-content">
                      <div className="timeline-title">Doorstep Delivery</div>
                      <div className="timeline-date">Est. {ord.estimatedDelivery}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 12, color: COLORS.secondaryText, display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={14} /> Delivering to: {ord.address.city}, {ord.address.pinCode}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
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

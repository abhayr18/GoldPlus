// ============================================
// YASS Gold & Bullion — Physical Bullion Redemption & Delivery
// White + Gold Clean Executive Catalog & Order Tracking
// Core Feature: 24K 999.9 Minted Coins & Bars
// ============================================

import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  Truck,
  Shield,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { createDeliveryOrder } from '../state/appState';
import { DELIVERY_PRODUCTS } from '../constants';
import type { DeliveryAddress, MetalType } from '../types';

type FlowState = 'catalog' | 'address' | 'review' | 'success' | 'orders';
type Category = 'bars' | 'coins';

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

export const PhysicalDeliveryScreen: React.FC = () => {
  const { state, setState, navigate, showToast } = useApp();

  const [flowState, setFlowState] = useState<FlowState>(
    state.deliveryOrders.length > 0 ? 'orders' : 'catalog'
  );
  const [category, setCategory] = useState<Category>('bars');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(
    DELIVERY_PRODUCTS.bars[0]
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

  const availableGrams = state.holdings.totalGrams;
  const isBalanceSufficient = availableGrams >= selectedProduct.weight;
  const totalCharges = selectedProduct.makingCharges + selectedProduct.deliveryCharges;

  const isAddressValid =
    address.recipientName.trim().length > 0 &&
    address.mobile.trim().length >= 9 &&
    address.addressLine1.trim().length > 0 &&
    address.city.trim().length > 0;

  const handleConfirmOrder = () => {
    if (!isBalanceSufficient) {
      showToast('Insufficient gold balance for this bullion product', 'error');
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
    showToast('Delivery order placed! Transguard will dispatch your bullion.', 'success');
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
          <div style={{ marginBottom: 12, textAlign: 'right' }}>
            <button
              onClick={() => setFlowState('orders')}
              style={{
                background: 'none',
                border: 'none',
                color: '#A67C1E',
                fontSize: 12.5,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Track Active Deliveries ({state.deliveryOrders.length})
            </button>
          </div>
        )}

        {/* Available Vault Balance Banner */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            background: '#FEFBF2',
            borderRadius: 12,
            marginBottom: 16,
            border: '1px solid #EED8A1',
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: '#64748B' }}>Available in Vault</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
              {availableGrams.toFixed(4)} g
            </div>
          </div>
          <span
            style={{
              fontSize: 10,
              padding: '3px 8px',
              borderRadius: 6,
              background: '#FFFFFF',
              border: '1px solid #EED8A1',
              color: '#8F6914',
              fontWeight: 800,
            }}
          >
            24K 999.9 FINE GOLD
          </span>
        </div>

        {/* Category Tabs: Bars vs Coins */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          <button
            onClick={() => {
              setCategory('bars');
              setSelectedProduct(DELIVERY_PRODUCTS.bars[0]);
            }}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: 8,
              border: '1px solid',
              borderColor: category === 'bars' ? '#C59B27' : '#E2E8F0',
              background: category === 'bars' ? '#FEFBF2' : '#FFFFFF',
              color: category === 'bars' ? '#8F6914' : '#64748B',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Minted Gold Bars
          </button>
          <button
            onClick={() => {
              setCategory('coins');
              setSelectedProduct(DELIVERY_PRODUCTS.coins[0]);
            }}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: 8,
              border: '1px solid',
              borderColor: category === 'coins' ? '#C59B27' : '#E2E8F0',
              background: category === 'coins' ? '#FEFBF2' : '#FFFFFF',
              color: category === 'coins' ? '#8F6914' : '#64748B',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Gold Coins
          </button>
        </div>

        {/* Product Catalog List */}
        <div style={{ marginBottom: 16 }}>
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
                style={{ opacity: canAfford ? 1 : 0.6 }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: prod.type === 'coin' ? '50%' : 8,
                    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontWeight: 900,
                    fontSize: 13,
                    boxShadow: '0 2px 6px rgba(197, 155, 39, 0.25)',
                    flexShrink: 0,
                  }}
                >
                  {prod.weight}g
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>
                    {prod.weight}g 24K Gold {prod.type === 'coin' ? 'Coin' : 'Minted Bar'}
                  </div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                    Tamper-proof certified assay packaging
                  </div>
                  <div style={{ fontSize: 11.5, color: '#8F6914', fontWeight: 700, marginTop: 4 }}>
                    Minting & Insured Courier: {formatCurrency(prod.makingCharges + prod.deliveryCharges)}
                  </div>
                </div>

                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? '#C59B27' : '#CBD5E1'}`,
                    background: isSelected ? '#C59B27' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isSelected && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Insufficient Balance Notice */}
        {!isBalanceSufficient && (
          <div
            style={{
              display: 'flex',
              gap: 8,
              padding: '10px 12px',
              borderRadius: 10,
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              marginBottom: 16,
              alignItems: 'center',
            }}
          >
            <AlertCircle size={16} color="#DC2626" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: 12, color: '#DC2626' }}>
              You need {selectedProduct.weight}g gold in your vault. Current balance: {availableGrams.toFixed(4)}g.
            </div>
          </div>
        )}

        {/* Security Trust Badges */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            padding: '12px',
            background: '#F8FAFC',
            borderRadius: 10,
            border: '1px solid #E2E8F0',
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: '#0F172A', fontWeight: 600 }}>
            <Shield size={16} color="#059669" />
            <span>100% Insured Delivery</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: '#0F172A', fontWeight: 600 }}>
            <Truck size={16} color="#059669" />
            <span>Dispatched in 48h</span>
          </div>
        </div>

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
          <label className="form-label">Address Line (Flat / Villa / Building)</label>
          <input
            className="form-input"
            value={address.addressLine1}
            onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
            placeholder="Burj Crown, Apt 1804"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Street / Area Landmark</label>
          <input
            className="form-input"
            value={address.addressLine2 || ''}
            onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
            placeholder="Downtown Dubai"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="form-group">
            <label className="form-label">City / Emirate</label>
            <input
              className="form-input"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              placeholder="Dubai"
            />
          </div>
          <div className="form-group">
            <label className="form-label">PO Box</label>
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
        <span className="screen-header-title">Review Bullion Order</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#64748B' }}>Selected Bullion Product</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>
            {selectedProduct.weight}g 24K Gold {selectedProduct.type === 'coin' ? 'Coin' : 'Minted Bar'}
          </div>

          <div style={{ height: 1, background: '#E2E8F0', margin: '14px 0' }} />

          <div className="summary-row">
            <span className="label">Vault Gold Deducted</span>
            <span className="value" style={{ color: '#DC2626' }}>
              -{selectedProduct.weight}.0000 g
            </span>
          </div>
          <div className="summary-row">
            <span className="label">Minting & Assay Certicard</span>
            <span className="value">{formatCurrency(selectedProduct.makingCharges)}</span>
          </div>
          <div className="summary-row">
            <span className="label">Insured Transguard Logistics</span>
            <span className="value">{formatCurrency(selectedProduct.deliveryCharges)}</span>
          </div>
          <div className="summary-row total">
            <span className="label">Total Charges Payable</span>
            <span className="value">{formatCurrency(totalCharges)}</span>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <MapPin size={16} color="#A67C1E" />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Destination</span>
          </div>
          <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.4 }}>
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
          background: '#ECFDF5',
          border: '2px solid #059669',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#059669',
          margin: '0 auto 16px',
        }}
      >
        <Check size={36} strokeWidth={3} />
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 6 }}>
        Delivery Order Placed!
      </h2>
      <p style={{ fontSize: 13, color: '#64748B', maxWidth: 300, margin: '0 auto 20px', lineHeight: 1.5 }}>
        Your certified 24K gold is being packaged into a sealed tamper-proof assay certicard and will be dispatched via Transguard.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 280, margin: '0 auto' }}>
        <button className="btn btn-primary" onClick={() => setFlowState('orders')}>
          Track Courier Status
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('dashboard')}>
          Back to Dashboard
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
          <span style={{ fontSize: 12, color: '#64748B' }}>
            Active Orders ({state.deliveryOrders.length})
          </span>
          <button
            onClick={() => setFlowState('catalog')}
            style={{
              background: 'none',
              border: 'none',
              color: '#A67C1E',
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
                <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A' }}>
                  {ord.weight}g 24K Gold {ord.productType === 'coin' ? 'Coin' : 'Minted Bar'}
                </div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                  Order: {ord.id} • {new Date(ord.createdAt).toLocaleDateString('en-AE')}
                </div>
              </div>
              <span className={`status-badge ${ord.status}`}>{ord.status}</span>
            </div>

            <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 10 }}>
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

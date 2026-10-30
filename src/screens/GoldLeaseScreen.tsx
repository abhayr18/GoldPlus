// ============================================
// OGold Wallet — OGold Earn (Wakala Yield Pools)
// Shariah-Compliant Precious Metals Depository Yield
// App Store: id6504926022
// ============================================

import React, { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { leaseGoldAction } from '../state/appState';
import { OGOLD_WAKALA_POOLS, DEMO_GOLD_RATE, DEMO_SILVER_RATE } from '../constants';

const formatCurrency = (val: number): string =>
  'AED ' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const formatGrams = (val: number): string => val.toFixed(4) + ' g';

export const GoldLeaseScreen: React.FC = () => {
  const { state, setState, back, navigate, showToast } = useApp();
  const [selectedPool, setSelectedPool] = useState(OGOLD_WAKALA_POOLS[0]);
  const [leaseGramsStr, setLeaseGramsStr] = useState<string>('5');
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const activeRate = selectedPool.metal === 'gold' ? DEMO_GOLD_RATE : DEMO_SILVER_RATE;
  const availableGrams =
    selectedPool.metal === 'gold'
      ? Math.max(0, state.holdings.totalGrams - state.holdings.leasedGrams)
      : Math.max(0, state.holdings.silverGrams - state.holdings.leasedSilverGrams);

  const leaseGrams = parseFloat(leaseGramsStr) || 0;
  const aprYield = selectedPool.metal === 'gold' ? 4.8 : 5.2;

  const annualYieldGrams = (leaseGrams * aprYield) / 100;
  const annualYieldAED = annualYieldGrams * activeRate;

  const isValid = leaseGrams > 0 && leaseGrams <= availableGrams;

  const handleConfirmLease = () => {
    if (!isValid) return;
    const newState = leaseGoldAction(state, leaseGrams, selectedPool.name);
    setState(newState);
    setShowConfirmModal(false);
    showToast(`Deposited ${formatGrams(leaseGrams)} into ${selectedPool.name}! Yield starts today.`, 'success');
    navigate('dashboard');
  };

  return (
    <div className="screen-container">
      {/* Header */}
      <div className="screen-header">
        <button className="screen-header-back" onClick={back} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">OGold Earn (Wakala)</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        {/* Top Hero Banner */}
        <div
          className="card-gold-glow"
          style={{ marginBottom: 16 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Sparkles size={18} color="#FBBF24" />
            <span style={{ fontSize: 11, fontWeight: 800, color: '#FBBF24', textTransform: 'uppercase', letterSpacing: 0.8 }}>
              Shariah-Compliant Wakala Yield
            </span>
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 900, color: '#FFFFFF', margin: '4px 0' }}>
            Earn up to 5.2% APR in Precious Metals
          </h3>
          <p style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.5, marginTop: 4 }}>
            Deposit idle gold or silver into insured liquidity reserve pools in Dubai. Earn passive metal yield credited to your wallet monthly.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 14,
              paddingTop: 12,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div>
              <div style={{ fontSize: 10.5, color: '#94A3B8' }}>Available to Deposit</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#FBBF24' }}>
                {formatGrams(availableGrams)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10.5, color: '#94A3B8' }}>Active in Wakala</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#10B981' }}>
                {formatGrams(state.holdings.leasedGrams)}
              </div>
            </div>
          </div>
        </div>

        {/* Pool Selector */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>
            Select Wakala Reserve Pool
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {OGOLD_WAKALA_POOLS.map((pool) => {
              const isSelected = selectedPool.id === pool.id;
              return (
                <div
                  key={pool.id}
                  onClick={() => setSelectedPool(pool)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: '1px solid',
                    borderColor: isSelected ? '#F59E0B' : '#1E293B',
                    background: isSelected ? 'rgba(245, 158, 11, 0.1)' : '#161D2D',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF' }}>{pool.name}</span>
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
                        SHARIAH CERTIFIED
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>
                      {pool.tenure} lock • {pool.insurance}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: '#FBBF24' }}>
                      {pool.annualYield}
                    </div>
                    <div style={{ fontSize: 10, color: '#64748B' }}>
                      Monthly Payouts
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grams input */}
        <div className="card" style={{ marginBottom: 16 }}>
          <label className="form-label">
            Deposit amount in {selectedPool.metal === 'gold' ? '24K Gold' : '.999 Silver'} grams:
          </label>
          <div className="form-input-prefix">
            <span className="prefix">Grams</span>
            <input
              type="number"
              step="0.1"
              value={leaseGramsStr}
              onChange={(e) => setLeaseGramsStr(e.target.value)}
              placeholder="0.00"
            />
          </div>

          {/* Projected Yield Pill */}
          {isValid && (
            <div
              style={{
                marginTop: 12,
                padding: '10px 12px',
                borderRadius: 8,
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 12,
              }}
            >
              <span style={{ color: '#94A3B8' }}>Est. Annual Earnings:</span>
              <span style={{ color: '#10B981', fontWeight: 800 }}>
                +{formatGrams(annualYieldGrams)} ({formatCurrency(annualYieldAED)})
              </span>
            </div>
          )}
        </div>

        <button
          className="btn btn-primary"
          disabled={!isValid}
          onClick={() => setShowConfirmModal(true)}
          style={{ height: 46, fontSize: 14 }}
        >
          Deposit into {selectedPool.name}
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
              Confirm Wakala Pool Deposit
            </h3>
            <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 14 }}>
              Your deposit is 100% physically insured and audited by DNI
            </div>

            <div className="summary-row">
              <span className="label">Reserve Pool</span>
              <span className="value">{selectedPool.name}</span>
            </div>
            <div className="summary-row">
              <span className="label">Grams Deposited</span>
              <span className="value">{formatGrams(leaseGrams)}</span>
            </div>
            <div className="summary-row">
              <span className="label">Expected APR Yield</span>
              <span className="value" style={{ color: '#10B981' }}>{selectedPool.annualYield}</span>
            </div>
            <div className="summary-row">
              <span className="label">Tenure</span>
              <span className="value">{selectedPool.tenure}</span>
            </div>
            <div className="summary-row total">
              <span className="label">Insurance</span>
              <span className="value">100% Dubai National Insurance</span>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleConfirmLease}>
                Confirm Deposit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoldLeaseScreen;

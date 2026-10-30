// ============================================
// YASS Gold & YASS Bullion — Portfolio Screen
// High-Fidelity Fintech Portfolio (Gullak & SafeGold Edition)
// A product by YASS Group, Dubai
// ============================================

import React, { useState, useMemo } from 'react';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCw,
  Gift,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Award,
  Percent,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { DEMO_GOLD_RATE, COLORS } from '../constants';
import type { Transaction } from '../types';

const formatCurrency = (val: number): string =>
  'AED ' + Math.round(val).toLocaleString('en-US');

const formatGrams = (val: number): string =>
  val.toFixed(4) + ' g';

export const PortfolioScreen: React.FC = () => {
  const { state, setState, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'holdings' | 'transactions'>('holdings');

  const { totalGrams, totalInvested, leasedGrams, yieldEarnedGrams, transactions } = state.holdings;
  const currentValue = totalGrams * DEMO_GOLD_RATE;
  const gain = currentValue - totalInvested;
  const gainPercentage = totalInvested > 0 ? (gain / totalInvested) * 100 : 0;
  const isPositiveGain = gain >= 0;

  // Breakdown between direct buy and SIP
  const sipGrams = useMemo(() => {
    return state.sips.reduce((sum, sip) => sum + sip.totalGoldAccumulated, 0);
  }, [state.sips]);

  const idleGrams = Math.max(0, totalGrams - leasedGrams);

  const handleTransactionClick = (txn: Transaction) => {
    setState(prev => ({
      ...prev,
      selectedTransaction: txn,
    }));
    navigate('transactionDetail');
  };

  return (
    <div className="screen-container" style={{ paddingBottom: 90 }}>
      <div className="screen-content">
        {/* Header */}
        <div style={{ padding: '20px 0 16px' }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: COLORS.darkCharcoal }}>
            My Gold Portfolio
          </h1>
          <p style={{ fontSize: 13, color: COLORS.secondaryText, marginTop: 2 }}>
            Real-time valuation of your 24K 999.9 Dubai gold holdings
          </p>
        </div>

        {/* Top Summary Card */}
        <div
          className="card card-gold"
          style={{
            background: 'linear-gradient(135deg, #17232D 0%, #171A1D 100%)',
            color: '#FFF',
            border: '1px solid rgba(232, 182, 63, 0.4)',
            marginBottom: 16,
            borderRadius: 16,
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Current Vault Valuation
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
                {formatCurrency(currentValue)}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Total Weight
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.primaryGold, marginTop: 4 }}>
                {formatGrams(totalGrams)}
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.12)', margin: '16px 0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Total Invested</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#FFFFFF', marginTop: 2 }}>
                {formatCurrency(totalInvested)}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Unrealised Gain</div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: isPositiveGain ? '#4ADE80' : '#F87171',
                  marginTop: 2,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                {isPositiveGain ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {formatCurrency(Math.abs(gain))} ({gainPercentage.toFixed(2)}%)
              </div>
            </div>
          </div>
        </div>

        {/* SafeGold Vault Audit Banner */}
        <div
          onClick={() => navigate('vaultProof')}
          style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: 12,
            padding: '12px 14px',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShieldCheck size={20} color="#16865B" />
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#166534' }}>
                Physical Vault Audit Certificate
              </div>
              <div style={{ fontSize: 11, color: '#15803D' }}>
                100% Backed by Brink's & Transguard DMCC
              </div>
            </div>
          </div>
          <ChevronRight size={16} color="#166534" />
        </div>

        {/* Tab Selector */}
        <div className="tab-bar">
          <button
            className={`tab-item ${activeTab === 'holdings' ? 'active' : ''}`}
            onClick={() => setActiveTab('holdings')}
          >
            Holdings & Yield
          </button>
          <button
            className={`tab-item ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            Ledger ({transactions.length})
          </button>
        </div>

        {/* HOLDINGS TAB */}
        {activeTab === 'holdings' && (
          <div>
            {/* Asset Allocation Breakdown */}
            <div className="card" style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: COLORS.darkCharcoal }}>
                Allocation Breakdown
              </h3>

              {/* Idle Gold (Available for instant sale / redemption) */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: `1px solid ${COLORS.border}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: 'rgba(232, 182, 63, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: COLORS.primaryGold,
                    }}
                  >
                    <Award size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.darkCharcoal }}>
                      Available Vault Gold
                    </div>
                    <div style={{ fontSize: 11, color: COLORS.secondaryText }}>
                      Instant sell or physical delivery
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.darkCharcoal }}>
                    {formatGrams(idleGrams)}
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.secondaryText }}>
                    {formatCurrency(idleGrams * DEMO_GOLD_RATE)}
                  </div>
                </div>
              </div>

              {/* Gullak Signature: Leased Gold Earning Extra Yield */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: `1px solid ${COLORS.border}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: 'rgba(147, 51, 234, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9333EA',
                    }}
                  >
                    <Percent size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.darkCharcoal }}>
                      YASS Gold+ (Leased)
                    </div>
                    <div style={{ fontSize: 11, color: '#9333EA', fontWeight: 600 }}>
                      Earning 5.2% p.a. gold yield
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#9333EA' }}>
                    {formatGrams(leasedGrams)}
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.secondaryText }}>
                    +{formatGrams(yieldEarnedGrams)} earned
                  </div>
                </div>
              </div>

              {/* SIP Accumulation */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: 'rgba(22, 134, 91, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: COLORS.positive,
                    }}
                  >
                    <RefreshCw size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.darkCharcoal }}>
                      Gold SIP Accumulated
                    </div>
                    <div style={{ fontSize: 11, color: COLORS.secondaryText }}>
                      Automated direct debit installments
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.darkCharcoal }}>
                    {formatGrams(sipGrams)}
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.secondaryText }}>
                    {formatCurrency(sipGrams * DEMO_GOLD_RATE)}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Link to Lease More Gold */}
            <div
              onClick={() => navigate('lease')}
              style={{
                background: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
                border: '1px solid #D8B4FE',
                borderRadius: 14,
                padding: '14px 16px',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#6B21A8' }}>
                  Have idle gold in your vault?
                </div>
                <div style={{ fontSize: 11, color: '#7E22CE' }}>
                  Earn up to 5.2% extra gold with YASS Gold+ Leasing
                </div>
              </div>
              <button
                className="btn btn-primary"
                style={{ padding: '6px 12px', fontSize: 12, background: '#9333EA', borderColor: '#9333EA' }}
              >
                Lease Now
              </button>
            </div>
          </div>
        )}

        {/* TRANSACTIONS TAB */}
        {activeTab === 'transactions' && (
          <div className="card" style={{ marginBottom: 16 }}>
            {transactions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-title">No transactions yet</div>
                <div className="empty-state-desc">Your purchases and sales will show up here.</div>
              </div>
            ) : (
              transactions.map((txn) => {
                const isDebit = txn.type === 'sell' || txn.type === 'redemption' || txn.type === 'gift';
                const sign = isDebit ? '-' : '+';
                return (
                  <div
                    key={txn.id}
                    className="txn-row"
                    onClick={() => handleTransactionClick(txn)}
                  >
                    <div className={`txn-icon ${txn.type}`}>
                      {txn.type === 'buy' && <ArrowDownCircle size={18} />}
                      {txn.type === 'sell' && <ArrowUpCircle size={18} />}
                      {txn.type === 'sip' && <RefreshCw size={18} />}
                      {txn.type === 'lease' && <Percent size={18} />}
                      {txn.type === 'gift' && <Gift size={18} />}
                      {txn.type === 'redemption' && <Award size={18} />}
                    </div>

                    <div className="txn-details">
                      <div className="txn-type">
                        {txn.type === 'buy' && 'Bought Gold'}
                        {txn.type === 'sell' && 'Sold Gold'}
                        {txn.type === 'sip' && 'Gold SIP Auto-Debit'}
                        {txn.type === 'lease' && 'YASS Gold+ Lease'}
                        {txn.type === 'gift' && 'Gift Sent'}
                        {txn.type === 'redemption' && 'Physical Bar Minted'}
                      </div>
                      <div className="txn-date">
                        {new Date(txn.date).toLocaleDateString('en-AE', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </div>

                    <div className="txn-amounts">
                      <div className={`txn-grams ${isDebit ? 'negative' : 'positive'}`}>
                        {sign}
                        {formatGrams(txn.goldGrams)}
                      </div>
                      <div className="txn-rupees">{formatCurrency(txn.amount)}</div>
                    </div>

                    <ChevronRight size={16} color={COLORS.secondaryText} style={{ marginLeft: 8 }} />
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <button className="btn btn-primary" onClick={() => navigate('buy')}>
            Buy Gold
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('sell')}>
            Sell Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioScreen;

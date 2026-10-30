// ============================================
// YASS Gold & YASS Bullion — Portfolio Screen
// A product by YASS Group, Dubai
// ============================================

import React, { useState, useMemo } from 'react';
import { ArrowDownCircle, ArrowUpCircle, RefreshCw, Gift, TrendingUp, TrendingDown, ChevronRight, Award } from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { DEMO_GOLD_RATE, COLORS } from '../constants';
import type { Transaction } from '../types';

const formatCurrency = (val: number): string =>
  'AED ' + Math.round(val).toLocaleString('en-US');

const formatGrams = (val: number): string =>
  val.toFixed(4) + ' g';

const PortfolioScreen: React.FC = () => {
  const { state, setState, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'holdings' | 'transactions'>('holdings');

  const { totalGrams, totalInvested, transactions } = state.holdings;
  const currentValue = totalGrams * DEMO_GOLD_RATE;
  const gain = currentValue - totalInvested;
  const gainPercentage = totalInvested > 0 ? (gain / totalInvested) * 100 : 0;
  const isPositiveGain = gain >= 0;

  // Breakdown between direct buy and SIP
  const sipGrams = useMemo(() => {
    return state.sips.reduce((sum, sip) => sum + sip.totalGoldAccumulated, 0);
  }, [state.sips]);

  const digitalGoldGrams = Math.max(0, totalGrams - sipGrams);

  const handleTransactionClick = (txn: Transaction) => {
    setState(prev => ({
      ...prev,
      selectedTransaction: txn,
    }));
    navigate('transactionDetail');
  };

  return (
    <div className="screen-container">
      <div className="screen-content">
        {/* Header */}
        <div style={{ padding: '24px 0 16px' }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: COLORS.mainText }}>
            My Portfolio
          </h1>
          <p style={{ fontSize: 13, color: COLORS.secondaryText, marginTop: 2 }}>
            Real-time valuation of your 24K 999.9 Dubai gold holdings
          </p>
        </div>

        {/* Top Summary Card */}
        <div className="card card-gold" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: COLORS.secondaryGold, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Current Valuation
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#FFFFFF', marginTop: 4 }}>
                {formatCurrency(currentValue)}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: COLORS.secondaryGold, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Total Gold
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.primaryGold, marginTop: 4 }}>
                {formatGrams(totalGrams)}
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '16px 0' }} />

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

        {/* Tab Selector */}
        <div className="tab-bar">
          <button
            className={`tab-item ${activeTab === 'holdings' ? 'active' : ''}`}
            onClick={() => setActiveTab('holdings')}
          >
            Holdings Breakdown
          </button>
          <button
            className={`tab-item ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions ({transactions.length})
          </button>
        </div>

        {/* HOLDINGS TAB */}
        {activeTab === 'holdings' && (
          <div>
            {/* Visual allocation card */}
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div className="portfolio-donut">
                  <div className="portfolio-donut-inner">
                    <span style={{ fontSize: 10, color: COLORS.secondaryText }}>24K Pure</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.mainText }}>
                      99.9%
                    </span>
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS.primaryGold }} />
                    <span style={{ fontSize: 13, color: COLORS.secondaryText }}>Digital Gold:</span>
                    <strong style={{ fontSize: 13, color: COLORS.mainText, marginLeft: 'auto' }}>
                      {formatGrams(digitalGoldGrams)}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS.secondaryGold }} />
                    <span style={{ fontSize: 13, color: COLORS.secondaryText }}>SIP Accumulated:</span>
                    <strong style={{ fontSize: 13, color: COLORS.mainText, marginLeft: 'auto' }}>
                      {formatGrams(sipGrams)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Holdings items */}
            <div className="card" style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, color: COLORS.mainText }}>
                Asset Details
              </h3>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(232, 182, 63, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.primaryGold }}>
                    <Award size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.mainText }}>Digital Gold (Direct)</div>
                    <div style={{ fontSize: 12, color: COLORS.secondaryText }}>Lump-sum purchases</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.mainText }}>
                    {formatGrams(digitalGoldGrams)}
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.secondaryText }}>
                    {formatCurrency(digitalGoldGrams * DEMO_GOLD_RATE)}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(22, 134, 91, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.positive }}>
                    <RefreshCw size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.mainText }}>Gold SIP Savings</div>
                    <div style={{ fontSize: 12, color: COLORS.secondaryText }}>Automated installments</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.mainText }}>
                    {formatGrams(sipGrams)}
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.secondaryText }}>
                    {formatCurrency(sipGrams * DEMO_GOLD_RATE)}
                  </div>
                </div>
              </div>
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
                const isDebit = txn.type === 'sell' || txn.type === 'redemption';
                const sign = isDebit ? '-' : '+';
                return (
                  <div
                    key={txn.id}
                    className="txn-row"
                    onClick={() => handleTransactionClick(txn)}
                  >
                    <div className={`txn-icon ${txn.type}`}>
                      {txn.type === 'buy' && <ArrowDownCircle size={20} />}
                      {txn.type === 'sell' && <ArrowUpCircle size={20} />}
                      {txn.type === 'sip' && <RefreshCw size={20} />}
                      {txn.type === 'redemption' && <Gift size={20} />}
                    </div>

                    <div className="txn-details">
                      <div className="txn-type">
                        {txn.type === 'buy' && 'Bought Gold'}
                        {txn.type === 'sell' && 'Sold Gold'}
                        {txn.type === 'sip' && 'Gold SIP Installment'}
                        {txn.type === 'redemption' && 'Physical Gold Redemption'}
                      </div>
                      <div className="txn-date">
                        {new Date(txn.date).toLocaleDateString('en-IN', {
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

        {/* Persistent Buy & Sell Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
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

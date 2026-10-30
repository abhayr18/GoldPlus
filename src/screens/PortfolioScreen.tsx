// ============================================
// OGold Wallet — Portfolio & Vault Assets Screen
// Dual Precious Metals: 24K Gold & .999 Silver
// App Store: id6504926022
// ============================================

import React, { useState } from 'react';
import {
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  CreditCard,
  Percent,
  ArrowDownCircle,
  ArrowUpCircle,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { DEMO_GOLD_RATE, DEMO_SILVER_RATE } from '../constants';
import type { Transaction } from '../types';

const formatCurrency = (val: number): string =>
  'AED ' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const formatGrams = (val: number): string => val.toFixed(4) + ' g';

export const PortfolioScreen: React.FC = () => {
  const { state, setState, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'holdings' | 'transactions'>('holdings');

  const { totalGrams, silverGrams, totalInvested, leasedGrams, transactions } = state.holdings;
  const goldValuation = totalGrams * DEMO_GOLD_RATE;
  const silverValuation = silverGrams * DEMO_SILVER_RATE;
  const totalValuation = goldValuation + silverValuation;

  const gain = totalValuation - totalInvested;
  const gainPercentage = totalInvested > 0 ? (gain / totalInvested) * 100 : 0;

  const handleTransactionClick = (txn: Transaction) => {
    setState((prev) => ({
      ...prev,
      selectedTransaction: txn,
    }));
    navigate('transactionDetail');
  };

  return (
    <div className="screen-container">
      <div className="screen-content" style={{ paddingTop: 16 }}>
        {/* Header */}
        <div style={{ paddingBottom: 14 }}>
          <h1 style={{ fontSize: 20, fontWeight: 900, color: '#FFFFFF' }}>
            Vault Portfolio
          </h1>
          <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>
            Real-time valuation of your DNI-insured 24K gold and .999 silver
          </p>
        </div>

        {/* Top Summary Card */}
        <div className="card-gold-glow" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 10.5, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 700 }}>
                Total Vault Valuation
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#FFFFFF', marginTop: 4 }}>
                {formatCurrency(totalValuation)}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10.5, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 700 }}>
                Net Gain
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#10B981', marginTop: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
                <TrendingUp size={14} />
                <span>+{gainPercentage.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: 'rgba(255, 255, 255, 0.08)', margin: '14px 0' }} />

          {/* Metal Split */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <div style={{ fontSize: 10, color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>
                24K Gold Vault
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#FBBF24', marginTop: 2 }}>
                {formatGrams(totalGrams)}
              </div>
              <div style={{ fontSize: 11, color: '#94A3B8' }}>{formatCurrency(goldValuation)}</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>
                .999 Silver Vault
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#E2E8F0', marginTop: 2 }}>
                {silverGrams.toFixed(1)} g
              </div>
              <div style={{ fontSize: 11, color: '#94A3B8' }}>{formatCurrency(silverValuation)}</div>
            </div>
          </div>
        </div>

        {/* DNI Vault Proof Banner */}
        <div
          onClick={() => navigate('vaultProof')}
          style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
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
            <ShieldCheck size={18} color="#10B981" />
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#10B981' }}>
                DNI Insured Physical Depository
              </div>
              <div style={{ fontSize: 10.5, color: '#94A3B8' }}>
                Allocated 1:1 at Brink's DMCC in Almas Tower, Dubai
              </div>
            </div>
          </div>
          <ChevronRight size={16} color="#10B981" />
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          <button
            onClick={() => setActiveTab('holdings')}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 8,
              border: 'none',
              background: activeTab === 'holdings' ? '#F59E0B' : '#161D2D',
              color: activeTab === 'holdings' ? '#0A0D14' : '#94A3B8',
              fontSize: 12.5,
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Vault Breakdown
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 8,
              border: 'none',
              background: activeTab === 'transactions' ? '#F59E0B' : '#161D2D',
              color: activeTab === 'transactions' ? '#0A0D14' : '#94A3B8',
              fontSize: 12.5,
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Ledger ({transactions.length})
          </button>
        </div>

        {/* HOLDINGS TAB */}
        {activeTab === 'holdings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* OGold Mastercard Ready Power */}
            <div
              className="card"
              onClick={() => navigate('card')}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: 'rgba(245, 158, 11, 0.15)',
                    color: '#FBBF24',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CreditCard size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF' }}>
                    OGold Mastercard Spending Power
                  </div>
                  <div style={{ fontSize: 11, color: '#94A3B8' }}>
                    Instant POS conversion for {state.card.spendingAsset.toUpperCase()}
                  </div>
                </div>
              </div>
              <ChevronRight size={16} color="#64748B" />
            </div>

            {/* Wakala Yield Holdings */}
            <div
              className="card"
              onClick={() => navigate('lease')}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: 'rgba(139, 92, 246, 0.15)',
                    color: '#A78BFA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Percent size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF' }}>
                    Wakala Earn ({formatGrams(leasedGrams)})
                  </div>
                  <div style={{ fontSize: 11, color: '#94A3B8' }}>
                    Earning 4.8% APR pure gold yield
                  </div>
                </div>
              </div>
              <ChevronRight size={16} color="#64748B" />
            </div>
          </div>
        )}

        {/* LEDGER TAB */}
        {activeTab === 'transactions' && (
          <div className="card" style={{ padding: '4px 14px' }}>
            {transactions.map((txn) => (
              <div
                key={txn.id}
                className="txn-row"
                onClick={() => handleTransactionClick(txn)}
              >
                <div className={`txn-icon ${txn.type}`}>
                  {txn.type === 'buy' ? (
                    <ArrowDownCircle size={17} />
                  ) : txn.type === 'card_spend' ? (
                    <CreditCard size={17} />
                  ) : txn.type === 'spin_reward' ? (
                    <Sparkles size={17} />
                  ) : (
                    <ArrowUpCircle size={17} />
                  )}
                </div>

                <div className="txn-details">
                  <div className="txn-type">
                    {txn.meta || txn.type}
                  </div>
                  <div className="txn-date">
                    {new Date(txn.date).toLocaleDateString('en-AE', { day: 'numeric', month: 'short' })}
                  </div>
                </div>

                <div className="txn-amounts">
                  <div className={`txn-grams ${txn.type === 'buy' || txn.type === 'spin_reward' ? 'positive' : 'negative'}`}>
                    {txn.type === 'buy' || txn.type === 'spin_reward' ? '+' : '−'}
                    {txn.goldGrams.toFixed(4)} g
                  </div>
                  <div className="txn-rupees">{formatCurrency(txn.amount)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioScreen;

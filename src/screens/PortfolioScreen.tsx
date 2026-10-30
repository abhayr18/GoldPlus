// ============================================
// YASS Gold — Vault Portfolio Screen
// DMCC 24K 999.9 Good Delivery Digital Gold
// A Product by YASS Group, Dubai
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
          <h1 style={{ fontSize: 20, fontWeight: 900, color: '#0F172A' }}>
            Vault Portfolio
          </h1>
          <p style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
            Real-time valuation of your DMCC-audited 24K 999.9 fine gold
          </p>
        </div>

        {/* Top Summary Card */}
        <div className="card-gold" style={{ marginBottom: 16, padding: '20px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: '#854D0E', textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 800 }}>
                Total Vault Valuation
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', marginTop: 4 }}>
                {formatCurrency(totalValuation)}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: '#854D0E', textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 800 }}>
                Net Gain
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#059669', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3 }}>
                <TrendingUp size={15} />
                <span>+{gainPercentage.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: '#F1E1B8', margin: '14px 0' }} />

          {/* Metal Split */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
                24K Gold Vault
              </div>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#B8860B', marginTop: 2 }}>
                {formatGrams(totalGrams)}
              </div>
              <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>{formatCurrency(goldValuation)}</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
                .999 Silver Vault
              </div>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#475569', marginTop: 2 }}>
                {silverGrams.toFixed(1)} g
              </div>
              <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>{formatCurrency(silverValuation)}</div>
            </div>
          </div>
        </div>

        {/* DMCC Vault Proof Banner */}
        <div
          onClick={() => navigate('vaultProof')}
          style={{
            background: '#ECFDF5',
            border: '1px solid #A7F3D0',
            borderRadius: 14,
            padding: '12px 14px',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShieldCheck size={20} color="#059669" />
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: '#065F46' }}>
                DMCC Accredited Physical Depository
              </div>
              <div style={{ fontSize: 11, color: '#047857' }}>
                Allocated 1:1 at Brink's DMCC in Almas Tower, Dubai
              </div>
            </div>
          </div>
          <ChevronRight size={16} color="#059669" />
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <button
            onClick={() => setActiveTab('holdings')}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: 10,
              border: activeTab === 'holdings' ? '1px solid #C59B27' : '1px solid #E2E8F0',
              background: activeTab === 'holdings' ? 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)' : '#FFFFFF',
              color: activeTab === 'holdings' ? '#FFFFFF' : '#64748B',
              fontSize: 12.5,
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: activeTab === 'holdings' ? '0 2px 8px rgba(212, 175, 55, 0.25)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            Vault Breakdown
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: 10,
              border: activeTab === 'transactions' ? '1px solid #C59B27' : '1px solid #E2E8F0',
              background: activeTab === 'transactions' ? 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)' : '#FFFFFF',
              color: activeTab === 'transactions' ? '#FFFFFF' : '#64748B',
              fontSize: 12.5,
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: activeTab === 'transactions' ? '0 2px 8px rgba(212, 175, 55, 0.25)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            Ledger ({transactions.length})
          </button>
        </div>

        {/* HOLDINGS TAB */}
        {activeTab === 'holdings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* YASS Gold Spending Power */}
            <div
              className="card"
              onClick={() => navigate('card')}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: '#FEFBF2',
                    border: '1px solid #F3E8C8',
                    color: '#C59B27',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CreditCard size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 800, color: '#0F172A' }}>
                    YASS Gold Visa Platinum Power
                  </div>
                  <div style={{ fontSize: 11.5, color: '#64748B' }}>
                    Instant POS conversion for {state.card.spendingAsset.toUpperCase()}
                  </div>
                </div>
              </div>
              <ChevronRight size={16} color="#94A3B8" />
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
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: '#F5F3FF',
                    border: '1px solid #DDD6FE',
                    color: '#7C3AED',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Percent size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 800, color: '#0F172A' }}>
                    Wakala Bullion Earn ({formatGrams(leasedGrams)})
                  </div>
                  <div style={{ fontSize: 11.5, color: '#64748B' }}>
                    Earning 4.8% APR pure physical gold yield
                  </div>
                </div>
              </div>
              <ChevronRight size={16} color="#94A3B8" />
            </div>
          </div>
        )}

        {/* LEDGER TAB */}
        {activeTab === 'transactions' && (
          <div className="card" style={{ padding: '6px 14px' }}>
            {transactions.map((txn) => (
              <div
                key={txn.id}
                className="txn-row"
                onClick={() => handleTransactionClick(txn)}
              >
                <div className={`txn-icon ${txn.type}`}>
                  {txn.type === 'buy' ? (
                    <ArrowDownCircle size={18} />
                  ) : txn.type === 'card_spend' ? (
                    <CreditCard size={18} />
                  ) : txn.type === 'spin_reward' ? (
                    <Sparkles size={18} />
                  ) : (
                    <ArrowUpCircle size={18} />
                  )}
                </div>

                <div className="txn-details">
                  <div className="txn-type">
                    {txn.meta || txn.type}
                  </div>
                  <div className="txn-date">
                    {new Date(txn.date).toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' })}
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

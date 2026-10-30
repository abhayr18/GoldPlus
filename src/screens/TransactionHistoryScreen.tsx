// ============================================
// YASS Gold & YASS Bullion — Transaction History Screen
// A product by YASS Group, Dubai
// ============================================

import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCw,
  Gift,
  X,
  FileText,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { COLORS } from '../constants';
import type { Transaction } from '../types';

type FilterType = 'all' | 'buy' | 'sell' | 'sip' | 'lease' | 'gift';

const formatCurrency = (val: number): string =>
  'AED ' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const formatGrams = (val: number): string =>
  val.toFixed(4) + ' g';

const TransactionHistoryScreen: React.FC = () => {
  const { state, back, showToast } = useApp();
  const [filter, setFilter] = useState<FilterType>('all');
  const [activeTxn, setActiveTxn] = useState<Transaction | null>(null);

  const transactions = state.holdings.transactions;

  const filteredTransactions = useMemo(() => {
    if (filter === 'all') return transactions;
    return transactions.filter((t) => t.type === filter);
  }, [transactions, filter]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    showToast('Reference ID copied to clipboard', 'info');
  };

  return (
    <div className="screen-container">
      {/* Header */}
      <div className="screen-header">
        <button className="screen-header-back" onClick={back} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Transaction History</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="screen-content" style={{ paddingTop: 14 }}>
        {/* Filter Pills */}
        <div className="tab-bar">
          {(['all', 'buy', 'sell', 'sip', 'lease', 'gift'] as FilterType[]).map((tab) => (
            <button
              key={tab}
              className={`tab-item ${filter === tab ? 'active' : ''}`}
              onClick={() => setFilter(tab)}
              style={{ textTransform: 'capitalize', fontSize: 11 }}
            >
              {tab === 'lease' ? 'Gold+' : tab}
            </button>
          ))}
        </div>

          {/* Transactions List */}
          <div className="card" style={{ marginTop: 12 }}>
            {filteredTransactions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <FileText size={32} />
                </div>
                <div className="empty-state-title">No transactions found</div>
                <div className="empty-state-desc">
                  There are no {filter !== 'all' ? filter : ''} transactions recorded yet.
                </div>
              </div>
            ) : (
              filteredTransactions.map((txn) => {
                const isDebit = txn.type === 'sell' || txn.type === 'redemption';
                const sign = isDebit ? '-' : '+';
                return (
                  <div
                    key={txn.id}
                    className="txn-row"
                    onClick={() => setActiveTxn(txn)}
                  >
                    <div className={`txn-icon ${txn.type}`}>
                      {txn.type === 'buy' && <ArrowDownCircle size={20} />}
                      {txn.type === 'sell' && <ArrowUpCircle size={20} />}
                      {txn.type === 'sip' && <RefreshCw size={20} />}
                      {txn.type === 'redemption' && <Gift size={20} />}
                    </div>

                    <div className="txn-details">
                      <div className="txn-type">
                        {txn.type === 'buy' && 'Buy Gold'}
                        {txn.type === 'sell' && 'Sell Gold'}
                        {txn.type === 'sip' && 'Auto-Save Deposit'}
                        {txn.type === 'lease' && 'YASS Gold+ Leased'}
                        {txn.type === 'gift' && 'Gold Gift'}
                        {txn.type === 'redemption' && 'Physical Delivery'}
                      </div>
                      <div className="txn-date">
                        {new Date(txn.date).toLocaleString('en-AE', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
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
                  </div>
                );
              })
            )}
          </div>
        </div>

      {/* Transaction Detail Modal */}
      {activeTxn && (
        <div className="modal-overlay" onClick={() => setActiveTxn(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.mainText }}>
                Transaction Details
              </h3>
              <button
                onClick={() => setActiveTxn(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.secondaryText }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Big Amount / Grams */}
            <div style={{ textAlign: 'center', padding: '16px 0', background: COLORS.ivoryBg, borderRadius: 12, marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: activeTxn.type === 'sell' || activeTxn.type === 'redemption' ? COLORS.negative : COLORS.positive,
                }}
              >
                {activeTxn.type === 'sell' || activeTxn.type === 'redemption' ? '-' : '+'}
                {formatGrams(activeTxn.goldGrams)}
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.mainText, marginTop: 4 }}>
                {formatCurrency(activeTxn.amount)}
              </div>
              <div style={{ marginTop: 8 }}>
                <span className={`status-badge ${activeTxn.status}`}>
                  <CheckCircle2 size={12} style={{ marginRight: 4 }} />
                  {activeTxn.status}
                </span>
              </div>
            </div>

            {/* Detailed properties */}
            <div className="summary-row">
              <span className="label">Transaction Type</span>
              <span className="value" style={{ textTransform: 'capitalize' }}>
                {activeTxn.type === 'sip' ? 'Gold SIP' : activeTxn.type}
              </span>
            </div>
            <div className="summary-row">
              <span className="label">Date & Time</span>
              <span className="value">
                {new Date(activeTxn.date).toLocaleString('en-AE', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <div className="summary-row">
              <span className="label">Applicable Rate</span>
              <span className="value">AED {activeTxn.rate.toFixed(2)}/g</span>
            </div>
            <div className="summary-row">
              <span className="label">Payment / Payout Method</span>
              <span className="value">{activeTxn.paymentMethod || 'Gold Vault Debit'}</span>
            </div>
            <div className="summary-row">
              <span className="label">Reference ID</span>
              <span
                className="value"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: COLORS.primaryGold }}
                onClick={() => copyToClipboard(activeTxn.reference)}
              >
                <span style={{ fontSize: 12 }}>{activeTxn.reference}</span>
                <Copy size={14} />
              </span>
            </div>

            <div style={{ marginTop: 20 }}>
              <button className="btn btn-secondary" onClick={() => setActiveTxn(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistoryScreen;

// ============================================
// YASS Gold & Bullion — Profile / Account Screen
// White + Gold Clean Minimalist Theme
// ============================================

import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Bell,
  Info,
  FileText,
  Lock,
  LogOut,
  RotateCcw,
  ChevronRight,
  CheckCircle,
  X,
  Package,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { BrandLogo } from '../components/BrandLogo';
import { BRAND } from '../constants';
import { logoutUser } from '../state/appState';

type SubView =
  | 'none'
  | 'kyc'
  | 'bank'
  | 'notifications'
  | 'about'
  | 'terms'
  | 'privacy';

export const ProfileScreen: React.FC = () => {
  const { state, setState, navigate, showToast, resetDemo } = useApp();
  const [subView, setSubView] = useState<SubView>('none');
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);

  const [notifState, setNotifState] = useState(state.notificationPrefs);

  const user = state.user || {
    fullName: 'Tariq Al Mansoori',
    mobile: '501234567',
    email: 'tariq.mansoori@yassgroup.ae',
    kycStatus: 'verified' as const,
    emiratesId: '784-1988-1234567-1',
  };

  const handleLogout = () => {
    setState(logoutUser(state));
    setShowLogoutModal(false);
    showToast('Logged out successfully', 'info');
    navigate('splash');
  };

  const handleResetDemo = () => {
    resetDemo();
    setShowResetModal(false);
    showToast('Demo data restored to initial state', 'success');
    navigate('dashboard');
  };

  const toggleNotif = (key: keyof typeof notifState) => {
    const updated = { ...notifState, [key]: !notifState[key] };
    setNotifState(updated);
    setState((prev) => ({ ...prev, notificationPrefs: updated }));
    showToast('Preferences updated', 'info');
  };

  return (
    <div className="screen-container">
      <div className="screen-content">
        {/* Profile Card Header */}
        <div style={{ padding: '20px 0 16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              background: '#FEFBF2',
              border: '1px solid #EED8A1',
              padding: '18px',
              borderRadius: 16,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 900,
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(197, 155, 39, 0.25)',
              }}
            >
              {user.fullName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .substring(0, 2)
                .toUpperCase()}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: '#0F172A' }}>
                {user.fullName}
              </h2>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                +971 {user.mobile}
              </div>
              <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>
                Emirates ID: {user.emiratesId}
              </div>
            </div>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 10,
                padding: '3px 8px',
                borderRadius: 4,
                background: '#ECFDF5',
                color: '#059669',
                border: '1px solid #A7F3D0',
                fontWeight: 800,
              }}
            >
              <CheckCircle size={12} />
              VERIFIED
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="card" style={{ marginBottom: 14 }}>
          {/* Physical Delivery Orders */}
          <div className="profile-menu-item" onClick={() => navigate('delivery')}>
            <div className="profile-menu-icon" style={{ background: '#FEFBF2', color: '#A67C1E' }}>
              <Package size={18} />
            </div>
            <div className="profile-menu-label">Physical Bullion Deliveries</div>
            <span style={{ fontSize: 11.5, color: '#A67C1E', fontWeight: 700, marginRight: 8 }}>
              {state.deliveryOrders.length} Orders
            </span>
            <ChevronRight size={16} className="profile-menu-chevron" />
          </div>

          {/* DMCC Vault Certificate */}
          <div className="profile-menu-item" onClick={() => navigate('vaultProof')}>
            <div className="profile-menu-icon" style={{ background: '#ECFDF5', color: '#059669' }}>
              <ShieldCheck size={18} />
            </div>
            <div className="profile-menu-label">Brink’s Vault Certificate</div>
            <span style={{ fontSize: 11.5, color: '#059669', marginRight: 8, fontWeight: 700 }}>
              100% Backed
            </span>
            <ChevronRight size={16} className="profile-menu-chevron" />
          </div>

          {/* KYC Status */}
          <div className="profile-menu-item" onClick={() => setSubView('kyc')}>
            <div className="profile-menu-icon">
              <ShieldCheck size={18} />
            </div>
            <div className="profile-menu-label">UAE PASS KYC Status</div>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: '#059669', marginRight: 8 }}>
              Level 3 Verified
            </span>
            <ChevronRight size={16} className="profile-menu-chevron" />
          </div>

          {/* Bank Accounts */}
          <div className="profile-menu-item" onClick={() => setSubView('bank')}>
            <div className="profile-menu-icon">
              <Building2 size={18} />
            </div>
            <div className="profile-menu-label">Linked UAE Bank</div>
            <span style={{ fontSize: 11.5, color: '#64748B', marginRight: 8 }}>
              Emirates NBD
            </span>
            <ChevronRight size={16} className="profile-menu-chevron" />
          </div>

          {/* Notifications */}
          <div className="profile-menu-item" onClick={() => setSubView('notifications')}>
            <div className="profile-menu-icon">
              <Bell size={18} />
            </div>
            <div className="profile-menu-label">Notifications & Rates</div>
            <ChevronRight size={16} className="profile-menu-chevron" />
          </div>

          {/* About */}
          <div className="profile-menu-item" onClick={() => setSubView('about')}>
            <div className="profile-menu-icon" style={{ background: '#FEFBF2', color: '#A67C1E' }}>
              <Info size={18} />
            </div>
            <div className="profile-menu-label">About {BRAND.name}</div>
            <ChevronRight size={16} className="profile-menu-chevron" />
          </div>

          {/* Terms */}
          <div className="profile-menu-item" onClick={() => setSubView('terms')}>
            <div className="profile-menu-icon">
              <FileText size={18} />
            </div>
            <div className="profile-menu-label">Terms & Conditions</div>
            <ChevronRight size={16} className="profile-menu-chevron" />
          </div>

          {/* Privacy */}
          <div className="profile-menu-item" onClick={() => setSubView('privacy')}>
            <div className="profile-menu-icon">
              <Lock size={18} />
            </div>
            <div className="profile-menu-label">Privacy Policy</div>
            <ChevronRight size={16} className="profile-menu-chevron" />
          </div>
        </div>

        {/* Demo Controls */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>
            Demo Controls
          </div>

          <div
            className="profile-menu-item"
            onClick={() => setShowResetModal(true)}
            style={{ borderBottom: '1px solid #F1F5F9' }}
          >
            <div className="profile-menu-icon" style={{ color: '#A67C1E' }}>
              <RotateCcw size={18} />
            </div>
            <div className="profile-menu-label">Reset Demo Wallet Data</div>
            <ChevronRight size={16} className="profile-menu-chevron" />
          </div>

          <div
            className="profile-menu-item"
            onClick={() => setShowLogoutModal(true)}
            style={{ color: '#DC2626' }}
          >
            <div className="profile-menu-icon" style={{ background: '#FEF2F2', color: '#DC2626' }}>
              <LogOut size={18} />
            </div>
            <div className="profile-menu-label" style={{ color: '#DC2626' }}>Log Out</div>
            <ChevronRight size={16} className="profile-menu-chevron" />
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '16px 0 24px', fontSize: 11.5, color: '#94A3B8' }}>
          {BRAND.attribution}
          <div style={{ fontSize: 10.5, color: '#CBD5E1', marginTop: 3 }}>
            Version 2.0.0 (Clean Executive Release)
          </div>
        </div>
      </div>

      {/* ── Subviews ─────────────────────────────────────────── */}
      {subView === 'about' && (
        <div className="modal-overlay" onClick={() => setSubView('none')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A' }}>About {BRAND.name}</h3>
              <button onClick={() => setSubView('none')} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <BrandLogo size="lg" />
              <p style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.5, marginTop: 12 }}>
                YASS Gold is the premier Dubai digital gold and physical bullion platform by YASS Group Dubai. We enable clients to buy 24K digital gold and receive physical minted coins and bars at their doorstep across the UAE.
              </p>
            </div>

            <div className="summary-row">
              <span className="label">Headquarters</span>
              <span className="value">Almas Tower, JLT & Gold Souk, Dubai</span>
            </div>
            <div className="summary-row">
              <span className="label">Vault Custody</span>
              <span className="value">Brink’s Global Services (DMCC)</span>
            </div>
            <div className="summary-row">
              <span className="label">Independent Auditor</span>
              <span className="value">BDO Chartered Accountants (Dubai)</span>
            </div>
            <div className="summary-row total">
              <span className="label">Tax Standard</span>
              <span className="value" style={{ color: '#059669' }}>0% UAE VAT on 24K Gold</span>
            </div>
          </div>
        </div>
      )}

      {subView === 'kyc' && (
        <div className="modal-overlay" onClick={() => setSubView('none')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A' }}>UAE PASS KYC Status</h3>
              <button onClick={() => setSubView('none')} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ textAlign: 'center', padding: '16px', background: '#ECFDF5', borderRadius: 12, marginBottom: 14 }}>
              <CheckCircle size={32} color="#059669" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: 15, fontWeight: 800, color: '#059669' }}>
                UAE PASS Level 3 Verified
              </div>
              <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2 }}>
                Emirates ID linked for unlimited digital gold & bullion delivery
              </div>
            </div>

            <div className="summary-row">
              <span className="label">Full Legal Name</span>
              <span className="value">{user.fullName}</span>
            </div>
            <div className="summary-row">
              <span className="label">Emirates ID</span>
              <span className="value">{user.emiratesId}</span>
            </div>
            <div className="summary-row total">
              <span className="label">Bullion Trading Limit</span>
              <span className="value" style={{ color: '#059669' }}>Unlimited (DMCC Compliant)</span>
            </div>
          </div>
        </div>
      )}

      {subView === 'notifications' && (
        <div className="modal-overlay" onClick={() => setSubView('none')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A' }}>Notification Preferences</h3>
              <button onClick={() => setSubView('none')} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div
                onClick={() => toggleNotif('priceAlerts')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #E2E8F0', cursor: 'pointer' }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Daily Dubai Gold Souk Rate Alert</div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>Morning benchmark spot price push</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, color: notifState.priceAlerts ? '#059669' : '#64748B' }}>
                  {notifState.priceAlerts ? 'ON' : 'OFF'}
                </span>
              </div>

              <div
                onClick={() => toggleNotif('transactionUpdates')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', cursor: 'pointer' }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Bullion Dispatch & Courier Tracking</div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>Transguard delivery SMS & in-app alerts</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, color: notifState.transactionUpdates ? '#059669' : '#64748B' }}>
                  {notifState.transactionUpdates ? 'ON' : 'OFF'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Modal */}
      {showResetModal && (
        <div className="modal-overlay" onClick={() => setShowResetModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
              Reset Demo Wallet?
            </h3>
            <p style={{ fontSize: 12, color: '#64748B', marginBottom: 16 }}>
              This will restore all demo gold holdings, deliveries, and transactions to default.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary" onClick={() => setShowResetModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleResetDemo}>
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
              Log Out?
            </h3>
            <p style={{ fontSize: 12, color: '#64748B', marginBottom: 16 }}>
              Are you sure you want to log out of YASS Gold?
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleLogout} style={{ background: '#DC2626', color: '#FFFFFF' }}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;

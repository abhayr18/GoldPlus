// ============================================
// OGold Wallet — Profile / Account Screen
// UAE PASS KYC, Bank Accounts, DNI Insurance & Security
// App Store: id6504926022
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
  CreditCard,
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
  | 'help'
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
    email: 'tariq.mansoori@ogold.app',
    kycStatus: 'verified' as const,
    emiratesId: '784-1988-1234567-1',
  };

  const handleLogout = () => {
    setState(logoutUser(state));
    setShowLogoutModal(false);
    showToast('Logged out of OGold Wallet', 'info');
    navigate('splash');
  };

  const handleResetDemo = () => {
    resetDemo();
    setShowResetModal(false);
    showToast('OGold demo data restored to initial state', 'success');
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
              background: '#161D2D',
              border: '1px solid #1E293B',
              padding: '18px',
              borderRadius: 16,
              color: '#FFFFFF',
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)',
                color: '#0A0D14',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 900,
                flexShrink: 0,
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
              <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                {user.fullName}
              </h2>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>
                +971 {user.mobile}
              </div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>
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
                borderRadius: 6,
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
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
          {/* OGold Mastercard shortcut */}
          <div className="profile-menu-item" onClick={() => navigate('card')}>
            <div className="profile-menu-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24' }}>
              <CreditCard size={18} />
            </div>
            <div className="profile-menu-label">OGold Mastercard</div>
            <span style={{ fontSize: 11.5, color: '#10B981', fontWeight: 700, marginRight: 8 }}>
              Active
            </span>
            <ChevronRight size={16} className="profile-menu-chevron" />
          </div>

          {/* DNI Vault Proof */}
          <div className="profile-menu-item" onClick={() => navigate('vaultProof')}>
            <div className="profile-menu-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <ShieldCheck size={18} />
            </div>
            <div className="profile-menu-label">DNI Vault Audit Certificate</div>
            <span style={{ fontSize: 11.5, color: '#94A3B8', marginRight: 8 }}>
              Brink’s DMCC
            </span>
            <ChevronRight size={16} className="profile-menu-chevron" />
          </div>

          {/* KYC Verification */}
          <div className="profile-menu-item" onClick={() => setSubView('kyc')}>
            <div className="profile-menu-icon">
              <ShieldCheck size={18} />
            </div>
            <div className="profile-menu-label">UAE PASS KYC Status</div>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: '#10B981', marginRight: 8 }}>
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
            <span style={{ fontSize: 11.5, color: '#94A3B8', marginRight: 8 }}>
              Emirates NBD
            </span>
            <ChevronRight size={16} className="profile-menu-chevron" />
          </div>

          {/* Notifications */}
          <div className="profile-menu-item" onClick={() => setSubView('notifications')}>
            <div className="profile-menu-icon">
              <Bell size={18} />
            </div>
            <div className="profile-menu-label">Notifications & Alerts</div>
            <ChevronRight size={16} className="profile-menu-chevron" />
          </div>

          {/* About OGold */}
          <div className="profile-menu-item" onClick={() => setSubView('about')}>
            <div className="profile-menu-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24' }}>
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
          <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>
            Demo Controls
          </div>

          <div
            className="profile-menu-item"
            onClick={() => setShowResetModal(true)}
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
          >
            <div className="profile-menu-icon" style={{ color: '#FBBF24' }}>
              <RotateCcw size={18} />
            </div>
            <div className="profile-menu-label">Reset Demo Wallet Data</div>
            <ChevronRight size={16} className="profile-menu-chevron" />
          </div>

          <div
            className="profile-menu-item"
            onClick={() => setShowLogoutModal(true)}
            style={{ color: '#EF4444' }}
          >
            <div className="profile-menu-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444' }}>
              <LogOut size={18} />
            </div>
            <div className="profile-menu-label" style={{ color: '#EF4444' }}>Log Out</div>
            <ChevronRight size={16} className="profile-menu-chevron" />
          </div>
        </div>

        {/* Footer attribution */}
        <div style={{ textAlign: 'center', padding: '16px 0 28px', fontSize: 11.5, color: '#64748B' }}>
          {BRAND.attribution}
          <div style={{ fontSize: 10.5, color: '#475569', marginTop: 3 }}>
            OGold Wallet App iOS v2.4.1 (Build 6504926022)
          </div>
        </div>
      </div>

      {/* ── Subviews ─────────────────────────────────────────── */}
      {subView === 'about' && (
        <div className="modal-overlay" onClick={() => setSubView('none')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF' }}>About {BRAND.name}</h3>
              <button onClick={() => setSubView('none')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <BrandLogo size="lg" />
              <p style={{ fontSize: 12.5, color: '#94A3B8', lineHeight: 1.5, marginTop: 12 }}>
                OGold is the digital precious metals and lifestyle super app based in Dubai, UAE. We allow users to buy, sell, save, and spend physical 24K gold and .999 silver with the OGold Mastercard anywhere in the world.
              </p>
            </div>

            <div className="summary-row">
              <span className="label">License</span>
              <span className="value">Dubai Department of Economy and Tourism (DED)</span>
            </div>
            <div className="summary-row">
              <span className="label">Insurance</span>
              <span className="value">Dubai National Insurance (DNI)</span>
            </div>
            <div className="summary-row">
              <span className="label">Depository</span>
              <span className="value">Brink’s Global Services (DMCC Dubai)</span>
            </div>
            <div className="summary-row total">
              <span className="label">Compliance</span>
              <span className="value" style={{ color: '#10B981' }}>100% Shariah Compliant</span>
            </div>
          </div>
        </div>
      )}

      {subView === 'kyc' && (
        <div className="modal-overlay" onClick={() => setSubView('none')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF' }}>UAE PASS KYC Verification</h3>
              <button onClick={() => setSubView('none')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 12, marginBottom: 14 }}>
              <CheckCircle size={32} color="#10B981" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: 15, fontWeight: 800, color: '#10B981' }}>
                UAE PASS Qualified Signature
              </div>
              <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 2 }}>
                Emirates ID linked for unlimited digital precious metals operations
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
              <span className="label">Trading & Card Limit</span>
              <span className="value" style={{ color: '#10B981' }}>Unlimited (DMCC Compliant)</span>
            </div>
          </div>
        </div>
      )}

      {subView === 'notifications' && (
        <div className="modal-overlay" onClick={() => setSubView('none')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF' }}>Notification Preferences</h3>
              <button onClick={() => setSubView('none')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div
                onClick={() => toggleNotif('priceAlerts')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1E293B', cursor: 'pointer' }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Spot Price Alerts</div>
                  <div style={{ fontSize: 11, color: '#94A3B8' }}>Gold & silver 24h market move notifications</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, color: notifState.priceAlerts ? '#10B981' : '#64748B' }}>
                  {notifState.priceAlerts ? 'ON' : 'OFF'}
                </span>
              </div>

              <div
                onClick={() => toggleNotif('transactionUpdates')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', cursor: 'pointer' }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Mastercard Spend Alerts</div>
                  <div style={{ fontSize: 11, color: '#94A3B8' }}>Instant POS notifications & receipt proofs</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, color: notifState.transactionUpdates ? '#10B981' : '#64748B' }}>
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
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
              Reset Demo Data?
            </h3>
            <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 16 }}>
              This will restore all gold and silver balances, OGold Mastercard status, and demo transactions to default.
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
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
              Log Out?
            </h3>
            <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 16 }}>
              Are you sure you want to log out of OGold Wallet?
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleLogout} style={{ background: '#EF4444', color: '#FFFFFF' }}>
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

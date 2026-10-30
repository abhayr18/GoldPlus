// ============================================
// YASS Gold & YASS Bullion — Profile / More Screen
// A product by YASS Group, Dubai
// ============================================

import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Bell,
  HelpCircle,
  Info,
  FileText,
  Lock,
  LogOut,
  RotateCcw,
  ChevronRight,
  CheckCircle,
  X,
  Building,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { BRAND, COLORS, DEMO_GOLD_RATE } from '../constants';
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

const ProfileScreen: React.FC = () => {
  const { state, setState, navigate, showToast, resetDemo } = useApp();
  const [subView, setSubView] = useState<SubView>('none');
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);

  // Notifications toggle local state
  const [notifState, setNotifState] = useState(state.notificationPrefs);

  const user = state.user || {
    fullName: 'Tariq Al Mansoori',
    mobile: '501234567',
    email: 'tariq.mansoori@yassgroup.ae',
    kycStatus: 'verified' as const,
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
        <div style={{ padding: '24px 0 16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: COLORS.darkCharcoal,
              color: '#fff',
              padding: '20px',
              borderRadius: 16,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: COLORS.primaryGold,
                color: COLORS.darkCharcoal,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                fontWeight: 700,
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
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: '#fff' }}>
                {user.fullName}
              </h2>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
                +971 {user.mobile}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                {user.email}
              </div>
            </div>

            <div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 11,
                  padding: '4px 8px',
                  borderRadius: 999,
                  background: 'rgba(22, 134, 91, 0.2)',
                  color: '#4ADE80',
                  fontWeight: 600,
                }}
              >
                <CheckCircle size={12} />
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="card" style={{ marginBottom: 16 }}>
          {/* KYC Verification */}
          <div className="profile-menu-item" onClick={() => setSubView('kyc')}>
            <div className="profile-menu-icon" style={{ background: 'rgba(22, 134, 91, 0.1)', color: COLORS.positive }}>
              <ShieldCheck size={20} />
            </div>
            <div className="profile-menu-label">KYC Verification</div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: COLORS.positive,
                marginRight: 8,
              }}
            >
              Verified
            </span>
            <ChevronRight size={18} className="profile-menu-chevron" />
          </div>

          {/* Bank Accounts */}
          <div className="profile-menu-item" onClick={() => setSubView('bank')}>
            <div className="profile-menu-icon">
              <Building2 size={20} />
            </div>
            <div className="profile-menu-label">Linked Bank Accounts</div>
            <span style={{ fontSize: 12, color: COLORS.secondaryText, marginRight: 8 }}>
              Emirates NBD
            </span>
            <ChevronRight size={18} className="profile-menu-chevron" />
          </div>

          {/* Notifications */}
          <div className="profile-menu-item" onClick={() => setSubView('notifications')}>
            <div className="profile-menu-icon">
              <Bell size={20} />
            </div>
            <div className="profile-menu-label">Notification Preferences</div>
            <ChevronRight size={18} className="profile-menu-chevron" />
          </div>

          {/* Help & Support */}
          <div className="profile-menu-item" onClick={() => setSubView('help')}>
            <div className="profile-menu-icon">
              <HelpCircle size={20} />
            </div>
            <div className="profile-menu-label">Help & Support</div>
            <ChevronRight size={18} className="profile-menu-chevron" />
          </div>

          {/* About Us */}
          <div className="profile-menu-item" onClick={() => setSubView('about')}>
            <div className="profile-menu-icon" style={{ background: 'rgba(232, 182, 63, 0.1)', color: COLORS.primaryGold }}>
              <Info size={20} />
            </div>
            <div className="profile-menu-label">About {BRAND.name}</div>
            <ChevronRight size={18} className="profile-menu-chevron" />
          </div>

          {/* Terms & Conditions */}
          <div className="profile-menu-item" onClick={() => setSubView('terms')}>
            <div className="profile-menu-icon">
              <FileText size={20} />
            </div>
            <div className="profile-menu-label">Terms & Conditions</div>
            <ChevronRight size={18} className="profile-menu-chevron" />
          </div>

          {/* Privacy Policy */}
          <div className="profile-menu-item" onClick={() => setSubView('privacy')}>
            <div className="profile-menu-icon">
              <Lock size={20} />
            </div>
            <div className="profile-menu-label">Privacy Policy</div>
            <ChevronRight size={18} className="profile-menu-chevron" />
          </div>
        </div>

        {/* Demo Controls Card */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.secondaryText, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>
            Demo Controls
          </div>

          <div
            className="profile-menu-item"
            onClick={() => setShowResetModal(true)}
            style={{ borderBottom: `1px solid ${COLORS.border}` }}
          >
            <div className="profile-menu-icon" style={{ background: 'rgba(232, 182, 63, 0.1)', color: COLORS.primaryGold }}>
              <RotateCcw size={20} />
            </div>
            <div className="profile-menu-label">Reset Demo Data</div>
            <ChevronRight size={18} className="profile-menu-chevron" />
          </div>

          <div
            className="profile-menu-item danger"
            onClick={() => setShowLogoutModal(true)}
          >
            <div className="profile-menu-icon">
              <LogOut size={20} />
            </div>
            <div className="profile-menu-label">Log Out</div>
            <ChevronRight size={18} className="profile-menu-chevron" />
          </div>
        </div>

        {/* Footer attribution */}
        <div style={{ textAlign: 'center', padding: '16px 0 24px', fontSize: 12, color: COLORS.secondaryText }}>
          {BRAND.attribution}
          <div style={{ fontSize: 11, color: COLORS.secondaryText, marginTop: 4 }}>
            App Version 1.0.0 (Prototype)
          </div>
        </div>
      </div>

      {/* ============================================= */}
      {/* SUBVIEW MODALS */}
      {/* ============================================= */}

      {/* KYC Subview */}
      {subView === 'kyc' && (
        <div className="modal-overlay" onClick={() => setSubView('none')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.mainText }}>KYC Verification</h3>
              <button onClick={() => setSubView('none')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(22, 134, 91, 0.08)', borderRadius: 12, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: COLORS.positive, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                <CheckCircle size={28} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.positive }}>
                UAE PASS Verified (Simulated)
              </div>
              <div style={{ fontSize: 12, color: COLORS.secondaryText, marginTop: 4 }}>
                Emirates ID linked for unlimited digital gold & physical bullion operations
              </div>
            </div>

            <div className="summary-row">
              <span className="label">Emirates ID</span>
              <span className="value">784-1988-1234567-1 (Verified)</span>
            </div>
            <div className="summary-row">
              <span className="label">UAE PASS Tier</span>
              <span className="value">SOP3 Qualified Signature</span>
            </div>
            <div className="summary-row">
              <span className="label">Bullion Trading Limit</span>
              <span className="value" style={{ color: COLORS.positive }}>Unlimited (DMCC Compliant)</span>
            </div>

            <div className="demo-banner" style={{ marginTop: 16 }}>
              DEMO NOTICE: THIS IS A SIMULATED KYC PROFILE FOR STAKEHOLDER DEMONSTRATION
            </div>

            <button className="btn btn-secondary" style={{ marginTop: 12 }} onClick={() => setSubView('none')}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Bank Account Subview */}
      {subView === 'bank' && (
        <div className="modal-overlay" onClick={() => setSubView('none')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.mainText }}>Linked Bank Accounts</h3>
              <button onClick={() => setSubView('none')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {state.bankAccounts.map((acc) => (
              <div key={acc.id} className="card" style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.mainText }}>
                      {acc.bankName}
                    </div>
                    <div style={{ fontSize: 13, color: COLORS.secondaryText, marginTop: 2 }}>
                      IBAN: {acc.iban || acc.accountNumber}
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.secondaryText }}>
                      Holder: {acc.holderName}
                    </div>
                  </div>
                  {acc.isPrimary && (
                    <span className="status-badge completed">Primary</span>
                  )}
                </div>
              </div>
            ))}

            <button
              className="btn btn-outline-gold"
              style={{ marginTop: 10 }}
              onClick={() => showToast('Additional bank linking enabled in full version', 'info')}
            >
              + Link Another Bank Account
            </button>
          </div>
        </div>
      )}

      {/* Notifications Subview */}
      {subView === 'notifications' && (
        <div className="modal-overlay" onClick={() => setSubView('none')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.mainText }}>Notification Preferences</h3>
              <button onClick={() => setSubView('none')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.mainText }}>Daily Price Alerts</div>
                  <div style={{ fontSize: 12, color: COLORS.secondaryText }}>Get notified when gold rates move</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifState.priceAlerts}
                  onChange={() => toggleNotif('priceAlerts')}
                  style={{ width: 20, height: 20, accentColor: COLORS.primaryGold }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.mainText }}>SIP Reminders</div>
                  <div style={{ fontSize: 12, color: COLORS.secondaryText }}>Upcoming debit schedule notifications</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifState.sipReminders}
                  onChange={() => toggleNotif('sipReminders')}
                  style={{ width: 20, height: 20, accentColor: COLORS.primaryGold }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.mainText }}>Transaction Updates</div>
                  <div style={{ fontSize: 12, color: COLORS.secondaryText }}>Instant receipts for Buy & Sell orders</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifState.transactionUpdates}
                  onChange={() => toggleNotif('transactionUpdates')}
                  style={{ width: 20, height: 20, accentColor: COLORS.primaryGold }}
                />
              </div>
            </div>

            <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => setSubView('none')}>
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {/* Help & Support Subview */}
      {subView === 'help' && (
        <div className="modal-overlay" onClick={() => setSubView('none')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.mainText }}>Help & Support</h3>
              <button onClick={() => setSubView('none')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: COLORS.mainText, marginBottom: 8 }}>
                Frequently Asked Questions
              </h4>
              <div style={{ fontSize: 13, color: COLORS.mainText, marginBottom: 6, fontWeight: 600 }}>
                Q: What is YASS Gold?
              </div>
              <div style={{ fontSize: 12, color: COLORS.secondaryText, marginBottom: 12 }}>
                YASS Gold is a premier digital bullion application by YASS Group of Dubai, allowing institutional and retail clients to trade 24K 999.9 fine gold backed 1:1 by physical bullion vaulted in Dubai.
              </div>

              <div style={{ fontSize: 13, color: COLORS.mainText, marginBottom: 6, fontWeight: 600 }}>
                Q: Where is the physical gold stored?
              </div>
              <div style={{ fontSize: 12, color: COLORS.secondaryText, marginBottom: 12 }}>
                All physical bullion is stored in ultra-secure, fully insured Dubai vaults (Transguard / Brink's DMCC Vaults) and can be redeemed for physical doorstep delivery or lounge collection.
              </div>
            </div>

            <div style={{ padding: 14, background: COLORS.ivoryBg, borderRadius: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.mainText }}>Contact YASS Group</div>
              <div style={{ fontSize: 12, color: COLORS.secondaryText, marginTop: 4 }}>
                YASS Group of Dubai • Almas Tower, JLT / Deira Gold Souk, Dubai, UAE • contact@yassgroup.ae
              </div>
            </div>

            <button className="btn btn-secondary" style={{ marginTop: 16 }} onClick={() => setSubView('none')}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* About Us (Urbanspire Group) Subview */}
      {subView === 'about' && (
        <div className="modal-overlay" onClick={() => setSubView('none')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.mainText }}>About GoldPlus</h3>
              <button onClick={() => setSubView('none')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ textAlign: 'center', padding: '16px 0 20px' }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, background: COLORS.darkCharcoal, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Building size={28} color={COLORS.primaryGold} />
              </div>
              <h4 style={{ fontSize: 20, fontWeight: 700, color: COLORS.mainText }}>
                {BRAND.name}
              </h4>
              <p style={{ fontSize: 13, color: COLORS.primaryGold, fontWeight: 600, marginTop: 2 }}>
                {BRAND.descriptor}
              </p>
              <p style={{ fontSize: 12, color: COLORS.secondaryText, fontStyle: 'italic', marginTop: 4 }}>
                "{BRAND.tagline}"
              </p>
            </div>

            <div className="card" style={{ background: COLORS.ivoryBg, marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.mainText, marginBottom: 4 }}>
                Parent Group
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.primaryGold }}>
                {BRAND.parentCompany}
              </div>
              <p style={{ fontSize: 13, color: COLORS.secondaryText, marginTop: 8, lineHeight: 1.5 }}>
                {BRAND.attribution}. Headquartered in Dubai, UAE, YASS Group operates premier commodities, gold trading, and fintech wealth management solutions. YASS Gold and YASS Bullion bring the integrity of Dubai's gold trading legacy into an effortless, institutional-grade mobile experience.
              </p>
            </div>

            <div className="demo-banner">
              DUBAI BULLION DEMONSTRATION PROTOTYPE — YASS GROUP
            </div>

            <button className="btn btn-secondary" onClick={() => setSubView('none')}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Terms Subview */}
      {subView === 'terms' && (
        <div className="modal-overlay" onClick={() => setSubView('none')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.mainText }}>Terms & Conditions</h3>
              <button onClick={() => setSubView('none')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ fontSize: 13, color: COLORS.secondaryText, maxHeight: 300, overflowY: 'auto', lineHeight: 1.6, paddingRight: 8 }}>
              <p><strong>1. Prototype Nature:</strong> This mobile application interface is an interactive demonstration prototype built for YASS Group of Dubai.</p>
              <p style={{ marginTop: 8 }}><strong>2. Bullion & Reference Rates:</strong> Indicative gold rates (AED {DEMO_GOLD_RATE.toFixed(2)}/g) reflect illustrative Dubai Gold Souk / DMCC bullion pricing. No real monetary transactions or bullion transfers are executed in prototype mode.</p>
              <p style={{ marginTop: 8 }}><strong>3. Vaulting & Custody:</strong> Conceptual architecture features Brink's DMCC and Transguard Dubai high-security vaulting.</p>
            </div>
            <button className="btn btn-secondary" style={{ marginTop: 16 }} onClick={() => setSubView('none')}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Privacy Subview */}
      {subView === 'privacy' && (
        <div className="modal-overlay" onClick={() => setSubView('none')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.mainText }}>Privacy Policy</h3>
              <button onClick={() => setSubView('none')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ fontSize: 13, color: COLORS.secondaryText, lineHeight: 1.6 }}>
              <p>This prototype stores demonstration state locally within your web browser (via localStorage). No personal financial credentials or biometric information are collected or transmitted to external servers.</p>
            </div>
            <button className="btn btn-secondary" style={{ marginTop: 16 }} onClick={() => setSubView('none')}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.mainText, marginBottom: 8 }}>
              Log out of {BRAND.name}?
            </h3>
            <p style={{ fontSize: 14, color: COLORS.secondaryText, marginBottom: 20 }}>
              You will return to the onboarding splash screen.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-secondary" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Demo Modal */}
      {showResetModal && (
        <div className="modal-overlay" onClick={() => setShowResetModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.mainText, marginBottom: 8 }}>
              Reset Prototype Data?
            </h3>
            <p style={{ fontSize: 14, color: COLORS.secondaryText, marginBottom: 20 }}>
              This will restore holdings back to initial 0.5321g and reset SIP and order history. Perfect for presenting a fresh demo run.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
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
    </div>
  );
};

export default ProfileScreen;

// ============================================
// OGold Wallet — App Shell with 5 Core Super App Tabs
// Home/Wallet, OGold Card, Earn, Rewards, Profile
// App Store: id6504926022
// ============================================

import React from 'react';
import {
  Wallet,
  CreditCard,
  TrendingUp,
  Gift,
  User,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import type { Screen } from '../types';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { state, navigate } = useApp();
  const { currentScreen } = state;

  const isAuthScreen = currentScreen === 'splash' || currentScreen === 'signup';
  const isCurrent = (screen: Screen) => currentScreen === screen;

  return (
    <div className="app-viewport">
      <div className="app-container">
        {/* Scrollable Screen Content */}
        <main className="app-main">
          {children}
        </main>

        {/* 5 OGold Super App Tabs */}
        {!isAuthScreen && (
          <nav className="app-bottom-nav">
            {/* 1. Wallet / Home */}
            <button
              className={`nav-tab-item ${isCurrent('dashboard') || isCurrent('buy') || isCurrent('sell') ? 'active' : ''}`}
              onClick={() => navigate('dashboard')}
            >
              <Wallet size={19} className="nav-icon" strokeWidth={isCurrent('dashboard') ? 2.4 : 1.8} />
              <span>Wallet</span>
            </button>

            {/* 2. OGold Mastercard */}
            <button
              className={`nav-tab-item ${isCurrent('card') ? 'active' : ''}`}
              onClick={() => navigate('card')}
            >
              <CreditCard size={19} className="nav-icon" strokeWidth={isCurrent('card') ? 2.4 : 1.8} />
              <span>Card</span>
            </button>

            {/* 3. Earn (Wakala & SIP) */}
            <button
              className={`nav-tab-item ${isCurrent('lease') || isCurrent('sip') ? 'active' : ''}`}
              onClick={() => navigate('lease')}
            >
              <span className="nav-badge">4.8%</span>
              <TrendingUp size={19} className="nav-icon" strokeWidth={isCurrent('lease') ? 2.4 : 1.8} />
              <span>Earn</span>
            </button>

            {/* 4. Rewards & Lifestyle */}
            <button
              className={`nav-tab-item ${isCurrent('rewards') ? 'active' : ''}`}
              onClick={() => navigate('rewards')}
            >
              {state.user?.spinsAvailable ? <span className="nav-badge">SPIN</span> : null}
              <Gift size={19} className="nav-icon" strokeWidth={isCurrent('rewards') ? 2.4 : 1.8} />
              <span>Rewards</span>
            </button>

            {/* 5. Profile */}
            <button
              className={`nav-tab-item ${isCurrent('profile') || isCurrent('portfolio') || isCurrent('vaultProof') ? 'active' : ''}`}
              onClick={() => navigate('profile')}
            >
              <User size={19} className="nav-icon" strokeWidth={isCurrent('profile') ? 2.4 : 1.8} />
              <span>Profile</span>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default AppShell;

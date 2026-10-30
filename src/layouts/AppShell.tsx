// ============================================
// YASS Gold & Bullion — Executive App Shell
// Clean White + Gold Minimalist Layout
// ============================================

import React from 'react';
import {
  Home,
  PlusCircle,
  Package,
  ShieldCheck,
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

        {/* 5 Clean Professional Navigation Tabs */}
        {!isAuthScreen && (
          <nav className="app-bottom-nav">
            {/* 1. Home */}
            <button
              className={`nav-tab-item ${isCurrent('dashboard') ? 'active' : ''}`}
              onClick={() => navigate('dashboard')}
            >
              <Home size={19} strokeWidth={isCurrent('dashboard') ? 2.3 : 1.75} />
              <span>Home</span>
            </button>

            {/* 2. Buy Gold */}
            <button
              className={`nav-tab-item ${isCurrent('buy') ? 'active' : ''}`}
              onClick={() => navigate('buy')}
            >
              <PlusCircle size={19} strokeWidth={isCurrent('buy') ? 2.3 : 1.75} />
              <span>Buy Gold</span>
            </button>

            {/* 3. Physical Bullion Delivery (Core Client Feature) */}
            <button
              className={`nav-tab-item ${isCurrent('delivery') ? 'active' : ''}`}
              onClick={() => navigate('delivery')}
            >
              <Package size={19} strokeWidth={isCurrent('delivery') ? 2.3 : 1.75} />
              <span>Delivery</span>
            </button>

            {/* 4. Vault & Custody Certificate */}
            <button
              className={`nav-tab-item ${isCurrent('vaultProof') || isCurrent('portfolio') ? 'active' : ''}`}
              onClick={() => navigate('vaultProof')}
            >
              <ShieldCheck size={19} strokeWidth={isCurrent('vaultProof') || isCurrent('portfolio') ? 2.3 : 1.75} />
              <span>Vault</span>
            </button>

            {/* 5. Account / Profile */}
            <button
              className={`nav-tab-item ${isCurrent('profile') || isCurrent('settings') ? 'active' : ''}`}
              onClick={() => navigate('profile')}
            >
              <User size={19} strokeWidth={isCurrent('profile') || isCurrent('settings') ? 2.3 : 1.75} />
              <span>Account</span>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default AppShell;

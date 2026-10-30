// ============================================
// YASS Gold & YASS Bullion — Executive App Shell
// A product by YASS Group, Dubai
// Clean, authentic mobile-first layout
// ============================================

import React from 'react';
import {
  Home,
  Percent,
  Target,
  ShieldCheck,
  PieChart,
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

        {/* Clean, authentic bottom navigation */}
        {!isAuthScreen && (
          <nav className="app-bottom-nav">
            <button
              className={`nav-tab-item ${isCurrent('dashboard') ? 'active' : ''}`}
              onClick={() => navigate('dashboard')}
            >
              <Home size={19} className="nav-icon" strokeWidth={isCurrent('dashboard') ? 2.2 : 1.75} />
              <span>Home</span>
            </button>

            <button
              className={`nav-tab-item ${isCurrent('lease') ? 'active' : ''}`}
              onClick={() => navigate('lease')}
            >
              <span className="nav-badge">5.2%</span>
              <Percent size={19} className="nav-icon" strokeWidth={isCurrent('lease') ? 2.2 : 1.75} />
              <span>Gold+</span>
            </button>

            <button
              className={`nav-tab-item ${isCurrent('goals') ? 'active' : ''}`}
              onClick={() => navigate('goals')}
            >
              <Target size={19} className="nav-icon" strokeWidth={isCurrent('goals') ? 2.2 : 1.75} />
              <span>Goals</span>
            </button>

            <button
              className={`nav-tab-item ${isCurrent('vaultProof') || isCurrent('delivery') ? 'active' : ''}`}
              onClick={() => navigate('vaultProof')}
            >
              <ShieldCheck size={19} className="nav-icon" strokeWidth={isCurrent('vaultProof') || isCurrent('delivery') ? 2.2 : 1.75} />
              <span>Vault</span>
            </button>

            <button
              className={`nav-tab-item ${isCurrent('portfolio') || isCurrent('transactions') ? 'active' : ''}`}
              onClick={() => navigate('portfolio')}
            >
              <PieChart size={19} className="nav-icon" strokeWidth={isCurrent('portfolio') || isCurrent('transactions') ? 2.2 : 1.75} />
              <span>Portfolio</span>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default AppShell;

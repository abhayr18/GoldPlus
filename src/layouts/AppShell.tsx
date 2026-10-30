// ============================================
// YASS Gold & YASS Bullion — App Shell & Responsive Navigation
// A product by YASS Group, Dubai
// ============================================

import React from 'react';
import {
  Home,
  PieChart,
  RefreshCw,
  User,
  ArrowDownCircle,
  ArrowUpCircle,
  Package,
  History,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { BrandLogo } from '../components/BrandLogo';
import { BRAND, COLORS } from '../constants';
import type { Screen } from '../types';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { state, navigate, resetDemo, showToast } = useApp();
  const { currentScreen } = state;

  // Onboarding screens don't show the persistent shell navigation
  const isAuthScreen = currentScreen === 'splash' || currentScreen === 'signup';

  if (isAuthScreen) {
    return <div className="app-shell">{children}</div>;
  }

  // Active mapping for sidebar and bottom nav
  const isCurrent = (screen: Screen) => currentScreen === screen;

  return (
    <div className="app-shell with-sidebar">
      {/* ============================================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ============================================= */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <BrandLogo size="md" light />
          <div className="sidebar-brand-desc">{BRAND.descriptor}</div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`sidebar-nav-item ${isCurrent('dashboard') ? 'active' : ''}`}
            onClick={() => navigate('dashboard')}
          >
            <Home size={18} />
            <span>Home</span>
          </button>

          <button
            className={`sidebar-nav-item ${isCurrent('portfolio') ? 'active' : ''}`}
            onClick={() => navigate('portfolio')}
          >
            <PieChart size={18} />
            <span>My Portfolio</span>
          </button>

          <button
            className={`sidebar-nav-item ${isCurrent('sip') ? 'active' : ''}`}
            onClick={() => navigate('sip')}
          >
            <RefreshCw size={18} />
            <span>Gold SIP</span>
          </button>

          <button
            className={`sidebar-nav-item ${isCurrent('buy') ? 'active' : ''}`}
            onClick={() => navigate('buy')}
          >
            <ArrowDownCircle size={18} />
            <span>Buy Gold</span>
          </button>

          <button
            className={`sidebar-nav-item ${isCurrent('sell') ? 'active' : ''}`}
            onClick={() => navigate('sell')}
          >
            <ArrowUpCircle size={18} />
            <span>Sell Gold</span>
          </button>

          <button
            className={`sidebar-nav-item ${isCurrent('delivery') ? 'active' : ''}`}
            onClick={() => navigate('delivery')}
          >
            <Package size={18} />
            <span>Physical Delivery</span>
          </button>

          <button
            className={`sidebar-nav-item ${isCurrent('transactions') ? 'active' : ''}`}
            onClick={() => navigate('transactions')}
          >
            <History size={18} />
            <span>Transaction History</span>
          </button>

          <button
            className={`sidebar-nav-item ${isCurrent('profile') ? 'active' : ''}`}
            onClick={() => navigate('profile')}
          >
            <User size={18} />
            <span>Profile & Settings</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <button
            onClick={() => {
              resetDemo();
              showToast('Demo data restored to initial state', 'info');
              navigate('dashboard');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'none',
              border: 'none',
              color: COLORS.primaryGold,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: 10,
              padding: 0,
            }}
          >
            <RotateCcw size={14} />
            <span>Reset Demo Data</span>
          </button>
          <div>{BRAND.attribution}</div>
        </div>
      </aside>

      {/* ============================================= */}
      {/* MAIN CONTENT WORKSPACE */}
      {/* ============================================= */}
      <main className="main-content">
        {children}

        {/* ============================================= */}
        {/* MOBILE BOTTOM NAVIGATION */}
        {/* ============================================= */}
        <nav className="bottom-nav">
          <button
            className={`bottom-nav-item ${isCurrent('dashboard') ? 'active' : ''}`}
            onClick={() => navigate('dashboard')}
          >
            <Home />
            <span>Home</span>
          </button>

          <button
            className={`bottom-nav-item ${isCurrent('portfolio') ? 'active' : ''}`}
            onClick={() => navigate('portfolio')}
          >
            <PieChart />
            <span>Portfolio</span>
          </button>

          <button
            className={`bottom-nav-item ${isCurrent('sip') ? 'active' : ''}`}
            onClick={() => navigate('sip')}
          >
            <RefreshCw />
            <span>SIP</span>
          </button>

          <button
            className={`bottom-nav-item ${isCurrent('profile') ? 'active' : ''}`}
            onClick={() => navigate('profile')}
          >
            <User />
            <span>More</span>
          </button>
        </nav>
      </main>
    </div>
  );
};

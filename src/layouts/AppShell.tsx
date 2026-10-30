// ============================================
// YASS Gold & YASS Bullion — Mobile-First App Shell
// Modeled after Gullak's clean mobile design & SafeGold vaulting
// A product by YASS Group, Dubai
// ============================================

import React, { useState, useEffect } from 'react';
import {
  Home,
  Percent,
  Target,
  ShieldCheck,
  PieChart,
  RotateCcw,
  Wifi,
  Battery,
  Signal,
  Maximize2,
  Smartphone,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { BRAND } from '../constants';
import type { Screen } from '../types';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { state, navigate, resetDemo, showToast } = useApp();
  const { currentScreen } = state;

  const [currentTime, setCurrentTime] = useState<string>('9:41');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours % 12 || 12}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const isAuthScreen = currentScreen === 'splash' || currentScreen === 'signup';
  const isCurrent = (screen: Screen) => currentScreen === screen;

  // Toggle desktop container between mobile phone frame and full width
  const toggleFrame = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div className="desktop-viewport-wrapper">
      {/* ============================================= */}
      {/* DESKTOP TOP BAR (Only visible on larger screens) */}
      {/* ============================================= */}
      <header className="desktop-top-bar">
        <div className="desktop-badge">
          <span className="desktop-badge-dot" />
          <span>{BRAND.name} • {BRAND.parentCompany} (Gullak Mobile UI)</span>
        </div>

        <div className="desktop-actions">
          <button
            onClick={() => {
              resetDemo();
              showToast('Demo state reset to initial', 'info');
              navigate('dashboard');
            }}
            className="desktop-btn-reset"
            title="Reset demo data"
          >
            <RotateCcw size={13} />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={toggleFrame}
            className="desktop-btn-reset"
            title={isFullscreen ? 'Switch to Phone Mockup' : 'Switch to Full Viewport'}
          >
            {isFullscreen ? <Smartphone size={13} /> : <Maximize2 size={13} />}
            <span>{isFullscreen ? 'Phone Frame' : 'Full Width'}</span>
          </button>
        </div>
      </header>

      {/* ============================================= */}
      {/* MOBILE DEVICE FRAME (Centered on desktop, full on phone) */}
      {/* ============================================= */}
      <div
        className="mobile-device-frame"
        style={
          isFullscreen
            ? {
                maxWidth: '640px',
                borderRadius: '24px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              }
            : undefined
        }
      >
        {/* iOS-Style Status Bar */}
        <div className="phone-status-bar">
          <span style={{ minWidth: 32 }}>{currentTime}</span>
          <div className="phone-island" />
          <div className="phone-status-icons">
            <Signal size={12} strokeWidth={2.5} />
            <Wifi size={12} strokeWidth={2.5} />
            <Battery size={14} strokeWidth={2.5} />
          </div>
        </div>

        {/* Scrollable Screen Canvas */}
        <div className="phone-scroll-area">
          {children}
        </div>

        {/* ============================================= */}
        {/* GULLAK MOBILE BOTTOM NAVIGATION */}
        {/* ============================================= */}
        {!isAuthScreen && (
          <nav className="mobile-bottom-nav">
            <button
              className={`mobile-nav-tab ${isCurrent('dashboard') ? 'active' : ''}`}
              onClick={() => navigate('dashboard')}
            >
              <div className="nav-icon-wrap">
                <Home size={20} strokeWidth={isCurrent('dashboard') ? 2.5 : 2} />
              </div>
              <span>Home</span>
            </button>

            {/* Gullak Signature: Gold+ (5.2% Lease Yield) */}
            <button
              className={`mobile-nav-tab ${isCurrent('lease') ? 'active' : ''}`}
              onClick={() => navigate('lease')}
            >
              <span className="nav-badge-pill">5.2%</span>
              <div className="nav-icon-wrap">
                <Percent size={20} strokeWidth={isCurrent('lease') ? 2.5 : 2} />
              </div>
              <span>Gold+</span>
            </button>

            {/* Gullak Signature: Daily Savings Goals */}
            <button
              className={`mobile-nav-tab ${isCurrent('goals') ? 'active' : ''}`}
              onClick={() => navigate('goals')}
            >
              <div className="nav-icon-wrap">
                <Target size={20} strokeWidth={isCurrent('goals') ? 2.5 : 2} />
              </div>
              <span>Goals</span>
            </button>

            {/* SafeGold Signature: DMCC Vault Proof & Physical Delivery */}
            <button
              className={`mobile-nav-tab ${isCurrent('vaultProof') || isCurrent('delivery') ? 'active' : ''}`}
              onClick={() => navigate('vaultProof')}
            >
              <div className="nav-icon-wrap">
                <ShieldCheck size={20} strokeWidth={isCurrent('vaultProof') || isCurrent('delivery') ? 2.5 : 2} />
              </div>
              <span>Vault</span>
            </button>

            {/* Portfolio & History */}
            <button
              className={`mobile-nav-tab ${isCurrent('portfolio') || isCurrent('transactions') ? 'active' : ''}`}
              onClick={() => navigate('portfolio')}
            >
              <div className="nav-icon-wrap">
                <PieChart size={20} strokeWidth={isCurrent('portfolio') || isCurrent('transactions') ? 2.5 : 2} />
              </div>
              <span>Portfolio</span>
            </button>
          </nav>
        )}

        {/* iOS Home Indicator Bar */}
        <div className="phone-home-indicator" />
      </div>
    </div>
  );
};

export default AppShell;

// ============================================
// YASS Gold & YASS Bullion — Main Application Router
// A product by YASS Group, Dubai
// ============================================

import React from 'react';
import { AppProvider, useApp } from './components/AppProvider';
import { AppShell } from './layouts/AppShell';

import SplashScreen from './screens/SplashScreen';
import SignupScreen from './screens/SignupScreen';
import DashboardScreen from './screens/DashboardScreen';
import BuyGoldScreen from './screens/BuyGoldScreen';
import SellGoldScreen from './screens/SellGoldScreen';
import SIPScreen from './screens/SIPScreen';
import PortfolioScreen from './screens/PortfolioScreen';
import TransactionHistoryScreen from './screens/TransactionHistoryScreen';
import PhysicalDeliveryScreen from './screens/PhysicalDeliveryScreen';
import ProfileScreen from './screens/ProfileScreen';
import GoldPriceDetailScreen from './screens/GoldPriceDetailScreen';

const ScreenRouter: React.FC = () => {
  const { state } = useApp();
  const { currentScreen } = state;

  switch (currentScreen) {
    case 'splash':
      return <SplashScreen />;
    case 'signup':
      return <SignupScreen />;
    case 'dashboard':
      return <DashboardScreen />;
    case 'buy':
      return <BuyGoldScreen />;
    case 'sell':
      return <SellGoldScreen />;
    case 'sip':
      return <SIPScreen />;
    case 'portfolio':
      return <PortfolioScreen />;
    case 'transactions':
    case 'transactionDetail':
      return <TransactionHistoryScreen />;
    case 'delivery':
      return <PhysicalDeliveryScreen />;
    case 'profile':
      return <ProfileScreen />;
    case 'goldPriceDetail':
      return <GoldPriceDetailScreen />;
    default:
      return <DashboardScreen />;
  }
};

export function App() {
  return (
    <AppProvider>
      <AppShell>
        <ScreenRouter />
      </AppShell>
    </AppProvider>
  );
}

export default App;

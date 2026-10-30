// ============================================
// OGold Wallet - Main Application Router
// The Precious Metals & Lifestyle Super App (Dubai, UAE)
// App Store ID: 6504926022
// ============================================

import React from 'react';
import { AppProvider, useApp } from './components/AppProvider';
import { AppShell } from './layouts/AppShell';

import SplashScreen from './screens/SplashScreen';
import SignupScreen from './screens/SignupScreen';
import DashboardScreen from './screens/DashboardScreen';
import CardScreen from './screens/CardScreen';
import RewardsScreen from './screens/RewardsScreen';
import BuyGoldScreen from './screens/BuyGoldScreen';
import SellGoldScreen from './screens/SellGoldScreen';
import SIPScreen from './screens/SIPScreen';
import PortfolioScreen from './screens/PortfolioScreen';
import TransactionHistoryScreen from './screens/TransactionHistoryScreen';
import PhysicalDeliveryScreen from './screens/PhysicalDeliveryScreen';
import ProfileScreen from './screens/ProfileScreen';
import GoldPriceDetailScreen from './screens/GoldPriceDetailScreen';
import GoldLeaseScreen from './screens/GoldLeaseScreen';
import GiftGoldScreen from './screens/GiftGoldScreen';
import SavingsGoalScreen from './screens/SavingsGoalScreen';
import VaultCertificateScreen from './screens/VaultCertificateScreen';

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
    case 'card':
      return <CardScreen />;
    case 'rewards':
      return <RewardsScreen />;
    case 'earn':
    case 'lease':
      return <GoldLeaseScreen />;
    case 'buy':
      return <BuyGoldScreen />;
    case 'sell':
      return <SellGoldScreen />;
    case 'sip':
      return <SIPScreen />;
    case 'gift':
      return <GiftGoldScreen />;
    case 'goals':
      return <SavingsGoalScreen />;
    case 'vaultProof':
      return <VaultCertificateScreen />;
    case 'portfolio':
      return <PortfolioScreen />;
    case 'transactions':
    case 'transactionDetail':
      return <TransactionHistoryScreen />;
    case 'delivery':
      return <PhysicalDeliveryScreen />;
    case 'profile':
    case 'settings':
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

# GoldPlus — Digital Gold Mobile App Prototype
> **A product prototype by Urbanspire Group**  
> Temporary Consumer Brand: **GoldPlus**  
> Tagline: *Save Today. Secure Tomorrow.*  
> Descriptor: *Digital Gold & Savings*

---

## Overview

**GoldPlus** is a high-fidelity, interactive digital gold fintech prototype designed for Indian consumers, inspired by leading platforms such as Gullak and SafeGold. Built as an end-to-end interactive client application, it demonstrates the full customer journey from onboarding to purchasing 24K digital gold, setting up a recurring Gold SIP, monitoring portfolio growth, selling gold, and requesting certified physical gold bullion delivery.

> **DEMO DATA NOTICE**: All gold prices, holdings, transaction IDs, payment methods, and delivery statuses in this prototype are simulated. No actual financial debits, bank transfers, or gold bullion custody operations are executed.

---

## Key Features & Screen Catalog

The prototype faithfully implements all ten reference screens from the design specification:

1. **Splash / Onboarding (`SplashScreen.tsx`)**:
   - Dark charcoal luxury background with geometric gold emblem and gold wordmark.
   - Core value proposition: *"Digital Gold for a Brighter Future"*.
   - Feature pills: *Buy Gold*, *Sell Gold*, *Gold SIP*, *Redeem Gold*.
   - Attributed footer: *A product by Urbanspire Group*.

2. **Sign Up / Registration (`SignupScreen.tsx`)**:
   - Clean Indian fintech onboarding form.
   - Validates full name and Indian mobile numbers (+91 with 10 digits).
   - Social login demonstration controls & Terms agreement.

3. **Home / Dashboard (`DashboardScreen.tsx`)**:
   - Time-aware user greeting (*Good Morning, Rahul 👋*).
   - Live gold balance card displaying 24K digital gold holdings (0.5321 g / ₹12,460).
   - Quick-action grid (*Buy Gold*, *Sell Gold*, *Start SIP*, *Redeem Gold*).
   - Gold SIP promotional banner (*Build your future, one gram at a time*).
   - Live Gold Price quote card with green trendline (Illustrative rate: ₹7,382/g).
   - Recent activity list with real-time updates.

4. **Buy Gold (`BuyGoldScreen.tsx`)**:
   - Dual-input mode: By Amount (₹) or By Weight (g) with automatic cross-calculation.
   - Quick amount chips (₹1,000, ₹2,000, ₹5,000, ₹10,000).
   - Payment method selection (UPI with instant check indicator, Bank Account).
   - Order review with breakdown, followed by simulated purchase confirmation and automatic vault balance update.

5. **Sell Gold (`SellGoldScreen.tsx`)**:
   - Real-time vault balance check and valuation.
   - Percentage sell presets (25%, 50%, 75%, Max).
   - Instant expected payout calculation with bank account credit confirmation.

6. **Gold SIP (`SIPScreen.tsx`)**:
   - Recurring frequencies: Weekly, Monthly, Quarterly.
   - Flexible installment selector with quick chips.
   - Full SIP management dashboard: view active plans, next debit dates, pause/resume, and cancellation modal.

7. **My Portfolio (`PortfolioScreen.tsx`)**:
   - Total Gold, Current Valuation, Invested Amount, and Unrealised Gain/Loss (+11.2%).
   - Visual allocation donut chart (Digital Gold vs. SIP-accumulated Gold).
   - Holdings breakdown and detailed transaction list.

8. **Transaction History (`TransactionHistoryScreen.tsx`)**:
   - Filter pills (*All*, *Buy*, *Sell*, *SIP*).
   - Chronological ledger with positive (green) and negative (red) quantity indicators.
   - Interactive transaction modal with full details and reference ID copy capability.

9. **Physical Gold Delivery (`PhysicalDeliveryScreen.tsx`)**:
   - Catalog of 24K 99.9% pure certified Coins and Bars (1g, 5g, 10g, 20g).
   - Real-time vault balance validation before redemption.
   - Doorstep delivery address form with PIN code validation.
   - Interactive 4-step delivery status tracking timeline (*Request Created → Processing → Dispatched → Doorstep Delivery*).

10. **Profile & More (`ProfileScreen.tsx`)**:
    - User avatar and verified status badge for Rahul Sharma.
    - KYC Verification status (Simulated PAN & Aadhaar e-KYC).
    - Linked bank accounts (HDFC Bank).
    - Notification preferences (Price alerts, SIP reminders).
    - Help & Support FAQs with contact form.
    - About Us with official Urbanspire Group parent company attribution.
    - Terms & Conditions and Privacy Policy.
    - **Reset Demo Data** button to quickly restore baseline data before presentations.

---

## Technology Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8
- **Icons**: Lucide React
- **Typography**: Inter (Google Fonts)
- **Styling**: Tailored Custom CSS Design System with exact token palette:
  - Primary Gold: `#E8B63F`
  - Secondary Gold: `#F4D681`
  - Dark Charcoal: `#171A1D`
  - Deep Navy: `#17232D`
  - Ivory Background: `#F7F5EF`
  - Positive Green: `#16865B`
- **State & Persistence**: React Context API + LocalStorage state persistence

---

## Setup & Running Locally

### 1. Prerequisites
- Node.js (v18.0 or newer recommended)
- npm (v9.0 or newer)

### 2. Installation
```bash
# Navigate to the project root
cd d:\GOLD

# Install dependencies
npm install
```

### 3. Development Server
Start the local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Production Build
To create a production-ready bundle:
```bash
npm run build
```
The optimized static build will be generated in the `dist/` directory.

---

## Demo Test Journeys

For stakeholder presentations, the prototype includes pre-configured journeys:

- **Journey A (Onboarding)**: Splash screen → Tap "Get Started" → Enter mobile number → Continue to Dashboard.
- **Journey B (Buy Gold)**: Dashboard → Quick Action "Buy Gold" → Select ₹1,000 → Proceed to Pay → Confirm Demo Purchase → Observe updated balance (₹13,460).
- **Journey C (Sell Gold)**: Dashboard → "Sell Gold" → Choose "25%" → Review → Confirm Sale → Observe vault reduction and transaction ledger entry.
- **Journey D (Gold SIP)**: Dashboard → Promo Card "Start Saving" → Choose Monthly ₹1,000 → Confirm SIP → View active SIP card with pause/resume controls.
- **Journey E (Portfolio & Ledger)**: Bottom nav "Portfolio" → Switch between Holdings Breakdown and Transactions → Tap any row for full reference modal.
- **Journey F (Physical Delivery)**: Dashboard → Quick Action "Redeem Gold" → Select 1g 24K Coin → Enter Address → Place Order → View 4-stage tracking timeline.
- **Journey G (Brand Attribution & Reset)**: Bottom nav "More" → "About Us" to verify Urbanspire Group attribution → "Reset Demo Data" to restore pristine presentation state.

# YASS Gold & YASS Bullion — Dubai Digital Gold Mobile App Prototype
> **A product prototype by YASS Group of Dubai**  
> Brand: **YASS Gold** • **YASS Bullion**  
> Tagline: *The Gold Standard of Dubai. Save & Invest with Confidence.*  
> Descriptor: *Dubai Digital Gold & Physical Bullion*  
> Currency: **AED (United Arab Emirates Dirham)**

---

## Overview

**YASS Gold** is an ultra-luxury, institutional-grade digital gold and bullion application prototype designed for **YASS Group of Dubai**. Built for both UAE residents and global wealth investors, it enables clients to buy 24K 999.9 fine digital gold backed by physical bullion in certified Dubai vaults (Transguard & Brink's DMCC), schedule automated recurring Gold SIPs, track real-time Dubai Gold Souk market rates, and order physical delivery or lounge pickup of Dubai Good Delivery (DGD) minted bullion bars and coins.

> **DEMO DATA NOTICE**: All gold prices, holdings, transaction IDs, payment methods, and delivery statuses in this prototype are simulated for stakeholder review and demonstration. No actual financial debits, bank transfers, or gold bullion custody operations are executed.

---

## Key Features & Screen Catalog

The prototype implements all 10 key screens tailored to the Dubai bullion market:

1. **Screen 1 — Splash / Onboarding (`SplashScreen.tsx`)**:
   - Dark luxury charcoal background (`#171A1D`) with Dubai gold shield emblem and glow.
   - Core proposition: *"Dubai Digital Gold for a Brighter Future"*.
   - Feature pills: *Buy Gold*, *Sell Gold*, *Gold SIP*, *Redeem Bullion*.
   - Attributed footer: *A product by YASS Group, Dubai*.

2. **Screen 2 — Sign Up / Registration (`SignupScreen.tsx`)**:
   - UAE-first onboarding form with `+971` mobile prefix.
   - Real-time validation for UAE mobile numbers (`5X XXX XXXX`).
   - Integration hooks for UAE PASS and decorative social sign-in.

3. **Screen 3 — Home / Dashboard (`DashboardScreen.tsx`)**:
   - Personalized time-aware greeting (*"Good Morning, Tariq 👋"*).
   - High-contrast gold balance card showing 24K 999.9 Dubai Fine Gold holdings (`39.1209 g` / `AED 12,460.00`).
   - Quick-action grid (*Buy Gold*, *Sell Gold*, *Gold SIP*, *Redeem Bullion*).
   - YASS Bullion promotional banner (*"Build your future, one gram at a time"*).
   - Live Dubai Gold Rate quote card with green trendline (`AED 318.50/g` DMCC benchmark).
   - Recent activity ledger.

4. **Screen 4 — Buy Gold (`BuyGoldScreen.tsx`)**:
   - Dual-input mode: By Amount (AED) or By Weight (g) with instant cross-conversion.
   - Quick amount chips (AED 500, AED 1,000, AED 2,500, AED 5,000, AED 10,000).
   - UAE Payment methods: **Aani Instant Pay (UAE IPP)**, **Emirates NBD Bank**, **Apple Pay / Visa / Mastercard**.
   - Multi-step flow: Amount Input → Order Review Breakdown → Success Screen → Immediate vault holdings update.

5. **Screen 5 — Sell Gold (`SellGoldScreen.tsx`)**:
   - Live vault balance check and Dubai market valuation.
   - Percentage sell presets (25%, 50%, 75%, Max).
   - Instant expected payout calculation in AED with transfer to UAE Bank (Emirates NBD).

6. **Screen 6 — Gold SIP (`SIPScreen.tsx`)**:
   - Recurring frequencies: Weekly, Monthly, Quarterly.
   - Flexible AED installment selector with quick chips.
   - Full SIP management dashboard: view active plans, next debit dates, pause/resume, and cancellation modal.

7. **Screen 7 — My Portfolio (`PortfolioScreen.tsx`)**:
   - Total Gold, Current Valuation in AED, Invested Amount, and Unrealised Gain/Loss (+11.2%).
   - Visual allocation donut chart (Digital Gold vs. SIP-accumulated Bullion).
   - Asset breakdown and chronological transaction ledger.

8. **Screen 8 — Transaction History (`TransactionHistoryScreen.tsx`)**:
   - Filter pills (*All*, *Buy*, *Sell*, *SIP*).
   - Colored debit/credit indicators (positive green for buys/SIPs, negative red for sales/redemptions).
   - Interactive transaction modal with full details and reference ID copy capability.

9. **Screen 9 — Physical Bullion Delivery (`PhysicalDeliveryScreen.tsx`)**:
   - Catalog of 24K 999.9 pure certified Coins and Bars (1g, 5g, 10g, 20g, 50g, 100g).
   - Real-time vault balance validation before redemption.
   - Doorstep delivery address form with UAE Emirates and PO Box validation.
   - Transguard / Brink's armoured courier logistics with 4-step delivery status tracking timeline (*Request Created → Processing & Minting → Dispatched → Doorstep Delivery*).

10. **Screen 10 — Profile & More (`ProfileScreen.tsx`)**:
    - User avatar and verified badge for Tariq Al Mansoori.
    - Simulated UAE PASS & Emirates ID verification status.
    - Linked bank accounts (Emirates NBD Dubai, First Abu Dhabi Bank - FAB).
    - Notification preferences (Dubai rate alerts, SIP reminders).
    - Help & Support FAQs with YASS Group Dubai contact details (`contact@yassgroup.ae`).
    - About Us modal with parent company attribution (**YASS Group of Dubai**).
    - **Reset Demo Data** button to quickly restore baseline data before stakeholder meetings.

11. **Live Dubai Gold Rate Detail (`GoldPriceDetailScreen.tsx`)**:
    - Interactive timeframe chart (1D, 1W, 1M, 1Y), Dubai Good Delivery (DGD) standards, 0% UAE VAT investment precious metal specifications, and instant buy/sell shortcuts.

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
- **State & Persistence**: React Context API + LocalStorage state persistence (`yass_gold_state`)

---

## Setup & Running Locally

```bash
# Navigate to the project directory
cd d:\GOLD

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
```

Open your browser at `http://localhost:5173`.

# YASS Bullion Dubai

> **Institutional Precious Metals Custody & Physical Delivery Platform**  
> **Brand**: YASS Bullion (A product by YASS Group, Dubai)  
> **Depository**: Brink's Global Services (DMCC), Almas Tower, JLT, Dubai  
> **Auditor**: BDO Chartered Accountants Dubai  
> **Purity**: Dubai Good Delivery (DGD) 999.9 Fine Gold (24 Karat)  
> **Currency**: AED (United Arab Emirates Dirham)

---

## Overview

**YASS Bullion** is a production-grade precious metals web application and platform designed for direct digital acquisition, vaulted custody, and doorstep physical delivery of 24K 999.9 fine gold across Dubai and the United Arab Emirates.

The application combines two complementary experiences:
1. **Apple-Restrained Marketing Experience**: A calm, product-focused marketing front with system typography, generous whitespace, warm neutral background (`#F5F5F7`), and a restrained metallic gold accent (`#8A6718`).
2. **Native Mobile Web App Dashboard**: An authentic mobile-first client interface for digital gold accumulation, live spot rate tracking, vaulted depository certificates, Wakala yields, and armoured courier deliveries.

---

## Core Product Capabilities

### 1. 24K 999.9 Digital Gold Accumulation
* Fractional purchases starting from **AED 1** with 0% UAE VAT.
* Real-time benchmark spot pricing linked directly to DMCC and Dubai Gold Souk rates.
* Instant liquid sell-back with direct payout to UAE bank accounts (Emirates NBD, FAB, ADCB).

### 2. Physical Bullion Minting & Armoured Delivery
* Mint digital allocations into stamped physical 24K bars and coins (1g, 5g, 10g, 20g, 50g, 100g, 1kg).
* Tamper-proof assay certicards with individual QR provenance codes.
* Fully insured doorstep delivery across all seven Emirates handled by Transguard Armoured Logistics.

### 3. Institutional Vaulting & Live Audit Certificates
* Depository custody at Brink's DMCC facility in Almas Tower, Jumeirah Lakes Towers.
* Real-time verifiable digital Vault Certificates detailing client bar serial numbers, purity marks, and vault locations.
* On-demand escorted audit appointment scheduling.

### 4. Systematic Savings & Wakala Yield
* Daily, weekly, and monthly recurring gold savings (SIP) from AED 20.
* Shariah-compliant Wakala yield pools earning up to 4.8% APR in physical gold weight.
* Goal-oriented savings trackers (e.g., Wedding, Hajj, Sovereign Reserve).

---

## Design System & Standards

* **Color Palette**:
  * Page Ground: Warm Neutral (`#F5F5F7`)
  * Elevated Surfaces: Pure White (`#FFFFFF`)
  * Primary Accent: Restrained Bullion Gold (`#8A6718` / `#C59B27`)
  * Typography: High-contrast Dark Slate (`#1D1D1F` / `#0F172A`) and Cool Grey (`#64748B`)
  * Success Indicators: Clean Mint Emerald (`#059669` / `#ECFDF5`)
* **Typography**: Clean native system font stack (`-apple-system`, `BlinkMacSystemFont`, `SF Pro Display`, `Segoe UI`, `Roboto`).
* **Icons & App Assets**:
  * Vector SVG Favicon (`public/favicon.svg`): 24K Dubai bullion squircle with ingot monogram and hallmark.
  * iOS Touch Icon (`public/apple-touch-icon.png`): 180x180 px squircle.
  * Android PWA Manifest (`public/manifest.json`): 192x192 px and 512x512 px icons with `#F5F5F7` theme color.
  * SVG lucide-react icons used strictly for navigational clarity.

---

## Tech Stack & Architecture

* **Frontend**: React 18, TypeScript (Strict Mode)
* **Build Tool**: Vite v8
* **Styling**: Standard scoped CSS design tokens in `src/index.css`
* **State Management**: React Context + LocalStorage persistence in `src/state/appState.ts`
* **Verification**: `tsc -b && vite build` (zero errors)
* **Remote Repository**: `https://github.com/abhayr18/GoldPlus.git` (`main` branch)

---

## Local Development

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Run TypeScript checks and production build
npm run build
```

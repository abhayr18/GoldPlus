import React from 'react';
import { BRAND } from '../constants';
import yassGroupLogo from '../assets/yass-group-logo.png';
import yassGoldLogo from '../assets/yass-gold-logo.png';
import yassBullionLogo from '../assets/yass-bullion-logo.png';
import yassGoldBarImg from '../assets/yass-gold-bar.png';

export const BrandLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; light?: boolean; variant?: 'group' | 'gold' | 'bullion' }> = ({
  size = 'md',
  light = false,
  variant = 'gold',
}) => {
  const heights = { sm: 28, md: 38, lg: 52 };
  const h = heights[size];

  const chosenLogo = variant === 'group' ? yassGroupLogo : variant === 'bullion' ? yassBullionLogo : yassGoldLogo;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <img
        src={chosenLogo}
        alt={`${BRAND.parentCompany} Logo`}
        style={{
          height: h,
          width: 'auto',
          objectFit: 'contain',
          filter: light ? 'brightness(1.1) drop-shadow(0 2px 6px rgba(0,0,0,0.4))' : 'drop-shadow(0 2px 4px rgba(232,182,63,0.2))',
        }}
      />
    </div>
  );
};

export const GoldEmblem: React.FC<{ size?: number; variant?: 'gold' | 'bullion' | 'group' }> = ({
  size = 110,
  variant = 'group',
}) => {
  const chosenLogo = variant === 'bullion' ? yassBullionLogo : variant === 'gold' ? yassGoldLogo : yassGroupLogo;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 18px',
        borderRadius: 20,
        background: 'linear-gradient(135deg, rgba(32, 28, 22, 0.95) 0%, rgba(18, 20, 24, 0.98) 100%)',
        border: '1.5px solid rgba(232, 182, 63, 0.35)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45), 0 0 24px rgba(232, 182, 63, 0.15)',
      }}
    >
      <img
        src={chosenLogo}
        alt="YASS Group Official Logo"
        style={{
          width: size,
          height: 'auto',
          maxHeight: size * 0.9,
          objectFit: 'contain',
          filter: 'drop-shadow(0 4px 12px rgba(232, 182, 63, 0.3))',
        }}
      />
    </div>
  );
};

export const GoldBarIllustration: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <div style={{ display: 'inline-block', position: 'relative' }}>
    <img
      src={yassGoldBarImg}
      alt="Dubai 999.9 Gold Bar"
      style={{
        width: size * 1.3,
        height: 'auto',
        maxHeight: size,
        objectFit: 'contain',
        filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.35))',
      }}
      onError={(e) => {
        // Fallback to SVG if image fails to load
        (e.currentTarget as HTMLElement).style.display = 'none';
      }}
    />
  </div>
);

export const MiniLineChart: React.FC = () => (
  <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
    <path
      d="M0 28 L8 24 L16 26 L24 20 L32 22 L40 16 L48 14 L56 18 L64 10 L72 8 L80 4"
      stroke="#16865B"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M0 28 L8 24 L16 26 L24 20 L32 22 L40 16 L48 14 L56 18 L64 10 L72 8 L80 4 L80 32 L0 32Z"
      fill="url(#yassChartFill)"
    />
    <defs>
      <linearGradient id="yassChartFill" x1="40" y1="4" x2="40" y2="32">
        <stop stopColor="#16865B" stopOpacity="0.15" />
        <stop offset="1" stopColor="#16865B" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

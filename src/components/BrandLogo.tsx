import React from 'react';
import yassGoldBarImg from '../assets/yass-gold-bar.png';

export const OGoldMark: React.FC<{ size?: number }> = ({ size = 36 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ogoldRingGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="25%" stopColor="#F59E0B" />
          <stop offset="60%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="ogoldInnerGrad" x1="25" y1="25" x2="75" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <radialGradient id="ogoldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Outer Glow */}
      <circle cx="50" cy="50" r="46" fill="url(#ogoldGlow)" />
      
      {/* Outer Metallic Ring */}
      <circle cx="50" cy="50" r="40" stroke="url(#ogoldRingGrad)" strokeWidth="10" strokeLinecap="round" />
      
      {/* Subtle Inner Accent Ring */}
      <circle cx="50" cy="50" r="28" stroke="rgba(253, 230, 138, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
      
      {/* Central Precious Bullion Core */}
      <circle cx="50" cy="50" r="22" fill="url(#ogoldInnerGrad)" stroke="url(#ogoldRingGrad)" strokeWidth="2" />
      
      {/* Facet Star Sparkle */}
      <path
        d="M50 34 L52.5 46 L64.5 48.5 L52.5 51 L50 63 L47.5 51 L35.5 48.5 L47.5 46 Z"
        fill="url(#ogoldRingGrad)"
      />
    </svg>
  );
};

export const BrandLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; light?: boolean }> = ({
  size = 'md',
}) => {
  const heights = { sm: 26, md: 34, lg: 44 };
  const markSize = heights[size];
  const fontSize = size === 'sm' ? 17 : size === 'md' ? 22 : 28;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <OGoldMark size={markSize} />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize, fontWeight: 900, color: '#F59E0B', letterSpacing: -0.5 }}>
            O
          </span>
          <span style={{ fontSize, fontWeight: 800, color: '#FFFFFF', letterSpacing: -0.3 }}>
            GOLD
          </span>
          <span
            style={{
              marginLeft: 6,
              fontSize: 9,
              fontWeight: 800,
              color: '#F59E0B',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              padding: '2px 5px',
              borderRadius: 4,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}
          >
            WALLET
          </span>
        </div>
        <span style={{ fontSize: 9.5, color: '#94A3B8', fontWeight: 600, letterSpacing: 0.8, marginTop: 2 }}>
          DUBAI • UAE
        </span>
      </div>
    </div>
  );
};

export const GoldEmblem: React.FC<{ size?: number }> = ({ size = 100 }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 24px',
        borderRadius: 24,
        background: 'linear-gradient(135deg, #182234 0%, #0F1624 100%)',
        border: '1.5px solid rgba(245, 158, 11, 0.35)',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(245, 158, 11, 0.15)',
      }}
    >
      <OGoldMark size={size} />
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
        <span style={{ fontSize: 24, fontWeight: 900, color: '#F59E0B' }}>O</span>
        <span style={{ fontSize: 24, fontWeight: 800, color: '#FFFFFF' }}>GOLD</span>
      </div>
      <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, letterSpacing: 1.2, marginTop: 2 }}>
        BUY GOLD & SILVER
      </span>
    </div>
  );
};

export const GoldBarIllustration: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <div style={{ display: 'inline-block', position: 'relative' }}>
    <img
      src={yassGoldBarImg}
      alt="24K Dubai Gold Bullion"
      style={{
        width: size * 1.3,
        height: 'auto',
        maxHeight: size,
        objectFit: 'contain',
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
      }}
    />
  </div>
);

export const MiniLineChart: React.FC<{ isPositive?: boolean; color?: string }> = ({
  color = '#10B981',
}) => (
  <svg width="84" height="32" viewBox="0 0 84 32" fill="none">
    <defs>
      <linearGradient id="ogoldChartFill" x1="0" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
        <stop offset="100%" stopColor={color} stopOpacity="0.0" />
      </linearGradient>
    </defs>
    <path
      d="M0 26 L9 22 L18 24 L27 18 L36 20 L45 14 L54 12 L63 16 L72 8 L84 4"
      stroke={color}
      strokeWidth="2.2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M0 26 L9 22 L18 24 L27 18 L36 20 L45 14 L54 12 L63 16 L72 8 L84 4 L84 32 L0 32Z"
      fill="url(#ogoldChartFill)"
    />
  </svg>
);

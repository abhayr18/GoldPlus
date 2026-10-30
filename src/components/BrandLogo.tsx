import React from 'react';
import yassGoldBarImg from '../assets/yass-gold-bar.png';

export const GoldEmblemMark: React.FC<{ size?: number }> = ({ size = 32 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldEmblemGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5D061" />
          <stop offset="40%" stopColor="#C59B27" />
          <stop offset="100%" stopColor="#8F6914" />
        </linearGradient>
        <linearGradient id="goldPlateGrad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="100%" stopColor="#FEFBF2" />
        </linearGradient>
      </defs>

      {/* Hexagonal / Shield Precious Bullion Seal */}
      <polygon
        points="50,6 90,26 90,74 50,94 10,74 10,26"
        fill="url(#goldPlateGrad)"
        stroke="url(#goldEmblemGrad)"
        strokeWidth="5"
      />

      <polygon
        points="50,14 82,30 82,70 50,86 18,70 18,30"
        stroke="url(#goldEmblemGrad)"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />

      {/* Center 24K AU Monogram / Ingot */}
      <path
        d="M50 26 L53 43 L70 47 L53 51 L50 68 L47 51 L30 47 L47 43 Z"
        fill="url(#goldEmblemGrad)"
      />
    </svg>
  );
};

export const BrandLogo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const heights = { sm: 26, md: 32, lg: 40 };
  const markSize = heights[size];
  const fontSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
      <GoldEmblemMark size={markSize} />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize, fontWeight: 900, color: '#0F172A', letterSpacing: -0.4 }}>
            YASS
          </span>
          <span style={{ fontSize, fontWeight: 800, color: '#C59B27', letterSpacing: -0.2, marginLeft: 4 }}>
            GOLD
          </span>
          <span
            style={{
              marginLeft: 6,
              fontSize: 9,
              fontWeight: 800,
              color: '#8F6914',
              background: '#FEFBF2',
              border: '1px solid #EED8A1',
              padding: '1.5px 5px',
              borderRadius: 4,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}
          >
            DUBAI
          </span>
        </div>
        <span style={{ fontSize: 9, color: '#64748B', fontWeight: 600, letterSpacing: 0.6, marginTop: 2 }}>
          DMCC PRECIOUS METALS
        </span>
      </div>
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
        filter: 'drop-shadow(0 4px 8px rgba(197, 155, 39, 0.2))',
      }}
    />
  </div>
);

export const MiniLineChart: React.FC<{ color?: string }> = ({ color = '#059669' }) => (
  <svg width="76" height="28" viewBox="0 0 76 28" fill="none">
    <defs>
      <linearGradient id="cleanChartFill" x1="0" y1="0" x2="0" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={color} stopOpacity="0.2" />
        <stop offset="100%" stopColor={color} stopOpacity="0.0" />
      </linearGradient>
    </defs>
    <path
      d="M0 24 L8 20 L16 22 L24 16 L32 18 L40 12 L48 10 L56 14 L64 6 L76 3"
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M0 24 L8 20 L16 22 L24 16 L32 18 L40 12 L48 10 L56 14 L64 6 L76 3 L76 28 L0 28Z"
      fill="url(#cleanChartFill)"
    />
  </svg>
);

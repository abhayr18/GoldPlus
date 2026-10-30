import React from 'react';
import { BRAND } from '../constants';

export const BrandLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; light?: boolean }> = ({ size = 'md', light = false }) => {
  const sizes = { sm: 30, md: 42, lg: 58 };
  const s = sizes[size];
  const textSizes = { sm: 16, md: 22, lg: 32 };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size === 'lg' ? 14 : 10 }}>
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        {/* Luxury Diamond / Ingot Shield */}
        <path
          d="M24 4L42 12V26C42 35 34 42 24 45C14 42 6 35 6 26V12L24 4Z"
          fill="url(#yassGoldGrad)"
          stroke="#FFF"
          strokeWidth="0.5"
          opacity="0.95"
        />
        {/* Inner Facet */}
        <path
          d="M24 8L38 14V25C38 32 32 38 24 41C16 38 10 32 10 25V14L24 8Z"
          fill="url(#yassGoldInner)"
          opacity="0.85"
        />
        {/* Y Letter Monogram in Fine Gold */}
        <path
          d="M17 17L24 26L31 17M24 26V33"
          stroke="#FFFFFF"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dubai Gold Crown / Ingot Accent */}
        <circle cx="24" cy="14" r="1.5" fill="#FFF" />
        <defs>
          <linearGradient id="yassGoldGrad" x1="6" y1="4" x2="42" y2="45" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5D77F" />
            <stop offset="0.45" stopColor="#E8B63F" />
            <stop offset="1" stopColor="#B68822" />
          </linearGradient>
          <linearGradient id="yassGoldInner" x1="10" y1="8" x2="38" y2="41" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2A2418" />
            <stop offset="1" stopColor="#171A1D" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{
          fontSize: textSizes[size],
          fontWeight: 800,
          color: light ? '#FFFFFF' : '#E8B63F',
          letterSpacing: '-0.5px',
          lineHeight: 1.1,
          fontFamily: 'Inter, sans-serif',
        }}>
          {BRAND.name}
        </span>
        <span style={{
          fontSize: size === 'sm' ? 8 : 10,
          fontWeight: 600,
          color: light ? '#F4D681' : '#7C858D',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          Dubai Bullion
        </span>
      </div>
    </div>
  );
};

export const GoldEmblem: React.FC<{ size?: number }> = ({ size = 88 }) => (
  <svg width={size} height={size} viewBox="0 0 88 88" fill="none">
    {/* Outer decorative ring */}
    <circle cx="44" cy="44" r="42" stroke="url(#yassEmblemGrad)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
    <circle cx="44" cy="44" r="37" stroke="url(#yassEmblemGrad)" strokeWidth="1" opacity="0.3" />

    {/* Luxury Shield */}
    <path
      d="M44 10L72 22V46C72 61 60 72 44 77C28 72 16 61 16 46V22L44 10Z"
      fill="url(#yassEmblemGrad)"
      filter="drop-shadow(0 4px 14px rgba(232, 182, 63, 0.35))"
    />
    {/* Inner Shield */}
    <path
      d="M44 14L68 24V45C68 58 58 68 44 72C30 68 20 58 20 45V24L44 14Z"
      fill="#1A1C20"
      opacity="0.92"
    />

    {/* YASS Gold Monogram */}
    <path
      d="M33 30L44 43L55 30M44 43V55"
      stroke="url(#yassEmblemGrad)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Dubai Hallmark Stars */}
    <circle cx="34" cy="62" r="1.5" fill="#E8B63F" />
    <circle cx="44" cy="65" r="2" fill="#F4D681" />
    <circle cx="54" cy="62" r="1.5" fill="#E8B63F" />

    {/* Top Crown Accent */}
    <path d="M40 22L44 18L48 22" stroke="#F4D681" strokeWidth="2" strokeLinecap="round" />

    <defs>
      <linearGradient id="yassEmblemGrad" x1="16" y1="10" x2="72" y2="77" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5D77F" />
        <stop offset="0.4" stopColor="#E8B63F" />
        <stop offset="1" stopColor="#B3841D" />
      </linearGradient>
    </defs>
  </svg>
);

export const GoldBarIllustration: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 64 48" fill="none">
    {/* Back bar */}
    <rect x="12" y="4" width="44" height="16" rx="3" fill="#B3841D" />
    <rect x="14" y="6" width="24" height="3" rx="1.5" fill="#FFF" opacity="0.2" />
    {/* Front bar */}
    <rect x="4" y="18" width="48" height="18" rx="3" fill="url(#yassBarGrad)" />
    <rect x="8" y="21" width="28" height="3" rx="1.5" fill="#FFF" opacity="0.25" />
    {/* Dubai Hallmark Text */}
    <text x="28" y="30" fill="#FFF" opacity="0.75" fontSize="7" fontWeight="bold" textAnchor="middle">
      999.9 DUBAI
    </text>
    {/* Shine */}
    <rect x="6" y="38" width="44" height="6" rx="3" fill="#B3841D" opacity="0.3" />
    <defs>
      <linearGradient id="yassBarGrad" x1="4" y1="18" x2="52" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5D77F" />
        <stop offset="0.4" stopColor="#E8B63F" />
        <stop offset="1" stopColor="#B3841D" />
      </linearGradient>
    </defs>
  </svg>
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

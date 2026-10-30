import React from 'react';
import { BRAND } from '../constants';

export const BrandLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; light?: boolean }> = ({ size = 'md', light = false }) => {
  const sizes = { sm: 28, md: 40, lg: 56 };
  const s = sizes[size];
  const textSizes = { sm: 16, md: 22, lg: 32 };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size === 'lg' ? 14 : 10 }}>
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <rect x="4" y="8" width="40" height="28" rx="4" fill="url(#goldGrad)" />
        <rect x="8" y="12" width="32" height="20" rx="2" fill="url(#goldGrad2)" opacity="0.6" />
        <path d="M16 24L24 16L32 24L24 32Z" fill="#FFF" opacity="0.3" />
        <rect x="10" y="38" width="28" height="4" rx="2" fill="url(#goldGrad)" opacity="0.5" />
        <defs>
          <linearGradient id="goldGrad" x1="4" y1="8" x2="44" y2="36">
            <stop stopColor="#F4D681" />
            <stop offset="0.5" stopColor="#E8B63F" />
            <stop offset="1" stopColor="#C99A2E" />
          </linearGradient>
          <linearGradient id="goldGrad2" x1="8" y1="12" x2="40" y2="32">
            <stop stopColor="#F4D681" />
            <stop offset="1" stopColor="#E8B63F" />
          </linearGradient>
        </defs>
      </svg>
      <span style={{
        fontSize: textSizes[size],
        fontWeight: 700,
        color: light ? '#FFFFFF' : '#E8B63F',
        letterSpacing: '-0.5px',
      }}>
        {BRAND.name}
      </span>
    </div>
  );
};

export const GoldEmblem: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="38" stroke="url(#emblemGrad)" strokeWidth="2" opacity="0.3" />
    <circle cx="40" cy="40" r="30" stroke="url(#emblemGrad)" strokeWidth="1.5" opacity="0.2" />
    {/* Gold bar stack */}
    <rect x="20" y="30" width="40" height="10" rx="2" fill="url(#emblemGrad)" />
    <rect x="23" y="22" width="34" height="9" rx="2" fill="url(#emblemGrad)" opacity="0.8" />
    <rect x="26" y="15" width="28" height="8" rx="2" fill="url(#emblemGrad)" opacity="0.6" />
    {/* Shine line */}
    <rect x="22" y="32" width="20" height="2" rx="1" fill="#FFF" opacity="0.3" />
    {/* Base */}
    <rect x="18" y="42" width="44" height="4" rx="2" fill="url(#emblemGrad)" opacity="0.4" />
    {/* Stars */}
    <circle cx="25" cy="54" r="1.5" fill="#E8B63F" opacity="0.5" />
    <circle cx="40" cy="56" r="1.5" fill="#E8B63F" opacity="0.5" />
    <circle cx="55" cy="54" r="1.5" fill="#E8B63F" opacity="0.5" />
    <defs>
      <linearGradient id="emblemGrad" x1="20" y1="15" x2="60" y2="46">
        <stop stopColor="#F4D681" />
        <stop offset="0.5" stopColor="#E8B63F" />
        <stop offset="1" stopColor="#C99A2E" />
      </linearGradient>
    </defs>
  </svg>
);

export const GoldBarIllustration: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 64 48" fill="none">
    {/* Back bar */}
    <rect x="12" y="4" width="44" height="16" rx="3" fill="#C99A2E" />
    <rect x="14" y="6" width="24" height="3" rx="1.5" fill="#FFF" opacity="0.2" />
    {/* Front bar */}
    <rect x="4" y="18" width="48" height="18" rx="3" fill="url(#barGrad)" />
    <rect x="8" y="21" width="28" height="3" rx="1.5" fill="#FFF" opacity="0.25" />
    {/* Shine */}
    <rect x="6" y="38" width="44" height="6" rx="3" fill="#C99A2E" opacity="0.3" />
    <defs>
      <linearGradient id="barGrad" x1="4" y1="18" x2="52" y2="36">
        <stop stopColor="#F4D681" />
        <stop offset="0.4" stopColor="#E8B63F" />
        <stop offset="1" stopColor="#C99A2E" />
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
      fill="url(#chartFill)"
    />
    <defs>
      <linearGradient id="chartFill" x1="40" y1="4" x2="40" y2="32">
        <stop stopColor="#16865B" stopOpacity="0.15" />
        <stop offset="1" stopColor="#16865B" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);


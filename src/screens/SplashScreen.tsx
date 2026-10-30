import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, RefreshCw, Gift } from 'lucide-react';
import { GoldEmblem } from '../components/BrandLogo';
import { useApp } from '../components/AppProvider';
import { BRAND, COLORS } from '../constants';

// ============================================
// GoldPlus — Splash / Onboarding Screen
// Premium dark onboarding with gold accents
// ============================================

/** Feature pills displayed below the tagline */
const FEATURES = [
  { label: 'Buy Gold', icon: ArrowDownCircle },
  { label: 'Sell Gold', icon: ArrowUpCircle },
  { label: 'Gold SIP', icon: RefreshCw },
  { label: 'Redeem Gold', icon: Gift },
] as const;

const SplashScreen: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div style={styles.root}>
      {/* ---- Subtle gold texture background layer ---- */}
      <div style={styles.textureOverlay} aria-hidden="true" />

      {/* ---- Main centred content ---- */}
      <div style={styles.content}>
        {/* Gold emblem */}
        <div style={styles.emblemWrap}>
          <GoldEmblem size={96} />
        </div>

        {/* Wordmark */}
        <h1 style={styles.wordmark}>{BRAND.name}</h1>

        {/* Hero heading */}
        <h2 style={styles.heading}>{BRAND.heading}</h2>

        {/* Supporting copy */}
        <p style={styles.subtext}>{BRAND.subheading}</p>

        {/* Feature indicator pills */}
        <div style={styles.pillRow}>
          {FEATURES.map(({ label, icon: Icon }) => (
            <div key={label} style={styles.pill}>
              <Icon size={14} style={{ flexShrink: 0 }} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div style={styles.ctaSection}>
          {/* Primary gold button */}
          <button
            className="btn btn-primary"
            style={styles.ctaButton}
            onClick={() => navigate('signup')}
          >
            Get Started
          </button>

          {/* Login link */}
          <button
            style={styles.loginLink}
            onClick={() => navigate('signup')}
          >
            Already have an account?{' '}
            <span style={styles.loginLinkHighlight}>Login</span>
          </button>
        </div>

        {/* Footer attribution */}
        <p style={styles.footer}>{BRAND.attribution}</p>
      </div>
    </div>
  );
};

export default SplashScreen;

// ============================================
// Inline Styles
// ============================================

const styles: Record<string, React.CSSProperties> = {
  /* --- Full-screen dark background --- */
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: '100dvh',
    backgroundColor: COLORS.darkCharcoal,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  /* --- Subtle gold radial texture layer --- */
  textureOverlay: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background: [
      // Large soft glow behind the emblem
      `radial-gradient(ellipse 60% 40% at 50% 32%, rgba(232,182,63,0.08) 0%, transparent 70%)`,
      // Smaller accent bottom-right
      `radial-gradient(circle at 85% 80%, rgba(244,214,129,0.05) 0%, transparent 50%)`,
      // Tiny sparkle top-left
      `radial-gradient(circle at 15% 18%, rgba(232,182,63,0.04) 0%, transparent 35%)`,
      // Very faint diagonal shimmer
      `radial-gradient(ellipse 80% 120% at 30% 90%, rgba(244,214,129,0.03) 0%, transparent 60%)`,
    ].join(', '),
  },

  /* --- Centred column --- */
  content: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    maxWidth: 420,
    padding: '40px 24px',
    gap: 0,
  },

  /* --- Emblem wrapper --- */
  emblemWrap: {
    marginBottom: 20,
    filter: 'drop-shadow(0 4px 24px rgba(232,182,63,0.25))',
  },

  /* --- "GoldPlus" wordmark --- */
  wordmark: {
    fontSize: 32,
    fontWeight: 700,
    color: COLORS.primaryGold,
    letterSpacing: '-0.5px',
    marginBottom: 16,
    lineHeight: 1.1,
  },

  /* --- Hero heading --- */
  heading: {
    fontSize: 22,
    fontWeight: 600,
    color: '#FFFFFF',
    lineHeight: 1.35,
    marginBottom: 10,
    maxWidth: 320,
  },

  /* --- Sub-text --- */
  subtext: {
    fontSize: 14,
    fontWeight: 400,
    color: '#9DA3AA',
    lineHeight: 1.6,
    marginBottom: 28,
    maxWidth: 310,
  },

  /* --- Feature pills row --- */
  pillRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 36,
  },

  /* --- Individual pill --- */
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 14px',
    borderRadius: 9999,
    border: `1px solid rgba(232,182,63,0.22)`,
    backgroundColor: 'rgba(232,182,63,0.07)',
    color: COLORS.secondaryGold,
    fontSize: 12,
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },

  /* --- CTA area --- */
  ctaSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },

  /* --- Gold button overrides --- */
  ctaButton: {
    width: '100%',
    maxWidth: 340,
    fontSize: 16,
    fontWeight: 700,
    padding: '16px 24px',
    borderRadius: 12,
    letterSpacing: '0.2px',
  },

  /* --- Login link --- */
  loginLink: {
    background: 'none',
    border: 'none',
    color: '#9DA3AA',
    fontSize: 14,
    fontWeight: 400,
    cursor: 'pointer',
    padding: '4px 0',
    fontFamily: 'inherit',
  },

  loginLinkHighlight: {
    color: COLORS.primaryGold,
    fontWeight: 600,
  },

  /* --- Footer --- */
  footer: {
    fontSize: 11,
    fontWeight: 400,
    color: '#5C6269',
    letterSpacing: '0.3px',
  },
};

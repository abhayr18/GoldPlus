import React, { useState, useCallback } from 'react';
import { ChevronLeft, Globe, Apple, Phone } from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { loginUser } from '../state/appState';
import { BRAND, COLORS } from '../constants';

// ============================================
// YASS Gold & YASS Bullion - Signup / Registration Screen
// A product by YASS Group, Dubai
// ============================================

/** Validation helpers */
const MOBILE_REGEX = /^(5\d{8}|\d{9,10})$/; // UAE mobile (starts with 5, 9 digits) or 10-digit international
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormData {
  fullName: string;
  mobile: string;
  email: string;
}

interface FormErrors {
  fullName?: string;
  mobile?: string;
  email?: string;
}

const SignupScreen: React.FC = () => {
  const { navigate, back, setState, showToast } = useApp();

  // ---- Form state ----
  const [form, setForm] = useState<FormData>({
    fullName: '',
    mobile: '',
    email: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // ---- Handle input change ----
  const handleChange = useCallback(
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = field === 'mobile'
        ? e.target.value.replace(/\D/g, '').slice(0, 10) // digits only, max 10
        : e.target.value;
      setForm(prev => ({ ...prev, [field]: value }));
      // Clear error on edit
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    },
    [errors],
  );

  // ---- Mark field as touched on blur ----
  const handleBlur = useCallback((field: keyof FormData) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
    // Validate on blur
    validateField(field);
  }, [form]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Single field validation ----
  const validateField = (field: keyof FormData): string | undefined => {
    let error: string | undefined;
    switch (field) {
      case 'fullName':
        if (!form.fullName.trim()) error = 'Full name is required';
        else if (form.fullName.trim().length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'mobile':
        if (!form.mobile) error = 'Mobile number is required';
        else if (!MOBILE_REGEX.test(form.mobile)) error = 'Enter a valid UAE mobile (e.g. 50 123 4567)';
        break;
      case 'email':
        if (form.email && !EMAIL_REGEX.test(form.email)) error = 'Enter a valid email address';
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
    return error;
  };

  // ---- Full form validation ----
  const validateAll = (): boolean => {
    const nameErr = validateField('fullName');
    const mobileErr = validateField('mobile');
    const emailErr = validateField('email');
    setTouched({ fullName: true, mobile: true, email: true });
    return !nameErr && !mobileErr && !emailErr;
  };

  // ---- Submit handler ----
  const handleSubmit = useCallback(() => {
    if (!validateAll()) return;

    // Update app state via loginUser helper
    setState(prev => {
      const updated = loginUser(prev, form.fullName.trim(), form.mobile, form.email.trim());
      return { ...updated, isLoggedIn: true };
    });
    showToast(`Welcome to ${BRAND.name}! ✨`, 'success');
    navigate('dashboard');
  }, [form]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Helpers ----
  const hasError = (field: keyof FormData) => touched[field] && !!errors[field];
  const isFormReady = form.fullName.trim().length >= 2 && MOBILE_REGEX.test(form.mobile);

  return (
    <div style={styles.root}>
      {/* ---- Header with back button ---- */}
      <div className="screen-header" style={styles.header}>
        <button className="screen-header-back" onClick={back} aria-label="Go back">
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 style={styles.title}>Create Account</h1>
          <p style={styles.subtitle}>Join {BRAND.name} and start your gold journey.</p>
        </div>
      </div>

      {/* ---- Scrollable form body ---- */}
      <div style={styles.body}>
        <div style={styles.formContainer}>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">
              Full Name <span style={styles.required}>*</span>
            </label>
            <input
              id="fullName"
              type="text"
              className={`form-input${hasError('fullName') ? ' error' : ''}`}
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              autoComplete="name"
            />
            {hasError('fullName') && (
              <p className="form-error">{errors.fullName}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="form-group">
            <label className="form-label" htmlFor="mobile">
              Mobile Number <span style={styles.required}>*</span>
            </label>
            <div
              className={`form-input-prefix${hasError('mobile') ? ' error' : ''}`}
              style={hasError('mobile') ? { borderColor: COLORS.negative } : undefined}
            >
              <span className="prefix">+971</span>
              <input
                id="mobile"
                type="tel"
                placeholder="50 123 4567"
                value={form.mobile}
                onChange={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                autoComplete="tel"
                inputMode="numeric"
              />
            </div>
            {hasError('mobile') && (
              <p className="form-error">{errors.mobile}</p>
            )}
          </div>

          {/* Email (optional) */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address <span style={styles.optional}>(optional)</span>
            </label>
            <input
              id="email"
              type="email"
              className={`form-input${hasError('email') ? ' error' : ''}`}
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              autoComplete="email"
            />
            {hasError('email') && (
              <p className="form-error">{errors.email}</p>
            )}
          </div>

          {/* Continue button */}
          <button
            className="btn btn-primary"
            style={styles.continueBtn}
            disabled={!isFormReady}
            onClick={handleSubmit}
          >
            Continue
          </button>

          {/* Terms text */}
          <p style={styles.terms}>
            By continuing, you agree to our{' '}
            <span style={styles.termsLink}>Terms &amp; Conditions</span> and{' '}
            <span style={styles.termsLink}>Privacy Policy</span>
          </p>

          {/* ---- Divider ---- */}
          <div style={styles.dividerRow}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>or continue with</span>
            <div style={styles.dividerLine} />
          </div>

          {/* Social login buttons (decorative) */}
          <div style={styles.socialRow}>
            <button style={styles.socialBtn} aria-label="Continue with Google" onClick={() => showToast('Google login coming soon', 'info')}>
              <Globe size={20} />
            </button>
            <button style={styles.socialBtn} aria-label="Continue with Apple" onClick={() => showToast('Apple login coming soon', 'info')}>
              <Apple size={20} />
            </button>
            <button style={styles.socialBtn} aria-label="Continue with Phone OTP" onClick={() => showToast('OTP login coming soon', 'info')}>
              <Phone size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;

// ============================================
// Inline Styles
// ============================================

const styles: Record<string, React.CSSProperties> = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.ivoryBg,
  },

  header: {
    paddingTop: 20,
    paddingBottom: 16,
    flexShrink: 0,
    backgroundColor: COLORS.cardBg,
    borderBottom: `1px solid ${COLORS.border}`,
  },

  title: {
    fontSize: 22,
    fontWeight: 700,
    color: COLORS.mainText,
    lineHeight: 1.2,
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.secondaryText,
    lineHeight: 1.4,
  },

  body: {
    flex: 1,
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
  },

  formContainer: {
    maxWidth: 480,
    margin: '0 auto',
    padding: '28px 20px 40px',
  },

  required: {
    color: COLORS.negative,
    fontWeight: 400,
  },

  optional: {
    color: COLORS.secondaryText,
    fontWeight: 400,
    fontSize: 12,
  },

  continueBtn: {
    marginTop: 8,
    marginBottom: 16,
    fontSize: 16,
    fontWeight: 700,
    padding: '16px 24px',
    borderRadius: 12,
  },

  terms: {
    fontSize: 12,
    color: COLORS.secondaryText,
    textAlign: 'center',
    lineHeight: 1.6,
    marginBottom: 28,
  },

  termsLink: {
    color: COLORS.primaryGold,
    fontWeight: 500,
    cursor: 'pointer',
  },

  /* ---- Divider ---- */
  dividerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },

  dividerText: {
    fontSize: 12,
    fontWeight: 500,
    color: COLORS.secondaryText,
    whiteSpace: 'nowrap',
  },

  /* ---- Social login buttons ---- */
  socialRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 16,
  },

  socialBtn: {
    width: 52,
    height: 52,
    borderRadius: 12,
    border: `1.5px solid ${COLORS.border}`,
    backgroundColor: COLORS.cardBg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: COLORS.secondaryText,
    transition: 'all 0.2s',
  },
};

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, googleAuthUser } from '../services/api';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '307733103923-gj9trio9cijg9bd3ids1ilk57hg5rke9.apps.googleusercontent.com';

export default function Login() {
  const navigate = useNavigate();
  const googleBtnRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Initialize Google Identity Services (GSI)
    const initGoogleAuth = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCallback,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        if (googleBtnRef.current) {
          googleBtnRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            type: 'standard',
            theme: 'outline',
            size: 'large',
            text: 'continue_with',
            shape: 'rectangular',
            logo_alignment: 'left',
            width: '360',
          });
        }
      }
    };

    initGoogleAuth();
    const interval = setInterval(() => {
      if (window.google?.accounts?.id) {
        initGoogleAuth();
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleGoogleCallback = async (response) => {
    if (!response || !response.credential) {
      setErrorMsg('Google authentication token was not received. Please try again.');
      return;
    }

    setGoogleLoading(true);
    setErrorMsg('');
    try {
      await googleAuthUser(response.credential);
      navigate('/dashboard');
    } catch (err) {
      console.error('Google Auth backend error:', err);
      setErrorMsg(err.message || 'Google authentication failed. Please select your Google account.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleCustomGoogleClick = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCallback,
      });
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // If prompt blocked by browser popup rules, trigger official button click
          const btn = googleBtnRef.current?.querySelector('div[role="button"]');
          if (btn) btn.click();
        }
      });
    } else {
      setErrorMsg('Google Identity Service is loading. Please try again in a moment.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      await loginUser(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.warn('Backend login error:', err.message);
      setErrorMsg(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl border border-outline-variant/30 custom-shadow overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
        {/* Left Side Branding */}
        <div className="md:col-span-5 bg-primary p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 text-white mb-8">
              <span className="material-symbols-outlined text-3xl">security</span>
              <span className="font-headline-md font-bold text-xl tracking-tight">Adversarial Auditor</span>
            </Link>
            <h2 className="font-headline-lg text-2xl font-bold mb-4">Autonomous Multi-Agent AI Audit Suite</h2>
            <p className="text-white/80 text-sm leading-relaxed">
              Stress-test financial, legal, and operational compliance with adversarial AI models.
            </p>
          </div>
          <div className="relative z-10 text-xs text-white/60">
            Enterprise Security Tier 4.2 • Google OAuth 2.0 Active
          </div>
        </div>

        {/* Right Side Form */}
        <div className="md:col-span-7 p-10 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-6">
            <div>
              <h3 className="font-headline-lg text-2xl font-bold text-on-surface mb-1">Welcome back</h3>
              <p className="text-sm text-on-surface-variant">Sign in to access your audit reports and agent status</p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-error/10 border border-error/20 text-error rounded-lg text-xs font-bold">
                {errorMsg}
              </div>
            )}

            {/* Official Google GSI Rendered Button */}
            <div className="flex flex-col items-center gap-2">
              <div ref={googleBtnRef} className="w-full flex justify-center min-h-[44px]"></div>

              {/* Custom Trigger Button */}
              <button
                type="button"
                onClick={handleCustomGoogleClick}
                disabled={googleLoading}
                className="w-full py-2.5 bg-white border border-outline-variant hover:bg-surface-container-low rounded-xl font-bold text-xs text-on-surface transition-all flex items-center justify-center gap-3 shadow-xs active:scale-95 disabled:opacity-70"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{googleLoading ? 'Verifying Google Account...' : 'Continue with Google Account'}</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-px bg-outline-variant/40 flex-1"></div>
              <span className="text-[10px] uppercase font-bold text-outline">or sign in with email</span>
              <div className="h-px bg-outline-variant/40 flex-1"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.sterling@enterprise.com"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Password
                  </label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Password reset link sent to your email.');
                    }}
                    className="text-xs text-primary font-bold hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="rounded border-outline-variant text-primary" defaultChecked />
                <label htmlFor="remember" className="text-xs text-on-surface-variant">
                  Remember this device
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-2"
              >
                {loading ? 'Authenticating...' : 'Sign In to Platform'}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </form>

            <div className="text-center text-xs text-on-surface-variant">
              Don't have an enterprise account?{' '}
              <Link to="/signup" className="text-primary font-bold hover:underline">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

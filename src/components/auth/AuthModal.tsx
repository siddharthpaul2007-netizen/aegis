import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth, DEMO_ACCOUNTS } from '../../context/AuthContext';
import {
  Shield,
  Lock,
  User,
  Key,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { PillButton } from '../common/PillButton';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, switchDemoAccount } = useAuth();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim() || !password.trim()) {
      setErrorMessage('Please provide both User ID and Password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    const res = await login(userId, password);
    setIsLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Authentication failed. Please verify credentials.');
    } else {
      setUserId('');
      setPassword('');
    }
  };

  const handleQuickDemoLogin = (demoKey: string) => {
    setErrorMessage('');
    switchDemoAccount(demoKey);
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-soft-in select-none">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={closeAuthModal} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-hairlineStrong bg-paper-surface/95 dark:bg-[#090c14]/95 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl ring-1 ring-white/10 font-sans">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-paper-elevated text-ink-dim hover:text-ink hover:border-hairlineStrong transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-paper-bottom shadow-md">
            <Shield className="h-5 w-5 text-accent-cyan" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-base font-black tracking-tight text-ink">
                AEGIS
              </span>
              <span className="font-mono text-[10px] font-bold tracking-widest text-accent-cyan uppercase">
                // AUTH TERMINAL
              </span>
            </div>
            <p className="font-mono text-[10px] text-ink-dim tracking-wider">
              SOVEREIGN CAPITAL ACCESS GATEWAY
            </p>
          </div>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-500 animate-soft-in">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="font-sans leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
              User Identification (ID)
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 h-4 w-4 text-ink-dim" />
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="e.g. deepak.sharma"
                autoFocus
                className="w-full rounded-xl border border-hairline bg-paper-elevated/70 pl-10 pr-3.5 py-2.5 font-sans text-sm text-ink placeholder:text-ink-dim focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
              Passkey / Password
            </label>
            <div className="relative flex items-center">
              <Key className="absolute left-3.5 h-4 w-4 text-ink-dim" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g. aegis2026)"
                className="w-full rounded-xl border border-hairline bg-paper-elevated/70 pl-10 pr-10 py-2.5 font-sans text-sm text-ink placeholder:text-ink-dim focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-ink-dim hover:text-ink transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-ink text-paper-bottom py-3 font-sans text-sm font-bold shadow-md hover:bg-ink/90 active:scale-[0.99] transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <span className="font-mono text-xs animate-pulse">VERIFYING CRYPTOGRAPHIC HANDSHAKE…</span>
            ) : (
              <>
                <span>Sign In to Terminal</span>
                <ArrowRight className="h-4 w-4 text-accent-cyan" />
              </>
            )}
          </button>
        </form>

        {/* ── 1-CLICK DEMO ACCOUNTS PICKER ── */}
        <div className="mt-6 pt-5 border-t border-hairline">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-dim flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-accent-cyan" />
              Instant Demo Accounts (1-Click Switch):
            </span>
            <span className="font-mono text-[9px] text-ink-dim">PWD: aegis2026</span>
          </div>

          <div className="space-y-2">
            {Object.entries(DEMO_ACCOUNTS).map(([key, demo]) => {
              const u = demo.user;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleQuickDemoLogin(key)}
                  className="group w-full flex items-center justify-between p-2.5 rounded-xl border border-hairline bg-paper-surface/60 hover:bg-paper-elevated hover:border-accent-cyan/50 transition-all duration-200 text-left"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-paper-elevated border border-hairline font-mono text-[10px] font-bold text-ink">
                      {u.name.charAt(0)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-sans text-xs font-bold text-ink group-hover:text-accent-cyan transition-colors truncate">
                          {u.name}
                        </span>
                        <span className="font-mono text-[9px] text-ink-dim">
                          ({u.userId})
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-ink-dim truncate">
                        {u.role} · {u.accountNumber}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                    Login →
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-5 pt-3 border-t border-hairline/40 flex items-center justify-between text-[9px] font-mono text-ink-dim">
          <div className="flex items-center gap-1 text-emerald-500">
            <Lock className="h-2.5 w-2.5" />
            <span>256-BIT ENCRYPTION</span>
          </div>
          <span>ZERO-KNOWLEDGE ON-DEVICE</span>
        </div>
      </div>
    </div>,
    document.body
  );
};

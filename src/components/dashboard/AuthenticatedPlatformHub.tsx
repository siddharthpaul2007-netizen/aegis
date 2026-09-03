import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useIntelligence } from '../../context/IntelligenceContext';
import {
  Shield,
  TrendingUp,
  Cpu,
  ArrowRight,
  Sparkles,
  Lock,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Building,
  RefreshCw
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { SovereignCommandNexus } from './SovereignCommandNexus';

export const AuthenticatedPlatformHub: React.FC = () => {
  const { user } = useAuth();
  const { setActiveTab } = useIntelligence();

  return (
    <div className="space-y-10 font-sans animate-fade-up">
      
      {/* ── USER EXECUTIVE PLATFORM HEADER ── */}
      <div className="relative overflow-hidden rounded-3xl border border-hairlineStrong bg-paper-surface/90 dark:bg-[#080b12]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* User Welcome & Clearance */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 font-mono text-[10px] font-bold text-accent-cyan uppercase tracking-wider">
                <Sparkles className="h-3 w-3" />
                AEGIS INTELLIGENCE PLATFORM ACTIVE
              </span>
              <StatusBadge
                label={user?.isDemoAccount ? `DEMO ACCOUNT (${user.tier})` : `SOVEREIGN VERIFIED`}
                tone={user?.isDemoAccount ? 'amber' : 'emerald'}
                size="sm"
              />
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-teal-400 to-emerald-400">{user?.name || 'Executive User'}</span>
            </h1>

            <p className="font-mono text-xs text-ink-dim">
              {user?.role || 'Executive Member'} · {user?.accountNumber || 'ACC #4912'} · {user?.clearanceLevel || 'Level 3 Clearance'}
            </p>
          </div>

          {/* Quick Portfolio Balance Card */}
          <div className="flex items-center gap-4 bg-paper-elevated/70 border border-hairline p-4 rounded-2xl shrink-0">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase text-ink-dim tracking-wider">
                Total Sovereign Liquidity
              </span>
              <span className="font-display text-2xl sm:text-3xl font-bold text-ink">
                ₹{(user?.balance || 2845000).toLocaleString('en-IN')}
              </span>
              <span className="font-mono text-[10px] text-emerald-500 mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Zero-Knowledge Verified
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── NEW: SOVEREIGN DEFENSE NEXUS (Distinct Emerald / Gold Interactive Canvas) ── */}
      <SovereignCommandNexus />

      {/* ── THE THREE MAJOR AEGIS PLATFORM SECTORS ── */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent-cyan shadow-[0_0_6px_#00d2ff]" />
              <span className="font-mono text-xs uppercase tracking-widest text-ink-dim font-bold">
                AEGIS PLATFORM SECTORS
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink mt-1">
              Core Intelligence Engines
            </h2>
          </div>
          <span className="font-mono text-[10px] text-ink-dim hidden sm:block">
            SELECT A CAPABILITY MODULE TO ENTER
          </span>
        </div>

        {/* 3 Major Product Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ════ SECTOR 01: PROTECT — Fraud Intelligence ════ */}
          <div
            onClick={() => setActiveTab('fraud')}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-rose-500/25 bg-paper-surface/90 dark:bg-[#080b12]/90 p-6 sm:p-7 backdrop-blur-2xl shadow-xl hover:border-rose-500/60 hover:shadow-[0_0_30px_rgba(225,29,72,0.15)] cursor-pointer transition-all duration-300"
          >
            {/* Top Tag & Sector Badge */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-extrabold tracking-widest text-rose-500 uppercase px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30">
                    SECTOR 01 · PROTECT
                  </span>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-500 group-hover:scale-110 transition-transform">
                  <Shield className="h-5 w-5" />
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-ink group-hover:text-rose-400 transition-colors">
                  Fraud Intelligence
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-dim leading-relaxed mt-2 font-light">
                  Detect and understand suspicious financial situations before vulnerable users lose money. Scans real-time beneficiary mismatches, mule accounts, and coercive syndicate playbooks.
                </p>
              </div>

              {/* Live Feature Highlights List */}
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-3.5 space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between text-rose-400 font-bold">
                  <span>CAPABILITIES</span>
                  <span className="text-[10px]">LIVE</span>
                </div>
                <ul className="space-y-1 text-ink-dim text-[10px]">
                  <li className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-rose-500" />
                    <span>Transaction Intercept Simulation</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-rose-500" />
                    <span>Confirmation of Payee Registry</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-rose-500" />
                    <span>Digital Arrest & Phishing Deconstruction</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between font-mono text-xs font-bold text-ink group-hover:text-rose-400 transition-colors">
              <span>ENTER FRAUD INTELLIGENCE</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* ════ SECTOR 02: STABILIZE — Financial Health ════ */}
          <div
            onClick={() => setActiveTab('health')}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-emerald-500/25 bg-paper-surface/90 dark:bg-[#080b12]/90 p-6 sm:p-7 backdrop-blur-2xl shadow-xl hover:border-emerald-500/60 hover:shadow-[0_0_30px_rgba(5,150,105,0.15)] cursor-pointer transition-all duration-300"
          >
            {/* Top Tag & Sector Badge */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-extrabold tracking-widest text-emerald-500 uppercase px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                    SECTOR 02 · STABILIZE
                  </span>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-ink group-hover:text-emerald-400 transition-colors">
                  Financial Health
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-dim leading-relaxed mt-2 font-light">
                  Identify early financial stress signals and help users understand their financial resilience before problems become crises. Balances essential burn vs discretionary outflows.
                </p>
              </div>

              {/* Live Feature Highlights List */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>CAPABILITIES</span>
                  <span className="text-[10px]">PREDICTIVE</span>
                </div>
                <ul className="space-y-1 text-ink-dim text-[10px]">
                  <li className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                    <span>Financial Resilience Score (0-100)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                    <span>Emergency Runway Velocity Modeling</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                    <span>Autonomous Buffer Sweep Actions</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between font-mono text-xs font-bold text-ink group-hover:text-emerald-400 transition-colors">
              <span>EXPLORE FINANCIAL HEALTH</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* ════ SECTOR 03: GOVERN — AI Governance & Audit ════ */}
          <div
            onClick={() => setActiveTab('ai-center')}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-sky-500/25 bg-paper-surface/90 dark:bg-[#080b12]/90 p-6 sm:p-7 backdrop-blur-2xl shadow-xl hover:border-sky-500/60 hover:shadow-[0_0_30px_rgba(2,132,199,0.15)] cursor-pointer transition-all duration-300"
          >
            {/* Top Tag & Sector Badge */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-extrabold tracking-widest text-sky-400 uppercase px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30">
                    SECTOR 03 · GOVERN
                  </span>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
                  <Cpu className="h-5 w-5" />
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-ink group-hover:text-sky-300 transition-colors">
                  AI Governance & Audit
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-dim leading-relaxed mt-2 font-light">
                  Provide explainability, decision history, transparency, and trust around AI-generated recommendations. Complete cryptographic ledger with zero private banking data leakage.
                </p>
              </div>

              {/* Live Feature Highlights List */}
              <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-3.5 space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between text-sky-300 font-bold">
                  <span>CAPABILITIES</span>
                  <span className="text-[10px]">ZERO-KNOWLEDGE</span>
                </div>
                <ul className="space-y-1 text-ink-dim text-[10px]">
                  <li className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-sky-400" />
                    <span>Explainable SHAP Reasoning Tokens</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-sky-400" />
                    <span>Immutable Cryptographic Audit Trail</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-sky-400" />
                    <span>Local Edge Inference Safeguards</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between font-mono text-xs font-bold text-ink group-hover:text-sky-400 transition-colors">
              <span>OPEN GOVERNANCE CENTER</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

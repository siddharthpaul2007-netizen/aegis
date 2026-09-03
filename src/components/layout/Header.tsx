import React, { useState, useRef, useEffect } from 'react';
import { useIntelligence } from '../../context/IntelligenceContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import {
  Home,
  Shield,
  TrendingUp,
  Cpu,
  History,
  Sun,
  Moon,
  ChevronRight,
  Lock,
  LogIn,
  User as UserIcon
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

// Bespoke AEGIS geometric emblem icon: ||D
export const AegisTriggerIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    strokeWidth="2.2"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* First vertical stroke */}
    <line x1="4.5" y1="4.5" x2="4.5" y2="19.5" />
    {/* Second vertical stroke */}
    <line x1="9.5" y1="4.5" x2="9.5" y2="19.5" />
    {/* Third chamfered polygon/D shape */}
    <path d="M14.5 4.5 H17 L20 7.5 V19.5 H14.5 Z" />
  </svg>
);

interface NavItem {
  id: 'command' | 'fraud' | 'health' | 'ai-center' | 'history';
  label: string;
  sublabel: string;
  index: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, currentScenarioId } = useIntelligence();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, openAuthModal, openProfileDrawer } = useAuth();

  const [isExpanded, setIsExpanded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  const navItems: NavItem[] = [
    {
      id: 'command',
      label: 'Home',
      sublabel: 'Executive Command & Orbit',
      index: '01',
      icon: Home,
    },
    {
      id: 'fraud',
      label: 'Fraud Intelligence',
      sublabel: 'Real-Time Intercept Engine',
      index: '02',
      icon: Shield,
      badge: currentScenarioId !== 'legitimate_vendor' ? '1 Alert' : undefined,
    },
    {
      id: 'health',
      label: 'Financial Health',
      sublabel: 'Predictive Resilience Runway',
      index: '03',
      icon: TrendingUp,
    },
    {
      id: 'ai-center',
      label: 'AI Intelligence Center',
      sublabel: 'Explainable Neural Telemetry',
      index: '04',
      icon: Cpu,
    },
    {
      id: 'history',
      label: 'Insights & History',
      sublabel: 'Forensic Audit Transcript',
      index: '05',
      icon: History,
    },
  ];

  const hasAlert = currentScenarioId !== 'legitimate_vendor';

  // Smooth hover enter with immediate expansion and timer clearance
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsExpanded(true);
  };

  // Graceful hover exit with intentional 220ms delay to prevent accidental collapse/flicker
  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 220);
  };

  // Close when selecting a destination tab
  const handleSelectTab = (tabId: NavItem['id']) => {
    setActiveTab(tabId);
    setIsExpanded(false);
  };

  // Click outside listener for touch devices
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(e.target as Node)
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* ── TOP-LEFT COMPACT HOVER-EXPANDABLE NAVIGATION ── */}
      <div
        ref={navContainerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="fixed top-4 left-4 z-50 select-none font-sans"
      >
        {/* Main Morphing Container */}
        <div
          className={`
            relative overflow-hidden rounded-2xl border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${
              isExpanded
                ? 'w-[310px] sm:w-[330px] border-hairlineStrong bg-paper-surface/95 dark:bg-[#080b12]/95 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl ring-1 ring-white/10'
                : 'w-12 h-12 flex items-center justify-center border-hairline bg-paper-surface/90 dark:bg-[#07090e]/90 shadow-[0_8px_25px_rgba(0,0,0,0.25)] backdrop-blur-xl hover:border-accent-cyan/60 hover:shadow-[0_0_20px_rgba(0,210,255,0.2)] cursor-pointer group'
            }
          `}
        >
          {/* Collapsed State Icon Trigger */}
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              aria-label="Open Navigation Menu"
              className="relative flex h-full w-full items-center justify-center text-ink-muted group-hover:text-ink transition-colors"
            >
              <AegisTriggerIcon className="h-5 w-5 text-ink transition-transform duration-200 group-hover:scale-110" />
              {hasAlert && (
                <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-rose opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-rose border-2 border-paper-surface" />
                </span>
              )}
            </button>
          ) : (
            /* Expanded Panel View */
            <div className="w-full animate-soft-in">
              {/* Header inside expanded panel */}
              <div className="flex items-center justify-between px-3.5 py-3 border-b border-hairline/60 bg-paper-elevated/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink text-paper-bottom shadow-sm">
                    <AegisTriggerIcon className="h-4 w-4 text-accent-cyan" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display text-sm font-black tracking-tight text-ink">
                        SENTINEL
                      </span>
                      <span className="font-mono text-[9px] font-bold tracking-widest text-accent-cyan uppercase">
                        // ASCEND
                      </span>
                    </div>
                    <span className="font-mono text-[9px] tracking-wider text-ink-dim">
                      AUTONOMOUS INTELLIGENCE OS
                    </span>
                  </div>
                </div>

                <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </div>

              {/* Navigation Items List */}
              <div className="p-2.5 space-y-1">
                <div className="flex items-center justify-between px-2 pb-1.5 text-[10px] font-mono text-ink-dim uppercase tracking-wider">
                  <span>Navigation Controls</span>
                  <span>v2.4</span>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectTab(item.id)}
                        className={`
                          group relative flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all duration-200
                          ${
                            isActive
                              ? 'bg-ink text-paper-bottom shadow-md font-semibold ring-1 ring-accent-cyan/30'
                              : 'text-ink-muted hover:bg-hairline/20 hover:text-ink'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`
                              flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors
                              ${
                                isActive
                                  ? 'border-accent-cyan/40 bg-accent-cyan/15 text-accent-cyan shadow-[0_0_10px_rgba(0,210,255,0.3)]'
                                  : 'border-hairline bg-paper-elevated text-ink-dim group-hover:text-ink group-hover:border-hairlineStrong'
                              }
                            `}
                          >
                            <Icon className="h-4 w-4" />
                          </div>

                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-sans text-xs font-bold tracking-tight truncate">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="rounded-full bg-accent-rose text-white px-1.5 py-0.2 text-[9px] font-mono font-bold animate-pulse">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <span
                              className={`font-mono text-[10px] truncate ${
                                isActive ? 'text-paper-bottom/70' : 'text-ink-dim'
                              }`}
                            >
                              {item.sublabel}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pl-2">
                          <span
                            className={`font-mono text-[10px] ${
                              isActive ? 'text-accent-cyan font-bold' : 'text-ink-dim/50'
                            }`}
                          >
                            {item.index}
                          </span>
                          <ChevronRight
                            className={`h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 ${
                              isActive ? 'text-accent-cyan' : 'text-ink-dim/40'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </nav>

                {/* Footer status inside panel */}
                <div className="mt-2 pt-2 border-t border-hairline/40 px-2 flex items-center justify-between text-[10px] font-mono text-ink-dim">
                  <div className="flex items-center gap-1.5">
                    <Lock className="h-3 w-3 text-emerald-500" />
                    <span>ZERO-KNOWLEDGE VERIFIED</span>
                  </div>
                  <span>HOVER OUT / ESC</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── TOP-RIGHT FLOATING STATUS & THEME CAPSULE ── */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2.5 select-none font-sans">
        {/* Profile / Login Capsule */}
        {isAuthenticated && user ? (
          <button
            onClick={openProfileDrawer}
            title="Open Executive Security Clearance"
            className="hidden sm:flex items-center gap-2.5 rounded-2xl border border-hairline bg-paper-surface/85 dark:bg-[#07090e]/85 px-3.5 py-2 backdrop-blur-xl shadow-lg hover:border-accent-cyan/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group text-left"
          >
            <StatusBadge
              label="CORE SECURE"
              tone="emerald"
              pulse={true}
              size="sm"
            />
            <div className="h-3.5 w-[1px] bg-hairline" />
            <div className="flex flex-col text-right">
              <span className="font-sans text-xs font-bold text-ink leading-tight group-hover:text-accent-cyan transition-colors">
                {user.name}
              </span>
              <span className="font-mono text-[9px] text-ink-dim tracking-wider">
                {user.accountNumber}
              </span>
            </div>
          </button>
        ) : (
          <button
            onClick={openAuthModal}
            className="flex items-center gap-2 rounded-2xl border border-accent-cyan/40 bg-accent-cyan/10 hover:bg-accent-cyan/20 px-3.5 py-2 font-sans text-xs font-bold text-accent-cyan backdrop-blur-xl shadow-lg transition-all"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>Sign In</span>
          </button>
        )}

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          title={
            theme === 'dark'
              ? 'Switch to Ascend Paper Light Theme'
              : 'Switch to Obsidian Executive Theme'
          }
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-hairline bg-paper-surface/85 dark:bg-[#07090e]/85 text-ink-muted hover:text-ink hover:border-accent-cyan/50 hover:scale-105 active:scale-95 transition-all duration-200 backdrop-blur-xl shadow-lg"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-slate-700" />
          )}
        </button>
      </div>
    </>
  );
};


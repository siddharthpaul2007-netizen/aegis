import React from 'react';
import { useIntelligence } from '../../context/IntelligenceContext';
import { useTheme } from '../../context/ThemeContext';
import { Shield, Home, TrendingUp, Cpu, History, Sun, Moon } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

interface NavItem {
  id: 'command' | 'fraud' | 'health' | 'ai-center' | 'history';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, currentScenarioId } = useIntelligence();
  const { theme, toggleTheme } = useTheme();

  const navItems: NavItem[] = [
    { id: 'command', label: 'Home', icon: Home },
    { id: 'fraud', label: 'Fraud Intelligence', icon: Shield, badge: currentScenarioId !== 'legitimate_vendor' ? '1 Alert' : undefined },
    { id: 'health', label: 'Financial Health', icon: TrendingUp },
    { id: 'ai-center', label: 'AI Intelligence Center', icon: Cpu },
    { id: 'history', label: 'Insights & History', icon: History },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-hairline bg-paper-surface/85 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Wordmark */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('command')}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-paper-bottom shadow-sm">
            <Shield className="h-5 w-5 text-accent-cyan" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-extrabold tracking-tight text-ink">
                SENTINEL
              </span>
              <span className="font-mono text-[11px] font-medium tracking-widest text-ink-dim uppercase">
                // ASCEND
              </span>
            </div>
            <span className="font-mono text-[10px] text-ink-dim tracking-wider">
              AUTONOMOUS BANKING INTELLIGENCE
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-hairline bg-paper-elevated p-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium font-sans
                  transition-all duration-200 ease-out
                  ${
                    isActive
                      ? 'bg-ink text-paper-bottom shadow-sm font-semibold'
                      : 'text-ink-muted hover:text-ink hover:bg-hairline/20'
                  }
                `}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-accent-cyan' : 'text-ink-dim'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1 rounded-full bg-accent-rose text-white px-1.5 py-0.2 text-[9px] font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Telemetry & Theme Switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <StatusBadge
              label="CORE SECURE"
              tone="emerald"
              pulse={true}
              size="sm"
            />
            <div className="h-4 w-[1px] bg-hairline" />
            <div className="flex flex-col text-right">
              <span className="font-sans text-xs font-semibold text-ink">
                Deepak Sharma
              </span>
              <span className="font-mono text-[10px] text-ink-dim">
                ACC #4912 · ELITE
              </span>
            </div>
          </div>

          {/* Theme Toggle (Obsidian vs Ascend Paper) */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Ascend Paper Light Theme' : 'Switch to Obsidian Executive Theme'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-paper-elevated text-ink-muted hover:text-ink hover:border-hairlineStrong transition-colors duration-200"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="flex lg:hidden overflow-x-auto border-t border-hairline/50 px-2 py-1.5 scrollbar-none bg-paper-surface">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium mr-1
                ${
                  isActive
                    ? 'bg-ink text-paper-bottom font-semibold'
                    : 'text-ink-muted hover:text-ink'
                }
              `}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-accent-rose text-white px-1 py-0.1 text-[9px] font-mono">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};

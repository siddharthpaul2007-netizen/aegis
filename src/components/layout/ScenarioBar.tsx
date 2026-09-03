import React from 'react';
import { useIntelligence } from '../../context/IntelligenceContext';
import { DEMO_SCENARIOS } from '../../data/mockScenarios';
import { ScenarioId } from '../../types';
import { Play, Sparkles, ShieldCheck, AlertTriangle, TrendingDown } from 'lucide-react';

export const ScenarioBar: React.FC = () => {
  const { currentScenarioId, switchScenario } = useIntelligence();

  const scenarios: { id: ScenarioId; label: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'legitimate_vendor',
      label: '1. Legitimate Transfer (₹18.5k)',
      icon: <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />,
      color: 'border-emerald-500/30 text-emerald-400'
    },
    {
      id: 'digital_arrest',
      label: '2. "Digital Arrest" Coercion (₹2.4L)',
      icon: <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />,
      color: 'border-rose-500/30 text-rose-400'
    },
    {
      id: 'fake_kyc',
      label: '3. Fake KYC Phish (₹45k)',
      icon: <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />,
      color: 'border-amber-500/30 text-amber-400'
    },
    {
      id: 'financial_distress',
      label: '4. Impending Distress Alert',
      icon: <TrendingDown className="h-3.5 w-3.5 text-amber-400" />,
      color: 'border-amber-500/30 text-amber-400'
    }
  ];

  const handleSelectScenario = (id: ScenarioId) => {
    switchScenario(id);
  };

  return (
    <aside aria-label="Demo Scenario Switcher" className="w-full border-b border-hairline/70 bg-paper-surface/40 backdrop-blur-sm px-4 sm:px-6 lg:px-8 pt-20 pb-3 transition-colors duration-300">
      <div className="w-full flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left: Label + Scenario Buttons Grouped Together on the Left */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-accent-cyan/15 text-accent-cyan">
              <Sparkles className="h-3 w-3" />
            </span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
              Interactive Demo Scenarios:
            </span>
          </div>

          {/* Scenario Buttons directly attached on the Left */}
          <div className="flex flex-wrap items-center gap-1.5">
            {scenarios.map((sc) => {
              const isSelected = currentScenarioId === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => handleSelectScenario(sc.id)}
                  className={`
                    flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-mono font-medium transition-all duration-200
                    ${
                      isSelected
                        ? 'bg-ink text-paper-bottom shadow-sm font-semibold ring-1 ring-accent-cyan/40'
                        : 'bg-paper-elevated/70 text-ink-muted hover:text-ink hover:bg-paper-elevated border border-hairline'
                    }
                  `}
                >
                  {sc.icon}
                  <span>{sc.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Quick Run Telemetry Cue */}
        <div className="hidden xl:flex items-center gap-1.5 font-mono text-[10px] text-ink-dim">
          <span>SELECT SCENARIO TO AUTO-CONFIGURE INTELLIGENCE ENGINE</span>
        </div>
      </div>
    </aside>
  );
};

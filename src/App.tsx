import React from 'react';
import { useIntelligence } from './context/IntelligenceContext';
import { Header } from './components/layout/Header';
import { ScenarioBar } from './components/layout/ScenarioBar';
import { CornerCaptions } from './components/layout/CornerCaptions';
import { CustomCursor } from './components/layout/CustomCursor';

// Command Center components
import { CinematicHero } from './components/command/CinematicHero';

// Fraud Intelligence components
import { TransactionSimulator } from './components/fraud/TransactionSimulator';
import { ProgressiveAnalysis } from './components/fraud/ProgressiveAnalysis';
import { ContextInterview } from './components/fraud/ContextInterview';
import { ScamDeconstruction } from './components/fraud/ScamDeconstruction';
import { FrictionDecision } from './components/fraud/FrictionDecision';
import { RiskSignalPanel } from './components/fraud/RiskSignalPanel';

// Financial Health components
import { ResilienceTimeline } from './components/health/ResilienceTimeline';
import { AIInsightEngine } from './components/health/AIInsightEngine';
import { ScenarioEngine } from './components/health/ScenarioEngine';
import { ActionPlan } from './components/health/ActionPlan';

// AI Center components
import { PipelineVisualizer } from './components/ai-center/PipelineVisualizer';
import { EthicalSafeguards } from './components/ai-center/EthicalSafeguards';

// History components
import { AuditLedger } from './components/history/AuditLedger';

export const AppContent: React.FC = () => {
  const { activeTab } = useIntelligence();

  return (
    <div className="relative min-h-screen bg-paper-bottom text-ink selection:bg-accent-cyan/20 selection:text-ink pb-16">
      {/* Interactive Luxury Custom Cursor */}
      <CustomCursor />

      {/* Ascend Grain and Radial Ambient Backdrop */}
      <div className="pointer-events-none fixed inset-0 z-0 ascend-grain" />
      <div className="pointer-events-none fixed inset-0 z-0 ambient-glow" />

      {/* Main App Shell */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation & Scenario Toolbar */}
        <Header />
        <ScenarioBar />

        {/* Viewport Content */}
        {activeTab === 'command' ? (
          <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 animate-fade-up">
            <CinematicHero />
          </main>
        ) : (
          <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-fade-up">
            {activeTab === 'fraud' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Simulation Form & Decisions (6 cols) */}
                  <div className="lg:col-span-6 space-y-8">
                    <TransactionSimulator />
                    <FrictionDecision />
                  </div>

                  {/* Right Column: Progressive Analysis, Risk Signals & Context Interview (6 cols) */}
                  <div className="lg:col-span-6 space-y-8">
                    <ProgressiveAnalysis />
                    <RiskSignalPanel />
                    <ContextInterview />
                  </div>
                </div>

                {/* Full Width Bottom: Scam Pattern Deconstruction */}
                <ScamDeconstruction />
              </div>
            )}

            {activeTab === 'health' && (
              <div className="space-y-8">
                <ResilienceTimeline />
                <ScenarioEngine />
                <AIInsightEngine />
                <ActionPlan />
              </div>
            )}

            {activeTab === 'ai-center' && (
              <div className="space-y-8">
                <PipelineVisualizer />
                <EthicalSafeguards />
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-8">
                <AuditLedger />
              </div>
            )}
          </main>
        )}

        {/* Fixed Corner Captions (As in Ascend Design Stack spec) */}
        <CornerCaptions />
      </div>
    </div>
  );
};

export default function App() {
  return <AppContent />;
}

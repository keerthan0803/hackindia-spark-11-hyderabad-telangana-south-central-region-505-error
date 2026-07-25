import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AgentDetails() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex">
      {/* Fixed Sidebar */}
      <aside className="w-64 fixed left-0 top-0 h-screen bg-surface-container-low border-r border-outline-variant flex flex-col py-base px-gutter shadow-sm z-50 hidden lg:flex">
        <div className="mb-section-gap pt-4">
          <Link to="/" className="font-headline-md text-headline-md font-extrabold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              shield_person
            </span>
            AI Platform
          </Link>
          <p className="text-on-surface-variant font-label-sm mt-1">Enterprise Tier Auditor</p>
        </div>
        <nav className="flex-1 space-y-1">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-l-lg transition-colors"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-body-md">Dashboard</span>
          </Link>
          <Link
            to="/processing"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-l-lg transition-colors"
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span className="font-body-md">New Audit</span>
          </Link>
          <Link
            to="/report"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-l-lg transition-colors"
          >
            <span className="material-symbols-outlined">analytics</span>
            <span className="font-body-md">Reports</span>
          </Link>
          <Link
            to="/agent-details"
            className="active-nav flex items-center gap-3 px-4 py-3 rounded-l-lg transition-colors"
          >
            <span className="material-symbols-outlined">payments</span>
            <span className="font-body-md font-bold">Financial Agent</span>
          </Link>
          <Link
            to="/history"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-l-lg transition-colors"
          >
            <span className="material-symbols-outlined">history</span>
            <span className="font-body-md">Audit History</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-l-lg transition-colors"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-body-md">Settings</span>
          </Link>
        </nav>
        <div className="mt-auto pt-4 border-t border-outline-variant/30 space-y-1">
          <Link
            to="/help"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-l-lg transition-colors"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="font-body-md">Help Center</span>
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-l-lg transition-colors"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-body-md">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="lg:ml-64 flex-1 flex flex-col min-h-screen">
        {/* Sticky Header */}
        <header className="h-16 flex items-center justify-between px-container-padding sticky top-0 bg-surface/80 backdrop-blur-md z-40 border-b border-outline-variant/30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/report')}
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 font-bold text-xs"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span> Return to Executive Report
            </button>
            <span className="text-outline-variant">|</span>
            <h2 className="font-headline-md text-headline-md font-bold text-primary">Financial Agent Deep Analysis</h2>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => window.print()} className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-xs shadow-sm hover:bg-on-primary-fixed-variant transition-colors">
              Export Analysis PDF
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="p-container-padding space-y-section-gap max-w-5xl mx-auto w-full pb-32">
          {/* Agent Banner */}
          <section id="overview" className="scroll-mt-24">
            <div className="bg-white rounded-2xl p-8 border border-outline-variant/30 custom-shadow border-l-8 border-l-primary flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase">
                    Agent Complete
                  </span>
                  <span className="text-xs text-on-surface-variant">Runtime: 1m 42s</span>
                </div>
                <h3 className="font-headline-lg text-2xl font-bold text-on-surface">Financial Forensic Agent</h3>
                <p className="text-sm text-on-surface-variant mt-1">
                  Target Asset: <span className="font-bold text-on-surface">Q3_Financial_Forecast_v2.pdf</span>
                </p>
              </div>

              <div className="flex items-center gap-6 bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
                <div className="text-center">
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Risk Exposure</p>
                  <p className="text-3xl font-black text-error">82<span className="text-xs text-outline">/100</span></p>
                </div>
                <div className="h-8 w-px bg-outline-variant"></div>
                <div className="text-center">
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Confidence</p>
                  <p className="text-xl font-bold text-secondary">94%</p>
                </div>
              </div>
            </div>
          </section>

          {/* Key Findings Section */}
          <section id="findings" className="scroll-mt-24">
            <h3 className="font-headline-md text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              Agent Reasoning & Evidence Trace
            </h3>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 border border-outline-variant/30 custom-shadow border-l-4 border-l-error">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2.5 py-0.5 rounded bg-error/10 text-error text-[10px] font-black uppercase">
                    CRITICAL EXPOSURE
                  </span>
                  <span className="text-xs text-on-surface-variant">Confidence: 98%</span>
                </div>
                <h4 className="font-bold text-on-surface text-base mb-2">Unrealistic Revenue Growth Multiples</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  The model projects a 42% YoY growth rate in the EMEA sector despite regional macro-economic headwinds showing an industry average of 4.2%. This anomaly creates a projected deficit of $14.8M.
                </p>
                <div className="bg-surface-container-low p-4 rounded-lg font-mono text-xs text-on-surface">
                  <p className="text-primary font-bold mb-1">// Document Reference: Page 4, Section 3.2</p>
                  <p className="italic text-on-surface-variant">
                    "EMEA regional expansion is projected to deliver €18.4M in Q3 revenue based on aggressive market share acquisition..."
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-outline-variant/30 custom-shadow border-l-4 border-l-amber-500">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase">
                    HIGH RISK
                  </span>
                  <span className="text-xs text-on-surface-variant">Confidence: 91%</span>
                </div>
                <h4 className="font-bold text-on-surface text-base mb-2">Underestimated OPEX Expansion Costs</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  Operational expenditure calculations fail to incorporate mandatory European data sovereignty compliance headcount costs, understating expenses by $3.2M.
                </p>
              </div>
            </div>
          </section>

          {/* Strategic Recommendations */}
          <section id="recommendations" className="scroll-mt-24">
            <h3 className="font-headline-md text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">lightbulb</span>
              Agent Recommendations
            </h3>
            <div className="bg-white rounded-xl p-6 border border-outline-variant/30 custom-shadow space-y-4">
              <div className="p-4 bg-surface-container-low rounded-lg border-l-4 border-l-primary flex justify-between items-center">
                <div>
                  <p className="font-bold text-sm text-on-surface">Priority 1: Revise EMEA Growth Model</p>
                  <p className="text-xs text-on-surface-variant">Cap Q3 revenue growth projections at conservative 12% benchmark.</p>
                </div>
                <span className="text-xs font-bold text-secondary">Action Needed</span>
              </div>
              <div className="p-4 bg-surface-container-low rounded-lg border-l-4 border-l-primary flex justify-between items-center">
                <div>
                  <p className="font-bold text-sm text-on-surface">Priority 2: Re-allocate OPEX Budget</p>
                  <p className="text-xs text-on-surface-variant">Add $3.2M line-item for EU compliance staffing.</p>
                </div>
                <span className="text-xs font-bold text-secondary">Action Needed</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

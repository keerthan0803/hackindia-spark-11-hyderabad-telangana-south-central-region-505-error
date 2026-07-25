import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Report() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('financial');

  const financialIssues = [
    {
      severity: 'Critical',
      issue: 'Unrealistic Revenue Growth Projections',
      category: 'Financial Model',
      confidence: '98%',
      impact: 'High Risk of Deficit',
    },
    {
      severity: 'High',
      issue: 'Underestimated OPEX in Regional Expansion',
      category: 'Operating Expense',
      confidence: '91%',
      impact: '$3.2M Budget Gap',
    },
  ];

  const legalIssues = [
    {
      severity: 'Medium',
      issue: 'Third-Party Indemnification Clause Ambiguity',
      category: 'Contract Law',
      confidence: '85%',
      impact: 'Potential Liability',
    },
  ];

  const marketIssues = [
    {
      severity: 'Medium',
      issue: 'Competitor Pricing Aggression Underestimated',
      category: 'Market Intelligence',
      confidence: '78%',
      impact: 'Margin Compression',
    },
  ];

  const securityIssues = [
    {
      severity: 'Critical',
      issue: 'Prompt Injection Risk in Appendix B Input Field',
      category: 'Cybersecurity',
      confidence: '99%',
      impact: 'System Instruction Leak',
    },
  ];

  const getIssuesForTab = () => {
    switch (activeTab) {
      case 'financial':
        return financialIssues;
      case 'legal':
        return legalIssues;
      case 'market':
        return marketIssues;
      case 'security':
        return securityIssues;
      default:
        return financialIssues;
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen font-sans">
      {/* Header */}
      <header className="bg-surface border-b border-outline-variant shadow-sm sticky top-0 z-40 flex justify-between items-center px-container-padding h-20 w-full">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">security</span>
            <h1 className="font-headline-md text-headline-md font-bold text-primary">Adversarial Auditor</h1>
          </Link>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          <nav className="flex gap-8">
            <Link className="text-on-surface-variant font-label-md hover:text-primary transition-colors" to="/dashboard">
              Dashboard
            </Link>
            <Link className="text-on-surface-variant font-label-md hover:text-primary transition-colors" to="/history">
              Audit History
            </Link>
            <Link className="text-on-surface-variant font-label-md hover:text-primary transition-colors" to="/report-details">
              AI Agents
            </Link>
            <Link className="text-primary font-semibold font-label-md" to="/report">
              Risk Reports
            </Link>
            <Link className="text-on-surface-variant font-label-md hover:text-primary transition-colors" to="/settings">
              Settings
            </Link>
          </nav>
          <div className="h-8 w-px bg-outline-variant"></div>
          <button onClick={() => window.print()} className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm shadow-md hover:bg-on-primary-fixed-variant transition-all">
            Export PDF
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-container-padding py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-on-surface-variant font-label-sm mb-6">
          <Link to="/dashboard" className="hover:text-primary cursor-pointer">
            Dashboard
          </Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-primary font-semibold">Executive Audit Report</span>
        </nav>

        {/* Executive Banner */}
        <div className="bg-white rounded-2xl border border-outline-variant/30 custom-shadow p-8 mb-10 border-l-8 border-l-error">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-error/10 text-error rounded-full font-bold text-xs uppercase tracking-wider">
                  Critical Exposure
                </span>
                <span className="text-xs text-on-surface-variant">Audit ID: #AUD-882</span>
              </div>
              <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Q3_Financial_Forecast.pdf</h2>
              <p className="text-on-surface-variant text-sm mt-1">
                Target Department: Finance • Processed 14 Pages with 4 AI Agents
              </p>
            </div>

            <div className="flex items-center gap-6 bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
              <div className="text-center">
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Global Risk Score</p>
                <p className="text-4xl font-black text-error">88<span className="text-xs text-outline">/100</span></p>
              </div>
              <div className="h-10 w-px bg-outline-variant"></div>
              <div className="text-center">
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Confidence</p>
                <p className="text-2xl font-bold text-secondary">94%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Agent Department Tabs */}
        <div className="mb-8 border-b border-outline-variant/50 flex gap-4 overflow-x-auto">
          {[
            { id: 'financial', label: 'Financial Agent Analysis', icon: 'payments', count: 2, badge: 'Critical' },
            { id: 'legal', label: 'Legal Compliance Filter', icon: 'gavel', count: 1, badge: 'Medium' },
            { id: 'market', label: 'Market Intelligence', icon: 'trending_up', count: 1, badge: 'Medium' },
            { id: 'security', label: 'Security Vulnerabilities', icon: 'shield_lock', count: 1, badge: 'Critical' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-4 flex items-center gap-2 font-bold text-sm transition-all outline-none border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              {tab.label}
              <span
                className={`ml-1 px-2 py-0.5 rounded-full text-[10px] ${
                  tab.badge === 'Critical'
                    ? 'bg-error/10 text-error'
                    : 'bg-amber-500/10 text-amber-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Main Findings Table */}
          <div className="lg:col-span-8 space-y-gutter">
            <div className="bg-white rounded-2xl border border-outline-variant/30 custom-shadow p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-xl font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">search_insights</span>
                  Identified Findings & Adversarial Vectoring
                </h3>
                {activeTab === 'financial' && (
                  <button
                    onClick={() => navigate('/agent-details')}
                    className="text-primary font-bold text-xs hover:underline flex items-center gap-1"
                  >
                    Deep Dive Reasoning <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {getIssuesForTab().map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-low hover:bg-surface-bright transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                          item.severity === 'Critical' ? 'bg-error/10 text-error' : 'bg-amber-500/10 text-amber-600'
                        }`}
                      >
                        {item.severity}
                      </span>
                      <span className="text-xs text-on-surface-variant">Confidence: {item.confidence}</span>
                    </div>
                    <h4 className="font-bold text-on-surface text-base mb-1">{item.issue}</h4>
                    <p className="text-xs text-on-surface-variant mb-4">Category: {item.category}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-outline-variant/30">
                      <span className="text-xs font-bold text-error">Impact: {item.impact}</span>
                      <button
                        onClick={() => navigate('/agent-details')}
                        className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                      >
                        View Full Trace <span className="material-symbols-outlined text-xs">open_in_new</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Roadmap */}
            <div className="bg-white rounded-2xl border border-outline-variant/30 custom-shadow p-8">
              <h3 className="font-headline-md text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">route</span>
                Remediation Roadmap
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-surface-container-low rounded-xl border-l-4 border-l-primary flex justify-between items-center">
                  <div>
                    <p className="font-bold text-sm text-on-surface">1. Recalibrate YoY Growth Multiples</p>
                    <p className="text-xs text-on-surface-variant">Adjust 42% revenue projection down to conservative 14% benchmark.</p>
                  </div>
                  <span className="text-xs font-bold text-secondary">High Priority</span>
                </div>
                <div className="p-4 bg-surface-container-low rounded-xl border-l-4 border-l-primary flex justify-between items-center">
                  <div>
                    <p className="font-bold text-sm text-on-surface">2. Sanitize Input Fields in Appendix B</p>
                    <p className="text-xs text-on-surface-variant">Prevent user-prompt injection paths detected in document parser.</p>
                  </div>
                  <span className="text-xs font-bold text-error">Immediate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary Side Panel */}
          <div className="lg:col-span-4 space-y-gutter">
            <div className="bg-white rounded-2xl border border-outline-variant/30 custom-shadow p-8">
              <h4 className="font-bold text-on-surface mb-4">Audit Metadata</h4>
              <div className="space-y-3 text-xs text-on-surface-variant">
                <div className="flex justify-between py-2 border-b border-outline-variant/20">
                  <span>Audit Date</span>
                  <span className="font-bold text-on-surface">Oct 24, 2024</span>
                </div>
                <div className="flex justify-between py-2 border-b border-outline-variant/20">
                  <span>File Format</span>
                  <span className="font-bold text-on-surface">PDF Document (14 pgs)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-outline-variant/20">
                  <span>Inference Engine</span>
                  <span className="font-bold text-primary">Qwen2.5:7B (Local)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-outline-variant/20">
                  <span>Parser Status</span>
                  <span className="font-bold text-secondary">Verified Optimal</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => navigate('/report-details')}
                  className="w-full py-3 bg-primary-container text-white rounded-xl font-bold shadow-md hover:bg-primary transition-all text-xs flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">memory</span>
                  View Live Execution Log
                </button>
                <button
                  onClick={() => navigate('/agent-details')}
                  className="w-full py-3 border border-outline-variant text-on-surface rounded-xl font-bold hover:bg-surface-container-high transition-all text-xs flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">account_balance</span>
                  Financial Deep-Dive
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

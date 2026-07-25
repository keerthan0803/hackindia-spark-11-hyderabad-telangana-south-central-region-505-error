import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-outline-variant/30 custom-shadow">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-headline-lg text-2xl font-bold text-on-surface">Executive Audit Report</h2>
            <span className="px-2.5 py-0.5 bg-red-50 text-error text-[10px] font-bold rounded-full uppercase">
              Overall Risk 88/100 • Critical
            </span>
          </div>
          <p className="text-xs text-on-surface-variant">Document: Q3_Financial_Forecast_v2.pdf • Audited Oct 24, 2024</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate('/report-details')}
            className="px-4 py-2 border border-outline-variant text-on-surface-variant text-xs font-bold rounded-xl hover:bg-surface-variant transition-colors"
          >
            Topology Hub
          </button>
          <button
            onClick={() => alert('Downloading Executive PDF Report...')}
            className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-md hover:bg-on-primary-fixed-variant transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Metric Gauge & Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Risk Score Gauge Card */}
        <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 custom-shadow text-center flex flex-col justify-between">
          <h3 className="font-bold text-xs text-on-surface-variant uppercase tracking-wider">Composite Risk Rating</h3>
          <div className="py-4">
            <div className="w-24 h-24 rounded-full border-8 border-error flex items-center justify-center mx-auto bg-red-50">
              <span className="font-black text-3xl text-error">88</span>
            </div>
          </div>
          <span className="px-3 py-1 bg-red-50 text-error text-xs font-bold rounded-full uppercase inline-block mx-auto">
            Action Required Before Signing
          </span>
        </div>

        {/* Executive Findings Summary */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-outline-variant/40 custom-shadow space-y-3 flex flex-col justify-between">
          <h3 className="font-bold text-sm text-on-surface">Coordinator Executive Summary</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed bg-surface p-4 rounded-xl border border-outline-variant/30">
            Audit analyzed across 4 domain agents. Global Risk Score is 88/100 (Critical Risk). Unrealistic revenue growth models in EMEA coupled with prompt injection vulnerabilities in Appendix B require immediate executive remediation prior to clearance.
          </p>
          <div className="flex gap-4 text-xs font-bold text-on-surface pt-2">
            <div>
              <span className="text-error">2</span> Critical Findings
            </div>
            <div>
              <span className="text-amber-600">2</span> Medium Findings
            </div>
            <div>
              <span className="text-secondary">94%</span> Agent Confidence
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Agent Tabs & Findings Table */}
      <div className="bg-white rounded-2xl border border-outline-variant/40 custom-shadow overflow-hidden">
        {/* Department Tabs */}
        <div className="flex border-b border-outline-variant/30 bg-surface-container-low px-4 pt-2">
          {[
            { id: 'financial', label: 'Financial Agent (2)', icon: 'payments' },
            { id: 'legal', label: 'Legal Agent (1)', icon: 'gavel' },
            { id: 'market', label: 'Market Agent (1)', icon: 'trending_up' },
            { id: 'security', label: 'Security Agent (1)', icon: 'shield_lock' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-primary text-primary bg-white rounded-t-xl shadow-xs'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Findings Table */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">
                  <th className="px-6 py-3.5">Severity</th>
                  <th className="px-6 py-3.5">Identified Issue Vector</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">AI Confidence</th>
                  <th className="px-6 py-3.5">Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30 text-xs">
                {getIssuesForTab().map((item, idx) => (
                  <tr key={idx} className="hover:bg-surface transition-colors">
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase ${
                          item.severity === 'Critical'
                            ? 'bg-red-50 text-error'
                            : item.severity === 'High'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-blue-50 text-primary'
                        }`}
                      >
                        {item.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-on-surface">{item.issue}</td>
                    <td className="px-6 py-4 text-on-surface-variant">{item.category}</td>
                    <td className="px-6 py-4 font-bold text-secondary">{item.confidence}</td>
                    <td className="px-6 py-4 text-on-surface-variant">{item.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

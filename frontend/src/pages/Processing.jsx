import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Processing() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Audit configuration states
  const [auditName, setAuditName] = useState('Q3 Strategy Integrity Check');
  const [department, setDepartment] = useState('Finance');
  const [priorityLevel, setPriorityLevel] = useState('Critical');
  const [auditPurpose, setAuditPurpose] = useState('');
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStatusText, setLaunchStatusText] = useState('Launch Audit');

  // Document upload state
  const [uploadedFile, setUploadedFile] = useState({
    name: 'Q3_Financial_Forecast.pdf',
    size: '2.4 MB',
    type: 'PDF Document',
    pages: 14,
    words: '4,200',
  });

  // Selected agents state
  const [selectedAgents, setSelectedAgents] = useState({
    financial: true,
    legal: true,
    market: false,
    security: false,
  });

  const toggleAgent = (key) => {
    setSelectedAgents((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const calculateDuration = () => {
    let totalSecs = 0;
    if (selectedAgents.financial) totalSecs += 120;
    if (selectedAgents.legal) totalSecs += 90;
    if (selectedAgents.market) totalSecs += 180;
    if (selectedAgents.security) totalSecs += 60;

    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}m ${secs ? `${secs}s` : '0s'}`;
  };

  const handleLaunchAudit = () => {
    setIsLaunching(true);
    setLaunchStatusText('Preparing Audit...');
    setTimeout(() => {
      setLaunchStatusText('Audit Initiated!');
      setTimeout(() => {
        navigate('/report-details');
      }, 800);
    }, 1200);
  };

  const handleReplaceClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type || 'Uploaded File',
        pages: 10,
        words: '3,100',
      });
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col justify-between">
      {/* Top Navigation Bar */}
      <header className="bg-surface border-b border-outline-variant shadow-sm sticky top-0 z-50 flex justify-between items-center px-container-padding h-20 w-full">
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
              Audit Logs
            </Link>
            <Link className="text-on-surface-variant font-label-md hover:text-primary transition-colors" to="/report-details">
              AI Agents
            </Link>
            <Link className="text-on-surface-variant font-label-md hover:text-primary transition-colors" to="/report">
              Risk Reports
            </Link>
          </nav>
          <div className="h-8 w-px bg-outline-variant"></div>
          <Link to="/settings" className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold">
            RC
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-container-padding py-12 flex-grow w-full">
        {/* Breadcrumb & Header */}
        <div className="mb-section-gap">
          <nav className="flex items-center gap-2 text-on-surface-variant font-label-sm mb-4">
            <Link to="/dashboard" className="hover:text-primary cursor-pointer">
              Dashboard
            </Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-primary font-semibold">New Audit</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Start New Corporate Audit</h2>
              <p className="text-body-lg text-on-surface-variant mt-2 max-w-2xl">
                Configure your audit parameters, select specialized AI agents, and upload the target documentation for adversarial stress testing.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 rounded-lg border border-outline-variant text-on-surface-variant font-label-md hover:bg-surface-container-high transition-colors active:scale-95 duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleLaunchAudit}
                disabled={isLaunching}
                className="px-6 py-3 rounded-lg bg-primary-container text-white font-label-md shadow-md hover:opacity-90 transition-all active:scale-95 duration-150 flex items-center gap-2"
              >
                <span className={`material-symbols-outlined text-sm ${isLaunching ? 'animate-spin' : ''}`}>
                  {isLaunching ? 'refresh' : 'rocket_launch'}
                </span>
                {launchStatusText}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column: Settings & Upload */}
          <div className="lg:col-span-8 flex flex-col gap-stack-md">
            {/* Section 1: Document Upload Card */}
            <section className="premium-card relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline-md text-headline-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">upload_file</span>
                  Document Source
                </h3>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.docx,.xlsx,.sol,.py,.js"
              />

              {uploadedFile ? (
                <div className="bg-secondary-container/10 border border-secondary-container rounded-xl p-6 flex items-center gap-6">
                  <div className="w-16 h-16 bg-secondary-container flex items-center justify-center rounded-lg">
                    <span className="material-symbols-outlined text-on-secondary-container text-3xl">description</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-on-surface">{uploadedFile.name}</h4>
                      <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-[10px]">
                        SUCCESS
                      </span>
                    </div>
                    <p className="text-label-md text-on-surface-variant">
                      {uploadedFile.size} • {uploadedFile.type}
                    </p>
                    <div className="mt-3 flex gap-4">
                      <button
                        type="button"
                        onClick={() => alert(`Previewing ${uploadedFile.name}`)}
                        className="text-primary font-label-sm hover:underline flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">visibility</span> Preview
                      </button>
                      <button
                        type="button"
                        onClick={handleReplaceClick}
                        className="text-primary font-label-sm hover:underline flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">sync</span> Replace
                      </button>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="text-error font-label-sm hover:underline flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  onClick={handleReplaceClick}
                  className="bg-white p-10 rounded-xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-4xl text-outline mb-2">upload_file</span>
                  <p className="font-bold text-on-surface">Click or Drag File to Upload</p>
                </div>
              )}
            </section>

            {/* Section 2: Document Preview / Metadata */}
            <section className="premium-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline-md text-headline-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  Initial Metadata
                </h3>
                <div className="flex gap-4">
                  <div className="text-right">
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Pages</p>
                    <p className="font-bold text-primary">{uploadedFile ? uploadedFile.pages : 0}</p>
                  </div>
                  <div className="text-right border-l border-outline-variant pl-4">
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Words</p>
                    <p className="font-bold text-primary">{uploadedFile ? uploadedFile.words : 0}</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant">
                <p className="text-on-surface-variant font-body-md leading-relaxed line-clamp-4">
                  <strong>Executive Summary:</strong> The following financial forecast details the projected revenue streams and capital expenditure for the third fiscal quarter of the current year. This document includes proprietary modeling regarding market penetration in the EMEA region and anticipated fluctuations in currency exchange rates. Management identifies key risk factors including supply chain volatility and regulatory shifts in emerging markets...
                </p>
                <div className="mt-4 pt-4 border-t border-outline-variant/50 flex items-center justify-between">
                  <span className="text-label-sm text-on-surface-variant">Classified: Financial Proposal / Q3-2024</span>
                  <button
                    onClick={() => alert('Extracting full document text...')}
                    className="text-primary font-bold font-label-sm flex items-center gap-1"
                  >
                    Read Full Extraction <span className="material-symbols-outlined text-sm">arrow_outward</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Section 3: Audit Configuration */}
            <section className="premium-card">
              <h3 className="font-headline-md text-headline-md mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">settings_applications</span>
                Audit Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md mb-stack-md">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface-variant px-1">Audit Name</label>
                  <input
                    className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                    type="text"
                    value={auditName}
                    onChange={(e) => setAuditName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface-variant px-1">Department</label>
                  <select
                    className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="Finance">Finance</option>
                    <option value="Legal & Compliance">Legal & Compliance</option>
                    <option value="Operations">Operations</option>
                    <option value="Executive Board">Executive Board</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-stack-md">
                <label className="font-label-md text-on-surface-variant px-1">Priority Level</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPriorityLevel('Low')}
                    className={`flex-1 py-3 rounded-lg border font-label-md transition-all ${
                      priorityLevel === 'Low'
                        ? 'border-primary bg-primary-container text-white font-bold'
                        : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    Low
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriorityLevel('Medium')}
                    className={`flex-1 py-3 rounded-lg border font-label-md transition-all ${
                      priorityLevel === 'Medium'
                        ? 'border-primary bg-primary-container text-white font-bold'
                        : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriorityLevel('Critical')}
                    className={`flex-1 py-3 rounded-lg border font-label-md transition-all ${
                      priorityLevel === 'Critical'
                        ? 'border-primary bg-primary-container text-white font-bold'
                        : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    Critical
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-md text-on-surface-variant px-1">Purpose of Audit</label>
                <textarea
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none"
                  placeholder="Explain the context and main risks to investigate..."
                  rows={3}
                  value={auditPurpose}
                  onChange={(e) => setAuditPurpose(e.target.value)}
                ></textarea>
              </div>
            </section>

            {/* Section 4: AI Agent Selection */}
            <section className="premium-card">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-headline-md text-headline-md flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">smart_toy</span>
                    AI Agent Deployment
                  </h3>
                  <p className="text-label-md text-on-surface-variant mt-1">Select specialized agents to stress-test your document.</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Total Est. Runtime</p>
                  <p className="font-bold text-primary text-lg">~{calculateDuration()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Financial Agent */}
                <div
                  onClick={() => toggleAgent('financial')}
                  className={`p-6 rounded-xl border transition-all cursor-pointer relative ${
                    selectedAgents.financial ? 'agent-card-active' : 'border-outline-variant hover:bg-surface-container-high'
                  }`}
                >
                  {selectedAgents.financial && (
                    <div className="absolute top-4 right-4">
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">account_balance</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">Financial Agent</h4>
                      <p className="text-label-sm text-on-surface-variant mt-1">Numerical integrity and P&L consistency checks.</p>
                      <p className="text-[10px] font-bold text-primary mt-3 uppercase">Runtime: ~2 mins</p>
                    </div>
                  </div>
                </div>

                {/* Legal Agent */}
                <div
                  onClick={() => toggleAgent('legal')}
                  className={`p-6 rounded-xl border transition-all cursor-pointer relative ${
                    selectedAgents.legal ? 'agent-card-active' : 'border-outline-variant hover:bg-surface-container-high'
                  }`}
                >
                  {selectedAgents.legal && (
                    <div className="absolute top-4 right-4">
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">gavel</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">Legal Agent</h4>
                      <p className="text-label-sm text-on-surface-variant mt-1">Compliance screening and contractual risk analysis.</p>
                      <p className="text-[10px] font-bold text-primary mt-3 uppercase">Runtime: ~1.5 mins</p>
                    </div>
                  </div>
                </div>

                {/* Market Agent */}
                <div
                  onClick={() => toggleAgent('market')}
                  className={`p-6 rounded-xl border transition-all cursor-pointer relative ${
                    selectedAgents.market ? 'agent-card-active' : 'border-outline-variant hover:bg-surface-container-high'
                  }`}
                >
                  {selectedAgents.market && (
                    <div className="absolute top-4 right-4">
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-outline-variant/30 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant">trending_up</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">Market Agent</h4>
                      <p className="text-label-sm text-on-surface-variant mt-1">Competitor benchmarking and trend validation.</p>
                      <p className="text-[10px] font-bold text-on-surface-variant mt-3 uppercase">Runtime: ~3 mins</p>
                    </div>
                  </div>
                </div>

                {/* Security Agent */}
                <div
                  onClick={() => toggleAgent('security')}
                  className={`p-6 rounded-xl border transition-all cursor-pointer relative ${
                    selectedAgents.security ? 'agent-card-active' : 'border-outline-variant hover:bg-surface-container-high'
                  }`}
                >
                  {selectedAgents.security && (
                    <div className="absolute top-4 right-4">
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-outline-variant/30 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant">shield_lock</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">Security Agent</h4>
                      <p className="text-label-sm text-on-surface-variant mt-1">Data leak prevention and info-sec risk audit.</p>
                      <p className="text-[10px] font-bold text-on-surface-variant mt-3 uppercase">Runtime: ~1 min</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Expected Output */}
            <section className="premium-card">
              <h3 className="font-headline-md text-headline-md mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">fact_check</span>
                Analysis Output
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center text-center gap-3 cursor-pointer" onClick={() => navigate('/report')}>
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">summarize</span>
                  </div>
                  <span className="font-label-sm text-on-surface text-[11px] leading-tight uppercase">
                    Executive
                    <br />
                    Summary
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-3 cursor-pointer" onClick={() => navigate('/report')}>
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">warning</span>
                  </div>
                  <span className="font-label-sm text-on-surface text-[11px] leading-tight uppercase">
                    Risk
                    <br />
                    Scores
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-3 cursor-pointer" onClick={() => navigate('/report-details')}>
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">rule</span>
                  </div>
                  <span className="font-label-sm text-on-surface text-[11px] leading-tight uppercase">
                    Critical
                    <br />
                    Findings
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-3 cursor-pointer" onClick={() => navigate('/agent-details')}>
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">lightbulb</span>
                  </div>
                  <span className="font-label-sm text-on-surface text-[11px] leading-tight uppercase">
                    Strategic
                    <br />
                    Recomm.
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Summary Panel */}
          <div className="lg:col-span-4 h-full">
            <aside className="lg:sticky lg:top-28 flex flex-col gap-stack-md">
              <div className="premium-card bg-surface-container-low">
                <h3 className="font-headline-md text-headline-md mb-6 border-b border-outline-variant pb-4">
                  Audit Summary
                </h3>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Document</span>
                    <p className="text-body-md font-semibold text-on-surface truncate">
                      {uploadedFile ? uploadedFile.name : 'No file selected'}
                    </p>
                    <p className="text-label-sm text-on-surface-variant">{uploadedFile ? `${uploadedFile.size} PDF` : ''}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Active Agents</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedAgents.financial && (
                        <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-label-sm font-bold">
                          <span className="material-symbols-outlined text-sm">account_balance</span>
                          Financial
                        </div>
                      )}
                      {selectedAgents.legal && (
                        <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-label-sm font-bold">
                          <span className="material-symbols-outlined text-sm">gavel</span>
                          Legal
                        </div>
                      )}
                      {selectedAgents.market && (
                        <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-label-sm font-bold">
                          <span className="material-symbols-outlined text-sm">trending_up</span>
                          Market
                        </div>
                      )}
                      {selectedAgents.security && (
                        <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-label-sm font-bold">
                          <span className="material-symbols-outlined text-sm">shield_lock</span>
                          Security
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-outline-variant/50">
                    <div>
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Priority</span>
                      <p className="text-error font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                        {priorityLevel.toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Department</span>
                      <p className="text-on-surface font-semibold">{department}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-body-md font-medium text-on-surface">Estimated Duration</span>
                    <span className="font-display-lg text-2xl text-primary font-bold">{calculateDuration()}</span>
                  </div>

                  <button
                    onClick={handleLaunchAudit}
                    disabled={isLaunching}
                    className="w-full py-4 rounded-xl bg-primary-container text-white font-bold text-body-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    <span className={`material-symbols-outlined ${isLaunching ? 'animate-spin' : ''}`}>
                      {isLaunching ? 'refresh' : 'rocket_launch'}
                    </span>
                    {launchStatusText}
                  </button>

                  <p className="text-center text-[11px] text-on-surface-variant px-4">
                    By clicking Launch, you authorize the deployment of AI Agents to access and analyze the uploaded corporate assets.
                  </p>
                </div>
              </div>

              {/* AI Confidence Indicator */}
              <div className="p-6 rounded-xl border border-outline-variant bg-white flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border-2 border-secondary flex items-center justify-center text-secondary font-bold text-xs">
                  98%
                </div>
                <div>
                  <p className="text-label-md font-bold text-on-surface">Parser Confidence</p>
                  <p className="text-label-sm text-on-surface-variant">Extraction quality: Optimal</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Bottom Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-surface-container border-t border-outline-variant shadow-[0px_-4px_20px_rgba(15,23,42,0.05)]">
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1">
          <span className="material-symbols-outlined">monitoring</span>
          <span className="font-label-sm text-label-sm">Monitor</span>
        </Link>
        <Link to="/processing" className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-4 py-1">
          <span className="material-symbols-outlined">document_scanner</span>
          <span className="font-label-sm text-label-sm">Scan</span>
        </Link>
        <Link to="/report" className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1">
          <span className="material-symbols-outlined">memory</span>
          <span className="font-label-sm text-label-sm font-bold">Reports</span>
        </Link>
      </nav>
    </div>
  );
}

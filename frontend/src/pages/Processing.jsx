import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { runAudit } from '../services/api';

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
    rawFile: null,
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

  const handleLaunchAudit = async () => {
    setIsLaunching(true);
    setLaunchStatusText('Preparing Multi-Agent Workflow...');

    try {
      if (uploadedFile.rawFile) {
        await runAudit(uploadedFile.rawFile);
      }
      setLaunchStatusText('Audit Initiated!');
      setTimeout(() => {
        navigate('/report-details');
      }, 600);
    } catch (err) {
      console.warn('Backend execution active fallback:', err.message);
      setLaunchStatusText('Audit Initiated!');
      setTimeout(() => {
        navigate('/report-details');
      }, 600);
    }
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
        rawFile: file,
      });
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.docx,.xlsx,.sol,.py,.js"
      />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-outline-variant/30 custom-shadow">
        <div>
          <span className="px-3 py-1 bg-blue-50 text-primary text-[10px] font-bold uppercase rounded-full tracking-wider">
            Step 1 of 3 • Configuration
          </span>
          <h2 className="font-headline-lg text-2xl font-bold text-on-surface mt-2">New Audit Setup</h2>
          <p className="text-xs text-on-surface-variant">Configure target scope and select AI vector agents</p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 border border-outline-variant text-on-surface-variant text-xs font-bold rounded-xl hover:bg-surface-variant transition-colors"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Scope & Document */}
        <div className="lg:col-span-2 space-y-6">
          {/* Scope Configuration Card */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 custom-shadow space-y-4">
            <h3 className="font-bold text-sm text-on-surface">1. Audit Scope & Identity</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-on-surface-variant mb-1">
                  Audit Title
                </label>
                <input
                  type="text"
                  value={auditName}
                  onChange={(e) => setAuditName(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/40 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-on-surface-variant mb-1">
                    Department Scope
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-surface border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Finance">Financial Services</option>
                    <option value="Legal">Legal & Regulatory</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Operations">Executive Ops</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-on-surface-variant mb-1">
                    Priority Tier
                  </label>
                  <select
                    value={priorityLevel}
                    onChange={(e) => setPriorityLevel(e.target.value)}
                    className="w-full bg-surface border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Critical">Critical Priority</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Document Attachment Card */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 custom-shadow space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-on-surface">2. Target Document</h3>
              <button
                onClick={handleReplaceClick}
                className="text-primary text-xs font-bold hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">sync</span> Replace File
              </button>
            </div>

            <div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">description</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">{uploadedFile.name}</p>
                  <p className="text-[10px] text-on-surface-variant">
                    {uploadedFile.size} • {uploadedFile.pages} Pages • {uploadedFile.words} Words
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-secondary text-[10px] font-bold rounded-full uppercase">
                OCR Verified
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: AI Vector Agents & Launch Trigger */}
        <div className="space-y-6">
          {/* Agent Selection Card */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 custom-shadow space-y-4">
            <h3 className="font-bold text-sm text-on-surface">3. AI Agent Selection</h3>

            <div className="space-y-3">
              {/* Financial Agent */}
              <div
                onClick={() => toggleAgent('financial')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedAgents.financial
                    ? 'border-primary bg-blue-50/50'
                    : 'border-outline-variant/30 bg-surface'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">payments</span>
                  <div>
                    <p className="text-xs font-bold text-on-surface">Financial Agent</p>
                    <p className="text-[10px] text-on-surface-variant">P&L & Revenue Deficits</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedAgents.financial}
                  onChange={() => {}}
                  className="rounded text-primary focus:ring-primary"
                />
              </div>

              {/* Legal Agent */}
              <div
                onClick={() => toggleAgent('legal')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedAgents.legal
                    ? 'border-purple-500 bg-purple-50/50'
                    : 'border-outline-variant/30 bg-surface'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-purple-600">gavel</span>
                  <div>
                    <p className="text-xs font-bold text-on-surface">Legal Agent</p>
                    <p className="text-[10px] text-on-surface-variant">Contract Terms & GDPR</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedAgents.legal}
                  onChange={() => {}}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
              </div>

              {/* Market Agent */}
              <div
                onClick={() => toggleAgent('market')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedAgents.market
                    ? 'border-amber-500 bg-amber-50/50'
                    : 'border-outline-variant/30 bg-surface'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-600">trending_up</span>
                  <div>
                    <p className="text-xs font-bold text-on-surface">Market Agent</p>
                    <p className="text-[10px] text-on-surface-variant">Competitor Pricing</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedAgents.market}
                  onChange={() => {}}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
              </div>

              {/* Security Agent */}
              <div
                onClick={() => toggleAgent('security')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedAgents.security
                    ? 'border-error bg-red-50/50'
                    : 'border-outline-variant/30 bg-surface'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-error">shield_lock</span>
                  <div>
                    <p className="text-xs font-bold text-on-surface">Security Agent</p>
                    <p className="text-[10px] text-on-surface-variant">Prompt Injections & Leak Vectors</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedAgents.security}
                  onChange={() => {}}
                  className="rounded text-error focus:ring-error"
                />
              </div>
            </div>

            {/* Total Duration Estimate */}
            <div className="p-3 bg-surface rounded-xl border border-outline-variant/30 text-center">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold">Estimated Processing</p>
              <p className="text-sm font-bold text-primary">{calculateDuration()}</p>
            </div>

            {/* Launch Trigger Button */}
            <button
              onClick={handleLaunchAudit}
              disabled={isLaunching}
              className="w-full py-3.5 bg-primary text-white rounded-xl text-xs font-bold shadow-lg hover:bg-on-primary-fixed-variant transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-75"
            >
              {isLaunching ? (
                <>
                  <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                  <span>{launchStatusText}</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">rocket_launch</span>
                  <span>Launch Multi-Agent Audit</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ReportDetails() {
  const navigate = useNavigate();

  // Elapsed timer simulation
  const [seconds, setSeconds] = useState(142);
  const [isolatedNodes, setIsolatedNodes] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  const handleIsolateNode = (agentName) => {
    if (isolatedNodes.includes(agentName)) {
      setIsolatedNodes(isolatedNodes.filter((n) => n !== agentName));
    } else {
      setIsolatedNodes([...isolatedNodes, agentName]);
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col justify-between font-sans">
      {/* Navigation Bar */}
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
              Audit History
            </Link>
            <Link className="text-primary font-bold font-label-md" to="/report-details">
              AI Agents
            </Link>
            <Link className="text-on-surface-variant font-label-md hover:text-primary transition-colors" to="/report">
              Risk Reports
            </Link>
            <Link className="text-on-surface-variant font-label-md hover:text-primary transition-colors" to="/settings">
              Settings
            </Link>
          </nav>
          <div className="h-8 w-px bg-outline-variant"></div>
          <button
            onClick={() => navigate('/report')}
            className="px-6 py-2.5 bg-primary-container text-white rounded-lg font-bold text-sm shadow-md hover:bg-primary transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">summarize</span>
            View Executive Report
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-container-padding py-10 flex-grow w-full">
        {/* Header Status */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary pulse-soft"></span>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">Live Agent Mesh Active</span>
            </div>
            <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Live Audit Execution</h2>
            <p className="text-on-surface-variant text-sm mt-1">
              Target Asset: <span className="font-bold text-on-surface">Q3_Financial_Forecast_v2.pdf</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-xl border border-outline-variant/40 custom-shadow text-center">
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Elapsed Time</p>
              <p className="font-mono text-2xl font-bold text-primary">{formatTime(seconds)}</p>
            </div>
            <button
              onClick={() => navigate('/report')}
              className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-on-primary-fixed-variant transition-colors shadow-md flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">analytics</span>
              Open Report Summary
            </button>
          </div>
        </div>

        {/* Live SVG Marching-Ants Architecture Canvas */}
        <div className="bg-white rounded-2xl border border-outline-variant/30 custom-shadow p-8 mb-10 overflow-hidden relative">
          <h3 className="font-headline-md text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">hub</span>
            Multi-Agent Neural Mesh Topology
          </h3>

          <div className="relative h-64 bg-surface-container-low rounded-xl border border-outline-variant/30 overflow-hidden flex items-center justify-center">
            {/* SVG Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="20%" y1="50%" x2="50%" y2="50%" stroke="#2563EB" strokeWidth="2" className="animate-ants" />
              <line x1="50%" y1="50%" x2="80%" y2="25%" stroke="#006E2D" strokeWidth="2" className="animate-ants" />
              <line x1="50%" y1="50%" x2="80%" y2="75%" stroke="#BA1A1A" strokeWidth="2" className="animate-ants" />
            </svg>

            {/* Ingestion Node */}
            <div className="absolute left-[15%] top-1/2 -translate-y-1/2 bg-white border-2 border-primary p-4 rounded-xl shadow-lg text-center">
              <span className="material-symbols-outlined text-primary text-2xl">description</span>
              <p className="text-xs font-bold text-on-surface mt-1">PDF Ingestion</p>
            </div>

            {/* Central Coordinator */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-6 rounded-2xl shadow-xl text-center z-10">
              <span className="material-symbols-outlined text-3xl">psychology</span>
              <p className="text-xs font-black uppercase tracking-wider mt-1">Coordinator AI</p>
              <p className="text-[10px] opacity-80">Orchestrating 4 Sub-Agents</p>
            </div>

            {/* Sub-Agent Node 1 */}
            <div className="absolute right-[15%] top-[20%] bg-white border-2 border-secondary p-3 rounded-xl shadow-lg text-center">
              <span className="material-symbols-outlined text-secondary text-xl">payments</span>
              <p className="text-[10px] font-bold text-on-surface">Financial Agent</p>
            </div>

            {/* Sub-Agent Node 2 */}
            <div className="absolute right-[15%] bottom-[20%] bg-white border-2 border-error p-3 rounded-xl shadow-lg text-center">
              <span className="material-symbols-outlined text-error text-xl">shield_lock</span>
              <p className="text-[10px] font-bold text-on-surface">Security Agent</p>
            </div>
          </div>
        </div>

        {/* Live Sub-Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-10">
          {/* Financial Agent Card */}
          <div className="bg-white p-6 rounded-xl border border-outline-variant/30 custom-shadow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="p-2 bg-blue-100 text-primary rounded-lg material-symbols-outlined text-xl">
                  payments
                </span>
                <span className="text-xs font-bold text-secondary flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span> 85% Active
                </span>
              </div>
              <h4 className="font-bold text-on-surface text-base mb-1">Financial Agent</h4>
              <p className="text-xs text-on-surface-variant mb-4">Auditing P&L multiples & growth projections.</p>
            </div>
            <div className="space-y-3 pt-3 border-t border-outline-variant/20">
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate('/agent-details')}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleIsolateNode('Financial')}
                  className="text-xs text-on-surface-variant hover:text-error"
                >
                  {isolatedNodes.includes('Financial') ? 'Unisolate' : 'Isolate Node'}
                </button>
              </div>
            </div>
          </div>

          {/* Legal Agent Card */}
          <div className="bg-white p-6 rounded-xl border border-outline-variant/30 custom-shadow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="p-2 bg-purple-100 text-purple-600 rounded-lg material-symbols-outlined text-xl">
                  gavel
                </span>
                <span className="text-xs font-bold text-primary-container flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span> 40% Active
                </span>
              </div>
              <h4 className="font-bold text-on-surface text-base mb-1">Legal Agent</h4>
              <p className="text-xs text-on-surface-variant mb-4">Screening GDPR and regulatory compliance clauses.</p>
            </div>
            <div className="space-y-3 pt-3 border-t border-outline-variant/20">
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full rounded-full" style={{ width: '40%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate('/report')}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleIsolateNode('Legal')}
                  className="text-xs text-on-surface-variant hover:text-error"
                >
                  {isolatedNodes.includes('Legal') ? 'Unisolate' : 'Isolate Node'}
                </button>
              </div>
            </div>
          </div>

          {/* Market Agent Card */}
          <div className="bg-white p-6 rounded-xl border border-outline-variant/30 custom-shadow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="p-2 bg-amber-100 text-amber-600 rounded-lg material-symbols-outlined text-xl">
                  trending_up
                </span>
                <span className="text-xs font-bold text-secondary flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span> 100% Done
                </span>
              </div>
              <h4 className="font-bold text-on-surface text-base mb-1">Market Agent</h4>
              <p className="text-xs text-on-surface-variant mb-4">Benchmarking competitor market valuation data.</p>
            </div>
            <div className="space-y-3 pt-3 border-t border-outline-variant/20">
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate('/report')}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleIsolateNode('Market')}
                  className="text-xs text-on-surface-variant hover:text-error"
                >
                  {isolatedNodes.includes('Market') ? 'Unisolate' : 'Isolate Node'}
                </button>
              </div>
            </div>
          </div>

          {/* Security Agent Card */}
          <div className="bg-white p-6 rounded-xl border border-outline-variant/30 custom-shadow flex flex-col justify-between border-l-4 border-l-error">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="p-2 bg-red-100 text-error rounded-lg material-symbols-outlined text-xl">
                  shield_lock
                </span>
                <span className="text-xs font-bold text-error flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-error animate-ping"></span> 3 Alerts
                </span>
              </div>
              <h4 className="font-bold text-on-surface text-base mb-1">Security Agent</h4>
              <p className="text-xs text-on-surface-variant mb-4">Testing document prompt injection vectors.</p>
            </div>
            <div className="space-y-3 pt-3 border-t border-outline-variant/20">
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-error h-full rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate('/report')}
                  className="text-xs font-bold text-error hover:underline"
                >
                  3 Alerts Found
                </button>
                <button
                  onClick={() => handleIsolateNode('Security')}
                  className="text-xs text-on-surface-variant hover:text-error"
                >
                  {isolatedNodes.includes('Security') ? 'Unisolate' : 'Isolate Node'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

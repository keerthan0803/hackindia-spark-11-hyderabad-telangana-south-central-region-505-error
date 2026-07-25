import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AuditHistory() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [selectedAudits, setSelectedAudits] = useState([]);
  const [activeDrawerAudit, setActiveDrawerAudit] = useState(null);

  const auditData = [
    {
      id: 'AUD-882',
      name: 'Q3_Financial_Forecast_v2.pdf',
      department: 'Finance',
      date: 'Oct 24, 2024',
      time: '14:32 EST',
      riskScore: 88,
      riskLevel: 'Critical',
      status: 'Completed',
      agents: ['Financial', 'Legal', 'Market', 'Security'],
      findingsCount: 12,
    },
    {
      id: 'AUD-881',
      name: 'EU_Regulatory_Compliance_2024.docx',
      department: 'Legal',
      date: 'Oct 22, 2024',
      time: '09:15 EST',
      riskScore: 18,
      riskLevel: 'Low',
      status: 'Completed',
      agents: ['Legal'],
      findingsCount: 2,
    },
    {
      id: 'AUD-880',
      name: 'APAC_Expansion_Strategy_Draft.xlsx',
      department: 'Strategy',
      date: 'Oct 19, 2024',
      time: '16:45 EST',
      riskScore: 54,
      riskLevel: 'Medium',
      status: 'Completed',
      agents: ['Financial', 'Market'],
      findingsCount: 7,
    },
    {
      id: 'AUD-879',
      name: 'Data_Sovereignty_Policy_Patch.pdf',
      department: 'Security',
      date: 'Oct 15, 2024',
      time: '11:20 EST',
      riskScore: 92,
      riskLevel: 'Critical',
      status: 'Completed',
      agents: ['Security', 'Legal'],
      findingsCount: 15,
    },
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedAudits(auditData.map((a) => a.id));
    } else {
      setSelectedAudits([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedAudits.includes(id)) {
      setSelectedAudits(selectedAudits.filter((item) => item !== id));
    } else {
      setSelectedAudits([...selectedAudits, id]);
    }
  };

  const filteredAudits = auditData.filter((audit) => {
    const matchesSearch =
      audit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = departmentFilter === 'All' || audit.department === departmentFilter;
    const matchesRisk = riskFilter === 'All' || audit.riskLevel === riskFilter;
    return matchesSearch && matchesDept && matchesRisk;
  });

  return (
    <div className="bg-background text-on-surface flex min-h-screen">
      {/* Sidebar */}
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
            to="/history"
            className="active-nav flex items-center gap-3 px-4 py-3 rounded-l-lg transition-colors"
          >
            <span className="material-symbols-outlined">history</span>
            <span className="font-body-md font-bold">Audit History</span>
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

      {/* Main Canvas */}
      <main className="lg:ml-64 flex-1 flex flex-col min-h-screen">
        {/* Sticky Header */}
        <header className="h-16 flex items-center justify-between px-container-padding sticky top-0 bg-surface/80 backdrop-blur-md z-40 border-b border-outline-variant/30">
          <h2 className="font-headline-md text-headline-md font-bold text-primary">Audit History Log</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/processing')}
              className="bg-primary text-white px-6 py-2 rounded-lg font-label-md hover:bg-on-primary-fixed-variant transition-colors custom-shadow flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Start New Audit
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-container-padding space-y-section-gap max-w-6xl mx-auto w-full pb-32">
          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            <div className="bg-white p-6 rounded-xl border border-outline-variant/30 custom-shadow">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Total Audits</p>
              <h3 className="text-3xl font-black text-on-surface mt-1">1,284</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border border-outline-variant/30 custom-shadow">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Pending Reviews</p>
              <h3 className="text-3xl font-black text-primary mt-1">12</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border border-outline-variant/30 custom-shadow">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Avg Risk Score</p>
              <h3 className="text-3xl font-black text-secondary mt-1">34%</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border border-outline-variant/30 custom-shadow border-l-4 border-l-error">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Critical Reports</p>
              <h3 className="text-3xl font-black text-error mt-1">8</h3>
            </div>
          </div>

          {/* Table Controls */}
          <div className="bg-white rounded-2xl border border-outline-variant/30 custom-shadow overflow-hidden">
            <div className="p-6 border-b border-outline-variant/30 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search audit ID or file name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2 text-xs font-bold text-on-surface outline-none"
                >
                  <option value="All">All Departments</option>
                  <option value="Finance">Finance</option>
                  <option value="Legal">Legal</option>
                  <option value="Strategy">Strategy</option>
                  <option value="Security">Security</option>
                </select>

                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2 text-xs font-bold text-on-surface outline-none"
                >
                  <option value="All">All Risk Levels</option>
                  <option value="Critical">Critical Only</option>
                  <option value="Medium">Medium Only</option>
                  <option value="Low">Low Only</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-label-sm uppercase tracking-wider text-[11px]">
                    <th className="p-4 pl-6">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedAudits.length === auditData.length}
                        className="rounded border-outline-variant text-primary"
                      />
                    </th>
                    <th className="p-4">Audit ID</th>
                    <th className="p-4">Document Asset</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Audit Date</th>
                    <th className="p-4 text-center">Risk Score</th>
                    <th className="p-4 text-right pr-6">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 text-sm">
                  {filteredAudits.map((audit) => (
                    <tr
                      key={audit.id}
                      onClick={() => setActiveDrawerAudit(audit)}
                      className="hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                    >
                      <td className="p-4 pl-6" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedAudits.includes(audit.id)}
                          onChange={() => handleSelectOne(audit.id)}
                          className="rounded border-outline-variant text-primary"
                        />
                      </td>
                      <td className="p-4 font-mono font-bold text-primary">{audit.id}</td>
                      <td className="p-4 font-bold text-on-surface">{audit.name}</td>
                      <td className="p-4 text-on-surface-variant">{audit.department}</td>
                      <td className="p-4 text-xs text-on-surface-variant">{audit.date}</td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-black ${
                            audit.riskLevel === 'Critical'
                              ? 'bg-error/10 text-error'
                              : audit.riskLevel === 'Medium'
                              ? 'bg-amber-500/10 text-amber-600'
                              : 'bg-secondary/10 text-secondary'
                          }`}
                        >
                          {audit.riskScore}% ({audit.riskLevel})
                        </span>
                      </td>
                      <td className="p-4 text-right pr-6" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => navigate('/report')}
                          className="px-4 py-1.5 border border-primary text-primary font-bold text-xs rounded-lg hover:bg-primary hover:text-white transition-all"
                        >
                          Open Report
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Slide-out Preview Drawer */}
      {activeDrawerAudit && (
        <div className="fixed inset-0 bg-on-surface/20 backdrop-blur-xs z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-xs font-bold text-primary">{activeDrawerAudit.id}</span>
                <button onClick={() => setActiveDrawerAudit(null)} className="text-outline hover:text-on-surface">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <h3 className="font-headline-md text-xl font-bold text-on-surface mb-2">{activeDrawerAudit.name}</h3>
              <p className="text-xs text-on-surface-variant mb-6">
                Audited on {activeDrawerAudit.date} at {activeDrawerAudit.time}
              </p>

              <div className="bg-surface-container-low p-4 rounded-xl space-y-3 mb-6">
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">Department</span>
                  <span className="font-bold text-on-surface">{activeDrawerAudit.department}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">Risk Score</span>
                  <span className="font-bold text-error">{activeDrawerAudit.riskScore}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">Findings Detected</span>
                  <span className="font-bold text-on-surface">{activeDrawerAudit.findingsCount} Issues</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/report')}
                className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-md hover:bg-on-primary-fixed-variant transition-colors"
              >
                Open Full Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

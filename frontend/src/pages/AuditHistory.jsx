import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-outline-variant/30 custom-shadow">
        <div>
          <h2 className="font-headline-lg text-2xl font-bold text-on-surface mb-1">Audit History Logs</h2>
          <p className="text-xs text-on-surface-variant">Review, search, and bulk export historical audit reports</p>
        </div>
        <button
          onClick={() => navigate('/processing')}
          className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-md hover:bg-on-primary-fixed-variant transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add</span> New Audit
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-outline-variant/40 custom-shadow flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by file name or ID..."
              className="w-full bg-surface border border-outline-variant/40 rounded-xl py-2 pl-9 pr-3 text-xs font-bold outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="bg-surface border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-bold outline-none"
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
            className="bg-surface border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-bold outline-none"
          >
            <option value="All">All Risk Levels</option>
            <option value="Critical">Critical</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {selectedAudits.length > 0 && (
          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold text-primary">{selectedAudits.length} selected</span>
            <button
              onClick={() => alert(`Exporting ${selectedAudits.length} reports...`)}
              className="px-3.5 py-1.5 bg-surface-container-high border border-outline-variant/40 text-on-surface font-bold rounded-lg hover:bg-surface-variant"
            >
              Export Selected
            </button>
          </div>
        )}
      </div>

      {/* Main Logs Table */}
      <div className="bg-white rounded-2xl border border-outline-variant/40 custom-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">
                <th className="px-6 py-3.5 w-10">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedAudits.length === auditData.length}
                    className="rounded text-primary focus:ring-primary"
                  />
                </th>
                <th className="px-6 py-3.5">Audit ID & Document</th>
                <th className="px-6 py-3.5">Department</th>
                <th className="px-6 py-3.5">Timestamp</th>
                <th className="px-6 py-3.5 text-center">Risk Score</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-xs">
              {filteredAudits.map((audit) => (
                <tr key={audit.id} className="hover:bg-surface transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedAudits.includes(audit.id)}
                      onChange={() => handleSelectOne(audit.id)}
                      className="rounded text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-on-surface">{audit.name}</p>
                    <p className="text-[10px] text-outline">{audit.id}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-on-surface-variant">{audit.department}</td>
                  <td className="px-6 py-4 text-on-surface-variant">
                    {audit.date} <span className="text-[10px] text-outline">• {audit.time}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase ${
                        audit.riskLevel === 'Critical'
                          ? 'bg-red-50 text-error'
                          : audit.riskLevel === 'Medium'
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-emerald-50 text-secondary'
                      }`}
                    >
                      {audit.riskScore}/100 ({audit.riskLevel})
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-secondary font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">check_circle</span> {audit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => setActiveDrawerAudit(audit)}
                      className="px-3 py-1.5 border border-outline-variant text-on-surface-variant font-bold rounded-lg hover:bg-surface-variant transition-colors"
                    >
                      Quick Preview
                    </button>
                    <button
                      onClick={() => navigate('/report')}
                      className="px-3.5 py-1.5 bg-primary text-white font-bold rounded-lg hover:bg-on-primary-fixed-variant transition-colors"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Preview Slide-out Drawer */}
      {activeDrawerAudit && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-outline-variant/40 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-outline uppercase">{activeDrawerAudit.id}</span>
                  <h3 className="font-bold text-base text-on-surface">{activeDrawerAudit.name}</h3>
                </div>
                <button
                  onClick={() => setActiveDrawerAudit(null)}
                  className="text-outline hover:text-on-surface p-1"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex justify-between items-center">
                  <span className="text-xs font-bold text-on-surface-variant">Overall Risk Score</span>
                  <span className="text-sm font-black text-error">{activeDrawerAudit.riskScore}/100</span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-on-surface">Sub-Agents Executed</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeDrawerAudit.agents.map((agent) => (
                      <span key={agent} className="px-2.5 py-1 bg-blue-50 text-primary text-[10px] font-bold rounded-lg">
                        {agent} Agent
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-on-surface">Key Audit Findings</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed bg-surface p-3 rounded-xl border border-outline-variant/30">
                    Detected {activeDrawerAudit.findingsCount} adversarial risk vectors requiring executive review prior to quarterly signing.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/40 flex gap-3">
              <button
                onClick={() => navigate('/report')}
                className="flex-1 py-3 bg-primary text-white text-xs font-bold rounded-xl shadow-md hover:bg-on-primary-fixed-variant transition-colors"
              >
                Open Full Executive Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

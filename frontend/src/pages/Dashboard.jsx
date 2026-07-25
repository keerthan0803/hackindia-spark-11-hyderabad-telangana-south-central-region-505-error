import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRecentUpload, setShowRecentUpload] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const handleBrowseFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      navigate('/processing');
    }
  };

  return (
    <div className="text-on-background bg-background h-screen overflow-hidden flex">
      {/* Sidebar Navigation Drawer (Desktop) */}
      <aside className="fixed left-0 top-0 h-full z-40 flex flex-col py-stack-md bg-surface-container-low border-r border-outline-variant w-80 shadow-md hidden lg:flex">
        <div className="px-8 mb-10 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              security
            </span>
            <h1 className="font-headline-md text-headline-md font-black text-primary tracking-tight">
              Adversarial Auditor
            </h1>
          </Link>
        </div>

        {/* Profile Section */}
        <div className="px-6 mb-8">
          <div className="flex items-center gap-4 p-4 bg-surface-container-highest rounded-xl">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-fixed border-2 border-primary">
              <img
                className="w-full h-full object-cover"
                alt="Alex Sterling"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw5VZK4xOH5gLaMJHMKJsES3K61gV2htLUZ4uPaxWSUuXZaKy94fd_TJfZLumP_Y-SM1vgkDayJdSGUHYvPplavRMGZSEp0lYunipdJ9USTGJrKGczipURu5HCKOp_8Ely8tsl8VKmt_3m3dlNfQufu-CQuHbj8KEpbAKjOjq38DQcxfAzhLCeIF9coEcloS0uJVZahJqmvimJr1OMUFg6epjJrfbDXWNsxHSz--Jn4HA_p_Viq-Rp_ueNs4-l58MBJDe92-w9__A7"
              />
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface font-bold">Alex Sterling</p>
              <p className="text-xs text-on-surface-variant">Global Security Division</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-4 py-3 px-6 bg-secondary-container text-on-secondary-container font-bold rounded-full mx-2 transition-all duration-200 ease-in-out"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              dashboard
            </span>
            <span className="font-label-md text-label-md">Dashboard</span>
          </Link>
          <Link
            to="/history"
            className="flex items-center gap-4 py-3 px-6 text-on-surface-variant hover:bg-surface-variant mx-2 rounded-full transition-all duration-200 ease-in-out"
          >
            <span className="material-symbols-outlined">history_edu</span>
            <span className="font-label-md text-label-md">Audit Logs</span>
          </Link>
          <Link
            to="/report-details"
            className="flex items-center gap-4 py-3 px-6 text-on-surface-variant hover:bg-surface-variant mx-2 rounded-full transition-all duration-200 ease-in-out"
          >
            <span className="material-symbols-outlined">smart_toy</span>
            <span className="font-label-md text-label-md">AI Agents</span>
          </Link>
          <Link
            to="/report"
            className="flex items-center gap-4 py-3 px-6 text-on-surface-variant hover:bg-surface-variant mx-2 rounded-full transition-all duration-200 ease-in-out"
          >
            <span className="material-symbols-outlined">analytics</span>
            <span className="font-label-md text-label-md">Risk Reports</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-4 py-3 px-6 text-on-surface-variant hover:bg-surface-variant mx-2 rounded-full transition-all duration-200 ease-in-out"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-md text-label-md">Settings</span>
          </Link>
          <Link
            to="/help"
            className="flex items-center gap-4 py-3 px-6 text-on-surface-variant hover:bg-surface-variant mx-2 rounded-full transition-all duration-200 ease-in-out"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="font-label-md text-label-md">Help Center</span>
          </Link>
        </nav>

        <div className="px-6 mt-auto">
          <div className="p-4 rounded-xl border border-outline-variant bg-surface text-center">
            <p className="text-xs font-bold text-primary mb-1">Admin Access</p>
            <p className="text-[10px] text-on-surface-variant">System Version 4.2.0-secure</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:ml-80 flex-1 flex flex-col h-screen overflow-y-auto bg-surface custom-scrollbar w-full">
        {/* Top App Bar */}
        <header className="flex justify-between items-center px-container-padding h-20 w-full bg-surface border-b border-outline-variant sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4 w-1/2">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 text-on-surface-variant"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
              <input
                className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                placeholder="Global Search..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors active:scale-95">
              notifications
            </button>
            <Link to="/help" className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors active:scale-95">
              help
            </Link>
            <div className="h-10 w-px bg-outline-variant mx-2 hidden sm:block"></div>
            <Link to="/settings" className="flex items-center gap-3">
              <span className="text-label-md font-semibold text-on-surface hidden sm:inline">Alex Sterling</span>
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                AS
              </div>
            </Link>
          </div>
        </header>

        {/* Mobile Slide-out Menu */}
        {mobileSidebarOpen && (
          <div className="lg:hidden bg-surface-container-low border-b border-outline-variant p-4 space-y-2 z-40">
            <Link
              to="/dashboard"
              onClick={() => setMobileSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-2 bg-secondary-container text-on-secondary-container font-bold rounded-lg"
            >
              <span className="material-symbols-outlined">dashboard</span> Dashboard
            </Link>
            <Link
              to="/history"
              onClick={() => setMobileSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg"
            >
              <span className="material-symbols-outlined">history_edu</span> Audit Logs
            </Link>
            <Link
              to="/report"
              onClick={() => setMobileSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg"
            >
              <span className="material-symbols-outlined">analytics</span> Risk Reports
            </Link>
            <Link
              to="/settings"
              onClick={() => setMobileSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg"
            >
              <span className="material-symbols-outlined">settings</span> Settings
            </Link>
          </div>
        )}

        {/* Dashboard Content */}
        <div className="p-container-padding space-y-section-gap pb-20">
          {/* Welcome Header */}
          <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Good Morning, Alex</h2>
              <p className="text-body-lg text-on-surface-variant max-w-2xl">
                Your AI agents detected 3 minor anomalies in the APAC region overnight. Audit readiness is currently at 98.4%.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/processing')}
                className="px-6 py-3 bg-primary-container text-white rounded-lg font-bold hover:bg-[#1D4ED8] transition-colors shadow-lg active:scale-95 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">add</span> New Audit
              </button>
              <button
                onClick={handleBrowseFiles}
                className="px-6 py-3 border border-outline-variant bg-white text-primary rounded-lg font-bold hover:bg-surface-variant transition-colors active:scale-95 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">file_upload</span> Import Report
              </button>
            </div>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Stat Card 1 */}
            <div className="bg-white p-6 rounded-lg border border-outline-variant soft-shadow hover:-translate-y-1 transition-transform cursor-pointer" onClick={() => navigate('/history')}>
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-primary p-2 bg-primary-fixed rounded-lg">
                  assignment
                </span>
                <span className="text-xs font-bold text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span> +12%
                </span>
              </div>
              <p className="text-on-surface-variant font-label-md mb-1">Total Audits</p>
              <h3 className="font-headline-md text-headline-md text-on-surface">1,284</h3>
            </div>
            {/* Stat Card 2 */}
            <div className="bg-white p-6 rounded-lg border border-outline-variant soft-shadow hover:-translate-y-1 transition-transform cursor-pointer" onClick={() => navigate('/history')}>
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-secondary p-2 bg-secondary-fixed rounded-lg">
                  check_circle
                </span>
                <span className="text-xs font-bold text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span> +4%
                </span>
              </div>
              <p className="text-on-surface-variant font-label-md mb-1">Successful Reviews</p>
              <h3 className="font-headline-md text-headline-md text-on-surface">942</h3>
            </div>
            {/* Stat Card 3 */}
            <div className="bg-white p-6 rounded-lg border border-outline-variant soft-shadow hover:-translate-y-1 transition-transform border-l-4 border-l-error cursor-pointer" onClick={() => navigate('/report')}>
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-error p-2 bg-error-container rounded-lg">
                  warning
                </span>
                <span className="text-xs font-bold text-error flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span> +2
                </span>
              </div>
              <p className="text-on-surface-variant font-label-md mb-1">Critical Findings</p>
              <h3 className="font-headline-md text-headline-md text-error">24</h3>
            </div>
            {/* Stat Card 4 */}
            <div className="bg-white p-6 rounded-lg border border-outline-variant soft-shadow hover:-translate-y-1 transition-transform cursor-pointer" onClick={() => navigate('/agent-details')}>
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-tertiary p-2 bg-tertiary-fixed rounded-lg">
                  analytics
                </span>
                <span className="text-xs font-bold text-on-surface-variant">Neutral</span>
              </div>
              <p className="text-on-surface-variant font-label-md mb-1">Avg. Risk Score</p>
              <h3 className="font-headline-md text-headline-md text-on-surface">12.8%</h3>
            </div>
          </section>

          {/* Main Layout Grid: Document Upload & Quick AI Status */}
          <section className="grid grid-cols-12 gap-gutter">
            {/* Upload Zone (Col 8) */}
            <div className="col-span-12 lg:col-span-8 space-y-gutter">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.docx,.xlsx,.sol,.py,.js"
              />
              <div
                onClick={handleBrowseFiles}
                className="bg-white p-10 rounded-lg border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-center group hover:border-primary transition-colors cursor-pointer min-h-[320px]"
              >
                <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-fixed transition-colors">
                  <span className="material-symbols-outlined text-4xl text-outline group-hover:text-primary">
                    upload_file
                  </span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-2">
                  Upload Corporate Document
                </h4>
                <p className="text-on-surface-variant mb-8 max-w-sm">
                  Drag and drop documents here or click to browse. Supports PDF, DOCX, and XLSX up to 100MB.
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBrowseFiles();
                  }}
                  className="px-10 py-3 border border-outline-variant text-on-surface font-bold rounded-lg hover:bg-surface-variant transition-colors"
                >
                  Browse Files
                </button>
              </div>

              {/* Recent Upload Preview */}
              {showRecentUpload && (
                <div className="bg-white p-6 rounded-lg border border-outline-variant soft-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-fixed rounded flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">description</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-label-md text-on-surface font-bold">Q3_Financial_Forecast_v2.pdf</span>
                        <span className="text-xs text-on-surface-variant">78% Complete</span>
                      </div>
                      <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-1000"
                          style={{ width: '78%' }}
                        ></div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowRecentUpload(false)}
                      className="material-symbols-outlined text-outline-variant hover:text-error transition-colors"
                    >
                      cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* AI Agent Status (Col 4) */}
            <div className="col-span-12 lg:col-span-4 space-y-gutter">
              <div className="bg-white p-8 rounded-lg border border-outline-variant soft-shadow h-full flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <h4 className="font-label-md text-label-md font-bold text-on-surface">AI Agent Status</h4>
                  <span className="material-symbols-outlined text-outline cursor-pointer" onClick={() => navigate('/report-details')}>more_vert</span>
                </div>
                <div className="space-y-6 flex-1">
                  {/* Agent 1 */}
                  <div className="flex items-center justify-between cursor-pointer hover:bg-surface-bright p-2 rounded-lg transition-colors" onClick={() => navigate('/agent-details')}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-[20px]">payments</span>
                      </div>
                      <div>
                        <p className="font-label-md text-on-surface font-bold">Financial Agent</p>
                        <p className="text-[10px] text-secondary font-bold">READY</p>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(0,110,45,0.6)]"></div>
                  </div>
                  {/* Agent 2 */}
                  <div className="flex items-center justify-between cursor-pointer hover:bg-surface-bright p-2 rounded-lg transition-colors" onClick={() => navigate('/report')}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-purple-600 text-[20px]">gavel</span>
                      </div>
                      <div>
                        <p className="font-label-md text-on-surface font-bold">Legal Agent</p>
                        <p className="text-[10px] text-primary-container font-bold">ANALYZING</p>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.6)]"></div>
                  </div>
                  {/* Agent 3 */}
                  <div className="flex items-center justify-between cursor-pointer hover:bg-surface-bright p-2 rounded-lg transition-colors" onClick={() => navigate('/report')}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-amber-600 text-[20px]">storefront</span>
                      </div>
                      <div>
                        <p className="font-label-md text-on-surface font-bold">Market Agent</p>
                        <p className="text-[10px] text-on-surface-variant font-bold">IDLE</p>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-outline-variant"></div>
                  </div>
                  {/* Agent 4 */}
                  <div className="flex items-center justify-between cursor-pointer hover:bg-surface-bright p-2 rounded-lg transition-colors" onClick={() => navigate('/report-details')}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-error text-[20px]">lock</span>
                      </div>
                      <div>
                        <p className="font-label-md text-on-surface font-bold">Security Agent</p>
                        <p className="text-[10px] text-error font-bold">BUSY</p>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-error animate-ping"></div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-outline-variant">
                  <button
                    onClick={() => navigate('/report-details')}
                    className="w-full py-3 bg-surface-container hover:bg-surface-container-high rounded-lg text-primary font-bold transition-colors"
                  >
                    Agent Hub
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Table and Timeline Section */}
          <section className="grid grid-cols-12 gap-gutter">
            {/* Recent Audits Table (Col 8) */}
            <div className="col-span-12 lg:col-span-8 bg-white rounded-lg border border-outline-variant soft-shadow overflow-hidden">
              <div className="p-8 border-b border-outline-variant flex justify-between items-center">
                <h4 className="font-headline-md text-headline-md text-on-surface">Recent Audits</h4>
                <Link to="/history" className="text-primary font-bold text-sm hover:underline">
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant font-label-sm uppercase tracking-wider">
                      <th className="px-8 py-4">Document</th>
                      <th className="px-8 py-4">Date</th>
                      <th className="px-8 py-4 text-center">Risk</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {/* Row 1 */}
                    <tr className="hover:bg-surface-bright transition-colors">
                      <td className="px-8 py-5 font-bold text-on-surface">EU_Regulatory_Compliance_2024</td>
                      <td className="px-8 py-5 text-on-surface-variant text-sm">Oct 12, 2023</td>
                      <td className="px-8 py-5 text-center">
                        <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-label-sm text-[10px] uppercase tracking-tighter">
                          Low
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 text-sm text-secondary">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span> Completed
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button
                          onClick={() => navigate('/report')}
                          className="px-4 py-2 border border-primary text-primary text-xs font-bold rounded hover:bg-primary hover:text-white transition-all"
                        >
                          View Report
                        </button>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="hover:bg-surface-bright transition-colors">
                      <td className="px-8 py-5 font-bold text-on-surface">Merger_Agreement_Draft_A</td>
                      <td className="px-8 py-5 text-on-surface-variant text-sm">Oct 11, 2023</td>
                      <td className="px-8 py-5 text-center">
                        <span className="bg-error/10 text-error px-3 py-1 rounded-full font-label-sm text-[10px] uppercase tracking-tighter">
                          Critical
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 text-sm text-primary">
                          <span className="material-symbols-outlined text-[14px] animate-spin">sync</span> Analyzing
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button
                          onClick={() => navigate('/report-details')}
                          className="px-4 py-2 border border-outline-variant text-outline-variant text-xs font-bold rounded hover:border-primary hover:text-primary transition-all"
                        >
                          Processing
                        </button>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="hover:bg-surface-bright transition-colors">
                      <td className="px-8 py-5 font-bold text-on-surface">Privacy_Policy_Update_APAC</td>
                      <td className="px-8 py-5 text-on-surface-variant text-sm">Oct 10, 2023</td>
                      <td className="px-8 py-5 text-center">
                        <span className="bg-amber-500/10 text-amber-600 px-3 py-1 rounded-full font-label-sm text-[10px] uppercase tracking-tighter">
                          Medium
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 text-sm text-secondary">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span> Completed
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button
                          onClick={() => navigate('/report')}
                          className="px-4 py-2 border border-primary text-primary text-xs font-bold rounded hover:bg-primary hover:text-white transition-all"
                        >
                          View Report
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Timeline and Tips (Col 4) */}
            <div className="col-span-12 lg:col-span-4 space-y-gutter">
              {/* Activity Timeline */}
              <div className="bg-white p-8 rounded-lg border border-outline-variant soft-shadow">
                <h4 className="font-label-md text-label-md font-bold text-on-surface mb-8">Audit Lifecycle</h4>
                <div className="space-y-8">
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-primary bg-white z-10"></div>
                    <div className="absolute left-[7px] top-5 bottom-[-32px] w-[2px] bg-primary"></div>
                    <p className="font-label-md text-on-surface font-bold leading-none">Document Uploaded</p>
                    <p className="text-[10px] text-on-surface-variant mt-1">10:45 AM • Global Server</p>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-primary bg-white z-10"></div>
                    <div className="absolute left-[7px] top-5 bottom-[-32px] w-[2px] bg-primary"></div>
                    <p className="font-label-md text-on-surface font-bold leading-none">Agents Initiated</p>
                    <p className="text-[10px] text-on-surface-variant mt-1">10:46 AM • Financial, Legal</p>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-primary bg-primary z-10 animate-pulse"></div>
                    <div className="absolute left-[7px] top-5 bottom-[-32px] w-[2px] bg-outline-variant"></div>
                    <p className="font-label-md text-primary font-bold leading-none">Deep Analysis</p>
                    <p className="text-[10px] text-on-surface-variant mt-1">In Progress...</p>
                  </div>
                  <div className="relative pl-8 opacity-40">
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-outline-variant bg-white z-10"></div>
                    <div className="absolute left-[7px] top-5 bottom-[-32px] w-[2px] bg-outline-variant"></div>
                    <p className="font-label-md text-on-surface leading-none">Report Generation</p>
                    <p className="text-[10px] text-on-surface-variant mt-1">Pending Analysis</p>
                  </div>
                  <div className="relative pl-8 opacity-40">
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-outline-variant bg-white z-10"></div>
                    <p className="font-label-md text-on-surface leading-none">Audit Completed</p>
                  </div>
                </div>
              </div>

              {/* Best Practices Tip */}
              <div className="bg-primary-container p-8 rounded-lg text-white soft-shadow relative overflow-hidden group">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-secondary-container">lightbulb</span>
                    <h4 className="font-label-md text-label-md font-bold">Best Practices</h4>
                  </div>
                  <p className="text-sm leading-relaxed mb-6 opacity-90">
                    To increase audit precision, ensure all scanned documents are processed with high-resolution OCR before agent ingestion.
                  </p>
                  <Link
                    to="/help"
                    className="text-sm font-bold text-secondary-container flex items-center gap-2 hover:translate-x-2 transition-transform"
                  >
                    Explore Methodology <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-10 right-10 w-16 h-16 bg-primary rounded-full shadow-2xl flex items-center justify-center text-white active:scale-90 transition-transform z-50 hover:brightness-110"
      >
        <span className="material-symbols-outlined text-3xl">
          {chatOpen ? 'close' : 'chat_bubble'}
        </span>
      </button>

      {/* Quick AI Assistant Modal */}
      {chatOpen && (
        <div className="fixed bottom-28 right-10 w-80 sm:w-96 bg-white border border-outline-variant rounded-2xl shadow-2xl z-50 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">smart_toy</span>
              <h5 className="font-label-md font-bold text-on-surface">Audit AI Assistant</h5>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-outline hover:text-on-surface">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <p className="text-xs text-on-surface-variant">
            How can I assist your corporate audit today? Ask about anomalies, SOC 2 compliance, or risk scores.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask AI Assistant..."
              className="flex-1 px-3 py-2 text-xs border border-outline-variant rounded-lg outline-none focus:border-primary"
            />
            <button className="p-2 bg-primary text-white rounded-lg">
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

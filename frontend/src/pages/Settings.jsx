import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('profile');

  // Form states
  const [fullName, setFullName] = useState('Alex Thompson');
  const [email, setEmail] = useState('alex.t@auditor.ai');
  const [role, setRole] = useState('Senior Adversarial Auditor');
  const [department, setDepartment] = useState('Risk Intelligence');
  const [phone, setPhone] = useState('+1 (555) 012-3456');

  // AI model settings
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(4096);
  const [parallelExecution, setParallelExecution] = useState(true);

  // Alert preferences
  const [auditCompletedAlert, setAuditCompletedAlert] = useState(true);
  const [criticalFindingsAlert, setCriticalFindingsAlert] = useState(true);
  const [weeklyReportsAlert, setWeeklyReportsAlert] = useState(false);

  // Active agents checkboxes
  const [activeAgents, setActiveAgents] = useState({
    financial: true,
    legal: true,
    market: false,
    security: true,
  });

  const [reportFormat, setReportFormat] = useState('JSON (Raw Data)');
  const [copiedApiKey, setCopiedApiKey] = useState(false);

  const scrollToSection = (id) => {
    setActiveNav(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText('sk_live_auditor_99c3506b1b7f45ff9392f5842e5ae5aa');
    setCopiedApiKey(true);
    setTimeout(() => setCopiedApiKey(false), 2000);
  };

  const handleSaveProfile = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-background text-on-surface">
      {/* Sidebar Navigation */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low flex flex-col py-base px-gutter shadow-sm z-50 hidden lg:flex">
        <div className="mb-6 pt-4">
          <Link to="/" className="font-headline-md text-headline-md font-extrabold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              shield_person
            </span>
            AI Platform
          </Link>
          <p className="text-on-surface-variant font-label-sm mt-1">Enterprise Tier Auditor</p>
        </div>

        {/* Global Page Quick Nav */}
        <div className="flex gap-2 mb-4 pb-3 border-b border-outline-variant/30 text-xs font-bold text-on-surface-variant">
          <Link to="/dashboard" className="hover:text-primary">Dashboard</Link> •
          <Link to="/processing" className="hover:text-primary">New Audit</Link> •
          <Link to="/history" className="hover:text-primary">History</Link>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar space-y-1 pr-1">
          {[
            { id: 'profile', icon: 'account_circle', label: 'Profile' },
            { id: 'organization', icon: 'corporate_fare', label: 'Organization' },
            { id: 'notifications', icon: 'notifications', label: 'Notifications' },
            { id: 'ai-models', icon: 'smart_toy', label: 'AI Models' },
            { id: 'audit-preferences', icon: 'fact_check', label: 'Audit Preferences' },
            { id: 'security', icon: 'shield', label: 'Security' },
            { id: 'api-access', icon: 'key', label: 'API Access' },
            { id: 'billing', icon: 'payments', label: 'Billing' },
            { id: 'integrations', icon: 'hub', label: 'Integrations' },
            { id: 'about', icon: 'info', label: 'About' },
          ].map((nav) => (
            <button
              key={nav.id}
              onClick={() => scrollToSection(nav.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-l-lg transition-colors text-left ${
                activeNav === nav.id
                  ? 'active-nav'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{nav.icon}</span>
              <span className="font-body-md text-sm">{nav.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-outline-variant/30 space-y-2">
          <Link
            to="/help"
            className="w-full bg-surface-container hover:bg-surface-container-high text-on-surface py-2.5 rounded-lg font-label-md flex items-center justify-center gap-2 text-xs font-bold transition-all"
          >
            <span className="material-symbols-outlined text-sm">help</span>
            Help Center
          </Link>
          <button
            onClick={() => alert('Support ticket raised. Our AI engineering team will contact you shortly.')}
            className="w-full bg-primary-container text-on-primary-container py-2.5 rounded-lg font-label-md flex items-center justify-center gap-2 text-xs font-bold hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-sm">support_agent</span>
            Contact Support
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:ml-64 flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-container-padding sticky top-0 bg-surface/80 backdrop-blur-md z-40 border-b border-outline-variant/30">
          <h2 className="font-headline-md text-headline-md font-bold text-primary">Settings</h2>
          <div className="flex items-center gap-4">
            <Link to="/help" className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
              help
            </Link>
            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
              <div className="text-right hidden sm:block">
                <p className="font-label-md text-on-surface font-bold">{fullName}</p>
                <p className="text-xs text-on-surface-variant">Senior Auditor</p>
              </div>
              <img
                className="w-10 h-10 rounded-full border-2 border-primary-fixed cursor-pointer"
                alt="Executive Headshot"
                onClick={() => navigate('/settings')}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwTH6SYhfA1dmDcOmneumKUz5B_WPr-Un-I4E6FstmeAGdb4lWYMeTWMrXH8vaKLzZSRb3mR5h7aVQ2UclrQVU1qBzELKemquHLBMcQyUzHOqfKdMA5KMPQiE5xzxVsM5U3ESLqlYf35BFF8PT2Enui7FALAJ4BGYTj1kokOcY4P7yhuLgLhP3P7MHyoZ395JlZMDcKuPsx3dkC0kcifkW4OvGBekQbhh8fu4SHaehA4w2lxSFwDP_IDitxmacSGzLi9QuX-nuQo_9"
              />
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <div className="p-container-padding space-y-section-gap max-w-5xl mx-auto w-full pb-32">
          {/* Profile Section */}
          <section className="scroll-mt-24" id="profile">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span>
                Profile Information
              </h3>
              <button
                onClick={handleSaveProfile}
                className="bg-primary text-white px-6 py-2 rounded-lg font-label-md hover:bg-on-primary-fixed-variant transition-colors custom-shadow"
              >
                Save Changes
              </button>
            </div>
            <div className="bg-white rounded-lg p-container-padding custom-shadow border border-outline-variant/20 grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-stack-md">
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant">Full Name</label>
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant">Email Address</label>
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant">Role</label>
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant">Department</label>
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant">Organization</label>
                <input
                  className="w-full bg-surface-container-low border border-outline-variant/30 text-on-surface-variant cursor-not-allowed rounded-lg px-4 py-3"
                  readOnly
                  type="text"
                  value="Global Audit Systems Inc."
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant">Phone</label>
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Organization Section */}
          <section className="scroll-mt-24" id="organization">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">apartment</span>
              Organization Details
            </h3>
            <div className="bg-white rounded-lg p-container-padding custom-shadow border border-outline-variant/20 grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-stack-md">
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant">Org Name</label>
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  type="text"
                  defaultValue="Global Audit Systems Inc."
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant">Industry</label>
                <select className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                  <option>Financial Services</option>
                  <option>Healthcare</option>
                  <option>Technology</option>
                  <option>Cybersecurity</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant">Company Size</label>
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  type="text"
                  defaultValue="5,000+ Employees"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant">Timezone</label>
                <select className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                  <option>UTC-05:00 (Eastern Time)</option>
                  <option>UTC+00:00 (GMT)</option>
                  <option>UTC+01:00 (CET)</option>
                </select>
              </div>
            </div>
          </section>

          {/* AI Model Settings Section */}
          <section className="scroll-mt-24" id="ai-models">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">smart_toy</span>
              AI Model Configuration
            </h3>
            <div className="bg-white rounded-lg p-container-padding custom-shadow border border-outline-variant/20 space-y-gutter">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Current Model</label>
                  <div className="bg-surface-container-low px-4 py-3 rounded-lg border border-primary/20 flex items-center justify-between">
                    <span className="font-bold text-primary">Qwen2.5:7B</span>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full uppercase font-bold">
                      Active
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Provider</label>
                  <div className="bg-surface-container-lowest px-4 py-3 rounded-lg border border-outline-variant font-medium">
                    Ollama
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant">Inference Mode</label>
                  <div className="bg-surface-container-lowest px-4 py-3 rounded-lg border border-outline-variant flex items-center gap-2 font-medium">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    Local
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-label-md text-on-surface-variant">Temperature</label>
                    <span className="text-primary font-bold">{temperature}</span>
                  </div>
                  <input
                    className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  />
                  <p className="text-xs text-outline italic">Balance between focused logic and creative insight.</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-label-md text-on-surface-variant">Max Tokens</label>
                    <span className="text-primary font-bold">{maxTokens}</span>
                  </div>
                  <input
                    className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                    max="32768"
                    min="1024"
                    step="512"
                    type="range"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  />
                  <p className="text-xs text-outline italic">Maximum length of the generated audit reports.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                <div>
                  <p className="font-label-md text-on-surface font-bold">Parallel Agent Execution</p>
                  <p className="text-sm text-on-surface-variant">Run multiple sub-auditors simultaneously to reduce analysis time.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setParallelExecution(!parallelExecution)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    parallelExecution ? 'bg-primary' : 'bg-surface-container-highest'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 bg-white rounded-full transition-transform transform ${
                      parallelExecution ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  ></span>
                </button>
              </div>
            </div>
          </section>

          {/* Audit Defaults & Notifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Audit Defaults */}
            <section className="scroll-mt-24" id="audit-preferences">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">verified</span>
                Audit Defaults
              </h3>
              <div className="bg-white rounded-lg p-container-padding custom-shadow border border-outline-variant/20 space-y-6 h-full">
                <div className="space-y-3">
                  <p className="font-label-md text-on-surface-variant font-bold">Default Active Agents</p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 bg-surface rounded-lg cursor-pointer border border-transparent hover:border-primary/20 transition-all">
                      <input
                        type="checkbox"
                        checked={activeAgents.financial}
                        onChange={(e) => setActiveAgents({ ...activeAgents, financial: e.target.checked })}
                        className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                      />
                      <span className="font-body-md">Financial Analysis</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-surface rounded-lg cursor-pointer border border-transparent hover:border-primary/20 transition-all">
                      <input
                        type="checkbox"
                        checked={activeAgents.legal}
                        onChange={(e) => setActiveAgents({ ...activeAgents, legal: e.target.checked })}
                        className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                      />
                      <span className="font-body-md">Legal Compliance</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-surface rounded-lg cursor-pointer border border-transparent hover:border-primary/20 transition-all">
                      <input
                        type="checkbox"
                        checked={activeAgents.market}
                        onChange={(e) => setActiveAgents({ ...activeAgents, market: e.target.checked })}
                        className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                      />
                      <span className="font-body-md">Market Integrity</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-surface rounded-lg cursor-pointer border border-transparent hover:border-primary/20 transition-all">
                      <input
                        type="checkbox"
                        checked={activeAgents.security}
                        onChange={(e) => setActiveAgents({ ...activeAgents, security: e.target.checked })}
                        className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                      />
                      <span className="font-body-md">Security Vulnerabilities</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant font-bold">Report Format</label>
                  <select
                    value={reportFormat}
                    onChange={(e) => setReportFormat(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option value="PDF (Formatted)">PDF (Formatted)</option>
                    <option value="JSON (Raw Data)">JSON (Raw Data)</option>
                    <option value="CSV (Spreadsheet)">CSV (Spreadsheet)</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Notifications */}
            <section className="scroll-mt-24" id="notifications">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">notifications_active</span>
                Alert Preferences
              </h3>
              <div className="bg-white rounded-lg p-container-padding custom-shadow border border-outline-variant/20 space-y-6 h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                    <div>
                      <p className="font-body-md font-semibold">Audit Completed</p>
                      <p className="text-xs text-on-surface-variant">Receive email when processing finishes.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAuditCompletedAlert(!auditCompletedAlert)}
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        auditCompletedAlert ? 'bg-primary' : 'bg-surface-container-highest'
                      }`}
                    >
                      <span
                        className={`block w-5 h-5 bg-white rounded-full transition-transform transform ${
                          auditCompletedAlert ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      ></span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-surface rounded-lg border-2 border-primary/10">
                    <div>
                      <p className="font-body-md font-semibold text-primary">Critical Findings</p>
                      <p className="text-xs text-on-surface-variant">Immediate SMS alerts for high-risk flags.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCriticalFindingsAlert(!criticalFindingsAlert)}
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        criticalFindingsAlert ? 'bg-primary' : 'bg-surface-container-highest'
                      }`}
                    >
                      <span
                        className={`block w-5 h-5 bg-white rounded-full transition-transform transform ${
                          criticalFindingsAlert ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      ></span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                    <div>
                      <p className="font-body-md font-semibold">Weekly Reports</p>
                      <p className="text-xs text-on-surface-variant">Summary of all audit activities.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setWeeklyReportsAlert(!weeklyReportsAlert)}
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        weeklyReportsAlert ? 'bg-primary' : 'bg-surface-container-highest'
                      }`}
                    >
                      <span
                        className={`block w-5 h-5 bg-white rounded-full transition-transform transform ${
                          weeklyReportsAlert ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      ></span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Security Section */}
          <section className="scroll-mt-24" id="security">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">lock_open</span>
              Security & Access
            </h3>
            <div className="bg-white rounded-lg p-container-padding custom-shadow border border-outline-variant/20 grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="space-y-gutter">
                <p className="font-label-md text-primary font-bold uppercase tracking-wider">Change Password</p>
                <div className="space-y-4">
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 outline-none focus:border-primary"
                    placeholder="Current Password"
                    type="password"
                  />
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 outline-none focus:border-primary"
                    placeholder="New Password"
                    type="password"
                  />
                  <button
                    onClick={() => alert('Password updated successfully!')}
                    className="w-full border border-primary text-primary py-2 rounded-lg font-label-md hover:bg-primary/5 transition-colors font-bold"
                  >
                    Update Password
                  </button>
                </div>
                <div className="pt-4 border-t border-outline-variant/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body-md font-semibold">Two-Factor Auth (2FA)</span>
                    <span className="text-error font-label-sm font-bold">Disabled</span>
                  </div>
                  <button onClick={() => alert('2FA setup wizard opened.')} className="text-primary font-label-sm hover:underline font-bold">
                    Enable Secure Authentication
                  </button>
                </div>
              </div>

              <div>
                <p className="font-label-md text-on-surface-variant mb-4 font-bold">Active Sessions</p>
                <div className="space-y-2">
                  <div className="p-3 bg-surface-container-low rounded-lg flex items-center gap-4">
                    <span className="material-symbols-outlined text-on-surface-variant">desktop_windows</span>
                    <div>
                      <p className="text-sm font-semibold">MacOS • Chrome Browser</p>
                      <p className="text-xs text-outline">New York, USA • Current Session</p>
                    </div>
                  </div>
                  <div className="p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/20 flex items-center gap-4">
                    <span className="material-symbols-outlined text-outline">smartphone</span>
                    <div>
                      <p className="text-sm font-semibold text-outline">iOS • Audit App</p>
                      <p className="text-xs text-outline">London, UK • 2 hours ago</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Signed out of all other sessions.')}
                    className="w-full mt-4 text-error font-label-sm py-2 hover:bg-error/5 rounded-lg transition-colors font-bold"
                  >
                    Sign out of all sessions
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* API Access Section */}
          <section className="scroll-mt-24" id="api-access">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">terminal</span>
              Developer & API Access
            </h3>
            <div className="bg-white rounded-lg p-container-padding custom-shadow border border-outline-variant/20 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-end">
                <div className="md:col-span-2 space-y-2">
                  <label className="font-label-md text-on-surface-variant font-bold">Primary API Key</label>
                  <div className="relative">
                    <input
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-mono text-sm"
                      readOnly
                      type="password"
                      value="sk_live_auditor_99c3506b1b7f45ff9392f5842e5ae5aa"
                    />
                    <button onClick={handleCopyApiKey} className="absolute right-3 top-3 text-primary hover:opacity-80">
                      <span className="material-symbols-outlined">{copiedApiKey ? 'check' : 'content_copy'}</span>
                    </button>
                  </div>
                </div>
                <button
                  className="bg-outline-variant text-on-surface-variant/50 cursor-not-allowed px-6 py-3 rounded-lg font-label-md flex items-center justify-center gap-2"
                  disabled
                >
                  <span className="material-symbols-outlined">refresh</span>
                  Generate New Key
                </button>
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant font-bold">Webhook URL</label>
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="https://your-domain.com/webhooks/audit"
                  type="url"
                />
              </div>
              <div className="flex items-center gap-2 p-4 bg-primary/5 border border-primary/20 rounded-lg text-primary text-sm">
                <span className="material-symbols-outlined">info</span>
                <span>API access is currently restricted to Enterprise administrators only.</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

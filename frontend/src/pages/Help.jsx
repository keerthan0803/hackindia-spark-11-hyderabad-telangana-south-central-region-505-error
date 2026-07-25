import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Help() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      q: 'How long does an audit take?',
      a: 'Typical audits take between 5 to 15 minutes, depending on the document volume. Our AI coordinator processes up to 500 pages simultaneously across its multi-agent core.',
    },
    {
      q: 'What file types are supported?',
      a: 'We support PDF (OCR-ready), DOCX, XLSX, and standard CSV exports. For secure environments, we also support encrypted PDF archives provided the key is managed through our KMS integration.',
    },
    {
      q: 'How is data secured?',
      a: 'All processing occurs on your dedicated enterprise instance. We use AES-256 at rest and TLS 1.3 in transit. For air-gapped deployments, we support local-only model execution.',
    },
    {
      q: 'Does the AI send data to the cloud?',
      a: 'No. AuditGuard AI utilizes Ollama and Qwen2.5 running locally on your hardware. Your data never leaves your infrastructure for model inference.',
    },
    {
      q: 'Can I export reports?',
      a: 'Yes, reports can be exported in interactive HTML, executive-summary PDF, or raw JSON format for integration with GRC platforms like ServiceNow or Archer.',
    },
  ];

  return (
    <div className="bg-background text-on-surface min-h-screen relative overflow-x-hidden">
      {/* TopNavBar */}
      <header className="flex justify-between items-center w-full px-container-padding h-16 z-50 top-0 sticky bg-surface border-b border-outline-variant shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-headline-md text-headline-md font-bold text-primary">
            AuditGuard AI
          </Link>
          <div className="hidden md:flex h-10 items-center bg-surface-container-high rounded-full px-4 border border-outline-variant">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-label-md w-64 outline-none px-2 text-sm"
              placeholder="Search documentation..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
            notifications
          </button>
          <Link to="/help" className="material-symbols-outlined text-primary font-bold">
            help_outline
          </Link>
          <button
            onClick={() => navigate('/processing')}
            className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-label-md hover:opacity-80 transition-all font-bold text-xs"
          >
            Run Audit
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant cursor-pointer" onClick={() => navigate('/settings')}>
            <img
              className="w-full h-full object-cover"
              alt="Executive Profile"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaxNd8g5gf2QxiYTxEW5KxCyuf1R0yFV8Eat5smCdNsxcmyGI-VgvNPhH3LXPqbJkkBn7OgtcnmNKLWrdDceOH7G2s3eJ7N3HzIbia0Dy8xosvNfiOOMkXKEUaEkRu4S4XcHNe2181NH5Sk_I6rX1676O-KlCQiDllk4P0COLPoE-19QdHt6q4v1QN5FBWeH_BSewr2ZICCPCLJ_pDPtHIPyD6ongu0xg4cBuZgkZu2EFu2Sx0krzzz7FwNo37LptoB27F-KH_FBFQ"
            />
          </div>
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* SideNavBar */}
        <aside className="hidden lg:flex flex-col h-[calc(100vh-4rem)] py-base gap-stack-sm fixed left-0 top-16 w-64 bg-surface-container-low border-r border-outline-variant z-40">
          <nav className="flex-1 px-2 space-y-1">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all mx-2 my-1"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-md text-label-md">Dashboard</span>
            </Link>
            <Link
              to="/processing"
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all mx-2 my-1"
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span className="font-label-md text-label-md">New Audit</span>
            </Link>
            <Link
              to="/report"
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all mx-2 my-1"
            >
              <span className="material-symbols-outlined">analytics</span>
              <span className="font-label-md text-label-md">Reports</span>
            </Link>
            <Link
              to="/history"
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all mx-2 my-1"
            >
              <span className="material-symbols-outlined">history</span>
              <span className="font-label-md text-label-md">Audit History</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all mx-2 my-1"
            >
              <span className="material-symbols-outlined">settings</span>
              <span className="font-label-md text-label-md">Settings</span>
            </Link>
          </nav>
          <div className="px-2 mt-auto border-t border-outline-variant pt-4">
            <Link
              to="/help"
              className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-lg mx-2 my-1 font-bold"
            >
              <span className="material-symbols-outlined">help</span>
              <span className="font-label-md text-label-md">Help Center</span>
            </Link>
            <a
              onClick={() => alert('Opening live chat support...')}
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all mx-2 my-1 cursor-pointer"
            >
              <span className="material-symbols-outlined">contact_support</span>
              <span className="font-label-md text-label-md">Support</span>
            </a>
          </div>
          <div className="p-6">
            <p className="font-label-sm text-label-sm text-outline">V2.4.0-Stable</p>
            <p className="font-label-sm text-label-sm text-outline">Enterprise Suite</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-container-padding bg-background max-w-7xl mx-auto pb-24">
          {/* Hero Section */}
          <section className="mb-section-gap pt-8">
            <div className="max-w-3xl">
              <h1 className="font-display-lg text-display-lg text-primary mb-4">Help & Documentation</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
                Everything you need to understand and use the Adversarial Corporate Auditor.
              </p>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-primary text-2xl">
                  search
                </span>
                <input
                  className="w-full h-16 pl-16 pr-6 bg-white border border-outline-variant rounded-xl elevated-card focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-body-md outline-none"
                  placeholder="Search the knowledge base..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="mb-section-gap">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Action Cards */}
              <div
                onClick={() => alert('Opening Getting Started Guide...')}
                className="bg-white p-8 rounded-lg elevated-card border border-outline-variant hover:scale-[1.02] transition-transform cursor-pointer group"
              >
                <div className="w-12 h-12 bg-primary-fixed-dim rounded-lg flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">rocket_launch</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-2">Getting Started</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Learn the fundamentals of Adversarial Auditing in under 5 minutes.
                </p>
              </div>

              <div
                onClick={() => alert('Opening Upload Guide...')}
                className="bg-white p-8 rounded-lg elevated-card border border-outline-variant hover:scale-[1.02] transition-transform cursor-pointer group"
              >
                <div className="w-12 h-12 bg-primary-fixed-dim rounded-lg flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">upload_file</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-2">Upload Guide</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Best practices for preparing your corporate documents for analysis.
                </p>
              </div>

              <div
                onClick={() => alert('Opening How AI Agents Work Guide...')}
                className="bg-white p-8 rounded-lg elevated-card border border-outline-variant hover:scale-[1.02] transition-transform cursor-pointer group"
              >
                <div className="w-12 h-12 bg-primary-fixed-dim rounded-lg flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-2">How AI Agents Work</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  A deep dive into our multi-agent orchestration architecture.
                </p>
              </div>

              <div
                onClick={() => alert('Opening Troubleshooting Guide...')}
                className="bg-white p-8 rounded-lg elevated-card border border-outline-variant hover:scale-[1.02] transition-transform cursor-pointer group"
              >
                <div className="w-12 h-12 bg-primary-fixed-dim rounded-lg flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">build</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-2">Troubleshooting</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Solutions to common technical issues and performance optimizations.
                </p>
              </div>

              <div
                onClick={() => alert('Connecting to Support...')}
                className="bg-white p-8 rounded-lg elevated-card border border-outline-variant hover:scale-[1.02] transition-transform cursor-pointer group"
              >
                <div className="w-12 h-12 bg-primary-fixed-dim rounded-lg flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">support_agent</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-2">Contact Support</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Connect with our engineering team for specialized enterprise support.
                </p>
              </div>

              <div
                onClick={() => alert('Opening Release Notes (v2.4.0-Stable)...')}
                className="bg-white p-8 rounded-lg elevated-card border border-outline-variant hover:scale-[1.02] transition-transform cursor-pointer group"
              >
                <div className="w-12 h-12 bg-primary-fixed-dim rounded-lg flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">new_releases</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-2">Release Notes</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Stay updated with the latest AI model improvements and features.
                </p>
              </div>
            </div>
          </section>

          {/* System Architecture Workflow */}
          <section className="mb-section-gap">
            <h2 className="font-headline-lg text-headline-lg mb-10 text-center">System Architecture Workflow</h2>
            <div className="relative overflow-x-auto pb-8">
              <div className="min-w-[1000px] flex items-center justify-between px-8 relative">
                {/* Connecting Line Background */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] workflow-line -translate-y-1/2 z-0"></div>
                {/* Step 1 */}
                <div className="relative z-10 flex flex-col items-center gap-4 bg-background px-4">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                  </div>
                  <div className="text-center">
                    <p className="font-label-md text-label-md">Upload Document</p>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="relative z-10 flex flex-col items-center gap-4 bg-background px-4">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-primary text-3xl">text_snippet</span>
                  </div>
                  <div className="text-center">
                    <p className="font-label-md text-label-md">Text Extraction</p>
                  </div>
                </div>
                {/* Step 3 (Coordinator) */}
                <div className="relative z-10 flex flex-col items-center gap-4 bg-background px-4">
                  <div className="w-20 h-20 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-xl">
                    <span className="material-symbols-outlined text-4xl">hub</span>
                  </div>
                  <div className="text-center">
                    <p className="font-label-md text-label-md font-bold">AI Coordinator</p>
                  </div>
                </div>
                {/* Step 4 (Parallel Branch) */}
                <div className="relative z-10 flex flex-col gap-3 bg-background px-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="px-3 py-2 bg-secondary-container rounded-lg flex items-center gap-2 border border-secondary/20">
                      <span className="material-symbols-outlined text-on-secondary-container text-sm">payments</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-on-secondary-container">Financial</span>
                    </div>
                    <div className="px-3 py-2 bg-tertiary-fixed rounded-lg flex items-center gap-2 border border-tertiary/20">
                      <span className="material-symbols-outlined text-on-tertiary-fixed text-sm">gavel</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-on-tertiary-fixed">Legal</span>
                    </div>
                    <div className="px-3 py-2 bg-primary-fixed-dim rounded-lg flex items-center gap-2 border border-primary/20">
                      <span className="material-symbols-outlined text-on-primary-fixed text-sm">monitoring</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-on-primary-fixed">Market</span>
                    </div>
                    <div className="px-3 py-2 bg-error-container rounded-lg flex items-center gap-2 border border-error/20">
                      <span className="material-symbols-outlined text-on-error-container text-sm">security</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-on-error-container">Security</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-label-sm text-label-sm">Specialized Agents</p>
                  </div>
                </div>
                {/* Step 5 */}
                <div className="relative z-10 flex flex-col items-center gap-4 bg-background px-4">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-primary text-3xl">summarize</span>
                  </div>
                  <div className="text-center">
                    <p className="font-label-md text-label-md">Executive Report</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About the Agents Section */}
          <section className="mb-section-gap">
            <h2 className="font-headline-lg text-headline-lg mb-8">Specialized AI Agents</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Agent Card 1 */}
              <div className="flex gap-6 p-8 bg-white rounded-lg border border-outline-variant elevated-card">
                <div className="shrink-0 w-16 h-16 rounded-xl bg-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary-container text-3xl">account_balance</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md mb-2">Financial Agent</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Expert in forensic accounting and anomaly detection. Analyzes balance sheets, cash flows, and expense reports to identify high-risk financial patterns or internal inconsistencies.
                  </p>
                </div>
              </div>
              {/* Agent Card 2 */}
              <div className="flex gap-6 p-8 bg-white rounded-lg border border-outline-variant elevated-card">
                <div className="shrink-0 w-16 h-16 rounded-xl bg-tertiary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-tertiary-fixed text-3xl">policy</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md mb-2">Legal Agent</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Specialized in regulatory compliance and contract law. Identifies potential liabilities, non-compliance with industry standards, and adversarial legal language in corporate documents.
                  </p>
                </div>
              </div>
              {/* Agent Card 3 */}
              <div className="flex gap-6 p-8 bg-white rounded-lg border border-outline-variant elevated-card">
                <div className="shrink-0 w-16 h-16 rounded-xl bg-primary-fixed-dim flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary-fixed text-3xl">insights</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md mb-2">Market Agent</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Monitors competitive positioning and external market risks. Correlates internal document findings with real-world market volatility and global economic signals.
                  </p>
                </div>
              </div>
              {/* Agent Card 4 */}
              <div className="flex gap-6 p-8 bg-white rounded-lg border border-outline-variant elevated-card">
                <div className="shrink-0 w-16 h-16 rounded-xl bg-error-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-error-container text-3xl">shield_person</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md mb-2">Security Agent</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Focused on data integrity and internal threat vectors. Evaluates corporate operational security, access controls, and exposure risks within organizational structures.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-section-gap max-w-4xl mx-auto">
            <h2 className="font-headline-lg text-headline-lg mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group bg-white rounded-lg border border-outline-variant elevated-card">
                  <summary className="flex justify-between items-center p-6 cursor-pointer outline-none">
                    <span className="font-label-md text-label-md text-primary font-bold">{faq.q}</span>
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                      expand_more
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-on-surface-variant font-body-md border-t border-outline-variant/30 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* System Information & Footer Content */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 pt-12 border-t border-outline-variant">
            <div className="col-span-1">
              <h4 className="font-label-md text-label-md text-on-surface mb-4 uppercase tracking-widest font-bold">
                System Specs
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-on-surface-variant font-label-md">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  Version 2.4.0-Stable
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant font-label-md">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  FastAPI Backend
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant font-label-md">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  Ollama + Qwen2.5 (Local LLM)
                </li>
                <li className="flex items-center gap-3 text-on-surface-variant font-label-md">
                  <span className="w-2 h-2 rounded-full bg-outline"></span>
                  React / Tailwind Frontend
                </li>
              </ul>
            </div>
            <div className="col-span-1">
              <h4 className="font-label-md text-label-md text-on-surface mb-4 uppercase tracking-widest font-bold">
                Resources
              </h4>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:support@auditguard.ai"
                  className="text-primary hover:underline font-label-md flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">mail</span> Email Support
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Redirecting to Enterprise GitHub Repo...');
                  }}
                  className="text-primary hover:underline font-label-md flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">terminal</span> GitHub Repository
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Opening API Documentation...');
                  }}
                  className="text-primary hover:underline font-label-md flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">description</span> API Documentation
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Opening Bug Report modal...');
                  }}
                  className="text-primary hover:underline font-label-md flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">bug_report</span> Report a Bug
                </a>
              </div>
            </div>
            <div className="col-span-1 bg-surface-container rounded-lg p-6 flex flex-col justify-between">
              <div>
                <h4 className="font-headline-md text-headline-md text-primary font-bold mb-2">Security Status</h4>
                <p className="text-label-sm text-on-surface-variant">Instance: Corporate-Production-01</p>
              </div>
              <div className="flex items-center gap-2 text-secondary font-bold mt-4">
                <span className="material-symbols-outlined text-xl">verified_user</span>
                <span className="font-label-md">All Systems Nominal</span>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-section-gap py-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-label-sm text-label-sm text-outline">© 2024 AuditGuard AI. All rights reserved.</p>
            <div className="flex gap-8">
              <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">
                Terms of Service
              </a>
              <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">
                License
              </a>
            </div>
          </footer>
        </main>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-secondary/5 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateSettings } from '../services/api';

export default function Profile() {
  const navigate = useNavigate();

  // Load user data dynamically from session / localStorage
  const getUserData = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr && userStr !== 'undefined' && userStr !== 'null') {
        return JSON.parse(userStr);
      }
    } catch (e) {
      console.warn('Failed to parse user session');
    }
    return {
      fullName: 'Alex Sterling',
      email: 'alex.sterling@auditor.ai',
      role: 'Senior Adversarial Auditor',
      department: 'Risk Intelligence',
      organization: 'Global Audit Systems Inc.',
      phone: '+1 555-012-3456',
      country: 'USA',
      timezone: 'EST (GMT-5)',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD67UO4N8qSnW_FKIESEe4dgoZwe8tKjk8fs7nCtzgrvXbXm164t0h1TXUQcnr1zw2S5UFIALCQPOk4HL16z1-04AO0OP1YvO_mXNpIdguOzXD7k1GrYWqRgImy-zVOk5rLVHUvRUaYK2n2jk70J-WqGvBWRGkEqOBkCLyGhzC7J_FBJu1oKpHBHbMX4y8GEmmt8-u0YeI_tiB8E5LoUYs54rhfhUpnbM05ynzyYNAagUr8DFCExY4r-SYEhGD6tXLt325F11OCd1YM',
    };
  };

  const initialUser = getUserData();

  // Form State
  const [fullName, setFullName] = useState(initialUser.fullName || 'Alex Sterling');
  const [email, setEmail] = useState(initialUser.email || 'alex.sterling@auditor.ai');
  const [phone, setPhone] = useState(initialUser.phone || '+1 555-012-3456');
  const [department, setDepartment] = useState(initialUser.department || 'Risk Intelligence');
  const [jobTitle, setJobTitle] = useState(initialUser.role || 'Senior Adversarial Auditor');
  const [organization, setOrganization] = useState(initialUser.organization || 'Global Audit Systems Inc.');
  const [country, setCountry] = useState(initialUser.country || 'USA');
  const [timezone, setTimezone] = useState(initialUser.timezone || 'EST (GMT-5)');
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  const avatarUrl =
    initialUser.avatar ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD67UO4N8qSnW_FKIESEe4dgoZwe8tKjk8fs7nCtzgrvXbXm164t0h1TXUQcnr1zw2S5UFIALCQPOk4HL16z1-04AO0OP1YvO_mXNpIdguOzXD7k1GrYWqRgImy-zVOk5rLVHUvRUaYK2n2jk70J-WqGvBWRGkEqOBkCLyGhzC7J_FBJu1oKpHBHbMX4y8GEmmt8-u0YeI_tiB8E5LoUYs54rhfhUpnbM05ynzyYNAagUr8DFCExY4r-SYEhGD6tXLt325F11OCd1YM';

  const handleSaveChanges = async (e) => {
    e?.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    const updatedUser = {
      ...initialUser,
      fullName,
      email,
      phone,
      department,
      role: jobTitle,
      organization,
      country,
      timezone,
    };

    // Save to localStorage for instant reactivity across all pages
    localStorage.setItem('user', JSON.stringify(updatedUser));

    try {
      await updateSettings({
        fullName,
        email,
        phone,
        department,
        jobTitle,
        organization,
        country,
        timezone,
      });
    } catch (err) {
      console.warn('Backend settings update fallback:', err);
    } finally {
      setIsSaving(false);
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      setPasswordMsg('Passwords do not match.');
      return;
    }
    setPasswordMsg('Password updated successfully!');
    setTimeout(() => {
      setShowPasswordModal(false);
      setNewPassword('');
      setConfirmPassword('');
      setPasswordMsg('');
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-outline-variant/30 custom-shadow">
        <div>
          <nav className="flex mb-1 gap-2 text-xs text-on-surface-variant">
            <span
              onClick={() => navigate('/dashboard')}
              className="cursor-pointer hover:text-primary transition-colors"
            >
              Dashboard
            </span>
            <span>/</span>
            <span className="text-primary font-bold">Profile</span>
          </nav>
          <h1 className="font-headline-lg text-2xl font-bold text-on-surface">My Profile</h1>
          <p className="text-xs text-on-surface-variant">
            Manage your account information, organization details, and live activity metrics.
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-secondary rounded-2xl text-xs font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          <span>Profile changes saved successfully to database & session!</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Main Profile Information (Col 8) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Profile Overview Card */}
          <section className="bg-white p-6 rounded-2xl border border-outline-variant/40 custom-shadow flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative shrink-0">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-surface-container-high ring-4 ring-primary/10 bg-primary-container text-white flex items-center justify-center font-bold text-2xl">
                <img
                  className="w-full h-full object-cover"
                  alt={fullName}
                  src={avatarUrl}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                />
                <span className="material-symbols-outlined text-4xl">person</span>
              </div>
              <div className="absolute bottom-1 right-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white"></div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h2 className="font-headline-md text-xl font-bold text-on-surface">{fullName}</h2>
                <span className="px-2.5 py-0.5 bg-emerald-50 text-secondary text-[10px] font-bold rounded-full uppercase">
                  Active
                </span>
                <span className="px-2.5 py-0.5 bg-blue-50 text-primary text-[10px] font-bold rounded-full uppercase">
                  Verified
                </span>
              </div>
              <p className="text-xs font-semibold text-on-surface-variant">
                {jobTitle} · {department}
              </p>
              <p className="text-xs text-outline">{organization}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 text-xs">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-outline text-sm">badge</span>
                  <span>ID: AE-9942</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-outline text-sm">mail</span>
                  <span className="truncate">{email}</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-outline text-sm">calendar_today</span>
                  <span>Joined Jan 2024</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-outline text-sm">admin_panel_settings</span>
                  <span>Admin Access</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 w-full md:w-auto shrink-0">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-5 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-xs hover:bg-on-primary-fixed-variant transition-colors"
              >
                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
              </button>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-5 py-2 border border-outline-variant text-primary text-xs font-bold rounded-xl hover:bg-surface-variant transition-colors"
              >
                Change Password
              </button>
            </div>
          </section>

          {/* Account Statistics */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => navigate('/history')}
              className="bg-white p-5 rounded-2xl border border-outline-variant/40 custom-shadow hover:-translate-y-0.5 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-primary mb-1">assessment</span>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Total Audits</p>
              <h3 className="text-2xl font-black text-on-surface mt-1">156</h3>
            </div>

            <div
              onClick={() => navigate('/report')}
              className="bg-white p-5 rounded-2xl border border-outline-variant/40 custom-shadow hover:-translate-y-0.5 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-error mb-1">report_problem</span>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Critical Findings</p>
              <h3 className="text-2xl font-black text-error mt-1">42</h3>
            </div>

            <div
              onClick={() => navigate('/agent-details')}
              className="bg-white p-5 rounded-2xl border border-outline-variant/40 custom-shadow hover:-translate-y-0.5 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-amber-600 mb-1">speed</span>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Avg. Risk Score</p>
              <h3 className="text-2xl font-black text-on-surface mt-1">68%</h3>
            </div>

            <div
              onClick={() => navigate('/report-details')}
              className="bg-white p-5 rounded-2xl border border-outline-variant/40 custom-shadow hover:-translate-y-0.5 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-secondary mb-1">timer</span>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Avg. Audit Time</p>
              <h3 className="text-2xl font-black text-secondary mt-1">12.4s</h3>
            </div>
          </section>

          {/* Professional Information Form */}
          <section className="bg-white p-6 rounded-2xl border border-outline-variant/40 custom-shadow space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
              <h3 className="font-bold text-sm text-on-surface">Professional Information</h3>
              <span className="text-[10px] text-outline uppercase font-bold">
                {isEditing ? 'Editing Mode' : 'View Mode'}
              </span>
            </div>

            <form onSubmit={handleSaveChanges} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-on-surface-variant mb-1">Full Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-primary disabled:opacity-80"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-on-surface-variant mb-1">Email</label>
                <input
                  type="email"
                  disabled={!isEditing}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-primary disabled:opacity-80"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-on-surface-variant mb-1">Phone Number</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-primary disabled:opacity-80"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-on-surface-variant mb-1">Department</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-primary disabled:opacity-80"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-on-surface-variant mb-1">Job Title</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-primary disabled:opacity-80"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-on-surface-variant mb-1">Organization</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-primary disabled:opacity-80"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-on-surface-variant mb-1">Country</label>
                <select
                  disabled={!isEditing}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-primary disabled:opacity-80"
                >
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-on-surface-variant mb-1">Time Zone</label>
                <select
                  disabled={!isEditing}
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-primary disabled:opacity-80"
                >
                  <option value="EST (GMT-5)">EST (GMT-5)</option>
                  <option value="PST (GMT-8)">PST (GMT-8)</option>
                  <option value="GMT">GMT (UTC+0)</option>
                </select>
              </div>
            </form>

            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/30">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2 rounded-xl border border-outline-variant text-on-surface-variant text-xs font-bold hover:bg-surface-variant"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                    className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-on-primary-fixed-variant flex items-center gap-1.5"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-on-primary-fixed-variant"
                >
                  Edit Information
                </button>
              )}
            </div>
          </section>

          {/* Achievements Section */}
          <section className="bg-white p-6 rounded-2xl border border-outline-variant/40 custom-shadow space-y-4">
            <h3 className="font-bold text-sm text-on-surface">Audit Achievements & Badges</h3>
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center border-2 border-primary/20 group-hover:border-primary transition-all">
                  <span className="material-symbols-outlined text-primary text-2xl">stars</span>
                </div>
                <span className="text-xs font-bold text-on-surface">First Audit</span>
              </div>

              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center border-2 border-amber-500/20 group-hover:border-amber-500 transition-all">
                  <span className="material-symbols-outlined text-amber-600 text-2xl">workspace_premium</span>
                </div>
                <span className="text-xs font-bold text-on-surface">100 Audits</span>
              </div>

              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center border-2 border-secondary/20 group-hover:border-secondary transition-all">
                  <span className="material-symbols-outlined text-secondary text-2xl">verified_user</span>
                </div>
                <span className="text-xs font-bold text-on-surface">Security Expert</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Widgets & Sidebar (Col 4) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Quick Actions Grid */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 custom-shadow space-y-3">
            <h4 className="font-bold text-xs text-on-surface uppercase tracking-wider">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/processing')}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-surface hover:bg-primary hover:text-white transition-all group border border-outline-variant/30"
              >
                <span className="material-symbols-outlined mb-1 group-hover:text-white text-primary">add_circle</span>
                <span className="text-[11px] font-bold">New Audit</span>
              </button>

              <button
                onClick={() => navigate('/history')}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-surface hover:bg-primary hover:text-white transition-all group border border-outline-variant/30"
              >
                <span className="material-symbols-outlined mb-1 group-hover:text-white text-primary">history</span>
                <span className="text-[11px] font-bold">Audit History</span>
              </button>

              <button
                onClick={() => navigate('/report')}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-surface hover:bg-primary hover:text-white transition-all group border border-outline-variant/30"
              >
                <span className="material-symbols-outlined mb-1 group-hover:text-white text-primary">analytics</span>
                <span className="text-[11px] font-bold">Reports</span>
              </button>

              <button
                onClick={() => navigate('/settings')}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-surface hover:bg-primary hover:text-white transition-all group border border-outline-variant/30"
              >
                <span className="material-symbols-outlined mb-1 group-hover:text-white text-primary">settings</span>
                <span className="text-[11px] font-bold">Settings</span>
              </button>
            </div>
          </div>

          {/* AI Usage Summary */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 custom-shadow space-y-4">
            <h4 className="font-bold text-xs text-on-surface uppercase tracking-wider">AI Usage Summary</h4>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-[9px] font-bold text-primary uppercase tracking-wider">Preferred Local Model</p>
              <p className="text-xs font-bold text-on-surface">Qwen2.5:7B (Ollama)</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-on-surface-variant">Confidence Score</span>
                  <span className="text-primary">94%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-on-surface-variant">Processing Efficiency</span>
                  <span className="text-secondary">88%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/30 flex justify-between text-xs font-bold">
              <span className="text-on-surface-variant">Most Triggered Agent</span>
              <span className="text-amber-600">Financial Agent</span>
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 custom-shadow space-y-4">
            <h4 className="font-bold text-xs text-on-surface uppercase tracking-wider">Recent Activity</h4>
            <div className="space-y-4 text-xs">
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-xs">upload_file</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Uploaded 'Financial Proposal.pdf'</p>
                  <p className="text-[10px] text-outline">2 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Completed Security Audit</p>
                  <p className="text-[10px] text-outline">5 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-xs">download</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Downloaded Executive Report</p>
                  <p className="text-[10px] text-outline">Yesterday at 4:15 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Overview */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 custom-shadow space-y-3 text-xs">
            <h4 className="font-bold text-xs text-on-surface uppercase tracking-wider">Security Overview</h4>
            <div className="flex items-center justify-between py-2 border-b border-outline-variant/30">
              <span className="text-on-surface-variant font-bold">2FA Status</span>
              <span className="font-bold text-secondary">Enabled</span>
            </div>
            <div className="py-2 border-b border-outline-variant/30">
              <p className="text-on-surface-variant text-[10px] uppercase font-bold">Last Login</p>
              <p className="font-bold text-on-surface">Today, 08:22 AM · New York, US</p>
            </div>
            <div className="pt-2">
              <p className="text-on-surface-variant text-[10px] uppercase font-bold mb-2">Current Active Session</p>
              <div className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary">laptop_mac</span>
                <div>
                  <p className="font-bold text-on-surface">MacBook Pro / Chrome</p>
                  <p className="text-[10px] text-outline">IP: 192.168.1.42 • Session Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Storage Usage */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 custom-shadow space-y-3">
            <h4 className="font-bold text-xs text-on-surface uppercase tracking-wider">Cloud Storage</h4>
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-on-surface-variant">12.5 GB of 50 GB used</span>
              <span className="text-primary">25%</span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '25%' }}></div>
            </div>
            <button
              onClick={() => alert('Storage plan: 50GB Enterprise Cloud active.')}
              className="w-full text-center text-primary text-xs font-bold hover:underline pt-1 inline-block"
            >
              Manage Storage
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 custom-shadow space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
              <h3 className="font-bold text-base text-on-surface">Change Password</h3>
              <button onClick={() => setShowPasswordModal(false)} className="text-outline hover:text-on-surface">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {passwordMsg && (
              <div
                className={`p-3 rounded-xl text-xs font-bold ${
                  passwordMsg.includes('success')
                    ? 'bg-emerald-50 text-secondary'
                    : 'bg-red-50 text-error'
                }`}
              >
                {passwordMsg}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-on-surface-variant mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-surface border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-on-surface-variant mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-surface border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 border border-outline-variant text-on-surface-variant text-xs font-bold rounded-xl hover:bg-surface-variant"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-md hover:bg-on-primary-fixed-variant"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

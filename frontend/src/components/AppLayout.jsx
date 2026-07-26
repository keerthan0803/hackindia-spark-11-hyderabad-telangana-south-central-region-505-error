import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am your Autonomous Audit Assistant. How can I help you analyze risk vectors or model projections today?',
    },
  ]);

  const getUserData = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr && userStr !== 'undefined' && userStr !== 'null') {
        return JSON.parse(userStr);
      }
    } catch (e) {
      console.warn('Failed to parse user session');
    }
    return { fullName: 'Alex Sterling', role: 'Senior Auditor', email: 'alex@enterprise.com' };
  };

  const currentUser = getUserData();
  const fullName = currentUser.fullName || 'Alex Sterling';
  const role = currentUser.role || 'Senior Auditor';
  const email = currentUser.email || 'alex@enterprise.com';
  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'AS';
  const avatar =
    currentUser.avatar ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDw5VZK4xOH5gLaMJHMKJsES3K61gV2htLUZ4uPaxWSUuXZaKy94fd_TJfZLumP_Y-SM1vgkDayJdSGUHYvPplavRMGZSEp0lYunipdJ9USTGJrKGczipURu5HCKOp_8Ely8tsl8VKmt_3m3dlNfQufu-CQuHbj8KEpbAKjOjq38DQcxfAzhLCeIF9coEcloS0uJVZahJqmvimJr1OMUFg6epjJrfbDXWNsxHSz--Jn4HA_p_Viq-Rp_ueNs4-l58MBJDe92-w9__A7';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { label: 'New Audit', path: '/processing', icon: 'add_circle' },
    { label: 'Live Topology', path: '/report-details', icon: 'account_tree' },
    { label: 'Audit Reports', path: '/report', icon: 'analytics' },
    { label: 'Agent Analysis', path: '/agent-details', icon: 'smart_toy' },
    { label: 'Audit Logs', path: '/history', icon: 'history_edu' },
    { label: 'My Profile', path: '/profile', icon: 'person' },
    { label: 'Settings', path: '/settings', icon: 'settings' },
    { label: 'Help Center', path: '/help', icon: 'help' },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Analyzing vectorquery: "${userText}". All 4 domain agents report operational readiness.`,
        },
      ]);
    }, 800);
  };

  return (
    <div className="text-on-surface bg-background h-screen overflow-hidden flex">
      {/* Persistent Left Sidebar Navigation Drawer (Desktop) */}
      <aside className="fixed left-0 top-0 h-full z-40 flex flex-col py-6 bg-surface-container-low border-r border-outline-variant w-72 shadow-md hidden lg:flex">
        {/* Brand Logo Header */}
        <div className="px-6 mb-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl font-black">
              security
            </span>
            <h1 className="font-headline-md text-lg font-black text-primary tracking-tight">
              Adversarial Auditor
            </h1>
          </Link>
        </div>

        {/* Dynamic Clickable User Profile Card -> Navigates to Profile */}
        <div className="px-5 mb-6">
          <div
            onClick={() => navigate('/profile')}
            className="flex items-center gap-3 p-3 bg-surface-container-highest rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-fixed border border-primary/40 shrink-0 flex items-center justify-center font-bold text-xs text-primary">
              {avatar ? (
                <img
                  className="w-full h-full object-cover"
                  alt={fullName}
                  src={avatar}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-xs text-on-surface truncate group-hover:text-primary transition-colors">
                {fullName}
              </p>
              <p className="text-[10px] text-on-surface-variant truncate">{role}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLogout();
              }}
              title="Sign Out"
              className="text-outline hover:text-error transition-colors p-1"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
            </button>
          </div>
        </div>

        {/* Persistent Navigation Items */}
        <nav className="flex-1 space-y-1 px-3 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 py-2.5 px-4 font-bold rounded-xl transition-all duration-150 ease-in-out text-xs ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Viewport */}
      <div className="lg:ml-72 flex-1 flex flex-col h-screen overflow-hidden w-full">
        {/* Top Persistent Header Bar */}
        <header className="flex justify-between items-center px-6 h-16 w-full bg-surface border-b border-outline-variant/40 shrink-0 shadow-xs z-30">
          <div className="flex items-center gap-4 w-1/2">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">
                search
              </span>
              <input
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-full py-1.5 pl-9 pr-4 text-xs focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                placeholder="Global Audit Search..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors"
              title="AI Assistant Chat"
            >
              smart_toy
            </button>
            <Link
              to="/help"
              className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors"
              title="Help Center"
            >
              help
            </Link>
            <div className="h-6 w-px bg-outline-variant/40 mx-1 hidden sm:block"></div>

            {/* Dynamic Clickable Header Profile -> Navigates to Profile */}
            <div
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span className="text-xs font-bold text-on-surface hidden sm:inline">{fullName}</span>
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs border border-primary/30 overflow-hidden">
                {avatar ? (
                  <img className="w-full h-full object-cover" alt={fullName} src={avatar} />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Slide-out Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden bg-surface border-b border-outline-variant p-4 space-y-2 z-40 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-bold ${
                  location.pathname === item.path
                    ? 'bg-primary text-white'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* Child Viewport Render Container */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-surface">
          <Outlet />
        </main>
      </div>

      {/* Floating AI Assistant Modal */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl border border-outline-variant/40 custom-shadow z-50 flex flex-col h-[480px] overflow-hidden">
          <div className="bg-primary text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">smart_toy</span>
              <span className="font-bold text-xs">Autonomous Audit Assistant</span>
            </div>
            <button onClick={() => setChatOpen(false)} className="hover:opacity-80">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-surface text-xs custom-scrollbar">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-surface-container-high text-on-surface rounded-bl-none border border-outline-variant/30'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t border-outline-variant/30 bg-white flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask AI about audit findings..."
              className="flex-1 bg-surface border border-outline-variant/40 rounded-xl px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-primary text-white rounded-xl font-bold text-xs hover:bg-on-primary-fixed-variant"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

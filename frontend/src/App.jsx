import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Processing from './pages/Processing';
import Report from './pages/Report';
import ReportDetails from './pages/ReportDetails';
import AgentDetails from './pages/AgentDetails';
import AuditHistory from './pages/AuditHistory';
import Settings from './pages/Settings';
import Help from './pages/Help';

export default function App() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/report' ||
    location.pathname === '/dashboard' ||
    location.pathname === '/processing' ||
    location.pathname === '/report-details' ||
    location.pathname === '/agent-details' ||
    location.pathname === '/history' ||
    location.pathname === '/settings' ||
    location.pathname === '/help';

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#191b23] flex flex-col font-sans">
      {!hideNavbar && <Navbar />}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/report" element={<Report />} />
          <Route path="/report-details" element={<ReportDetails />} />
          <Route path="/agent-details" element={<AgentDetails />} />
          <Route path="/history" element={<AuditHistory />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </main>
    </div>
  );
}

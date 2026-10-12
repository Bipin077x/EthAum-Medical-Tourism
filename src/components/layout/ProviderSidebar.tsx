import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { useAuth } from '../../context/AuthContext';
import {
  Inbox,
  BriefcaseMedical,
  FileSpreadsheet,
  CalendarDays,
  MessageSquare,
  Building2,
  FileCheck2,
  LogOut,
  PlusCircle,
  TrendingUp
} from 'lucide-react';

export const ProviderSidebar: React.FC = () => {
  const { cases, appointments, messages } = useCase();
  const { currentUser, signOut } = useAuth();

  const caseId = cases[0]?.id || 'case-eth-9021';
  const pendingCasesCount = cases.filter((c) => c.status === 'quotes_received' || c.status === 'submitted').length;
  const unreadMessagesCount = messages.filter((m) => m.senderRole === 'patient').length;

  const navItems = [
    { label: 'Operations Overview', path: '/provider', end: true, icon: TrendingUp },
    { label: 'Patient Lead Inbox', path: '/provider/leads', icon: Inbox, count: pendingCasesCount },
    { label: 'Active Clinical Cases', path: `/provider/cases/${caseId}`, icon: BriefcaseMedical },
    { label: 'Quote Builder', path: `/provider/cases/${caseId}/quotes/new`, icon: FileSpreadsheet },
    { label: 'Consultation Calendar', path: '/provider/appointments', icon: CalendarDays, count: appointments.length },
    { label: 'Patient Messaging', path: '/provider/messages', icon: MessageSquare, count: unreadMessagesCount },
  ];

  return (
    <aside className="w-64 bg-[#123B46] text-white flex flex-col h-full min-h-[calc(100vh-33px)] sticky top-[33px]">
      {/* Provider & Hospital Profile */}
      <div className="p-4 border-b border-[#1f5664] bg-[#0d2a32]">
        <div className="flex items-center gap-3">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80'}
            alt="Provider Avatar"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-400"
          />
          <div className="overflow-hidden">
            <h3 className="text-sm font-bold text-white truncate">{currentUser?.name || 'Dr. Arvind Mehta'}</h3>
            <p className="text-[11px] text-teal-300 flex items-center gap-1 truncate">
              <Building2 className="w-3 h-3 shrink-0" />
              <span>Apollo Hospital & Heart</span>
            </p>
          </div>
        </div>

        <div className="mt-3 px-2.5 py-1.5 rounded-lg bg-[#167D78]/30 border border-teal-500/30 flex items-center justify-between text-xs">
          <span className="text-teal-200">Accreditation:</span>
          <span className="font-semibold text-emerald-300">JCI Verified</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-300/70">
          Hospital Workflows
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#167D78] text-white font-semibold shadow-xs'
                  : 'text-gray-200 hover:bg-[#1a4a57] hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-2.5">
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-teal-200' : 'text-teal-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className="px-2 py-0.2 rounded-full text-xs font-semibold bg-emerald-500 text-white">
                    {item.count}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}

        <div className="pt-4 mt-4 border-t border-[#1f5664] px-2">
          <Link
            to={`/provider/cases/${caseId}/quotes/new`}
            className="w-full py-2.5 px-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Quote</span>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[#1f5664] bg-[#0d2a32]">
        <Link
          to="/treatments"
          className="text-xs text-gray-300 hover:text-white flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[#164450] transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <FileCheck2 className="w-3.5 h-3.5 text-teal-300" />
            <span>Public Catalogue</span>
          </span>
        </Link>
        <button
          onClick={signOut}
          className="w-full mt-1.5 text-xs text-rose-300 hover:text-rose-200 flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-rose-950/40 transition-colors text-left"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Workspace</span>
        </button>
      </div>
    </aside>
  );
};

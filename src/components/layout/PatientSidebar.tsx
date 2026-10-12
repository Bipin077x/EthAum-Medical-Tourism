import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  FolderOpen,
  Sparkles,
  Receipt,
  Calendar,
  MessageSquare,
  HeartHandshake,
  PlusCircle,
  FileCheck2,
  ChevronRight,
  LogOut
} from 'lucide-react';

export const PatientSidebar: React.FC = () => {
  const { activeCase, quotes, appointments } = useCase();
  const { currentUser, signOut } = useAuth();

  const caseId = activeCase?.id || 'case-eth-9021';

  const pendingQuotesCount = quotes.filter((q) => q.caseId === caseId && q.status === 'pending').length;
  const confirmedAptsCount = appointments.filter((a) => a.caseId === caseId && a.status === 'confirmed').length;

  const navItems = [
    { label: 'Care Overview', path: '/patient', icon: LayoutDashboard, end: true },
    { label: 'Case & Records', path: `/patient/cases/${caseId}`, icon: FolderOpen },
    { label: 'Provider Matches', path: `/patient/cases/${caseId}/matches`, icon: Sparkles, badge: 'AI' },
    { label: 'Compare Quotes', path: `/patient/cases/${caseId}/quotes`, icon: Receipt, count: pendingQuotesCount },
    { label: 'Consultations', path: '/patient/appointments', icon: Calendar, count: confirmedAptsCount },
    { label: 'Direct Messages', path: '/patient/messages', icon: MessageSquare },
    { label: 'Aftercare Recovery', path: '/patient/aftercare', icon: HeartHandshake },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E2E8E7] flex flex-col h-full min-h-[calc(100vh-33px)] sticky top-[33px]">
      {/* Patient Profile Card */}
      <div className="p-4 border-b border-[#E2E8E7] bg-[#F5F8F7]/60">
        <div className="flex items-center gap-3">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'}
            alt="Patient Avatar"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-600/20"
          />
          <div className="overflow-hidden">
            <h3 className="text-sm font-bold text-[#123B46] truncate">{currentUser?.name || 'Sarah Jenkins'}</h3>
            <p className="text-xs text-[#5A6B70] flex items-center gap-1">
              <span>🇬🇧 United Kingdom</span>
            </p>
          </div>
        </div>

        {/* Active Case Badge */}
        {activeCase && (
          <div className="mt-3 p-2.5 rounded-lg bg-white border border-[#E2E8E7] shadow-2xs">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-semibold text-[#167D78]">{activeCase.id}</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 font-medium border border-amber-200 uppercase text-[9px]">
                {activeCase.status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs font-medium text-gray-800 line-clamp-1">{activeCase.treatmentTitle}</p>
            <div className="mt-1 flex items-center text-[10px] text-gray-500 justify-between">
              <span>Stage {activeCase.currentStageNumber} of 12</span>
              <span className="text-[#167D78] font-semibold">Active</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#5A6B70]">
          Patient Workspace
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#123B46] text-white shadow-xs'
                  : 'text-[#26363B] hover:bg-teal-50/70 hover:text-[#167D78]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-2.5">
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-teal-300' : 'text-[#5A6B70]'}`} />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-teal-100 text-teal-800">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`px-2 py-0.2 rounded-full text-xs font-semibold ${
                      isActive ? 'bg-teal-500 text-white' : 'bg-teal-100 text-[#167D78]'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </div>
              </>
            )}
          </NavLink>
        ))}

        <div className="pt-4 mt-4 border-t border-gray-100 px-2">
          <Link
            to="/patient/cases/new"
            className="w-full py-2.5 px-3 rounded-lg border border-dashed border-[#167D78] bg-teal-50/50 hover:bg-teal-50 text-[#167D78] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Another Case</span>
          </Link>
        </div>
      </nav>

      {/* Footer Info */}
      <div className="p-3 border-t border-[#E2E8E7] bg-gray-50/80">
        <Link
          to="/treatments"
          className="text-xs text-[#5A6B70] hover:text-[#123B46] flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <FileCheck2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Public Marketplace</span>
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        </Link>
        <button
          onClick={signOut}
          className="w-full mt-2 text-xs text-red-600 hover:text-red-700 flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-red-50 transition-colors text-left"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

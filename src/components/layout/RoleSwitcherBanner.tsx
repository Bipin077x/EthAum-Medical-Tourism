import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { UserCheck, ShieldCheck, Stethoscope, Globe, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RoleSwitcherBanner: React.FC = () => {
  const { role, switchRole, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (targetRole: UserRole) => {
    switchRole(targetRole);
    if (targetRole === 'patient') navigate('/patient');
    else if (targetRole === 'provider') navigate('/provider');
    else if (targetRole === 'admin') navigate('/admin');
    else navigate('/');
  };

  return (
    <div className="bg-[#123B46] text-white px-4 py-2 border-b border-[#1b4e5c] text-xs sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wide uppercase text-teal-300 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Prototype Persona Switcher:
          </span>
          <span className="text-gray-200 hidden sm:inline">
            Active: <strong className="text-white font-medium">{currentUser ? `${currentUser.name} (${currentUser.role})` : 'Public Visitor'}</strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-gray-400 mr-1 text-[11px] hidden md:inline">Switch Workspace:</span>
          
          <button
            onClick={() => handleRoleSelect('patient')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 font-medium ${
              role === 'patient'
                ? 'bg-[#167D78] text-white shadow-sm ring-1 ring-teal-300'
                : 'bg-[#1a4a57] hover:bg-[#235868] text-gray-200'
            }`}
            title="Switch to Patient persona (Sarah Jenkins)"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Patient</span>
            {role === 'patient' && <Check className="w-3 h-3 text-teal-200" />}
          </button>

          <button
            onClick={() => handleRoleSelect('provider')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 font-medium ${
              role === 'provider'
                ? 'bg-[#167D78] text-white shadow-sm ring-1 ring-teal-300'
                : 'bg-[#1a4a57] hover:bg-[#235868] text-gray-200'
            }`}
            title="Switch to Healthcare Provider persona (Dr. Arvind Mehta - Apollo)"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Provider</span>
            {role === 'provider' && <Check className="w-3 h-3 text-teal-200" />}
          </button>

          <button
            onClick={() => handleRoleSelect('admin')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 font-medium ${
              role === 'admin'
                ? 'bg-[#167D78] text-white shadow-sm ring-1 ring-teal-300'
                : 'bg-[#1a4a57] hover:bg-[#235868] text-gray-200'
            }`}
            title="Switch to Platform Compliance Admin persona"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
            {role === 'admin' && <Check className="w-3 h-3 text-teal-200" />}
          </button>

          <button
            onClick={() => handleRoleSelect('public')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 font-medium ${
              role === 'public'
                ? 'bg-[#167D78] text-white shadow-sm ring-1 ring-teal-300'
                : 'bg-[#1a4a57] hover:bg-[#235868] text-gray-200'
            }`}
            title="Switch to Public Marketplace Visitor"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Public</span>
            {role === 'public' && <Check className="w-3 h-3 text-teal-200" />}
          </button>
        </div>
      </div>
    </div>
  );
};

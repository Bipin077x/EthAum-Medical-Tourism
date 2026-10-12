import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { RoleSwitcherBanner } from './RoleSwitcherBanner';
import { Shield, ArrowLeft } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8F7]">
      <RoleSwitcherBanner />
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#123B46] text-white flex items-center justify-center font-bold">
            <Shield className="w-4 h-4 text-teal-300" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#123B46]">EthAum Platform Administration</h2>
            <p className="text-[11px] text-gray-500">Security & Clinical Governance Board</p>
          </div>
        </div>

        <Link
          to="/"
          className="text-xs font-semibold text-[#167D78] hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Public Portal</span>
        </Link>
      </header>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

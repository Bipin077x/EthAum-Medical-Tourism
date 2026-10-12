import React from 'react';
import { Outlet } from 'react-router-dom';
import { PatientSidebar } from './PatientSidebar';
import { RoleSwitcherBanner } from './RoleSwitcherBanner';

export const PatientLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8F7]">
      <RoleSwitcherBanner />
      <div className="flex-1 flex">
        <PatientSidebar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Menu, X, ArrowRight, User as UserIcon } from 'lucide-react';

export const PublicHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { role, currentUser } = useAuth();

  const navLinks = [
    { label: 'Treatments', path: '/treatments' },
    { label: 'Destinations', path: '/destinations/bangkok-thailand' },
    { label: 'Hospitals & Doctors', path: '/providers' },
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'Help & FAQs', path: '/help' },
  ];

  const isActive = (path: string) => {
    if (path.includes('#')) return false;
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-[#E2E8E7] sticky top-[33px] z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#123B46] to-[#167D78] flex items-center justify-center text-white shadow-md shadow-teal-900/10 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-teal-200" />
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight text-[#123B46] font-['Manrope'] flex items-center gap-1.5">
              <span>EthAum</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-teal-50 text-[#167D78] border border-teal-200">Global</span>
            </div>
            <p className="text-[11px] text-[#5A6B70] tracking-wide font-medium">International Medical Care & Trust</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-[#167D78] font-semibold border-b-2 border-[#167D78] pb-1'
                  : 'text-[#26363B] hover:text-[#167D78]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {role !== 'public' ? (
            <Link
              to={role === 'patient' ? '/patient' : role === 'provider' ? '/provider' : '/admin'}
              className="px-3.5 py-2 text-sm font-medium text-[#123B46] hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-2 border border-[#E2E8E7]"
            >
              <UserIcon className="w-4 h-4 text-[#167D78]" />
              <span>{role === 'patient' ? 'My Care Portal' : role === 'provider' ? 'Provider Portal' : 'Admin Panel'}</span>
            </Link>
          ) : (
            <Link
              to="/auth/sign-in"
              className="px-3.5 py-2 text-sm font-medium text-[#26363B] hover:text-[#167D78] transition-colors"
            >
              Sign In
            </Link>
          )}

          <Link
            to="/patient/cases/new"
            className="px-4 py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 group"
          >
            <span>Start Your Case</span>
            <ArrowRight className="w-4 h-4 text-teal-300 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(link.path) ? 'bg-teal-50 text-[#167D78]' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link
              to={role === 'patient' ? '/patient' : role === 'provider' ? '/provider' : '/auth/sign-in'}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              {currentUser ? `Portal (${currentUser.name})` : 'Sign In'}
            </Link>
            <Link
              to="/patient/cases/new"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-semibold text-white bg-[#123B46] rounded-lg shadow-sm"
            >
              Start Your Case
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

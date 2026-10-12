import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Shield, Lock, Eye, EyeOff, UserCheck, Stethoscope, ShieldCheck, ArrowRight } from 'lucide-react';

export const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      signIn(selectedRole, email);
      setLoading(false);
      if (selectedRole === 'patient') navigate('/patient');
      else if (selectedRole === 'provider') navigate('/provider');
      else if (selectedRole === 'admin') navigate('/admin');
    }, 400);
  };

  const handleQuickPersonaSelect = (role: UserRole) => {
    signIn(role);
    if (role === 'patient') navigate('/patient');
    else if (role === 'provider') navigate('/provider');
    else if (role === 'admin') navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#F5F8F7] py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#123B46] to-[#167D78] flex items-center justify-center text-white shadow-md">
              <Shield className="w-5 h-5 text-teal-200" />
            </div>
            <span className="text-2xl font-bold text-[#123B46] font-['Manrope']">EthAum</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 font-['Manrope']">Sign in to your care workspace</h1>
          <p className="text-xs text-[#5A6B70] mt-1">Access your treatment cases, quotes, or hospital lead inbox</p>
        </div>

        {/* Quick Demo Personas - for evaluators */}
        <div className="mb-6 p-4 bg-teal-50/70 border border-teal-200 rounded-2xl">
          <span className="text-[11px] font-bold text-[#167D78] uppercase tracking-wider block mb-2">
            ⚡ Quick Demo Access (1-Click Login):
          </span>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleQuickPersonaSelect('patient')}
              className="w-full text-left p-2.5 rounded-xl bg-white border border-teal-200/80 hover:border-teal-400 hover:shadow-xs transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Patient: Sarah Jenkins</h4>
                  <p className="text-[10px] text-gray-500">Case #9021 • Orthopedic Knee Arthroplasty</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-teal-600 transition-colors" />
            </button>

            <button
              type="button"
              onClick={() => handleQuickPersonaSelect('provider')}
              className="w-full text-left p-2.5 rounded-xl bg-white border border-teal-200/80 hover:border-teal-400 hover:shadow-xs transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Provider: Dr. Arvind Mehta</h4>
                  <p className="text-[10px] text-gray-500">Apollo Hospital Lead Surgeon & Quote Builder</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-teal-600 transition-colors" />
            </button>

            <button
              type="button"
              onClick={() => handleQuickPersonaSelect('admin')}
              className="w-full text-left p-2.5 rounded-xl bg-white border border-teal-200/80 hover:border-teal-400 hover:shadow-xs transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Platform Admin: Elena Vance</h4>
                  <p className="text-[10px] text-gray-500">Accreditation Verification & Governance</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-teal-600 transition-colors" />
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Select Account Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('patient')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    selectedRole === 'patient'
                      ? 'bg-[#123B46] text-white border-[#123B46]'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('provider')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    selectedRole === 'provider'
                      ? 'bg-[#123B46] text-white border-[#123B46]'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  Healthcare Provider
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#167D78] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#167D78] focus:bg-white transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <label className="flex items-center gap-1.5 text-gray-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#167D78] focus:ring-[#167D78]" />
                <span>Remember this workstation</span>
              </label>
              <span className="text-[#167D78] hover:underline cursor-pointer">Forgot password?</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white font-semibold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
            Don't have an account yet?{' '}
            <Link to="/auth/sign-up" className="text-[#167D78] font-bold hover:underline">
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

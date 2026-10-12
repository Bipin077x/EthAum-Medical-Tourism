import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Shield, ArrowRight, UserCheck, Stethoscope } from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States');
  const [role, setRole] = useState<UserRole>('patient');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(role, email);
    if (role === 'patient') navigate('/patient/cases/new');
    else navigate('/provider');
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
          <h1 className="text-2xl font-bold text-gray-900 font-['Manrope']">Create your EthAum account</h1>
          <p className="text-xs text-[#5A6B70] mt-1">Join the international accredited healthcare network</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Account Role</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('patient')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    role === 'patient'
                      ? 'border-[#167D78] bg-teal-50/50 ring-1 ring-[#167D78]'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-[#167D78] mb-1" />
                  <div className="text-xs font-bold text-gray-900">Patient</div>
                  <div className="text-[10px] text-gray-500">Seeking medical care</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('provider')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    role === 'provider'
                      ? 'border-[#167D78] bg-teal-50/50 ring-1 ring-[#167D78]'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <Stethoscope className="w-4 h-4 text-[#167D78] mb-1" />
                  <div className="text-xs font-bold text-gray-900">Hospital Provider</div>
                  <div className="text-[10px] text-gray-500">Medical staff / surgeon</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Legal Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#167D78] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@example.com"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#167D78] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Country of Residence</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#167D78] focus:bg-white"
              >
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
              </select>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2 text-[11px] text-gray-600 cursor-pointer">
                <input type="checkbox" required defaultChecked className="mt-0.5 rounded text-[#167D78] focus:ring-[#167D78]" />
                <span>I agree to the <Link to="/terms" className="text-[#167D78] underline">Terms of Service</Link> and <Link to="/privacy" className="text-[#167D78] underline">Health Data Privacy Policy</Link>.</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white font-semibold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>Complete Registration</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/auth/sign-in" className="text-[#167D78] font-bold hover:underline">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

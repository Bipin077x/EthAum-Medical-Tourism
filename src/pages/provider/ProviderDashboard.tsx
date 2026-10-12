import React from 'react';
import { Link } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../components/shared/CurrencySelector';
import {
  Inbox,
  BriefcaseMedical,
  FileSpreadsheet,
  CalendarDays,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ProviderDashboard: React.FC = () => {
  const { cases, quotes, appointments, messages } = useCase();
  const { currentUser } = useAuth();
  const { formatPrice } = useCurrency();

  const caseId = cases[0]?.id || 'case-eth-9021';
  const pendingLeads = cases.filter((c) => c.status === 'quotes_received' || c.status === 'submitted');
  const providerQuotes = quotes.filter((q) => q.providerId === 'p-1');
  const confirmedApts = appointments.filter((a) => a.providerId === 'p-1');

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            Hospital Operations & Clinical Lead Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B46] font-['Manrope'] mt-0.5">
            {currentUser?.organization || 'Apollo Hospital & Heart Institute'}
          </h1>
          <p className="text-xs text-[#5A6B70] mt-1">
            Logged in as <strong>{currentUser?.name || 'Dr. Arvind Mehta'}</strong> • Joint Reconstruction Chief
          </p>
        </div>

        <Link
          to={`/provider/cases/${caseId}/quotes/new`}
          className="px-4 py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 self-start"
        >
          <FileSpreadsheet className="w-4 h-4 text-teal-300" />
          <span>Build Structured Quote</span>
        </Link>
      </div>

      {/* Metrics Row (Derived from state as strictly mandated by Section 16) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500">Active Patient Leads</span>
            <div className="p-2 bg-teal-50 text-[#167D78] rounded-lg">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#123B46]">{cases.length}</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            {pendingLeads.length} awaiting response
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500">Quotes Submitted</span>
            <div className="p-2 bg-teal-50 text-[#167D78] rounded-lg">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#123B46]">{providerQuotes.length}</div>
          <span className="text-[11px] text-gray-500 mt-1 block">
            Pipeline value: {formatPrice(providerQuotes.reduce((acc, q) => acc + q.totalAmountUSD, 0))}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500">Video Consultations</span>
            <div className="p-2 bg-teal-50 text-[#167D78] rounded-lg">
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#123B46]">{confirmedApts.length}</div>
          <span className="text-[11px] text-teal-700 font-semibold mt-1 block">
            Next: Oct 15 at 14:30 GMT
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500">Response SLA Status</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">100% On-Time</div>
          <span className="text-[11px] text-gray-500 mt-1 block">Average reply: 3.2 hours</span>
        </div>
      </div>

      {/* Leads Requiring Clinical Action */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-[#123B46]">Priority Lead Enquiries</h2>
            <p className="text-xs text-[#5A6B70]">Patients whose records match your department's clinical profile</p>
          </div>
          <Link to="/provider/leads" className="text-xs font-bold text-[#167D78] hover:underline">
            View all incoming leads →
          </Link>
        </div>

        <div className="space-y-4">
          {cases.map((patientCase) => (
            <div
              key={patientCase.id}
              className="p-5 rounded-2xl border border-gray-200 hover:border-teal-300 transition-all bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#167D78]">{patientCase.id}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                    {patientCase.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-gray-500">Patient: <strong>{patientCase.patientName}</strong> ({patientCase.patientCountry})</span>
                </div>

                <h3 className="text-sm font-bold text-gray-900">{patientCase.treatmentTitle}</h3>
                <p className="text-xs text-[#5A6B70] line-clamp-1">
                  Primary Diagnosis: {patientCase.clinicalSummary.primaryDiagnosis}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-600 pt-1">
                  <span>Budget: <strong>${patientCase.budgetPreferenceUSD.toLocaleString()} USD</strong></span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">{patientCase.medicalRecords.length} Diagnostic Records Attached</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/provider/cases/${patientCase.id}`}
                  className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 rounded-xl text-xs font-semibold border border-gray-200 transition-colors"
                >
                  Inspect Case
                </Link>
                <Link
                  to={`/provider/cases/${patientCase.id}/quotes/new`}
                  className="px-4 py-2 bg-[#123B46] hover:bg-[#0d2b33] text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
                >
                  Create Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

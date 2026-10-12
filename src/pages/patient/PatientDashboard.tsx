import React from 'react';
import { Link } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../components/shared/CurrencySelector';
import { CaseTimeline } from '../../components/shared/CaseTimeline';
import {
  ArrowRight,
  AlertCircle,
  Clock,
  Sparkles,
  Receipt,
  Calendar,
  MessageSquare,
  FileText,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const { activeCase, quotes, appointments, messages } = useCase();
  const { currentUser } = useAuth();
  const { formatPrice } = useCurrency();

  const caseId = activeCase?.id || 'case-eth-9021';
  const pendingQuotes = quotes.filter((q) => q.caseId === caseId && q.status === 'pending');
  const upcomingApt = appointments.find((a) => a.caseId === caseId && a.status === 'confirmed');
  const unreadMsg = messages.filter((m) => m.senderRole === 'provider').slice(-1)[0];

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#167D78] uppercase tracking-wider">
            Patient Care Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B46] font-['Manrope'] mt-0.5">
            Welcome back, {currentUser?.name || 'Sarah'}
          </h1>
          <p className="text-xs text-[#5A6B70] mt-1">
            Tracking your international healthcare journey with end-to-end clinical transparency.
          </p>
        </div>

        <Link
          to="/patient/cases/new"
          className="px-4 py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-2 self-start"
        >
          <span>Start Another Medical Case</span>
          <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
        </Link>
      </div>

      {/* Case Timeline Visualizer */}
      {activeCase && (
        <CaseTimeline currentStage={activeCase.currentStageNumber} status={activeCase.status} />
      )}

      {/* Next Actionable Step Banner (Mandated by Section 8 of spec) */}
      <div className="bg-gradient-to-r from-[#123B46] to-[#167D78] text-white rounded-2xl p-6 sm:p-7 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-teal-300/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-teal-200 text-xs font-bold mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>Next Required Action</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-['Manrope']">
              {pendingQuotes.length > 0
                ? `Compare & Review ${pendingQuotes.length} Verified Hospital Proposals`
                : 'Review & Confirm AI Extracted Clinical Records'}
            </h2>

            <p className="text-xs text-teal-100 mt-2 leading-relaxed">
              {pendingQuotes.length > 0
                ? `You have received itemized proposals from Apollo Hospital ($5,200) and Bumrungrad Hospital ($6,850). Compare line-item surgeon fees, implants, and hospital days to select your preferred provider.`
                : `Your uploaded MRI and referral notes were parsed by clinical AI. Please review the extracted diagnosis before matching with hospital surgical teams.`}
            </p>
          </div>

          <div className="shrink-0">
            {pendingQuotes.length > 0 ? (
              <Link
                to={`/patient/cases/${caseId}/quotes`}
                className="px-5 py-3 bg-white text-[#123B46] hover:bg-teal-50 font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-2"
              >
                <span>Compare Itemized Quotes</span>
                <ArrowRight className="w-4 h-4 text-[#167D78]" />
              </Link>
            ) : (
              <Link
                to={`/patient/cases/${caseId}`}
                className="px-5 py-3 bg-white text-[#123B46] hover:bg-teal-50 font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-2"
              >
                <span>Review Extracted Records</span>
                <ArrowRight className="w-4 h-4 text-[#167D78]" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Key Journey Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Case Details Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-[#123B46] uppercase tracking-wider">Active Medical Case</h3>
            <span className="text-xs font-bold text-[#167D78]">{activeCase?.id}</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-gray-400 block text-[11px]">Primary Treatment</span>
              <span className="font-bold text-gray-900 text-sm">{activeCase?.treatmentTitle}</span>
            </div>

            <div>
              <span className="text-gray-400 block text-[11px]">Preferred Destinations</span>
              <span className="font-medium text-gray-800">{activeCase?.preferredDestination}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div>
                <span className="text-gray-400 block text-[11px]">Target Budget</span>
                <span className="font-bold text-[#123B46]">{formatPrice(activeCase?.budgetPreferenceUSD || 8000)}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">Uploaded Records</span>
                <span className="font-bold text-emerald-700">{activeCase?.medicalRecords.length || 0} Files Secured</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100">
            <Link
              to={`/patient/cases/${caseId}`}
              className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-[#123B46] font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#167D78]" />
              <span>Open Case Workspace & Records</span>
            </Link>
          </div>
        </div>

        {/* Proposals Received Widget */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-[#123B46] uppercase tracking-wider">Hospital Proposals</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-[#167D78] border border-teal-200">
              {quotes.length} Total
            </span>
          </div>

          <div className="space-y-3">
            {quotes.slice(0, 2).map((quote) => (
              <div
                key={quote.id}
                className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-gray-900 truncate max-w-[150px]">{quote.providerName}</h4>
                  <p className="text-[11px] text-gray-500">{quote.leadSurgeon}</p>
                  <p className="text-[10px] text-teal-700 font-medium">{quote.estimatedStayDaysHospital}d Hospital Stay</p>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-[#123B46] text-sm">{formatPrice(quote.totalAmountUSD)}</div>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold capitalize ${
                    quote.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {quote.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100">
            <Link
              to={`/patient/cases/${caseId}/quotes`}
              className="w-full py-2 bg-teal-50 hover:bg-teal-100 text-[#167D78] font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>Compare Side-by-Side</span>
            </Link>
          </div>
        </div>

        {/* Upcoming Tele-health Consultation Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-[#123B46] uppercase tracking-wider">Upcoming Consultation</h3>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Confirmed
            </span>
          </div>

          {upcomingApt ? (
            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-teal-50/50 rounded-xl border border-teal-100/70">
                <span className="text-[11px] font-bold text-[#167D78] uppercase block mb-1">{upcomingApt.appointmentType}</span>
                <h4 className="font-bold text-gray-900">{upcomingApt.doctorName}</h4>
                <p className="text-[11px] text-[#5A6B70]">{upcomingApt.providerName}</p>
                
                <div className="mt-3 pt-2 border-t border-teal-100 flex items-center justify-between text-[11px] font-medium text-gray-700">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" /> {upcomingApt.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-600" /> {upcomingApt.timeSlot}
                  </span>
                </div>
              </div>

              <Link
                to="/patient/appointments"
                className="w-full py-2 bg-[#123B46] hover:bg-[#0d2b33] text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Enter Video Meeting Room</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
              </Link>
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-gray-500">
              <Calendar className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p>No consultation scheduled yet.</p>
              <Link to="/patient/appointments" className="mt-2 text-[#167D78] font-bold block hover:underline">
                Request a slot with your surgeon
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Outstanding Checklist Tasks */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
        <h3 className="text-sm font-bold text-[#123B46] uppercase tracking-wider mb-4">
          Journey Checklist & Administrative Tasks
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-gray-900">Medical Record Upload Complete</h4>
              <p className="text-gray-500 text-[11px]">3 clinical documents secured with SHA-256 integrity check.</p>
            </div>
          </div>

          <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#167D78] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-[#123B46]">Review Surgical Quotes (Pending Decision)</h4>
              <p className="text-[#5A6B70] text-[11px]">Select between Apollo Hospital and Bumrungrad proposals.</p>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-gray-900">Virtual Pre-Op Consultation Booked</h4>
              <p className="text-gray-500 text-[11px]">Scheduled with Dr. Arvind Mehta on Oct 15th at 14:30 GMT.</p>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-3 opacity-70">
            <div className="w-4 h-4 rounded-full border border-gray-400 shrink-0 mt-0.5 text-center text-[10px] text-gray-400">4</div>
            <div>
              <h4 className="font-bold text-gray-700">Medical Visa & Fit-to-Fly Letter</h4>
              <p className="text-gray-500 text-[11px]">Unlocks automatically once quote selection is confirmed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

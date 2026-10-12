import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { useCurrency } from '../../components/shared/CurrencySelector';
import {
  BriefcaseMedical,
  FileText,
  Lock,
  ShieldCheck,
  FileSpreadsheet,
  ArrowRight,
  Eye,
  AlertCircle,
  CheckCircle2,
  Save,
  MessageSquare
} from 'lucide-react';

export const ProviderCaseDetailPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const { cases, sendMessage } = useCase();
  const { formatPrice } = useCurrency();

  const currentCase = cases.find((c) => c.id === caseId) || cases[0];

  const [internalNotes, setInternalNotes] = useState(
    'Reviewed 3D knee CT. Bone mineral density is adequate for uncemented Stryker Triathlon femoral and tibial components. Non-penicillin prophylactic antibiotic protocol cleared.'
  );
  const [internalNotesSaved, setInternalNotesSaved] = useState(false);
  const [requestInfoSent, setRequestInfoSent] = useState(false);

  const handleSaveInternalNote = () => {
    setInternalNotesSaved(true);
    setTimeout(() => setInternalNotesSaved(false), 2000);
  };

  const handleRequestInfo = () => {
    sendMessage({
      caseId: currentCase.id,
      senderId: 'usr-provider-1',
      senderName: 'Apollo International Care Desk',
      senderRole: 'provider',
      content: 'Dear patient, please upload a recent 12-lead ECG and complete metabolic blood panel so our anesthetic team can finalize surgical clearance.'
    });
    setRequestInfoSent(true);
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                Authorized Clinical Case Dossier
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-800">
                {currentCase.id}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B46] font-['Manrope']">
              {currentCase.treatmentTitle}
            </h1>
            <p className="text-xs text-[#5A6B70] mt-1">
              Patient: <strong>{currentCase.patientName}</strong> • {currentCase.patientCountry} • Target Budget: {formatPrice(currentCase.budgetPreferenceUSD)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRequestInfo}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition-colors"
            >
              {requestInfoSent ? '✓ Information Request Sent' : 'Request Additional Diagnostics'}
            </button>

            <Link
              to={`/provider/cases/${currentCase.id}/quotes/new`}
              className="px-5 py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4 text-teal-300" />
              <span>Draft Formal Proposal</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: Authorized Medical Records */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-7 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="text-sm font-bold text-[#123B46] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#167D78]" />
              <span>Authorized Patient Scans & Reports ({currentCase.medicalRecords.length})</span>
            </h2>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              HIPAA Compliant Access
            </span>
          </div>

          <div className="space-y-2.5">
            {currentCase.medicalRecords.map((rec) => (
              <div
                key={rec.id}
                className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="w-4 h-4 text-teal-700 shrink-0" />
                  <div className="overflow-hidden">
                    <span className="font-bold text-gray-900 block truncate">{rec.fileName}</span>
                    <span className="text-[10px] text-gray-500">{rec.category} • {rec.fileSize}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="px-3 py-1 bg-white hover:bg-teal-50 text-[#167D78] font-bold rounded-lg border border-gray-200 text-xs flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open Scans</span>
                </button>
              </div>
            ))}
          </div>

          {/* Clinical Parameters Extract */}
          <div className="pt-4 border-t border-gray-100 space-y-3 text-xs">
            <h3 className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">
              Patient-Confirmed Clinical Extraction
            </h3>
            <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100 text-gray-800 space-y-2">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">Diagnosis</span>
                <span className="font-bold text-gray-900">{currentCase.clinicalSummary.primaryDiagnosis}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Allergies</span>
                  <span className="font-bold text-rose-700">{currentCase.clinicalSummary.allergies.join(', ')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Urgency</span>
                  <span className="font-bold text-gray-900 capitalize">{currentCase.clinicalSummary.urgencyLevel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Confidential Internal Surgeon Notes */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-7 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="text-sm font-bold text-[#123B46] flex items-center gap-2">
              <BriefcaseMedical className="w-4 h-4 text-[#167D78]" />
              <span>Internal Hospital Clinical Notes</span>
            </h2>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">
              Confidential to Medical Staff
            </span>
          </div>

          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Security Protocol:</strong> Internal notes are strictly isolated and never visible to the patient. Use this space for surgical team sizing discussions, bed management, and implant stock planning.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Surgeon Operating Notes</label>
            <textarea
              rows={6}
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#167D78]"
              placeholder="Enter internal surgical evaluation..."
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-gray-500">
              {internalNotesSaved ? '✓ Saved successfully' : 'Last updated by Dr. Mehta'}
            </span>

            <button
              onClick={handleSaveInternalNote}
              className="px-4 py-2 bg-[#123B46] hover:bg-[#0d2b33] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Internal Notes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

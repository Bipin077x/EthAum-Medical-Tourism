import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { CaseTimeline } from '../../components/shared/CaseTimeline';
import { MedicalRecord, ExtractedClinicalData } from '../../types';
import {
  FileText,
  Sparkles,
  ShieldCheck,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Trash2,
  Edit3,
  Check,
  Eye,
  Lock,
  ArrowRight,
  X
} from 'lucide-react';

export const CaseDetailPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const {
    cases,
    uploadMedicalRecord,
    updateExtractedClinicalData,
    confirmExtractedData
  } = useCase();

  const currentCase = cases.find((c) => c.id === caseId) || cases[0];

  const [isEditingClinical, setIsEditingClinical] = useState(false);
  const [editedDiagnosis, setEditedDiagnosis] = useState(currentCase?.clinicalSummary.primaryDiagnosis || '');
  const [editedAllergies, setEditedAllergies] = useState(currentCase?.clinicalSummary.allergies.join(', ') || '');
  const [editedMedications, setEditedMedications] = useState(currentCase?.clinicalSummary.currentMedications.join(', ') || '');
  const [previewFile, setPreviewFile] = useState<MedicalRecord | null>(null);

  if (!currentCase) {
    return <div className="p-8 text-center text-gray-500">Case not found.</div>;
  }

  const handleSaveClinicalEdits = () => {
    updateExtractedClinicalData(currentCase.id, {
      primaryDiagnosis: editedDiagnosis,
      allergies: editedAllergies.split(',').map((s) => s.trim()).filter(Boolean),
      currentMedications: editedMedications.split(',').map((s) => s.trim()).filter(Boolean),
    });
    setIsEditingClinical(false);
  };

  const handleConfirmExtraction = () => {
    confirmExtractedData(currentCase.id);
  };

  const handleAddFile = async () => {
    const fileName = `Addendum_Radiology_Report_${Date.now().toString().slice(-4)}.pdf`;
    await uploadMedicalRecord(currentCase.id, {
      name: fileName,
      size: '3.4 MB',
      category: 'Lab Report'
    });
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Case Header */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[#167D78] uppercase tracking-wider">
                Medical Case Workspace
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-800">
                {currentCase.id}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B46] font-['Manrope']">
              {currentCase.treatmentTitle}
            </h1>
            <p className="text-xs text-[#5A6B70] mt-1">
              Patient: <strong>{currentCase.patientName}</strong> • Target Hubs: {currentCase.preferredDestination} • Budget: ${currentCase.budgetPreferenceUSD.toLocaleString()} USD
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={`/patient/cases/${currentCase.id}/matches`}
              className="px-4 py-2.5 bg-teal-50 hover:bg-teal-100 text-[#167D78] text-xs font-bold rounded-xl transition-all border border-teal-200 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Provider Matches</span>
            </Link>

            <Link
              to={`/patient/cases/${currentCase.id}/quotes`}
              className="px-4 py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>View Quotes</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <CaseTimeline currentStage={currentCase.currentStageNumber} status={currentCase.status} />
        </div>
      </div>

      {/* 2-Column Workspace: AI Clinical Extraction & Medical Document Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT COLUMN: Explainable AI Extraction Review (Mandated by Section 10 & P4) */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-teal-50 text-[#167D78] rounded-xl">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#123B46]">Clinical AI Record Extraction</h2>
                <p className="text-[11px] text-[#5A6B70]">Draft parsed from your uploaded diagnostic scans</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {currentCase.clinicalSummary.aiConfidenceScore}% AI Confidence
              </span>
              {!isEditingClinical && (
                <button
                  onClick={() => setIsEditingClinical(true)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-[#167D78] hover:bg-gray-100 transition-colors"
                  title="Correct extracted fields"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* AI Extraction Banner */}
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Human Oversight Required:</strong> Please verify the primary diagnosis and allergy alerts below. You may correct any draft extraction before hospital surgeons formulate formal quotes.
            </p>
          </div>

          {isEditingClinical ? (
            /* Editing Mode */
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Primary Diagnosis</label>
                <textarea
                  rows={2}
                  value={editedDiagnosis}
                  onChange={(e) => setEditedDiagnosis(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Known Drug Allergies</label>
                <input
                  type="text"
                  value={editedAllergies}
                  onChange={(e) => setEditedAllergies(e.target.value)}
                  placeholder="e.g. Penicillin, Sulfa drugs"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Current Medications</label>
                <input
                  type="text"
                  value={editedMedications}
                  onChange={(e) => setEditedMedications(e.target.value)}
                  placeholder="e.g. Amlodipine 5mg"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingClinical(false)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveClinicalEdits}
                  className="px-4 py-1.5 bg-[#167D78] text-white rounded-lg font-bold hover:bg-[#11625e]"
                >
                  Save Corrections
                </button>
              </div>
            </div>
          ) : (
            /* View Mode */
            <div className="space-y-3.5 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">Primary Diagnosis</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block leading-snug">
                  {currentCase.clinicalSummary.primaryDiagnosis}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Known Allergies</span>
                  <span className="font-semibold text-rose-700 mt-0.5 block">
                    {currentCase.clinicalSummary.allergies.join(', ') || 'None reported'}
                  </span>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Urgency Classification</span>
                  <span className="font-semibold text-gray-800 capitalize mt-0.5 block">
                    {currentCase.clinicalSummary.urgencyLevel}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">Current Active Medications</span>
                <span className="font-medium text-gray-800 mt-0.5 block">
                  {currentCase.clinicalSummary.currentMedications.join(', ')}
                </span>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">Extracted Clinical Notes</span>
                <p className="text-[#5A6B70] mt-1 text-[11px] leading-relaxed">
                  {currentCase.clinicalSummary.extractedNotes}
                </p>
              </div>
            </div>
          )}

          {/* Confirmation Action */}
          <div className="pt-2">
            {currentCase.clinicalSummary.patientConfirmed ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Clinical Extraction Verified & Locked by Patient</span>
                </span>
                <span className="text-[10px] text-emerald-700">Ready for Hospitals</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleConfirmExtraction}
                className="w-full py-2.5 bg-[#167D78] hover:bg-[#11625e] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Extracted Fields as Accurate</span>
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Medical Document Vault */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-teal-50 text-[#167D78] rounded-xl">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#123B46]">Private Record Vault</h2>
                <p className="text-[11px] text-[#5A6B70]">Authorized clinical files ({currentCase.medicalRecords.length})</p>
              </div>
            </div>

            <button
              onClick={handleAddFile}
              className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#167D78] rounded-lg text-xs font-bold border border-teal-200 flex items-center gap-1.5 transition-colors"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload New Scan</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {currentCase.medicalRecords.map((record) => (
              <div
                key={record.id}
                className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between text-xs hover:bg-gray-100/70 transition-colors"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="w-4 h-4 text-teal-700 shrink-0" />
                  <div className="overflow-hidden">
                    <span className="font-bold text-gray-900 block truncate max-w-xs">{record.fileName}</span>
                    <span className="text-[10px] text-gray-500">
                      {record.category} • {record.fileSize} • Uploaded {new Date(record.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Processed
                  </span>
                  <button
                    onClick={() => setPreviewFile(record)}
                    className="p-1 text-gray-500 hover:text-teal-700 rounded"
                    title="Preview document"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Missing Clinical Information Checklist */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Diagnostic Completeness Checklist
            </h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Weight-bearing MRI / Radiographs confirmed</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Primary Care Physician referral notes verified</span>
              </div>
              <div className="flex items-center gap-2 text-amber-700">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Routine pre-op cardiac clearance (Pending destination hospital)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{previewFile.fileName}</h3>
                  <p className="text-[11px] text-gray-500">Encrypted Medical Vault Preview • SHA-256 Verified</p>
                </div>
              </div>
              <button onClick={() => setPreviewFile(null)} className="p-1 text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-64 bg-gray-900 rounded-2xl flex flex-col items-center justify-center text-white text-center p-6 space-y-3">
              <FileCheck2 className="w-12 h-12 text-teal-400" />
              <div className="text-sm font-semibold">{previewFile.category} Scans Verified</div>
              <p className="text-xs text-gray-400 max-w-sm">
                Protected diagnostic preview container. Full DICOM slicing enabled on surgeon clinical workstation.
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setPreviewFile(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { useAuth } from '../../context/AuthContext';
import { mockTreatments } from '../../data/mockData';
import { TreatmentCategory, MedicalRecord } from '../../types';
import {
  FileText,
  User,
  MapPin,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lock,
  ShieldCheck,
  AlertCircle,
  FileCheck2,
  Trash2
} from 'lucide-react';

export const CaseWizardPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefillTreatment = searchParams.get('treatment') || 'total-knee-replacement';

  const { createCase, uploadMedicalRecord } = useCase();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    treatmentSlug: prefillTreatment,
    treatmentCategory: 'Orthopedics' as TreatmentCategory,
    patientName: currentUser?.name || 'Sarah Jenkins',
    patientEmail: currentUser?.email || 'sarah.jenkins@example.com',
    patientPhone: '+44 7700 900142',
    patientCountry: currentUser?.country || 'United Kingdom',
    symptomsDescription: 'Severe knee pain and stiffness lasting over 3 years. Pain worse upon weight-bearing and descending stairs. Refractory to steroid injections.',
    preferredDestination: 'Bangkok, Thailand or New Delhi, India',
    budgetPreferenceUSD: 8000,
    preferredLanguage: 'English',
    consentGiven: true,
  });

  // Uploaded files for this wizard step
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string; category: MedicalRecord['category']; status: string }>>([
    { name: 'Knee_WeightBearing_MRI_Scans.pdf', size: '12.4 MB', category: 'MRI/CT Scan', status: 'ready' },
    { name: 'Prior_Orthopedic_Specialist_Consultation.pdf', size: '2.1 MB', category: 'Physician Referral', status: 'ready' }
  ]);
  const [uploadCategory, setUploadCategory] = useState<MedicalRecord['category']>('MRI/CT Scan');
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);

  const selectedTreatmentObj = mockTreatments.find((t) => t.slug === formData.treatmentSlug) || mockTreatments[0];

  const handleTreatmentChange = (slug: string) => {
    const t = mockTreatments.find((item) => item.slug === slug);
    if (t) {
      setFormData((prev) => ({
        ...prev,
        treatmentSlug: slug,
        treatmentCategory: t.category
      }));
    }
  };

  const handleSimulateFileUpload = () => {
    setIsSimulatingUpload(true);
    setTimeout(() => {
      const mockName = `Diagnostic_Scan_Patient_${Date.now().toString().slice(-4)}.pdf`;
      setUploadedFiles((prev) => [
        ...prev,
        { name: mockName, size: '4.8 MB', category: uploadCategory, status: 'ready' }
      ]);
      setIsSimulatingUpload(false);
    }, 700);
  };

  const removeFile = (idx: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmitCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consentGiven) {
      alert('Please check the informed consent checkbox to proceed.');
      return;
    }

    const createdId = createCase({
      patientId: currentUser?.id || 'usr-patient-1',
      patientName: formData.patientName,
      patientEmail: formData.patientEmail,
      patientPhone: formData.patientPhone,
      patientCountry: formData.patientCountry,
      treatmentSlug: formData.treatmentSlug,
      treatmentTitle: selectedTreatmentObj.title,
      preferredDestination: formData.preferredDestination,
      budgetPreferenceUSD: Number(formData.budgetPreferenceUSD),
      preferredLanguage: formData.preferredLanguage,
    });

    // Upload files to the created case
    uploadedFiles.forEach((file) => {
      uploadMedicalRecord(createdId, {
        name: file.name,
        size: file.size,
        category: file.category
      });
    });

    // Navigate to the newly created case workspace
    navigate(`/patient/cases/${createdId}`);
  };

  return (
    <div className="min-h-screen bg-[#F5F8F7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Wizard Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-[#167D78] uppercase tracking-wider">
            Patient Intake Workflow
          </span>
          <h1 className="text-3xl font-extrabold text-[#123B46] font-['Manrope'] mt-1">
            Create a New Treatment Case
          </h1>
          <p className="text-xs text-[#5A6B70] mt-1">
            Step-by-step coordination to match with accredited hospitals and receive formal proposals.
          </p>
        </div>

        {/* 5-Step Stepper Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs mb-8">
          <div className="grid grid-cols-5 gap-1 sm:gap-2">
            {[
              { num: 1, label: 'Treatment' },
              { num: 2, label: 'Patient Info' },
              { num: 3, label: 'Preferences' },
              { num: 4, label: 'Record Vault' },
              { num: 5, label: 'Review & Submit' }
            ].map((step) => {
              const isPast = step.num < currentStep;
              const isCurrent = step.num === currentStep;

              return (
                <div
                  key={step.num}
                  className={`text-center py-2 px-1 rounded-xl transition-all ${
                    isCurrent
                      ? 'bg-[#123B46] text-white shadow-xs font-bold'
                      : isPast
                      ? 'bg-teal-50 text-[#167D78] font-semibold'
                      : 'text-gray-400 bg-gray-50'
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-wider block">Step {step.num}</div>
                  <div className="text-xs truncate">{step.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm">
          {/* STEP 1: Treatment & Specialty */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#123B46] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#167D78]" />
                  <span>Select Primary Procedure</span>
                </h3>
                <p className="text-xs text-[#5A6B70] mt-1">
                  Choose the planned surgical or therapeutic treatment from our verified catalogue.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Medical Procedure</label>
                <select
                  value={formData.treatmentSlug}
                  onChange={(e) => handleTreatmentChange(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#167D78]"
                >
                  {mockTreatments.map((t) => (
                    <option key={t.id} value={t.slug}>
                      {t.title} ({t.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Treatment Preview Card */}
              <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-200 text-xs">
                <span className="font-bold text-[#123B46] block text-sm mb-1">{selectedTreatmentObj.title}</span>
                <p className="text-[#5A6B70] mb-3 leading-relaxed">{selectedTreatmentObj.shortDescription}</p>
                <div className="flex items-center justify-between pt-2 border-t border-teal-100 text-[11px] font-semibold text-gray-700">
                  <span>Category: {selectedTreatmentObj.category}</span>
                  <span>Indicative Duration: {selectedTreatmentObj.averageDurationDays} Days</span>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2"
                >
                  <span>Continue to Patient Details</span>
                  <ArrowRight className="w-4 h-4 text-teal-300" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Patient Info & Symptoms */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#123B46] flex items-center gap-2">
                  <User className="w-5 h-5 text-[#167D78]" />
                  <span>Patient Clinical Information</span>
                </h3>
                <p className="text-xs text-[#5A6B70] mt-1">
                  Provide contact coordinates and a summary of your current symptoms or diagnosis.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Patient Full Name</label>
                  <input
                    type="text"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#167D78]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.patientEmail}
                    onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#167D78]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number (with Country Code)</label>
                  <input
                    type="text"
                    value={formData.patientPhone}
                    onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#167D78]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Country of Residence</label>
                  <input
                    type="text"
                    value={formData.patientCountry}
                    onChange={(e) => setFormData({ ...formData, patientCountry: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#167D78]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Symptoms & Clinical History (What brings you to seek care?)
                </label>
                <textarea
                  rows={4}
                  value={formData.symptomsDescription}
                  onChange={(e) => setFormData({ ...formData, symptomsDescription: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#167D78]"
                  placeholder="Describe your current diagnosis, prior treatments, or medications..."
                />
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-100 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2"
                >
                  <span>Continue to Preferences</span>
                  <ArrowRight className="w-4 h-4 text-teal-300" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Destination & Budget Preferences */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#123B46] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#167D78]" />
                  <span>Destination, Language & Budget</span>
                </h3>
                <p className="text-xs text-[#5A6B70] mt-1">
                  Define your travel comfort zone to optimize hospital matching.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Destination(s)</label>
                <select
                  value={formData.preferredDestination}
                  onChange={(e) => setFormData({ ...formData, preferredDestination: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#167D78]"
                >
                  <option value="Bangkok, Thailand or New Delhi, India">Bangkok, Thailand or New Delhi, India (Recommended for Orthopedics)</option>
                  <option value="Bangkok, Thailand">Bangkok, Thailand</option>
                  <option value="New Delhi & NCR, India">New Delhi & NCR, India</option>
                  <option value="Istanbul, Turkey">Istanbul, Turkey</option>
                  <option value="Barcelona, Spain">Barcelona, Spain</option>
                  <option value="Open to any verified international hub">Open to any verified international hub</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Estimated Target Budget (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-gray-400 font-bold">$</span>
                    <input
                      type="number"
                      step={500}
                      value={formData.budgetPreferenceUSD}
                      onChange={(e) => setFormData({ ...formData, budgetPreferenceUSD: Number(e.target.value) })}
                      className="w-full pl-7 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#167D78]"
                    />
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1 block">Indicative average is $5,200 - $8,500</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Language for Coordinator</label>
                  <select
                    value={formData.preferredLanguage}
                    onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#167D78]"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="Arabic">Arabic</option>
                    <option value="German">German</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-100 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2"
                >
                  <span>Continue to Medical Records</span>
                  <ArrowRight className="w-4 h-4 text-teal-300" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Medical Record Upload & Simulated AI Extraction */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#123B46] flex items-center gap-2">
                  <UploadCloud className="w-5 h-5 text-[#167D78]" />
                  <span>Private Medical Record Vault</span>
                </h3>
                <p className="text-xs text-[#5A6B70] mt-1">
                  Upload recent MRI scans, CT reports, lab work, or physician referrals. These are required for hospital surgeons to issue exact binding quotes.
                </p>
              </div>

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-teal-200 bg-teal-50/30 rounded-2xl p-6 text-center">
                <UploadCloud className="w-10 h-10 text-[#167D78] mx-auto mb-2" />
                <h4 className="text-xs font-bold text-gray-900">Drag & Drop Diagnostic Records Here</h4>
                <p className="text-[11px] text-gray-500 mt-1 mb-4">
                  Supports PDF, DICOM, JPEG, PNG (Maximum 50MB per file)
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as any)}
                    className="p-2 bg-white border border-gray-200 rounded-lg text-xs"
                  >
                    <option value="MRI/CT Scan">MRI / CT Scan</option>
                    <option value="Physician Referral">Physician Referral</option>
                    <option value="Lab Report">Blood / Lab Report</option>
                    <option value="Prescription">Prescription</option>
                  </select>

                  <button
                    type="button"
                    disabled={isSimulatingUpload}
                    onClick={handleSimulateFileUpload}
                    className="px-4 py-2 bg-[#167D78] hover:bg-[#11625e] text-white text-xs font-bold rounded-lg transition-all shadow-xs flex items-center gap-1.5"
                  >
                    {isSimulatingUpload ? (
                      <>
                        <Sparkles className="w-3.5 h-3.5 animate-spin" />
                        <span>Encrypting & Scanning File...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Add Diagnostic File</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Uploaded File List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-700 block">Secured Files in Vault ({uploadedFiles.length})</span>
                {uploadedFiles.map((file, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold text-gray-900 block truncate max-w-xs">{file.name}</span>
                        <span className="text-[10px] text-gray-500">{file.category} • {file.size}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="text-gray-400 hover:text-red-600 p-1 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-100 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="px-6 py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2"
                >
                  <span>Review & Consent</span>
                  <ArrowRight className="w-4 h-4 text-teal-300" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Review, Informed Consent & Submit */}
          {currentStep === 5 && (
            <form onSubmit={handleSubmitCase} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#123B46] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#167D78]" />
                  <span>Review Intake & Consent Disclosures</span>
                </h3>
                <p className="text-xs text-[#5A6B70] mt-1">
                  Verify your case parameters before submitting to the hospital matching protocol.
                </p>
              </div>

              {/* Summary Review Card */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase">Procedure</span>
                    <span className="font-bold text-gray-900">{selectedTreatmentObj.title}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase">Target Budget</span>
                    <span className="font-bold text-[#123B46]">${formData.budgetPreferenceUSD.toLocaleString()} USD</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase">Patient</span>
                    <span className="font-medium text-gray-800">{formData.patientName} ({formData.patientCountry})</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase">Destinations</span>
                    <span className="font-medium text-gray-800">{formData.preferredDestination}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <span className="text-gray-400 block text-[10px] uppercase">Attached Clinical Files</span>
                  <span className="font-semibold text-emerald-700">{uploadedFiles.length} Diagnostic Files Ready</span>
                </div>
              </div>

              {/* Informed Consent Checkboxes (Mandated by Section 1.2 & 9) */}
              <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="consent1"
                    checked={formData.consentGiven}
                    onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                    className="mt-0.5 rounded text-[#167D78] focus:ring-[#167D78]"
                  />
                  <label htmlFor="consent1" className="text-gray-800 cursor-pointer">
                    <strong>Medical Record & Authorization Consent:</strong> I authorize EthAum to transmit my uploaded diagnostic records securely to accredited partner hospitals for clinical qualification and surgical quote generation.
                  </label>
                </div>

                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="consent2"
                    defaultChecked
                    className="mt-0.5 rounded text-[#167D78] focus:ring-[#167D78]"
                  />
                  <label htmlFor="consent2" className="text-gray-800 cursor-pointer">
                    <strong>AI Clinical Assistant Disclosure:</strong> I understand that automated summaries generated from my records are draft extractions subject to patient review and human clinician verification.
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-100 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <button
                  type="submit"
                  className="px-7 py-3 bg-[#123B46] hover:bg-[#0d2b33] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Submit Case & Generate Hospital Matches</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

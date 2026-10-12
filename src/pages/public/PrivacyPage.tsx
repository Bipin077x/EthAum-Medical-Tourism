import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileCheck } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F8F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#167D78] uppercase tracking-wider mb-2">
          <Lock className="w-4 h-4" />
          <span>Patient Health Information Privacy (HIPAA / GDPR)</span>
        </div>
        <h1 className="text-3xl font-bold text-[#123B46] font-['Manrope'] mb-6">
          Medical Data Privacy Notice & Consent Policy
        </h1>
        <p className="text-xs text-gray-500 mb-8">Effective Date: October 2026</p>

        <div className="prose prose-sm text-gray-700 max-w-none space-y-6 text-xs leading-relaxed">
          <section className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200">
            <h3 className="text-sm font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Core Privacy Commitment</span>
            </h3>
            <p className="text-emerald-900">
              Your sensitive medical records, radiologic DICOM/MRI images, and personal identifiers are stored in an encrypted medical vault. Under no circumstances are patient diagnostic records sold, monetized, or shared with third-party advertisers.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold text-[#123B46] mb-1">1. Explicit Hospital Authorization</h3>
            <p className="text-[#5A6B70]">
              When you submit a case or upload clinical documents, you explicitly specify which hospital departments are authorized to inspect the records for the purpose of formulating surgical treatment quotes. You can revoke access or delete documents at any time from your patient dashboard.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold text-[#123B46] mb-1">2. Explainable AI Extraction Oversight</h3>
            <p className="text-[#5A6B70]">
              EthAum employs automated document parsing to assist in extracting primary diagnosis, medication lists, and surgical history from uploaded clinical summaries. AI outputs are labeled clearly as draft extractions and require explicit patient review and confirmation before becoming part of the active case profile.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold text-[#123B46] mb-1">3. Administrative Access Controls</h3>
            <p className="text-[#5A6B70]">
              In accordance with Section 1.2 of the EthAum architectural standard, platform administrators do not have unrestricted or automatic access to private patient medical imaging unless specific technical support is requested by the patient.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

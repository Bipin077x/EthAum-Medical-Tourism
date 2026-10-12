import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, AlertCircle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F8F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#167D78] uppercase tracking-wider mb-2">
          <FileText className="w-4 h-4" />
          <span>Legal Framework & Patient Rights</span>
        </div>
        <h1 className="text-3xl font-bold text-[#123B46] font-['Manrope'] mb-6">
          Terms of Service & Clinical Disclosures
        </h1>
        <p className="text-xs text-gray-500 mb-8">Effective Date: October 2026 • Version 1.2</p>

        <div className="prose prose-sm text-gray-700 max-w-none space-y-6 text-xs leading-relaxed">
          <section className="p-4 bg-teal-50/60 rounded-2xl border border-teal-200">
            <h3 className="text-sm font-bold text-[#123B46] mb-1">1. Nature of Platform & Non-Clinical Status</h3>
            <p className="text-[#5A6B70]">
              EthAum operates as a technology coordination infrastructure and international marketplace connecting patients with certified healthcare institutions. EthAum does not practice medicine, establish clinician-patient relationships, provide medical diagnoses, or perform healthcare procedures. All medical evaluations and clinical treatments are conducted exclusively by independent, licensed medical practitioners.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold text-[#123B46] mb-1">2. Price Quotes & Diagnostic Review Limitations</h3>
            <p className="text-[#5A6B70]">
              Indicative prices displayed on public catalogues represent standard benchmark packages. Formal itemized proposals submitted by hospital providers through EthAum are binding based on the diagnostic scans and clinical records submitted by the patient. If upon in-person pre-operative evaluation the operating surgeon identifies significant unstated anatomical or systemic comorbidities, the hospital must provide written notification of revised estimates prior to administering treatment.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold text-[#123B46] mb-1">3. Travel Safety & Fit-to-Fly Obligations</h3>
            <p className="text-[#5A6B70]">
              International air travel entails physiological risks, notably including venous thromboembolism and surgical wound dehiscence. Patients agree to strictly abide by the surgeon's minimum recommended post-operative local stay period in the destination prior to embarking on long-haul commercial flights.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold text-[#123B46] mb-1">4. Cancellation & Dispute Resolution</h3>
            <p className="text-[#5A6B70]">
              Deposits for scheduled surgeries can be fully refunded or rescheduled up to 14 days prior to the confirmed procedure date, less any non-refundable hospital registration or visa invitation issuance fees.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

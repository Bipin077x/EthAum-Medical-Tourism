import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockProviders, mockTreatments } from '../../data/mockData';
import {
  ShieldCheck,
  Building2,
  FileCheck2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Database,
  Lock,
  UserCheck
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();

  const [verificationQueue, setVerificationQueue] = useState([
    {
      id: 'app-901',
      hospitalName: 'Bangkok Joint & Spine Reconstruction Institute',
      country: 'Thailand',
      accreditationClaimed: 'JCI (Joint Commission International) - 7th Edition',
      certificateNumber: 'JCI-THA-2026-8819',
      submittedDate: '2026-10-10',
      status: 'pending_review'
    },
    {
      id: 'app-902',
      hospitalName: 'Memorial Sisli IVF & Genomic Research Center',
      country: 'Turkey',
      accreditationClaimed: 'ESHRE & ISO 15189 Medical Genetics Lab',
      certificateNumber: 'ISO-TUR-15189-994',
      submittedDate: '2026-10-11',
      status: 'pending_review'
    }
  ]);

  const handleApprove = (id: string) => {
    setVerificationQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'approved' } : item))
    );
  };

  const handleReject = (id: string) => {
    setVerificationQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'rejected' } : item))
    );
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            Governance & Quality Oversight
          </span>
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
            Compliance Level 3
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B46] font-['Manrope'] mt-0.5">
          Platform Governance & Verification Console
        </h1>
        <p className="text-xs text-[#5A6B70] mt-1">
          Administrator: <strong>{currentUser?.name || 'Elena Vance'}</strong> • Auditing provider credentials, catalogue integrity, and access controls.
        </p>
      </div>

      {/* Permission Boundary Notice (Mandated by Section 1.2 & 20) */}
      <div className="bg-[#123B46] text-white rounded-2xl p-5 shadow-xs flex items-start gap-3.5 text-xs">
        <Lock className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="block text-teal-200 font-bold mb-0.5">Architectural Privacy Boundary:</strong>
          In accordance with Section 1.2 of the EthAum Security Specification, platform administrators do not have automated or unrestricted access to private patient medical imaging. Administrative jurisdiction is restricted to hospital credential verification, catalogue benchmarking, and compliance reporting.
        </div>
      </div>

      {/* Verification Queue Section */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-[#123B46] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#167D78]" />
              <span>Hospital Credential Verification Queue</span>
            </h2>
            <p className="text-xs text-[#5A6B70]">Audit JCI / ISO / Ministry of Health certificate submissions</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-teal-50 text-[#167D78] rounded-full border border-teal-200">
            {verificationQueue.filter((q) => q.status === 'pending_review').length} Awaiting Verification
          </span>
        </div>

        <div className="space-y-4">
          {verificationQueue.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-sm">{item.hospitalName}</span>
                  <span className="text-gray-500">• {item.country}</span>
                </div>
                <div className="text-teal-800 font-semibold">
                  Accreditation: {item.accreditationClaimed} (Registry Reg #{item.certificateNumber})
                </div>
                <div className="text-gray-500 text-[11px]">
                  Submitted for audit on {item.submittedDate}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.status === 'approved' ? (
                  <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 font-bold rounded-xl flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Approved & Listed
                  </span>
                ) : item.status === 'rejected' ? (
                  <span className="px-3 py-1.5 bg-red-100 text-red-800 font-bold rounded-xl flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Audit Rejected
                  </span>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleReject(item.id)}
                      className="px-4 py-2 border border-gray-200 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl"
                    >
                      Request Audit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApprove(item.id)}
                      className="px-4 py-2 bg-[#123B46] hover:bg-[#0d2b33] text-white font-bold rounded-xl shadow-xs"
                    >
                      Verify & Approve
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Audit Log */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-[#123B46] uppercase tracking-wider">
          Recent Governance Audit Events
        </h3>
        <div className="divide-y divide-gray-100 text-xs">
          <div className="py-2.5 flex items-center justify-between text-gray-700">
            <span>Hospital Apollo Gleneagles: Joint Reconstruction Mako Package published</span>
            <span className="text-gray-400 font-mono text-[11px]">2026-10-12 14:15:02</span>
          </div>
          <div className="py-2.5 flex items-center justify-between text-gray-700">
            <span>Patient Case #case-eth-9021: Signed Informed Consent v1.2 recorded</span>
            <span className="text-gray-400 font-mono text-[11px]">2026-10-12 11:22:18</span>
          </div>
          <div className="py-2.5 flex items-center justify-between text-gray-700">
            <span>Diagnostic Vault: SHA-256 checksum verified for Right_Knee_MRI_WeightBearing.pdf</span>
            <span className="text-gray-400 font-mono text-[11px]">2026-10-12 09:12:44</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { useCurrency } from '../../components/shared/CurrencySelector';
import { Inbox, Search, Filter, ArrowRight, ShieldCheck, Clock, FileCheck2 } from 'lucide-react';

export const ProviderLeadsPage: React.FC = () => {
  const { cases } = useCase();
  const { formatPrice } = useCurrency();
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredCases = cases.filter((c) => {
    if (filterStatus === 'All') return true;
    return c.status === filterStatus;
  });

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            Patient Inquiry Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B46] font-['Manrope'] mt-0.5">
            Incoming Lead Inbox
          </h1>
          <p className="text-xs text-[#5A6B70] mt-1">
            Review authorized patient cases, inspect diagnostic scans, and formulate binding proposals.
          </p>
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#167D78] self-start"
        >
          <option value="All">All Inquiries ({cases.length})</option>
          <option value="submitted">New Intake (Pending Review)</option>
          <option value="quotes_received">Quotes Formulated</option>
          <option value="provider_selected">Hospital Selected</option>
        </select>
      </div>

      {/* Case Table / Cards */}
      <div className="space-y-4">
        {filteredCases.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-3xl border border-gray-200 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#167D78]">{c.id}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200">
                  {c.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-gray-500">
                  Submitted: {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#123B46]">{c.treatmentTitle}</h3>
                <p className="text-xs text-gray-700 font-medium mt-0.5">
                  Patient: {c.patientName} • {c.patientCountry} ({c.patientEmail})
                </p>
              </div>

              <p className="text-xs text-[#5A6B70] line-clamp-2">
                Diagnosis: {c.clinicalSummary.primaryDiagnosis}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 pt-1">
                <span>Budget: <strong>{formatPrice(c.budgetPreferenceUSD)}</strong></span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {c.medicalRecords.length} Verified Records Authorized
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
              <Link
                to={`/provider/cases/${c.id}`}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#123B46] font-bold rounded-xl text-xs text-center transition-colors"
              >
                Inspect Records & Notes
              </Link>
              <Link
                to={`/provider/cases/${c.id}/quotes/new`}
                className="px-5 py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white font-bold rounded-xl text-xs text-center transition-colors shadow-2xs flex items-center justify-center gap-1.5"
              >
                <span>Draft Structured Quote</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

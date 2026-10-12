import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { useCurrency, CurrencySelector } from '../../components/shared/CurrencySelector';
import { Quote } from '../../types';
import {
  Receipt,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Building2,
  Check
} from 'lucide-react';

export const QuoteComparisonPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const { cases, quotes, acceptQuote } = useCase();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const currentCase = cases.find((c) => c.id === caseId) || cases[0];
  const caseQuotes = quotes.filter((q) => q.caseId === currentCase?.id);

  const [expandedQuoteId, setExpandedQuoteId] = useState<string | null>(null);
  const [selectedQuoteForAccept, setSelectedQuoteForAccept] = useState<Quote | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleOpenConfirm = (quote: Quote) => {
    setSelectedQuoteForAccept(quote);
    setShowConfirmModal(true);
  };

  const handleConfirmAccept = () => {
    if (selectedQuoteForAccept) {
      acceptQuote(selectedQuoteForAccept.id);
      setShowConfirmModal(false);
      navigate('/patient/appointments');
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#167D78] uppercase tracking-wider">
              Transparent Quote Comparison
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-800">
              {currentCase.id}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B46] font-['Manrope']">
            Compare Itemized Surgical Proposals
          </h1>
          <p className="text-xs text-[#5A6B70] mt-1 max-w-2xl">
            Normalized line items, verified implant manufacturers, and clear inclusions/exclusions.
          </p>
        </div>

        <CurrencySelector />
      </div>

      {/* Mandatory Price Transparency Disclaimer (Section 12) */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="block text-amber-950 font-bold mb-0.5">Price & Clinical Disclosure:</strong>
          Selecting a hospital proposal initiates booking coordination and locks your package pricing based on reviewed records. Formal in-person physical clearance will be completed by the hospital surgeon upon arrival. Unstated severe clinical comorbidities requiring extended ICU care are subject to explicit exclusions.
        </div>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {caseQuotes.map((quote) => {
          const isAccepted = quote.status === 'accepted';

          return (
            <div
              key={quote.id}
              className={`bg-white rounded-3xl border transition-all flex flex-col justify-between overflow-hidden shadow-2xs ${
                isAccepted
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'border-gray-200 hover:shadow-lg hover:border-teal-300'
              }`}
            >
              <div className="p-6 sm:p-8">
                {/* Provider Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100 mb-6">
                  <div>
                    <span className="text-[10px] font-bold text-[#167D78] uppercase tracking-wider block mb-1">
                      {quote.providerCountry} Verified Center
                    </span>
                    <h2 className="text-xl font-bold text-[#123B46] leading-snug">
                      {quote.providerName}
                    </h2>
                    <p className="text-xs text-[#5A6B70] mt-1">Lead Surgeon: <strong>{quote.leadSurgeon}</strong></p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-gray-400 uppercase font-semibold block">Total Package</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#123B46] font-['Manrope']">
                      {formatPrice(quote.totalAmountUSD)}
                    </div>
                    <span className="text-[10px] text-gray-500">Proposal #{quote.id} (v{quote.version})</span>
                  </div>
                </div>

                {/* Stay duration */}
                <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100 flex items-center justify-between text-xs text-gray-700 mb-6">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>Hospital Stay: <strong>{quote.estimatedStayDaysHospital} Nights Deluxe Suite</strong></span>
                  </span>
                  <span>Hotel Stay: <strong>{quote.estimatedStayDaysHotel} Nights</strong></span>
                </div>

                {/* Itemized Line Items */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-xs font-bold text-[#123B46] uppercase tracking-wider">
                    Itemized Cost Breakdown
                  </h3>
                  <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden text-xs">
                    {quote.lineItems.map((item) => (
                      <div key={item.id} className="p-3 bg-gray-50/60 flex items-center justify-between">
                        <div className="pr-4">
                          <span className="font-semibold text-gray-800 block">{item.description}</span>
                          <span className="text-[10px] text-gray-500 capitalize">{item.category}</span>
                        </div>
                        <span className="font-bold text-[#123B46] shrink-0">
                          {formatPrice(item.amountUSD)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inclusions */}
                <div className="space-y-2 mb-4">
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Included in this Package</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-700">
                    {quote.inclusions.map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-gray-400" />
                    <span>Excluded / Optional Extras</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-500">
                    {quote.exclusions.map((exc, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-gray-400">•</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Notes from Chief Surgeon */}
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700">
                  <span className="font-bold text-gray-900 block text-[11px] mb-0.5">Surgeon Evaluation Note:</span>
                  <p className="italic text-[#5A6B70] text-[11px]">{quote.notes}</p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">
                  Valid until: <strong>{quote.validUntil}</strong>
                </span>

                {isAccepted ? (
                  <div className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs">
                    <Check className="w-4 h-4" />
                    <span>Selected Hospital Provider</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleOpenConfirm(quote)}
                    className="px-5 py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center gap-2"
                  >
                    <span>Accept Proposal & Select Hospital</span>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedQuoteForAccept && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-teal-50 text-[#167D78] rounded-2xl">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#123B46]">Confirm Hospital Selection</h3>
                <p className="text-xs text-gray-500">Proposal #{selectedQuoteForAccept.id}</p>
              </div>
            </div>

            <p className="text-xs text-[#5A6B70] leading-relaxed mb-4">
              You are selecting <strong>{selectedQuoteForAccept.providerName}</strong> ({formatPrice(selectedQuoteForAccept.totalAmountUSD)}) as your primary healthcare provider. 
              This will notify Dr. Arvind Mehta's coordination desk and unlock your Medical Visa letter and pre-op video consultation slot.
            </p>

            <div className="p-3.5 bg-teal-50/70 border border-teal-200 rounded-xl text-xs text-teal-900 mb-6 space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Price commitment locked based on uploaded scans</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Fast-track tele-consultation booked in next step</span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-xl"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={handleConfirmAccept}
                className="px-5 py-2 bg-[#123B46] hover:bg-[#0d2b33] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Confirm & Proceed to Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

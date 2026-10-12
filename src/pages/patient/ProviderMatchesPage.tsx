import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { useCurrency } from '../../components/shared/CurrencySelector';
import { VerificationBadge } from '../../components/shared/VerificationBadge';
import {
  Sparkles,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  MapPin,
  Star,
  ArrowRight,
  Info
} from 'lucide-react';

export const ProviderMatchesPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const { cases, getMatchesForCase } = useCase();
  const { formatPrice } = useCurrency();

  const currentCase = cases.find((c) => c.id === caseId) || cases[0];
  const matches = getMatchesForCase(currentCase?.id || '');

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#167D78] uppercase tracking-wider">
              Explainable AI Matching
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-800">
              {currentCase.id}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B46] font-['Manrope']">
            Accredited Hospital Recommendations
          </h1>
          <p className="text-xs text-[#5A6B70] mt-1 max-w-2xl">
            Ranked based on annual surgical procedure volume in <strong>{currentCase.treatmentTitle}</strong>, JCI credentials, and budget fit.
          </p>
        </div>

        <Link
          to={`/patient/cases/${currentCase.id}/quotes`}
          className="px-4 py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 self-start"
        >
          <span>Compare Quotes</span>
          <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
        </Link>
      </div>

      {/* Mandatory Match Explanation Box (as required by Section 11) */}
      <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-4 text-xs text-teal-900 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#167D78] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="block text-teal-950 font-bold mb-0.5">Understanding Match Scores:</strong>
          Match percentages measure facility surgical volume, board accreditation standing, and alignment with your intake preferences. They do not represent automated medical advice or guaranteed clinical outcomes. Every hospital's lead surgeon evaluates your diagnostic imaging independently.
        </div>
      </div>

      {/* Matches Grid */}
      <div className="space-y-6">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-2xs hover:shadow-md transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex-1">
                {/* Header Row */}
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{match.matchScore}% Match Index</span>
                  </span>
                  <VerificationBadge label={match.provider.accreditations[0]} source={match.provider.verifiedSource} />
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                    <span>{match.provider.rating} ({match.provider.reviewCount} Reviews)</span>
                  </span>
                </div>

                <h2 className="text-xl font-bold text-[#123B46]">
                  <Link to={`/providers/${match.provider.slug}`} className="hover:text-[#167D78]">
                    {match.provider.name}
                  </Link>
                </h2>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{match.provider.city}, {match.provider.country}</span>
                </p>

                {/* Lead Surgeon info */}
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3 mb-4 max-w-xl">
                  <img
                    src={match.provider.leadClinician.avatar}
                    alt={match.provider.leadClinician.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{match.provider.leadClinician.name}</h4>
                    <p className="text-[11px] text-[#5A6B70]">{match.provider.leadClinician.title}</p>
                  </div>
                </div>

                {/* Explainable Match Reasons */}
                <div className="space-y-2 mb-4">
                  <span className="text-xs font-bold text-[#123B46] block uppercase tracking-wider">
                    Why this hospital was matched:
                  </span>
                  {match.matchReasons.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>

                {/* Explicit Caveat */}
                {match.matchCaveats.length > 0 && (
                  <div className="p-3 bg-amber-50/60 border border-amber-200/70 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Travel & Recovery Caveat:</strong>
                      <span>{match.matchCaveats[0]}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Price & Action Panel */}
              <div className="w-full lg:w-64 bg-gray-50 p-5 rounded-2xl border border-gray-200 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] text-gray-500 uppercase font-semibold block">Indicative Package</span>
                  <div className="text-2xl font-extrabold text-[#123B46] mt-0.5">
                    {formatPrice(match.indicativePackageUSD)}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    All-inclusive surgery, implants & hospital stay
                  </span>
                </div>

                <div className="mt-6 space-y-2">
                  <Link
                    to={`/patient/cases/${currentCase.id}/quotes`}
                    className="w-full py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white text-xs font-bold rounded-xl text-center block shadow-xs transition-colors"
                  >
                    Review Itemized Quote
                  </Link>
                  <Link
                    to={`/providers/${match.provider.slug}`}
                    className="w-full py-2 bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl text-center block border border-gray-200 transition-colors"
                  >
                    View Hospital Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

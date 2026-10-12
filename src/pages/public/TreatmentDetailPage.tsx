import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockTreatments, mockProviders } from '../../data/mockData';
import { useCurrency, CurrencySelector } from '../../components/shared/CurrencySelector';
import { VerificationBadge } from '../../components/shared/VerificationBadge';
import {
  ShieldCheck,
  Clock,
  HeartPulse,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  MapPin,
  Building2,
  Calendar
} from 'lucide-react';

export const TreatmentDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const treatment = mockTreatments.find((t) => t.slug === slug) || mockTreatments[0];

  const matchedProviders = mockProviders.filter((p) =>
    p.specialties.includes(treatment.category)
  );

  return (
    <div className="min-h-screen bg-[#F5F8F7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#167D78]">Home</Link>
          <span>/</span>
          <Link to="/treatments" className="hover:text-[#167D78]">Treatments</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{treatment.title}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl border border-[#E2E8E7] p-6 sm:p-10 shadow-xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-[#167D78] border border-teal-200">
                  {treatment.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {treatment.successRatePercentage}% Success Rate Benchmark
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123B46] font-['Manrope'] leading-tight">
                {treatment.title}
              </h1>

              <p className="mt-4 text-sm text-[#5A6B70] leading-relaxed max-w-3xl">
                {treatment.fullDescription}
              </p>

              {/* Quick specs pill row */}
              <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>Stay: <strong>{treatment.averageDurationDays} days in destination</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-teal-600" />
                  <span>Recovery: <strong>~{treatment.recoveryDays} days rehabilitation</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>Hubs: <strong>{treatment.popularDestinations.join(', ')}</strong></span>
                </div>
              </div>
            </div>

            {/* Price & Action Card */}
            <div className="w-full lg:w-80 bg-[#F5F8F7] p-6 rounded-2xl border border-teal-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 font-medium">Indicative Surgical Package</span>
                  <CurrencySelector compact />
                </div>
                <div className="text-2xl font-extrabold text-[#123B46]">
                  {formatPrice(treatment.indicativeCostUSD.min)} – {formatPrice(treatment.indicativeCostUSD.max)}
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  *Standard package includes hospital stay, surgeon fee, and implants. Final quote subject to MRI review.
                </p>

                <div className="mt-4 space-y-1.5 text-xs text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Robotic or Endoscopic surgical suites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>English-speaking care coordinators</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>6 Months post-travel tele-followup</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to={`/patient/cases/new?treatment=${encodeURIComponent(treatment.slug)}`}
                  className="w-full py-3 bg-[#123B46] hover:bg-[#0d2b33] text-white font-bold rounded-xl text-xs text-center block shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Start Enquiry for this Treatment</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
                </Link>
                <p className="text-[10px] text-center text-gray-500 mt-2">
                  100% Free • No commitment • Private record vault
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Content: Inclusions, Risks, FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main 2-column info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Standard Inclusions */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8E7]">
              <h3 className="text-lg font-bold text-[#123B46] mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#167D78]" />
                <span>Standard Package Inclusions</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {treatment.keyInclusions.map((inc, i) => (
                  <div key={i} className="p-3 bg-teal-50/50 rounded-xl border border-teal-100/60 text-xs text-gray-800 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#167D78] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Risks & Travel Considerations */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8E7]">
              <h3 className="text-lg font-bold text-[#123B46] mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Clinical Risks & Travel Safety Considerations</span>
              </h3>
              <p className="text-xs text-[#5A6B70] mb-4">
                International medical travel requires strict pre-travel and post-op protocol to prevent deep vein thrombosis (DVT) and ensure optimal tissue healing.
              </p>
              <div className="space-y-2.5">
                {treatment.risksAndConsiderations.map((risk, idx) => (
                  <div key={idx} className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>{risk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment FAQs */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8E7]">
              <h3 className="text-lg font-bold text-[#123B46] mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#167D78]" />
                <span>Questions Patients Ask About This Procedure</span>
              </h3>
              <div className="space-y-4">
                {treatment.faqs.map((faq, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="text-xs font-bold text-gray-900">{faq.question}</h4>
                    <p className="text-xs text-[#5A6B70] mt-1.5 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Participating Accredited Hospitals */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8E7]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#123B46] uppercase tracking-wider">
                  Accredited Centers
                </h3>
                <span className="text-[11px] font-semibold text-[#167D78]">
                  {matchedProviders.length} Verified
                </span>
              </div>

              <div className="space-y-4">
                {matchedProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className="p-4 rounded-xl border border-gray-200 hover:border-teal-300 transition-all bg-white"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-xs text-[#123B46]">
                        <Link to={`/providers/${provider.slug}`} className="hover:text-[#167D78]">
                          {provider.name}
                        </Link>
                      </h4>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded shrink-0">
                        ★ {provider.rating}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#5A6B70] mb-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>{provider.city}, {provider.country}</span>
                    </p>

                    <div className="mb-3">
                      <VerificationBadge label={provider.accreditations[0]} size="sm" />
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-[#123B46]">
                        {formatPrice(provider.estimatedCostRangeUSD.min)} est.
                      </span>
                      <Link
                        to={`/providers/${provider.slug}`}
                        className="text-[11px] font-semibold text-[#167D78] hover:underline"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Assistance Card */}
            <div className="bg-[#123B46] text-white p-6 rounded-2xl shadow-xs">
              <h4 className="font-bold text-sm mb-2 font-['Manrope']">Need Visa or Travel Advice?</h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Our patient coordination desk provides free medical visa letter guidance and companion travel support.
              </p>
              <Link
                to="/help"
                className="text-xs font-semibold text-teal-300 hover:text-teal-200 flex items-center gap-1"
              >
                <span>Read Medical Travel Guide</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

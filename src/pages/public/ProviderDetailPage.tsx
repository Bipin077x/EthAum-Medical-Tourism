import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProviders } from '../../data/mockData';
import { useCurrency, CurrencySelector } from '../../components/shared/CurrencySelector';
import { VerificationBadge } from '../../components/shared/VerificationBadge';
import {
  MapPin,
  Building2,
  Star,
  ShieldCheck,
  Award,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Globe,
  Languages
} from 'lucide-react';

export const ProviderDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { formatPrice } = useCurrency();

  const provider = mockProviders.find((p) => p.slug === slug) || mockProviders[0];

  return (
    <div className="min-h-screen bg-[#F5F8F7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#167D78]">Home</Link>
          <span>/</span>
          <Link to="/providers" className="hover:text-[#167D78]">Hospitals</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{provider.name}</span>
        </div>

        {/* Hospital Header Banner */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {provider.accreditations.map((acc, i) => (
                  <VerificationBadge key={i} label={acc} source={provider.verifiedSource} />
                ))}
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{provider.rating} Rating ({provider.reviewCount} International Patients)</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123B46] font-['Manrope']">
                {provider.name}
              </h1>

              <p className="mt-2 text-xs text-gray-600 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>{provider.address}</span>
              </p>

              <div className="mt-3 p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs text-emerald-900 max-w-2xl flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Verified Credential Source:</strong>
                  <span>{provider.verifiedSource}</span>
                </div>
              </div>

              <p className="mt-5 text-sm text-[#5A6B70] leading-relaxed max-w-3xl">
                {provider.about}
              </p>
            </div>

            {/* Price & Action Card */}
            <div className="w-full lg:w-80 bg-[#F5F8F7] p-6 rounded-2xl border border-teal-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 font-medium">Indicative Package Tier</span>
                  <CurrencySelector compact />
                </div>
                <div className="text-2xl font-extrabold text-[#123B46]">
                  {formatPrice(provider.estimatedCostRangeUSD.min)} – {formatPrice(provider.estimatedCostRangeUSD.max)}
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  *Varies by surgical complexity, room tier & implant brand.
                </p>

                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-xs text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Free Pre-Op Record Review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Medical Visa Invitation in 48h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Airport Concierge & Companion Suite</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/patient/cases/new"
                  className="w-full py-3 bg-[#123B46] hover:bg-[#0d2b33] text-white font-bold rounded-xl text-xs text-center block shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Request a Case Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
                </Link>
                <p className="text-[10px] text-center text-gray-500 mt-2">
                  Records encrypted & shared only with medical staff
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Clinician Spotlight */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 mb-8 shadow-2xs">
          <h2 className="text-xl font-bold text-[#123B46] mb-6 flex items-center gap-2 font-['Manrope']">
            <Award className="w-5 h-5 text-[#167D78]" />
            <span>Lead Surgical Clinician & Chief of Department</span>
          </h2>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src={provider.leadClinician.avatar}
              alt={provider.leadClinician.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-2 ring-teal-600/30 shadow-md"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">{provider.leadClinician.name}</h3>
              <p className="text-sm text-[#167D78] font-semibold mt-0.5">{provider.leadClinician.title}</p>
              <p className="text-xs text-gray-500 mt-1">Specialty: {provider.leadClinician.specialty}</p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                  <span className="text-gray-400 block text-[11px]">Academic Qualifications & Fellowships</span>
                  <span className="font-semibold text-gray-900">{provider.leadClinician.education}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Experience & Languages</span>
                  <span className="font-semibold text-gray-900">{provider.leadClinician.experienceYears} Years Clinical Practice • {provider.leadClinician.languages.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities & International Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Advanced Hospital Facilities */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-2xs">
            <h3 className="text-base font-bold text-[#123B46] mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#167D78]" />
              <span>Advanced Clinical Infrastructure</span>
            </h3>
            <div className="space-y-2.5">
              {provider.facilities.map((fac, i) => (
                <div key={i} className="p-3 bg-teal-50/50 rounded-xl text-xs text-gray-800 flex items-start gap-2 border border-teal-100/50">
                  <CheckCircle2 className="w-4 h-4 text-[#167D78] shrink-0 mt-0.5" />
                  <span>{fac}</span>
                </div>
              ))}
            </div>
          </div>

          {/* International Patient Concierge */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-2xs">
            <h3 className="text-base font-bold text-[#123B46] mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#167D78]" />
              <span>International Patient Services</span>
            </h3>
            <div className="space-y-2.5">
              {provider.internationalPatientServices.map((srv, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-xl text-xs text-gray-800 flex items-start gap-2 border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{srv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

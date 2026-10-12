import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockDestinations, mockProviders, mockTreatments } from '../../data/mockData';
import { useCurrency } from '../../components/shared/CurrencySelector';
import { VerificationBadge } from '../../components/shared/VerificationBadge';
import {
  ShieldCheck,
  Plane,
  Languages,
  Calendar,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Building2
} from 'lucide-react';

export const DestinationsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { formatPrice } = useCurrency();

  const destination = mockDestinations.find((d) => d.slug === slug) || mockDestinations[0];

  const affiliatedProviders = mockProviders.filter((p) =>
    p.country.toLowerCase() === destination.country.toLowerCase() ||
    p.city.toLowerCase() === destination.city.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#F5F8F7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Destination selector tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          {mockDestinations.map((d) => (
            <Link
              key={d.id}
              to={`/destinations/${d.slug}`}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                d.slug === destination.slug
                  ? 'bg-[#123B46] text-white shadow-sm'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              <span>{d.flagEmoji}</span>
              <span>{d.name}, {d.country}</span>
            </Link>
          ))}
        </div>

        {/* Hero banner */}
        <div className="relative rounded-3xl overflow-hidden mb-10 shadow-sm border border-gray-200">
          <div className="h-72 sm:h-80 w-full relative">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#123B46] via-[#123B46]/60 to-transparent"></div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{destination.flagEmoji}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                Verified Medical Tourism Hub
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-['Manrope']">
              {destination.name}, {destination.country}
            </h1>
            <p className="mt-2 text-sm text-gray-200 max-w-2xl leading-relaxed">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Destination Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
            <div className="text-xs font-semibold text-gray-400 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#167D78]" />
              <span>Accreditation Density</span>
            </div>
            <div className="text-2xl font-bold text-[#123B46]">{destination.jciHospitalsCount} JCI Centers</div>
            <p className="text-[11px] text-gray-500 mt-1">Joint Commission International accredited tertiary care hospitals</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
            <div className="text-xs font-semibold text-gray-400 mb-1 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-[#167D78]" />
              <span>Estimated Cost Savings</span>
            </div>
            <div className="text-2xl font-bold text-emerald-700">~{destination.averageSavingsPercent}% Lower</div>
            <p className="text-[11px] text-gray-500 mt-1">Compared to US, UK, and European out-of-pocket costs</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
            <div className="text-xs font-semibold text-gray-400 mb-1 flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-[#167D78]" />
              <span>Language Support</span>
            </div>
            <div className="text-sm font-bold text-[#123B46] truncate">{destination.languageSupport.slice(0, 3).join(', ')}</div>
            <p className="text-[11px] text-gray-500 mt-1">Dedicated international translation lounges</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
            <div className="text-xs font-semibold text-gray-400 mb-1 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#167D78]" />
              <span>Best Travel Season</span>
            </div>
            <div className="text-sm font-bold text-[#123B46] truncate">{destination.bestTimeToVisit}</div>
            <p className="text-[11px] text-gray-500 mt-1">Optimal weather for post-surgery mobility</p>
          </div>
        </div>

        {/* Practical Travel & Visa Guidance */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-10 shadow-2xs">
          <h2 className="text-xl font-bold text-[#123B46] mb-4 flex items-center gap-2">
            <Plane className="w-5 h-5 text-[#167D78]" />
            <span>Practical Travel & Medical Visa Regulations</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-700">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-900 text-sm mb-1.5">Medical Visa Policy</h3>
              <p className="leading-relaxed text-[#5A6B70]">{destination.visaInfo}</p>
              <div className="mt-3 flex items-center gap-1 text-[#167D78] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Hospital letter issued within 48 hours of intake</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-900 text-sm mb-1.5">International Flight Connectivity</h3>
              <p className="leading-relaxed text-[#5A6B70]">
                Direct non-stop flights readily available from: {destination.directFlightsFrom.join(', ')}.
              </p>
              <div className="mt-3 flex items-center gap-1 text-[#167D78] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Airport VIP wheelchair & direct transfer coordinated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accredited Providers in this Destination */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#123B46] font-['Manrope']">
                Accredited Hospitals in {destination.name}
              </h2>
              <p className="text-xs text-[#5A6B70] mt-1">Verified facility capabilities and senior surgical specialists.</p>
            </div>
            <Link to="/providers" className="text-xs font-semibold text-[#167D78] hover:underline">
              View all global hospitals →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affiliatedProviders.map((provider) => (
              <div
                key={provider.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-base text-[#123B46]">
                      <Link to={`/providers/${provider.slug}`} className="hover:text-[#167D78]">
                        {provider.name}
                      </Link>
                    </h3>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      ★ {provider.rating}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{provider.address}</span>
                  </p>

                  <div className="mb-4">
                    <VerificationBadge label={provider.accreditations[0]} source={provider.verifiedSource} />
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3 mb-4">
                    <img
                      src={provider.leadClinician.avatar}
                      alt={provider.leadClinician.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-gray-900 truncate">{provider.leadClinician.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{provider.leadClinician.specialty}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#123B46]">
                    From {formatPrice(provider.estimatedCostRangeUSD.min)}
                  </span>
                  <Link
                    to={`/providers/${provider.slug}`}
                    className="px-3.5 py-1.5 bg-[#123B46] hover:bg-[#0d2b33] text-white text-xs font-semibold rounded-lg"
                  >
                    View Hospital
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

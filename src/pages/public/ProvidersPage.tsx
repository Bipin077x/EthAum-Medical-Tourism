import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockProviders } from '../../data/mockData';
import { useCurrency, CurrencySelector } from '../../components/shared/CurrencySelector';
import { VerificationBadge } from '../../components/shared/VerificationBadge';
import { Search, MapPin, Building2, Star, ShieldCheck, CheckCircle } from 'lucide-react';

export const ProvidersPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('All');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const { formatPrice } = useCurrency();

  const countries = ['All', 'India', 'Thailand', 'Turkey', 'Spain'];
  const specialties = ['All', 'Orthopedics', 'Cardiology', 'Cosmetic & Plastic Surgery', 'Fertility (IVF)', 'Dental Surgery'];

  const filteredProviders = mockProviders.filter((p) => {
    const matchesQ =
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.city.toLowerCase().includes(query.toLowerCase()) ||
      p.leadClinician.name.toLowerCase().includes(query.toLowerCase());
    const matchesCountry = countryFilter === 'All' || p.country.toLowerCase() === countryFilter.toLowerCase();
    const matchesSpecialty = specialtyFilter === 'All' || p.specialties.includes(specialtyFilter as any);
    return matchesQ && matchesCountry && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-[#F5F8F7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#167D78] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Hospital Registry</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123B46] font-['Manrope']">
              Global Hospitals & Specialists
            </h1>
            <p className="text-sm text-[#5A6B70] mt-1 max-w-2xl">
              Every facility has verified Joint Commission International (JCI) or national ministry accreditation with verified lead clinicians.
            </p>
          </div>

          <CurrencySelector />
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs mb-8 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by hospital name, city, or chief surgeon..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#167D78] focus:bg-white transition-all"
            />
          </div>

          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#167D78]"
          >
            {countries.map((c) => (
              <option key={c} value={c}>{c === 'All' ? 'All Countries' : c}</option>
            ))}
          </select>

          <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#167D78]"
          >
            {specialties.map((s) => (
              <option key={s} value={s}>{s === 'All' ? 'All Specialties' : s}</option>
            ))}
          </select>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-7 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-[#123B46] hover:text-[#167D78] transition-colors">
                      <Link to={`/providers/${provider.slug}`}>
                        {provider.name}
                      </Link>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>{provider.city}, {provider.country}</span>
                      <span>•</span>
                      <span className="capitalize">{provider.type}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{provider.rating}</span>
                    <span className="text-gray-400 text-[10px]">({provider.reviewCount})</span>
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {provider.accreditations.map((acc, i) => (
                    <VerificationBadge key={i} label={acc} size="sm" source={provider.verifiedSource} />
                  ))}
                </div>

                {/* Lead Clinician */}
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3.5 mb-4">
                  <img
                    src={provider.leadClinician.avatar}
                    alt={provider.leadClinician.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-600/20"
                  />
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-gray-900 truncate">{provider.leadClinician.name}</h4>
                    <p className="text-[11px] text-[#5A6B70] truncate">{provider.leadClinician.title}</p>
                    <p className="text-[10px] text-teal-700 font-semibold mt-0.5">
                      {provider.leadClinician.experienceYears} Years • {provider.leadClinician.languages.join(', ')}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#5A6B70] leading-relaxed line-clamp-2 mb-4">
                  {provider.about}
                </p>

                {/* Specialties tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {provider.specialties.map((spec) => (
                    <span key={spec} className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Indicative Cost Range</span>
                  <span className="text-sm font-bold text-[#123B46]">
                    {formatPrice(provider.estimatedCostRangeUSD.min)} – {formatPrice(provider.estimatedCostRangeUSD.max)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/providers/${provider.slug}`}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#123B46] text-xs font-semibold rounded-lg transition-colors"
                  >
                    Details
                  </Link>
                  <Link
                    to="/patient/cases/new"
                    className="px-4 py-2 bg-[#123B46] hover:bg-[#0d2b33] text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockTreatments, mockDestinations, mockProviders } from '../../data/mockData';
import { useCurrency } from '../../components/shared/CurrencySelector';
import { VerificationBadge } from '../../components/shared/VerificationBadge';
import {
  Search,
  MapPin,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  Award,
  ChevronRight,
  Plane,
  HeartHandshake,
  CheckCircle,
  HelpCircle,
  DollarSign
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/treatments?q=${encodeURIComponent(searchQuery)}&cat=${encodeURIComponent(selectedCategory)}`);
  };

  const categories = ['All', 'Orthopedics', 'Cardiology', 'Fertility (IVF)', 'Dental Surgery', 'Cosmetic & Plastic Surgery', 'Neurology & Spine'];

  const filteredTreatments = mockTreatments.filter((t) =>
    selectedCategory === 'All' ? true : t.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-[#F5F8F7]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#123B46] to-[#0e2c34] text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-900/80 border border-teal-500/40 text-teal-300 text-xs font-semibold mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Accredited Global Hospitals • Transparent Pricing • Complete Aftercare</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-['Manrope'] tracking-tight text-white leading-tight">
              World-Class Healthcare, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">
                Transparent & Predictable.
              </span>
            </h1>
            <p className="mt-5 text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto">
              Connect with top JCI-accredited hospitals in India, Thailand, Turkey & Spain. Compare itemized surgical quotes, consult leading surgeons via video, and travel with dedicated clinical coordination.
            </p>
          </div>

          {/* Search Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-5 border border-gray-100 text-[#26363B]">
            <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search treatment (e.g., Knee Replacement, Bypass, IVF)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#167D78] focus:bg-white transition-all"
                />
              </div>

              <div className="w-full md:w-56 relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#167D78] focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-3.5 pointer-events-none text-gray-400">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
              </div>

              <button
                type="submit"
                className="py-3 px-6 bg-[#167D78] hover:bg-[#11625e] text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Find Care</span>
                <ArrowRight className="w-4 h-4 text-teal-200 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Quick popular tags */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span className="font-semibold text-gray-700">Popular:</span>
              <button type="button" onClick={() => { setSearchQuery('Knee'); }} className="hover:text-[#167D78] underline">Robotic Knee Arthroplasty</button>
              <span>•</span>
              <button type="button" onClick={() => { setSearchQuery('IVF'); }} className="hover:text-[#167D78] underline">IVF with PGT-A</button>
              <span>•</span>
              <button type="button" onClick={() => { setSearchQuery('Dental'); }} className="hover:text-[#167D78] underline">All-on-4 Implants</button>
              <span>•</span>
              <button type="button" onClick={() => { setSearchQuery('Rhinoplasty'); }} className="hover:text-[#167D78] underline">Piezo Rhinoplasty</button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-3xl font-extrabold text-teal-300 font-['Manrope']">60–80%</div>
              <div className="text-xs text-gray-300 mt-1">Average Cost Savings vs US/UK</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-3xl font-extrabold text-teal-300 font-['Manrope']">100%</div>
              <div className="text-xs text-gray-300 mt-1">JCI / NABH Verified Hospitals</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-3xl font-extrabold text-teal-300 font-['Manrope']">0 Hidden Fees</div>
              <div className="text-xs text-gray-300 mt-1">Itemized Surgical Proposals</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-3xl font-extrabold text-teal-300 font-['Manrope']">Dedicated</div>
              <div className="text-xs text-gray-300 mt-1">Post-Operative Aftercare Care</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Treatments Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-[#167D78] uppercase tracking-wider">Clinical Catalogue</span>
            <h2 className="text-3xl font-bold text-[#123B46] font-['Manrope'] mt-1">Specialized Medical Procedures</h2>
            <p className="text-sm text-[#5A6B70] mt-1">All procedures include pre-operative evaluations, hospital stay, and post-op rehabilitation coordination.</p>
          </div>
          <Link
            to="/treatments"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#167D78] hover:text-[#11625e] group"
          >
            <span>View all 48 treatments</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.slice(0, 6).map((treatment) => (
            <div
              key={treatment.id}
              className="bg-white rounded-2xl border border-[#E2E8E7] p-6 hover:shadow-lg hover:border-teal-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-[#167D78] border border-teal-200">
                    {treatment.category}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {treatment.successRatePercentage}% Success Rate
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#123B46] group-hover:text-[#167D78] transition-colors leading-snug">
                  <Link to={`/treatments/${treatment.slug}`}>
                    {treatment.title}
                  </Link>
                </h3>

                <p className="mt-2 text-xs text-[#5A6B70] line-clamp-2 leading-relaxed">
                  {treatment.shortDescription}
                </p>

                {/* Key specs */}
                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[11px]">Typical Stay</span>
                    <span className="font-semibold text-gray-800 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      {treatment.averageDurationDays} days in destination
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Indicative Cost</span>
                    <span className="font-bold text-[#123B46] mt-0.5 block">
                      {formatPrice(treatment.indicativeCostUSD.min)} – {formatPrice(treatment.indicativeCostUSD.max)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  to={`/treatments/${treatment.slug}`}
                  className="text-xs font-semibold text-gray-700 hover:text-[#167D78] flex items-center gap-1"
                >
                  <span>Procedure Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to="/patient/cases/new"
                  className="px-3.5 py-1.5 bg-teal-50 hover:bg-[#167D78] text-[#167D78] hover:text-white border border-teal-200 rounded-lg text-xs font-bold transition-all shadow-2xs"
                >
                  Start Case
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Medical Destinations */}
      <section className="py-16 bg-white border-y border-[#E2E8E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#167D78] uppercase tracking-wider">Accredited Hubs</span>
            <h2 className="text-3xl font-bold text-[#123B46] font-['Manrope'] mt-1">Leading Medical Travel Destinations</h2>
            <p className="text-sm text-[#5A6B70] mt-2">
              Every country is audited for hospital accreditation standards, medical visa turnaround times, and English-speaking care coordinators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockDestinations.map((dest) => (
              <Link
                key={dest.id}
                to={`/destinations/${dest.slug}`}
                className="group rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all flex flex-col bg-white"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-gray-900 flex items-center gap-1.5 shadow-sm">
                    <span>{dest.flagEmoji}</span>
                    <span>{dest.country}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#123B46]/90 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[11px] font-semibold">
                    Up to {dest.averageSavingsPercent}% savings
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-[#123B46] group-hover:text-[#167D78] transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-[#5A6B70] mt-1 line-clamp-2">
                      {dest.tagline}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                    <span className="font-medium text-[#167D78] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {dest.jciHospitalsCount} JCI Hospitals
                    </span>
                    <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - The 4-Pillar Transparent Journey */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#167D78] uppercase tracking-wider">Predictable Care Protocol</span>
          <h2 className="text-3xl font-bold text-[#123B46] font-['Manrope'] mt-1">How EthAum Coordinates Your Journey</h2>
          <p className="text-sm text-[#5A6B70] mt-2">
            International healthcare should not be fragmented. We provide a continuous, verifiable workflow with human oversight at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8E7] shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#167D78] font-bold flex items-center justify-center text-base mb-4 border border-teal-200">
              1
            </div>
            <h3 className="font-bold text-base text-[#123B46] mb-2">Private Case & Record Intake</h3>
            <p className="text-xs text-[#5A6B70] leading-relaxed">
              Upload your MRI, scans, and physician notes. Our AI extraction parses clinical parameters, and you retain complete control over which hospitals can view your files.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E2E8E7] shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#167D78] font-bold flex items-center justify-center text-base mb-4 border border-teal-200">
              2
            </div>
            <h3 className="font-bold text-base text-[#123B46] mb-2">Explainable Provider Matching</h3>
            <p className="text-xs text-[#5A6B70] leading-relaxed">
              Matched only with JCI-accredited hospitals that perform high annual surgical volume in your specific condition. You see the transparent clinical reasoning for each match.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E2E8E7] shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#167D78] font-bold flex items-center justify-center text-base mb-4 border border-teal-200">
              3
            </div>
            <h3 className="font-bold text-base text-[#123B46] mb-2">Itemized Quote Comparison</h3>
            <p className="text-xs text-[#5A6B70] leading-relaxed">
              Receive structured proposals itemizing surgeon fees, implant brands, hospital room tier, and exclusions. Compare side-by-side in your home currency with zero hidden fees.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E2E8E7] shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#167D78] font-bold flex items-center justify-center text-base mb-4 border border-teal-200">
              4
            </div>
            <h3 className="font-bold text-base text-[#123B46] mb-2">Tele-Consult, Surgery & Aftercare</h3>
            <p className="text-xs text-[#5A6B70] leading-relaxed">
              Hold a face-to-face video consultation with your operating surgeon, receive official medical visa invitations, and complete structured post-op recovery milestones.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/patient/cases/new"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#123B46] hover:bg-[#0d2b33] text-white font-semibold rounded-xl text-sm shadow-md transition-all group"
          >
            <span>Start Your Medical Enquiry (Free & Confidential)</span>
            <ArrowRight className="w-4 h-4 text-teal-300 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Featured Verified Hospitals */}
      <section className="py-16 bg-[#F5F8F7] border-t border-[#E2E8E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-[#167D78] uppercase tracking-wider">Verified Network</span>
              <h2 className="text-3xl font-bold text-[#123B46] font-['Manrope'] mt-1">Accredited International Hospitals</h2>
              <p className="text-sm text-[#5A6B70] mt-1">Direct partnerships with university health systems and renowned centers of clinical excellence.</p>
            </div>
            <Link
              to="/providers"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#167D78] hover:text-[#11625e] group"
            >
              <span>Explore all hospitals</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProviders.slice(0, 3).map((provider) => (
              <div
                key={provider.id}
                className="bg-white rounded-2xl border border-[#E2E8E7] p-6 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-[#123B46] leading-snug">
                        <Link to={`/providers/${provider.slug}`} className="hover:text-[#167D78] transition-colors">
                          {provider.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-[#5A6B70] flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span>{provider.city}, {provider.country}</span>
                      </p>
                    </div>
                    <span className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                      ★ {provider.rating}
                    </span>
                  </div>

                  <div className="mb-4">
                    <VerificationBadge label={provider.accreditations[0]} source={provider.verifiedSource} />
                  </div>

                  {/* Lead Clinician */}
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3 mb-4">
                    <img
                      src={provider.leadClinician.avatar}
                      alt={provider.leadClinician.name}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-gray-900 truncate">{provider.leadClinician.name}</p>
                      <p className="text-[11px] text-[#5A6B70] truncate">{provider.leadClinician.title}</p>
                      <p className="text-[10px] text-teal-700 font-semibold">{provider.leadClinician.experienceYears} Years Experience</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#5A6B70] line-clamp-2 leading-relaxed">
                    {provider.about}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Indicative Cost</span>
                    <span className="text-xs font-bold text-[#123B46]">
                      {formatPrice(provider.estimatedCostRangeUSD.min)} – {formatPrice(provider.estimatedCostRangeUSD.max)}
                    </span>
                  </div>

                  <Link
                    to={`/providers/${provider.slug}`}
                    className="px-3.5 py-1.5 bg-[#123B46] hover:bg-[#0d2b33] text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    View Hospital
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Stories / Trust Section */}
      <section className="py-20 bg-white border-b border-[#E2E8E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#167D78] uppercase tracking-wider">Patient Experiences</span>
            <h2 className="text-3xl font-bold text-[#123B46] font-['Manrope'] mt-1">Real Journeys, Verifiable Results</h2>
            <p className="text-sm text-[#5A6B70] mt-1">Read how international patients completed their care with full peace of mind.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3 text-xs">
                  ★★★★★ <span className="text-gray-500 font-semibold ml-1">Verified Case</span>
                </div>
                <p className="text-sm text-gray-800 italic leading-relaxed">
                  "In the UK, my NHS waiting time for knee surgery was estimated at 18 months. Through EthAum, I compared Apollo Delhi and Bumrungrad Bangkok. Dr. Mehta did robotic surgery, and I was back on my feet in 2 weeks. The quote was exact to the penny."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-[#167D78] font-bold flex items-center justify-center text-sm">
                  SJ
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Sarah Jenkins (62)</h4>
                  <p className="text-[11px] text-gray-500">London, UK • Robotic Knee Arthroplasty</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3 text-xs">
                  ★★★★★ <span className="text-gray-500 font-semibold ml-1">Verified Case</span>
                </div>
                <p className="text-sm text-gray-800 italic leading-relaxed">
                  "Having itemized quotes in USD before booking flights took away all the stress. We knew exactly which implants were being used and that our hotel accommodation had medical nursing visits every day."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-[#167D78] font-bold flex items-center justify-center text-sm">
                  MT
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Michael Tremblay (48)</h4>
                  <p className="text-[11px] text-gray-500">Toronto, Canada • All-on-4 Dental Restoration</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3 text-xs">
                  ★★★★★ <span className="text-gray-500 font-semibold ml-1">Verified Case</span>
                </div>
                <p className="text-sm text-gray-800 italic leading-relaxed">
                  "The virtual consultation with the surgical team before making travel plans was invaluable. We reviewed our genetic tests together and felt 100% confident stepping on the plane to Spain."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-[#167D78] font-bold flex items-center justify-center text-sm">
                  LK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Liam & Chloe K.</h4>
                  <p className="text-[11px] text-gray-500">Sydney, Australia • IVF with PGT-A Genetics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common FAQs */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#167D78] uppercase tracking-wider">Common Questions</span>
          <h2 className="text-3xl font-bold text-[#123B46] font-['Manrope'] mt-1">Frequently Asked Questions</h2>
          <p className="text-sm text-[#5A6B70] mt-1">Everything you need to know about cross-border treatment coordination.</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs">
            <h3 className="font-bold text-sm text-[#123B46]">How do I know the hospitals and doctors are legitimate?</h3>
            <p className="text-xs text-[#5A6B70] mt-2 leading-relaxed">
              Every hospital listed on EthAum holds international accreditation by the Joint Commission International (JCI), National Accreditation Board (NABH), or regional government equivalents. Doctor credentials, surgical degrees, and board certifications are individually verified by our medical governance committee.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs">
            <h3 className="font-bold text-sm text-[#123B46]">Are medical quotes guaranteed, or can costs change?</h3>
            <p className="text-xs text-[#5A6B70] mt-2 leading-relaxed">
              Quotes submitted on EthAum are formal itemized proposals covering surgeon fees, operating room, implants, and standard hospital stay. They remain fixed unless in-person diagnostics uncover significant unforeseen medical comorbidities. All potential exclusions are explicitly disclosed upfront.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs">
            <h3 className="font-bold text-sm text-[#123B46]">Who helps me with my medical visa and companion travel?</h3>
            <p className="text-xs text-[#5A6B70] mt-2 leading-relaxed">
              Once you select a provider, the hospital's International Patient Desk issues an official Medical Visa Invitation Letter. EthAum coordinators assist with flight arrangements, airport limousine transfers, companion accommodations, and local translators.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs">
            <h3 className="font-bold text-sm text-[#123B46]">What happens if I experience complications once I return home?</h3>
            <p className="text-xs text-[#5A6B70] mt-2 leading-relaxed">
              All treatment packages include 6 months of scheduled tele-health aftercare consultations with your operating surgeon. In addition, you receive a complete international medical transfer discharge file to share with your local family physician.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-[#123B46] to-[#167D78] text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Manrope'] tracking-tight">
            Take the First Step Toward Your Treatment
          </h2>
          <p className="mt-4 text-base text-teal-100 max-w-xl mx-auto">
            Create your case in under 3 minutes, upload your records securely, and receive personalized quotes from the world's leading hospitals.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/patient/cases/new"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#123B46] hover:bg-teal-50 font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
            >
              <span>Start Your Case Now</span>
              <ArrowRight className="w-4 h-4 text-[#167D78] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/treatments"
              className="w-full sm:w-auto px-6 py-3.5 bg-teal-900/60 hover:bg-teal-900 text-white font-medium rounded-xl text-sm border border-teal-400/30 transition-all"
            >
              Explore Catalogue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

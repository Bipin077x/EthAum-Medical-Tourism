import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { mockTreatments } from '../../data/mockData';
import { useCurrency, CurrencySelector } from '../../components/shared/CurrencySelector';
import { Search, Filter, Clock, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export const TreatmentsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialCat = searchParams.get('cat') || 'All';

  const [query, setQuery] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'cost_asc' | 'cost_desc' | 'success_desc'>('recommended');

  const { formatPrice } = useCurrency();

  const categories = ['All', 'Orthopedics', 'Cardiology', 'Fertility (IVF)', 'Dental Surgery', 'Cosmetic & Plastic Surgery', 'Neurology & Spine'];
  const destinations = ['All', 'India', 'Thailand', 'Turkey', 'Spain', 'Mexico'];

  const filteredTreatments = useMemo(() => {
    return mockTreatments
      .filter((t) => {
        const matchesQ =
          !query ||
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
          t.category.toLowerCase().includes(query.toLowerCase());
        const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
        const matchesDest = selectedDestination === 'All' || t.popularDestinations.includes(selectedDestination);
        return matchesQ && matchesCat && matchesDest;
      })
      .sort((a, b) => {
        if (sortBy === 'cost_asc') return a.indicativeCostUSD.min - b.indicativeCostUSD.min;
        if (sortBy === 'cost_desc') return b.indicativeCostUSD.max - a.indicativeCostUSD.max;
        if (sortBy === 'success_desc') return b.successRatePercentage - a.successRatePercentage;
        return 0;
      });
  }, [query, selectedCategory, selectedDestination, sortBy]);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      if (cat === 'All') updated.delete('cat');
      else updated.set('cat', cat);
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F8F7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#167D78] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>International Medical Procedures</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123B46] font-['Manrope']">
              Treatment Catalogue & Indicative Costs
            </h1>
            <p className="text-sm text-[#5A6B70] mt-1 max-w-2xl">
              Transparent price ranges, expected length of stay, and verified hospital options across global medical centers.
            </p>
          </div>

          <CurrencySelector />
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8E7] shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by condition, surgery name, or specialty..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#167D78] focus:bg-white transition-all"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#167D78] focus:bg-white transition-all"
              >
                <option value="All">All Destinations</option>
                {destinations.filter(d => d !== 'All').map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#167D78] focus:bg-white transition-all"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="cost_asc">Cost: Low to High</option>
                <option value="cost_desc">Cost: High to Low</option>
                <option value="success_desc">Highest Success Rate</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#123B46] text-white font-semibold shadow-xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
          <span>Showing <strong>{filteredTreatments.length}</strong> medical procedures</span>
          {(query || selectedCategory !== 'All' || selectedDestination !== 'All') && (
            <button
              onClick={() => { setQuery(''); setSelectedCategory('All'); setSelectedDestination('All'); }}
              className="text-[#167D78] hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Treatments Grid */}
        {filteredTreatments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E2E8E7] p-12 text-center max-w-lg mx-auto">
            <Filter className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800">No treatments matched your search</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">Try clearing your search query or selecting a different medical category.</p>
            <button
              onClick={() => { setQuery(''); setSelectedCategory('All'); setSelectedDestination('All'); }}
              className="px-4 py-2 bg-[#167D78] text-white text-xs font-semibold rounded-lg"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTreatments.map((treatment) => (
              <div
                key={treatment.id}
                className="bg-white rounded-2xl border border-[#E2E8E7] p-6 hover:shadow-lg hover:border-teal-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-teal-50 text-[#167D78] border border-teal-200">
                      {treatment.category}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {treatment.successRatePercentage}% Success Rate
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#123B46] hover:text-[#167D78] transition-colors leading-snug">
                    <Link to={`/treatments/${treatment.slug}`}>
                      {treatment.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs text-[#5A6B70] line-clamp-3 leading-relaxed">
                    {treatment.shortDescription}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Indicative Cost</span>
                      <span className="font-bold text-[#123B46] text-sm">
                        {formatPrice(treatment.indicativeCostUSD.min)} – {formatPrice(treatment.indicativeCostUSD.max)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Typical Stay
                      </span>
                      <span className="font-semibold text-gray-800">
                        {treatment.averageDurationDays} days in destination
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Popular Hubs</span>
                      <span className="font-medium text-gray-700 truncate max-w-[160px] text-right">
                        {treatment.popularDestinations.join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* Sample inclusion */}
                  <div className="mt-3 p-2 bg-gray-50 rounded-lg text-[11px] text-gray-600 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{treatment.keyInclusions[0]}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                  <Link
                    to={`/treatments/${treatment.slug}`}
                    className="text-xs font-semibold text-gray-700 hover:text-[#167D78] flex items-center gap-1"
                  >
                    <span>Clinical Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to={`/patient/cases/new?treatment=${encodeURIComponent(treatment.slug)}`}
                    className="px-3.5 py-2 bg-[#123B46] hover:bg-[#0d2b33] text-white rounded-lg text-xs font-semibold transition-all shadow-2xs"
                  >
                    Start Case
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

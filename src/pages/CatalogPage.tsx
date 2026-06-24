import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronDown, X, SlidersHorizontal, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { SearchBar } from '../components/ui/SearchBar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CertCardSkeleton } from '../components/ui/SkeletonLoader';
import { useFilter } from '../hooks/useFilter';
import { useUser } from '../context/UserContext';
import certifications from '../data/certifications.json';
import type { Certification } from '../types';
import { Clock, CheckCircle } from 'lucide-react';

const certs = certifications as Certification[];

export function CatalogPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { filters, filtered, setFilter, clearFilters, activeFilterCount, vendors, domains, levels } = useFilter(certs);
  const { isBookmarked, toggleBookmark, showToast } = useUser();
  const [loading, setLoading] = React.useState(true);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  useEffect(() => {
    const d = searchParams.get('domain');
    const s = searchParams.get('search');
    if (d) setFilter('domain', d);
    if (s) setFilter('search', s);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleBookmark = (e: React.MouseEvent, certId: string, certName: string) => {
    e.stopPropagation();
    toggleBookmark(certId);
    showToast(isBookmarked(certId) ? `Removed ${certName} from bookmarks` : `Bookmarked ${certName}`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Certification Catalog</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {filtered.length} of {certs.length} exams
          {activeFilterCount > 0 && <span className="text-indigo-600 dark:text-indigo-400"> (filtered)</span>}
        </p>
      </div>

      {/* Active filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.domain && (
            <span className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-full text-sm">
              {filters.domain}
              <button onClick={() => setFilter('domain', '')}><X size={14} /></button>
            </span>
          )}
          {filters.vendor && (
            <span className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-full text-sm">
              {filters.vendor}
              <button onClick={() => setFilter('vendor', '')}><X size={14} /></button>
            </span>
          )}
          {filters.level && (
            <span className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-full text-sm">
              {filters.level}
              <button onClick={() => setFilter('level', '')}><X size={14} /></button>
            </span>
          )}
          {filters.search && (
            <span className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-full text-sm">
              "{filters.search}"
              <button onClick={() => setFilter('search', '')}><X size={14} /></button>
            </span>
          )}
          <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-700 underline">
            Clear all
          </button>
        </div>
      )}

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'fixed inset-0 z-40 bg-white dark:bg-gray-900 overflow-y-auto p-6' : 'hidden'} lg:block lg:static lg:bg-transparent lg:p-0 lg:z-auto lg:w-60 flex-shrink-0`}>
          {sidebarOpen && (
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <h2 className="font-bold text-gray-900 dark:text-white">Filters</h2>
              <button onClick={() => setSidebarOpen(false)}><X size={20} /></button>
            </div>
          )}
          <div className="space-y-6">
            <SearchBar value={filters.search} onChange={(v) => setFilter('search', v)} placeholder="Search exams…" />

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Domain</label>
              <select
                value={filters.domain}
                onChange={(e) => setFilter('domain', e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Domains</option>
                {domains.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Vendor</label>
              <select
                value={filters.vendor}
                onChange={(e) => setFilter('vendor', e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Vendors</option>
                {vendors.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Level</label>
              <select
                value={filters.level}
                onChange={(e) => setFilter('level', e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Levels</option>
                {levels.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Sort By</label>
              <select
                value={filters.sort}
                onChange={(e) => setFilter('sort', e.target.value as 'name' | 'difficulty' | 'popularity')}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="name">Name (A–Z)</option>
                <option value="difficulty">Difficulty</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <Button variant="secondary" size="sm" onClick={() => setSidebarOpen(true)}>
              <SlidersHorizontal size={16} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Button>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <ChevronDown size={16} />
              Sort: {filters.sort}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 9 }).map((_, i) => <CertCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No exams found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting or clearing your filters</p>
              <Button variant="secondary" onClick={clearFilters}>Clear All Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => navigate(`/cert/${cert.id}`)}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer flex flex-col"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-gray-400 font-medium">{cert.vendor}</span>
                    <div className="flex items-center gap-2">
                      <Badge label={cert.level} variant="level" />
                      <button
                        onClick={(e) => handleBookmark(e, cert.id, cert.name)}
                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                      >
                        {isBookmarked(cert.id) ? <BookmarkCheck size={18} className="text-indigo-600" /> : <BookmarkPlus size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white text-sm">{cert.code}</div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{cert.name}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 flex-1">{cert.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" />{cert.questionCount} Qs</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{cert.timeMinutes}m</span>
                    <span>Pass: {cert.passingScore}%</span>
                  </div>
                  <Button size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); navigate(`/exam/${cert.id}`); }}>
                    Start Exam
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

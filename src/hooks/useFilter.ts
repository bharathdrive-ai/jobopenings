import { useState, useMemo } from 'react';
import type { Certification, FilterState } from '../types';

const INITIAL_FILTER: FilterState = {
  domain: '',
  vendor: '',
  level: '',
  search: '',
  sort: 'name',
};

export function useFilter(certs: Certification[]) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER);

  const filtered = useMemo(() => {
    let result = [...certs];

    if (filters.domain) {
      result = result.filter((c) => c.domain === filters.domain);
    }
    if (filters.vendor) {
      result = result.filter((c) => c.vendor === filters.vendor);
    }
    if (filters.level) {
      result = result.filter((c) => c.level === filters.level);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.vendor.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      if (filters.sort === 'name') return a.name.localeCompare(b.name);
      if (filters.sort === 'popularity') {
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      }
      const levels = ['Foundational', 'Fundamentals', 'Entry', 'Foundation', 'Core', 'Associate', 'Professional', 'Specialty', 'Expert'];
      return levels.indexOf(a.level) - levels.indexOf(b.level);
    });

    return result;
  }, [certs, filters]);

  const setFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters(INITIAL_FILTER);

  const activeFilterCount = [filters.domain, filters.vendor, filters.level, filters.search].filter(Boolean).length;

  const vendors = useMemo(() => [...new Set(certs.map((c) => c.vendor))].sort(), [certs]);
  const domains = useMemo(() => [...new Set(certs.map((c) => c.domain))].sort(), [certs]);
  const levels = useMemo(() => [...new Set(certs.map((c) => c.level))], [certs]);

  return { filters, filtered, setFilter, clearFilters, activeFilterCount, vendors, domains, levels };
}

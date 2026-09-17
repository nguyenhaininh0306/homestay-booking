'use client';

import { createContext, useContext, useMemo, useState, useCallback } from 'react';

const SearchContext = createContext(null);

const initialFilters = {
  city: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
  minPrice: '',
  maxPrice: '',
};

export const SearchProvider = ({ children }) => {
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => setFilters(initialFilters), []);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value != null && !['checkIn', 'checkOut'].includes(key)) {
        params.set(key, value);
      }
    });
    return params.toString();
  }, [filters]);

  const value = useMemo(
    () => ({ filters, setFilters, updateFilter, resetFilters, queryString }),
    [filters, updateFilter, resetFilters, queryString]
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export const useSearch = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch phai duoc dung ben trong SearchProvider');
  return ctx;
};

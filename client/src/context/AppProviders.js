'use client';

import { AuthProvider } from './AuthContext';
import { SearchProvider } from './SearchContext';
import { BookingProvider } from './BookingContext';

export const AppProviders = ({ children }) => (
  <AuthProvider>
    <SearchProvider>
      <BookingProvider>{children}</BookingProvider>
    </SearchProvider>
  </AuthProvider>
);

'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from './AuthContext';
import { SearchProvider } from './SearchContext';
import { BookingProvider } from './BookingContext';

export const AppProviders = ({ children }) => (
  <SessionProvider>
    <AuthProvider>
      <SearchProvider>
        <BookingProvider>{children}</BookingProvider>
      </SearchProvider>
    </AuthProvider>
  </SessionProvider>
);

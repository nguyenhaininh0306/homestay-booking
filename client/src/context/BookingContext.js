'use client';

import { createContext, useContext, useCallback, useMemo, useState } from 'react';
import { apiFetch } from '@/lib/api';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMyBookings = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await apiFetch('/bookings/me', { auth: true });
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createBooking = useCallback(async (payload) => {
    const { data } = await apiFetch('/bookings', { method: 'POST', body: payload, auth: true });
    setBookings((prev) => [data, ...prev]);
    return data;
  }, []);

  const cancelBooking = useCallback(async (id) => {
    const { data } = await apiFetch(`/bookings/${id}/cancel`, { method: 'PATCH', auth: true });
    setBookings((prev) => prev.map((item) => (item._id === id ? data : item)));
    return data;
  }, []);

  const value = useMemo(
    () => ({ bookings, loading, error, fetchMyBookings, createBooking, cancelBooking }),
    [bookings, loading, error, fetchMyBookings, createBooking, cancelBooking]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking phai duoc dung ben trong BookingProvider');
  return ctx;
};

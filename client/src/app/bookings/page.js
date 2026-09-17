'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useBooking } from '@/context/BookingContext';
import { formatPrice, formatDate } from '@/lib/api';

const STATUS_LABEL = {
  pending: { text: 'Chờ xác nhận', className: 'bg-amber-100 text-amber-700' },
  confirmed: { text: 'Đã xác nhận', className: 'bg-green-100 text-green-700' },
  cancelled: { text: 'Đã hủy', className: 'bg-slate-200 text-slate-600' },
  completed: { text: 'Hoàn thành', className: 'bg-brand-100 text-brand-700' },
};

const BookingsPage = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { bookings, loading, error, fetchMyBookings, cancelBooking } = useBooking();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) return router.push('/login');
    fetchMyBookings();
  }, [authLoading, isAuthenticated, fetchMyBookings, router]);

  if (authLoading || loading) {
    return <p className="mx-auto max-w-4xl px-4 py-10 text-slate-600">Đang tải...</p>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Đơn đặt phòng của tôi</h1>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {bookings.length === 0 ? (
        <p className="mt-6 text-slate-600">
          Bạn chưa có đơn nào.{' '}
          <Link href="/homestays" className="font-medium text-brand-600 hover:underline">
            Khám phá homestay
          </Link>
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {bookings.map((booking) => {
            const status = STATUS_LABEL[booking.status] || STATUS_LABEL.pending;

            return (
              <li
                key={booking._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-slate-900">{booking.homestay?.title}</h2>
                    <p className="mt-1 text-sm text-slate-600">
                      {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)} ·{' '}
                      {booking.nights} đêm · {booking.guests} khách
                    </p>
                    <p className="mt-1 font-medium text-brand-600">{formatPrice(booking.totalPrice)}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${status.className}`}>
                      {status.text}
                    </span>
                    {['pending', 'confirmed'].includes(booking.status) && (
                      <button
                        type="button"
                        onClick={() => cancelBooking(booking._id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Hủy đơn
                      </button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BookingsPage;

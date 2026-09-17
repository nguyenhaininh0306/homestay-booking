'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useBooking } from '@/context/BookingContext';
import { formatPrice, formatDate } from '@/lib/api';

const STATUS_LABEL = {
  pending: { text: 'Chờ xác nhận', className: 'bg-amber-100 text-amber-800' },
  confirmed: { text: 'Đã xác nhận', className: 'bg-green-100 text-green-800' },
  cancelled: { text: 'Đã hủy', className: 'bg-chip text-ink-muted' },
  completed: { text: 'Hoàn thành', className: 'bg-brand-50 text-brand-700' },
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
    return <p className="mx-auto max-w-4xl px-6 py-12 text-ink-muted">Đang tải...</p>;
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="border-b border-line pb-6 text-[32px] font-semibold text-ink">
        Chuyến đi của bạn
      </h1>

      {error && <p className="mt-4 text-sm text-brand-600">{error}</p>}

      {bookings.length === 0 ? (
        <div className="py-14">
          <p className="text-lg font-semibold text-ink">Chưa có chuyến đi nào</p>
          <p className="mt-2 text-ink-muted">
            Khi bạn đặt phòng, chuyến đi sẽ xuất hiện ở đây.
          </p>
          <Link
            href="/homestays"
            className="mt-6 inline-block rounded-pill bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
          >
            Bắt đầu tìm kiếm
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-line">
          {bookings.map((booking) => {
            const status = STATUS_LABEL[booking.status] || STATUS_LABEL.pending;
            const homestay = booking.homestay;

            return (
              <li key={booking._id} className="flex flex-wrap gap-5 py-6">
                <Link
                  href={`/homestays/${homestay?.slug}`}
                  className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-surface"
                >
                  {homestay?.images?.[0] && (
                    <Image
                      src={homestay.images[0]}
                      alt={homestay.title}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  )}
                </Link>

                <div className="min-w-[200px] flex-1">
                  <h2 className="font-semibold text-ink">{homestay?.title}</h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    {homestay?.address?.district}, {homestay?.address?.city}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)} ·{' '}
                    {booking.nights} đêm · {booking.guests} khách
                  </p>
                  <p className="mt-1 font-semibold text-ink">{formatPrice(booking.totalPrice)}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`rounded-pill px-3 py-1 text-xs font-medium ${status.className}`}
                  >
                    {status.text}
                  </span>
                  {['pending', 'confirmed'].includes(booking.status) && (
                    <button
                      type="button"
                      onClick={() => cancelBooking(booking._id)}
                      className="text-sm font-medium text-ink underline hover:text-brand-600"
                    >
                      Hủy chuyến đi
                    </button>
                  )}
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

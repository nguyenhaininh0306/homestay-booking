'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useBooking } from '@/context/BookingContext';
import { formatPrice } from '@/lib/api';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const BookingForm = ({ homestay }) => {
  const { isAuthenticated } = useAuth();
  const { createBooking } = useBooking();
  const router = useRouter();

  const [form, setForm] = useState({ checkIn: '', checkOut: '', guests: 1, note: '' });
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0;
    const diff = (new Date(form.checkOut) - new Date(form.checkIn)) / MS_PER_DAY;
    return diff > 0 ? Math.round(diff) : 0;
  }, [form.checkIn, form.checkOut]);

  const total = nights * homestay.pricePerNight;

  const handleChange = (key) => (event) => {
    const value = key === 'guests' ? Number(event.target.value) : event.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) return router.push('/login');
    if (nights <= 0) {
      return setStatus({
        loading: false,
        error: 'Ngày trả phòng phải sau ngày nhận phòng',
        success: '',
      });
    }

    setStatus({ loading: true, error: '', success: '' });
    try {
      await createBooking({ homestayId: homestay._id, ...form });
      setStatus({ loading: false, error: '', success: 'Đặt phòng thành công!' });
      setTimeout(() => router.push('/bookings'), 800);
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: '' });
    }
  };

  const cell = 'flex flex-col px-3 py-2 text-left';
  const cellLabel = 'text-[10px] font-bold uppercase tracking-wide text-ink';
  const cellInput = 'w-full bg-transparent text-sm text-ink focus:outline-none';

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-card border border-line bg-white p-6 shadow-booking"
    >
      <p className="text-ink">
        <span className="text-[22px] font-semibold">{formatPrice(homestay.pricePerNight)}</span>
        <span className="text-ink-muted"> / đêm</span>
      </p>

      <div className="overflow-hidden rounded-xl border border-line">
        <div className="grid grid-cols-2 divide-x divide-line border-b border-line">
          <label className={cell}>
            <span className={cellLabel}>Nhận phòng</span>
            <input
              type="date"
              required
              value={form.checkIn}
              onChange={handleChange('checkIn')}
              className={cellInput}
            />
          </label>
          <label className={cell}>
            <span className={cellLabel}>Trả phòng</span>
            <input
              type="date"
              required
              value={form.checkOut}
              onChange={handleChange('checkOut')}
              className={cellInput}
            />
          </label>
        </div>

        <label className={cell}>
          <span className={cellLabel}>Khách (tối đa {homestay.maxGuests})</span>
          <input
            type="number"
            min={1}
            max={homestay.maxGuests}
            value={form.guests}
            onChange={handleChange('guests')}
            className={cellInput}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-ink">Ghi chú cho chủ nhà</span>
        <textarea
          rows={2}
          value={form.note}
          onChange={handleChange('note')}
          placeholder="Yêu cầu thêm..."
          className="resize-none rounded-xl border border-line px-3 py-2 text-sm outline-none focus:border-ink"
        />
      </label>

      {status.error && <p className="text-sm text-brand-600">{status.error}</p>}
      {status.success && <p className="text-sm text-green-700">{status.success}</p>}

      <button
        type="submit"
        disabled={status.loading}
        className="w-full rounded-pill bg-brand-600 py-3.5 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
      >
        {status.loading ? 'Đang xử lý...' : isAuthenticated ? 'Đặt phòng' : 'Đăng nhập để đặt'}
      </button>

      {nights > 0 ? (
        <div className="space-y-3 pt-2 text-ink">
          <div className="flex justify-between">
            <span className="underline">
              {formatPrice(homestay.pricePerNight)} x {nights} đêm
            </span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between border-t border-line pt-3 font-semibold">
            <span>Tổng cộng</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      ) : (
        <p className="text-center text-sm text-ink-muted">Bạn chưa bị trừ tiền</p>
      )}
    </form>
  );
};

export default BookingForm;

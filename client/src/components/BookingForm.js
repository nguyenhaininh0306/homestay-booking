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
      return setStatus({ loading: false, error: 'Ngày trả phòng phải sau ngày nhận phòng', success: '' });
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

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <p className="text-lg font-semibold text-slate-900">
        {formatPrice(homestay.pricePerNight)}
        <span className="text-sm font-normal text-slate-500"> / đêm</span>
      </p>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <label className="flex flex-col gap-1">
          <span className="font-medium text-slate-700">Nhận phòng</span>
          <input
            type="date"
            required
            value={form.checkIn}
            onChange={handleChange('checkIn')}
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-medium text-slate-700">Trả phòng</span>
          <input
            type="date"
            required
            value={form.checkOut}
            onChange={handleChange('checkOut')}
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-slate-700">Số khách (tối đa {homestay.maxGuests})</span>
        <input
          type="number"
          min={1}
          max={homestay.maxGuests}
          value={form.guests}
          onChange={handleChange('guests')}
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-slate-700">Ghi chú</span>
        <textarea
          rows={3}
          value={form.note}
          onChange={handleChange('note')}
          placeholder="Yêu cầu thêm cho chủ nhà..."
          className="resize-none rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
        />
      </label>

      {nights > 0 && (
        <div className="space-y-1 border-t border-slate-200 pt-3 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>
              {formatPrice(homestay.pricePerNight)} x {nights} đêm
            </span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between font-semibold text-slate-900">
            <span>Tổng cộng</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      )}

      {status.error && <p className="text-sm text-red-600">{status.error}</p>}
      {status.success && <p className="text-sm text-green-600">{status.success}</p>}

      <button
        type="submit"
        disabled={status.loading}
        className="w-full rounded-lg bg-brand-600 py-2.5 font-medium text-white transition hover:bg-brand-700 disabled:opacity-60"
      >
        {status.loading ? 'Đang xử lý...' : isAuthenticated ? 'Đặt phòng' : 'Đăng nhập để đặt'}
      </button>
    </form>
  );
};

export default BookingForm;

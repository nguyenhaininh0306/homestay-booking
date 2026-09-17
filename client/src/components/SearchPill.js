'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/context/SearchContext';

const SearchIcon = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm8-3 9 9"
    />
  </svg>
);

/**
 * Thanh tim kiem dang pill: o trang thai gon chi hien tom tat, bam vao se mo
 * rong thanh cac o nhap rieng biet - giong cach Airbnb lam.
 */
const SearchPill = () => {
  const { filters, updateFilter, queryString } = useSearch();
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    if (!expanded) return undefined;
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setExpanded(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [expanded]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setExpanded(false);
    router.push(`/homestays${queryString ? `?${queryString}` : ''}`);
  };

  const summary = [
    filters.city || 'Mọi nơi',
    filters.checkIn && filters.checkOut ? 'Đã chọn ngày' : 'Tuần bất kỳ',
    filters.guests > 1 ? `${filters.guests} khách` : 'Thêm khách',
  ];

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="flex h-12 items-center gap-1 rounded-pill border border-line bg-white pl-6 pr-2 shadow-pill transition hover:shadow-pill-hover"
      >
        <span className="text-sm font-medium text-ink">{summary[0]}</span>
        <span className="h-6 w-px bg-line" />
        <span className="px-2 text-sm font-medium text-ink">{summary[1]}</span>
        <span className="h-6 w-px bg-line" />
        <span className="px-2 text-sm text-ink-muted">{summary[2]}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white">
          <SearchIcon className="h-3.5 w-3.5" />
        </span>
      </button>
    );
  }

  const field = 'flex flex-1 flex-col rounded-pill px-6 py-2 text-left transition hover:bg-chip';
  const labelCls = 'text-[10px] font-bold uppercase tracking-wide text-ink';
  const inputCls =
    'w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none';

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className="flex w-full max-w-3xl items-center rounded-pill border border-line bg-white py-1 shadow-pill"
    >
      <label className={field}>
        <span className={labelCls}>Địa điểm</span>
        <input
          autoFocus
          type="text"
          value={filters.city}
          onChange={(e) => updateFilter('city', e.target.value)}
          placeholder="Tìm điểm đến"
          className={inputCls}
        />
      </label>

      <span className="h-8 w-px bg-line" />

      <label className={field}>
        <span className={labelCls}>Nhận phòng</span>
        <input
          type="date"
          value={filters.checkIn}
          onChange={(e) => updateFilter('checkIn', e.target.value)}
          className={inputCls}
        />
      </label>

      <span className="h-8 w-px bg-line" />

      <label className={field}>
        <span className={labelCls}>Trả phòng</span>
        <input
          type="date"
          value={filters.checkOut}
          onChange={(e) => updateFilter('checkOut', e.target.value)}
          className={inputCls}
        />
      </label>

      <span className="h-8 w-px bg-line" />

      <label className={`${field} max-w-[150px]`}>
        <span className={labelCls}>Khách</span>
        <input
          type="number"
          min={1}
          value={filters.guests}
          onChange={(e) => updateFilter('guests', Number(e.target.value))}
          className={inputCls}
        />
      </label>

      <button
        type="submit"
        className="mr-2 flex h-12 items-center gap-2 rounded-pill bg-brand-600 px-4 font-medium text-white transition hover:bg-brand-700"
      >
        <SearchIcon className="h-4 w-4" />
        Tìm
      </button>
    </form>
  );
};

export default SearchPill;

'use client';

import { useRouter } from 'next/navigation';
import { useSearch } from '@/context/SearchContext';

const SearchBar = () => {
  const { filters, updateFilter, queryString } = useSearch();
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/homestays${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-5"
    >
      <label className="flex flex-col gap-1 text-sm lg:col-span-2">
        <span className="font-medium text-slate-700">Điểm đến</span>
        <input
          type="text"
          value={filters.city}
          onChange={(e) => updateFilter('city', e.target.value)}
          placeholder="Đà Lạt, Đà Nẵng, Hà Nội..."
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-slate-700">Nhận phòng</span>
        <input
          type="date"
          value={filters.checkIn}
          onChange={(e) => updateFilter('checkIn', e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-slate-700">Trả phòng</span>
        <input
          type="date"
          value={filters.checkOut}
          onChange={(e) => updateFilter('checkOut', e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
        />
      </label>

      <div className="flex items-end gap-3">
        <label className="flex flex-1 flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Số khách</span>
          <input
            type="number"
            min={1}
            value={filters.guests}
            onChange={(e) => updateFilter('guests', Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
          />
        </label>
        <button
          type="submit"
          className="h-[42px] rounded-lg bg-brand-600 px-5 font-medium text-white transition hover:bg-brand-700"
        >
          Tìm
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

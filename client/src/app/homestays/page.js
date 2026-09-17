'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import HomestayCard from '@/components/HomestayCard';
import { apiFetch } from '@/lib/api';

const HomestayList = () => {
  const searchParams = useSearchParams();
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const query = searchParams.toString();

  useEffect(() => {
    setLoading(true);
    setError('');

    apiFetch(`/homestays${query ? `?${query}` : ''}`)
      .then(({ data }) => setHomestays(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <SearchBar />

      <div className="mt-8">
        <h1 className="mb-5 text-xl font-semibold text-slate-900">
          {loading ? 'Đang tìm...' : `Tìm thấy ${homestays.length} homestay`}
        </h1>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {!loading && !error && homestays.length === 0 && (
          <p className="text-slate-600">Không có homestay nào phù hợp. Thử đổi bộ lọc xem sao.</p>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homestays.map((homestay) => (
            <HomestayCard key={homestay._id} homestay={homestay} />
          ))}
        </div>
      </div>
    </div>
  );
};

const HomestayListPage = () => (
  <Suspense fallback={<p className="mx-auto max-w-6xl px-4 py-8 text-slate-600">Đang tải...</p>}>
    <HomestayList />
  </Suspense>
);

export default HomestayListPage;

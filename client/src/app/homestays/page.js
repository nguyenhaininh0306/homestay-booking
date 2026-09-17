'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import HomestayCard from '@/components/HomestayCard';
import CategoryBar from '@/components/CategoryBar';
import { apiFetch } from '@/lib/api';

const CardSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-card w-full rounded-card bg-surface" />
    <div className="space-y-2 pt-3">
      <div className="h-4 w-3/4 rounded bg-surface" />
      <div className="h-3 w-1/2 rounded bg-surface" />
    </div>
  </div>
);

const HomestayList = () => {
  const searchParams = useSearchParams();
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const query = searchParams.toString();
  const city = searchParams.get('city');

  useEffect(() => {
    setLoading(true);
    setError('');

    apiFetch(`/homestays${query ? `?${query}` : ''}`)
      .then(({ data }) => setHomestays(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="mx-auto max-w-shell px-6 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-ink">
        {loading
          ? 'Đang tìm chỗ ở...'
          : `${homestays.length} chỗ ở${city ? ` tại ${city}` : ' trên khắp Việt Nam'}`}
      </h1>

      {error && <p className="text-sm text-brand-600">{error}</p>}

      {!loading && !error && homestays.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg font-semibold text-ink">Không tìm thấy chỗ ở phù hợp</p>
          <p className="mt-2 text-ink-muted">Thử bỏ bớt bộ lọc hoặc đổi điểm đến khác.</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }, (_, i) => <CardSkeleton key={i} />)
          : homestays.map((homestay) => <HomestayCard key={homestay._id} homestay={homestay} />)}
      </div>
    </div>
  );
};

const HomestayListPage = () => (
  <Suspense fallback={<div className="mx-auto max-w-shell px-6 py-8 text-ink-muted">Đang tải...</div>}>
    <CategoryBar />
    <HomestayList />
  </Suspense>
);

export default HomestayListPage;

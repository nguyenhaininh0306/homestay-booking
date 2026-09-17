'use client';

import { Suspense, useEffect, useState } from 'react';
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

const HomePage = () => {
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch('/homestays?limit=12')
      .then(({ data }) => setHomestays(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Suspense fallback={<div className="h-[73px] border-b border-line" />}>
        <CategoryBar />
      </Suspense>

      <div className="mx-auto max-w-shell px-6 py-8">
        <h1 className="mb-6 text-2xl font-semibold text-ink">Chỗ ở nổi bật tại Việt Nam</h1>

        {error && <p className="text-sm text-brand-600">Không tải được dữ liệu: {error}</p>}

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }, (_, i) => <CardSkeleton key={i} />)
            : homestays.map((homestay) => (
                <HomestayCard key={homestay._id} homestay={homestay} />
              ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;

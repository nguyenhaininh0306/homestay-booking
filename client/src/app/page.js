'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import HomestayCard from '@/components/HomestayCard';
import { apiFetch } from '@/lib/api';

const HomePage = () => {
  const [homestays, setHomestays] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch('/homestays?limit=6')
      .then(({ data }) => setHomestays(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Tìm homestay cho chuyến đi tiếp theo
        </h1>
        <p className="mt-3 text-slate-600">
          Hàng nghìn chỗ ở độc đáo trên khắp Việt Nam, đặt nhanh trong vài phút.
        </p>
      </section>

      <SearchBar />

      <section className="mt-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Homestay nổi bật</h2>
          <Link href="/homestays" className="text-sm font-medium text-brand-600 hover:underline">
            Xem tất cả
          </Link>
        </div>

        {error && <p className="text-sm text-red-600">Không tải được dữ liệu: {error}</p>}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homestays.map((homestay) => (
            <HomestayCard key={homestay._id} homestay={homestay} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

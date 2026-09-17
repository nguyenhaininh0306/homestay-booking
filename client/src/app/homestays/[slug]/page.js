'use client';

import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import BookingForm from '@/components/BookingForm';
import { apiFetch, formatPrice } from '@/lib/api';

const HomestayDetailPage = ({ params }) => {
  const { slug } = use(params);
  const [homestay, setHomestay] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch(`/homestays/${slug}`)
      .then(({ data }) => setHomestay(data))
      .catch((err) => setError(err.message));
  }, [slug]);

  if (error) {
    return <p className="mx-auto max-w-6xl px-4 py-10 text-red-600">{error}</p>;
  }

  if (!homestay) {
    return <p className="mx-auto max-w-6xl px-4 py-10 text-slate-600">Đang tải...</p>;
  }

  const { address } = homestay;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900">{homestay.title}</h1>
      <p className="mt-1 text-sm text-slate-600">
        ★ {homestay.rating?.toFixed(1)} ({homestay.reviewCount} đánh giá) · {address?.district},{' '}
        {address?.city}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {homestay.images?.map((src, index) => (
          <div key={src} className={`relative h-64 overflow-hidden rounded-2xl bg-slate-100 ${index === 0 ? 'sm:col-span-2 sm:h-80' : ''}`}>
            <Image src={src} alt={homestay.title} fill sizes="100vw" className="object-cover" />
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">Giới thiệu</h2>
            <p className="text-slate-600">{homestay.description}</p>
          </section>

          <section className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-sm sm:grid-cols-4">
            <div>
              <p className="text-slate-500">Khách tối đa</p>
              <p className="font-semibold text-slate-900">{homestay.maxGuests}</p>
            </div>
            <div>
              <p className="text-slate-500">Phòng ngủ</p>
              <p className="font-semibold text-slate-900">{homestay.bedrooms}</p>
            </div>
            <div>
              <p className="text-slate-500">Phòng tắm</p>
              <p className="font-semibold text-slate-900">{homestay.bathrooms}</p>
            </div>
            <div>
              <p className="text-slate-500">Giá</p>
              <p className="font-semibold text-slate-900">{formatPrice(homestay.pricePerNight)}</p>
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">Tiện nghi</h2>
            <ul className="flex flex-wrap gap-2">
              {homestay.amenities?.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-slate-900">Địa chỉ</h2>
            <p className="text-slate-600">
              {[address?.street, address?.ward, address?.district, address?.city]
                .filter(Boolean)
                .join(', ')}
            </p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <BookingForm homestay={homestay} />
        </aside>
      </div>
    </div>
  );
};

export default HomestayDetailPage;

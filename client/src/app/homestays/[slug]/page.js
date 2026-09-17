'use client';

import { use, useEffect, useState } from 'react';
import BookingForm from '@/components/BookingForm';
import Gallery from '@/components/Gallery';
import { apiFetch } from '@/lib/api';

const AMENITY_ICONS = {
  Wifi: 'M2 8a15 15 0 0 1 20 0M5.5 11.5a10 10 0 0 1 13 0M9 15a5 5 0 0 1 6 0M12 19h.01',
  'Ho boi': 'M2 16c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2M6 14V5a2 2 0 0 1 4 0M14 14V5a2 2 0 0 1 4 0',
  'Bep rieng': 'M4 3h16v8H4zM6 11v10M18 11v10M8 6h8',
  'Cho dau xe': 'M4 17V9l2-5h12l2 5v8M6 17v3M18 17v3M7 13h10',
};

const DEFAULT_ICON = 'M5 12h14M12 5v14';

const StatBlock = ({ label, value }) => (
  <div>
    <p className="text-sm text-ink-muted">{label}</p>
    <p className="text-lg font-semibold text-ink">{value}</p>
  </div>
);

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
    return <p className="mx-auto max-w-shell px-6 py-16 text-brand-600">{error}</p>;
  }

  if (!homestay) {
    return (
      <div className="mx-auto max-w-shell animate-pulse px-6 py-8">
        <div className="h-8 w-1/2 rounded bg-surface" />
        <div className="mt-5 h-[420px] w-full rounded-card bg-surface" />
      </div>
    );
  }

  const { address } = homestay;
  const fullAddress = [address?.street, address?.ward, address?.district, address?.city]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="mx-auto max-w-shell px-6 py-6">
      <h1 className="text-2xl font-semibold text-ink">{homestay.title}</h1>

      <div className="mb-4 mt-1 flex flex-wrap items-center gap-1 text-sm text-ink">
        {homestay.rating > 0 && (
          <>
            <span className="font-semibold">★ {homestay.rating.toFixed(1)}</span>
            <span className="text-ink-muted">· {homestay.reviewCount} đánh giá ·</span>
          </>
        )}
        <span className="font-medium underline">{fullAddress}</span>
      </div>

      <Gallery images={homestay.images} title={homestay.title} />

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <section className="flex flex-wrap gap-8 border-b border-line pb-8">
            <StatBlock label="Khách tối đa" value={homestay.maxGuests} />
            <StatBlock label="Phòng ngủ" value={homestay.bedrooms} />
            <StatBlock label="Phòng tắm" value={homestay.bathrooms} />
          </section>

          <section className="border-b border-line pb-8">
            <h2 className="mb-3 text-xl font-semibold text-ink">Giới thiệu về chỗ ở này</h2>
            <p className="leading-relaxed text-ink-soft">{homestay.description}</p>
          </section>

          <section className="border-b border-line pb-8">
            <h2 className="mb-4 text-xl font-semibold text-ink">Nơi này có những gì cho bạn</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {homestay.amenities?.map((item) => (
                <li key={item} className="flex items-center gap-4 text-ink-soft">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden="true">
                    <path
                      d={AMENITY_ICONS[item] || DEFAULT_ICON}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-ink">Nơi bạn sẽ đến</h2>
            <p className="text-ink-soft">{fullAddress}</p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <BookingForm homestay={homestay} />
        </aside>
      </div>
    </div>
  );
};

export default HomestayDetailPage;

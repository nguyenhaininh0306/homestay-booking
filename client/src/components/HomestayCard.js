'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/api';

const HeartButton = () => {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      aria-label={saved ? 'Bỏ lưu chỗ ở' : 'Lưu chỗ ở'}
      aria-pressed={saved}
      onClick={(event) => {
        event.preventDefault();
        setSaved((prev) => !prev);
      }}
      className="absolute right-3 top-3 z-10 transition hover:scale-110"
    >
      <svg viewBox="0 0 32 32" className="h-6 w-6 drop-shadow" aria-hidden="true">
        <path
          d="M16 28c7-4.7 12-9.6 12-15.3C28 8.3 24.9 5 21 5c-2.2 0-4 1-5 2.6C15 6 13.2 5 11 5 7.1 5 4 8.3 4 12.7 4 18.4 9 23.3 16 28Z"
          fill={saved ? '#e11d48' : 'rgba(0,0,0,0.45)'}
          stroke="#fff"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
};

const HomestayCard = ({ homestay }) => (
  <article className="group relative">
    <HeartButton />

    <Link href={`/homestays/${homestay.slug}`} className="block">
      <div className="relative aspect-card w-full overflow-hidden rounded-card bg-surface">
        {homestay.images?.[0] && (
          <Image
            src={homestay.images[0]}
            alt={homestay.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        )}
      </div>

      <div className="pt-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-semibold text-ink">
            {homestay.address?.district}, {homestay.address?.city}
          </h3>
          {homestay.rating > 0 && (
            <span className="flex shrink-0 items-center gap-1 text-sm text-ink">
              <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M8 0.6 10.2 5.2 15.2 6 11.6 9.6 12.5 14.6 8 12.2 3.5 14.6 4.4 9.6 0.8 6 5.8 5.2Z"
                />
              </svg>
              {homestay.rating.toFixed(1)}
            </span>
          )}
        </div>

        <p className="line-clamp-1 text-sm text-ink-muted">{homestay.title}</p>
        <p className="text-sm text-ink-muted">Tối đa {homestay.maxGuests} khách</p>
        <p className="pt-1 text-ink">
          <span className="font-semibold">{formatPrice(homestay.pricePerNight)}</span> / đêm
        </p>
      </div>
    </Link>
  </article>
);

export default HomestayCard;

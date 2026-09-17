import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/api';

const HomestayCard = ({ homestay }) => (
  <Link
    href={`/homestays/${homestay.slug}`}
    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-lg"
  >
    <div className="relative h-48 w-full bg-slate-100">
      {homestay.images?.[0] && (
        <Image
          src={homestay.images[0]}
          alt={homestay.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition group-hover:scale-105"
        />
      )}
    </div>

    <div className="space-y-2 p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="line-clamp-1 font-semibold text-slate-900">{homestay.title}</h3>
        <span className="shrink-0 text-sm text-amber-500">★ {homestay.rating?.toFixed(1)}</span>
      </div>
      <p className="text-sm text-slate-500">
        {homestay.address?.district}, {homestay.address?.city}
      </p>
      <p className="text-sm text-slate-500">Tối đa {homestay.maxGuests} khách</p>
      <p className="pt-1 font-semibold text-brand-600">
        {formatPrice(homestay.pricePerNight)}
        <span className="font-normal text-slate-500"> / đêm</span>
      </p>
    </div>
  </Link>
);

export default HomestayCard;

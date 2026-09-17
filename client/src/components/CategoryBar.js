'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const CATEGORIES = [
  { key: '', label: 'Tất cả', icon: 'M3 11 12 3l9 8M5 10v10h14V10' },
  { key: 'Đà Lạt', label: 'Đà Lạt', icon: 'M3 20h18L15 7l-4 7-2-3-6 9Z' },
  { key: 'Đà Nẵng', label: 'Đà Nẵng', icon: 'M3 16c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2M3 11h18l-9-7-9 7Z' },
  { key: 'Hà Nội', label: 'Hà Nội', icon: 'M4 21V9l8-6 8 6v12M9 21v-6h6v6' },
  { key: 'Ninh Bình', label: 'Ninh Bình', icon: 'M2 18h20M5 18V8l4-4 4 4v10M14 18v-6l3-3 3 3v6' },
  { key: 'Hồ Chí Minh', label: 'TP.HCM', icon: 'M3 21h18M6 21V7h5v14M13 21V11h5v10' },
  { key: 'Hội An', label: 'Hội An', icon: 'M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7Z' },
];

const CategoryBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('city') || '';

  const handleSelect = (key) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key) params.set('city', key);
    else params.delete('city');
    router.push(`/homestays${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <nav className="border-b border-line bg-white">
      <ul className="no-scrollbar mx-auto flex max-w-shell gap-8 overflow-x-auto px-6 py-3">
        {CATEGORIES.map((category) => {
          const isActive = active === category.key;

          return (
            <li key={category.label}>
              <button
                type="button"
                onClick={() => handleSelect(category.key)}
                aria-current={isActive ? 'true' : undefined}
                className={`flex min-w-[68px] flex-col items-center gap-1.5 border-b-2 pb-2 pt-1 text-xs font-medium transition ${
                  isActive
                    ? 'border-ink text-ink'
                    : 'border-transparent text-ink-muted hover:border-line hover:text-ink'
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    d={category.icon}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {category.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CategoryBar;

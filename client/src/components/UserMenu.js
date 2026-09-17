'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const MenuIcon = () => (
  <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
    <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M2 4h12M2 8h12M2 12h12" />
  </svg>
);

const AvatarIcon = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 text-ink-muted" aria-hidden="true">
    <path
      fill="currentColor"
      d="M16 .7C7.6.7.7 7.6.7 16S7.6 31.3 16 31.3 31.3 24.4 31.3 16 24.4.7 16 .7Zm0 4a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6Zm0 23.9a11.9 11.9 0 0 1-8.6-3.7c1.9-3.3 5.2-5.2 8.6-5.2s6.7 1.9 8.6 5.2a11.9 11.9 0 0 1-8.6 3.7Z"
    />
  </svg>
);

const UserMenu = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return undefined;
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    router.push('/');
  };

  const item = 'block w-full px-4 py-2.5 text-left text-sm text-ink transition hover:bg-surface';

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-3 rounded-pill border border-line py-1.5 pl-3 pr-1.5 text-ink transition hover:shadow-pill"
      >
        <MenuIcon />
        {user?.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <AvatarIcon />
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-60 overflow-hidden rounded-card border border-line bg-white py-2 shadow-panel"
        >
          {isAuthenticated ? (
            <>
              <p className="px-4 pb-2 pt-1 text-sm font-semibold text-ink">{user.name}</p>
              <Link href="/bookings" onClick={() => setOpen(false)} className={item}>
                Chuyến đi của tôi
              </Link>
              <Link href="/homestays" onClick={() => setOpen(false)} className={item}>
                Khám phá chỗ ở
              </Link>
              <hr className="my-2 border-line" />
              <button type="button" onClick={handleLogout} className={item}>
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className={`${item} font-semibold`}
              >
                Đăng ký
              </Link>
              <Link href="/login" onClick={() => setOpen(false)} className={item}>
                Đăng nhập
              </Link>
              <hr className="my-2 border-line" />
              <Link href="/homestays" onClick={() => setOpen(false)} className={item}>
                Khám phá chỗ ở
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;

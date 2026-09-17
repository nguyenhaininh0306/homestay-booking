'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-brand-600">
          Homestay<span className="text-slate-900">Viet</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/homestays" className="text-slate-600 hover:text-brand-600">
            Khám phá
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/bookings" className="text-slate-600 hover:text-brand-600">
                Đơn của tôi
              </Link>
              <span className="hidden font-medium text-slate-700 sm:inline">{user.name}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-slate-700 transition hover:bg-slate-50"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-slate-600 hover:text-brand-600">
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-brand-600 px-4 py-1.5 font-medium text-white transition hover:bg-brand-700"
              >
                Đăng ký
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

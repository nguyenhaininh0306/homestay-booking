'use client';

import Link from 'next/link';
import Logo from './Logo';
import SearchPill from './SearchPill';
import UserMenu from './UserMenu';

const Header = () => (
  <header className="sticky top-0 z-40 border-b border-line bg-white">
    <div className="mx-auto flex h-20 max-w-shell items-center justify-between gap-4 px-6">
      <Logo />

      <div className="flex flex-1 justify-center">
        <SearchPill />
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Link
          href="/register"
          className="hidden rounded-pill px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-chip lg:block"
        >
          Cho thuê chỗ ở
        </Link>
        <UserMenu />
      </div>
    </div>
  </header>
);

export default Header;

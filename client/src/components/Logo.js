import Link from 'next/link';

const Logo = () => (
  <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="airkido - trang chủ">
    <svg viewBox="0 0 32 32" className="h-8 w-8 text-brand-600" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 2.6c2.1 0 3.9 1.2 5.2 3.6l5.6 10.6c1.6 3 2.2 4.8 2.2 6.4 0 3.4-2.4 5.8-5.7 5.8-2.1 0-4.3-1-6.3-3-.4-.4-.7-.7-1-1.1-.3.4-.6.7-1 1.1-2 2-4.2 3-6.3 3-3.3 0-5.7-2.4-5.7-5.8 0-1.6.6-3.4 2.2-6.4L10.8 6.2C12.1 3.8 13.9 2.6 16 2.6Zm0 2.6c-1.1 0-2 .7-2.9 2.4L7.5 18.2c-1.4 2.6-1.9 4.1-1.9 5.2 0 2 1.3 3.3 3.2 3.3 1.5 0 3.1-.8 4.7-2.4.5-.5.9-1 1.3-1.5-1.8-2.3-2.8-4.2-2.8-6 0-2.5 1.7-4.3 4-4.3s4 1.8 4 4.3c0 1.8-1 3.7-2.8 6 .4.5.8 1 1.3 1.5 1.6 1.6 3.2 2.4 4.7 2.4 1.9 0 3.2-1.3 3.2-3.3 0-1.1-.5-2.6-1.9-5.2L18.9 7.6C18 5.9 17.1 5.2 16 5.2Zm0 9.6c-.9 0-1.5.7-1.5 1.8 0 1.1.5 2.3 1.5 3.7 1-1.4 1.5-2.6 1.5-3.7 0-1.1-.6-1.8-1.5-1.8Z"
      />
    </svg>
    <span className="hidden text-xl font-bold tracking-tight text-brand-600 md:block">airkido</span>
  </Link>
);

export default Logo;

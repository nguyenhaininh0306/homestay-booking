import Link from 'next/link';

const COLUMNS = [
  {
    title: 'Hỗ trợ',
    links: ['Trung tâm trợ giúp', 'Thông tin an toàn', 'Hỗ trợ người khuyết tật', 'Tùy chọn hủy'],
  },
  {
    title: 'Đón tiếp khách',
    links: ['Cho thuê chỗ ở', 'Bảo hiểm cho chủ nhà', 'Tài nguyên chủ nhà', 'Diễn đàn cộng đồng'],
  },
  {
    title: 'airkido',
    links: ['Trang tin tức', 'Tính năng mới', 'Cơ hội nghề nghiệp', 'Nhà đầu tư'],
  },
];

const Footer = () => (
  <footer className="mt-16 border-t border-line bg-surface">
    <div className="mx-auto max-w-shell px-6 py-12">
      <div className="grid gap-8 sm:grid-cols-3">
        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="mb-3 font-semibold text-ink">{column.title}</h3>
            <ul className="space-y-2.5">
              {column.links.map((link) => (
                <li key={link}>
                  <span className="text-sm text-ink-soft">{link}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} airkido · Dự án học tập</p>
        <nav className="flex gap-4">
          <Link href="/homestays" className="hover:underline">
            Khám phá
          </Link>
          <Link href="/bookings" className="hover:underline">
            Chuyến đi
          </Link>
        </nav>
      </div>
    </div>
  </footer>
);

export default Footer;

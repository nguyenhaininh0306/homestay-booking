const Footer = () => (
  <footer className="mt-16 border-t border-slate-200 bg-slate-50">
    <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
      <p className="font-semibold text-slate-700">HomestayViet</p>
      <p className="mt-1">Nền tảng đặt phòng homestay trên khắp Việt Nam.</p>
      <p className="mt-4">© {new Date().getFullYear()} HomestayViet. Dự án học tập.</p>
    </div>
  </footer>
);

export default Footer;

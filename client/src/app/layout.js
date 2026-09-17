import { Inter } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/context/AppProviders';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'airkido - Đặt phòng homestay khắp Việt Nam',
  description:
    'Tìm và đặt homestay đẹp, giá tốt tại Đà Lạt, Đà Nẵng, Hà Nội, Ninh Bình và nhiều nơi khác.',
};

const RootLayout = ({ children }) => (
  <html lang="vi" className={inter.variable}>
    <body>
      <AppProviders>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </AppProviders>
    </body>
  </html>
);

export default RootLayout;

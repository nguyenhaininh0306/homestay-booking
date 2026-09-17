import './globals.css';
import { AppProviders } from '@/context/AppProviders';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'HomestayViet - Đặt phòng homestay khắp Việt Nam',
  description: 'Tìm và đặt homestay đẹp, giá tốt tại Đà Lạt, Đà Nẵng, Hà Nội, Ninh Bình...',
};

const RootLayout = ({ children }) => (
  <html lang="vi">
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

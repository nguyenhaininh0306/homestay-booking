import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Homestay from '../models/Homestay.js';
import Booking from '../models/Booking.js';

const homestays = [
  {
    title: 'Rusty House Da Lat - View doi thong',
    slug: 'rusty-house-da-lat',
    description: 'Homestay go am cung nam tren doi thong, ban cong nhin toan canh thanh pho.',
    images: ['https://picsum.photos/seed/dalat1/800/600', 'https://picsum.photos/seed/dalat2/800/600'],
    pricePerNight: 850000,
    address: { street: '12 Trieu Viet Vuong', ward: 'Phuong 4', district: 'Da Lat', city: 'Lam Dong' },
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['Wifi', 'Bep rieng', 'Cho dau xe', 'May suoi'],
    rating: 4.8,
    reviewCount: 124,
  },
  {
    title: 'Sea Breeze Homestay Da Nang',
    slug: 'sea-breeze-da-nang',
    description: 'Cach bai bien My Khe 200m, phong rong thoang, phu hop nhom ban.',
    images: ['https://picsum.photos/seed/danang1/800/600'],
    pricePerNight: 650000,
    address: { street: '45 Vo Nguyen Giap', ward: 'Phuoc My', district: 'Son Tra', city: 'Da Nang' },
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['Wifi', 'Dieu hoa', 'Ho boi', 'Gan bien'],
    rating: 4.6,
    reviewCount: 88,
  },
  {
    title: 'Old Quarter Loft Ha Noi',
    slug: 'old-quarter-loft-ha-noi',
    description: 'Can ho loft giua pho co, di bo den Ho Guom 5 phut.',
    images: ['https://picsum.photos/seed/hanoi1/800/600'],
    pricePerNight: 720000,
    address: { street: '28 Hang Bac', ward: 'Hang Bac', district: 'Hoan Kiem', city: 'Ha Noi' },
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Wifi', 'Dieu hoa', 'Thang may'],
    rating: 4.7,
    reviewCount: 201,
  },
  {
    title: 'Tam Coc Garden Bungalow',
    slug: 'tam-coc-garden-bungalow',
    description: 'Bungalow giua canh dong lua, yen tinh, thich hop nghi duong.',
    images: ['https://picsum.photos/seed/ninhbinh1/800/600'],
    pricePerNight: 950000,
    address: { street: 'Thon Van Lam', ward: 'Ninh Hai', district: 'Hoa Lu', city: 'Ninh Binh' },
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Wifi', 'Bua sang', 'Xe dap', 'Ho boi'],
    rating: 4.9,
    reviewCount: 57,
  },
];

const run = async () => {
  await connectDB();

  await Promise.all([User.deleteMany({}), Homestay.deleteMany({}), Booking.deleteMany({})]);

  const host = await User.create({
    name: 'Chu nha demo',
    email: 'host@homestay.vn',
    password: '123456',
    role: 'host',
  });
  await User.create({
    name: 'Khach demo',
    email: 'user@homestay.vn',
    password: '123456',
  });

  await Homestay.insertMany(homestays.map((h) => ({ ...h, host: host._id })));

  console.log(`Da tao ${homestays.length} homestay + 2 tai khoan demo (mat khau: 123456)`);
  await mongoose.disconnect();
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

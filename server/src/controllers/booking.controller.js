import Booking from '../models/Booking.js';
import Homestay from '../models/Homestay.js';
import { ApiError, asyncHandler } from '../utils/ApiError.js';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const createBooking = asyncHandler(async (req, res) => {
  const { homestayId, checkIn, checkOut, guests, note } = req.body;

  const homestay = await Homestay.findById(homestayId);
  if (!homestay) throw new ApiError(404, 'Khong tim thay homestay');

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
    throw new ApiError(400, 'Ngay nhan/tra phong khong hop le');
  }
  if (guests > homestay.maxGuests) {
    throw new ApiError(400, `Homestay chi nhan toi da ${homestay.maxGuests} khach`);
  }

  const conflict = await Booking.findOne({
    homestay: homestayId,
    status: { $in: ['pending', 'confirmed'] },
    checkIn: { $lt: end },
    checkOut: { $gt: start },
  });
  if (conflict) throw new ApiError(409, 'Homestay da co nguoi dat trong khoang thoi gian nay');

  const nights = Math.round((end - start) / MS_PER_DAY);
  const booking = await Booking.create({
    homestay: homestayId,
    user: req.user._id,
    checkIn: start,
    checkOut: end,
    guests,
    nights,
    totalPrice: nights * homestay.pricePerNight,
    note,
  });

  res.status(201).json({ success: true, data: booking });
});

export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('homestay', 'title slug images pricePerNight address')
    .sort({ createdAt: -1 });
  res.json({ success: true, data: bookings });
});

export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('homestay');
  if (!booking) throw new ApiError(404, 'Khong tim thay don dat phong');
  if (String(booking.user) !== String(req.user._id) && req.user.role !== 'admin') {
    throw new ApiError(403, 'Khong co quyen xem don nay');
  }
  res.json({ success: true, data: booking });
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new ApiError(404, 'Khong tim thay don dat phong');
  if (String(booking.user) !== String(req.user._id) && req.user.role !== 'admin') {
    throw new ApiError(403, 'Khong co quyen huy don nay');
  }
  if (booking.status === 'completed') throw new ApiError(400, 'Don da hoan thanh, khong the huy');

  booking.status = 'cancelled';
  await booking.save();
  res.json({ success: true, data: booking });
});

import Homestay from '../models/Homestay.js';
import { ApiError, asyncHandler } from '../utils/ApiError.js';

export const getHomestays = asyncHandler(async (req, res) => {
  const { city, minPrice, maxPrice, guests, keyword, page = 1, limit = 12 } = req.query;

  const filter = { isActive: true };
  if (city) filter['address.city'] = new RegExp(city, 'i');
  if (guests) filter.maxGuests = { $gte: Number(guests) };
  if (minPrice || maxPrice) {
    filter.pricePerNight = {};
    if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
    if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
  }
  if (keyword) filter.title = new RegExp(keyword, 'i');

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Homestay.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Homestay.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: items,
    pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) },
  });
});

export const getHomestayBySlug = asyncHandler(async (req, res) => {
  const homestay = await Homestay.findOne({ slug: req.params.slug }).populate('host', 'name avatar');
  if (!homestay) throw new ApiError(404, 'Khong tim thay homestay');
  res.json({ success: true, data: homestay });
});

export const createHomestay = asyncHandler(async (req, res) => {
  const homestay = await Homestay.create({ ...req.body, host: req.user._id });
  res.status(201).json({ success: true, data: homestay });
});

export const updateHomestay = asyncHandler(async (req, res) => {
  const homestay = await Homestay.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!homestay) throw new ApiError(404, 'Khong tim thay homestay');
  res.json({ success: true, data: homestay });
});

export const deleteHomestay = asyncHandler(async (req, res) => {
  const homestay = await Homestay.findByIdAndDelete(req.params.id);
  if (!homestay) throw new ApiError(404, 'Khong tim thay homestay');
  res.json({ success: true, message: 'Da xoa homestay' });
});

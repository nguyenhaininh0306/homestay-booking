import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ApiError, asyncHandler } from '../utils/ApiError.js';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

const toPublicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  avatar: user.avatar,
  role: user.role,
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (await User.findOne({ email })) throw new ApiError(409, 'Email da duoc su dung');

  const user = await User.create({ name, email, password, phone });
  res.status(201).json({
    success: true,
    data: { user: toPublicUser(user), token: signToken(user._id) },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Email hoac mat khau khong dung');
  }

  res.json({ success: true, data: { user: toPublicUser(user), token: signToken(user._id) } });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, data: toPublicUser(req.user) });
});

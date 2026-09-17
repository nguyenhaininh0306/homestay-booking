import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
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
  authProvider: user.authProvider,
});

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
  if (!user) throw new ApiError(401, 'Email hoac mat khau khong dung');

  if (!user.password) {
    throw new ApiError(400, 'Tai khoan nay dang ky bang Google, vui long dang nhap bang Google');
  }
  if (!(await user.comparePassword(password))) {
    throw new ApiError(401, 'Email hoac mat khau khong dung');
  }

  res.json({ success: true, data: { user: toPublicUser(user), token: signToken(user._id) } });
});

export const googleLogin = asyncHandler(async (req, res) => {
  const { credential } = req.body;
  if (!credential) throw new ApiError(400, 'Thieu Google credential');
  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new ApiError(500, 'Server chua cau hinh GOOGLE_CLIENT_ID');
  }

  let payload;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch {
    throw new ApiError(401, 'Google token khong hop le hoac da het han');
  }

  if (!payload?.email_verified) {
    throw new ApiError(401, 'Email Google chua duoc xac thuc');
  }

  const { sub: googleId, email, name, picture } = payload;

  let user = await User.findOne({ $or: [{ googleId }, { email }] });

  if (!user) {
    user = await User.create({
      googleId,
      email,
      name: name || email.split('@')[0],
      avatar: picture || '',
      authProvider: 'google',
    });
  } else if (!user.googleId) {
    // Email da dang ky bang mat khau truoc do -> lien ket them Google vao tai khoan cu
    user.googleId = googleId;
    if (!user.avatar && picture) user.avatar = picture;
    await user.save();
  }

  res.json({ success: true, data: { user: toPublicUser(user), token: signToken(user._id) } });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, data: toPublicUser(req.user) });
});

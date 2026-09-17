import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, googleLogin, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Vui long nhap ho ten'),
    body('email').isEmail().withMessage('Email khong hop le'),
    body('password').isLength({ min: 6 }).withMessage('Mat khau toi thieu 6 ky tu'),
  ],
  validate,
  register
);

router.post(
  '/login',
  [body('email').isEmail().withMessage('Email khong hop le'), body('password').notEmpty()],
  validate,
  login
);

router.post(
  '/google',
  [body('credential').notEmpty().withMessage('Thieu Google credential')],
  validate,
  googleLogin
);

router.get('/me', protect, getMe);

export default router;

import { Router } from 'express';
import { body } from 'express-validator';
import {
  getHomestays,
  getHomestayBySlug,
  createHomestay,
  updateHomestay,
  deleteHomestay,
} from '../controllers/homestay.controller.js';
import { protect, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

router.get('/', getHomestays);
router.get('/:slug', getHomestayBySlug);

router.post(
  '/',
  protect,
  authorize('host', 'admin'),
  [
    body('title').trim().notEmpty().withMessage('Vui long nhap ten homestay'),
    body('slug').trim().notEmpty().withMessage('Vui long nhap slug'),
    body('pricePerNight').isFloat({ min: 0 }).withMessage('Gia phong khong hop le'),
    body('address.city').trim().notEmpty().withMessage('Vui long nhap thanh pho'),
  ],
  validate,
  createHomestay
);

router.put('/:id', protect, authorize('host', 'admin'), updateHomestay);
router.delete('/:id', protect, authorize('host', 'admin'), deleteHomestay);

export default router;

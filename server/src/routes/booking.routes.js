import { Router } from 'express';
import { body } from 'express-validator';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
} from '../controllers/booking.controller.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

router.use(protect);

router.post(
  '/',
  [
    body('homestayId').isMongoId().withMessage('Homestay khong hop le'),
    body('checkIn').isISO8601().withMessage('Ngay nhan phong khong hop le'),
    body('checkOut').isISO8601().withMessage('Ngay tra phong khong hop le'),
    body('guests').isInt({ min: 1 }).withMessage('So khach khong hop le'),
  ],
  validate,
  createBooking
);

router.get('/me', getMyBookings);
router.get('/:id', getBookingById);
router.patch('/:id/cancel', cancelBooking);

export default router;

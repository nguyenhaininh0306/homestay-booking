import { Router } from 'express';
import authRoutes from './auth.routes.js';
import homestayRoutes from './homestay.routes.js';
import bookingRoutes from './booking.routes.js';

const router = Router();

router.get('/health', (req, res) => res.json({ success: true, message: 'API dang chay' }));
router.use('/auth', authRoutes);
router.use('/homestays', homestayRoutes);
router.use('/bookings', bookingRoutes);

export default router;

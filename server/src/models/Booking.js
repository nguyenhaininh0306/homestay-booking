import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    homestay: { type: mongoose.Schema.Types.ObjectId, ref: 'Homestay', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true, min: 1 },
    nights: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    note: { type: String, default: '' },
  },
  { timestamps: true }
);

bookingSchema.index({ homestay: 1, checkIn: 1, checkOut: 1 });

export default mongoose.model('Booking', bookingSchema);

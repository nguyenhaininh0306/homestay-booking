import mongoose from 'mongoose';

const homestaySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: '' },
    images: [{ type: String }],
    pricePerNight: { type: Number, required: true, min: 0 },
    address: {
      street: { type: String, default: '' },
      ward: { type: String, default: '' },
      district: { type: String, default: '' },
      city: { type: String, required: true },
    },
    maxGuests: { type: Number, required: true, min: 1, default: 2 },
    bedrooms: { type: Number, default: 1 },
    bathrooms: { type: Number, default: 1 },
    amenities: [{ type: String }],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

homestaySchema.index({ title: 'text', description: 'text', 'address.city': 'text' });

export default mongoose.model('Homestay', homestaySchema);

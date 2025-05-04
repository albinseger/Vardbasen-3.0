import mongoose, { Schema } from 'mongoose';

const AdSchema = new Schema({
  companyName: String,
  title: String,
  description: String,
  location: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Ad || mongoose.model('Ad', AdSchema); 
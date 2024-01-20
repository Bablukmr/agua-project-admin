
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String
});

export const Product = mongoose.models.banner || mongoose.model('banner', ProductSchema);

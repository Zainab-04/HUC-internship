import mongoose, { Schema, model, models } from 'mongoose';

const BlogSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true }, // Image URL
  content: { type: String, required: true },
  userId: { type: String, required: true }, // To identify the owner
}, { timestamps: true });

export const Blog = models.Blog || model('Blog', BlogSchema);
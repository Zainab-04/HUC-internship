import Post from "@/models/Post"; 
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  image: String,
  userId: String,
}, { timestamps: true });

// ✅ prevent overwrite error
export default mongoose.models.Post || mongoose.model("Post", PostSchema);
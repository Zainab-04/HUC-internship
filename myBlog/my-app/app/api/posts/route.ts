// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import Post from "@/models/Post"; // ✅ make sure this is default export
// import mongoose from "mongoose";

// // GET single post by ID
// export async function GET(
//   req: Request,
//   context: { params: { id: string } }
// ) {
//   try {
//     await connectDB();

//     // ✅ FIX 1: unwrap params (NEW Next.js)
//     const { id } = await context.params;

//     console.log("Incoming ID:", id); // 🔍 debug

//     // ✅ FIX 2: prevent crash for invalid IDs
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json(
//         { error: "Invalid post ID" },
//         { status: 400 }
//       );
//     }

//     // ✅ FIX 3: fetch post
//     const post = await Post.findById(id);

//     if (!post) {
//       return NextResponse.json(
//         { error: "Post not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(post, { status: 200 });

//   } catch (error) {
//     console.error("GET ERROR:", error); // 🔥 important for debugging
//     return NextResponse.json(
//       { error: "Failed to fetch post" },
//       { status: 500 }
//     );
//   }
// }

// // DELETE post
// export async function DELETE(
//   req: Request,
//   context: { params: { id: string } }
// ) {
//   try {
//     await connectDB();

//     const { id } = await context.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json(
//         { error: "Invalid post ID" },
//         { status: 400 }
//       );
//     }

//     const deletedPost = await Post.findByIdAndDelete(id);

//     if (!deletedPost) {
//       return NextResponse.json(
//         { error: "Post not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Post deleted successfully" },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("DELETE ERROR:", error);
//     return NextResponse.json(
//       { error: "Failed to delete post" },
//       { status: 500 }
//     );
//   }
// }

// // UPDATE post
// export async function PUT(
//   req: Request,
//   context: { params: { id: string } }
// ) {
//   try {
//     await connectDB();

//     const { id } = await context.params;
//     const body = await req.json();

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json(
//         { error: "Invalid post ID" },
//         { status: 400 }
//       );
//     }

//     const updatedPost = await Post.findByIdAndUpdate(
//       id,
//       body,
//       { new: true }
//     );

//     if (!updatedPost) {
//       return NextResponse.json(
//         { error: "Post not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(updatedPost, { status: 200 });

//   } catch (error) {
//     console.error("PUT ERROR:", error);
//     return NextResponse.json(
//       { error: "Failed to update post" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
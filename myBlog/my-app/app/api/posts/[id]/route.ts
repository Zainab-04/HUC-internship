// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import Post from "@/models/Post";

// export async function GET(
//   req: Request,
//   context: { params: { id: string } }
// ) {
//   try {
//     await connectDB();

//     // ✅ FIX: unwrap params properly
//     const { id } = await context.params;

//     const post = await Post.findById(id);

//     if (!post) {
//       return NextResponse.json(
//         { error: "Post not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(post);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    // ✅ CORRECT PLACE
    console.log("Incoming ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.log("ERROR:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
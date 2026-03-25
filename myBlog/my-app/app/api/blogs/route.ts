import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Blog } from '@/models/Blog';

export async function GET() {
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return NextResponse.json(
    blogs.map((blog) => ({
        ...blog.toObject(),
        _id: blog._id.toString(),
    }))
  );
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newBlog = await Blog.create(body);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
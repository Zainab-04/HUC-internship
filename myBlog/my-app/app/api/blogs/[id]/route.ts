import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Blog } from '@/models/Blog';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const updated = await Blog.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Blog.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}
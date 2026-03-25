"use client";
import { useRouter } from 'next/navigation';

interface PostProps {
  post: { _id: string; title: string; content: string; createdAt: string };
}

export default function BlogCard({ post }: PostProps) {
  const router = useRouter();

  return (
    <div 
      onClick={() => router.push(`/dashboard/blog/${post._id}`)}
      className="group cursor-pointer bg-white rounded-3xl border border-slate-200 p-6 transition-all hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100"
    >
        console.log("POST DATA:", post);
      <div className="aspect-video w-full bg-slate-100 rounded-2xl mb-4 overflow-hidden">
        {/* Placeholder for Blog Image */}
        <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-slate-200 group-hover:scale-110 transition-transform duration-500" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
        {post.title}
      </h3>
      <p className="text-slate-500 line-clamp-2 mt-2 text-sm">
        {post.content}
      </p>
      <div className="mt-4 flex items-center text-xs font-semibold text-indigo-600">
        Read Full Story →
      </div>
    </div>
  );
}
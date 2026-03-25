"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function BlogDetails({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/blogs/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div className="p-20 text-center">Loading story...</div>;
  if (!post) return <div className="p-20 text-center">Post not found.</div>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <article className="max-w-3xl mx-auto py-12 px-6">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={18} /> Back to Feed
        </button>

        {/* Header Section */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Technology
            </span>
            <span className="text-slate-400 text-sm flex items-center gap-1">
              <Calendar size={14} /> {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            {post.title}
          </h1>
        </header>

        {/* Featured Image */}
        <div className="w-full h-[400px] bg-slate-100 rounded-[2.5rem] mb-10 overflow-hidden shadow-2xl shadow-indigo-100">
           <div className="w-full h-full bg-gradient-to-tr from-slate-200 to-indigo-100" />
        </div>

        {/* Content Body */}
        <div className="prose prose-indigo prose-lg max-w-none text-slate-700 leading-relaxed italic border-l-4 border-indigo-100 pl-6 mb-10">
          {/* Using a simple paragraph here, but you could use a Markdown renderer */}
          {post.content}
        </div>

        {/* Author Footer */}
        <footer className="pt-10 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
              {post.userId?.slice(-1).toUpperCase() || "A"}
            </div>
            <div>
              <p className="font-bold text-slate-900">Author ID: {post.userId}</p>
              <p className="text-sm text-slate-500">Contributor</p>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}
"use client";
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Pencil, Trash2, Plus, Image as ImageIcon } from 'lucide-react';

export default function MyBlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', category: '', image: '', content: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    setBlogs(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/blogs/${editingId}` : '/api/blogs';
    
    // Get userId from localStorage (from our previous auth step)
    const userId = localStorage.getItem('userId');

    await fetch(url, {
      method,
      body: JSON.stringify({ ...form, userId }),
    });

    setForm({ title: '', category: '', image: '', content: '' });
    setEditingId(null);
    setLoading(false);
    fetchBlogs();
  };

  const deleteBlog = async (id: string) => {
    if (confirm("Delete this post?")) {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      fetchBlogs();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FORM SECTION */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-grey p-6 rounded-3xl shadow-sm border border-slate-200 sticky top-24">
            <h2 className="text-xl font-bold mb-4 flex text-black items-center gap-2">
              {editingId ? <Pencil size={20}/> : <Plus size={20}/>}
              {editingId ? 'Edit Post' : 'Create New Post'}
            </h2>
            
            {/* Image Preview */}
            {form.image && (
              <img src={form.image} alt="Preview" className="w-full h-32 text-black object-cover rounded-xl mb-4" />
            )}

            <input placeholder="Title" className="w-full p-3 mb-3 text-black bg-slate-50 rounded-xl outline-1 focus:ring-2 focus:ring-indigo-500" 
              value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
            
            <select className="w-full p-3 mb-3 bg-black-50 rounded-xl text-black outline-none"
              value={form.category} onChange={e => setForm({...form, category: e.target.value})} required>
              <option value="">Select Category</option>
              <option value="Tech">Tech</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Design">Design</option>
            </select>

            <input placeholder="Image URL" className="w-full p-3 mb-3 bg-black-50 rounded-xl text-black outline-1"
              value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />

            <textarea placeholder="Content..." className="w-full p-3 text-black h-32 mb-4 bg-slate-50 rounded-xl outline-1 resize-none"
              value={form.content} onChange={e => setForm({...form, content: e.target.value})} required />

            <button disabled={loading} className="w-full py-3 text-black bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
              {loading ? 'Saving...' : editingId ? 'Update Post' : 'Publish Post'}
            </button>
            {editingId && <button onClick={() => {setEditingId(null); setForm({title:'', category:'', image:'', content:''})}} className="w-full mt-2 text-slate-400 text-sm">Cancel Edit</button>}
          </form>
        </div>

        {/* LIST SECTION */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Your Published Stories</h2>
          {blogs.map((blog: any) => (
            <div key={blog._id} className="bg-white p-4 rounded-3xl border border-slate-200 flex gap-4 items-center group">
              <img src={blog.image} className="w-24 h-24 object-cover rounded-2xl" alt="thumb" />
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">{blog.category}</span>
                <h3 className="font-bold text-slate-800 line-clamp-1">{blog.title}</h3>
                <p className="text-black-500 text-sm line-clamp-1">{blog.content}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => {setForm(blog); setEditingId(blog._id)}} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Pencil size={18}/></button>
                <button onClick={() => deleteBlog(blog._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// import Navbar from '@/components/Navbar';
// import BlogCard from '@/components/BlogCard'; // Assuming the card component we built earlier

// async function getBlogs() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/blogs`, { cache: 'no-store' });
//   return res.json();
// }

// export default async function HomePage() {
//   const blogs = await getBlogs();

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="mb-12 text-center">
//           <h1 className="text-5xl font-extrabold text-slate-900 mb-4 italic">The Modern Feed</h1>
//           <p className="text-slate-500 max-w-lg mx-auto">Discover stories, thinking, and expertise from writers on any topic.</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogs.map((blog: any) => (
//             <BlogCard key={blog._id} post={blog} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
}
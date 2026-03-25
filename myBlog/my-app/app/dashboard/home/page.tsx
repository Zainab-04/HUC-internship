"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const router = useRouter();

  const blogs = [
    { _id:"1", title: "Explore Mountains", category: "Tour", image: "https://img.freepik.com/premium-photo/vertical-shot-tourists-traveling-boats-ninh-binh-viet_665346-43475.jpg?w=360" },
    { _id: "2", title: "Football Trends", category: "Sports", image: "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/ngdjbafv3twathukjbq2" },
    { _id: "3", title: "Swimming Tips", category: "Swimming", image: "https://hips.hearstapps.com/hmg-prod/images/female-swimmer-at-the-swimming-pool-royalty-free-image-1568376387.jpg" },
    { _id: "4", title: "Latest Jobs 2026", category: "Job", image: "https://digitallearning.eletsonline.com/wp-content/uploads/2016/10/7-million-jobs-can-disappear-by-2050-Study.jpg" },
    { _id: "5", title: "Tech Innovations", category: "Technology", image: "https://www.aiu.edu/wp-content/uploads/2024/07/shutterstock-business-technology.jpg" },
    { _id: "6", title: "Healthy Food", category: "Food", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0v1xtAY7CF9yxo42wQUR4o_5Vuo98VX17AQ&s" },
    { _id: "7", title: "Beach Travel", category: "Tour", image: "https://thumbs.dreamstime.com/b/ocean-beach-sunrise-colorful-75364306.jpg" },
    { _id: "8", title: "Cricket World", category: "Sports", image: "https://cdn.britannica.com/63/211663-050-A674D74C/Jonny-Bairstow-batting-semifinal-match-England-Australia-2019.jpg" },
    { _id: "9", title: "Pool Training", category: "Swimming", image: "https://natare.com/wp-content/uploads/2022/06/IU-Bulkheads-scaled-e1660594383851.jpg" },
    { _id: "10", title: "Career Growth", category: "Job", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfWkL12Wg0Jcr5GqxucT6ykjFhpW5IzT4Mvg&s" },
    { _id: "11", title: "AI Future", category: "Technology", image: "https://techparley.com/wp-content/uploads/2025/10/IMG_6845.webp" },
    { _id: "12", title: "Street Food", category: "Food", image: "https://blog.swiggy.com/wp-content/uploads/2024/10/Image1_Pani-Puri-1024x538.jpg" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="px-6 py-10">
        <h1 className="text-3xl text-rose-600 font-bold mb-6">Dashboard Feed</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => router.push(`/dashboard/blog/${blog.id}`)}
              className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300 overflow-hidden"
            >
              <img src={blog.image} className="w-full h-40 object-cover" />

              <div className="p-4">
                <span className="text-sm text-rose-600 font-medium">
                  {blog.category}
                </span>

                <h2 className="text-lg text-neutral-700 font-semibold mt-1">
                  {blog.title}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  Discover more about {blog.category.toLowerCase()}...
                </p>
                console.log("BLOGS:", blogs);
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
"use client";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, LogOut, Feather } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    router.push("/login");
  };

  const navLinks = [
    { name: 'Home', href: '/dashboard/home', icon: <LayoutDashboard size={18} /> },
    { name: 'My Blog', href: '/my-blog', icon: <BookOpen size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* LOGO */}
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="bg-pink-800 p-1.5 rounded-lg text-white group-hover:rotate-12 transition-transform">
              <Feather size={20} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-pink-950 bg-clip-text text-transparent">
              ModernBlog
            </span>
          </Link>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-indigo-600 ${
                    isActive ? "text-pink-800" : "text-slate-500"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* LOGOUT BUTTON */}
          <div className="flex items-center border-l border-slate-200 pl-6 ml-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-all active:scale-95"
            >
              <LogOut size={18} className="text-slate-400" />
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
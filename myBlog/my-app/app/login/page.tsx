"use client";
import React, { useState } from 'react';
import { Eye, EyeOff, Github, Globe, Facebook, Apple } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

    try {
      const res = await fetch(
        mode === "login" ? "/api/login" : "/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: (e.target as any)[0].value,
            password: (e.target as any)[1].value,
          }),
        }
      );

      const data = await res.json();

      if (data?.user?._id) {
        localStorage.setItem("userId", data.user._id);
        router.push("/dashboard/home"); // ✅ redirect works
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setIsLoading(false);
  };
  return (
    <div className="h-screen w-full bg-[#f3f4f6] flex items-center justify-center p-4 md:p-10 font-sans">
      <div className="h-screen bg-white w-full  rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white">
        
        {/* LEFT SIDE: FORM */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {mode === 'login' ? 'Hello Again!' : 'Create Account'}
            </h1>
            <p className="text-gray-500 text-sm">
              {mode === 'login' 
                ? "Let's get started with your 30 days trial" 
                : "Join us today and start your journey"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-5 py-4 bg-[#f9fafb] rounded-2xl 
                        text-gray-900 placeholder:text-gray-400 
                        border-none focus:ring-2 focus:ring-[#c54764] 
                        outline-none transition-all"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-5 py-4 bg-[#f9fafb] rounded-2xl 
                    text-gray-900 placeholder:text-gray-400 
                    border-none focus:ring-2 focus:ring-[#c54764] 
                    outline-none transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {mode === 'signup' && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-5 py-4 bg-[#f9fafb] rounded-2xl border-none focus:ring-2 focus:ring-rose-200 outline-none transition-all placeholder:text-gray-400"
              />
            )}

            {mode === 'login' && (
              <div className="text-right">
                <button type="button" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                  Recovery Password
                </button>
              </div>
            )}

            <button
              disabled={isLoading}
              className="w-full py-4 bg-[#c54764] text-white rounded-2xl font-semibold shadow-lg shadow-rose-900/20 hover:bg-[#7a5860] active:scale-[0.98] transition-all flex justify-center items-center"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                mode === 'login' ? 'Sign In' : 'Sign Up'
              )}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-400 font-medium">Or continue with</span>
            </div>
          </div>

          {/* SOCIAL BUTTONS */}
          <div className="flex justify-center gap-4">
            <SocialBtn icon={<Globe className="text-red-500" />} />
            <SocialBtn icon={<Apple className="text-black" />} />
            <SocialBtn icon={<Facebook className="text-blue-600" />} />
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="font-bold text-gray-900 hover:underline"
            >
              {mode === 'login' ? 'Register now' : 'Login here'}
            </button>
          </p>
        </div>

        {/* RIGHT SIDE: VISUAL SECTION */}
        <div className="hidden md:block w-1/2 p-6">
          <div className="relative h-full w-full rounded-[2rem] overflow-hidden">
            <img src="https://tbwpfiles.s3.eu-west-2.amazonaws.com/wp-content/uploads/2022/09/01214822/Blogging-Platforms.jpeg" alt="Blog" className="w-full h-full object-cover"/>
            {/* Minimal SVG Illustration Elements (Sunset Circle) */}
            <div className="absolute inset-0 bg-[#916972]/40"></div>

            <div className="absolute bottom-10 left-10 text-black z-10">
              <h2 className="text-3xl font-semibold leading-tight mb-4">
                Finally, all your <br /> work in one place.
              </h2>
              <div className="flex gap-2">
                <button className="p-2 border border-white/40 rounded-full hover:bg-white/20">
                  ←
                </button>
                <button className="p-2 border border-white/40 rounded-full hover:bg-white/20">
                  →
                </button>
              </div>
            </div>
            

            {/* Abstract Graphic Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}


function SocialBtn({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95">
      {icon}
    </button>
  );
}


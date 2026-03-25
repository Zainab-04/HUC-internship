"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Account created! Please login.");
      router.push('/login');
    } else {
      alert(data.error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Create Account</h1>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /><br />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required /><br />
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
          <a 
            href="/signup" 
            className="bg-indigo-500 px-4 py-2 rounded-md text-sm font-semibold text-white hover:bg-indigo-400"
          >
            Sign Up
          </a>
        </div>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}
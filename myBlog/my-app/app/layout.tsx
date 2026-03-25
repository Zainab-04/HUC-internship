import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen`}>
          <div>
            <header>
                {/* <h1 className="text-4xl font-bold text-[#c54764]">
                  ModernBlog
                </h1> */}
            </header>
          </div>
        <main className="w-full mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
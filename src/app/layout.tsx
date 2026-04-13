import { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import '../index.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vixingo — WhatsApp AI Agent for Business',
  description: 'Scale your business with Vixingo AI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased font-body tracking-[-0.01em] m-0 p-0 overflow-x-hidden text-slate-900 bg-white">
        {children}
      </body>
    </html>
  );
}

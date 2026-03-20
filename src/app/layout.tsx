import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'ContinuID – Self-Sovereign Identity for Cross-Domain Continuity',
  description: 'Own your digital life. Seamless identity continuity across education, finance, healthcare, and employment',
  icons: {
    icon: '/id-card.png', // from public folder
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="antialiased min-h-screen bg-[#05050f]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
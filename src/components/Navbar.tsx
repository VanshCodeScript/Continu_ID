'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  ShieldCheckIcon, BeakerIcon, CodeBracketIcon,
  ExclamationTriangleIcon, WalletIcon, Bars3Icon, XMarkIcon,
} from '@heroicons/react/24/outline';

const navLinks = [
  { href: '/',              label: 'Home',       icon: null                    },
  { href: '/demo',          label: 'Demo',        icon: BeakerIcon              },
  { href: '/tech',          label: 'Technology',  icon: CodeBracketIcon         },
  { href: '/problems',      label: 'Gaps',        icon: ExclamationTriangleIcon },
  { href: '/dashboard/vc',  label: 'Wallet',      icon: WalletIcon              },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16">
      {/* Glass panel */}
      <div className="absolute inset-0 bg-[#05050f]/60 backdrop-blur-2xl border-b border-white/06" />

      {/* Subtle top edge highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/08" />

      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl glass border border-white/15 flex items-center justify-center group-hover:border-white/30 transition-all duration-200">
            <ShieldCheckIcon className="w-4 h-4 text-blue-400" />
          </div>
          <span className="font-display font-bold text-lg text-white tracking-tight">
            Continu<span className="text-blue-400">ID</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5 glass border border-white/08 rounded-2xl px-1.5 py-1.5">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200',
                  active
                    ? 'bg-white/12 text-white border border-white/12 shadow-inner'
                    : 'text-white/45 hover:text-white/80 hover:bg-white/06',
                )}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Subtle status dot */}
          <div className="flex items-center gap-1.5 text-white/30 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>DID Active</span>
          </div>
          <Link
            href="/dashboard/vc"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold glass border border-white/15 hover:border-white/25 hover:bg-white/10 transition-all duration-200 text-white"
          >
            <WalletIcon className="w-4 h-4 text-blue-400" />
            Open Wallet
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/50 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="relative md:hidden bg-[#05050f]/90 backdrop-blur-2xl border-t border-white/06 px-4 py-3 space-y-0.5">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/06 transition-all"
            >
              {Icon && <Icon className="w-4 h-4" />}
              {label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/06">
            <Link
              href="/dashboard/vc"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-white glass border border-white/10"
            >
              <WalletIcon className="w-4 h-4 text-blue-400" /> Open Wallet
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
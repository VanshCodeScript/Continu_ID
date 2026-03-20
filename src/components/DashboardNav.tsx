'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CreditCard, Brain, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard/vc',      icon: CreditCard, label: 'Credentials', desc: 'Manage your VCs'  },
  { href: '/dashboard/predict', icon: Brain,       label: 'AI Insights', desc: 'Life predictions' },
  { href: '/dashboard/consent', icon: Shield,      label: 'Consents',    desc: 'Access control'   },
];

export function DashboardNav() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-16 bottom-0 w-60 glass-nav border-r border-white/06 p-4">
      <div className="glass-card p-4 mb-6 bg-gradient-to-br from-blue-500/08 to-purple-500/08 border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">A</div>
          <div className="min-w-0">
            <div className="text-white text-sm font-medium truncate">Arjun Sharma</div>
            <div className="text-white/40 text-xs truncate">did:continu:a1b2c3…</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-xs">Identity Active</span>
        </div>
      </div>
      <nav className="space-y-1 flex-1">
        <p className="text-white/25 text-xs uppercase tracking-widest px-3 mb-2">Dashboard</p>
        {navItems.map(({ href, icon: Icon, label, desc }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group', active ? 'bg-white/10 border border-white/12 text-white' : 'text-white/50 hover:text-white hover:bg-white/06')}>
              <Icon size={16} className={active ? 'text-blue-400' : 'text-white/40 group-hover:text-white/70'} />
              <div><div className="text-sm font-medium leading-tight">{label}</div><div className="text-xs text-white/30">{desc}</div></div>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/06 pt-4 space-y-2">
        {[['Credentials','5'],['Domains linked','5'],['Active consents','2'],['ZKP proofs','12']].map(([label,val]) => (
          <div key={label} className="flex items-center justify-between text-xs">
            <span className="text-white/40">{label}</span>
            <span className="text-white/70 font-medium">{val}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
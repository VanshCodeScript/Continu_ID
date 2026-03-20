"use client"

export const dynamic = 'force-dynamic';

import { HeroSection } from '@/components/sections/HeroSection';
import { USPSection } from '@/components/sections/USPSection';
import { LifeJourneySection } from '@/components/sections/LifeJourneySection';
import { TechStackTable } from '@/components/sections/TechStackTable';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <USPSection />
      <LifeJourneySection />
      <TechStackTable />
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card p-12 bg-gradient-to-br from-blue-500/08 to-purple-500/08 border-blue-500/20">
            <h2 className="font-display font-bold text-4xl text-white mb-4">Ready to Own Your Identity?</h2>
            <p className="text-white/50 mb-8">Try our interactive SSI wallet demo — no signup required.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo" className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transition-all hover:shadow-xl hover:shadow-blue-500/25">
                Try the Demo <ArrowRight size={16} />
              </Link>
              <Link href="/problems" className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl glass border border-white/15 text-white/70 hover:text-white font-medium transition-all hover:bg-white/08">
                See Industry Gaps
              </Link>
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t border-white/06 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display font-semibold text-white/70">ContinuID</span>
          <p className="text-white/30 text-sm">Built on W3C DID · FHIR · eIDAS 2.0 · Hyperledger Fabric</p>
          <div className="flex gap-4 text-white/40 text-sm">
            <Link href="/tech" className="hover:text-white/70 transition-colors">Architecture</Link>
            <Link href="/problems" className="hover:text-white/70 transition-colors">Research</Link>
            <Link href="/demo" className="hover:text-white/70 transition-colors">Demo</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
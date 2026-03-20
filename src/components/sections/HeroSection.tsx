// 'use client';

// import Link from 'next/link';
// import { ArrowRightIcon, ShieldCheckIcon, LockClosedIcon, BoltIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
// import dynamic from 'next/dynamic';

// const Lanyard = dynamic(() => import('@/components/Lanyard'), { ssr: false });

// const floatingCards = [
//   { icon: ShieldCheckIcon,  iconColor: 'text-blue-400',    label: 'ZK-Proof verified',  tag: 'Live',     tagClass: 'badge-active',  pos: 'top-[20%] left-[4%]',  delay: '0s'  },
//   { icon: AcademicCapIcon,  iconColor: 'text-purple-400',  label: 'MIT Degree',         tag: 'Verified', tagClass: 'badge-active',  pos: 'top-[58%] left-[3%]',  delay: '2s'  },
//   { icon: LockClosedIcon,   iconColor: 'text-emerald-400', label: 'Ed25519 Signed',     tag: null,       tagClass: '',              pos: 'top-[23%] right-[52%]', delay: '1s'  },
//   { icon: BoltIcon,         iconColor: 'text-amber-400',   label: 'AI Insight Ready',   tag: null,       tagClass: '',              pos: 'top-[63%] right-[52%]', delay: '3s'  },
// ];

// export function HeroSection() {
//   return (
//     <section className="relative min-h-screen flex items-center overflow-hidden pt-16">

//       {/* Base background */}
//       <div className="absolute inset-0 bg-[#05050f]" />

//       {/* Dot grid */}
//       <div className="absolute inset-0 dots-bg opacity-100" />

//       {/* Radial vignette so dots fade at edges */}
//       <div className="absolute inset-0"
//         style={{ background: 'radial-gradient(ellipse at 40% 50%, transparent 30%, #05050f 80%)' }}
//       />

//       {/* Subtle static glow blobs — no animation, just depth */}
//       <div className="absolute top-[-80px] left-[-120px] w-[500px] h-[500px] rounded-full bg-blue-700/10 blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-[-60px] left-[30%] w-[400px] h-[400px] rounded-full bg-purple-800/08 blur-[100px] pointer-events-none" />

//       {/* Lanyard — right half, full height */}
//       {/* <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block z-10"> */}
//         <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
//       {/* </div> */}

//       {/* Floating ambient cards — left side only so they don't overlap lanyard */}
//       {floatingCards.map((card, i) => {
//         const Icon = card.icon;
//         return (
//           <div
//             key={i}
//             className={`absolute hidden lg:flex items-center gap-2.5 glass-card px-3.5 py-2.5 text-xs text-white/70 animate-float-slow ${card.pos}`}
//             style={{ animationDelay: card.delay }}
//           >
//             <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${card.iconColor}`} />
//             <span>{card.label}</span>
//             {card.tag && (
//               <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${card.tagClass}`}>
//                 {card.tag}
//               </span>
//             )}
//           </div>
//         );
//       })}

//       {/* Hero content */}
//       <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12">
//         <div className="max-w-xl">

//           {/* Eyebrow */}
//           <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/10 text-white/45 text-xs font-medium mb-8 tracking-widest uppercase">
//             <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
//             Self-Sovereign Identity
//           </div>

//           {/* Headline */}
//           <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[0.92] mb-6 tracking-tight">
//             <span className="text-white">Own Your</span>
//             <br />
//             <span className="gradient-text">Digital Life</span>
//           </h1>

//           {/* Sub */}
//           <p className="text-white/45 text-base md:text-lg leading-relaxed mb-10 max-w-md">
//             Cross-domain continuity across education, finance, healthcare & identity —
//             powered by SSI, Zero-Knowledge Proofs, and federated AI.
//           </p>

//           {/* CTAs */}
//           <div className="flex flex-col sm:flex-row items-start gap-3 mb-14">
//             <Link
//               href="/demo"
//               className="flex items-center gap-2 px-6 py-3 rounded-2xl glass border border-white/20 hover:border-white/35 hover:bg-white/10 text-white font-semibold text-sm transition-all duration-200 group"
//             >
//               Launch Demo Wallet
//               <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
//             </Link>
//             <Link
//               href="/tech"
//               className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white/45 hover:text-white/75 font-medium text-sm transition-all duration-200 hover:bg-white/05 border border-transparent hover:border-white/08"
//             >
//               Explore Architecture
//             </Link>
//           </div>

//           {/* Metrics */}
//           <div className="flex flex-wrap gap-6">
//             {[
//               ['500M+',    'FHIR records'],
//               ['10K+',     'DIDs/sec'],
//               ['3,000+',   'TPS'],
//               ['eIDAS 2.0','Compliant'],
//             ].map(([val, label]) => (
//               <div key={val} className="flex flex-col">
//                 <span className="font-display font-bold text-white text-lg leading-none">{val}</span>
//                 <span className="text-white/30 text-xs mt-1">{label}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Bottom fade */}
//       <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
//         style={{ background: 'linear-gradient(to bottom, transparent, #05050f)' }}
//       />
//     </section>
//   );
// }

'use client';

import Link from 'next/link';
import { ArrowRightIcon, ShieldCheckIcon, LockClosedIcon, BoltIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import LanyardWrapper from '@/components/LanyardWrapper';

const Lanyard = dynamic(() => import('@/components/Lanyard'), { ssr: false });

const floatingCards = [
  { icon: ShieldCheckIcon,  iconColor: 'text-blue-400',    label: 'ZK-Proof verified',  tag: 'Live',     tagClass: 'badge-active',  pos: 'top-[20%] left-[4%]',  delay: '0s'  },
  { icon: AcademicCapIcon,  iconColor: 'text-purple-400',  label: 'MIT Degree',         tag: 'Verified', tagClass: 'badge-active',  pos: 'top-[58%] left-[3%]',  delay: '2s'  },
  { icon: LockClosedIcon,   iconColor: 'text-emerald-400', label: 'Ed25519 Signed',     tag: null,       tagClass: '',              pos: 'top-[23%] right-[52%]', delay: '1s'  },
  { icon: BoltIcon,         iconColor: 'text-amber-400',   label: 'AI Insight Ready',   tag: null,       tagClass: '',              pos: 'top-[63%] right-[52%]', delay: '3s'  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">

      {/* Background layers — all pointer-events-none */}
      <div className="absolute inset-0 bg-[#05050f] pointer-events-none" />
      <div className="absolute inset-0 dots-bg pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 40% 50%, transparent 30%, #05050f 80%)' }}
      />
      <div className="absolute top-[-80px] left-[-120px] w-[500px] h-[500px] rounded-full bg-blue-700/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[30%] w-[400px] h-[400px] rounded-full bg-purple-800/08 blur-[100px] pointer-events-none" />

      {/* Lanyard — absolute right half, interactive */}
      <div className="absolute inset-0 hidden lg:block z-10">
        <LanyardWrapper position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>

      {/* Right-side background image for balance */}
      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block pointer-events-none">
        <img
          src="/certi.png"
          alt="Certificate background"
          className="w-full h-full object-contain opacity-50"
        />
      </div>

      {/* Floating cards — pointer-events-none */}
      {floatingCards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className={`absolute hidden lg:flex items-center gap-2.5 glass-card px-3.5 py-2.5 text-xs text-white/70 animate-float-slow pointer-events-none z-20 ${card.pos}`}
            style={{ animationDelay: card.delay }}
          >
            <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${card.iconColor}`} />
            <span>{card.label}</span>
            {card.tag && (
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${card.tagClass}`}>
                {card.tag}
              </span>
            )}
          </div>
        );
      })}

      {/* Hero content — z-20, left aligned, pointer-events-none on wrapper */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 pointer-events-none">
        <div className="max-w-xl">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/10 text-white/45 text-xs font-medium mb-8 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Self-Sovereign Identity
          </div>

          <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[0.92] mb-6 tracking-tight">
            <span className="text-white">Own Your</span>
            <br />
            <span className="gradient-text">Digital Life</span>
          </h1>

          <p className="text-white/45 text-base md:text-lg leading-relaxed mb-10 max-w-md">
            Cross-domain continuity across education, finance, healthcare & identity —
            powered by SSI, Zero-Knowledge Proofs, and federated AI.
          </p>

          {/* Links need pointer-events-auto to be clickable */}
          <div className="flex flex-col sm:flex-row items-start gap-3 mb-14 pointer-events-auto">
            <Link
              href="/demo"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl glass border border-white/20 hover:border-white/35 hover:bg-white/10 text-white font-semibold text-sm transition-all duration-200 group"
            >
              Launch Demo Wallet
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/tech"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white/45 hover:text-white/75 font-medium text-sm transition-all duration-200 hover:bg-white/05 border border-transparent hover:border-white/08"
            >
              Explore Architecture
            </Link>
          </div>

          <div className="flex flex-wrap gap-6">
            {[
              ['500M+',    'FHIR records'],
              ['10K+',     'DIDs/sec'],
              ['3,000+',   'TPS'],
              ['eIDAS 2.0','Compliant'],
            ].map(([val, label]) => (
              <div key={val} className="flex flex-col">
                <span className="font-display font-bold text-white text-lg leading-none">{val}</span>
                <span className="text-white/30 text-xs mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #05050f)' }}
      />
    </section>
  );
}
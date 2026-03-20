import { AcademicCapIcon, BriefcaseIcon, BanknotesIcon, HeartIcon, LockClosedIcon, ArrowDownTrayIcon, CircleStackIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const stages = [
  { icon: AcademicCapIcon, phase: 'Education',  age: '18–24',   events: ['Degree credentials issued', 'Skill certifications', 'Academic records linked'],  accent: 'text-blue-400',    border: 'border-blue-500/20',    dot: 'bg-blue-400'    },
  { icon: BriefcaseIcon,   phase: 'Employment', age: '24–35',   events: ['Employment VCs shared', 'Income attestations', 'Skill progression tracked'],       accent: 'text-amber-400',   border: 'border-amber-500/20',   dot: 'bg-amber-400'   },
  { icon: BanknotesIcon,   phase: 'Finance',    age: '25–50',   events: ['Credit score VCs', 'Loan eligibility proofs', 'Tax record attestations'],           accent: 'text-emerald-400', border: 'border-emerald-500/20', dot: 'bg-emerald-400' },
  { icon: HeartIcon,       phase: 'Healthcare', age: 'Lifelong', events: ['FHIR health records', 'Prescription history', 'Insurance eligibility proofs'],     accent: 'text-rose-400',    border: 'border-rose-500/20',    dot: 'bg-rose-400'    },
];

const steps = [
  {
    num: '01',
    numColor: 'text-blue-400',
    numBg: 'bg-blue-500/10 border-blue-500/30',
    icon: ArrowDownTrayIcon,
    iconColor: 'text-blue-400',
    title: 'Issue',
    desc: 'Institution issues a Verifiable Credential signed with Ed25519 to your DID wallet.',
    tag: 'Ed25519 · W3C VC 2.0',
  },
  {
    num: '02',
    numColor: 'text-purple-400',
    numBg: 'bg-purple-500/10 border-purple-500/30',
    icon: CircleStackIcon,
    iconColor: 'text-purple-400',
    title: 'Store',
    desc: 'Credentials stored in your local SSI wallet. You control what leaves.',
    tag: 'Self-Sovereign · Local',
  },
  {
    num: '03',
    numColor: 'text-emerald-400',
    numBg: 'bg-emerald-500/10 border-emerald-500/30',
    icon: ShieldCheckIcon,
    iconColor: 'text-emerald-400',
    title: 'Prove',
    desc: "Share only what's needed via ZKP — prove age without revealing birthdate.",
    tag: 'Groth16 · Zero Knowledge',
  },
];

export function LifeJourneySection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-white/50 text-xs font-medium mb-5 tracking-wide uppercase">
            Cross-Domain Continuity
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Your Life, <span className="gradient-text">Seamlessly Connected</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-sm">
            Credentials earned in education flow into employment, finance, and healthcare — without manual re-verification.
          </p>
        </div>

        {/* Stage timeline */}
        <div className="relative">
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-px bg-white/06 mx-24" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {stages.map(({ icon: Icon, phase, age, events, accent, border, dot }, i) => (
              <div key={phase} className={`glass-card p-6 border ${border}`}>
                <div className="hidden lg:flex justify-center mb-6">
                  <div className={`w-2.5 h-2.5 rounded-full ${dot}`} />
                </div>
                <div className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center mb-4">
                  <Icon className={`w-5 h-5 ${accent}`} />
                </div>
                <div className={`text-xs font-medium uppercase tracking-widest ${accent} mb-1`}>Phase {i + 1}</div>
                <h3 className="font-display font-bold text-white text-lg mb-1">{phase}</h3>
                <div className="text-white/30 text-xs mb-4">{age}</div>
                <ul className="space-y-2">
                  {events.map((e) => (
                    <li key={e} className="flex items-start gap-2 text-white/50 text-xs">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />{e}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-white/06 flex items-center gap-1.5 text-white/25 text-xs">
                  <LockClosedIcon className="w-3 h-3" />
                  <span>ZKP protected</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works — 3 steps */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map(({ num, numColor, numBg, icon: Icon, iconColor, title, desc, tag }) => (
            <div key={num} className="glass-card p-6 border border-white/08 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className={`font-mono font-bold text-2xl ${numColor}`}>{num}</span>
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${numBg}`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-lg mb-1">{title}</h4>
                <p className="text-white/45 text-xs leading-relaxed">{desc}</p>
              </div>
              <span className={`self-start font-mono text-xs px-2.5 py-1 rounded-lg border ${numBg} ${numColor}`}>
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
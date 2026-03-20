import {
  ShieldCheckIcon, EyeSlashIcon, CpuChipIcon, HeartIcon,
  CreditCardIcon, CircleStackIcon, DocumentCheckIcon, LockClosedIcon, ArrowsRightLeftIcon
} from '@heroicons/react/24/outline';

const usps = [
  { icon: ShieldCheckIcon,    iconColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',    label: 'Self-Sovereign Identity',  desc: 'User-controlled DID wallet with selective disclosure via W3C Verifiable Credentials.' },
  { icon: EyeSlashIcon,       iconColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20', label: 'Zero-Knowledge Proofs',    desc: 'Prove attributes without revealing underlying data. Semaphore-based ZKP at scale.' },
  { icon: CpuChipIcon,        iconColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',    label: 'Federated AI Analytics',   desc: 'Life-transition predictions trained across institutions without centralizing data.' },
  { icon: HeartIcon,          iconColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',    label: 'FHIR Ready',               desc: 'HL7 FHIR-compliant health data exchange. Plug into any modern hospital system.' },
  { icon: CreditCardIcon,     iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', label: 'Open Banking APIs',   desc: 'Financial credential attestations via Plaid, RBI-regulated Open Banking stack.' },
  { icon: CircleStackIcon,    iconColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20', label: 'Hyperledger Fabric',       desc: 'Permissioned blockchain hub at 3000+ TPS for cross-domain interoperability.' },
  { icon: DocumentCheckIcon,  iconColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',       label: 'eIDAS 2.0',               desc: 'Full compliance with EU Digital Identity Wallet mandate effective 2026.' },
  { icon: LockClosedIcon,     iconColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20', label: 'Zero Trust Architecture', desc: 'UMA-based consent layer. No implicit trust — every access explicitly granted.' },
  { icon: ArrowsRightLeftIcon, iconColor: 'text-pink-400 bg-pink-500/10 border-pink-500/20',   label: 'Cross-Domain Continuity', desc: 'Seamless life-stage transitions: education → employment → healthcare → finance.' },
];

export function USPSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-white/50 text-xs font-medium mb-5 tracking-wide uppercase">
            Our Differentiators
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Built Different, <span className="gradient-text">By Design</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-sm">
            Not just another digital ID. ContinuID layers intelligence and sovereignty onto a proven standards-based foundation.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {usps.map(({ icon: Icon, iconColor, label, desc }) => (
            <div key={label} className="glass-card p-6 hover:-translate-y-0.5 transition-all duration-200">
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-4 ${iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-white mb-2 text-sm">{label}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { ExclamationTriangleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const gaps = [
  { title: 'Data Silos & Standards Mismatch', severity: 'Critical', severityColor: 'badge-revoked', desc: 'Legacy systems in healthcare and finance use incompatible formats, blocking interoperability and forcing costly manual re-verification at every domain boundary.', examples: ['EPIC vs. Cerner format incompatibility', 'Bank statements ≠ tax authority formats', 'University records not machine-readable'], solution: 'FHIR R4 adapters + Open Banking APIs normalize all formats into a shared semantic layer.', solutionColor: 'text-blue-400' },
  { title: 'Security & Trust Deficits', severity: 'Critical', severityColor: 'badge-revoked', desc: 'Centralized identity stores are honeypots. The UK One Login breach exposed 38M records. Surveillance fears erode user trust in government-led digital ID programs.', examples: ['UK One Login breach (2023)', 'India Aadhaar leakage incidents', 'GDPR violations from centralized stores'], solution: 'SSI with Ed25519-signed VCs eliminates central breach points. ZKP proofs mean no raw data travels.', solutionColor: 'text-purple-400' },
  { title: 'Incomplete Life-Stage Coverage', severity: 'High', severityColor: 'badge-expired', desc: 'Existing solutions focus on government services. Private sectors are ignored. Rural and low-digital populations are excluded entirely.', examples: ['EU Digital Wallet: gov only', 'India DPI: no private healthcare', 'eIDAS: no employment history'], solution: 'UMA 2.0 consent layer + USSD/SMS gateway fallbacks for rural access extend coverage universally.', solutionColor: 'text-cyan-400' },
  { title: 'Prohibitive Integration Costs', severity: 'High', severityColor: 'badge-expired', desc: "Diverse legacy protocols mean each new integration costs $200K–$2M. Small institutions simply can't participate.", examples: ['Average NHS integration: £800K', 'Bank-to-govt API: 18 months dev', 'No plug-and-play SSI SDK'], solution: 'Hyperledger Fabric channels + pre-built domain adapters reduce integration to API key configuration.', solutionColor: 'text-emerald-400' },
  { title: 'No Predictive Capability', severity: 'Medium', severityColor: 'badge-pending', desc: "All current systems are reactive. Cross-domain patterns that predict healthcare needs or financial readiness go completely unused.", examples: ['No employment→health risk signals', 'No education→loan readiness scoring', 'No life-transition early warnings'], solution: 'Federated learning across domains detects patterns without centralizing data.', solutionColor: 'text-amber-400' },
];

export default function ProblemsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-white/40 text-xs font-medium mb-6 tracking-wide uppercase">
            <ExclamationTriangleIcon className="w-3.5 h-3.5" /> Industry Gap Analysis
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-white mb-4">The Problem <span className="gradient-text">Landscape</span></h1>
          <p className="text-white/40 text-base max-w-2xl leading-relaxed">Existing solutions reveal persistent flaws in execution, coverage, and trust — creating the gaps ContinuID addresses.</p>
        </div>

        <div className="space-y-4">
          {gaps.map((gap) => (
            <div key={gap.title} className="glass-card p-8 border-white/08">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h2 className="font-display font-bold text-lg text-white">{gap.title}</h2>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${gap.severityColor}`}>{gap.severity}</span>
              </div>
              <p className="text-white/50 mb-5 text-sm leading-relaxed">{gap.desc}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-white/25 text-xs uppercase tracking-widest mb-2">Real Examples</p>
                  <ul className="space-y-1.5">
                    {gap.examples.map((ex) => (
                      <li key={ex} className="flex items-start gap-2 text-white/40 text-xs">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />{ex}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass p-4 rounded-xl border border-white/08">
                  <p className="text-white/25 text-xs uppercase tracking-widest mb-2">ContinuID Fix</p>
                  <p className={`text-xs leading-relaxed font-medium ${gap.solutionColor}`}>{gap.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/tech" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl glass border border-white/15 text-white/70 hover:text-white font-medium text-sm transition-all hover:bg-white/08">
            See How We Fix It <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
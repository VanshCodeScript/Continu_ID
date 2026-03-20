const colorMap: Record<string, string> = {
  Identity:   'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Privacy:    'text-purple-400 bg-purple-500/10 border-purple-500/20',
  Ledger:     'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  Healthcare: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  Finance:    'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  'AI/ML':    'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Auth:       'text-violet-400 bg-violet-500/10 border-violet-500/20',
  Compliance: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
};

const techStack = [
  { layer: 'Identity',    tech: 'W3C DID / Verifiable Credentials',  standard: 'W3C VC 2.0',             role: 'User-controlled credential issuance'       },
  { layer: 'Privacy',     tech: 'Zero-Knowledge Proofs (Semaphore)',  standard: 'ZKP / Groth16',          role: 'Prove without revealing'                   },
  { layer: 'Ledger',      tech: 'Hyperledger Fabric 2.x',            standard: 'Permissioned Blockchain', role: 'Cross-domain interop hub at 3K TPS'        },
  { layer: 'Healthcare',  tech: 'HL7 FHIR R4',                       standard: 'ISO/HL7 27931',          role: 'Standardized health data exchange'         },
  { layer: 'Finance',     tech: 'Open Banking / Plaid',              standard: 'PSD2 / RBI OB',          role: 'Financial credential attestation'          },
  { layer: 'AI/ML',       tech: 'TensorFlow Federated + Flower',     standard: 'Federated Learning',     role: 'Privacy-preserving life predictions'       },
  { layer: 'Auth',        tech: 'UMA 2.0 + OAuth2',                  standard: 'Kantara Initiative',     role: 'Fine-grained consent management'           },
  { layer: 'Compliance',  tech: 'eIDAS 2.0 + GDPR',                  standard: 'EU Regulation',          role: 'Cross-border legal interoperability'       },
];

export function TechStackTable() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h3 className="font-display font-bold text-2xl text-white mb-6">Technology Stack</h3>
        <div className="glass-card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/06">
                  {['Layer','Technology','Standard','Role'].map((h) => (
                    <th key={h} className="text-left px-6 py-4 text-white/30 font-medium text-xs uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/04">
                {techStack.map((row) => (
                  <tr key={row.layer} className="hover:bg-white/02 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`border px-2.5 py-1 rounded-lg text-xs font-medium ${colorMap[row.layer]}`}>
                        {row.layer}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/80 font-medium text-sm">{row.tech}</td>
                    <td className="px-6 py-4 text-white/40 hidden md:table-cell font-mono text-xs">{row.standard}</td>
                    <td className="px-6 py-4 text-white/35 hidden lg:table-cell text-xs">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
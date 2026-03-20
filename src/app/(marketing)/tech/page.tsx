import { TechStackTable } from '@/components/sections/TechStackTable';
import {
  BuildingOffice2Icon, CircleStackIcon, UserCircleIcon, CheckBadgeIcon,
} from '@heroicons/react/24/outline';
import React from 'react';

const archLayers = [
  { layer: 'Presentation Layer', color: 'from-blue-500/15 border-blue-500/25', labelColor: 'text-blue-400',
    components: [
      { name: 'SSI Wallet UI', desc: 'User-facing credential manager with selective disclosure controls' },
      { name: 'Consent Dashboard', desc: 'Real-time view of who has access to which credentials' },
      { name: 'AI Insights Panel', desc: 'Life-transition predictions with actionable recommendations' },
    ]},
  { layer: 'Identity & Auth Layer', color: 'from-purple-500/15 border-purple-500/25', labelColor: 'text-purple-400',
    components: [
      { name: 'DID Resolver (ION)', desc: 'W3C DID resolution via Microsoft ION on Bitcoin – 10K DIDs/sec' },
      { name: 'VC Issuer/Verifier', desc: 'Ed25519Signature2020 credential signing and verification' },
      { name: 'UMA 2.0 PDP', desc: 'Policy Decision Point for fine-grained consent management' },
    ]},
  { layer: 'Privacy Layer', color: 'from-cyan-500/15 border-cyan-500/25', labelColor: 'text-cyan-400',
    components: [
      { name: 'ZKP Engine (Semaphore)', desc: 'Groth16 proofs for attribute verification without data exposure' },
      { name: 'Homomorphic Encryption', desc: 'Institutional queries computed on encrypted data' },
      { name: 'Secure MPC', desc: 'Multi-party computation for federated model aggregation' },
    ]},
  { layer: 'Interoperability Layer', color: 'from-emerald-500/15 border-emerald-500/25', labelColor: 'text-emerald-400',
    components: [
      { name: 'FHIR R4 Adapter', desc: 'HL7 FHIR-compliant health data normalization and exchange' },
      { name: 'Open Banking Bridge', desc: 'PSD2/RBI-compliant financial data attestation via Plaid' },
      { name: 'Hyperledger Fabric Hub', desc: 'Permissioned blockchain at 3000+ TPS for cross-domain routing' },
    ]},
  { layer: 'Intelligence Layer', color: 'from-amber-500/15 border-amber-500/25', labelColor: 'text-amber-400',
    components: [
      { name: 'TensorFlow Federated', desc: 'Federated learning across institutional silos without data centralization' },
      { name: 'Flower Framework', desc: '99.9% uptime federated training at scale across edge nodes' },
      { name: 'Prediction Engine', desc: 'Life-transition scoring: education→employment, health risk, financial readiness' },
    ]},
];

const proofs = [
  { claim: 'FHIR reduces silo friction', proof: 'Epic Systems: 1B+ records, 40% less manual entry', source: 'Epic 2023 Annual Report' },
  { claim: 'SSI scales to millions', proof: 'Microsoft ION: 10K+ DIDs/sec, no central breach point', source: 'DIF Audit 2023' },
  { claim: 'Federated consent works', proof: 'Australia myGov: 1,000+ services, 80% citizen adoption', source: 'DTA 2024' },
  { claim: 'Hyperledger viable at scale', proof: 'India IndusNetDPI: 10B+ tx/year, <1s latency', source: 'NPCI Tech Report' },
  { claim: 'FL improves predictions', proof: 'Google FL: 20% error reduction on siloed healthcare data', source: 'Google Research 2023' },
];

const flowNodes = [
  { label: 'Institution', sub: 'Hospital / Uni / Bank', icon: BuildingOffice2Icon, iconColor: 'text-blue-400',  border: 'border-blue-500/30',    bg: 'bg-blue-500/08'    },
  { label: 'DID Ledger',  sub: 'Hyperledger / ION',    icon: CircleStackIcon,      iconColor: 'text-purple-400', border: 'border-purple-500/30',  bg: 'bg-purple-500/08'  },
  { label: 'User Wallet', sub: 'Ed25519 signed',        icon: UserCircleIcon,       iconColor: 'text-cyan-400',   border: 'border-cyan-500/30',    bg: 'bg-cyan-500/08'    },
  { label: 'Verifier',    sub: 'Employer / Provider',   icon: CheckBadgeIcon,       iconColor: 'text-emerald-400',border: 'border-emerald-500/30', bg: 'bg-emerald-500/08' },
];

const flowArrows = ['→ issues VC', '→ stores DID', '→ ZKP proof'];

export default function TechPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-cyan-400/25 text-cyan-300 text-xs font-medium mb-6 tracking-wide uppercase">
            Architecture Deep Dive
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-white mb-4">
            Technology <span className="gradient-text">Architecture</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl">
            A layered, standards-based architecture integrating proven technologies — no custom protocols.
          </p>
        </div>

        <div className="space-y-4 mb-16">
          {archLayers.map((layer, i) => (
            <div key={layer.layer} className={`glass-card p-6 bg-gradient-to-r ${layer.color} border`}>
              <div className="flex items-start gap-4">
                <div className={`text-xs font-mono font-medium ${layer.labelColor} w-8 mt-1 flex-shrink-0`}>L{i + 1}</div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-white mb-4">{layer.layer}</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {layer.components.map((comp) => (
                      <div key={comp.name} className="glass p-3 rounded-xl">
                        <div className="text-white font-medium text-sm mb-1">{comp.name}</div>
                        <div className="text-white/45 text-xs leading-relaxed">{comp.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Credential flow — icons replace emojis */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-2xl text-white mb-6">Credential Issuance Flow</h2>
          <div className="glass-card p-6 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              {/* {flowNodes.map((node, i) => {
                const Icon = node.icon;
                return (
                  <>
                    <div key={node.label} className={`glass-card p-4 text-center border ${node.border} ${node.bg} flex-shrink-0 w-36`}>
                      <div className="flex justify-center mb-2">
                        <div className={`w-9 h-9 rounded-xl glass border ${node.border} flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${node.iconColor}`} />
                        </div>
                      </div>
                      <div className="text-white text-sm font-medium">{node.label}</div>
                      <div className="text-white/40 text-xs">{node.sub}</div>
                    </div>
                    {i < flowArrows.length && (
                      <div key={`arrow-${i}`} className="text-white/30 text-xs font-mono flex-shrink-0 px-2">
                        {flowArrows[i]}
                      </div>
                    )}
                  </>
                );
              })} */}

              {flowNodes.map((node, i) => {
  const Icon = node.icon;
  return (
    <React.Fragment key={node.label}>
      <div className={`glass-card p-4 text-center border ${node.border} ${node.bg} flex-shrink-0 w-36`}>
        <div className="flex justify-center mb-2">
          <div className={`w-9 h-9 rounded-xl glass border ${node.border} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${node.iconColor}`} />
          </div>
        </div>
        <div className="text-white text-sm font-medium">{node.label}</div>
        <div className="text-white/40 text-xs">{node.sub}</div>
      </div>
      {i < flowArrows.length && (
        <div className="text-white/30 text-xs font-mono flex-shrink-0 px-2">
          {flowArrows[i]}
        </div>
      )}
    </React.Fragment>
  );
})}
            </div>
          </div>
        </div>

        {/* Proofs */}
        <div className="mb-12">
          <h2 className="font-display font-bold text-2xl text-white mb-6">Verified Real-World Proofs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {proofs.map((p) => (
              <div key={p.claim} className="glass-card p-5">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium mb-2">
                  <CheckBadgeIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  {p.claim}
                </div>
                <p className="text-white text-sm font-medium mb-1">{p.proof}</p>
                <p className="text-white/35 text-xs font-mono">{p.source}</p>
              </div>
            ))}
          </div>
        </div>

        <TechStackTable />
      </div>
    </main>
  );
}
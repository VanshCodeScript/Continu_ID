'use client';

import { useState } from 'react';
import { MOCK_CREDENTIALS, MOCK_PROFILE } from '@/lib/mock-data';
import { formatDate, shortenDID } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  ShieldCheckIcon, CheckCircleIcon, EyeIcon, EyeSlashIcon,
  ClipboardDocumentIcon, LockClosedIcon, LockOpenIcon,
  AcademicCapIcon, BriefcaseIcon, BanknotesIcon, HeartIcon, IdentificationIcon,
} from '@heroicons/react/24/outline';
import type { ComponentType, SVGProps } from 'react';


type Step = 'wallet' | 'select' | 'zkp' | 'proof' | 'verified';
type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const zkpSteps = [
  { label: 'Generating ZK circuit...', duration: 600 },
  { label: 'Computing Groth16 proof...', duration: 900 },
  { label: 'Verifying proof locally...', duration: 500 },
  { label: 'Proof ready (no raw data sent)', duration: 300 },
];

const domainIcon: Record<string, IconType> = {
  education: AcademicCapIcon, employment: BriefcaseIcon,
  finance: BanknotesIcon, healthcare: HeartIcon, identity: IdentificationIcon,
};

const domainAccent: Record<string, { text: string; border: string; bg: string }> = {
  education:  { text: 'text-blue-400',    border: 'border-blue-500/20',    bg: 'bg-blue-500/10'    },
  employment: { text: 'text-amber-400',   border: 'border-amber-500/20',   bg: 'bg-amber-500/10'   },
  finance:    { text: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/10' },
  healthcare: { text: 'text-rose-400',    border: 'border-rose-500/20',    bg: 'bg-rose-500/10'    },
  identity:   { text: 'text-purple-400',  border: 'border-purple-500/20',  bg: 'bg-purple-500/10'  },
};

export default function DemoPage() {
  const [step, setStep] = useState<Step>('wallet');
  const [selected, setSelected] = useState<string[]>([]);
  const [zkpIndex, setZkpIndex] = useState(0);
  const [revealing, setRevealing] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const runZKP = async () => {
    setStep('zkp');
    for (let i = 0; i < zkpSteps.length; i++) {
      await new Promise((r) => setTimeout(r, zkpSteps[i].duration));
      setZkpIndex(i + 1);
    }
    await new Promise((r) => setTimeout(r, 400));
    setStep('proof');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedCreds = MOCK_CREDENTIALS.filter((c) => selected.includes(c.id));

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-white/50 text-xs font-medium mb-5 tracking-wide uppercase">
            <ShieldCheckIcon className="w-3.5 h-3.5" /> Interactive SSI Demo
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-3">
            SSI Wallet <span className="gradient-text">Simulator</span>
          </h1>
          <p className="text-white/40 text-sm">Select credentials, generate ZK proofs, and see exactly what a verifier receives.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {(['wallet','select','zkp','proof','verified'] as Step[]).map((s, i) => {
            const all: Step[] = ['wallet','select','zkp','proof','verified'];
            const current = all.indexOf(step);
            const idx = all.indexOf(s);
            return (
              <div key={s} className="flex items-center gap-2 flex-shrink-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${idx < current ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' : idx === current ? 'bg-blue-500/15 border-blue-500/40 text-blue-400' : 'bg-white/04 border-white/10 text-white/25'}`}>
                  {idx < current ? <CheckCircleIcon className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className={`text-xs capitalize ${idx === current ? 'text-white' : 'text-white/25'}`}>{s}</span>
                {i < 4 && <div className="w-6 h-px bg-white/08 flex-shrink-0" />}
              </div>
            );
          })}
        </div>

        {/* WALLET step */}
        {step === 'wallet' && (
          <div>
            {/* Profile card */}
            <div className="glass-card p-6 mb-6 border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl glass border border-white/15 flex items-center justify-center flex-shrink-0">
                  <IdentificationIcon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-white text-xl">{MOCK_PROFILE.displayName}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-white/40 text-xs font-mono">{shortenDID(MOCK_PROFILE.did)}</code>
                    <button onClick={() => handleCopy(MOCK_PROFILE.did)} className="text-white/25 hover:text-white/60 transition-colors">
                      <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                    </button>
                    {copied && <span className="text-emerald-400 text-xs">Copied!</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="badge-active px-2 py-0.5 rounded-full text-xs">DID Active</span>
                    <span className="text-white/30 text-xs">{MOCK_CREDENTIALS.length} credentials</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Credentials grid */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {MOCK_CREDENTIALS.map((vc) => {
                const Icon = (domainIcon[vc.domain] ?? IdentificationIcon) 
                const a = domainAccent[vc.domain as keyof typeof domainAccent] ?? { text: 'text-white/50', border: 'border-white/10', bg: 'bg-white/05' };                return (
                  <div key={vc.id} className={`glass-card p-5 border ${a.border}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${a.bg} ${a.border}`}>
                          <Icon className={`w-5 h-5 ${a.text}`} />
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">{vc.credentialType}</div>
                          <div className="text-white/35 text-xs capitalize">{vc.domain}</div>
                        </div>
                      </div>
                      <Badge variant={vc.status as any}>{vc.status}</Badge>
                    </div>
                    <div className="text-white/35 text-xs mb-2">{vc.issuer}</div>
                    <div className="flex items-center gap-1 text-white/25 text-xs">
                      <LockClosedIcon className="w-3 h-3" /><span>ZKP protected</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button onClick={() => setStep('select')}>Simulate Credential Sharing →</Button>
          </div>
        )}

        {/* SELECT step */}
        {step === 'select' && (
          <div>
            <div className="glass-card p-5 mb-6 border border-amber-500/20 bg-amber-500/05">
              <p className="text-amber-300/80 text-sm"><strong className="text-amber-300">Scenario:</strong> A new employer wants to verify your degree and employment history without accessing your health or financial records.</p>
            </div>
            <h2 className="font-display font-bold text-white text-xl mb-4">Select credentials to share:</h2>
            <div className="space-y-2 mb-8">
              {MOCK_CREDENTIALS.map((vc) => {
                const isSelected = selected.includes(vc.id);
                const Icon = domainIcon[vc.domain] ?? IdentificationIcon;
                const a = domainAccent[vc.domain] ?? { text: 'text-white/50', border: 'border-white/10', bg: 'bg-white/05' };
                return (
                  <button key={vc.id}
                    onClick={() => setSelected((prev) => isSelected ? prev.filter((x) => x !== vc.id) : [...prev, vc.id])}
                    className={`w-full text-left glass-card p-4 border transition-all ${isSelected ? 'border-blue-400/30 bg-blue-500/06' : 'border-white/06 hover:border-white/15'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-white/20'}`}>
                        {isSelected && <CheckCircleIcon className="w-3 h-3 text-white" />}
                      </div>
                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${a.bg} ${a.border}`}>
                        <Icon className={`w-4 h-4 ${a.text}`} />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{vc.credentialType}</div>
                        <div className="text-white/35 text-xs">{vc.issuer} · {vc.domain}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex gap-3">
              <Button variant="glass" onClick={() => setStep('wallet')}>← Back</Button>
              <Button disabled={selected.length === 0} onClick={runZKP}>Generate ZK Proof ({selected.length} selected)</Button>
            </div>
          </div>
        )}

        {/* ZKP step */}
        {step === 'zkp' && (
          <div className="glass-card p-12 text-center border-white/08">
            <div className="w-20 h-20 rounded-full glass border border-blue-400/25 flex items-center justify-center mx-auto mb-8 animate-pulse">
              <LockClosedIcon className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="font-display font-bold text-white text-2xl mb-2">Generating Zero-Knowledge Proof</h2>
            <p className="text-white/40 text-sm mb-8">Your raw data never leaves your device.</p>
            <div className="space-y-3 max-w-sm mx-auto text-left">
              {zkpSteps.map((s, i) => (
                <div key={s.label} className={`flex items-center gap-3 text-sm transition-all ${i < zkpIndex ? 'text-emerald-400' : i === zkpIndex ? 'text-blue-300 animate-pulse' : 'text-white/20'}`}>
                  <span className="font-mono">{i < zkpIndex ? '✓' : i === zkpIndex ? '◉' : '○'}</span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROOF step */}
        {step === 'proof' && (
          <div>
            <div className="glass-card p-5 mb-6 border border-emerald-500/20 bg-emerald-500/05">
              <div className="flex items-center gap-3 mb-1">
                <LockOpenIcon className="w-5 h-5 text-emerald-400" />
                <h2 className="font-display font-bold text-white text-lg">ZK Proof Generated</h2>
              </div>
              <p className="text-white/45 text-sm">The verifier receives cryptographic proof — not your raw data.</p>
            </div>

            <div className="space-y-4 mb-8">
              {selectedCreds.map((vc) => {
                const isRevealed = revealing[vc.id];
                const Icon = domainIcon[vc.domain] ?? IdentificationIcon;
                const a = domainAccent[vc.domain] ?? { text: 'text-white/50', border: 'border-white/10', bg: 'bg-white/05' };
                return (
                  <div key={vc.id} className={`glass-card p-5 border ${a.border}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${a.bg} ${a.border}`}>
                          <Icon className={`w-4 h-4 ${a.text}`} />
                        </div>
                        <span className="text-white font-medium text-sm">{vc.credentialType}</span>
                      </div>
                      <button
                        onClick={() => setRevealing((r) => ({ ...r, [vc.id]: !r[vc.id] }))}
                        className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 glass px-2.5 py-1.5 rounded-lg border border-white/08 transition-colors"
                      >
                        {isRevealed ? <EyeSlashIcon className="w-3.5 h-3.5" /> : <EyeIcon className="w-3.5 h-3.5" />}
                        {isRevealed ? 'Hide raw' : 'Peek raw data'}
                      </button>
                    </div>

                    <div className="mb-3">
                      <p className="text-white/25 text-xs uppercase tracking-widest mb-2">Verifier receives (ZKP only):</p>
                      <div className="code-block text-xs">{`{ "proof": "${vc.zkpProof?.slice(0,32)}...", "verified": true }`}</div>
                    </div>

                    {isRevealed && (
                      <div>
                        <p className="text-amber-400/60 text-xs uppercase tracking-widest mb-2">⚠ Raw data — stays on your device:</p>
                        <div className="code-block text-xs text-amber-200/60">{JSON.stringify(vc.credentialSubject, null, 2)}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <Button variant="glass" onClick={() => { setStep('select'); setZkpIndex(0); }}>← Back</Button>
              <Button onClick={() => setStep('verified')}>Send to Verifier →</Button>
            </div>
          </div>
        )}

        {/* VERIFIED step */}
        {step === 'verified' && (
          <div className="glass-card p-12 text-center border border-emerald-500/20 bg-emerald-500/04">
            <div className="w-20 h-20 rounded-full glass border border-emerald-400/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="font-display font-bold text-white text-3xl mb-3">Credentials Verified!</h2>
            <p className="text-white/50 text-sm mb-1">The verifier confirmed your claims via ZKP.</p>
            <p className="text-emerald-400 text-xs mb-8">Zero raw personal data was transmitted.</p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {selectedCreds.map((vc) => {
                const Icon = domainIcon[vc.domain] ?? IdentificationIcon;
                const a = domainAccent[vc.domain] ?? { text: 'text-white/50', border: 'border-white/10', bg: 'bg-white/05' };
                return (
                  <span key={vc.id} className={`flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs border ${a.border}`}>
                    <Icon className={`w-3.5 h-3.5 ${a.text}`} />
                    <span className="text-white/70">{vc.credentialType}</span>
                  </span>
                );
              })}
            </div>
            <Button onClick={() => { setStep('wallet'); setSelected([]); setZkpIndex(0); }}>Reset Demo</Button>
          </div>
        )}
      </div>
    </main>
  );
}
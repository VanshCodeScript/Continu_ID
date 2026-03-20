'use client';

import { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { ComponentType, SVGProps } from 'react';

import {
  ChevronDownIcon, ChevronUpIcon, LockClosedIcon,
  ShareIcon, XCircleIcon, EyeIcon
} from '@heroicons/react/24/outline';
import {
  AcademicCapIcon, BriefcaseIcon, BanknotesIcon,
  HeartIcon, IdentificationIcon
} from '@heroicons/react/24/outline';

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const domainIcon: Record<string, IconType> = {
  education: AcademicCapIcon, employment: BriefcaseIcon,
  finance: BanknotesIcon, healthcare: HeartIcon, identity: IdentificationIcon,
};

const domainAccent: Record<string, string> = {
  education: 'text-blue-400 border-blue-500/20',
  employment: 'text-amber-400 border-amber-500/20',
  finance: 'text-emerald-400 border-emerald-500/20',
  healthcare: 'text-rose-400 border-rose-500/20',
  identity: 'text-purple-400 border-purple-500/20',
};

type VC = {
  id: string; domain: string; issuer: string; issuerDid?: string | null;
  credentialType: string; credentialSubject: Record<string, unknown>;
  zkpProof?: string | null; status: string; isShared: boolean;
  expiresAt: Date | null; issuedAt: Date;
};

export function CredentialCard({ vc }: { vc: VC }) {
  const [expanded, setExpanded] = useState(false);
  const [shared, setShared] = useState(vc.isShared);
  const Icon = domainIcon[vc.domain] ?? IdentificationIcon;
  const accent = domainAccent[vc.domain] ?? 'text-white/50 border-white/10';
  const [accentColor, accentBorder] = accent.split(' ');

  return (
    <div className={`glass-card border ${accentBorder} transition-all`}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center flex-shrink-0">
              {Icon && <Icon className={`w-5 h-5 ${accentColor}`} />}
            </div>
            <div>
              <div className="text-white font-semibold text-sm leading-tight">{vc.credentialType}</div>
              <div className="text-white/35 text-xs capitalize mt-0.5">{vc.domain}</div>
            </div>
          </div>
          <Badge variant={vc.status as any}>{vc.status}</Badge>
        </div>

        <div className="text-white/40 text-xs mb-3">{vc.issuer}</div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1 glass px-2 py-1 rounded-lg border border-white/08 text-white/30 text-xs">
            <LockClosedIcon className="w-3 h-3" /><span>ZKP protected</span>
          </div>
          {shared && (
            <div className="flex items-center gap-1 glass px-2 py-1 rounded-lg border border-white/15 text-white/50 text-xs">
              <ShareIcon className="w-3 h-3" /><span>Shared</span>
            </div>
          )}
        </div>

        <div className="flex justify-between text-white/25 text-xs">
          <span>Issued {formatDate(vc.issuedAt)}</span>
          {vc.expiresAt && <span>Expires {formatDate(vc.expiresAt)}</span>}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-white/06 p-5 space-y-3">
          <div>
            <p className="text-white/25 text-xs uppercase tracking-widest mb-2">Credential Subject</p>
            <div className="code-block text-xs space-y-1">
              {Object.entries(vc.credentialSubject).map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="text-purple-300/70">{k}:</span>
                  <span className="text-cyan-300/70">{JSON.stringify(v)}</span>
                </div>
              ))}
            </div>
          </div>
          {vc.zkpProof && (
            <div>
              <p className="text-white/25 text-xs uppercase tracking-widest mb-1">ZKP Proof</p>
              <div className="code-block text-xs text-emerald-300/60 truncate">{vc.zkpProof}</div>
            </div>
          )}
          {vc.issuerDid && (
            <div>
              <p className="text-white/25 text-xs uppercase tracking-widest mb-1">Issuer DID</p>
              <div className="code-block text-xs text-blue-300/60 truncate">{vc.issuerDid}</div>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-white/06 p-4 flex items-center gap-2">
        <Button variant="glass" size="sm" onClick={() => setExpanded(!expanded)} className="flex-1">
          <EyeIcon className="w-3 h-3" />
          {expanded ? 'Hide' : 'Details'}
          {expanded ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />}
        </Button>
        <Button variant="glass" size="sm" onClick={() => setShared(!shared)}>
          <ShareIcon className="w-3 h-3" />{shared ? 'Unshare' : 'Share'}
        </Button>
        {vc.status === 'active' && (
          <Button variant="destructive" size="icon">
            <XCircleIcon className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
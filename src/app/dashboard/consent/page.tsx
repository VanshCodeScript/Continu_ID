'use client';

import { useState } from 'react';
import { Shield, Plus, X, CheckCircle, Clock, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

const MOCK_CONSENTS = [
  { id: 'c1', requestingOrg: 'Infosys Ltd. – HR Portal', requestingDid: 'did:continu:infosys00000001', credentialIds: ['vc-001','vc-002'], purpose: 'Pre-employment background verification', isGranted: true, grantedAt: new Date('2024-11-20'), revokedAt: null, expiresAt: new Date('2025-02-20'), createdAt: new Date('2024-11-20') },
  { id: 'c2', requestingOrg: 'Apollo Hospitals – Patient Portal', requestingDid: 'did:continu:apollo00000002', credentialIds: ['vc-003'], purpose: 'Health record access for treatment continuity', isGranted: true, grantedAt: new Date('2024-12-01'), revokedAt: null, expiresAt: new Date('2025-06-01'), createdAt: new Date('2024-12-01') },
  { id: 'c3', requestingOrg: 'HDFC Bank – Home Loan', requestingDid: 'did:continu:hdfc000000002', credentialIds: ['vc-004','vc-002'], purpose: 'Income and credit verification for home loan', isGranted: false, grantedAt: null, revokedAt: new Date('2024-12-10'), expiresAt: null, createdAt: new Date('2024-12-08') },
];

const CRED_LABELS: Record<string, string> = { 'vc-001': '🎓 MIT Degree', 'vc-002': '💼 Google Employment', 'vc-003': '🏥 Apollo Health', 'vc-004': '💳 HDFC Credit', 'vc-005': '🪪 UIDAI Identity' };

export default function ConsentPage() {
  const [consents, setConsents] = useState(MOCK_CONSENTS);
const revoke = (id: string) =>
  setConsents((prev) =>
    prev.map((c) =>
      c.id === id
        ? {
            ...c,
            isGranted: false,
            revokedAt: new Date(),
            grantedAt: null,     // ✅ FIX
            expiresAt: null      // ✅ FIX
          }
        : c
    )
  );  const active = consents.filter((c) => c.isGranted).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-blue-400/25 text-blue-300 text-xs font-medium mb-4 tracking-wide uppercase"><Shield size={12} /> UMA 2.0 Consent Manager</div>
        <h1 className="font-display font-bold text-3xl text-white mb-1">Access Consents</h1>
        <p className="text-white/50 text-sm">Every institution that accesses your credentials requires explicit consent. Revoke anytime — instantly effective.</p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-4 text-center"><div className="text-2xl font-display font-bold text-emerald-400">{active}</div><div className="text-white/40 text-xs mt-1">Active Consents</div></div>
        <div className="glass-card p-4 text-center"><div className="text-2xl font-display font-bold text-red-400">{consents.length - active}</div><div className="text-white/40 text-xs mt-1">Revoked</div></div>
        <div className="glass-card p-4 text-center"><div className="text-2xl font-display font-bold text-blue-400">{consents.length}</div><div className="text-white/40 text-xs mt-1">Total Requests</div></div>
      </div>
      <div className="glass-card p-5 mb-6 border-blue-500/20 bg-blue-500/05">
        <div className="flex items-start gap-3">
          <Shield size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-white font-semibold text-sm mb-1">UMA 2.0 Consent Layer</h3>
            <p className="text-white/50 text-xs leading-relaxed">All access requests go through the User-Managed Access (UMA 2.0) Policy Decision Point. No institution can access your credentials without appearing here first. Revoking removes access immediately.</p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {consents.map((consent) => (
          <div key={consent.id} className={`glass-card p-6 border transition-all ${consent.isGranted ? 'border-emerald-500/20' : 'border-red-500/15 opacity-65'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white/08 border border-white/10 flex items-center justify-center flex-shrink-0"><Building2 size={18} className="text-white/50" /></div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold text-sm">{consent.requestingOrg}</h3>
                    <Badge variant={consent.isGranted ? 'active' : 'revoked'}>{consent.isGranted ? 'Active' : 'Revoked'}</Badge>
                  </div>
                  <p className="text-white/45 text-xs mb-3">{consent.purpose}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(consent.credentialIds as string[]).map((id) => (
                      <span key={id} className="px-2 py-0.5 rounded-md glass border border-white/10 text-white/60 text-xs">{CRED_LABELS[id] ?? id}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-white/30">
                    {consent.grantedAt && <div className="flex items-center gap-1"><CheckCircle size={10} className="text-emerald-400" />Granted {formatDate(consent.grantedAt)}</div>}
                    {consent.expiresAt && <div className="flex items-center gap-1"><Clock size={10} className="text-amber-400" />Expires {formatDate(consent.expiresAt)}</div>}
                    {consent.revokedAt && <div className="flex items-center gap-1"><X size={10} className="text-red-400" />Revoked {formatDate(consent.revokedAt)}</div>}
                  </div>
                  <code className="text-white/25 text-xs font-mono mt-2 block">{consent.requestingDid}</code>
                </div>
              </div>
              {consent.isGranted && (
                <Button size="sm" variant="destructive" onClick={() => revoke(consent.id)} className="flex-shrink-0 text-xs">
                  <X size={12} /> Revoke
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 glass-card p-6 border-dashed border-white/10 text-center">
        <Plus size={24} className="text-white/20 mx-auto mb-2" />
        <p className="text-white/40 text-sm">New consent requests from institutions will appear here automatically via UMA 2.0 protocol.</p>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { PlusIcon, XMarkIcon, LockClosedIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { generateDID } from '@/lib/utils';

const DOMAIN_FIELDS: Record<string, { label: string; key: string; placeholder: string }[]> = {
  education:  [{ label: 'Degree', key: 'degree', placeholder: 'B.Tech Computer Science' }, { label: 'Institution', key: 'institution', placeholder: 'MIT' }, { label: 'Year', key: 'graduationYear', placeholder: '2022' }],
  employment: [{ label: 'Role', key: 'role', placeholder: 'Software Engineer' }, { label: 'Company', key: 'company', placeholder: 'Google' }, { label: 'Start Date', key: 'startDate', placeholder: '2022-08-01' }],
  healthcare: [{ label: 'Record Type', key: 'recordType', placeholder: 'Vaccination' }, { label: 'Provider', key: 'provider', placeholder: 'Apollo Hospitals' }, { label: 'FHIR ID', key: 'fhirId', placeholder: 'FHIR-2024-001' }],
  finance:    [{ label: 'Score', key: 'creditScore', placeholder: '780' }, { label: 'Bureau', key: 'bureau', placeholder: 'CIBIL' }, { label: 'Category', key: 'category', placeholder: 'Excellent' }],
  identity:   [{ label: 'KYC Status', key: 'kycStatus', placeholder: 'Verified' }, { label: 'Authority', key: 'authority', placeholder: 'UIDAI' }],
};

const inputClass = "w-full glass border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm bg-transparent focus:outline-none focus:border-white/25 placeholder:text-white/20";
const labelClass = "text-white/40 text-xs block mb-1.5";

interface Props {
  onAdd?: (vc: any) => void;
}

export function AddCredentialModal({ onAdd }: Props) {
  const [open, setOpen]       = useState(false);
  const [domain, setDomain]   = useState('education');
  const [issuer, setIssuer]   = useState('');
  const [credType, setCredType] = useState('');
  const [fields, setFields]   = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    // Build a new VC object matching the mock data shape
    const newVC = {
      id:               `vc-${Date.now()}`,
      userId:           'mock-user',
      domain,
      issuer,
      issuerDid:        `did:continu:${issuer.toLowerCase().replace(/\s+/g, '')}`,
      credentialType:   credType,
      credentialSubject: fields,
      proof:            { type: 'Ed25519Signature2020', verificationMethod: `did:continu:${issuer}#key-1` },
      zkpProof:         `zkp_groth16_${Math.random().toString(36).slice(2, 34)}`,
      status:           'active',
      isShared:         false,
      expiresAt:        null,
      issuedAt:         new Date(),
      createdAt:        new Date(),
    };

    onAdd?.(newVC);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setOpen(false);
      setIssuer('');
      setCredType('');
      setFields({});
    }, 1500);
  };

  if (!open) return (
    <Button onClick={() => setOpen(true)}>
      <PlusIcon className="w-4 h-4" /> Add Credential
    </Button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative glass-card w-full max-w-md p-6 bg-[#08081a]/95 border-white/12 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-white text-lg">Issue New Credential</h2>
          <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white/70 transition-colors">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <CheckCircleIcon className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <p className="text-emerald-400 font-medium">Credential issued!</p>
            <p className="text-white/40 text-sm mt-1">Added to your wallet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Domain</label>
              <select
                value={domain}
                onChange={(e) => { setDomain(e.target.value); setFields({}); }}
                className={inputClass}
              >
                {Object.keys(DOMAIN_FIELDS).map((d) => (
                  <option key={d} value={d} className="bg-[#08081a] capitalize">{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Issuing Institution</label>
              <input
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="MIT, Google, Apollo…"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Credential Type</label>
              <input
                value={credType}
                onChange={(e) => setCredType(e.target.value)}
                placeholder="BachelorsDegree, EmploymentRecord…"
                className={inputClass}
              />
            </div>

            <div className="border-t border-white/06 pt-4">
              <p className="text-white/25 text-xs uppercase tracking-widest mb-3">Subject Fields</p>
              <div className="space-y-3">
                {DOMAIN_FIELDS[domain]?.map((f) => (
                  <div key={f.key}>
                    <label className={labelClass}>{f.label}</label>
                    <input
                      value={fields[f.key] ?? ''}
                      onChange={(e) => setFields((p) => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-3 rounded-xl border border-white/08 text-xs text-white/40 flex items-start gap-2">
              <LockClosedIcon className="w-4 h-4 flex-shrink-0 mt-0.5 text-white/30" />
              <span>Ed25519 signature and ZKP proof will be auto-generated on submission.</span>
            </div>

            <div className="flex gap-3 pt-1">
              <Button variant="glass" onClick={() => setOpen(false)} className="flex-1">Cancel</Button>
              <Button
                onClick={handleSubmit}
                disabled={!issuer || !credType}
                className="flex-1"
              >
                Issue Credential
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
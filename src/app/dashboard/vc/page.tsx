'use client';

import { useState } from 'react';
import { MOCK_CREDENTIALS, MOCK_PROFILE } from '@/lib/mock-data';
import { shortenDID } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import { CredentialCard } from '@/components/CredentialCard';
import { AddCredentialModal } from '@/components/AddCredentialModal';
import {
  AcademicCapIcon, BriefcaseIcon, BanknotesIcon,
  HeartIcon, IdentificationIcon, Squares2X2Icon,
} from '@heroicons/react/24/outline';

type Domain = 'all' | 'education' | 'employment' | 'finance' | 'healthcare' | 'identity';

export default function VCPage() {
  const [credentials, setCredentials] = useState<any[]>(MOCK_CREDENTIALS);
  const [activeFilter, setActiveFilter] = useState<Domain>('all');

  const active  = credentials.filter((c) => c.status === 'active').length;
  const domains = new Set(credentials.map((c) => c.domain)).size;
  const shared  = credentials.filter((c) => c.isShared).length;

  const filtered = activeFilter === 'all'
    ? credentials
    : credentials.filter((c) => c.domain === activeFilter);

  const handleAdd = (newVC: any) => {
    setCredentials((prev) => [newVC, ...prev]);
  };

  const filters = [
    { key: 'all'        as Domain, icon: Squares2X2Icon,    label: 'All Domains' },
    { key: 'education'  as Domain, icon: AcademicCapIcon,   label: 'Education'   },
    { key: 'employment' as Domain, icon: BriefcaseIcon,     label: 'Employment'  },
    { key: 'finance'    as Domain, icon: BanknotesIcon,     label: 'Finance'     },
    { key: 'healthcare' as Domain, icon: HeartIcon,         label: 'Healthcare'  },
    { key: 'identity'   as Domain, icon: IdentificationIcon,label: 'Identity'    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="font-display font-bold text-3xl text-white mb-1">Credential Wallet</h1>
          <div className="flex items-center gap-2">
            <code className="text-white/40 text-xs font-mono">{shortenDID(MOCK_PROFILE.did)}</code>
            <Badge variant="active">DID Active</Badge>
          </div>
        </div>
        <AddCredentialModal onAdd={handleAdd} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total VCs" value={credentials.length} color="blue"   />
        <StatCard label="Active"    value={active}             color="green"  />
        <StatCard label="Domains"   value={domains}            color="purple" />
        <StatCard label="Shared"    value={shared} sublabel="ZKP protected" color="cyan" />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map(({ key, icon: Icon, label }) => {
          const isActive = activeFilter === key;
          return (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isActive
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'glass border-white/08 text-white/40 hover:text-white/70 hover:border-white/15'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
              {key !== 'all' && (
                <span className="ml-0.5 text-white/30">
                  ({credentials.filter(c => c.domain === key).length})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card p-12 text-center border-white/06">
          <p className="text-white/30 text-sm">No credentials in this domain yet.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((vc) => (
            <CredentialCard key={vc.id} vc={vc} />
          ))}
        </div>
      )}

      <div className="mt-10 glass-card p-6 border-white/08">
        <h3 className="font-display font-semibold text-white mb-4">How Your SSI Wallet Works</h3>
        <div className="grid sm:grid-cols-3 gap-4 text-xs text-white/40">
          <div>
            <div className="text-white/60 font-medium mb-1">You Control Everything</div>
            <p>Credentials are cryptographically bound to your DID. Only you can authorize sharing.</p>
          </div>
          <div>
            <div className="text-white/60 font-medium mb-1">ZKP Privacy</div>
            <p>Prove claims without revealing the full credential or personal data.</p>
          </div>
          <div>
            <div className="text-white/60 font-medium mb-1">Tamper-Proof</div>
            <p>Ed25519 signatures on Hyperledger Fabric — any alteration invalidates the proof.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
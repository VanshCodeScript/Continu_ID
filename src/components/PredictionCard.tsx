'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, CheckCircleIcon, XCircleIcon, BoltIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface Prediction {
  id: string; transitionType: string; title: string; description?: string | null;
  insight: { summary: string; dataPoints: string[]; recommendation: string };
  confidence: string | null; timeframe?: string | null;
  actionItems?: string[] | null; isActioned: string | null; createdAt: Date;
}

const confLabel = (c: number) =>
  c >= 0.9 ? { label: 'Very High', color: 'text-emerald-400' }
  : c >= 0.75 ? { label: 'High', color: 'text-blue-400' }
  : c >= 0.6 ? { label: 'Medium', color: 'text-amber-400' }
  : { label: 'Low', color: 'text-rose-400' };

export function PredictionCard({ prediction, accentColor }: { prediction: Prediction; accentColor: string }) {
  const [expanded, setExpanded] = useState(false);
  const conf = parseFloat(prediction.confidence ?? '0');
  const { label, color } = confLabel(conf);
  const isActioned = prediction.isActioned === 'actioned';
  const isDismissed = prediction.isActioned === 'dismissed';
  const actions = prediction.actionItems as string[] | null;

  return (
    <div className={cn('glass-card border border-white/08 transition-all', isDismissed && 'opacity-40')}>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <BoltIcon className={`w-4 h-4 ${accentColor}`} />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base leading-tight">{prediction.title}</h3>
              <p className="text-white/40 text-xs mt-1">{prediction.description}</p>
            </div>
          </div>
          {isActioned && (
            <span className="flex-shrink-0 flex items-center gap-1 glass border border-emerald-500/20 px-2.5 py-1 rounded-full text-xs text-emerald-400">
              <CheckCircleIcon className="w-3 h-3" /> Done
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-white/35 mb-4">
          <span>Confidence: <span className={`font-semibold ${color}`}>{label} ({Math.round(conf * 100)}%)</span></span>
          {prediction.timeframe && <span>Timeframe: <span className="text-white/55">{prediction.timeframe}</span></span>}
          <span className="capitalize text-white/25">{prediction.transitionType.replace(/_/g, ' → ')}</span>
        </div>

        <div className="confidence-bar">
          <div className="confidence-fill" style={{ width: `${conf * 100}%` }} />
        </div>
      </div>

      <div className="border-t border-white/06 px-6 py-3">
        <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors">
          {expanded ? <ChevronUpIcon className="w-3.5 h-3.5" /> : <ChevronDownIcon className="w-3.5 h-3.5" />}
          {expanded ? 'Hide details' : 'View AI insight'}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-white/06 p-6 space-y-4">
          <div>
            <p className="text-white/25 text-xs uppercase tracking-widest mb-2">AI Analysis</p>
            <p className="text-white/65 text-sm leading-relaxed">{prediction.insight.summary}</p>
          </div>
          <div>
            <p className="text-white/25 text-xs uppercase tracking-widest mb-2">Data Signals</p>
            <ul className="space-y-1.5">
              {prediction.insight.dataPoints.map((dp) => (
                <li key={dp} className="flex items-start gap-2 text-xs text-white/45">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />{dp}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass p-4 rounded-xl border border-white/08">
            <p className="text-white/25 text-xs uppercase tracking-widest mb-1">Recommendation</p>
            <p className="text-white/70 text-sm">{prediction.insight.recommendation}</p>
          </div>
          {actions && actions.length > 0 && (
            <div>
              <p className="text-white/25 text-xs uppercase tracking-widest mb-2">Action Items</p>
              <ul className="space-y-2">
                {actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs">
                    <span className="mt-0.5 w-5 h-5 rounded-full glass border border-white/10 text-white/40 flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    <span className="text-white/55">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!isDismissed && (
            <div className="flex gap-2 pt-1">
              {!isActioned && (
                <Button size="sm" variant="success" className="text-xs">
                  <CheckCircleIcon className="w-3 h-3" /> Mark Actioned
                </Button>
              )}
              <Button size="sm" variant="glass" className="text-xs">
                <XCircleIcon className="w-3 h-3" /> Dismiss
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
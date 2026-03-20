import { MOCK_PREDICTIONS } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/StatCard';
import { PredictionCard } from '@/components/PredictionCard';
import {
  HeartIcon, BriefcaseIcon, AcademicCapIcon,
  CpuChipIcon, LightBulbIcon, ArrowRightIcon,
} from '@heroicons/react/24/outline';

const transitionColors: Record<string, string> = {
  education_to_employment: 'text-blue-400',
  financial_milestone:     'text-emerald-400',
  employment_to_healthcare:'text-rose-400',
  relocation:              'text-amber-400',
  life_event:              'text-purple-400',
};

const flowItems = [
  { icon: HeartIcon,     label: 'Health data',  color: 'text-rose-400'   },
  { icon: BriefcaseIcon, label: 'Employment',   color: 'text-amber-400'  },
  { icon: AcademicCapIcon,label: 'Education',   color: 'text-blue-400'   },
];

export default function PredictPage() {
  const preds = MOCK_PREDICTIONS;
  const pending = preds.filter((p) => p.isActioned === 'pending').length;
  const avgConf = Math.round(
    preds.reduce((acc, p) => acc + parseFloat(p.confidence ?? '0'), 0) / preds.length * 100
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-purple-400/25 text-purple-300 text-xs font-medium mb-4 tracking-wide uppercase">
          <CpuChipIcon className="w-3.5 h-3.5" /> Federated AI
        </div>
        <h1 className="font-display font-bold text-3xl text-white mb-1">Life Transition Insights</h1>
        <p className="text-white/50 text-sm">AI-driven predictions from cross-domain pattern analysis — computed via federated learning, no raw data leaves your domains.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Active Insights"   value={preds.length} color="purple" />
        <StatCard label="Pending Action"    value={pending}      color="blue"   />
        <StatCard label="Avg Confidence"    value={`${avgConf}%`} color="cyan"  />
        <StatCard label="Domains Analyzed"  value="5"            color="green"  />
      </div>

      {/* Flow diagram */}
      <div className="glass-card p-5 mb-8 border border-purple-500/20">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {flowItems.map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg glass border border-white/10 flex items-center justify-center">
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <span className="text-white/50 text-xs">{label}</span>
            </div>
          ))}

          <ArrowRightIcon className="w-4 h-4 text-white/20 flex-shrink-0" />

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg glass border border-purple-500/30 flex items-center justify-center">
              <CpuChipIcon className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-purple-300 font-medium text-xs">Federated ML Model</span>
          </div>

          <ArrowRightIcon className="w-4 h-4 text-white/20 flex-shrink-0" />

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg glass border border-amber-500/30 flex items-center justify-center">
              <LightBulbIcon className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-white font-medium text-xs">Life Insights</span>
          </div>
        </div>
        <p className="text-white/25 text-xs mt-3">
          TensorFlow Federated + Flower framework · Training happens locally at institution nodes · Only model weights aggregated, never raw data
        </p>
      </div>

      <div className="space-y-4">
        {preds.map((pred) => (
          <PredictionCard
            key={pred.id}
            prediction={pred}
            accentColor={transitionColors[pred.transitionType] ?? 'text-blue-400'}
          />
        ))}
      </div>
    </div>
  );
}
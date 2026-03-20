import { cn } from '@/lib/utils';

const colorMap = {
  blue:   { bg: 'border-blue-500/20',    text: 'text-blue-400'    },
  purple: { bg: 'border-purple-500/20',  text: 'text-purple-400'  },
  cyan:   { bg: 'border-cyan-500/20',    text: 'text-cyan-400'    },
  green:  { bg: 'border-emerald-500/20', text: 'text-emerald-400' },
  pink:   { bg: 'border-pink-500/20',    text: 'text-pink-400'    },
};

export function StatCard({ label, value, sublabel, color = 'blue', className }: {
  label: string; value: string | number; sublabel?: string;
  color?: keyof typeof colorMap; className?: string;
}) {
  const c = colorMap[color];
  return (
    <div className={cn('glass-card p-5 border', c.bg, className)}>
      <p className="text-white/35 text-xs font-medium uppercase tracking-widest mb-1">{label}</p>
      <p className={cn('text-3xl font-display font-bold', c.text)}>{value}</p>
      {sublabel && <p className="text-white/30 text-xs mt-1">{sublabel}</p>}
    </div>
  );
}
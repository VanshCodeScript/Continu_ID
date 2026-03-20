import { cn } from '@/lib/utils';

const variantClasses = {
  active: 'badge-active', revoked: 'badge-revoked', expired: 'badge-expired',
  pending: 'badge-pending', default: 'bg-white/10 text-white/70 border border-white/15',
};

export function Badge({ children, variant = 'default', className }: { children: React.ReactNode; variant?: keyof typeof variantClasses; className?: string }) {
  return <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variantClasses[variant], className)}>{children}</span>;
}
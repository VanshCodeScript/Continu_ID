import { cn } from '@/lib/utils';

export function Card({ children, className, glow = false }: { children: React.ReactNode; className?: string; glow?: 'blue' | 'purple' | false }) {
  return (
    <div className={cn('glass-card p-6', glow === 'blue' && 'glow-blue', glow === 'purple' && 'glow-purple', className)}>
      {children}
    </div>
  );
}
export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('font-display font-semibold text-white text-lg', className)}>{children}</h3>;
}
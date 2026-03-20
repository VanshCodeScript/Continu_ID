import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-white/20',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-500/80 hover:to-purple-500/80 border border-white/15 text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20',
        glass: 'glass text-white/80 hover:text-white hover:bg-white/08 border-white/10',
        outline: 'border border-white/20 bg-transparent text-white/70 hover:text-white hover:bg-white/06',
        destructive: 'bg-red-500/20 border border-red-400/30 text-red-300 hover:bg-red-500/30',
        ghost: 'text-white/60 hover:text-white hover:bg-white/06',
        success: 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/30',
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-lg',
        default: 'h-10 px-4',
        lg: 'h-12 px-6 text-base rounded-2xl',
        icon: 'h-9 w-9 rounded-lg',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
));
Button.displayName = 'Button';
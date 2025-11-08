'use client';

import { ButtonHTMLAttributes, ElementType, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  asChild?: boolean;
};

const variantStyles: Record<Variant, string> = {
  primary: 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-500 hover:to-primary-400 shadow-xl shadow-primary-500/40 hover:shadow-2xl hover:shadow-primary-500/60 hover:-translate-y-0.5 active:translate-y-0 ring-2 ring-primary-400/30 hover:ring-primary-400/50',
  secondary:
    'bg-white/10 text-white hover:bg-white/20 border-2 border-white/30 shadow-lg shadow-black/30 backdrop-blur-md hover:border-white/40 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'bg-transparent text-white hover:bg-white/10 hover:backdrop-blur-sm',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, asChild, ...props }, ref) => {
    const Component = (asChild ? Slot : 'button') as ElementType;

    const content = (
      <>
        {isLoading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
        )}
        {children}
      </>
    );

    return (
      <Component
        ref={ref}
        className={twMerge(
          'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60 gap-2',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {asChild ? children : content}
      </Component>
    );
  }
);

Button.displayName = 'Button';

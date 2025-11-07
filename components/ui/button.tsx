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
  primary: 'bg-primary-500 text-white hover:bg-primary-400 shadow-lg shadow-primary-900/40',
  secondary:
    'bg-white/10 text-white hover:bg-white/20 border border-white/10 shadow-lg shadow-black/30 backdrop-blur',
  ghost: 'bg-transparent text-white hover:bg-white/10',
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

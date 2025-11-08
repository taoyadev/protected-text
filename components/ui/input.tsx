'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={twMerge(
      'w-full rounded-xl border-2 border-white/30 bg-slate-800/60 backdrop-blur-sm px-4 py-3 text-sm font-medium text-white placeholder:text-white/60 shadow-inner shadow-black/30 transition-all duration-300 focus:border-primary-400/70 focus:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-primary-400/40 focus:shadow-lg focus:shadow-primary-900/30 hover:border-white/40 hover:bg-slate-800/70',
      className
    )}
    {...props}
  />
));

Input.displayName = 'Input';

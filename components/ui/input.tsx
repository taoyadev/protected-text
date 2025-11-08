'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={twMerge(
      'w-full rounded-xl border-2 border-gray-300 dark:border-white/30 bg-white dark:bg-slate-800/60 backdrop-blur-sm px-4 py-3 text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/60 shadow-inner shadow-black/10 dark:shadow-black/30 transition-all duration-300 focus:border-primary-400/70 focus:bg-gray-50 dark:focus:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-primary-400/40 focus:shadow-lg focus:shadow-primary-900/20 dark:focus:shadow-primary-900/30 hover:border-gray-400 dark:hover:border-white/40 hover:bg-gray-50 dark:hover:bg-slate-800/70',
      className
    )}
    {...props}
  />
));

Input.displayName = 'Input';

'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={twMerge(
        'w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 shadow-inner shadow-black/10 backdrop-blur-sm transition-all duration-300 placeholder:text-gray-500 hover:border-gray-400 hover:bg-gray-50 focus:border-primary-400/70 focus:bg-gray-50 focus:shadow-lg focus:shadow-primary-900/20 focus:outline-none focus:ring-2 focus:ring-primary-400/40 dark:border-white/30 dark:bg-slate-800/60 dark:text-white dark:shadow-black/30 dark:placeholder:text-white/60 dark:hover:border-white/40 dark:hover:bg-slate-800/70 dark:focus:bg-slate-800/80 dark:focus:shadow-primary-900/30',
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = 'Input';

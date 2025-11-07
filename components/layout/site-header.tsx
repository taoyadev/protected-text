'use client';

import Link from 'next/link';
import { Shield, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Shield className="h-5 w-5 text-primary-400" />
          <span className="font-semibold tracking-tight">Protected Text</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <Link href="#features" className="hover:text-white">
            Features
          </Link>
          <Link href="#security" className="hover:text-white">
            Security
          </Link>
          <Link href="#faq" className="hover:text-white">
            FAQ
          </Link>
          <Link href="/pro" className="hover:text-white">
            Roadmap
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Button asChild>
              <Link href="#create-note">Launch App</Link>
            </Button>
          </div>
          <button className="md:hidden" aria-label="Open navigation">
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}

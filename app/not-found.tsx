import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-950 text-center text-white">
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="text-white/70">The note you are looking for doesn&apos;t exist or has expired.</p>
      <Button asChild>
        <Link href="/en">Go home</Link>
      </Button>
    </main>
  );
}

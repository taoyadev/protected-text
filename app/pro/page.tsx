'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const features = [
  {
    id: 'custom-domains',
    title: 'Custom Domains',
    description: 'Use your own domain like notes.yourcompany.com instead of protectedtext.com/yoursite',
    votes: 0,
  },
  {
    id: 'team-sharing',
    title: 'Team Sharing',
    description: 'Share encrypted notes with your team. Everyone gets their own password.',
    votes: 0,
  },
  {
    id: 'api-access',
    title: 'API Access',
    description: 'Integrate with your apps. Read/write notes programmatically.',
    votes: 0,
  },
  {
    id: 'file-attachments',
    title: 'File Attachments',
    description: 'Upload encrypted files, images, and documents to your notes.',
    votes: 0,
  },
  {
    id: 'longer-retention',
    title: 'Unlimited Retention',
    description: 'Keep your notes forever. No auto-deletion.',
    votes: 0,
  },
  {
    id: 'priority-support',
    title: 'Priority Support',
    description: 'Get help faster when you need it.',
    votes: 0,
  },
];

export default function ProPage() {
  const [votes, setVotes] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<string | null>(null);

  const handleVote = async (featureId: string) => {
    if (votes[featureId]) {
      toast.error('You already voted for this!');
      return;
    }

    setLoading(featureId);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    setVotes((prev) => ({ ...prev, [featureId]: true }));
    setLoading(null);
    toast.success('Vote recorded! Thanks for the feedback.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 py-16">
        <section className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Help Us Build Pro Features
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            The free version stays free forever. But if we add Pro features, what should we build first?
            Vote for what you actually want.
          </p>
        </section>

        <section className="space-y-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition-all hover:border-primary-500/40 hover:bg-slate-900/80"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-white/70">{feature.description}</p>
                </div>
                <Button
                  variant={votes[feature.id] ? 'secondary' : 'primary'}
                  onClick={() => handleVote(feature.id)}
                  disabled={!!loading || votes[feature.id]}
                  className="shrink-0"
                >
                  <ThumbsUp className="h-4 w-4" />
                  {votes[feature.id] ? 'Voted' : 'Vote'}
                </Button>
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center">
          <h2 className="text-2xl font-semibold text-white">Got Other Ideas?</h2>
          <p className="mt-3 text-white/70">
            Email us at{' '}
            <a href="mailto:features@protected-text.com" className="text-primary-400 hover:text-primary-300">
              features@protected-text.com
            </a>
          </p>
          <p className="mt-4 text-sm text-white/50">
            We read every email. If enough people want something, we'll build it.
          </p>
        </section>

        <div className="text-center text-sm text-white/50">
          <p>
            Don't worry - the free version will always be free.
            <br />
            No ads. No tracking. No BS.
          </p>
        </div>
      </main>
    </div>
  );
}

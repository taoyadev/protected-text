'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ThumbsUp, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const features = [
  {
    id: 'custom-domains',
    title: 'Custom Domains',
    description: 'Use your own domain like notes.yourcompany.com instead of protectedtext.com/yoursite',
  },
  {
    id: 'team-sharing',
    title: 'Team Sharing',
    description: 'Share encrypted notes with your team. Everyone gets their own password.',
  },
  {
    id: 'api-access',
    title: 'API Access',
    description: 'Integrate with your apps. Read/write notes programmatically.',
  },
  {
    id: 'file-attachments',
    title: 'File Attachments',
    description: 'Upload encrypted files, images, and documents to your notes.',
  },
  {
    id: 'longer-retention',
    title: 'Unlimited Retention',
    description: 'Keep your notes forever. No auto-deletion.',
  },
  {
    id: 'priority-support',
    title: 'Priority Support',
    description: 'Get help faster when you need it.',
  },
];

export default function ProPage() {
  const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
  const [userVotes, setUserVotes] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<string | null>(null);
  const [fetchingVotes, setFetchingVotes] = useState(true);

  // Feedback form state
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackFeature, setFeedbackFeature] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  // Fetch vote counts on mount
  useEffect(() => {
    async function fetchVotes() {
      try {
        const response = await fetch('/api/feedback/votes');
        if (response.ok) {
          const data = await response.json();
          setVoteCounts(data.votes);
        }
      } catch (error) {
        console.error('Failed to fetch vote counts:', error);
      } finally {
        setFetchingVotes(false);
      }
    }
    fetchVotes();
  }, []);

  const handleVote = async (featureId: string) => {
    if (userVotes[featureId]) {
      toast.error('You already voted for this!');
      return;
    }

    setLoading(featureId);

    try {
      const response = await fetch('/api/feedback/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featureId }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserVotes((prev) => ({ ...prev, [featureId]: true }));
        setVoteCounts((prev) => ({ ...prev, [featureId]: data.votes }));
        toast.success('Vote recorded! Thanks for the feedback.');
      } else {
        toast.error(data.error || 'Failed to record vote');
      }
    } catch (error) {
      console.error('Vote error:', error);
      toast.error('Failed to record vote. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedbackMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setSubmittingFeedback(true);

    try {
      const response = await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: feedbackMessage,
          email: feedbackEmail || undefined,
          featureId: feedbackFeature || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Thank you for your feedback!');
        setFeedbackMessage('');
        setFeedbackEmail('');
        setFeedbackFeature('');
      } else {
        toast.error(data.error || 'Failed to submit feedback');
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setSubmittingFeedback(false);
    }
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
            Protected Text PRO – Feature Roadmap
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Vote on upcoming Protected Text PRO features. The free version stays free forever, but help us decide which premium features to build first.
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/60">
            Encrypted notes with custom domains, team sharing, API access, file attachments, and more coming soon.
          </p>
        </section>

        <section className="space-y-4" aria-labelledby="pro-features">
          <h2 id="pro-features" className="sr-only">
            Protected Text PRO Features
          </h2>
          {features.map((feature) => {
            const voteCount = voteCounts[feature.id] || 0;
            const hasVoted = userVotes[feature.id];

            return (
              <article
                key={feature.id}
                className="group relative rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition-all hover:border-primary-500/40 hover:bg-slate-900/80"
                itemScope
                itemType="https://schema.org/Service"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-white" itemProp="name">
                        {feature.title}
                      </h3>
                      {voteCount > 0 && (
                        <span
                          className="rounded-full bg-primary-500/20 px-3 py-1 text-sm font-medium text-primary-400"
                          aria-label={`${voteCount} votes`}
                        >
                          {voteCount} {voteCount === 1 ? 'vote' : 'votes'}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-white/70" itemProp="description">
                      {feature.description}
                    </p>
                  </div>
                  <Button
                    variant={hasVoted ? 'secondary' : 'primary'}
                    onClick={() => handleVote(feature.id)}
                    disabled={!!loading || hasVoted}
                    className="shrink-0"
                    aria-label={`Vote for ${feature.title}`}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    {hasVoted ? 'Voted' : 'Vote'}
                  </Button>
                </div>
              </article>
            );
          })}
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-8" aria-labelledby="feedback-form">
          <h2 id="feedback-form" className="text-2xl font-semibold text-white">
            Request Custom Protected Text PRO Features
          </h2>
          <p className="mt-3 text-white/70">
            Share your thoughts, suggestions, or feature requests for Protected Text PRO below.
          </p>

          <form onSubmit={handleFeedbackSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                Your Message <span className="text-red-400">*</span>
              </label>
              <Textarea
                id="message"
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                placeholder="Tell us what you'd like to see..."
                className="min-h-[120px] bg-slate-950/50 border-white/10 text-white placeholder:text-white/40"
                maxLength={2000}
                required
              />
              <p className="mt-1 text-xs text-white/50">
                {feedbackMessage.length}/2000 characters
              </p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                Email (optional)
              </label>
              <Input
                id="email"
                type="email"
                value={feedbackEmail}
                onChange={(e) => setFeedbackEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-slate-950/50 border-white/10 text-white placeholder:text-white/40"
              />
              <p className="mt-1 text-xs text-white/50">
                Leave your email if you'd like us to follow up
              </p>
            </div>

            <div>
              <label htmlFor="feature" className="block text-sm font-medium text-white/90 mb-2">
                Related Feature (optional)
              </label>
              <select
                id="feature"
                value={feedbackFeature}
                onChange={(e) => setFeedbackFeature(e.target.value)}
                className="w-full rounded-lg bg-slate-950/50 border border-white/10 px-4 py-2 text-white"
              >
                <option value="">Select a feature...</option>
                {features.map((feature) => (
                  <option key={feature.id} value={feature.id}>
                    {feature.title}
                  </option>
                ))}
                <option value="other">Something else</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={submittingFeedback || !feedbackMessage.trim()}
              className="w-full"
            >
              <Send className="h-4 w-4 mr-2" />
              {submittingFeedback ? 'Sending...' : 'Send Feedback'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-white/50">
              You can also email us at{' '}
              <a href="mailto:hello@protected-text.com" className="text-primary-400 hover:text-primary-300">
                hello@protected-text.com
              </a>
            </p>
          </div>
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

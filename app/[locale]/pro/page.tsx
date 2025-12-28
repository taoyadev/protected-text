'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ThumbsUp,
  Send,
  Shield,
  Github,
  Mail,
  Heart,
  Zap,
  Lock,
  FileText,
} from 'lucide-react';
import { SiteHeader } from '@/components/layout/site-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useTranslation } from '@/lib/i18n-provider';

export default function ProPage() {
  const { locale, t } = useTranslation();

  const features = [
    {
      id: 'custom-domains',
      title: t('pro.features.customDomains.title'),
      description: t('pro.features.customDomains.description'),
    },
    {
      id: 'team-sharing',
      title: t('pro.features.teamSharing.title'),
      description: t('pro.features.teamSharing.description'),
    },
    {
      id: 'api-access',
      title: t('pro.features.apiAccess.title'),
      description: t('pro.features.apiAccess.description'),
    },
    {
      id: 'file-attachments',
      title: t('pro.features.fileAttachments.title'),
      description: t('pro.features.fileAttachments.description'),
    },
    {
      id: 'longer-retention',
      title: t('pro.features.unlimitedRetention.title'),
      description: t('pro.features.unlimitedRetention.description'),
    },
    {
      id: 'priority-support',
      title: t('pro.features.prioritySupport.title'),
      description: t('pro.features.prioritySupport.description'),
    },
  ];
  const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
  const [userVotes, setUserVotes] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<string | null>(null);

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
      }
    }
    fetchVotes();
  }, []);

  const handleVote = async (featureId: string) => {
    if (userVotes[featureId]) {
      toast.error(t('errors.voting.alreadyVoted'));
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
        toast.success(t('toasts.success.voteRecorded'));
      } else {
        toast.error(data.error || t('errors.network.failedToRecordVote'));
      }
    } catch (error) {
      console.error('Vote error:', error);
      toast.error(t('errors.network.failedToRecordVotePleaseTryAgain'));
    } finally {
      setLoading(null);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedbackMessage.trim()) {
      toast.error(t('errors.validation.pleaseEnterMessage'));
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
        toast.success(t('toasts.success.thankYouForFeedback'));
        setFeedbackMessage('');
        setFeedbackEmail('');
        setFeedbackFeature('');
      } else {
        toast.error(data.error || t('errors.network.failedToSubmitFeedback'));
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      toast.error(t('errors.network.failedToSubmitFeedbackPleaseTryAgain'));
    } finally {
      setSubmittingFeedback(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 py-16">
        <section className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {t('pro.header.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            {t('pro.header.subtitle')}
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/60">
            {t('pro.header.description')}
          </p>
        </section>

        <section className="space-y-4" aria-labelledby="pro-features">
          <h2 id="pro-features" className="sr-only">
            {t('pro.features.sectionLabel')}
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
                      <h3
                        className="text-xl font-semibold text-white"
                        itemProp="name"
                      >
                        {feature.title}
                      </h3>
                      {voteCount > 0 && (
                        <span
                          className="rounded-full bg-primary-500/20 px-3 py-1 text-sm font-medium text-primary-400"
                          aria-label={
                            voteCount === 1
                              ? t('pro.voting.votesSingular', {
                                  count: voteCount,
                                })
                              : t('pro.voting.votesCount', { count: voteCount })
                          }
                        >
                          {voteCount}{' '}
                          {voteCount === 1
                            ? t('common.stats.vote')
                            : t('common.stats.votes')}
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
                    aria-label={t('pro.voting.voteForFeature', {
                      featureName: feature.title,
                    })}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    {hasVoted
                      ? t('pro.voting.votedButton')
                      : t('pro.voting.voteButton')}
                  </Button>
                </div>
              </article>
            );
          })}
        </section>

        <section
          className="rounded-2xl border border-white/10 bg-slate-900/60 p-8"
          aria-labelledby="feedback-form"
        >
          <h2 id="feedback-form" className="text-2xl font-semibold text-white">
            {t('pro.feedbackForm.title')}
          </h2>
          <p className="mt-3 text-white/70">{t('pro.feedbackForm.subtitle')}</p>

          <form onSubmit={handleFeedbackSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-white/90"
              >
                {t('pro.feedbackForm.messageLabel')}{' '}
                <span className="text-red-400">
                  {t('pro.feedbackForm.messageRequired')}
                </span>
              </label>
              <Textarea
                id="message"
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                placeholder={t('pro.feedbackForm.messagePlaceholder')}
                className="min-h-[120px] border-white/10 bg-slate-950/50 text-white placeholder:text-white/40"
                maxLength={2000}
                required
              />
              <p className="mt-1 text-xs text-white/50">
                {t('pro.feedbackForm.messageCounter', {
                  count: feedbackMessage.length,
                })}
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-white/90"
              >
                {t('pro.feedbackForm.emailLabel')}
              </label>
              <Input
                id="email"
                type="email"
                value={feedbackEmail}
                onChange={(e) => setFeedbackEmail(e.target.value)}
                placeholder={t('pro.feedbackForm.emailPlaceholder')}
                className="border-white/10 bg-slate-950/50 text-white placeholder:text-white/40"
              />
              <p className="mt-1 text-xs text-white/50">
                {t('pro.feedbackForm.emailHelp')}
              </p>
            </div>

            <div>
              <label
                htmlFor="feature"
                className="mb-2 block text-sm font-medium text-white/90"
              >
                {t('pro.feedbackForm.featureLabel')}
              </label>
              <select
                id="feature"
                value={feedbackFeature}
                onChange={(e) => setFeedbackFeature(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-slate-950/50 px-4 py-2 text-white"
              >
                <option value="">
                  {t('pro.feedbackForm.featurePlaceholder')}
                </option>
                {features.map((feature) => (
                  <option key={feature.id} value={feature.id}>
                    {feature.title}
                  </option>
                ))}
                <option value="other">
                  {t('pro.feedbackForm.featureOther')}
                </option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={submittingFeedback || !feedbackMessage.trim()}
              className="w-full"
            >
              <Send className="mr-2 h-4 w-4" />
              {submittingFeedback
                ? t('pro.feedbackForm.submittingButton')
                : t('pro.feedbackForm.submitButton')}
            </Button>
          </form>

          <div className="mt-6 border-t border-white/10 pt-6 text-center">
            <p className="text-sm text-white/50">
              {t('pro.feedbackForm.emailNote')}{' '}
              <a
                href="mailto:hello@protected-text.com"
                className="text-primary-400 hover:text-primary-300"
              >
                hello@protected-text.com
              </a>
            </p>
          </div>
        </section>

        <div className="text-center text-sm text-white/50">
          <p>
            {t('pro.disclaimer.text')}
            <br />
            {t('pro.disclaimer.subtext')}
          </p>
        </div>
      </main>

      <footer className="mt-16 border-t border-white/10 bg-gradient-to-b from-slate-900/40 to-slate-950/60 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="grid gap-10 md:grid-cols-3">
            {/* About Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary-500/10 p-2 ring-1 ring-primary-400/30">
                  <Shield className="h-5 w-5 text-primary-400" />
                </div>
                <h3 className="font-bold text-white">
                  {t('common.brand.protectedText')}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-white/70">
                {t('landing.footer.about.description')}
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/taoyadev/protected-text"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-primary-400/50 hover:bg-white/10 hover:text-primary-300"
                >
                  <Github className="h-4 w-4" />
                  <span>{t('landing.footer.about.starOnGithub')}</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-bold text-white">
                {t('common.navigation.quickLinks')}
              </h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li>
                  <Link
                    href={`/${locale}#features`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-primary-300"
                  >
                    <Zap className="h-3.5 w-3.5" />
                    {t('common.navigation.features')}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}#security`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-primary-300"
                  >
                    <Lock className="h-3.5 w-3.5" />
                    {t('common.navigation.securityAndPrivacy')}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}#faq`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-primary-300"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    {t('common.navigation.faq')}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/pro`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-primary-300"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    {t('common.navigation.roadmapAndFeatureRequests')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Resources */}
            <div className="space-y-4">
              <h3 className="font-bold text-white">
                {t('common.navigation.getInTouch')}
              </h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li>
                  <a
                    href={`mailto:${t('landing.footer.contact.email')}`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-primary-300"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {t('landing.footer.contact.email')}
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/taoyadev/protected-text"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-primary-300"
                  >
                    <Github className="h-3.5 w-3.5" />
                    {t('landing.footer.about.openSourceOnGithub')}
                  </a>
                </li>
              </ul>
              <div className="rounded-xl border border-primary-400/20 bg-primary-500/5 p-4">
                <p className="text-xs font-medium text-primary-300">
                  {t('landing.footer.security.title')}
                </p>
                <p className="mt-1 text-xs text-white/60">
                  {t('landing.footer.security.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/50 md:flex-row">
            <p className="flex items-center gap-2">
              {t('landing.footer.bottom.builtWith')}{' '}
              <Heart className="h-3.5 w-3.5 text-red-400" fill="currentColor" />{' '}
              {t('landing.footer.bottom.in2025')}
            </p>
            <p className="text-center text-white/40">
              {t('landing.footer.bottom.license')}
              <br className="md:hidden" />
              {t('landing.footer.bottom.disclaimer')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

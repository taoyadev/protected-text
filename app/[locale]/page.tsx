import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Lock, Zap, RefreshCw, Code, FileText, Github, Mail, Heart } from 'lucide-react';
import { SiteHeader } from '@/components/layout/site-header';
import { CreateSiteForm } from '@/components/editor/create-site-form';
import { getT, type Locale, getAlternateUrls } from '@/lib/i18n';
import { ShieldCheck } from '@/components/icons/shield-check';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getT(locale as Locale);

  const alternates = getAlternateUrls('/');

  return {
    title: t('metadata.root.title'),
    description: t('metadata.root.description'),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        alternates.map(({ locale: lang, href }) => [lang, `https://protected-text.com${href}`])
      ),
    },
    openGraph: {
      title: t('metadata.root.og.title'),
      description: t('metadata.root.og.description'),
      url: `https://protected-text.com/${locale}`,
      siteName: t('metadata.root.og.siteName'),
      locale: locale,
      type: 'website',
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = getT(locale as Locale);

  const highlights = [
    {
      title: t('landing.highlights.items.passwordNeverLeaves.title'),
      description: t('landing.highlights.items.passwordNeverLeaves.description'),
      icon: Lock
    },
    {
      title: t('landing.highlights.items.noSignup.title'),
      description: t('landing.highlights.items.noSignup.description'),
      icon: Zap
    },
    {
      title: t('landing.highlights.items.freeForever.title'),
      description: t('landing.highlights.items.freeForever.description'),
      icon: ShieldCheck
    },
  ];

  const features = [
    t('landing.features.list.0'),
    t('landing.features.list.1'),
    t('landing.features.list.2'),
    t('landing.features.list.3'),
    t('landing.features.list.4'),
    t('landing.features.list.5'),
    t('landing.features.list.6'),
    t('landing.features.list.7'),
    t('landing.features.list.8'),
    t('landing.features.list.9'),
    t('landing.features.list.10'),
    t('landing.features.list.11'),
    t('landing.features.list.12'),
    t('landing.features.list.13'),
    t('landing.features.list.14'),
    t('landing.features.list.15'),
    t('landing.features.list.16'),
    t('landing.features.list.17'),
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <SiteHeader />
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-12">
          <section className="text-center space-y-6">
            <div className="animate-fade-in">
              <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.2em] text-gray-800 dark:text-white/90 backdrop-blur-md shadow-lg shadow-black/10 dark:shadow-primary-900/20 hover:bg-gray-200 dark:hover:bg-white/15 transition-all duration-300">
                <span className="inline-flex h-2 w-2 rounded-full bg-primary-400 animate-pulse shadow-lg shadow-primary-400/50" />
                {t('landing.hero.badge')}
              </p>
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              {t('landing.hero.title')} <br />{t('landing.hero.titleHighlight').split(' ')[0]}. <span className="text-primary-400">{t('landing.hero.titleHighlight').split(' ')[1]}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700 dark:text-white/80 leading-relaxed">
              {t('landing.hero.subtitle').split('**protected-text.com/anything**')[0]}
              <span className="text-gray-900 dark:text-white font-bold">protected-text.com/anything</span>
              {t('landing.hero.subtitle').split('**protected-text.com/anything**')[1]}
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <CreateSiteForm />
              <div className="group rounded-3xl border-2 border-primary-500/30 bg-gradient-to-br from-gray-100/90 via-gray-50/90 to-white/90 dark:from-slate-800/90 dark:via-slate-900/90 dark:to-slate-950/90 p-8 text-left shadow-2xl shadow-primary-500/20 backdrop-blur-xl hover:border-primary-400/50 hover:shadow-primary-500/30 transition-all duration-500 ring-1 ring-primary-400/20">
                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-primary-300">{t('landing.highlights.heading')}</h3>
                <ul className="mt-6 space-y-5 text-sm text-gray-800 dark:text-white/90">
                  {highlights.map((item, index) => (
                    <li key={index} className="flex items-start gap-4 group/item">
                      <div className="rounded-xl bg-primary-500/20 p-2.5 ring-2 ring-primary-400/40 group-hover/item:bg-primary-500/30 group-hover/item:ring-primary-400/60 transition-all duration-300 shadow-lg shadow-primary-900/30">
                        <item.icon className="h-5 w-5 text-primary-300 group-hover/item:text-primary-200 transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white group-hover/item:text-primary-100 transition-colors duration-300">{item.title}</p>
                        <p className="mt-1 text-gray-700 dark:text-white/80 leading-relaxed">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

        <section className="group rounded-3xl border border-gray-200 dark:border-white/20 bg-gradient-to-br from-gray-50/60 via-white/40 to-gray-50/60 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-950/60 p-10 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/20 hover:border-gray-300 dark:hover:border-white/30 transition-all duration-500">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('landing.why.title')}</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-white/80"
              dangerouslySetInnerHTML={{
                __html: t('landing.why.stats1')
                  .replace(/\*\*(.+?)\*\*/g, '<span class="font-bold text-gray-900 dark:text-white">$1</span>')
                  .replace(/\*(.+?)\*/g, '<span class="italic text-gray-900 dark:text-white">$1</span>')
              }}
            />
            <p className="mt-4 text-base leading-relaxed text-gray-700 dark:text-white/80"
              dangerouslySetInnerHTML={{
                __html: t('landing.why.stats2')
                  .replace(/\*\*(.+?)\*\*/g, '<span class="font-bold text-gray-900 dark:text-white">$1</span>')
              }}
            />

            <h3 className="mt-8 text-xl font-bold text-gray-900 dark:text-white">{t('landing.why.whatMakesDifferent.heading')}</h3>
            <p className="mt-4 text-base leading-relaxed text-gray-700 dark:text-white/80"
              dangerouslySetInnerHTML={{
                __html: t('landing.why.whatMakesDifferent.paragraph1')
                  .replace(/\*\*(.+?)\*\*/g, '<span class="font-semibold text-primary-300">$1</span>')
              }}
            />
            <p className="mt-4 text-base leading-relaxed text-gray-700 dark:text-white/80">
              {t('landing.why.whatMakesDifferent.paragraph2')}
            </p>

            <h3 className="mt-8 text-xl font-bold text-gray-900 dark:text-white">{t('landing.why.howItWorks.heading')}</h3>
            <p className="mt-4 text-base leading-relaxed text-gray-700 dark:text-white/80"
              dangerouslySetInnerHTML={{
                __html: t('landing.why.howItWorks.paragraph1')
                  .replace(/`(.+?)`/g, '<span class="font-mono text-primary-300">$1</span>')
              }}
            />
            <p className="mt-4 text-base leading-relaxed text-gray-700 dark:text-white/80">
              {t('landing.why.howItWorks.paragraph2')}
            </p>

            <div className="mt-8 rounded-2xl border border-primary-400/30 bg-gray-100 dark:bg-slate-950/60 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white text-base">{t('landing.why.realTalk.heading')}</h4>
              <div className="mt-4 space-y-3 text-sm text-gray-700 dark:text-white/80">
                <p dangerouslySetInnerHTML={{
                  __html: '• ' + t('landing.why.realTalk.stat1').replace(/\*\*(.+?)\*\*/g, '<span class="font-semibold text-gray-900 dark:text-white">$1</span>')
                }} />
                <p dangerouslySetInnerHTML={{
                  __html: '• ' + t('landing.why.realTalk.stat2').replace(/\*\*(.+?)\*\*/g, '<span class="font-semibold text-gray-900 dark:text-white">$1</span>')
                }} />
                <p dangerouslySetInnerHTML={{
                  __html: '• ' + t('landing.why.realTalk.stat3').replace(/\*\*(.+?)\*\*/g, '<span class="font-semibold text-gray-900 dark:text-white">$1</span>')
                }} />
                <p dangerouslySetInnerHTML={{
                  __html: '• ' + t('landing.why.realTalk.stat4').replace(/\*\*(.+?)\*\*/g, '<span class="font-semibold text-gray-900 dark:text-white">$1</span>')
                }} />
              </div>
              <p className="mt-4 text-xs text-gray-500 dark:text-white/60 italic">
                {t('landing.why.realTalk.source')}
              </p>
            </div>

            <div className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-primary-400/40 bg-gradient-to-r from-primary-500/20 via-primary-600/15 to-indigo-500/20 px-8 py-4 shadow-lg shadow-black/15 dark:shadow-primary-900/30 backdrop-blur-sm hover:border-primary-400/60 hover:shadow-black/20 dark:hover:shadow-primary-900/40 transition-all duration-300">
              <ShieldCheck className="h-6 w-6 text-primary-300 drop-shadow-lg" />
              <p className="text-base font-semibold text-gray-900 dark:text-white"
                dangerouslySetInnerHTML={{
                  __html: t('landing.why.zeroKnowledge.badge').replace(/\*\*(.+?)\*\*/g, '<span class="bg-gradient-to-r from-primary-300 to-indigo-300 bg-clip-text text-transparent">$1</span>')
                }}
              />
            </div>
            <p className="mt-5 text-center text-base italic text-gray-600 dark:text-white/70 leading-relaxed">
              {t('landing.why.zeroKnowledge.tagline')}
            </p>
          </div>
        </section>

        <section id="security" className="group rounded-3xl border border-gray-200 dark:border-white/20 bg-gradient-to-br from-white/80 via-gray-50/60 to-white/80 dark:from-slate-950/80 dark:via-slate-900/60 dark:to-slate-950/80 p-10 shadow-2xl shadow-black/20 dark:shadow-black/40 backdrop-blur-xl hover:border-gray-300 dark:hover:border-white/30 hover:shadow-primary-900/20 transition-all duration-500">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('landing.security.title')}</h2>
              <p className="mt-3 text-base text-gray-700 dark:text-white/80">{t('landing.security.subtitle')}</p>
              <ul className="mt-6 space-y-5 text-gray-700 dark:text-white/80">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{t('landing.security.items.passwordNeverLeaves.title')}</p>
                    <p className="text-sm text-gray-600 dark:text-white/70 mt-1">{t('landing.security.items.passwordNeverLeaves.description')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{t('landing.security.items.clientSideEncryption.title')}</p>
                    <p className="text-sm text-gray-600 dark:text-white/70 mt-1">{t('landing.security.items.clientSideEncryption.description')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{t('landing.security.items.zeroTracking.title')}</p>
                    <p className="text-sm text-gray-600 dark:text-white/70 mt-1">{t('landing.security.items.zeroTracking.description')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{t('landing.security.items.openSource.title')}</p>
                    <p className="text-sm text-gray-600 dark:text-white/70 mt-1">{t('landing.security.items.openSource.description')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{t('landing.security.items.doubleLayerProtection.title')}</p>
                    <p className="text-sm text-gray-600 dark:text-white/70 mt-1">{t('landing.security.items.doubleLayerProtection.description')}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-primary-500/30 bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-slate-900/80 dark:to-slate-950/80 p-8 shadow-lg shadow-black/5 dark:shadow-primary-900/10 backdrop-blur-sm">
              <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                <Code className="h-5 w-5 text-primary-400" />
                {t('landing.security.technical.heading')}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-white/70">{t('landing.security.technical.subtitle')}</p>
              <div className="mt-6 grid gap-5 text-sm text-gray-600 dark:text-white/70 sm:grid-cols-2">
                <div className="group/tech flex items-start gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 p-4 hover:border-primary-400/30 hover:bg-gray-50 dark:hover:bg-slate-950/80 transition-all duration-300">
                  <div className="rounded-lg bg-primary-500/10 p-2 ring-1 ring-primary-400/20">
                    <Code className="h-4 w-4 text-primary-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white group-hover/tech:text-primary-200 transition-colors">{t('landing.security.technical.specs.aes256.title')}</p>
                    <p className="text-xs text-gray-500 dark:text-white/60 mt-1">{t('landing.security.technical.specs.aes256.description')}</p>
                  </div>
                </div>
                <div className="group/tech flex items-start gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 p-4 hover:border-primary-400/30 hover:bg-gray-50 dark:hover:bg-slate-950/80 transition-all duration-300">
                  <div className="rounded-lg bg-primary-500/10 p-2 ring-1 ring-primary-400/20">
                    <Code className="h-4 w-4 text-primary-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white group-hover/tech:text-primary-200 transition-colors">{t('landing.security.technical.specs.pbkdf2.title')}</p>
                    <p className="text-xs text-gray-500 dark:text-white/60 mt-1">{t('landing.security.technical.specs.pbkdf2.description')}</p>
                  </div>
                </div>
                <div className="group/tech flex items-start gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 p-4 hover:border-primary-400/30 hover:bg-gray-50 dark:hover:bg-slate-950/80 transition-all duration-300">
                  <div className="rounded-lg bg-primary-500/10 p-2 ring-1 ring-primary-400/20">
                    <Code className="h-4 w-4 text-primary-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white group-hover/tech:text-primary-200 transition-colors">{t('landing.security.technical.specs.uniqueSaltIV.title')}</p>
                    <p className="text-xs text-gray-500 dark:text-white/60 mt-1">{t('landing.security.technical.specs.uniqueSaltIV.description')}</p>
                  </div>
                </div>
                <div className="group/tech flex items-start gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 p-4 hover:border-primary-400/30 hover:bg-gray-50 dark:hover:bg-slate-950/80 transition-all duration-300">
                  <div className="rounded-lg bg-primary-500/10 p-2 ring-1 ring-primary-400/20">
                    <Code className="h-4 w-4 text-primary-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white group-hover/tech:text-primary-200 transition-colors">{t('landing.security.technical.specs.webCrypto.title')}</p>
                    <p className="text-xs text-gray-500 dark:text-white/60 mt-1">{t('landing.security.technical.specs.webCrypto.description')}</p>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-xs text-gray-500 dark:text-white/60 italic">
                {t('landing.security.technical.verifyNote')}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-900/60 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-primary-400" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('landing.conflictProtection.title')}</h3>
              </div>
              <p className="mt-3 text-gray-700 dark:text-white/80">
                {t('landing.conflictProtection.description1')}
              </p>
              <p className="mt-3 text-gray-700 dark:text-white/80">
                {t('landing.conflictProtection.description2')}
              </p>
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-slate-950/60 p-8 md:w-64">
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-primary-400" />
                <p className="mt-3 text-sm font-medium text-gray-900 dark:text-white">{t('landing.conflictProtection.versionHistory.title')}</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-white/60">{t('landing.conflictProtection.versionHistory.subtitle')}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-900/60 p-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">{t('landing.features.title')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-white/70">
              {t('landing.features.subtitle')}
            </p>
            <div className="mt-8 grid gap-4 text-sm text-gray-600 dark:text-white/70 sm:grid-cols-3">
              {features.map((item) => (
                <div key={item} className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-900/60 p-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('landing.gettingStarted.title')}</h2>
            <p className="mt-3 text-base text-gray-600 dark:text-white/70">{t('landing.gettingStarted.subtitle')}</p>
            <div className="mx-auto mt-6 max-w-3xl space-y-6 text-left">
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/40 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">1</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{t('landing.gettingStarted.steps.step1.title')}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-white/70"
                      dangerouslySetInnerHTML={{
                        __html: t('landing.gettingStarted.steps.step1.description')
                          .replace(/`(.+?)`/g, '<span class="font-mono text-primary-300">$1</span>')
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/40 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">2</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{t('landing.gettingStarted.steps.step2.title')}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-white/70">
                      {t('landing.gettingStarted.steps.step2.description')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/40 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">3</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{t('landing.gettingStarted.steps.step3.title')}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-white/70">
                      {t('landing.gettingStarted.steps.step3.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-gray-50/70 via-white/50 to-gray-50/70 dark:from-slate-900/70 dark:via-slate-900/50 dark:to-slate-950/70 p-10 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('landing.faq.title')}</h2>
            <p className="mt-3 text-base text-gray-500 dark:text-white/60">{t('landing.faq.subtitle')}</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/40 p-6 transition-all duration-300 hover:border-primary-400/30 hover:bg-gray-50 dark:hover:bg-slate-950/60">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-start gap-2">
                <span className="text-primary-400">Q:</span>
                {t('landing.faq.questions.forgotPassword.q')}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-gray-700 dark:text-white/80"
                dangerouslySetInnerHTML={{
                  __html: t('landing.faq.questions.forgotPassword.a').replace(/\*\*(.+?)\*\*/g, '<span class="font-bold text-gray-900 dark:text-white">$1</span>')
                }}
              />
            </article>
            <article className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/40 p-6 transition-all duration-300 hover:border-primary-400/30 hover:bg-gray-50 dark:hover:bg-slate-950/60">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-start gap-2">
                <span className="text-primary-400">Q:</span>
                {t('landing.faq.questions.actuallyFree.q')}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-gray-700 dark:text-white/80"
                dangerouslySetInnerHTML={{
                  __html: t('landing.faq.questions.actuallyFree.a').replace(/\*\*(.+?)\*\*/g, '<span class="font-bold text-gray-900 dark:text-white">$1</span>')
                }}
              />
            </article>
            <article className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/40 p-6 transition-all duration-300 hover:border-primary-400/30 hover:bg-gray-50 dark:hover:bg-slate-950/60">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-start gap-2">
                <span className="text-primary-400">Q:</span>
                {t('landing.faq.questions.hackServers.q')}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-gray-700 dark:text-white/80"
                dangerouslySetInnerHTML={{
                  __html: t('landing.faq.questions.hackServers.a').replace(/\*\*(.+?)\*\*/g, '<span class="font-bold text-gray-900 dark:text-white">$1</span>')
                }}
              />
            </article>
            <article className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/40 p-6 transition-all duration-300 hover:border-primary-400/30 hover:bg-gray-50 dark:hover:bg-slate-950/60">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-start gap-2">
                <span className="text-primary-400">Q:</span>
                {t('landing.faq.questions.teamCollaboration.q')}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-gray-700 dark:text-white/80">
                {t('landing.faq.questions.teamCollaboration.a')}
              </p>
            </article>
            <article className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/40 p-6 transition-all duration-300 hover:border-primary-400/30 hover:bg-gray-50 dark:hover:bg-slate-950/60">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-start gap-2">
                <span className="text-primary-400">Q:</span>
                {t('landing.faq.questions.takeUrl.q')}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-gray-700 dark:text-white/80">
                {t('landing.faq.questions.takeUrl.a')}
              </p>
            </article>
            <article className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/40 p-6 transition-all duration-300 hover:border-primary-400/30 hover:bg-gray-50 dark:hover:bg-slate-950/60">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-start gap-2">
                <span className="text-primary-400">Q:</span>
                {t('landing.faq.questions.governmentRequest.q')}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-gray-700 dark:text-white/80"
                dangerouslySetInnerHTML={{
                  __html: t('landing.faq.questions.governmentRequest.a').replace(/\*\*(.+?)\*\*/g, '<span class="font-bold text-gray-900 dark:text-white">$1</span>')
                }}
              />
            </article>
            <article className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950/40 p-6 transition-all duration-300 hover:border-primary-400/30 hover:bg-gray-50 dark:hover:bg-slate-950/60">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-start gap-2">
                <span className="text-primary-400">Q:</span>
                {t('landing.faq.questions.whyTrust.q')}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-gray-700 dark:text-white/80"
                dangerouslySetInnerHTML={{
                  __html: t('landing.faq.questions.whyTrust.a').replace(/\*\*(.+?)\*\*/g, '<span class="font-bold text-gray-900 dark:text-white">$1</span>')
                }}
              />
            </article>
            <article className="rounded-2xl border border-primary-400/20 bg-gradient-to-br from-primary-500/10 to-white dark:to-slate-950/40 p-6 transition-all duration-300 hover:border-primary-400/40 hover:from-primary-500/15">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-start gap-2">
                <span className="text-primary-400">Q:</span>
                {t('landing.faq.questions.protectedTextPro.q')}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-gray-700 dark:text-white/80"
                dangerouslySetInnerHTML={{
                  __html: t('landing.faq.questions.protectedTextPro.a').replace(/\*\*(.+?)\*\*/g, '<span class="font-bold text-gray-900 dark:text-white">$1</span>')
                }}
              />
              <Link href={`/${locale}/pro`} className="ml-1 font-semibold text-primary-300 hover:text-primary-200 transition-colors">
                {t('landing.faq.questions.protectedTextPro.linkText')}
              </Link>
            </article>
          </div>
        </section>

        <footer className="mt-16 border-t border-gray-200 dark:border-white/10 bg-gradient-to-b from-gray-50/40 to-white/60 dark:from-slate-900/40 dark:to-slate-950/60 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-6 py-12">
            <div className="grid gap-10 md:grid-cols-3">
              {/* About Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-primary-500/10 p-2 ring-1 ring-primary-400/30">
                    <ShieldCheck className="h-5 w-5 text-primary-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Protected Text</h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-white/70">
                  {t('landing.footer.about.description')}
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/taoyadev/protected-text"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-white/5 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white transition-all duration-300 hover:border-primary-400/50 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-primary-300"
                  >
                    <Github className="h-4 w-4" />
                    <span>{t('landing.footer.about.starOnGithub')}</span>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-white">{t('common.navigation.quickLinks')}</h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-white/70">
                  <li>
                    <Link href={`/${locale}#features`} className="inline-flex items-center gap-2 transition-colors hover:text-primary-300">
                      <Zap className="h-3.5 w-3.5" />
                      {t('common.navigation.features')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}#security`} className="inline-flex items-center gap-2 transition-colors hover:text-primary-300">
                      <Lock className="h-3.5 w-3.5" />
                      {t('common.navigation.securityAndPrivacy')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}#faq`} className="inline-flex items-center gap-2 transition-colors hover:text-primary-300">
                      <FileText className="h-3.5 w-3.5" />
                      {t('common.navigation.faq')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/pro`} className="inline-flex items-center gap-2 transition-colors hover:text-primary-300">
                      <ArrowRight className="h-3.5 w-3.5" />
                      {t('common.navigation.roadmap')}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact & Resources */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-white">{t('common.navigation.getInTouch')}</h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-white/70">
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
                  <p className="text-xs font-medium text-primary-300">{t('landing.footer.security.title')}</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-white/60">
                    {t('landing.footer.security.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 dark:border-white/5 pt-8 text-xs text-gray-400 dark:text-white/50 md:flex-row">
              <p className="flex items-center gap-2">
                {t('landing.footer.bottom.builtWith')} <Heart className="h-3.5 w-3.5 text-red-400" fill="currentColor" /> {t('landing.footer.bottom.in2025')}
              </p>
              <p className="text-center text-gray-400 dark:text-white/40">
                {t('landing.footer.bottom.license')}
                <br className="md:hidden" />
                {t('landing.footer.bottom.disclaimer')}
              </p>
            </div>
          </div>
        </footer>
      </main>
      </div>
    </div>
  );
}

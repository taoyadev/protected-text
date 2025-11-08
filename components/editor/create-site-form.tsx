'use client';

import { FormEvent, useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { normalizeSiteName, isSiteNameValid, generateSiteNameHint } from '@/lib/site';
import { Sparkles, Wand2 } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-provider';

export function CreateSiteForm() {
  const router = useRouter();
  const { locale, t } = useTranslation();
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [placeholder, setPlaceholder] = useState('my-secure-note');

  // Generate random placeholder on client side to avoid hydration mismatch
  useEffect(() => {
    setPlaceholder(generateSiteNameHint());
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = normalizeSiteName(value);

    if (!isSiteNameValid(normalized)) {
      setError(t('errors.validation.siteNameInvalid'));
      return;
    }

    setError(null);
    startTransition(() => {
      // For English, use root path; for others, use /{locale}
      const path = locale === 'en' ? `/${normalized}` : `/${locale}/${normalized}`;
      router.push(path as any);
    });
  };

  const handleRandom = () => {
    const hint = generateSiteNameHint();
    setValue(hint);
    setError(null);
  };

  return (
    <form
      id="create-note"
      onSubmit={handleSubmit}
      className="group flex flex-col gap-4 rounded-3xl border-2 border-primary-500/30 bg-gradient-to-br from-gray-50/90 via-gray-100/90 to-white/90 dark:from-slate-800/90 dark:via-slate-900/90 dark:to-slate-950/90 p-6 text-left shadow-2xl shadow-primary-500/20 backdrop-blur-xl hover:border-primary-400/50 hover:shadow-primary-500/30 transition-all duration-500 ring-1 ring-primary-400/20"
    >
      <label className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2" htmlFor="site-name">
        <Sparkles className="h-4 w-4 text-primary-300" />
        {t('landing.createSiteForm.label')}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          id="site-name"
          name="site-name"
          placeholder={placeholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoComplete="off"
          className="flex-1 text-base"
        />
        <Button type="submit" isLoading={isPending} className="whitespace-nowrap px-8 font-semibold">
          <Sparkles className="h-4 w-4" />
          {t('landing.createSiteForm.submitButton')}
        </Button>
      </div>
      <div className="flex items-center justify-between gap-4 text-xs text-gray-700 dark:text-white/80">
        <p className="font-mono text-gray-600 dark:text-white/70">{t('landing.createSiteForm.urlPrefix')}<span className="text-primary-300 font-semibold">{t('landing.createSiteForm.urlPlaceholder')}</span></p>
        <button
          type="button"
          onClick={handleRandom}
          className="inline-flex items-center gap-1.5 font-bold text-primary-300 hover:text-primary-200 transition-colors duration-200 group/btn"
        >
          <Wand2 className="h-3.5 w-3.5 group-hover/btn:rotate-12 transition-transform duration-300" />
          {t('landing.createSiteForm.randomButton')}
        </button>
      </div>
      {error && <p className="text-sm text-red-300">{error}</p>}
    </form>
  );
}

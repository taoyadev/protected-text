'use client';

import { FormEvent, useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { normalizeSiteName, isSiteNameValid, generateSiteNameHint } from '@/lib/site';
import { Sparkles, Wand2 } from 'lucide-react';

export function CreateSiteForm() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const placeholder = useMemo(() => generateSiteNameHint(), []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = normalizeSiteName(value);

    if (!isSiteNameValid(normalized)) {
      setError('Use 3-32 lowercase letters, numbers or dashes.');
      return;
    }

    setError(null);
    startTransition(() => {
      router.push(`/${normalized}`);
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
      className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-left shadow-xl shadow-black/30 backdrop-blur"
    >
      <label className="text-sm font-medium text-white/80" htmlFor="site-name">
        Choose a private URL
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
        <Button type="submit" isLoading={isPending} className="whitespace-nowrap px-6">
          <Sparkles className="h-4 w-4" />
          Secure my note
        </Button>
      </div>
      <div className="flex items-center justify-between gap-4 text-xs text-white/60">
        <p>URL lives at protected-text.com/[your-url]</p>
        <button
          type="button"
          onClick={handleRandom}
          className="inline-flex items-center gap-1 font-medium text-primary-300 hover:text-primary-200"
        >
          <Wand2 className="h-3.5 w-3.5" /> Surprise me
        </button>
      </div>
      {error && <p className="text-sm text-red-300">{error}</p>}
    </form>
  );
}

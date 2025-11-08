'use client';

import { FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getPasswordScore } from '@/lib/password';
import { Lock } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-provider';

interface PasswordGateProps {
  type: 'create' | 'unlock';
  loading?: boolean;
  error?: string | null;
  onSubmit: (password: string) => Promise<void> | void;
}

export function PasswordGate({ type, loading, error, onSubmit }: PasswordGateProps) {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (type === 'create' && password !== confirm) {
      setLocalError(t('errors.password.passwordsDoNotMatch'));
      return;
    }

    setLocalError(null);
    await onSubmit(password);
  };

  const score = getPasswordScore(password);

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 rounded-3xl border border-gray-300 dark:border-white/20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-slate-950/90 dark:via-slate-900/80 dark:to-slate-950/90 p-10 text-left shadow-2xl shadow-black/15 dark:shadow-black/40 backdrop-blur-xl animate-fade-in-up">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-primary-500/10 p-3 ring-2 ring-primary-400/30 shadow-lg shadow-primary-900/20">
          <Lock className="h-6 w-6 text-primary-400" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary-300/90">
            {type === 'create' ? t('dialogs.passwordGate.createPassword') : t('dialogs.passwordGate.unlockNote')}
          </p>
          <p className="mt-1 text-base text-gray-700 dark:text-white/80">{t('dialogs.passwordGate.passwordsNeverLeave')}</p>
        </div>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password" className="text-sm text-gray-600 dark:text-white/70">
            {t('dialogs.passwordGate.passwordLabel')}
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoFocus
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {password && (
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-white/60">
              <span className={`h-2 w-16 rounded-full ${score.color}`} />
              {score.label}
            </div>
          )}
        </div>
        {type === 'create' && (
          <div>
            <label htmlFor="confirm" className="text-sm text-gray-600 dark:text-white/70">
              {t('dialogs.passwordGate.confirmPasswordLabel')}
            </label>
            <Input
              id="confirm"
              name="confirm"
              type="password"
              required
              minLength={8}
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
            />
          </div>
        )}
        {(error || localError) && <p className="text-sm text-red-300">{error || localError}</p>}
        <Button type="submit" isLoading={loading} className="w-full">
          {type === 'create' ? t('dialogs.passwordGate.startWriting') : t('dialogs.passwordGate.unlock') }
        </Button>
      </form>
    </div>
  );
}

'use client';

import { FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getPasswordScore } from '@/lib/password';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-provider';

interface PasswordGateProps {
  type: 'create' | 'unlock';
  loading?: boolean;
  error?: string | null;
  onSubmit: (password: string) => Promise<void> | void;
}

export function PasswordGate({
  type,
  loading,
  error,
  onSubmit,
}: PasswordGateProps) {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
    <div className="mx-auto flex max-w-md animate-fade-in-up flex-col gap-6 rounded-3xl border border-gray-300 bg-gradient-to-br from-white via-gray-50 to-white p-10 text-left shadow-2xl shadow-black/15 backdrop-blur-xl dark:border-white/20 dark:from-slate-950/90 dark:via-slate-900/80 dark:to-slate-950/90 dark:shadow-black/40">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-primary-500/10 p-3 shadow-lg shadow-primary-900/20 ring-2 ring-primary-400/30">
          <Lock className="h-6 w-6 text-primary-400" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary-300/90">
            {type === 'create'
              ? t('dialogs.passwordGate.createPassword')
              : t('dialogs.passwordGate.unlockNote')}
          </p>
          <p className="mt-1 text-base text-gray-700 dark:text-white/80">
            {t('dialogs.passwordGate.passwordsNeverLeave')}
          </p>
        </div>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="relative">
          <label
            htmlFor="password"
            className="text-sm text-gray-600 dark:text-white/70"
          >
            {t('dialogs.passwordGate.passwordLabel')}
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              autoFocus
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={
                showPassword
                  ? t('common.actions.hidePassword')
                  : t('common.actions.showPassword')
              }
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {password && (
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-white/60">
              <span className={`h-2 w-16 rounded-full ${score.color}`} />
              {score.label}
            </div>
          )}
        </div>
        {type === 'create' && (
          <div className="relative">
            <label
              htmlFor="confirm"
              className="text-sm text-gray-600 dark:text-white/70"
            >
              {t('dialogs.passwordGate.confirmPasswordLabel')}
            </label>
            <div className="relative">
              <Input
                id="confirm"
                name="confirm"
                type={showConfirm ? 'text' : 'password'}
                required
                minLength={8}
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label={
                  showConfirm
                    ? t('common.actions.hidePassword')
                    : t('common.actions.showPassword')
                }
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        )}
        {(error || localError) && (
          <p
            className="text-sm font-medium text-red-600 dark:text-red-400"
            role="alert"
          >
            {error || localError}
          </p>
        )}
        <Button type="submit" isLoading={loading} className="w-full">
          {type === 'create'
            ? t('dialogs.passwordGate.startWriting')
            : t('dialogs.passwordGate.unlock')}
        </Button>
      </form>
    </div>
  );
}

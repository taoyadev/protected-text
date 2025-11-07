'use client';

import { FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getPasswordScore } from '@/lib/password';
import { Lock } from 'lucide-react';

interface PasswordGateProps {
  type: 'create' | 'unlock';
  loading?: boolean;
  error?: string | null;
  onSubmit: (password: string) => Promise<void> | void;
}

export function PasswordGate({ type, loading, error, onSubmit }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (type === 'create' && password !== confirm) {
      setLocalError('Passwords do not match');
      return;
    }

    setLocalError(null);
    await onSubmit(password);
  };

  const score = getPasswordScore(password);

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-8 text-left shadow-2xl">
      <div className="flex items-center gap-3">
        <Lock className="h-5 w-5 text-primary-300" />
        <div>
          <p className="text-sm uppercase tracking-widest text-white/60">
            {type === 'create' ? 'Create password' : 'Unlock note'}
          </p>
          <p className="text-base text-white/80">Passwords never leave your device.</p>
        </div>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password" className="text-sm text-white/70">
            Password
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
            <div className="mt-2 flex items-center gap-2 text-xs text-white/60">
              <span className={`h-2 w-16 rounded-full ${score.color}`} />
              {score.label}
            </div>
          )}
        </div>
        {type === 'create' && (
          <div>
            <label htmlFor="confirm" className="text-sm text-white/70">
              Confirm password
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
          {type === 'create' ? 'Start writing' : 'Unlock' }
        </Button>
      </form>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useTranslation } from '@/lib/i18n-provider';

interface Props {
  open: boolean;
  siteName: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export function DeleteNoteDialog({ open, siteName, onClose, onConfirm }: Props) {
  const { t } = useTranslation();
  const [confirmText, setConfirmText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (confirmText !== siteName) {
      toast.error(t('toasts.error.pleaseTypeToConfirm', { siteName }));
      return;
    }

    setIsLoading(true);
    try {
      await onConfirm();
      setConfirmText('');
    } catch {
      toast.error(t('toasts.error.failedToDeleteNote'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setConfirmText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-red-500/30 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <h2 className="text-xl font-semibold text-white">{t('dialogs.deleteNote.title')}</h2>
          </div>
          <button onClick={handleClose} className="text-white/70 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6 space-y-2 text-sm text-white/70">
          <p dangerouslySetInnerHTML={{
            __html: t('dialogs.deleteNote.warning1').replace(/\*\*(.+?)\*\*/g, '<strong class="text-red-400">$1</strong>')
          }} />
          <p dangerouslySetInnerHTML={{
            __html: t('dialogs.deleteNote.warning2').replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
          }} />
          <p className="mt-4">
            {t('dialogs.deleteNote.confirmPrompt')} <span className="font-mono font-semibold text-white">{siteName}</span> {t('dialogs.deleteNote.confirmPromptSuffix')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={siteName}
            autoFocus
            disabled={isLoading}
            className="font-mono"
          />

          <div className="flex gap-3">
            <Button type="button" variant="ghost" onClick={handleClose} className="flex-1" disabled={isLoading}>
              {t('dialogs.deleteNote.cancel')}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-red-600 text-white hover:bg-red-700"
              isLoading={isLoading}
              disabled={confirmText !== siteName}
            >
              {t('dialogs.deleteNote.deleteForever')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

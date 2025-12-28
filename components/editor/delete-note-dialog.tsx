'use client';

import { useState, useEffect, useRef } from 'react';
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

export function DeleteNoteDialog({
  open,
  siteName,
  onClose,
  onConfirm,
}: Props) {
  const { t } = useTranslation();
  const [confirmText, setConfirmText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Store the trigger element when dialog opens
  useEffect(() => {
    if (open && !triggerRef.current) {
      triggerRef.current = document.activeElement as HTMLElement;
    }
  }, [open]);

  // Focus trap and initial focus
  useEffect(() => {
    if (!open) return;

    // Focus first input after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 50);

    // Focus trap
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('keydown', handleTab);
    };
  }, [open]);

  // Return focus to trigger on close
  useEffect(() => {
    if (!open && triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [open]);

  // Escape key closes dialog
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

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

  const dialogId = 'delete-note-dialog-title';
  const dialogDescId = 'delete-note-dialog-desc';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm dark:bg-black/70"
      onClick={handleClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogId}
        aria-describedby={dialogDescId}
        className="w-full max-w-md rounded-2xl border border-red-500/30 bg-white p-6 shadow-2xl dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle
              className="h-6 w-6 text-red-400"
              aria-hidden="true"
            />
            <h2
              id={dialogId}
              className="text-xl font-semibold text-gray-900 dark:text-white"
            >
              {t('dialogs.deleteNote.title')}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
            aria-label={t('common.actions.close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          id={dialogDescId}
          className="mb-6 space-y-2 text-sm text-gray-600 dark:text-white/70"
        >
          <p
            dangerouslySetInnerHTML={{
              __html: t('dialogs.deleteNote.warning1').replace(
                /\*\*(.+?)\*\*/g,
                '<strong class="text-red-400">$1</strong>',
              ),
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: t('dialogs.deleteNote.warning2').replace(
                /\*\*(.+?)\*\*/g,
                '<strong class="text-gray-900 dark:text-white">$1</strong>',
              ),
            }}
          />
          <p className="mt-4">
            {t('dialogs.deleteNote.confirmPrompt')}{' '}
            <span className="font-mono font-semibold text-gray-900 dark:text-white">
              {siteName}
            </span>{' '}
            {t('dialogs.deleteNote.confirmPromptSuffix')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            ref={firstInputRef}
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={siteName}
            disabled={isLoading}
            className="font-mono"
          />

          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              className="flex-1"
              disabled={isLoading}
            >
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

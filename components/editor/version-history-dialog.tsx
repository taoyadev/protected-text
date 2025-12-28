'use client';

import { useState, useEffect, useRef } from 'react';
import { X, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTranslation } from '@/lib/i18n-provider';
import { formatDate } from '@/lib/i18n';

interface Version {
  encrypted: string;
  iv: string;
  salt: string;
  timestamp: number;
  version: number;
  size: number;
}

interface Props {
  open: boolean;
  siteName: string;
  onClose: () => void;
  onRestore: (version: Version) => Promise<void>;
}

export function VersionHistoryDialog({
  open,
  siteName,
  onClose,
  onRestore,
}: Props) {
  const { locale, t } = useTranslation();
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
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

    // Focus close button after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      closeButtonRef.current?.focus();
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
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      loadVersions();
    }
  }, [open, siteName]);

  const loadVersions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/versions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteName }),
      });
      const data = await response.json();
      setVersions(data.versions || []);
    } catch {
      toast.error(t('toasts.error.failedToLoadVersionHistory'));
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (version: Version) => {
    try {
      await onRestore(version);
      toast.success(t('toasts.success.versionRestored'));
      onClose();
    } catch {
      toast.error(t('toasts.error.failedToRestoreVersion'));
    }
  };

  if (!open) return null;

  const dialogId = 'version-history-dialog-title';
  const dialogDescId = 'version-history-dialog-desc';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm dark:bg-black/70"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogId}
        aria-describedby={dialogDescId}
        className="flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary-400" aria-hidden="true" />
            <h2
              id={dialogId}
              className="text-xl font-semibold text-gray-900 dark:text-white"
            >
              {t('dialogs.versionHistory.title')}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
            aria-label={t('common.actions.close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div
            id={dialogDescId}
            className="flex items-center justify-center py-12 text-gray-600 dark:text-white/70"
          >
            {t('dialogs.versionHistory.loading')}
          </div>
        ) : versions.length === 0 ? (
          <div
            id={dialogDescId}
            className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-white/50"
          >
            <History className="mb-3 h-12 w-12 opacity-30" aria-hidden="true" />
            <p>{t('dialogs.versionHistory.noVersions')}</p>
          </div>
        ) : (
          <div id={dialogDescId} className="flex-1 space-y-2 overflow-y-auto">
            {versions.map((version, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-100 p-4 transition-colors hover:bg-gray-200 dark:border-white/10 dark:bg-slate-800/40 dark:hover:bg-slate-800/60"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('dialogs.versionHistory.versionNumber')}{' '}
                    {versions.length - index}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-white/50">
                    {formatDate(new Date(version.timestamp), locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    · {version.size}{' '}
                    {t('dialogs.versionHistory.charactersLabel')}
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => handleRestore(version)}
                  aria-label={`${t('dialogs.versionHistory.restore')} ${t('dialogs.versionHistory.versionNumber')} ${versions.length - index}`}
                >
                  {t('dialogs.versionHistory.restore')}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

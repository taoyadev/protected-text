'use client';

import { useState, useEffect } from 'react';
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

export function VersionHistoryDialog({ open, siteName, onClose, onRestore }: Props) {
  const { locale, t } = useTranslation();
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('dialogs.versionHistory.title')}</h2>
          </div>
          <button onClick={onClose} className="text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-600 dark:text-white/70">
            {t('dialogs.versionHistory.loading')}
          </div>
        ) : versions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-white/50">
            <History className="mb-3 h-12 w-12 opacity-30" />
            <p>{t('dialogs.versionHistory.noVersions')}</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-2">
            {versions.map((version, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-slate-800/40 p-4 hover:bg-gray-200 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('dialogs.versionHistory.versionNumber')} {versions.length - index}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-white/50">
                    {formatDate(new Date(version.timestamp), locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })} · {version.size} {t('dialogs.versionHistory.charactersLabel')}
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => handleRestore(version)}
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

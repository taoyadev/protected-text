'use client';

import React from 'react';
import { Type, Keyboard, Check, Loader2 } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-provider';

export type AutosaveStatus = 'saved' | 'saving' | 'unsaved';

interface EditorStats {
  words: number;
  chars: number;
  lines: number;
}

interface AutosaveIndicatorProps {
  status: AutosaveStatus;
}

export const AutosaveIndicator = React.memo(function AutosaveIndicator({
  status,
}: AutosaveIndicatorProps) {
  const { t } = useTranslation();

  if (status === 'saving') {
    return (
      <span
        className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400"
        role="status"
        aria-live="polite"
      >
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
        {t('editor.autosave.saving')}
      </span>
    );
  }

  if (status === 'unsaved') {
    return (
      <span
        className="flex items-center gap-2 text-sm text-red-500 dark:text-red-400"
        role="status"
        aria-live="polite"
      >
        <span
          className="h-2 w-2 rounded-full bg-red-500 dark:bg-red-400"
          aria-hidden="true"
        />
        {t('editor.autosave.unsavedChanges')}
      </span>
    );
  }

  return (
    <span
      className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400"
      role="status"
      aria-live="polite"
    >
      <Check className="h-3.5 w-3.5" aria-hidden="true" />
      {t('editor.autosave.allChangesSaved')}
    </span>
  );
});

interface EditorStatsBarProps {
  stats: EditorStats;
  onShowShortcuts: () => void;
}

export const EditorStatsBar = React.memo(function EditorStatsBar({
  stats,
  onShowShortcuts,
}: EditorStatsBarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50 px-6 py-3 text-xs text-gray-500 shadow-lg shadow-black/10 backdrop-blur-xl dark:border-white/20 dark:from-slate-900/60 dark:via-slate-900/50 dark:to-slate-900/60 dark:text-white/60 dark:shadow-black/20">
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-2 font-medium">
          <Type className="h-3.5 w-3.5 text-primary-400" aria-hidden="true" />
          <span className="text-gray-900 dark:text-white">
            {stats.words}
          </span>{' '}
          {t('editor.stats.words')}
        </span>
        <span className="flex items-center gap-1">
          <span className="text-gray-900 dark:text-white">{stats.chars}</span>{' '}
          {t('editor.stats.characters')}
        </span>
        <span className="flex items-center gap-1">
          <span className="text-gray-900 dark:text-white">{stats.lines}</span>{' '}
          {t('editor.stats.lines')}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onShowShortcuts}
          className="flex items-center gap-1 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-white/70"
          aria-label={t('editor.shortcuts.showShortcuts')}
        >
          <Keyboard className="h-3.5 w-3.5" />
          <span className="text-xs">?</span>
        </button>
      </div>
    </div>
  );
});

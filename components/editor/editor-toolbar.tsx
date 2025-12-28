'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import {
  Download,
  Link2,
  ShieldCheck,
  Key,
  Trash2,
  RefreshCw,
  Upload,
  Search,
  Eye,
  Edit3,
  History,
  Sun,
  Moon,
  Copy,
  Keyboard,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n-provider';
import { AutosaveIndicator, type AutosaveStatus } from './editor-stats';

interface EditorToolbarProps {
  siteName: string;
  autosaveStatus: AutosaveStatus;
  showMarkdownPreview: boolean;
  showSearch: boolean;
  isReloading: boolean;
  copySuccess: boolean;
  mounted: boolean;
  onToggleMarkdownPreview: () => void;
  onToggleSearch: () => void;
  onShowKeyboardShortcuts: () => void;
  onShowVersionHistory: () => void;
  onReload: () => void;
  onImport: () => void;
  onExport: () => void;
  onCopyAll: () => void;
  onShare: () => void;
  onChangePassword: () => void;
  onDelete: () => void;
}

export const EditorToolbar = React.memo(function EditorToolbar({
  siteName,
  autosaveStatus,
  showMarkdownPreview,
  showSearch: _showSearch,
  isReloading,
  copySuccess,
  mounted,
  onToggleMarkdownPreview,
  onToggleSearch,
  onShowKeyboardShortcuts,
  onShowVersionHistory,
  onReload,
  onImport,
  onExport,
  onCopyAll,
  onShare,
  onChangePassword,
  onDelete,
}: EditorToolbarProps) {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast.success(
      newTheme === 'light'
        ? t('editor.theme.switchedToLight')
        : t('editor.theme.switchedToDark'),
    );
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50 px-6 py-4 text-sm text-gray-600 shadow-xl shadow-black/10 backdrop-blur-xl dark:border-white/20 dark:from-slate-900/60 dark:via-slate-900/50 dark:to-slate-900/60 dark:text-white/70 dark:shadow-black/20">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary-500/10 p-2 ring-1 ring-primary-400/20">
          <ShieldCheck
            className="h-4 w-4 text-primary-400"
            aria-hidden="true"
          />
        </div>
        <p className="flex items-center gap-2">
          <span className="text-gray-500 dark:text-white/60">
            {t('editor.toolbar.site')}
          </span>
          <span className="bg-gradient-to-r from-primary-300 to-indigo-300 bg-clip-text font-bold text-gray-900 text-transparent dark:text-white">
            /{siteName}
          </span>
        </p>
        <AutosaveIndicator status={autosaveStatus} />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {mounted && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={handleThemeToggle}
            title={
              theme === 'dark'
                ? t('editor.toolbar.switchToLightMode')
                : t('editor.toolbar.switchToDarkMode')
            }
            aria-label={
              theme === 'dark'
                ? t('editor.toolbar.switchToLightMode')
                : t('editor.toolbar.switchToDarkMode')
            }
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        )}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={onToggleMarkdownPreview}
          title={t('editor.toolbar.toggleMarkdownPreview')}
          aria-label={t('editor.toolbar.toggleMarkdownPreview')}
        >
          {showMarkdownPreview ? (
            <Edit3 className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={onToggleSearch}
          title={t('editor.toolbar.search')}
          aria-label={t('editor.toolbar.search')}
        >
          <Search className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={onShowKeyboardShortcuts}
          title={t('editor.shortcuts.title')}
          aria-label={t('editor.shortcuts.title')}
        >
          <Keyboard className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={onShowVersionHistory}
          title={t('editor.toolbar.versionHistory')}
          aria-label={t('editor.toolbar.versionHistory')}
        >
          <History className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={onReload}
          disabled={isReloading}
          title={t('editor.toolbar.reload')}
          aria-label={t('editor.toolbar.reload')}
        >
          <RefreshCw
            className={`h-4 w-4 ${isReloading ? 'animate-spin' : ''}`}
            aria-hidden="true"
          />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={onImport}
          title={t('editor.toolbar.import')}
          aria-label={t('editor.toolbar.import')}
        >
          <Upload className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={onExport}
          title={t('editor.toolbar.export')}
          aria-label={t('editor.toolbar.export')}
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={onCopyAll}
          title={t('common.actions.copyAll')}
          aria-label={t('common.actions.copyAll')}
        >
          {copySuccess ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={onShare}
          title={t('common.actions.share')}
          aria-label={t('common.actions.share')}
        >
          <Link2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={onChangePassword}
          title={t('editor.toolbar.changePassword')}
          aria-label={t('editor.toolbar.changePassword')}
        >
          <Key className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="text-red-400 hover:text-red-300"
          onClick={onDelete}
          title={t('common.actions.delete')}
          aria-label={t('common.actions.delete')}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
});

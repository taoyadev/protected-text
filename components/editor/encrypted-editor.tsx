'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import {
  Download,
  Link2,
  ShieldCheck,
  Key,
  Trash2,
  RefreshCw,
  Type,
  Upload,
  Search,
  Eye,
  Edit3,
  History,
  Sun,
  Moon,
} from 'lucide-react';
import { PasswordGate } from '@/components/editor/password-gate';
import { Textarea } from '@/components/ui/textarea';
import { useDebounce } from '@/hooks/use-debounce';
import { decryptContent, encryptContent, EncryptedPayload } from '@/lib/crypto';
import { loadEncryptedNote, saveEncryptedNote, deleteNote } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { ChangePasswordDialog } from '@/components/editor/change-password-dialog';
import { DeleteNoteDialog } from '@/components/editor/delete-note-dialog';
import { MarkdownPreview } from '@/components/editor/markdown-preview';
import { VersionHistoryDialog } from '@/components/editor/version-history-dialog';
import { useTranslation } from '@/lib/i18n-provider';
import { formatTime } from '@/lib/i18n';

interface Props {
  siteName: string;
}

type Status = 'loading' | 'locked' | 'ready';

export function EncryptedEditor({ siteName }: Props) {
  const { locale, t } = useTranslation();
  const [status, setStatus] = useState<Status>('loading');
  const [mode, setMode] = useState<'create' | 'unlock'>('create');
  const [payload, setPayload] = useState<EncryptedPayload | null>(null);
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<number | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const debouncedContent = useDebounce(content, 1500);

  // Hydration protection
  useEffect(() => {
    setMounted(true);
  }, []);

  // Word and character count
  const stats = useMemo(() => {
    const chars = content.length;
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const lines = content.split('\n').length;
    return { chars, words, lines };
  }, [content]);

  useEffect(() => {
    async function bootstrap() {
      try {
        const response = await loadEncryptedNote(siteName);
        if (response.payload) {
          setPayload(response.payload);
          setMode('unlock');
        } else {
          setMode('create');
        }
      } catch (err) {
        console.error(err);
        toast.error(t('errors.network.unableToReachServer'));
      } finally {
        setStatus('locked');
        setInitializing(false);
      }
    }

    bootstrap();
  }, [siteName]);

  const handlePassword = async (pwd: string) => {
    if (!pwd) return;
    setError(null);

    if (mode === 'unlock' && payload) {
      try {
        const decrypted = await decryptContent(payload, pwd);
        setPassword(pwd);
        setContent(decrypted);
        setIsDirty(false);
        setStatus('ready');
        return;
      } catch (err) {
        console.error(err);
        setError(t('errors.password.incorrectPassword'));
        toast.error(t('errors.password.incorrectPassword'));
        return;
      }
    }

    setPassword(pwd);
    setContent('');
    setIsDirty(false);
    setStatus('ready');
  };

  useEffect(() => {
    if (status !== 'ready' || !password) return;
    if (!isDirty) return;
    let cancelled = false;

    async function persist() {
      try {
        setIsSaving(true);
        const encrypted = await encryptContent(debouncedContent, password);
        await saveEncryptedNote({
          siteName,
          ...encrypted,
          size: Math.max(0, debouncedContent.length),
        });
        if (!cancelled) {
          setLastSaved(Date.now());
          setIsDirty(false);
        }
      } catch (err) {
        console.error(err);
        toast.error(t('toasts.error.failedToSaveNote'));
      } finally {
        if (!cancelled) setIsSaving(false);
      }
    }

    persist();
    return () => {
      cancelled = true;
    };
  }, [debouncedContent, isDirty, password, siteName, status]);

  const handleChange = (value: string) => {
    setContent(value);
    setIsDirty(true);
  };

  const formattedTimestamp = useMemo(() => {
    if (!lastSaved) return t('common.states.notSavedYet');
    return formatTime(new Date(lastSaved), locale);
  }, [lastSaved, locale, t]);

  const handleExport = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${siteName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/${siteName}`;
    if (!navigator?.clipboard) {
      toast.error(t('errors.network.clipboardUnavailable'));
      return;
    }
    await navigator.clipboard.writeText(url);
    toast.success(t('toasts.success.shareLinkCopied'));
  };

  const handleReload = async () => {
    if (
      isDirty &&
      !confirm(t('errors.confirmations.unsavedChangesReloadAnyway'))
    ) {
      return;
    }

    setIsReloading(true);
    try {
      const response = await loadEncryptedNote(siteName);
      if (response.payload && password) {
        const decrypted = await decryptContent(response.payload, password);
        setContent(decrypted);
        setPayload(response.payload);
        setIsDirty(false);
        toast.success(t('toasts.success.noteReloadedFromServer'));
      } else {
        toast.error(t('errors.network.noNoteFoundOnServer'));
      }
    } catch (err) {
      console.error(err);
      toast.error(t('errors.network.failedToReloadNote'));
    } finally {
      setIsReloading(false);
    }
  };

  const handleChangePassword = async (
    oldPassword: string,
    newPassword: string,
  ) => {
    try {
      // Verify old password by decrypting current content
      if (payload) {
        await decryptContent(payload, oldPassword);
      }

      // Re-encrypt with new password
      const encrypted = await encryptContent(content, newPassword);
      await saveEncryptedNote({
        siteName,
        ...encrypted,
        size: Math.max(0, content.length),
      });

      setPassword(newPassword);
      setPayload(encrypted);
      toast.success(t('toasts.success.passwordChangedSuccessfully'));
      setShowChangePassword(false);
    } catch (err) {
      console.error(err);
      throw new Error(t('errors.password.incorrectOldPassword'));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNote(siteName);
      toast.success(t('toasts.success.noteDeleted'));
      // Redirect to home after a short delay
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error(t('errors.network.failedToDeleteNote'));
    }
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setContent(text);
      setIsDirty(true);
      toast.success(t('toasts.success.fileImportedSuccessfully'));
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  const handleManualSave = async () => {
    if (!isDirty) {
      toast.info(t('toasts.info.noChangesToSave'));
      return;
    }
    try {
      setIsSaving(true);
      const encrypted = await encryptContent(content, password);
      await saveEncryptedNote({
        siteName,
        ...encrypted,
        size: Math.max(0, content.length),
      });
      setLastSaved(Date.now());
      setIsDirty(false);
      toast.success(t('toasts.success.saved'));
    } catch (err) {
      console.error(err);
      toast.error(t('toasts.error.failedToSave'));
    } finally {
      setIsSaving(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S: Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleManualSave();
      }
      // Ctrl/Cmd + F: Search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        setShowSearch((prev) => !prev);
      }
      // Ctrl/Cmd + K: Change Password
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowChangePassword(true);
      }
      // Ctrl/Cmd + E: Export
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        handleExport();
      }
      // Ctrl/Cmd + I: Import
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        handleImport();
      }
      // Esc: Close search
      if (e.key === 'Escape' && showSearch) {
        setShowSearch(false);
        setSearchQuery('');
      }
    };

    if (status === 'ready') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [status, isDirty, showSearch]);

  const handleRestoreVersion = async (version: any) => {
    try {
      const decrypted = await decryptContent(version, password);
      setContent(decrypted);
      setPayload(version);
      setIsDirty(true);
      toast.success(t('toasts.success.versionRestoredSaveToConfirm'));
    } catch (err) {
      console.error(err);
      throw new Error(t('errors.password.failedToDecryptVersion'));
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-600 dark:text-white/70">
        {t('common.states.loadingNote')}
      </div>
    );
  }

  if (status !== 'ready') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <PasswordGate
          type={mode}
          loading={initializing}
          error={error}
          onSubmit={handlePassword}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50 px-6 py-4 text-sm text-gray-600 shadow-xl shadow-black/10 backdrop-blur-xl dark:border-white/20 dark:from-slate-900/60 dark:via-slate-900/50 dark:to-slate-900/60 dark:text-white/70 dark:shadow-black/20">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary-500/10 p-2 ring-1 ring-primary-400/20">
            <ShieldCheck className="h-4 w-4 text-primary-400" />
          </div>
          <p className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-white/60">
              {t('editor.toolbar.site')}
            </span>
            <span className="bg-gradient-to-r from-primary-300 to-indigo-300 bg-clip-text font-bold text-gray-900 text-transparent dark:text-white">
              /{siteName}
            </span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="hidden text-xs md:block">
            {isSaving
              ? t('common.actions.saving')
              : `${t('editor.toolbar.lastSaved')} ${formattedTimestamp}`}
          </p>
          {mounted && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                const newTheme = theme === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
                toast.success(
                  newTheme === 'light'
                    ? t('editor.theme.switchedToLight')
                    : t('editor.theme.switchedToDark'),
                );
              }}
              title={
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
            onClick={() => setShowMarkdownPreview(!showMarkdownPreview)}
            title={t('editor.toolbar.toggleMarkdownPreview')}
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
            onClick={() => setShowSearch(!showSearch)}
            title={t('editor.toolbar.search')}
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setShowVersionHistory(true)}
            title={t('editor.toolbar.versionHistory')}
          >
            <History className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={handleReload}
            disabled={isReloading}
            title={t('editor.toolbar.reload')}
          >
            <RefreshCw
              className={`h-4 w-4 ${isReloading ? 'animate-spin' : ''}`}
            />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={handleImport}
            title={t('editor.toolbar.import')}
          >
            <Upload className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={handleExport}
            title={t('editor.toolbar.export')}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={handleShare}
            title={t('common.actions.share')}
          >
            <Link2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setShowChangePassword(true)}
            title={t('editor.toolbar.changePassword')}
          >
            <Key className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="text-red-400 hover:text-red-300"
            onClick={() => setShowDeleteDialog(true)}
            title={t('common.actions.delete')}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div className="animate-fade-in-down rounded-2xl border border-primary-400/30 bg-gradient-to-r from-gray-50 to-white px-6 py-4 shadow-lg shadow-primary-500/10 backdrop-blur-xl dark:border-primary-500/40 dark:from-slate-900/80 dark:to-slate-950/80 dark:shadow-primary-900/20">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary-500/10 p-2 ring-1 ring-primary-400/20">
              <Search className="h-4 w-4 text-primary-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('editor.search.placeholder')}
              className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-white dark:placeholder:text-white/50"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="rounded-lg bg-primary-500/10 px-3 py-1.5 text-xs font-medium text-primary-600 transition-all duration-200 hover:bg-primary-500/20 hover:text-primary-500 dark:text-primary-300 dark:hover:text-primary-200"
              >
                {t('common.actions.clear')}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md,.text"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Editor / Preview */}
      {showMarkdownPreview ? (
        <MarkdownPreview content={content} />
      ) : (
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(event) => handleChange(event.target.value)}
          placeholder={t('editor.editor.placeholder')}
          className="min-h-[60vh] resize-none rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100 text-base leading-relaxed text-gray-900 shadow-2xl shadow-black/10 backdrop-blur-sm transition-all duration-300 focus:border-primary-400/40 focus:ring-2 focus:ring-primary-400/20 dark:border-white/20 dark:from-slate-950/90 dark:via-slate-950/80 dark:to-slate-900/90 dark:text-white dark:shadow-black/40"
        />
      )}

      {/* Stats bar */}
      <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50 px-6 py-3 text-xs text-gray-500 shadow-lg shadow-black/10 backdrop-blur-xl dark:border-white/20 dark:from-slate-900/60 dark:via-slate-900/50 dark:to-slate-900/60 dark:text-white/60 dark:shadow-black/20">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 font-medium">
            <Type className="h-3.5 w-3.5 text-primary-400" />
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
        <div>
          {isDirty && (
            <span className="flex animate-pulse items-center gap-2 font-medium text-yellow-500 dark:text-yellow-400">
              <span className="h-2 w-2 rounded-full bg-yellow-500 dark:bg-yellow-400" />
              {t('editor.stats.unsavedChanges')}
            </span>
          )}
        </div>
      </div>

      {/* Dialogs */}
      <ChangePasswordDialog
        open={showChangePassword}
        onClose={() => setShowChangePassword(false)}
        onConfirm={handleChangePassword}
      />
      <DeleteNoteDialog
        open={showDeleteDialog}
        siteName={siteName}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
      />
      <VersionHistoryDialog
        open={showVersionHistory}
        siteName={siteName}
        onClose={() => setShowVersionHistory(false)}
        onRestore={handleRestoreVersion}
      />
    </div>
  );
}

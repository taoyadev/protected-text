'use client';

import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { toast } from 'sonner';
import { PasswordGate } from '@/components/editor/password-gate';
import { useDebounce } from '@/hooks/use-debounce';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { decryptContent, encryptContent, EncryptedPayload } from '@/lib/crypto';
import { loadEncryptedNote, saveEncryptedNote, deleteNote } from '@/lib/api';
import { ChangePasswordDialog } from '@/components/editor/change-password-dialog';
import { DeleteNoteDialog } from '@/components/editor/delete-note-dialog';
import { VersionHistoryDialog } from '@/components/editor/version-history-dialog';
import { useTranslation } from '@/lib/i18n-provider';
import { EditorToolbar } from './editor-toolbar';
import { EditorStatsBar, type AutosaveStatus } from './editor-stats';
import { EditorContent, SearchBar, FileImportInput } from './editor-content';
import { KeyboardShortcutsDialog } from './keyboard-shortcuts-dialog';

interface Props {
  siteName: string;
}

type Status = 'loading' | 'locked' | 'ready';

export function EncryptedEditor({ siteName }: Props) {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>('loading');
  const [mode, setMode] = useState<'create' | 'unlock'>('create');
  const [payload, setPayload] = useState<EncryptedPayload | null>(null);
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const debouncedContent = useDebounce(content, 1500);

  // Autosave status calculation
  const autosaveStatus: AutosaveStatus = isSaving
    ? 'saving'
    : isDirty
      ? 'unsaved'
      : 'saved';

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
  }, [siteName, t]);

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

  // Autosave effect
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
  }, [debouncedContent, isDirty, password, siteName, status, t]);

  const handleChange = useCallback((value: string) => {
    setContent(value);
    setIsDirty(true);
  }, []);

  const handleExport = useCallback(() => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${siteName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [content, siteName]);

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/${siteName}`;
    if (!navigator?.clipboard) {
      toast.error(t('errors.network.clipboardUnavailable'));
      return;
    }
    await navigator.clipboard.writeText(url);
    toast.success(t('toasts.success.shareLinkCopied'));
  }, [siteName, t]);

  const handleCopyAll = useCallback(async () => {
    if (!navigator?.clipboard) {
      toast.error(t('errors.network.clipboardUnavailable'));
      return;
    }
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess(true);
      toast.success(t('toasts.success.contentCopied'));
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      toast.error(t('errors.network.clipboardUnavailable'));
    }
  }, [content, t]);

  const handleReload = useCallback(async () => {
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
  }, [isDirty, password, siteName, t]);

  const handleChangePassword = useCallback(
    async (oldPassword: string, newPassword: string) => {
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
    },
    [content, payload, siteName, t],
  );

  const handleDelete = useCallback(async () => {
    try {
      if (!payload) {
        toast.error(t('errors.network.failedToDeleteNote'));
        return;
      }
      await deleteNote(siteName, payload.encrypted);
      toast.success(t('toasts.success.noteDeleted'));
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error(t('errors.network.failedToDeleteNote'));
    }
  }, [payload, siteName, t]);

  const handleImport = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
      e.target.value = '';
    },
    [t],
  );

  const handleManualSave = useCallback(async () => {
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
      setIsDirty(false);
      toast.success(t('toasts.success.saved'));
    } catch (err) {
      console.error(err);
      toast.error(t('toasts.error.failedToSave'));
    } finally {
      setIsSaving(false);
    }
  }, [content, isDirty, password, siteName, t]);

  // Toggle handlers (defined before useKeyboardShortcuts that uses them)
  const toggleMarkdownPreview = useCallback(() => {
    setShowMarkdownPreview((prev) => !prev);
  }, []);

  const toggleSearch = useCallback(() => {
    setShowSearch((prev) => !prev);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // Keyboard shortcuts
  const closeSearch = useCallback(() => {
    setShowSearch(false);
    setSearchQuery('');
  }, []);

  useKeyboardShortcuts({
    enabled: status === 'ready',
    showSearch,
    showKeyboardShortcuts,
    onManualSave: handleManualSave,
    onToggleSearch: toggleSearch,
    onShowChangePassword: useCallback(() => setShowChangePassword(true), []),
    onExport: handleExport,
    onImport: handleImport,
    onShowKeyboardShortcuts: useCallback(
      () => setShowKeyboardShortcuts(true),
      [],
    ),
    onCloseSearch: closeSearch,
    onCloseKeyboardShortcuts: useCallback(
      () => setShowKeyboardShortcuts(false),
      [],
    ),
  });

  const handleRestoreVersion = useCallback(
    async (version: EncryptedPayload) => {
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
    },
    [password, t],
  );

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
      <EditorToolbar
        siteName={siteName}
        autosaveStatus={autosaveStatus}
        showMarkdownPreview={showMarkdownPreview}
        showSearch={showSearch}
        isReloading={isReloading}
        copySuccess={copySuccess}
        mounted={mounted}
        onToggleMarkdownPreview={toggleMarkdownPreview}
        onToggleSearch={toggleSearch}
        onShowKeyboardShortcuts={() => setShowKeyboardShortcuts(true)}
        onShowVersionHistory={() => setShowVersionHistory(true)}
        onReload={handleReload}
        onImport={handleImport}
        onExport={handleExport}
        onCopyAll={handleCopyAll}
        onShare={handleShare}
        onChangePassword={() => setShowChangePassword(true)}
        onDelete={() => setShowDeleteDialog(true)}
      />

      {/* Search bar */}
      {showSearch && (
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClear={clearSearch}
        />
      )}

      {/* Hidden file input */}
      <FileImportInput
        inputRef={fileInputRef}
        onFileChange={handleFileChange}
      />

      {/* Editor / Preview */}
      <EditorContent
        content={content}
        showMarkdownPreview={showMarkdownPreview}
        onChange={handleChange}
        textareaRef={textareaRef}
      />

      {/* Stats bar */}
      <EditorStatsBar
        stats={stats}
        onShowShortcuts={() => setShowKeyboardShortcuts(true)}
      />

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
      <KeyboardShortcutsDialog
        open={showKeyboardShortcuts}
        onClose={() => setShowKeyboardShortcuts(false)}
      />
    </div>
  );
}

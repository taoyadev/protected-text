'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { toast } from 'sonner';
import { Download, Link2, ShieldCheck, Key, Trash2, RefreshCw, Type, Upload, Search, Eye, Edit3, History, Sun, Moon } from 'lucide-react';
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

interface Props {
  siteName: string;
}

type Status = 'loading' | 'locked' | 'ready';

export function EncryptedEditor({ siteName }: Props) {
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
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const debouncedContent = useDebounce(content, 1500);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('light', savedTheme === 'light');
    }
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
        toast.error('Unable to reach the server.');
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
        setError('Incorrect password.');
        toast.error('Incorrect password');
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
        toast.error('Failed to save note');
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
    if (!lastSaved) return 'Not saved yet';
    return new Date(lastSaved).toLocaleTimeString();
  }, [lastSaved]);

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
      toast.error('Clipboard unavailable');
      return;
    }
    await navigator.clipboard.writeText(url);
    toast.success('Share link copied');
  };

  const handleReload = async () => {
    if (isDirty && !confirm('You have unsaved changes. Reload anyway?')) {
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
        toast.success('Note reloaded from server');
      } else {
        toast.error('No note found on server');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to reload note');
    } finally {
      setIsReloading(false);
    }
  };

  const handleChangePassword = async (oldPassword: string, newPassword: string) => {
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
      toast.success('Password changed successfully');
      setShowChangePassword(false);
    } catch (err) {
      console.error(err);
      throw new Error('Incorrect old password');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNote(siteName);
      toast.success('Note deleted');
      // Redirect to home after a short delay
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete note');
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
      toast.success('File imported successfully');
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  const handleManualSave = async () => {
    if (!isDirty) {
      toast.info('No changes to save');
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
      toast.success('Saved!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save');
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

  // Highlight search results
  const highlightedContent = useMemo(() => {
    if (!searchQuery || !content) return content;
    return content; // We'll use browser's native find for now
  }, [content, searchQuery]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
    toast.success(`Switched to ${newTheme} mode`);
  };

  const handleRestoreVersion = async (version: any) => {
    try {
      const decrypted = await decryptContent(version, password);
      setContent(decrypted);
      setPayload(version);
      setIsDirty(true);
      toast.success('Version restored. Save to confirm.');
    } catch (err) {
      console.error(err);
      throw new Error('Failed to decrypt version');
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-white/70">
        Loading note…
      </div>
    );
  }

  if (status !== 'ready') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <PasswordGate type={mode} loading={initializing} error={error} onSubmit={handlePassword} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 text-sm text-white/70">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary-300" />
          <p>
            Site <span className="font-semibold text-white">/{siteName}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs hidden md:block">{isSaving ? 'Saving…' : `Last saved ${formattedTimestamp}`}</p>
          <Button type="button" size="sm" variant="ghost" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => setShowMarkdownPreview(!showMarkdownPreview)} title="Toggle Markdown Preview">
            {showMarkdownPreview ? <Edit3 className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => setShowSearch(!showSearch)} title="Search (Ctrl+F)">
            <Search className="h-4 w-4" />
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => setShowVersionHistory(true)} title="Version History">
            <History className="h-4 w-4" />
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={handleReload} disabled={isReloading} title="Reload">
            <RefreshCw className={`h-4 w-4 ${isReloading ? 'animate-spin' : ''}`} />
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={handleImport} title="Import (Ctrl+I)">
            <Upload className="h-4 w-4" />
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={handleExport} title="Export (Ctrl+E)">
            <Download className="h-4 w-4" />
          </Button>
          <Button type="button" size="sm" variant="secondary" onClick={handleShare} title="Share">
            <Link2 className="h-4 w-4" />
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => setShowChangePassword(true)} title="Change Password (Ctrl+K)">
            <Key className="h-4 w-4" />
          </Button>
          <Button type="button" size="sm" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => setShowDeleteDialog(true)} title="Delete">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div className="rounded-2xl border border-primary-500/30 bg-slate-900/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-white/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in note... (Press Esc to close)"
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-white/50 hover:text-white"
              >
                Clear
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
          placeholder="Start typing… Password never leaves this browser tab."
          className="min-h-[60vh] resize-none rounded-3xl border border-white/10 bg-slate-950/70 text-base leading-relaxed shadow-inner shadow-black/40"
        />
      )}

      {/* Stats bar */}
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-2 text-xs text-white/50">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Type className="h-3 w-3" /> {stats.words} words
          </span>
          <span>{stats.chars} characters</span>
          <span>{stats.lines} lines</span>
        </div>
        <div>
          {isDirty && <span className="text-yellow-400">● Unsaved changes</span>}
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

'use client';

import { useEffect } from 'react';

interface UseKeyboardShortcutsOptions {
  enabled: boolean;
  showSearch: boolean;
  showKeyboardShortcuts: boolean;
  onManualSave: () => void;
  onToggleSearch: () => void;
  onShowChangePassword: () => void;
  onExport: () => void;
  onImport: () => void;
  onShowKeyboardShortcuts: () => void;
  onCloseSearch: () => void;
  onCloseKeyboardShortcuts: () => void;
}

export function useKeyboardShortcuts({
  enabled,
  showSearch,
  showKeyboardShortcuts,
  onManualSave,
  onToggleSearch,
  onShowChangePassword,
  onExport,
  onImport,
  onShowKeyboardShortcuts,
  onCloseSearch,
  onCloseKeyboardShortcuts,
}: UseKeyboardShortcutsOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S: Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        onManualSave();
      }
      // Ctrl/Cmd + F: Search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        onToggleSearch();
      }
      // Ctrl/Cmd + K: Change Password
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onShowChangePassword();
      }
      // Ctrl/Cmd + E: Export
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        onExport();
      }
      // Ctrl/Cmd + I: Import
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        onImport();
      }
      // ?: Show keyboard shortcuts
      if (
        e.key === '?' &&
        !e.ctrlKey &&
        !e.metaKey &&
        e.target &&
        (e.target as HTMLElement).tagName !== 'INPUT' &&
        (e.target as HTMLElement).tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        onShowKeyboardShortcuts();
      }
      // Esc: Close search or dialogs
      if (e.key === 'Escape') {
        if (showSearch) {
          onCloseSearch();
        } else if (showKeyboardShortcuts) {
          onCloseKeyboardShortcuts();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    enabled,
    showSearch,
    showKeyboardShortcuts,
    onManualSave,
    onToggleSearch,
    onShowChangePassword,
    onExport,
    onImport,
    onShowKeyboardShortcuts,
    onCloseSearch,
    onCloseKeyboardShortcuts,
  ]);
}

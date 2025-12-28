'use client';

import React, { useEffect, useRef } from 'react';
import { Keyboard } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-provider';

interface KeyboardShortcutsDialogProps {
  open: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsDialog = React.memo(
  function KeyboardShortcutsDialog({
    open,
    onClose,
  }: KeyboardShortcutsDialogProps) {
    const { t } = useTranslation();
    const dialogRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement | null>(null);

    // Store the trigger element when dialog opens
    useEffect(() => {
      if (open && !triggerRef.current) {
        triggerRef.current = document.activeElement as HTMLElement;
      }
    }, [open]);

    // Focus trap
    useEffect(() => {
      if (!open) return;

      const timeoutId = setTimeout(() => {
        const closeButton = dialogRef.current?.querySelector('button');
        closeButton?.focus();
      }, 50);

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

    if (!open) return null;

    const dialogId = 'keyboard-shortcuts-dialog-title';

    const shortcuts = [
      { key: 'Ctrl/Cmd + S', action: t('editor.shortcuts.save') },
      { key: 'Ctrl/Cmd + F', action: t('editor.shortcuts.search') },
      { key: 'Ctrl/Cmd + K', action: t('editor.shortcuts.changePassword') },
      { key: 'Ctrl/Cmd + E', action: t('editor.shortcuts.export') },
      { key: 'Ctrl/Cmd + I', action: t('editor.shortcuts.import') },
      { key: 'Esc', action: t('editor.shortcuts.closeDialogs') },
      { key: '?', action: t('editor.shortcuts.showShortcuts') },
    ];

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
          className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Keyboard
                className="h-5 w-5 text-primary-400"
                aria-hidden="true"
              />
              <h2
                id={dialogId}
                className="text-xl font-semibold text-gray-900 dark:text-white"
              >
                {t('editor.shortcuts.title')}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-white/70 dark:hover:bg-white/10"
              aria-label={t('common.actions.close')}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-3">
            {shortcuts.map((shortcut) => (
              <div
                key={shortcut.key}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-white/10 dark:bg-slate-800/50"
              >
                <span className="text-sm text-gray-700 dark:text-white/80">
                  {shortcut.action}
                </span>
                <kbd className="rounded-md border border-gray-300 bg-white px-2 py-1 font-mono text-xs text-gray-600 shadow-sm dark:border-white/20 dark:bg-slate-900 dark:text-gray-400">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

'use client';

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useTranslation } from '@/lib/i18n-provider';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (oldPassword: string, newPassword: string) => Promise<void>;
}

export function ChangePasswordDialog({ open, onClose, onConfirm }: Props) {
  const { t } = useTranslation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error(t('toasts.error.allFieldsRequired'));
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(t('toasts.error.newPasswordsDoNotMatch'));
      return;
    }

    if (newPassword.length < 8) {
      toast.error(t('toasts.error.newPasswordTooShort'));
      return;
    }

    setIsLoading(true);
    try {
      await onConfirm(oldPassword, newPassword);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : t('toasts.error.failedToChangePassword'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    onClose();
  };

  const dialogId = 'change-password-dialog-title';

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
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2
            id={dialogId}
            className="text-xl font-semibold text-gray-900 dark:text-white"
          >
            {t('dialogs.changePassword.title')}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
            aria-label={t('common.actions.close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-gray-600 dark:text-white/70">
              {t('dialogs.changePassword.currentPasswordLabel')}
            </label>
            <Input
              ref={firstInputRef}
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder={t(
                'dialogs.changePassword.currentPasswordPlaceholder',
              )}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-600 dark:text-white/70">
              {t('dialogs.changePassword.newPasswordLabel')}
            </label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={t('dialogs.changePassword.newPasswordPlaceholder')}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-600 dark:text-white/70">
              {t('dialogs.changePassword.confirmNewPasswordLabel')}
            </label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t(
                'dialogs.changePassword.confirmNewPasswordPlaceholder',
              )}
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              className="flex-1"
              disabled={isLoading}
            >
              {t('dialogs.changePassword.cancel')}
            </Button>
            <Button type="submit" className="flex-1" isLoading={isLoading}>
              {t('dialogs.changePassword.changePasswordButton')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

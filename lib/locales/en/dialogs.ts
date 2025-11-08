/**
 * All dialog content - password gate, change password, delete, version history
 */

export const dialogs = {
  // Password gate
  passwordGate: {
    createPassword: 'Create password',
    unlockNote: 'Unlock note',
    passwordsNeverLeave: 'Passwords never leave your device.',
    passwordLabel: 'Password',
    confirmPasswordLabel: 'Confirm password',
    startWriting: 'Start writing',
    unlock: 'Unlock',
  },

  // Change password dialog
  changePassword: {
    title: 'Change Password',
    currentPasswordLabel: 'Current Password',
    currentPasswordPlaceholder: 'Enter current password',
    newPasswordLabel: 'New Password',
    newPasswordPlaceholder: 'Enter new password',
    confirmNewPasswordLabel: 'Confirm New Password',
    confirmNewPasswordPlaceholder: 'Re-enter new password',
    cancel: 'Cancel',
    changePasswordButton: 'Change Password',
  },

  // Delete note dialog
  deleteNote: {
    title: 'Delete Note',
    warning1: 'This will **permanently delete** your note.',
    warning2: 'This action **cannot be undone**. No backups, no recovery.',
    confirmPrompt: 'Type',
    confirmPromptSuffix: 'to confirm:',
    cancel: 'Cancel',
    deleteForever: 'Delete Forever',
  },

  // Version history dialog
  versionHistory: {
    title: 'Version History',
    loading: 'Loading versions...',
    noVersions: 'No version history available yet',
    versionNumber: 'Version',
    restore: 'Restore',
    charactersLabel: 'characters',
  },
};

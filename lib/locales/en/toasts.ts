/**
 * Toast/notification messages
 */

export const toasts = {
  // Success messages
  success: {
    shareLinkCopied: 'Share link copied',
    noteReloadedFromServer: 'Note reloaded from server',
    passwordChangedSuccessfully: 'Password changed successfully',
    noteDeleted: 'Note deleted',
    fileImportedSuccessfully: 'File imported successfully',
    saved: 'Saved!',
    versionRestored: 'Version restored',
    versionRestoredSaveToConfirm: 'Version restored. Save to confirm.',
    voteRecorded: 'Vote recorded! Thanks for the feedback.',
    thankYouForFeedback: 'Thank you for your feedback!',
    contentCopied: 'Content copied to clipboard',
  },

  // Info messages
  info: {
    noChangesToSave: 'No changes to save',
  },

  // Error messages (duplicated from errors.ts for convenience in toast context)
  error: {
    incorrectPassword: 'Incorrect password',
    failedToSaveNote: 'Failed to save note',
    clipboardUnavailable: 'Clipboard unavailable',
    noNoteFoundOnServer: 'No note found on server',
    failedToReloadNote: 'Failed to reload note',
    failedToDeleteNote: 'Failed to delete note',
    failedToSave: 'Failed to save',
    alreadyVoted: 'You already voted for this!',
    failedToRecordVote: 'Failed to record vote',
    pleaseEnterMessage: 'Please enter a message',
    failedToSubmitFeedback: 'Failed to submit feedback',
    allFieldsRequired: 'All fields are required',
    newPasswordsDoNotMatch: 'New passwords do not match',
    newPasswordTooShort: 'New password must be at least 4 characters',
    failedToChangePassword: 'Failed to change password',
    pleaseTypeToConfirm: 'Please type "{siteName}" to confirm',
    failedToLoadVersionHistory: 'Failed to load version history',
    failedToRestoreVersion: 'Failed to restore version',
  },
};

/**
 * All error messages and validation messages
 */

export const errors = {
  // Network/Server errors
  network: {
    unableToReachServer: 'Unable to reach the server.',
    failedToSaveNote: 'Failed to save note',
    failedToLoadNote: 'Failed to load note',
    failedToDeleteNote: 'Failed to delete note',
    failedToReloadNote: 'Failed to reload note',
    failedToLoadVersionHistory: 'Failed to load version history',
    failedToRestoreVersion: 'Failed to restore version',
    failedToRecordVote: 'Failed to record vote',
    failedToRecordVotePleaseTryAgain:
      'Failed to record vote. Please try again.',
    failedToSubmitFeedback: 'Failed to submit feedback',
    failedToSubmitFeedbackPleaseTryAgain:
      'Failed to submit feedback. Please try again.',
    clipboardUnavailable: 'Clipboard unavailable',
    noNoteFoundOnServer: 'No note found on server',
  },

  // Password errors
  password: {
    incorrectPassword: 'Incorrect password',
    passwordsDoNotMatch: 'Passwords do not match',
    newPasswordsDoNotMatch: 'New passwords do not match',
    incorrectOldPassword: 'Incorrect old password',
    failedToChangePassword: 'Failed to change password',
    allFieldsRequired: 'All fields are required',
    newPasswordTooShort: 'New password must be at least 4 characters',
    failedToDecryptVersion: 'Failed to decrypt version',
  },

  // Validation errors
  validation: {
    siteNameInvalid: 'Use 3-32 lowercase letters, numbers or dashes.',
    pleaseEnterMessage: 'Please enter a message',
    pleaseTypeToConfirm: 'Please type "{siteName}" to confirm',
  },

  // Voting errors
  voting: {
    alreadyVoted: 'You already voted for this!',
  },

  // Confirmation prompts
  confirmations: {
    unsavedChangesReloadAnyway: 'You have unsaved changes. Reload anyway?',
  },
};

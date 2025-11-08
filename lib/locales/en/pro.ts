/**
 * Pro page content - features, voting, feedback form
 */

export const pro = {
  // Header
  header: {
    title: 'Protected Text PRO – Feature Roadmap',
    subtitle:
      'Vote on upcoming Protected Text PRO features. The free version stays free forever, but help us decide which premium features to build first.',
    description:
      'Encrypted notes with custom domains, team sharing, API access, file attachments, and more coming soon.',
  },

  // Features
  features: {
    sectionLabel: 'Protected Text PRO Features',
    customDomains: {
      title: 'Custom Domains',
      description: 'Use your own domain like notes.yourcompany.com instead of protectedtext.com/yoursite',
    },
    teamSharing: {
      title: 'Team Sharing',
      description: 'Share encrypted notes with your team. Everyone gets their own password.',
    },
    apiAccess: {
      title: 'API Access',
      description: 'Integrate with your apps. Read/write notes programmatically.',
    },
    fileAttachments: {
      title: 'File Attachments',
      description: 'Upload encrypted files, images, and documents to your notes.',
    },
    unlimitedRetention: {
      title: 'Unlimited Retention',
      description: 'Keep your notes forever. No auto-deletion.',
    },
    prioritySupport: {
      title: 'Priority Support',
      description: 'Get help faster when you need it.',
    },
  },

  // Voting
  voting: {
    voteButton: 'Vote',
    votedButton: 'Voted',
    voteForFeature: 'Vote for {featureName}',
    votesCount: '{count} votes',
    votesSingular: '{count} vote',
  },

  // Feedback form
  feedbackForm: {
    title: 'Request Custom Protected Text PRO Features',
    subtitle: 'Share your thoughts, suggestions, or feature requests for Protected Text PRO below.',
    messageLabel: 'Your Message',
    messagePlaceholder: 'Tell us what you\'d like to see...',
    messageRequired: '*',
    messageCounter: '{count}/2000 characters',
    emailLabel: 'Email (optional)',
    emailPlaceholder: 'your@email.com',
    emailHelp: 'Leave your email if you\'d like us to follow up',
    featureLabel: 'Related Feature (optional)',
    featurePlaceholder: 'Select a feature...',
    featureOther: 'Something else',
    submitButton: 'Send Feedback',
    submittingButton: 'Sending...',
    emailNote: 'You can also email us at',
  },

  // Footer disclaimer
  disclaimer: {
    text: "Don't worry - the free version will always be free.",
    subtext: 'No ads. No tracking. No BS.',
  },
};

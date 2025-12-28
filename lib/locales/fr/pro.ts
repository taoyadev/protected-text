/**
 * Contenu de la page Pro - fonctionnalités, vote, formulaire de commentaires
 */

export const pro = {
  // En-tête
  header: {
    title: 'Protected Text PRO – Feuille de Route des Fonctionnalités',
    subtitle:
      'Votez pour les prochaines fonctionnalités de Protected Text PRO. La version gratuite restera gratuite pour toujours, mais aidez-nous à décider quelles fonctionnalités premium construire en premier.',
    description:
      "Notes chiffrées avec domaines personnalisés, partage d'équipe, accès API, pièces jointes et plus à venir.",
  },

  // Fonctionnalités
  features: {
    sectionLabel: 'Fonctionnalités de Protected Text PRO',
    customDomains: {
      title: 'Domaines Personnalisés',
      description:
        'Utilisez votre propre domaine comme notes.votreentreprise.com au lieu de protectedtext.com/votresite',
    },
    teamSharing: {
      title: "Partage d'Équipe",
      description:
        'Partagez des notes chiffrées avec votre équipe. Chacun obtient son propre mot de passe.',
    },
    apiAccess: {
      title: 'Accès API',
      description:
        'Intégrez avec vos applications. Lisez/écrivez des notes de manière programmatique.',
    },
    fileAttachments: {
      title: 'Pièces Jointes',
      description:
        'Téléchargez des fichiers chiffrés, images et documents dans vos notes.',
    },
    unlimitedRetention: {
      title: 'Rétention Illimitée',
      description:
        'Conservez vos notes pour toujours. Pas de suppression automatique.',
    },
    prioritySupport: {
      title: 'Support Prioritaire',
      description:
        "Obtenez de l'aide plus rapidement quand vous en avez besoin.",
    },
  },

  // Vote
  voting: {
    voteButton: 'Voter',
    votedButton: 'Voté',
    voteForFeature: 'Voter pour {featureName}',
    votesCount: '{count} votes',
    votesSingular: '{count} vote',
  },

  // Formulaire de commentaires
  feedbackForm: {
    title:
      'Demander des Fonctionnalités Personnalisées pour Protected Text PRO',
    subtitle:
      'Partagez vos réflexions, suggestions ou demandes de fonctionnalités pour Protected Text PRO ci-dessous.',
    messageLabel: 'Votre Message',
    messagePlaceholder: 'Dites-nous ce que vous aimeriez voir...',
    messageRequired: '*',
    messageCounter: '{count}/2000 caractères',
    emailLabel: 'Email (facultatif)',
    emailPlaceholder: 'votre@email.com',
    emailHelp:
      'Laissez votre email si vous souhaitez que nous vous recontactions',
    featureLabel: 'Fonctionnalité Associée (facultatif)',
    featurePlaceholder: 'Sélectionnez une fonctionnalité...',
    featureOther: 'Autre chose',
    submitButton: 'Envoyer les Commentaires',
    submittingButton: 'Envoi...',
    emailNote: 'Vous pouvez également nous envoyer un email à',
  },

  // Avertissement du pied de page
  disclaimer: {
    text: 'Ne vous inquiétez pas - la version gratuite sera toujours gratuite.',
    subtext: 'Pas de publicités. Pas de suivi. Pas de conneries.',
  },
};

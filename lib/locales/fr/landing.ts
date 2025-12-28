/**
 * Contenu de la page d'accueil - hero, fonctionnalités, sécurité, FAQ, pied de page
 */

export const landing = {
  // Section hero
  hero: {
    badge: 'Le bloc-notes le plus sûr sur internet',
    title: 'Protected Text : Vos Notes,',
    titleHighlight: 'Chiffrées. Zéro-Connaissance.',
    subtitle:
      "Écoutez, c'est simple. Choisissez n'importe quelle URL comme **protected-text.com/nimportequoi**, créez un mot de passe et commencez à taper. Vos données sont chiffrées dans votre navigateur avant même de quitter votre appareil. Nous ne pouvons littéralement pas les lire. Pas parce que nous sommes gentils (nous le sommes), mais parce que c'est mathématiquement impossible.",
  },

  // Formulaire de création de site
  createSiteForm: {
    label: 'Choisissez une URL privée',
    urlPrefix: 'protected-text.com/',
    urlPlaceholder: '[votre-url]',
    submitButton: 'Sécuriser ma note',
    randomButton: 'Surprenez-moi',
  },

  // Points forts
  highlights: {
    heading: 'Pourquoi Protected Text Fonctionne',
    items: {
      passwordNeverLeaves: {
        title: 'Votre mot de passe ne quitte jamais votre appareil',
        description:
          'Nous chiffrons tout dans votre navigateur avant que cela ne touche internet. Nous ne pouvons littéralement pas lire vos notes, même si nous le voulions.',
      },
      noSignup: {
        title: 'Aucune inscription requise',
        description:
          "Pas d'email. Pas de compte. Pas de cookies de suivi. Choisissez simplement une URL et commencez à taper. C'est tout.",
      },
      freeForever: {
        title: 'Gratuit pour toujours',
        description:
          "Pas de publicités. Pas de niveaux premium. Pas de conneries. Ça marche, c'est tout. Nous croyons que la vie privée devrait être gratuite pour tout le monde.",
      },
    },
  },

  // Section pourquoi
  why: {
    title: 'Pourquoi Vous Avez Besoin de Protected Text',
    stats1:
      "Voici la réalité : En 2024, **1,7 milliard de personnes** ont vu leurs données personnelles compromises dans des violations de données. Ce n'est pas une faute de frappe. **1 700 000 000 personnes**. À l'échelle mondiale, les comptes compromis sont passés de 730 millions en 2023 à plus de **5,5 milliards en 2024**. Cela signifie qu'environ 180 comptes ont été compromis *chaque seconde* l'année dernière.",
    stats2:
      "Réfléchissez à cela une minute. Pendant que vous lisez cette phrase, des dizaines de personnes viennent de se faire pirater. Vos notes, vos idées, vos pensées privées—elles sont sur le serveur d'une entreprise en ce moment même. Et si cette entreprise est piratée (quand, pas si), vos affaires deviennent les affaires de quelqu'un d'autre.",

    whatMakesDifferent: {
      heading: "Qu'est-ce qui Rend Protected Text Différent ?",
      paragraph1:
        'Protected Text est un **bloc-notes en ligne gratuit avec chiffrement de bout en bout**. Mais voici ce qui le rend différent : Nous utilisons le **chiffrement AES-256-GCM**—le même standard que la NSA utilise pour protéger les documents gouvernementaux Top Secret, la même technologie que Google Cloud utilise par défaut, et le même chiffrement sur lequel comptent les grandes banques.',
      paragraph2:
        "Tout se passe dans votre navigateur. Avant que vos notes ne touchent internet, elles sont chiffrées en charabia. Nous stockons ce charabia. Même si quelqu'un vole toute notre base de données demain, tout ce qu'ils obtiennent, ce sont des données chiffrées inutiles. Pas de mot de passe, pas de déchiffrement. C'est aussi simple que ça.",
    },

    howItWorks: {
      heading: 'Comment Protected Text Fonctionne Réellement',
      paragraph1:
        "Vous choisissez n'importe quelle URL que vous voulez—disons `protected-text.com/mes-idees-secretes`. Personne ne l'utilise ? C'est à vous. Vous créez un mot de passe. Ce mot de passe ne quitte jamais votre ordinateur. Jamais.",
      paragraph2:
        "Quand vous tapez vos notes, votre navigateur utilise ce mot de passe pour tout brouiller en code chiffré en utilisant PBKDF2 (310 000 itérations, si vous vous souciez des détails techniques—c'est plus que le standard de l'industrie). Ce n'est qu'ensuite que la version chiffrée va sur nos serveurs. Nous ne pouvons littéralement pas lire ce que vous écrivez, même si nous le voulions, même si le gouvernement nous le demandait, même si des pirates s'introduisaient.",
    },

    realTalk: {
      heading: 'Parlons Franchement : Les Chiffres Ne Mentent Pas',
      stat1:
        "**36 milliards d'enregistrements de données** exposés en seulement 4 mois (janvier-avril 2024)",
      stat2: 'Moyenne de **758 288 enregistrements violés par jour** en 2024',
      stat3:
        "Six méga-violations en 2024, chacune exposant **plus de 100 millions d'enregistrements**",
      stat4:
        "Le marché du chiffrement explose : de **16,7 milliards de dollars en 2024 à 60,7 milliards de dollars d'ici 2033**",
      source:
        'Sources : Rapport sur les Violations de Données 2024 du HIPAA Journal, Statista, Statistiques de Sécurité 2024 de SecureFrame',
    },

    zeroKnowledge: {
      badge: 'Architecture Zéro-Connaissance = Sécurité Sans Confiance',
      tagline:
        "Vous n'avez pas à nous faire confiance. Vous n'avez à faire confiance à personne. Les mathématiques vous protègent, pas les promesses.",
    },
  },

  // Section sécurité
  security: {
    title: 'Pourquoi Faire Confiance à Ceci ? (Ne Me Croyez Pas Sur Parole)',
    subtitle:
      'La sécurité est en fait assez simple quand on ne la complique pas. Voici exactement comment nous le faisons :',

    items: {
      passwordNeverLeaves: {
        title:
          'Votre mot de passe ne quitte littéralement jamais votre appareil',
        description:
          "Pas quand vous créez un compte (il n'y a pas de compte). Pas quand vous vous connectez. Jamais. Il reste dans votre navigateur et fait tout le travail de chiffrement directement sur votre machine. Nous ne le voyons jamais. Point.",
      },
      clientSideEncryption: {
        title: 'Chiffrement côté client = Vous avez le contrôle',
        description:
          "Tout le chiffrement se produit dans votre navigateur en utilisant la Web Crypto API (intégrée aux navigateurs modernes). Seul du charabia chiffré circule sur le réseau. Quelqu'un l'intercepte ? Cool, ils n'ont rien obtenu.",
      },
      zeroTracking: {
        title: 'Zéro suivi, zéro conneries',
        description:
          'Pas de comptes utilisateurs. Pas de cookies. Pas d\'analyse. Pas de pixels de suivi "anonymes". Nous ne savons pas qui vous êtes, nous ne voulons pas savoir, et nous ne pouvons pas savoir. C\'est la conception.',
      },
      openSource: {
        title: 'Open source (parce que faites confiance, mais vérifiez)',
        description:
          "Vous ne me faites pas confiance ? Intelligent. Le code est ouvert. Vous pouvez l'auditer vous-même, ou demander à quelqu'un de technique de le faire. Nous utilisons des algorithmes de chiffrement standard et évalués par des pairs—pas de cryptographie personnalisée absurde qui échoue toujours.",
      },
      doubleLayerProtection: {
        title: 'Protection à double couche',
        description:
          "Votre URL unique est comme un nom d'utilisateur—personne ne peut trouver vos notes sans elle. Votre mot de passe est la clé de chiffrement. Les deux sont nécessaires. Même si quelqu'un devine votre URL, sans votre mot de passe, ils sont coincés.",
      },
    },

    technical: {
      heading: 'Pour Les Personnes Techniques',
      subtitle: "Si vous vous souciez des détails d'implémentation réels :",
      specs: {
        aes256: {
          title: 'AES-256-GCM',
          description:
            'Même standard utilisé par la NSA pour les documents Top Secret. Adopté par le NIST en 2001. Toujours incassable.',
        },
        pbkdf2: {
          title: 'PBKDF2 (310k itérations)',
          description:
            'OWASP recommande 100k. Nous en faisons 310k pour rendre les attaques par force brute exponentiellement plus difficiles.',
        },
        uniqueSaltIV: {
          title: 'Salt et IV uniques par sauvegarde',
          description:
            'Nouvelle aléatoire cryptographique à chaque fois. Pas de réutilisation, pas de prévisibilité.',
        },
        webCrypto: {
          title: 'Web Crypto API',
          description:
            'Implémentation native du navigateur. Pas de bibliothèques tierces douteuses.',
        },
      },
      verifyNote:
        'Vous voulez vérifier ? Le code est open source. Vérifiez-le vous-même sur GitHub.',
    },
  },

  // Protection contre les conflits
  conflictProtection: {
    title: 'Protection Contre les Conflits',
    description1:
      "Utilisez la même URL sur votre ordinateur portable, téléphone et tablette en même temps ? Pas de problème. Nous détectons quand plusieurs appareils sont en train d'éditer et vous empêchons de perdre des modifications. La sauvegarde automatique s'exécute toutes les 2 secondes, et nous gardons les 10 dernières versions pour que vous puissiez revenir en arrière si nécessaire.",
    description2:
      'Si deux appareils sauvegardent en même temps, nous vous montrerons les deux versions et vous laisserons choisir laquelle conserver. Aucune perte de données silencieuse. Jamais.',
    versionHistory: {
      title: 'Historique des Versions',
      subtitle: '10 dernières sauvegardes disponibles',
    },
  },

  // Fonctionnalités
  features: {
    title: 'Fonctionnalités de Protected Text',
    subtitle:
      "Tout ce dont vous avez besoin. Rien que vous n'avez pas besoin. Pas de niveaux premium.",
    list: [
      'Chiffrement AES-256-GCM',
      'Aucune inscription nécessaire',
      'Sauvegarde automatique (toutes les 2 secondes)',
      'Historique des versions (10 dernières)',
      'Aperçu Markdown',
      'Thèmes sombres et clairs',
      'Raccourcis clavier',
      'Recherche dans la note (Ctrl+F)',
      'Importer depuis des fichiers',
      'Changer le mot de passe à tout moment',
      'Supprimer les notes définitivement',
      'Exporter/sauvegarder chiffré',
      'Fonctionne sur tous les appareils',
      'Fonctionne hors ligne',
      'Code open source',
      'Pas de publicités, pas de suivi',
      'Support PWA (installer comme application)',
      'Détection de conflits',
    ],
  },

  // Commencer
  gettingStarted: {
    title: 'Commencer avec Protected Text',
    subtitle: "C'est ridiculement simple. Trois étapes. C'est tout.",
    steps: {
      step1: {
        title: 'Choisissez une URL',
        description:
          "Tapez n'importe quelle URL que vous voulez dans la case ci-dessus, comme `protected-text.com/monprojet`. Si personne ne l'utilise, c'est à vous. Premier arrivé, premier servi.",
      },
      step2: {
        title: 'Définissez un mot de passe',
        description:
          "Choisissez un mot de passe fort. Nous ne le voyons jamais. Il ne quitte jamais votre navigateur. Si vous l'oubliez, vos notes sont perdues pour toujours. Notez-le dans un endroit sûr.",
      },
      step3: {
        title: 'Commencez à taper',
        description:
          "C'est tout. Vos notes se sauvegardent automatiquement toutes les 2 secondes. Revenez plus tard depuis n'importe quel appareil, même URL, même mot de passe, et tout est là.",
      },
    },
  },

  // FAQ
  faq: {
    title: 'Questions Fréquemment Posées',
    subtitle: 'Tout ce que vous devez savoir sur Protected Text',
    questions: {
      forgotPassword: {
        q: "J'ai oublié mon mot de passe. Pouvez-vous le récupérer ?",
        a: "**Non.** Écoutez, c'est nul, mais c'est aussi le but. Votre mot de passe ne quitte jamais votre appareil. Nous ne l'avons pas. Nous ne pouvons pas l'avoir. C'est la sécurité zéro-connaissance. Si nous pouvions récupérer votre mot de passe, cela signifierait que nous pourrions lire vos notes, ce qui va à l'encontre de tout l'objectif. Notez-le. Utilisez un gestionnaire de mots de passe. Tatouez-le sur votre bras. Je m'en fiche. Ne le perdez simplement pas.",
      },
      actuallyFree: {
        q: 'Protected Text est-il vraiment gratuit ?',
        a: "**Oui, c'est gratuit.** Pas de publicités. Pas de pixels de suivi. Pas de conneries \"freemium\" où nous paralysons le produit jusqu'à ce que vous payiez. La vie privée ne devrait pas être un bien de luxe. Tout l'intérêt de ceci est de donner à tout le monde accès à des notes sécurisées. Si nous devons couvrir les coûts éventuellement, nous pourrions ajouter des fonctionnalités optionnelles pour les utilisateurs avancés, mais le chiffrement de base et les notes ? Gratuit. Pour toujours.",
      },
      hackServers: {
        q: "Que se passe-t-il si quelqu'un pirate vos serveurs ?",
        a: "**Ils n'obtiennent rien d'utile.** Sérieusement. Tout ce que nous stockons, ce sont des données chiffrées. Sans votre mot de passe, c'est du charabia. Pensez-y comme ça : Si quelqu'un vole un coffre-fort, il ne peut toujours pas l'ouvrir sans la combinaison. Sauf que dans ce cas, la combinaison (votre mot de passe) n'a jamais quitté votre poche au départ.",
      },
      teamCollaboration: {
        q: 'Puis-je utiliser Protected Text pour la collaboration en équipe ?',
        a: "En quelque sorte. Plusieurs personnes peuvent utiliser la même URL et le même mot de passe. Tout le monde avec les identifiants a un accès complet. Mais il n'y a pas de système de permissions, pas de gestion des utilisateurs, pas de journaux d'audit. C'est délibérément simple. Si vous avez besoin de fonctionnalités d'entreprise, ce n'est pas ça. Si vous avez juste besoin d'un bloc-notes chiffré partagé, allez-y.",
      },
      takeUrl: {
        q: "Quelqu'un d'autre peut-il prendre mon URL ?",
        a: "Si vous n'avez encore rien sauvegardé, techniquement oui. Mais une fois que vous sauvegardez des notes sur une URL, cette URL est verrouillée à votre mot de passe. Même si quelqu'un d'autre essaie d'utiliser la même URL, il ne peut pas lire vos notes sans votre mot de passe, et il ne peut pas les écraser. Le premier à sauvegarder gagne.",
      },
      governmentRequest: {
        q: 'Que se passe-t-il si le gouvernement demande mes données ?',
        a: "**Ils obtiennent des données chiffrées.** C'est tout. Nous n'avons pas votre mot de passe. Nous n'avons pas votre email. Nous ne savons même pas qui vous êtes. Même si une agence gouvernementale se présente avec un mandat, tout ce que nous pouvons leur donner, c'est du charabia. On ne peut pas déchiffrer ce dont on n'a pas la clé. Ce n'est pas une position politique—c'est juste comme ça que les mathématiques fonctionnent.",
      },
      whyTrust: {
        q: 'Pourquoi devrais-je faire confiance à Protected Text ?',
        a: "**Vous ne devriez faire aveuglément confiance à personne.** Le code est open source—allez le lire. Le chiffrement est standard (AES-256-GCM, PBKDF2)—pas de conneries de cryptographie personnalisée. Ces algorithmes ont été testés au combat pendant des décennies par de vrais cryptographes, pas par moi inventant des trucs. Si vous trouvez une vulnérabilité, signalez-la. Nous la corrigerons. C'est comme ça que la sécurité fonctionne réellement—transparence, pas secret.",
      },
      protectedTextPro: {
        q: "Qu'est-ce que Protected Text Pro ?",
        a: "**Nous le construisons en fonction de vos retours.** Protected Text sera toujours gratuit, mais nous explorons des fonctionnalités Pro pour les utilisateurs avancés—des choses comme des domaines personnalisés, des téléchargements de fichiers plus volumineux, un historique de versions étendu et des outils de gestion d'équipe.",
        linkText:
          'Votez pour des fonctionnalités et aidez à façonner la feuille de route →',
      },
    },
  },

  // Pied de page
  footer: {
    about: {
      description:
        'Notes chiffrées zéro-connaissance. Votre mot de passe ne quitte jamais votre appareil. Gratuit pour toujours, pas de suivi, pas de conneries.',
      starOnGithub: 'Mettre une étoile sur GitHub',
      openSourceOnGithub: 'Open Source sur GitHub',
    },
    security: {
      title: 'Vous avez trouvé un problème de sécurité ?',
      description:
        'Veuillez le signaler de manière responsable par email. Nous prenons la sécurité au sérieux.',
    },
    contact: {
      email: 'hello@protected-text.com',
    },
    bottom: {
      builtWith: 'Construit avec',
      in2025: 'en 2025',
      license: 'Protected Text est open source sous licence MIT.',
      disclaimer: 'Aucune garantie. Utilisez à vos propres risques.',
    },
  },
};

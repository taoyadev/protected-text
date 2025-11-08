/**
 * Landing page content - hero, features, security, FAQ, footer
 */

export const landing = {
  // Hero section
  hero: {
    badge: 'The safest notepad on the internet',
    title: 'Protected Text: Your Notes,',
    titleHighlight: 'Encrypted. Zero-Knowledge.',
    subtitle:
      'Look, this is simple. Pick any URL like **protected-text.com/anything**, create a password, and start typing. Your stuff gets encrypted in your browser before it ever leaves your device. We literally cannot read it. Not because we\'re nice people (we are), but because it\'s mathematically impossible.',
  },

  // Create site form
  createSiteForm: {
    label: 'Choose a private URL',
    urlPrefix: 'protected-text.com/',
    urlPlaceholder: '[your-url]',
    submitButton: 'Secure my note',
    randomButton: 'Surprise me',
  },

  // Highlights
  highlights: {
    heading: 'Why Protected Text Works',
    items: {
      passwordNeverLeaves: {
        title: 'Your password never leaves your device',
        description:
          'We encrypt everything in your browser before it touches the internet. We literally cannot read your notes, even if we wanted to.',
      },
      noSignup: {
        title: 'No sign-up required',
        description:
          "No email. No account. No tracking cookies. Just pick a URL and start typing. That's it.",
      },
      freeForever: {
        title: 'Free forever',
        description:
          'No ads. No premium tiers. No BS. Just works. We believe privacy should be free for everyone.',
      },
    },
  },

  // Why section
  why: {
    title: 'Why You Need Protected Text',
    stats1:
      "Here's the reality: In 2024, **1.7 billion people** had their personal data compromised in data breaches. That's not a typo. **1,700,000,000 people**. Globally, breached accounts surged from 730 million in 2023 to over **5.5 billion in 2024**. That means roughly 180 accounts were compromised *every single second* last year.",
    stats2:
      "Think about that for a minute. While you're reading this sentence, dozens of people just got hacked. Your notes, your ideas, your private thoughts—they're sitting on some company's server right now. And if that company gets breached (when, not if), your stuff becomes someone else's stuff.",

    whatMakesDifferent: {
      heading: 'What Makes Protected Text Different?',
      paragraph1:
        'Protected Text is a **free online notepad with end-to-end encryption**. But here\'s what makes it different: We use **AES-256-GCM encryption**—the same standard the NSA uses to protect Top Secret government documents, the same tech Google Cloud uses by default, and the same encryption that major banks rely on.',
      paragraph2:
        "Everything happens in your browser. Before your notes ever touch the internet, they're encrypted into gibberish. We store that gibberish. Even if someone steals our entire database tomorrow, all they get is useless encrypted data. No password, no decryption. It's that simple.",
    },

    howItWorks: {
      heading: 'How Protected Text Actually Works',
      paragraph1:
        "You pick any URL you want—let's say `protected-text.com/my-secret-ideas`. Nobody's using it? It's yours. You create a password. That password never leaves your computer. Ever.",
      paragraph2:
        'When you type your notes, your browser uses that password to scramble everything into encrypted code using PBKDF2 (310,000 iterations, if you care about the technical stuff—that\'s more than the industry standard). Only then does the encrypted version go to our servers. We literally cannot read what you write, even if we wanted to, even if the government asked us to, even if hackers broke in.',
    },

    realTalk: {
      heading: 'Real Talk: The Numbers Don\'t Lie',
      stat1: '**36 billion data records** exposed in just 4 months (Jan-Apr 2024)',
      stat2: 'Average **758,288 records breached per day** in 2024',
      stat3: 'Six mega-breaches in 2024 each exposed **100+ million records**',
      stat4: 'The encryption market is exploding: from **$16.7B in 2024 to $60.7B by 2033**',
      source: 'Sources: HIPAA Journal 2024 Data Breach Report, Statista, SecureFrame 2024 Security Statistics',
    },

    zeroKnowledge: {
      badge: 'Zero-Knowledge Architecture = Trustless Security',
      tagline: "You don't have to trust us. You don't have to trust anyone. The math protects you, not promises.",
    },
  },

  // Security section
  security: {
    title: "Why Trust This? (Don't Just Take My Word For It)",
    subtitle: "Security is actually pretty simple when you don't overcomplicate it. Here's exactly how we do it:",

    items: {
      passwordNeverLeaves: {
        title: 'Your password literally never leaves your device',
        description:
          'Not when you create an account (there is no account). Not when you log in. Not ever. It stays in your browser and does all the encryption work right there on your machine. We never see it. Period.',
      },
      clientSideEncryption: {
        title: "Client-side encryption = You're in control",
        description:
          'All encryption happens in your browser using the Web Crypto API (built into modern browsers). Only encrypted gibberish travels over the network. Someone intercepts it? Cool, they got nothing.',
      },
      zeroTracking: {
        title: 'Zero tracking, zero bullshit',
        description:
          'No user accounts. No cookies. No analytics. No "anonymous" tracking pixels. We don\'t know who you are, we don\'t want to know, and we can\'t know. That\'s the design.',
      },
      openSource: {
        title: 'Open source (because trust, but verify)',
        description:
          "Don't trust me? Smart. The code is open. You can audit it yourself, or get someone technical to do it. We use standard, peer-reviewed encryption algorithms—no custom crypto nonsense that always breaks.",
      },
      doubleLayerProtection: {
        title: 'Double-layer protection',
        description:
          "Your unique URL is like a username—nobody can find your notes without it. Your password is the encryption key. Both are required. Even if someone guesses your URL, without your password, they're stuck.",
      },
    },

    technical: {
      heading: 'For The Technical Folks',
      subtitle: 'If you care about the actual implementation details:',
      specs: {
        aes256: {
          title: 'AES-256-GCM',
          description: 'Same standard used by NSA for Top Secret docs. Adopted by NIST in 2001. Still unbroken.',
        },
        pbkdf2: {
          title: 'PBKDF2 (310k iterations)',
          description: 'OWASP recommends 100k. We do 310k to make brute-force attacks exponentially harder.',
        },
        uniqueSaltIV: {
          title: 'Unique salt & IV per save',
          description: 'Fresh cryptographic randomness every time. No reuse, no predictability.',
        },
        webCrypto: {
          title: 'Web Crypto API',
          description: 'Native browser implementation. No sketchy third-party libraries.',
        },
      },
      verifyNote: 'Want to verify? The code is open source. Check it yourself on GitHub.',
    },
  },

  // Conflict protection
  conflictProtection: {
    title: 'Conflict Protection',
    description1:
      'Use the same URL on your laptop, phone, and tablet at the same time? No problem. We detect when multiple devices are editing and prevent you from losing changes. Auto-save runs every 2 seconds, and we keep the last 10 versions so you can roll back if needed.',
    description2:
      "If two devices save at the same time, we'll show you both versions and let you pick which one to keep. No silent data loss. Ever.",
    versionHistory: {
      title: 'Version History',
      subtitle: 'Last 10 saves available',
    },
  },

  // Features
  features: {
    title: 'Protected Text Features',
    subtitle: 'Everything you need. Nothing you don\'t. No premium tiers.',
    list: [
      'AES-256-GCM encryption',
      'No registration needed',
      'Auto-save (every 2 seconds)',
      'Version history (last 10)',
      'Markdown preview',
      'Dark & light themes',
      'Keyboard shortcuts',
      'In-note search (Ctrl+F)',
      'Import from files',
      'Change password anytime',
      'Delete notes permanently',
      'Export/backup encrypted',
      'Works on all devices',
      'Works offline',
      'Open source code',
      'No ads, no tracking',
      'PWA support (install as app)',
      'Conflict detection',
    ],
  },

  // Getting started
  gettingStarted: {
    title: 'Getting Started with Protected Text',
    subtitle: "It's ridiculously simple. Three steps. That's it.",
    steps: {
      step1: {
        title: 'Pick a URL',
        description:
          'Type any URL you want in the box above, like `protected-text.com/myproject`. If nobody\'s using it, it\'s yours. First come, first served.',
      },
      step2: {
        title: 'Set a password',
        description:
          "Choose a strong password. We never see it. It never leaves your browser. If you forget it, your notes are gone forever. Write it down somewhere safe.",
      },
      step3: {
        title: 'Start typing',
        description:
          "That's it. Your notes auto-save every 2 seconds. Come back later from any device, same URL, same password, and everything's there.",
      },
    },
  },

  // FAQ
  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about Protected Text',
    questions: {
      forgotPassword: {
        q: 'I forgot my password. Can you recover it?',
        a: "**Nope.** Look, this sucks, but it's also the point. Your password never leaves your device. We don't have it. We can't have it. That's zero-knowledge security. If we could recover your password, that would mean we could read your notes, which defeats the entire purpose. Write it down. Use a password manager. Tattoo it on your arm. I don't care. Just don't lose it.",
      },
      actuallyFree: {
        q: 'Is Protected Text actually free?',
        a: '**Yes, it\'s free.** No ads. No tracking pixels. No "freemium" nonsense where we cripple the product until you pay. Privacy shouldn\'t be a luxury good. The whole point of this is to give everyone access to secure notes. If we need to cover costs eventually, we might add optional features for power users, but the core encryption and notes? Free. Forever.',
      },
      hackServers: {
        q: 'What happens if someone hacks your servers?',
        a: "**They get nothing useful.** Seriously. All we store is encrypted data. Without your password, it's gibberish. Think of it like this: If someone steals a safe, they still can't open it without the combination. Except in this case, the combination (your password) never left your pocket in the first place.",
      },
      teamCollaboration: {
        q: 'Can I use Protected Text for team collaboration?',
        a: "Sort of. Multiple people can use the same URL and password. Everyone with the credentials has full access. But there's no permission system, no user management, no audit logs. It's deliberately simple. If you need enterprise features, this isn't that. If you just need a shared encrypted notepad, go for it.",
      },
      takeUrl: {
        q: 'Can someone else take my URL?',
        a: "If you haven't saved anything yet, technically yes. But once you save notes to a URL, that URL is locked to your password. Even if someone else tries to use the same URL, they can't read your notes without your password, and they can't overwrite them. First saver wins.",
      },
      governmentRequest: {
        q: 'What if the government asks for my data?',
        a: "**They get encrypted data.** That's it. We don't have your password. We don't have your email. We don't even know who you are. Even if a government agency shows up with a warrant, all we can give them is gibberish. Can't decrypt what you don't have the key for. This isn't a political stance—it's just how the math works.",
      },
      whyTrust: {
        q: 'Why should I trust Protected Text?',
        a: "**You shouldn't blindly trust anyone.** The code is open source—go read it. The encryption is standard (AES-256-GCM, PBKDF2)—no custom crypto nonsense. These algorithms have been battle-tested for decades by actual cryptographers, not by me making stuff up. If you find a vulnerability, report it. We'll fix it. That's how security actually works—transparency, not secrecy.",
      },
      protectedTextPro: {
        q: 'What is Protected Text Pro?',
        a: "**We're building it based on your feedback.** Protected Text will always be free, but we're exploring Pro features for power users—things like custom domains, larger file uploads, extended version history, and team management tools.",
        linkText: 'Vote on features and help shape the roadmap →',
      },
    },
  },

  // Footer
  footer: {
    about: {
      description: 'Zero-knowledge encrypted notes. Your password never leaves your device. Free forever, no tracking, no BS.',
      starOnGithub: 'Star on GitHub',
      openSourceOnGithub: 'Open Source on GitHub',
    },
    security: {
      title: 'Found a security issue?',
      description: 'Please report it responsibly via email. We take security seriously.',
    },
    contact: {
      email: 'hello@protected-text.com',
    },
    bottom: {
      builtWith: 'Built with',
      in2025: 'in 2025',
      license: 'Protected Text is open source under MIT License.',
      disclaimer: 'No warranty. Use at your own risk.',
    },
  },
};

/**
 * Landingpage-Inhalt - Hero, Funktionen, Sicherheit, FAQ, Footer
 */

export const landing = {
  // Hero-Bereich
  hero: {
    badge: 'Der sicherste Notizblock im Internet',
    title: 'Protected Text: Ihre Notizen,',
    titleHighlight: 'Verschlüsselt. Zero-Knowledge.',
    subtitle:
      'Hören Sie zu, das ist einfach. Wählen Sie eine beliebige URL wie **protected-text.com/irgendwas**, erstellen Sie ein Passwort und fangen Sie an zu tippen. Ihre Sachen werden in Ihrem Browser verschlüsselt, bevor sie jemals Ihr Gerät verlassen. Wir können sie buchstäblich nicht lesen. Nicht, weil wir nette Menschen sind (das sind wir), sondern weil es mathematisch unmöglich ist.',
  },

  // Formular zur Site-Erstellung
  createSiteForm: {
    label: 'Wählen Sie eine private URL',
    urlPrefix: 'protected-text.com/',
    urlPlaceholder: '[ihre-url]',
    submitButton: 'Meine Notiz sichern',
    randomButton: 'Überraschen Sie mich',
  },

  // Highlights
  highlights: {
    heading: 'Warum Protected Text funktioniert',
    items: {
      passwordNeverLeaves: {
        title: 'Ihr Passwort verlässt niemals Ihr Gerät',
        description:
          'Wir verschlüsseln alles in Ihrem Browser, bevor es das Internet berührt. Wir können Ihre Notizen buchstäblich nicht lesen, selbst wenn wir es wollten.',
      },
      noSignup: {
        title: 'Keine Registrierung erforderlich',
        description:
          'Keine E-Mail. Kein Konto. Keine Tracking-Cookies. Wählen Sie einfach eine URL und fangen Sie an zu tippen. Das war\'s.',
      },
      freeForever: {
        title: 'Für immer kostenlos',
        description:
          'Keine Werbung. Keine Premium-Stufen. Kein Unsinn. Es funktioniert einfach. Wir glauben, dass Privatsphäre für alle kostenlos sein sollte.',
      },
    },
  },

  // Warum-Bereich
  why: {
    title: 'Warum Sie Protected Text brauchen',
    stats1:
      'Hier ist die Realität: Im Jahr 2024 wurden **1,7 Milliarden Menschen** bei Datenschutzverletzungen kompromittiert. Das ist kein Tippfehler. **1.700.000.000 Menschen**. Weltweit stiegen die kompromittierten Konten von 730 Millionen im Jahr 2023 auf über **5,5 Milliarden im Jahr 2024**. Das bedeutet, dass etwa 180 Konten *jede Sekunde* im letzten Jahr kompromittiert wurden.',
    stats2:
      'Denken Sie mal eine Minute darüber nach. Während Sie diesen Satz lesen, wurden gerade Dutzende von Menschen gehackt. Ihre Notizen, Ihre Ideen, Ihre privaten Gedanken—sie liegen gerade jetzt auf dem Server eines Unternehmens. Und wenn dieses Unternehmen gehackt wird (wann, nicht ob), werden Ihre Sachen zu den Sachen von jemand anderem.',

    whatMakesDifferent: {
      heading: 'Was macht Protected Text anders?',
      paragraph1:
        'Protected Text ist ein **kostenloser Online-Notizblock mit Ende-zu-Ende-Verschlüsselung**. Aber hier ist, was ihn anders macht: Wir verwenden **AES-256-GCM-Verschlüsselung**—derselbe Standard, den die NSA zum Schutz streng geheimer Regierungsdokumente verwendet, dieselbe Technologie, die Google Cloud standardmäßig verwendet, und dieselbe Verschlüsselung, auf die große Banken vertrauen.',
      paragraph2:
        'Alles passiert in Ihrem Browser. Bevor Ihre Notizen das Internet berühren, werden sie zu Kauderwelsch verschlüsselt. Wir speichern dieses Kauderwelsch. Selbst wenn morgen jemand unsere gesamte Datenbank stiehlt, bekommen sie nur nutzlose verschlüsselte Daten. Kein Passwort, keine Entschlüsselung. So einfach ist das.',
    },

    howItWorks: {
      heading: 'Wie Protected Text tatsächlich funktioniert',
      paragraph1:
        'Sie wählen eine beliebige URL—sagen wir `protected-text.com/meine-geheimen-ideen`. Niemand benutzt sie? Sie gehört Ihnen. Sie erstellen ein Passwort. Dieses Passwort verlässt niemals Ihren Computer. Niemals.',
      paragraph2:
        'Wenn Sie Ihre Notizen eingeben, verwendet Ihr Browser dieses Passwort, um alles mit PBKDF2 in verschlüsselten Code zu verwandeln (310.000 Iterationen, falls Sie sich für die technischen Details interessieren—das ist mehr als der Industriestandard). Erst dann geht die verschlüsselte Version zu unseren Servern. Wir können buchstäblich nicht lesen, was Sie schreiben, selbst wenn wir es wollten, selbst wenn die Regierung uns darum bitten würde, selbst wenn Hacker einbrechen würden.',
    },

    realTalk: {
      heading: 'Klare Worte: Die Zahlen lügen nicht',
      stat1: '**36 Milliarden Datensätze** in nur 4 Monaten offengelegt (Jan-Apr 2024)',
      stat2: 'Durchschnittlich **758.288 Datensätze pro Tag** im Jahr 2024 kompromittiert',
      stat3: 'Sechs Mega-Verstöße im Jahr 2024, jeder offenbarte **über 100 Millionen Datensätze**',
      stat4: 'Der Verschlüsselungsmarkt explodiert: von **16,7 Milliarden Dollar im Jahr 2024 auf 60,7 Milliarden Dollar bis 2033**',
      source: 'Quellen: HIPAA Journal 2024 Data Breach Report, Statista, SecureFrame 2024 Security Statistics',
    },

    zeroKnowledge: {
      badge: 'Zero-Knowledge-Architektur = Vertrauenslose Sicherheit',
      tagline: 'Sie müssen uns nicht vertrauen. Sie müssen niemandem vertrauen. Die Mathematik schützt Sie, nicht Versprechen.',
    },
  },

  // Sicherheitsbereich
  security: {
    title: 'Warum dem vertrauen? (Glauben Sie mir nicht einfach)',
    subtitle: 'Sicherheit ist eigentlich ziemlich einfach, wenn man sie nicht verkompliziert. So machen wir es genau:',

    items: {
      passwordNeverLeaves: {
        title: 'Ihr Passwort verlässt buchstäblich niemals Ihr Gerät',
        description:
          'Nicht, wenn Sie ein Konto erstellen (es gibt kein Konto). Nicht, wenn Sie sich anmelden. Niemals. Es bleibt in Ihrem Browser und erledigt die gesamte Verschlüsselungsarbeit direkt auf Ihrem Gerät. Wir sehen es nie. Punkt.',
      },
      clientSideEncryption: {
        title: 'Client-seitige Verschlüsselung = Sie haben die Kontrolle',
        description:
          'Die gesamte Verschlüsselung erfolgt in Ihrem Browser mithilfe der Web Crypto API (in modernen Browsern integriert). Nur verschlüsseltes Kauderwelsch wandert über das Netzwerk. Jemand fängt es ab? Cool, sie haben nichts bekommen.',
      },
      zeroTracking: {
        title: 'Null Tracking, null Unsinn',
        description:
          'Keine Benutzerkonten. Keine Cookies. Keine Analytik. Keine "anonymen" Tracking-Pixel. Wir wissen nicht, wer Sie sind, wir wollen es nicht wissen, und wir können es nicht wissen. Das ist das Design.',
      },
      openSource: {
        title: 'Open Source (denn vertraue, aber überprüfe)',
        description:
          'Vertrauen Sie mir nicht? Klug. Der Code ist offen. Sie können ihn selbst überprüfen oder jemanden mit technischem Sachverstand beauftragen. Wir verwenden standardisierte, von Experten begutachtete Verschlüsselungsalgorithmen—keinen benutzerdefinierten Krypto-Unsinn, der immer scheitert.',
      },
      doubleLayerProtection: {
        title: 'Doppelschichtschutz',
        description:
          'Ihre einzigartige URL ist wie ein Benutzername—niemand kann Ihre Notizen ohne sie finden. Ihr Passwort ist der Verschlüsselungsschlüssel. Beides ist erforderlich. Selbst wenn jemand Ihre URL errät, sind sie ohne Ihr Passwort aufgeschmissen.',
      },
    },

    technical: {
      heading: 'Für die technisch Versierten',
      subtitle: 'Wenn Sie sich für die tatsächlichen Implementierungsdetails interessieren:',
      specs: {
        aes256: {
          title: 'AES-256-GCM',
          description: 'Derselbe Standard, den die NSA für streng geheime Dokumente verwendet. Vom NIST im Jahr 2001 übernommen. Immer noch ungebrochen.',
        },
        pbkdf2: {
          title: 'PBKDF2 (310k Iterationen)',
          description: 'OWASP empfiehlt 100k. Wir machen 310k, um Brute-Force-Angriffe exponentiell schwieriger zu machen.',
        },
        uniqueSaltIV: {
          title: 'Einzigartiger Salt & IV pro Speicherung',
          description: 'Neue kryptografische Zufälligkeit jedes Mal. Keine Wiederverwendung, keine Vorhersehbarkeit.',
        },
        webCrypto: {
          title: 'Web Crypto API',
          description: 'Native Browser-Implementierung. Keine zwielichtigen Drittanbieter-Bibliotheken.',
        },
      },
      verifyNote: 'Möchten Sie überprüfen? Der Code ist Open Source. Überprüfen Sie ihn selbst auf GitHub.',
    },
  },

  // Konfliktschutz
  conflictProtection: {
    title: 'Konfliktschutz',
    description1:
      'Verwenden Sie dieselbe URL gleichzeitig auf Ihrem Laptop, Telefon und Tablet? Kein Problem. Wir erkennen, wenn mehrere Geräte bearbeiten, und verhindern, dass Sie Änderungen verlieren. Die automatische Speicherung läuft alle 2 Sekunden, und wir behalten die letzten 10 Versionen, damit Sie bei Bedarf zurückrollen können.',
    description2:
      'Wenn zwei Geräte gleichzeitig speichern, zeigen wir Ihnen beide Versionen und lassen Sie wählen, welche Sie behalten möchten. Kein stiller Datenverlust. Niemals.',
    versionHistory: {
      title: 'Versionsverlauf',
      subtitle: 'Letzte 10 Speicherungen verfügbar',
    },
  },

  // Funktionen
  features: {
    title: 'Protected Text Funktionen',
    subtitle: 'Alles, was Sie brauchen. Nichts, was Sie nicht brauchen. Keine Premium-Stufen.',
    list: [
      'AES-256-GCM-Verschlüsselung',
      'Keine Registrierung erforderlich',
      'Automatisches Speichern (alle 2 Sekunden)',
      'Versionsverlauf (letzte 10)',
      'Markdown-Vorschau',
      'Dunkle & helle Themen',
      'Tastaturkürzel',
      'In-Notiz-Suche (Strg+F)',
      'Import aus Dateien',
      'Passwort jederzeit ändern',
      'Notizen dauerhaft löschen',
      'Export/Backup verschlüsselt',
      'Funktioniert auf allen Geräten',
      'Funktioniert offline',
      'Open-Source-Code',
      'Keine Werbung, kein Tracking',
      'PWA-Unterstützung (als App installieren)',
      'Konflikterkennung',
    ],
  },

  // Erste Schritte
  gettingStarted: {
    title: 'Erste Schritte mit Protected Text',
    subtitle: 'Es ist lächerlich einfach. Drei Schritte. Das war\'s.',
    steps: {
      step1: {
        title: 'Wählen Sie eine URL',
        description:
          'Geben Sie eine beliebige URL in das Feld oben ein, wie `protected-text.com/meinprojekt`. Wenn sie niemand benutzt, gehört sie Ihnen. Wer zuerst kommt, mahlt zuerst.',
      },
      step2: {
        title: 'Legen Sie ein Passwort fest',
        description:
          'Wählen Sie ein starkes Passwort. Wir sehen es nie. Es verlässt niemals Ihren Browser. Wenn Sie es vergessen, sind Ihre Notizen für immer verloren. Schreiben Sie es an einem sicheren Ort auf.',
      },
      step3: {
        title: 'Fangen Sie an zu tippen',
        description:
          'Das war\'s. Ihre Notizen werden alle 2 Sekunden automatisch gespeichert. Kommen Sie später von einem beliebigen Gerät zurück, dieselbe URL, dasselbe Passwort, und alles ist da.',
      },
    },
  },

  // FAQ
  faq: {
    title: 'Häufig gestellte Fragen',
    subtitle: 'Alles, was Sie über Protected Text wissen müssen',
    questions: {
      forgotPassword: {
        q: 'Ich habe mein Passwort vergessen. Können Sie es wiederherstellen?',
        a: '**Nein.** Hören Sie, das ist Mist, aber das ist auch der Punkt. Ihr Passwort verlässt niemals Ihr Gerät. Wir haben es nicht. Wir können es nicht haben. Das ist Zero-Knowledge-Sicherheit. Wenn wir Ihr Passwort wiederherstellen könnten, würde das bedeuten, dass wir Ihre Notizen lesen könnten, was den gesamten Zweck zunichtemacht. Schreiben Sie es auf. Verwenden Sie einen Passwort-Manager. Tätowieren Sie es sich auf den Arm. Mir egal. Verlieren Sie es einfach nicht.',
      },
      actuallyFree: {
        q: 'Ist Protected Text wirklich kostenlos?',
        a: '**Ja, es ist kostenlos.** Keine Werbung. Keine Tracking-Pixel. Kein "Freemium"-Unsinn, bei dem wir das Produkt verkrüppeln, bis Sie bezahlen. Privatsphäre sollte kein Luxusgut sein. Der ganze Sinn davon ist, allen Zugang zu sicheren Notizen zu geben. Wenn wir irgendwann Kosten decken müssen, könnten wir optionale Funktionen für Power-User hinzufügen, aber die Kernverschlüsselung und Notizen? Kostenlos. Für immer.',
      },
      hackServers: {
        q: 'Was passiert, wenn jemand Ihre Server hackt?',
        a: '**Sie bekommen nichts Nützliches.** Ernsthaft. Alles, was wir speichern, sind verschlüsselte Daten. Ohne Ihr Passwort ist es Kauderwelsch. Denken Sie so darüber nach: Wenn jemand einen Safe stiehlt, kann er ihn trotzdem nicht ohne die Kombination öffnen. Nur dass in diesem Fall die Kombination (Ihr Passwort) Ihre Tasche von vornherein nie verlassen hat.',
      },
      teamCollaboration: {
        q: 'Kann ich Protected Text für die Teamzusammenarbeit verwenden?',
        a: 'Irgendwie. Mehrere Personen können dieselbe URL und dasselbe Passwort verwenden. Jeder mit den Zugangsdaten hat vollen Zugriff. Aber es gibt kein Berechtigungssystem, keine Benutzerverwaltung, keine Audit-Logs. Es ist absichtlich einfach. Wenn Sie Unternehmensfunktionen benötigen, ist das hier nicht das Richtige. Wenn Sie nur einen gemeinsamen verschlüsselten Notizblock benötigen, machen Sie weiter.',
      },
      takeUrl: {
        q: 'Kann jemand anderes meine URL nehmen?',
        a: 'Wenn Sie noch nichts gespeichert haben, technisch ja. Aber sobald Sie Notizen auf einer URL speichern, wird diese URL mit Ihrem Passwort gesperrt. Selbst wenn jemand anderes versucht, dieselbe URL zu verwenden, kann er Ihre Notizen ohne Ihr Passwort nicht lesen und nicht überschreiben. Der erste Speicherer gewinnt.',
      },
      governmentRequest: {
        q: 'Was ist, wenn die Regierung nach meinen Daten fragt?',
        a: '**Sie bekommen verschlüsselte Daten.** Das war\'s. Wir haben Ihr Passwort nicht. Wir haben Ihre E-Mail nicht. Wir wissen nicht einmal, wer Sie sind. Selbst wenn eine Regierungsbehörde mit einem Durchsuchungsbefehl auftaucht, ist alles, was wir ihnen geben können, Kauderwelsch. Man kann nicht entschlüsseln, wofür man keinen Schlüssel hat. Das ist keine politische Haltung—so funktioniert einfach die Mathematik.',
      },
      whyTrust: {
        q: 'Warum sollte ich Protected Text vertrauen?',
        a: '**Sie sollten niemandem blind vertrauen.** Der Code ist Open Source—lesen Sie ihn. Die Verschlüsselung ist Standard (AES-256-GCM, PBKDF2)—kein benutzerdefinierter Krypto-Unsinn. Diese Algorithmen wurden jahrzehntelang von echten Kryptografen kampferprobt, nicht von mir, der Dinge erfindet. Wenn Sie eine Schwachstelle finden, melden Sie sie. Wir werden sie beheben. So funktioniert Sicherheit wirklich—Transparenz, nicht Geheimhaltung.',
      },
      protectedTextPro: {
        q: 'Was ist Protected Text Pro?',
        a: '**Wir bauen es basierend auf Ihrem Feedback.** Protected Text wird immer kostenlos sein, aber wir erkunden Pro-Funktionen für Power-User—Dinge wie benutzerdefinierte Domains, größere Datei-Uploads, erweiterten Versionsverlauf und Team-Management-Tools.',
        linkText: 'Stimmen Sie für Funktionen und helfen Sie, die Roadmap zu gestalten →',
      },
    },
  },

  // Footer
  footer: {
    about: {
      description: 'Zero-Knowledge verschlüsselte Notizen. Ihr Passwort verlässt niemals Ihr Gerät. Für immer kostenlos, kein Tracking, kein Unsinn.',
      starOnGithub: 'Auf GitHub markieren',
      openSourceOnGithub: 'Open Source auf GitHub',
    },
    security: {
      title: 'Ein Sicherheitsproblem gefunden?',
      description: 'Bitte melden Sie es verantwortungsvoll per E-Mail. Wir nehmen Sicherheit ernst.',
    },
    contact: {
      email: 'hello@protected-text.com',
    },
    bottom: {
      builtWith: 'Erstellt mit',
      in2025: 'im Jahr 2025',
      license: 'Protected Text ist Open Source unter MIT-Lizenz.',
      disclaimer: 'Keine Garantie. Nutzung auf eigene Gefahr.',
    },
  },
};

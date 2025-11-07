export const languages = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  ja: '日本語',
} as const;

export type Language = keyof typeof languages;

export const translations = {
  en: {
    // Hero
    tagline: 'The safest notepad on the web',
    hero: {
      title: ['Write notes.', 'Stay safe.', 'That\'s it.'],
      description: 'Type any URL like protectedtext.com/',
      descriptionHighlight: 'anything',
      descriptionEnd: ', set a password, and your notes are encrypted in your browser. We literally can\'t read them. Simple. Fast. Free.',
    },
    // Form
    form: {
      label: 'Choose a private URL',
      placeholder: 'ember-lynx',
      button: 'Secure my note',
      urlHint: 'URL lives at protectedtext.com/[your-url]',
      surprise: 'Surprise me',
    },
    // Features
    features: {
      title: 'Why it works',
      password: {
        title: 'Your password never leaves your device',
        description: 'Seriously. We can\'t read your notes even if we wanted to.',
      },
      noSignup: {
        title: 'No sign-up BS',
        description: 'Just type a URL and you\'re done. That\'s it.',
      },
      free: {
        title: 'Free. Forever.',
        description: 'No ads, no tracking, no premium tiers. Just works.',
      },
    },
    // Security
    security: {
      badge: 'Trustless Security',
      title: 'Don\'t trust us. Don\'t trust anyone.',
      description: 'Your password stays on your device. Period. We encrypt everything in your browser before sending it to our servers. Even if someone hacked our servers, they\'d just get gibberish. That\'s the point.',
      checklist: 'How it works',
      items: [
        'Password never sent to server',
        'Military-grade encryption (AES-256)',
        'No registration required',
        'Open source - check the code',
      ],
    },
    // Pricing
    pricing: {
      title: 'Free. No catch.',
      description: 'Unlimited notes. Unlimited storage. Zero ads. Zero tracking. Zero BS.',
      features: ['Client-side encryption', 'No registration', 'Works offline', 'Auto-save', 'Version history', 'Open source'],
      pro: {
        badge: 'Future: Pro features',
        description: 'Want custom domains, team sharing, or API access?',
        button: 'Vote for features',
      },
    },
    // FAQ
    faq: {
      title: 'Common Questions',
      items: [
        {
          q: 'Can you recover my password if I forget it?',
          a: 'Nope. We literally can\'t. Your password never leaves your browser, so we never see it. If you lose it, your notes are gone. Write it down somewhere safe.',
        },
        {
          q: 'Where is my data stored?',
          a: 'Your encrypted notes are stored on secure servers. But they\'re encrypted with YOUR password on YOUR device, so even if someone hacked our servers, they couldn\'t read anything.',
        },
        {
          q: 'Is this really free?',
          a: 'Yes. No ads, no tracking, no premium tiers. Just free. We hate that subscription BS as much as you do.',
        },
        {
          q: 'Can I trust you?',
          a: 'Don\'t trust us. Don\'t trust anyone. That\'s the whole point. Check the code yourself - it\'s open source. Your password never leaves your device, so you don\'t have to trust us with anything.',
        },
        {
          q: 'How long do my notes last?',
          a: 'Forever. We don\'t delete notes automatically. When you delete them, they\'re gone. No backups, no recovery.',
        },
      ],
    },
    footer: 'Built with ❤️ in 2025 ·',
    email: 'Email us',
  },
  zh: {
    // Hero
    tagline: '网络上最安全的记事本',
    hero: {
      title: ['写笔记。', '保安全。', '就这么简单。'],
      description: '输入任意网址，比如 protectedtext.com/',
      descriptionHighlight: '任意内容',
      descriptionEnd: '，设置密码，您的笔记就在浏览器中加密了。我们真的读不了。简单、快速、免费。',
    },
    // Form
    form: {
      label: '选择一个私人网址',
      placeholder: 'ember-lynx',
      button: '保护我的笔记',
      urlHint: '网址：protectedtext.com/[你的网址]',
      surprise: '随机生成',
    },
    // Features
    features: {
      title: '为什么有效',
      password: {
        title: '密码永远不会离开你的设备',
        description: '真的。就算我们想，也读不了你的笔记。',
      },
      noSignup: {
        title: '无需注册',
        description: '输入网址就行了。就这么简单。',
      },
      free: {
        title: '永久免费',
        description: '无广告、无跟踪、无付费功能。就是能用。',
      },
    },
    // Security
    security: {
      badge: '零信任安全',
      title: '别信任我们。别信任任何人。',
      description: '你的密码留在你的设备上。句号。我们在你的浏览器中加密一切，然后才发送到服务器。就算有人黑了我们的服务器，他们也只能得到乱码。这就是重点。',
      checklist: '工作原理',
      items: [
        '密码永不发送到服务器',
        '军用级加密 (AES-256)',
        '无需注册',
        '开源 - 自己检查代码',
      ],
    },
    // Pricing
    pricing: {
      title: '免费。没陷阱。',
      description: '无限笔记。无限存储。零广告。零跟踪。零废话。',
      features: ['客户端加密', '无需注册', '离线工作', '自动保存', '版本历史', '开源'],
      pro: {
        badge: '未来：专业功能',
        description: '想要自定义域名、团队共享或 API 访问？',
        button: '为功能投票',
      },
    },
    // FAQ
    faq: {
      title: '常见问题',
      items: [
        {
          q: '如果我忘记密码，你们能恢复吗？',
          a: '不能。我们真的做不到。你的密码从不离开浏览器，所以我们永远看不到它。如果你丢了密码，笔记就没了。找个安全的地方记下来。',
        },
        {
          q: '我的数据存在哪里？',
          a: '你的加密笔记存在安全服务器上。但它们是用你的密码在你的设备上加密的，所以就算有人黑了我们的服务器，也读不了任何内容。',
        },
        {
          q: '真的免费吗？',
          a: '是的。无广告、无跟踪、无付费功能。就是免费。我们和你一样讨厌订阅制。',
        },
        {
          q: '我能信任你们吗？',
          a: '别信任我们。别信任任何人。这就是重点。自己检查代码 - 它是开源的。你的密码永不离开设备，所以你不需要信任我们任何东西。',
        },
        {
          q: '我的笔记能保存多久？',
          a: '永久。我们不会自动删除笔记。当你删除时，它们就没了。没有备份，无法恢复。',
        },
      ],
    },
    footer: '用 ❤️ 构建于 2025 ·',
    email: '发邮件给我们',
  },
  es: {
    // Hero
    tagline: 'El bloc de notas más seguro de la web',
    hero: {
      title: ['Escribe notas.', 'Mantente seguro.', 'Así de simple.'],
      description: 'Escribe cualquier URL como protectedtext.com/',
      descriptionHighlight: 'loquesea',
      descriptionEnd: ', establece una contraseña y tus notas se cifran en tu navegador. Literalmente no podemos leerlas. Simple. Rápido. Gratis.',
    },
    // Form
    form: {
      label: 'Elige una URL privada',
      placeholder: 'ember-lynx',
      button: 'Asegurar mi nota',
      urlHint: 'URL en protectedtext.com/[tu-url]',
      surprise: 'Sorpréndeme',
    },
    // Features
    features: {
      title: 'Por qué funciona',
      password: {
        title: 'Tu contraseña nunca sale de tu dispositivo',
        description: 'En serio. No podemos leer tus notas aunque quisiéramos.',
      },
      noSignup: {
        title: 'Sin registro',
        description: 'Solo escribe una URL y listo. Así de fácil.',
      },
      free: {
        title: 'Gratis. Para siempre.',
        description: 'Sin anuncios, sin rastreo, sin planes premium. Solo funciona.',
      },
    },
    // Security
    security: {
      badge: 'Seguridad Sin Confianza',
      title: 'No confíes en nosotros. No confíes en nadie.',
      description: 'Tu contraseña se queda en tu dispositivo. Punto. Ciframos todo en tu navegador antes de enviarlo a nuestros servidores. Incluso si alguien hackeara nuestros servidores, solo obtendrían basura. Ese es el punto.',
      checklist: 'Cómo funciona',
      items: [
        'Contraseña nunca enviada al servidor',
        'Cifrado de grado militar (AES-256)',
        'Sin registro requerido',
        'Código abierto - revisa el código',
      ],
    },
    // Pricing
    pricing: {
      title: 'Gratis. Sin trampa.',
      description: 'Notas ilimitadas. Almacenamiento ilimitado. Cero anuncios. Cero rastreo. Cero tonterías.',
      features: ['Cifrado del lado del cliente', 'Sin registro', 'Funciona offline', 'Guardado automático', 'Historial de versiones', 'Código abierto'],
      pro: {
        badge: 'Futuro: Funciones Pro',
        description: '¿Quieres dominios personalizados, compartir en equipo o acceso API?',
        button: 'Vota por funciones',
      },
    },
    // FAQ
    faq: {
      title: 'Preguntas Comunes',
      items: [
        {
          q: '¿Puedes recuperar mi contraseña si la olvido?',
          a: 'No. Literalmente no podemos. Tu contraseña nunca sale de tu navegador, así que nunca la vemos. Si la pierdes, tus notas desaparecen. Escríbela en un lugar seguro.',
        },
        {
          q: '¿Dónde se almacenan mis datos?',
          a: 'Tus notas cifradas se almacenan en servidores seguros. Pero están cifradas con TU contraseña en TU dispositivo, así que incluso si alguien hackeara nuestros servidores, no podrían leer nada.',
        },
        {
          q: '¿Es realmente gratis?',
          a: 'Sí. Sin anuncios, sin rastreo, sin planes premium. Solo gratis. Odiamos esa basura de suscripciones tanto como tú.',
        },
        {
          q: '¿Puedo confiar en ustedes?',
          a: 'No confíes en nosotros. No confíes en nadie. Ese es el punto. Revisa el código tú mismo - es de código abierto. Tu contraseña nunca sale de tu dispositivo, así que no tienes que confiar en nosotros para nada.',
        },
        {
          q: '¿Cuánto duran mis notas?',
          a: 'Para siempre. No eliminamos notas automáticamente. Cuando las eliminas, desaparecen. Sin respaldos, sin recuperación.',
        },
      ],
    },
    footer: 'Hecho con ❤️ en 2025 ·',
    email: 'Envíanos un email',
  },
  ja: {
    // Hero
    tagline: 'ウェブ上で最も安全なメモ帳',
    hero: {
      title: ['メモを書く。', '安全を保つ。', 'それだけ。'],
      description: 'protectedtext.com/',
      descriptionHighlight: '任意のURL',
      descriptionEnd: 'を入力し、パスワードを設定すれば、メモはブラウザで暗号化されます。私たちは文字通り読めません。シンプル。高速。無料。',
    },
    // Form
    form: {
      label: 'プライベートURLを選択',
      placeholder: 'ember-lynx',
      button: 'メモを保護',
      urlHint: 'URL: protectedtext.com/[あなたのURL]',
      surprise: 'ランダム',
    },
    // Features
    features: {
      title: '仕組み',
      password: {
        title: 'パスワードはデバイスから出ません',
        description: '本当です。私たちはあなたのメモを読めません。',
      },
      noSignup: {
        title: '登録不要',
        description: 'URLを入力するだけ。それだけです。',
      },
      free: {
        title: '永久無料',
        description: '広告なし、トラッキングなし、有料機能なし。ただ動く。',
      },
    },
    // Security
    security: {
      badge: 'トラストレスセキュリティ',
      title: '私たちを信頼しないでください。誰も信頼しないでください。',
      description: 'パスワードはあなたのデバイスに留まります。ピリオド。サーバーに送信する前に、ブラウザですべてを暗号化します。誰かが私たちのサーバーをハッキングしても、意味不明な文字列しか得られません。それがポイントです。',
      checklist: '仕組み',
      items: [
        'パスワードはサーバーに送信されません',
        '軍事グレードの暗号化（AES-256）',
        '登録不要',
        'オープンソース - コードを確認',
      ],
    },
    // Pricing
    pricing: {
      title: '無料。罠なし。',
      description: '無制限のメモ。無制限のストレージ。広告ゼロ。トラッキングゼロ。無駄ゼロ。',
      features: ['クライアント側暗号化', '登録不要', 'オフライン動作', '自動保存', 'バージョン履歴', 'オープンソース'],
      pro: {
        badge: '将来: プロ機能',
        description: 'カスタムドメイン、チーム共有、API アクセスが必要ですか？',
        button: '機能に投票',
      },
    },
    // FAQ
    faq: {
      title: 'よくある質問',
      items: [
        {
          q: 'パスワードを忘れた場合、復旧できますか？',
          a: 'できません。文字通り。パスワードはブラウザから出ないので、私たちは見ることができません。失くしたら、メモも失われます。安全な場所に書き留めてください。',
        },
        {
          q: 'データはどこに保存されますか？',
          a: '暗号化されたメモは安全なサーバーに保存されます。しかし、あなたのデバイスであなたのパスワードで暗号化されているため、誰かが私たちのサーバーをハッキングしても何も読めません。',
        },
        {
          q: '本当に無料ですか？',
          a: 'はい。広告なし、トラッキングなし、有料プランなし。ただ無料。私たちもあなたと同じくらいサブスクリプションが嫌いです。',
        },
        {
          q: '信頼できますか？',
          a: '私たちを信頼しないでください。誰も信頼しないでください。それがポイントです。コードを自分で確認してください - オープンソースです。パスワードはデバイスから出ないので、私たちを信頼する必要はありません。',
        },
        {
          q: 'メモはどれくらい保存されますか？',
          a: '永久に。自動削除はしません。削除すると、消えます。バックアップなし、復旧なし。',
        },
      ],
    },
    footer: '2025年に❤️で作成 ·',
    email: 'メールを送る',
  },
} as const;

export function getTranslation(lang: Language) {
  return translations[lang] || translations.en;
}

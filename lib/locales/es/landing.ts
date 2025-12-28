/**
 * Contenido de la página de inicio - hero, características, seguridad, FAQ, pie de página
 */

export const landing = {
  // Sección hero
  hero: {
    badge: 'El bloc de notas más seguro de internet',
    title: 'Protected Text: Tus Notas,',
    titleHighlight: 'Encriptadas. Conocimiento Cero.',
    subtitle:
      'Mira, esto es simple. Elige cualquier URL como **protected-text.com/loquesea**, crea una contraseña y empieza a escribir. Tus cosas se encriptan en tu navegador antes de que salgan de tu dispositivo. Literalmente no podemos leerlas. No porque seamos buenas personas (lo somos), sino porque es matemáticamente imposible.',
  },

  // Formulario de creación de sitio
  createSiteForm: {
    label: 'Elige una URL privada',
    urlPrefix: 'protected-text.com/',
    urlPlaceholder: '[tu-url]',
    submitButton: 'Asegurar mi nota',
    randomButton: 'Sorpréndeme',
  },

  // Destacados
  highlights: {
    heading: 'Por qué funciona Protected Text',
    items: {
      passwordNeverLeaves: {
        title: 'Tu contraseña nunca sale de tu dispositivo',
        description:
          'Encriptamos todo en tu navegador antes de que toque internet. Literalmente no podemos leer tus notas, aunque quisiéramos.',
      },
      noSignup: {
        title: 'No requiere registro',
        description:
          'Sin email. Sin cuenta. Sin cookies de rastreo. Solo elige una URL y empieza a escribir. Eso es todo.',
      },
      freeForever: {
        title: 'Gratis para siempre',
        description:
          'Sin anuncios. Sin niveles premium. Sin tonterías. Simplemente funciona. Creemos que la privacidad debería ser gratuita para todos.',
      },
    },
  },

  // Sección por qué
  why: {
    title: 'Por qué necesitas Protected Text',
    stats1:
      'Esta es la realidad: En 2024, **1.7 mil millones de personas** tuvieron sus datos personales comprometidos en violaciones de datos. Eso no es un error tipográfico. **1,700,000,000 personas**. A nivel mundial, las cuentas violadas aumentaron de 730 millones en 2023 a más de **5.5 mil millones en 2024**. Eso significa que aproximadamente 180 cuentas fueron comprometidas *cada segundo* el año pasado.',
    stats2:
      'Piensa en eso por un minuto. Mientras lees esta frase, docenas de personas acaban de ser hackeadas. Tus notas, tus ideas, tus pensamientos privados: están en el servidor de alguna empresa ahora mismo. Y si esa empresa es vulnerada (cuando, no si), tus cosas se convierten en las cosas de otra persona.',

    whatMakesDifferent: {
      heading: '¿Qué hace diferente a Protected Text?',
      paragraph1:
        'Protected Text es un **bloc de notas en línea gratuito con encriptación de extremo a extremo**. Pero esto es lo que lo hace diferente: Usamos **encriptación AES-256-GCM**—el mismo estándar que la NSA usa para proteger documentos gubernamentales Top Secret, la misma tecnología que Google Cloud usa por defecto, y la misma encriptación en la que confían los grandes bancos.',
      paragraph2:
        'Todo sucede en tu navegador. Antes de que tus notas toquen internet, se encriptan en algo ilegible. Guardamos esa basura ilegible. Incluso si alguien roba toda nuestra base de datos mañana, todo lo que obtienen son datos encriptados inútiles. Sin contraseña, sin desencriptación. Así de simple.',
    },

    howItWorks: {
      heading: 'Cómo funciona realmente Protected Text',
      paragraph1:
        'Eliges cualquier URL que quieras—digamos `protected-text.com/mis-ideas-secretas`. ¿Nadie la está usando? Es tuya. Creas una contraseña. Esa contraseña nunca sale de tu computadora. Nunca.',
      paragraph2:
        'Cuando escribes tus notas, tu navegador usa esa contraseña para codificar todo en código encriptado usando PBKDF2 (310,000 iteraciones, si te importan los detalles técnicos—eso es más que el estándar de la industria). Solo entonces la versión encriptada va a nuestros servidores. Literalmente no podemos leer lo que escribes, incluso si quisiéramos, incluso si el gobierno nos lo pidiera, incluso si los hackers entraran.',
    },

    realTalk: {
      heading: 'Hablando en serio: Los números no mienten',
      stat1:
        '**36 mil millones de registros de datos** expuestos en solo 4 meses (enero-abril 2024)',
      stat2: 'Promedio de **758,288 registros violados por día** en 2024',
      stat3:
        'Seis mega-violaciones en 2024, cada una expuso **más de 100 millones de registros**',
      stat4:
        'El mercado de encriptación está explotando: de **$16.7 mil millones en 2024 a $60.7 mil millones en 2033**',
      source:
        'Fuentes: Reporte de Violaciones de Datos 2024 de HIPAA Journal, Statista, Estadísticas de Seguridad 2024 de SecureFrame',
    },

    zeroKnowledge: {
      badge: 'Arquitectura de Conocimiento Cero = Seguridad sin Confianza',
      tagline:
        'No tienes que confiar en nosotros. No tienes que confiar en nadie. Las matemáticas te protegen, no las promesas.',
    },
  },

  // Sección de seguridad
  security: {
    title: '¿Por qué confiar en esto? (No solo me creas)',
    subtitle:
      'La seguridad es realmente bastante simple cuando no la complicas. Así es exactamente como lo hacemos:',

    items: {
      passwordNeverLeaves: {
        title: 'Tu contraseña literalmente nunca sale de tu dispositivo',
        description:
          'No cuando creas una cuenta (no hay cuenta). No cuando inicias sesión. Nunca. Se queda en tu navegador y hace todo el trabajo de encriptación ahí mismo en tu máquina. Nunca la vemos. Punto.',
      },
      clientSideEncryption: {
        title: 'Encriptación del lado del cliente = Tú tienes el control',
        description:
          'Toda la encriptación ocurre en tu navegador usando la Web Crypto API (integrada en navegadores modernos). Solo basura encriptada viaja por la red. ¿Alguien la intercepta? Genial, no obtienen nada.',
      },
      zeroTracking: {
        title: 'Cero rastreo, cero tonterías',
        description:
          'Sin cuentas de usuario. Sin cookies. Sin análisis. Sin píxeles de rastreo "anónimos". No sabemos quién eres, no queremos saber y no podemos saber. Ese es el diseño.',
      },
      openSource: {
        title: 'Código abierto (porque confía, pero verifica)',
        description:
          '¿No confías en mí? Inteligente. El código es abierto. Puedes auditarlo tú mismo, o conseguir a alguien técnico para hacerlo. Usamos algoritmos de encriptación estándar revisados por pares—ninguna tontería de criptografía personalizada que siempre falla.',
      },
      doubleLayerProtection: {
        title: 'Protección de doble capa',
        description:
          'Tu URL única es como un nombre de usuario—nadie puede encontrar tus notas sin ella. Tu contraseña es la clave de encriptación. Ambas son necesarias. Incluso si alguien adivina tu URL, sin tu contraseña, están atascados.',
      },
    },

    technical: {
      heading: 'Para los expertos técnicos',
      subtitle: 'Si te importan los detalles reales de implementación:',
      specs: {
        aes256: {
          title: 'AES-256-GCM',
          description:
            'Mismo estándar usado por la NSA para documentos Top Secret. Adoptado por NIST en 2001. Aún sin romper.',
        },
        pbkdf2: {
          title: 'PBKDF2 (310k iteraciones)',
          description:
            'OWASP recomienda 100k. Hacemos 310k para hacer los ataques de fuerza bruta exponencialmente más difíciles.',
        },
        uniqueSaltIV: {
          title: 'Salt e IV únicos por guardado',
          description:
            'Nueva aleatoriedad criptográfica cada vez. Sin reutilización, sin predictibilidad.',
        },
        webCrypto: {
          title: 'Web Crypto API',
          description:
            'Implementación nativa del navegador. Sin bibliotecas de terceros sospechosas.',
        },
      },
      verifyNote:
        '¿Quieres verificar? El código es de código abierto. Compruébalo tú mismo en GitHub.',
    },
  },

  // Protección contra conflictos
  conflictProtection: {
    title: 'Protección contra Conflictos',
    description1:
      '¿Usas la misma URL en tu laptop, teléfono y tablet al mismo tiempo? No hay problema. Detectamos cuando múltiples dispositivos están editando y evitamos que pierdas cambios. El guardado automático se ejecuta cada 2 segundos, y guardamos las últimas 10 versiones para que puedas retroceder si es necesario.',
    description2:
      'Si dos dispositivos guardan al mismo tiempo, te mostraremos ambas versiones y te dejaremos elegir cuál mantener. Sin pérdida silenciosa de datos. Nunca.',
    versionHistory: {
      title: 'Historial de Versiones',
      subtitle: 'Últimos 10 guardados disponibles',
    },
  },

  // Características
  features: {
    title: 'Características de Protected Text',
    subtitle:
      'Todo lo que necesitas. Nada que no necesites. Sin niveles premium.',
    list: [
      'Encriptación AES-256-GCM',
      'No requiere registro',
      'Guardado automático (cada 2 segundos)',
      'Historial de versiones (últimas 10)',
      'Vista previa de Markdown',
      'Temas oscuro y claro',
      'Atajos de teclado',
      'Búsqueda en nota (Ctrl+F)',
      'Importar desde archivos',
      'Cambiar contraseña en cualquier momento',
      'Eliminar notas permanentemente',
      'Exportar/respaldar encriptado',
      'Funciona en todos los dispositivos',
      'Funciona sin conexión',
      'Código de código abierto',
      'Sin anuncios, sin rastreo',
      'Soporte PWA (instalar como app)',
      'Detección de conflictos',
    ],
  },

  // Comenzando
  gettingStarted: {
    title: 'Comenzando con Protected Text',
    subtitle: 'Es ridículamente simple. Tres pasos. Eso es todo.',
    steps: {
      step1: {
        title: 'Elige una URL',
        description:
          'Escribe cualquier URL que quieras en el cuadro de arriba, como `protected-text.com/miproyecto`. Si nadie la está usando, es tuya. Primero en llegar, primero en ser servido.',
      },
      step2: {
        title: 'Establece una contraseña',
        description:
          'Elige una contraseña fuerte. Nunca la vemos. Nunca sale de tu navegador. Si la olvidas, tus notas se han ido para siempre. Escríbela en un lugar seguro.',
      },
      step3: {
        title: 'Empieza a escribir',
        description:
          'Eso es todo. Tus notas se guardan automáticamente cada 2 segundos. Vuelve más tarde desde cualquier dispositivo, misma URL, misma contraseña, y todo está ahí.',
      },
    },
  },

  // FAQ
  faq: {
    title: 'Preguntas Frecuentes',
    subtitle: 'Todo lo que necesitas saber sobre Protected Text',
    questions: {
      forgotPassword: {
        q: 'Olvidé mi contraseña. ¿Pueden recuperarla?',
        a: '**No.** Mira, esto apesta, pero también es el punto. Tu contraseña nunca sale de tu dispositivo. No la tenemos. No podemos tenerla. Esa es la seguridad de conocimiento cero. Si pudiéramos recuperar tu contraseña, eso significaría que podríamos leer tus notas, lo que derrota todo el propósito. Escríbela. Usa un administrador de contraseñas. Tatúatela en tu brazo. No me importa. Solo no la pierdas.',
      },
      actuallyFree: {
        q: '¿Protected Text es realmente gratis?',
        a: '**Sí, es gratis.** Sin anuncios. Sin píxeles de rastreo. Sin tonterías "freemium" donde paralizamos el producto hasta que pagues. La privacidad no debería ser un bien de lujo. Todo el punto de esto es dar acceso a notas seguras a todos. Si necesitamos cubrir costos eventualmente, podríamos agregar características opcionales para usuarios avanzados, pero ¿la encriptación central y las notas? Gratis. Para siempre.',
      },
      hackServers: {
        q: '¿Qué pasa si alguien hackea sus servidores?',
        a: '**No obtienen nada útil.** En serio. Todo lo que almacenamos son datos encriptados. Sin tu contraseña, es basura. Piénsalo así: Si alguien roba una caja fuerte, aún no pueden abrirla sin la combinación. Excepto que en este caso, la combinación (tu contraseña) nunca salió de tu bolsillo en primer lugar.',
      },
      teamCollaboration: {
        q: '¿Puedo usar Protected Text para colaboración en equipo?',
        a: 'Más o menos. Múltiples personas pueden usar la misma URL y contraseña. Todos con las credenciales tienen acceso completo. Pero no hay sistema de permisos, no hay gestión de usuarios, no hay registros de auditoría. Es deliberadamente simple. Si necesitas características empresariales, esto no es eso. Si solo necesitas un bloc de notas encriptado compartido, adelante.',
      },
      takeUrl: {
        q: '¿Puede alguien más tomar mi URL?',
        a: 'Si aún no has guardado nada, técnicamente sí. Pero una vez que guardas notas en una URL, esa URL queda bloqueada con tu contraseña. Incluso si alguien más intenta usar la misma URL, no pueden leer tus notas sin tu contraseña, y no pueden sobrescribirlas. El primero en guardar gana.',
      },
      governmentRequest: {
        q: '¿Qué pasa si el gobierno solicita mis datos?',
        a: '**Obtienen datos encriptados.** Eso es todo. No tenemos tu contraseña. No tenemos tu email. Ni siquiera sabemos quién eres. Incluso si una agencia gubernamental aparece con una orden judicial, todo lo que podemos darles es basura. No se puede desencriptar lo que no tienes la clave. Esto no es una postura política—es simplemente cómo funcionan las matemáticas.',
      },
      whyTrust: {
        q: '¿Por qué debería confiar en Protected Text?',
        a: '**No deberías confiar ciegamente en nadie.** El código es de código abierto—ve a leerlo. La encriptación es estándar (AES-256-GCM, PBKDF2)—ninguna tontería de criptografía personalizada. Estos algoritmos han sido probados en batalla durante décadas por criptógrafos reales, no por mí inventando cosas. Si encuentras una vulnerabilidad, repórtala. La arreglaremos. Así es como la seguridad realmente funciona—transparencia, no secreto.',
      },
      protectedTextPro: {
        q: '¿Qué es Protected Text Pro?',
        a: '**Lo estamos construyendo basándonos en tus comentarios.** Protected Text siempre será gratis, pero estamos explorando características Pro para usuarios avanzados—cosas como dominios personalizados, cargas de archivos más grandes, historial de versiones extendido y herramientas de gestión de equipos.',
        linkText:
          'Vota por características y ayuda a dar forma a la hoja de ruta →',
      },
    },
  },

  // Pie de página
  footer: {
    about: {
      description:
        'Notas encriptadas de conocimiento cero. Tu contraseña nunca sale de tu dispositivo. Gratis para siempre, sin rastreo, sin tonterías.',
      starOnGithub: 'Dar estrella en GitHub',
      openSourceOnGithub: 'Código abierto en GitHub',
    },
    security: {
      title: '¿Encontraste un problema de seguridad?',
      description:
        'Por favor, repórtalo responsablemente por email. Nos tomamos la seguridad en serio.',
    },
    contact: {
      email: 'hello@protected-text.com',
    },
    bottom: {
      builtWith: 'Hecho con',
      in2025: 'en 2025',
      license: 'Protected Text es de código abierto bajo Licencia MIT.',
      disclaimer: 'Sin garantía. Úsalo bajo tu propio riesgo.',
    },
  },
};

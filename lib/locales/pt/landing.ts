/**
 * Conteúdo da página inicial - hero, recursos, segurança, FAQ, rodapé
 */

export const landing = {
  // Seção hero
  hero: {
    badge: 'O bloco de notas mais seguro da internet',
    title: 'Protected Text: Suas Notas,',
    titleHighlight: 'Criptografadas. Conhecimento Zero.',
    subtitle:
      'Olha, isso é simples. Escolha qualquer URL como **protected-text.com/qualquercoisa**, crie uma senha e comece a digitar. Suas coisas são criptografadas no seu navegador antes mesmo de sair do seu dispositivo. Literalmente não podemos lê-las. Não porque somos pessoas legais (somos), mas porque é matematicamente impossível.',
  },

  // Formulário de criação de site
  createSiteForm: {
    label: 'Escolha uma URL privada',
    urlPrefix: 'protected-text.com/',
    urlPlaceholder: '[sua-url]',
    submitButton: 'Proteger minha nota',
    randomButton: 'Surpreenda-me',
  },

  // Destaques
  highlights: {
    heading: 'Por que Protected Text Funciona',
    items: {
      passwordNeverLeaves: {
        title: 'Sua senha nunca sai do seu dispositivo',
        description:
          'Criptografamos tudo no seu navegador antes de tocar a internet. Literalmente não podemos ler suas notas, mesmo que quiséssemos.',
      },
      noSignup: {
        title: 'Sem necessidade de cadastro',
        description:
          'Sem email. Sem conta. Sem cookies de rastreamento. Apenas escolha uma URL e comece a digitar. É só isso.',
      },
      freeForever: {
        title: 'Grátis para sempre',
        description:
          'Sem anúncios. Sem níveis premium. Sem enrolação. Simplesmente funciona. Acreditamos que privacidade deveria ser gratuita para todos.',
      },
    },
  },

  // Seção por quê
  why: {
    title: 'Por que Você Precisa do Protected Text',
    stats1:
      'Aqui está a realidade: Em 2024, **1,7 bilhão de pessoas** tiveram seus dados pessoais comprometidos em violações de dados. Isso não é um erro de digitação. **1.700.000.000 pessoas**. Globalmente, as contas violadas aumentaram de 730 milhões em 2023 para mais de **5,5 bilhões em 2024**. Isso significa que aproximadamente 180 contas foram comprometidas *a cada segundo* no ano passado.',
    stats2:
      'Pense nisso por um minuto. Enquanto você está lendo esta frase, dezenas de pessoas acabaram de ser hackeadas. Suas notas, suas ideias, seus pensamentos privados—estão no servidor de alguma empresa agora. E se essa empresa for violada (quando, não se), suas coisas se tornam coisas de outra pessoa.',

    whatMakesDifferent: {
      heading: 'O que torna o Protected Text diferente?',
      paragraph1:
        'Protected Text é um **bloco de notas online gratuito com criptografia de ponta a ponta**. Mas aqui está o que o torna diferente: Usamos **criptografia AES-256-GCM**—o mesmo padrão que a NSA usa para proteger documentos governamentais Top Secret, a mesma tecnologia que o Google Cloud usa por padrão, e a mesma criptografia em que os grandes bancos confiam.',
      paragraph2:
        'Tudo acontece no seu navegador. Antes que suas notas toquem a internet, elas são criptografadas em algo sem sentido. Nós armazenamos esse sem sentido. Mesmo se alguém roubar todo o nosso banco de dados amanhã, tudo o que eles conseguem são dados criptografados inúteis. Sem senha, sem descriptografia. É simples assim.',
    },

    howItWorks: {
      heading: 'Como o Protected Text Realmente Funciona',
      paragraph1:
        'Você escolhe qualquer URL que quiser—digamos `protected-text.com/minhas-ideias-secretas`. Ninguém está usando? É sua. Você cria uma senha. Essa senha nunca sai do seu computador. Nunca.',
      paragraph2:
        'Quando você digita suas notas, seu navegador usa essa senha para embaralhar tudo em código criptografado usando PBKDF2 (310.000 iterações, se você se importa com os detalhes técnicos—isso é mais que o padrão da indústria). Só então a versão criptografada vai para nossos servidores. Literalmente não podemos ler o que você escreve, mesmo se quiséssemos, mesmo se o governo nos pedisse, mesmo se hackers invadissem.',
    },

    realTalk: {
      heading: 'Falando Sério: Os Números Não Mentem',
      stat1: '**36 bilhões de registros de dados** expostos em apenas 4 meses (jan-abr 2024)',
      stat2: 'Média de **758.288 registros violados por dia** em 2024',
      stat3: 'Seis mega-violações em 2024, cada uma expôs **mais de 100 milhões de registros**',
      stat4: 'O mercado de criptografia está explodindo: de **US$ 16,7 bilhões em 2024 para US$ 60,7 bilhões até 2033**',
      source: 'Fontes: Relatório de Violação de Dados 2024 do HIPAA Journal, Statista, Estatísticas de Segurança 2024 da SecureFrame',
    },

    zeroKnowledge: {
      badge: 'Arquitetura de Conhecimento Zero = Segurança Sem Confiança',
      tagline: 'Você não precisa confiar em nós. Você não precisa confiar em ninguém. A matemática te protege, não promessas.',
    },
  },

  // Seção de segurança
  security: {
    title: 'Por que confiar nisso? (Não apenas acredite na minha palavra)',
    subtitle: 'A segurança é na verdade bem simples quando você não complica. Aqui está exatamente como fazemos:',

    items: {
      passwordNeverLeaves: {
        title: 'Sua senha literalmente nunca sai do seu dispositivo',
        description:
          'Não quando você cria uma conta (não há conta). Não quando você faz login. Nunca. Ela fica no seu navegador e faz todo o trabalho de criptografia bem ali na sua máquina. Nunca a vemos. Ponto.',
      },
      clientSideEncryption: {
        title: 'Criptografia do lado do cliente = Você tem o controle',
        description:
          'Toda a criptografia acontece no seu navegador usando a Web Crypto API (integrada aos navegadores modernos). Apenas lixo criptografado viaja pela rede. Alguém intercepta? Legal, não conseguiram nada.',
      },
      zeroTracking: {
        title: 'Zero rastreamento, zero enrolação',
        description:
          'Sem contas de usuário. Sem cookies. Sem análises. Sem pixels de rastreamento "anônimos". Não sabemos quem você é, não queremos saber, e não podemos saber. Esse é o design.',
      },
      openSource: {
        title: 'Código aberto (porque confie, mas verifique)',
        description:
          'Não confia em mim? Inteligente. O código é aberto. Você pode auditá-lo você mesmo, ou conseguir alguém técnico para fazer isso. Usamos algoritmos de criptografia padrão e revisados por pares—sem bobagem de criptografia personalizada que sempre falha.',
      },
      doubleLayerProtection: {
        title: 'Proteção de camada dupla',
        description:
          'Sua URL única é como um nome de usuário—ninguém pode encontrar suas notas sem ela. Sua senha é a chave de criptografia. Ambas são necessárias. Mesmo se alguém adivinhar sua URL, sem sua senha, estão presos.',
      },
    },

    technical: {
      heading: 'Para os Técnicos',
      subtitle: 'Se você se importa com os detalhes reais de implementação:',
      specs: {
        aes256: {
          title: 'AES-256-GCM',
          description: 'Mesmo padrão usado pela NSA para documentos Top Secret. Adotado pelo NIST em 2001. Ainda não quebrado.',
        },
        pbkdf2: {
          title: 'PBKDF2 (310k iterações)',
          description: 'OWASP recomenda 100k. Fazemos 310k para tornar os ataques de força bruta exponencialmente mais difíceis.',
        },
        uniqueSaltIV: {
          title: 'Salt e IV únicos por salvamento',
          description: 'Nova aleatoriedade criptográfica toda vez. Sem reutilização, sem previsibilidade.',
        },
        webCrypto: {
          title: 'Web Crypto API',
          description: 'Implementação nativa do navegador. Sem bibliotecas suspeitas de terceiros.',
        },
      },
      verifyNote: 'Quer verificar? O código é de código aberto. Confira você mesmo no GitHub.',
    },
  },

  // Proteção contra conflitos
  conflictProtection: {
    title: 'Proteção Contra Conflitos',
    description1:
      'Usa a mesma URL no seu laptop, telefone e tablet ao mesmo tempo? Sem problema. Detectamos quando vários dispositivos estão editando e evitamos que você perca alterações. O salvamento automático é executado a cada 2 segundos, e mantemos as últimas 10 versões para que você possa reverter se necessário.',
    description2:
      'Se dois dispositivos salvarem ao mesmo tempo, mostraremos ambas as versões e deixaremos você escolher qual manter. Sem perda silenciosa de dados. Nunca.',
    versionHistory: {
      title: 'Histórico de Versões',
      subtitle: 'Últimos 10 salvamentos disponíveis',
    },
  },

  // Recursos
  features: {
    title: 'Recursos do Protected Text',
    subtitle: 'Tudo o que você precisa. Nada que você não precise. Sem níveis premium.',
    list: [
      'Criptografia AES-256-GCM',
      'Sem necessidade de cadastro',
      'Salvamento automático (a cada 2 segundos)',
      'Histórico de versões (últimas 10)',
      'Visualização Markdown',
      'Temas escuro e claro',
      'Atalhos de teclado',
      'Busca na nota (Ctrl+F)',
      'Importar de arquivos',
      'Alterar senha a qualquer momento',
      'Excluir notas permanentemente',
      'Exportar/backup criptografado',
      'Funciona em todos os dispositivos',
      'Funciona offline',
      'Código de código aberto',
      'Sem anúncios, sem rastreamento',
      'Suporte PWA (instalar como app)',
      'Detecção de conflitos',
    ],
  },

  // Começando
  gettingStarted: {
    title: 'Começando com o Protected Text',
    subtitle: 'É ridiculamente simples. Três passos. Só isso.',
    steps: {
      step1: {
        title: 'Escolha uma URL',
        description:
          'Digite qualquer URL que quiser na caixa acima, como `protected-text.com/meuprojeto`. Se ninguém estiver usando, é sua. Primeiro a chegar, primeiro a ser servido.',
      },
      step2: {
        title: 'Defina uma senha',
        description:
          'Escolha uma senha forte. Nunca a vemos. Ela nunca sai do seu navegador. Se você esquecer, suas notas se foram para sempre. Anote em um lugar seguro.',
      },
      step3: {
        title: 'Comece a digitar',
        description:
          'É só isso. Suas notas são salvas automaticamente a cada 2 segundos. Volte mais tarde de qualquer dispositivo, mesma URL, mesma senha, e tudo está lá.',
      },
    },
  },

  // FAQ
  faq: {
    title: 'Perguntas Frequentes',
    subtitle: 'Tudo o que você precisa saber sobre o Protected Text',
    questions: {
      forgotPassword: {
        q: 'Esqueci minha senha. Vocês podem recuperá-la?',
        a: '**Não.** Olha, isso é péssimo, mas também é o ponto. Sua senha nunca sai do seu dispositivo. Não a temos. Não podemos tê-la. Essa é a segurança de conhecimento zero. Se pudéssemos recuperar sua senha, isso significaria que poderíamos ler suas notas, o que derrota todo o propósito. Anote. Use um gerenciador de senhas. Tatue no seu braço. Não me importo. Apenas não perca.',
      },
      actuallyFree: {
        q: 'O Protected Text é realmente grátis?',
        a: '**Sim, é grátis.** Sem anúncios. Sem pixels de rastreamento. Sem enrolação "freemium" onde prejudicamos o produto até você pagar. Privacidade não deveria ser um bem de luxo. O ponto inteiro disso é dar a todos acesso a notas seguras. Se precisarmos cobrir custos eventualmente, podemos adicionar recursos opcionais para usuários avançados, mas a criptografia central e as notas? Grátis. Para sempre.',
      },
      hackServers: {
        q: 'O que acontece se alguém hackear seus servidores?',
        a: '**Eles não conseguem nada útil.** Sério. Tudo o que armazenamos são dados criptografados. Sem sua senha, é lixo. Pense assim: Se alguém rouba um cofre, ainda não pode abri-lo sem a combinação. Exceto que neste caso, a combinação (sua senha) nunca saiu do seu bolso em primeiro lugar.',
      },
      teamCollaboration: {
        q: 'Posso usar o Protected Text para colaboração em equipe?',
        a: 'Mais ou menos. Várias pessoas podem usar a mesma URL e senha. Todos com as credenciais têm acesso completo. Mas não há sistema de permissões, sem gerenciamento de usuários, sem registros de auditoria. É deliberadamente simples. Se você precisa de recursos empresariais, isso não é isso. Se você só precisa de um bloco de notas criptografado compartilhado, vá em frente.',
      },
      takeUrl: {
        q: 'Alguém mais pode pegar minha URL?',
        a: 'Se você ainda não salvou nada, tecnicamente sim. Mas uma vez que você salva notas em uma URL, essa URL é bloqueada para sua senha. Mesmo se outra pessoa tentar usar a mesma URL, ela não pode ler suas notas sem sua senha, e não pode sobrescrevê-las. Primeiro a salvar ganha.',
      },
      governmentRequest: {
        q: 'E se o governo solicitar meus dados?',
        a: '**Eles recebem dados criptografados.** Só isso. Não temos sua senha. Não temos seu email. Nem sabemos quem você é. Mesmo se uma agência governamental aparecer com um mandado, tudo o que podemos dar a eles é lixo. Não se pode descriptografar o que você não tem a chave. Isso não é uma posição política—é apenas como a matemática funciona.',
      },
      whyTrust: {
        q: 'Por que devo confiar no Protected Text?',
        a: '**Você não deveria confiar cegamente em ninguém.** O código é de código aberto—vá lê-lo. A criptografia é padrão (AES-256-GCM, PBKDF2)—sem bobagem de criptografia personalizada. Esses algoritmos foram testados em batalha por décadas por criptógrafos reais, não por mim inventando coisas. Se você encontrar uma vulnerabilidade, relate. Vamos corrigir. É assim que a segurança realmente funciona—transparência, não sigilo.',
      },
      protectedTextPro: {
        q: 'O que é o Protected Text Pro?',
        a: '**Estamos construindo com base no seu feedback.** O Protected Text sempre será grátis, mas estamos explorando recursos Pro para usuários avançados—coisas como domínios personalizados, uploads de arquivos maiores, histórico de versões estendido e ferramentas de gerenciamento de equipe.',
        linkText: 'Vote em recursos e ajude a moldar o roteiro →',
      },
    },
  },

  // Rodapé
  footer: {
    about: {
      description: 'Notas criptografadas de conhecimento zero. Sua senha nunca sai do seu dispositivo. Grátis para sempre, sem rastreamento, sem enrolação.',
      starOnGithub: 'Dar estrela no GitHub',
      openSourceOnGithub: 'Código Aberto no GitHub',
    },
    security: {
      title: 'Encontrou um problema de segurança?',
      description: 'Por favor, relate-o de forma responsável por email. Levamos a segurança a sério.',
    },
    contact: {
      email: 'hello@protected-text.com',
    },
    bottom: {
      builtWith: 'Construído com',
      in2025: 'em 2025',
      license: 'Protected Text é de código aberto sob Licença MIT.',
      disclaimer: 'Sem garantia. Use por sua própria conta e risco.',
    },
  },
};

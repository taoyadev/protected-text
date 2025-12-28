const SITE_REGEX = /^[a-z0-9][a-z0-9-]{2,31}$/;

export function normalizeSiteName(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function isSiteNameValid(name: string): boolean {
  return SITE_REGEX.test(name);
}

export function generateSiteNameHint(): string {
  const nouns = [
    'rocket',
    'mars',
    'starship',
    'tesla',
    'cyber',
    'neural',
    'quantum',
    'photon',
    'electron',
    'neuron',
    'fusion',
    'phoenix',
    'dragon',
    'falcon',
    'raptor',
    'titan',
    'nexus',
    'vortex',
    'matrix',
    'prism',
    'zenith',
    'odyssey',
    'apex',
    'cipher',
    'enigma',
    'cosmos',
    'nebula',
    'galaxy',
  ];

  const adjectives = [
    'epic',
    'mega',
    'ultra',
    'hyper',
    'turbo',
    'alpha',
    'omega',
    'prime',
    'max',
    'super',
    'quantum',
    'atomic',
    'cosmic',
    'electric',
    'neon',
    'blazing',
    'radical',
    'savage',
    'legendary',
    'infinite',
    'stealth',
    'shadow',
    'crimson',
    'azure',
    'obsidian',
    'titanium',
    'diamond',
  ];

  const word = `${adjectives[Math.floor(Math.random() * adjectives.length)]}-${
    nouns[Math.floor(Math.random() * nouns.length)]
  }`;
  return word.slice(0, 32);
}

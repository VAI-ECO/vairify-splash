export const ASSETS = {
  logo: {
    dark: '/logo/va-fl-01.png',
    favicon: '/icons/va-fa-01/icon-64.png',
  },
  favicons: {
    chainpass: '/logo/cp-ic-03.png',
    vairify: '/logo/va-ic-04.png',
    vairifyLight: '/logo/va-ic-02.png',
    premiumBadge: '/logo/va-ic-05.png',
    goldenRoses: '/logo/va-ic-06.png',
  },
  badges: {
    chainpass: '/assets/badge-chainpass.svg',
    proton: '/assets/Proton Mail.svg',
    supabase: '/assets/Supabase.svg',
    azure: '/assets/Microsoft Azure.svg',
    swiss: '/assets/Swiss Made.svg',
    twilio: '/assets/Twilio.svg',
    textnow: '/assets/Text Now.svg',
    soc2: '/assets/Soc Compliant .svg',
  },
} as const;

export const TRUST_BADGES = [
  { key: 'chainpass', name: 'ChainPass V.A.I.', src: ASSETS.badges.chainpass },
  { key: 'proton', name: 'Proton', src: ASSETS.badges.proton },
  { key: 'supabase', name: 'Supabase', src: ASSETS.badges.supabase },
  { key: 'azure', name: 'Microsoft', src: ASSETS.badges.azure },
  { key: 'swiss', name: 'Swiss Made', src: ASSETS.badges.swiss },
  { key: 'twilio', name: 'Twilio', src: ASSETS.badges.twilio },
  { key: 'textnow', name: 'TextNow', src: ASSETS.badges.textnow },
  { key: 'soc2', name: 'SOC 2', src: ASSETS.badges.soc2 },
];

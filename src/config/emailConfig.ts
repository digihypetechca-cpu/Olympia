export const COMPANY_INFO = {
  name: 'OLYMPIA ELECTRIC LTD.',
  shortName: 'OLYMPIA ELECTRIC',
  contactPerson: 'Kevin Haynes',
  contactRole: 'Vice President',
  email: 'kevin@olympiaelectric.ca',
  phone: '(902) 894-7007',
  phoneHref: 'tel:9028947007',
  altPhone: '(902) 626-7989',
  altPhoneHref: 'tel:9026267989',
  location: 'Charlottetown, Prince Edward Island, Canada',
  shortLocation: 'Charlottetown, PEI, Canada',
  counties: ['Queens County', 'Prince County', 'Kings County'],
  communities: [
    'Charlottetown',
    'Summerside',
    'Stratford',
    'Cornwall',
    'Montague',
    'Souris',
    'Surrounding PEI communities',
  ],
  socialLinks: [
    {
      platform: 'Facebook',
      handle: '@olympiaelectricltd',
      url: 'https://www.facebook.com/olympiaelectricltd',
    },
    {
      platform: 'Instagram',
      handle: '@olympiaelectricltd',
      url: 'https://www.instagram.com/olympiaelectricltd',
    },
    {
      platform: 'LinkedIn',
      handle: '@olympiaelectricltd',
      url: 'https://www.linkedin.com/company/olympiaelectricltd',
    },
  ],
} as const;

export type ServiceTypeOption =
  | 'Residential Electrical'
  | 'Commercial Electrical'
  | 'Industrial Electrical'
  | 'Electrical Repairs'
  | 'Lighting Installation'
  | 'Electrical Upgrades'
  | 'Other';

export const SERVICE_TYPE_OPTIONS: ServiceTypeOption[] = [
  'Residential Electrical',
  'Commercial Electrical',
  'Industrial Electrical',
  'Electrical Repairs',
  'Lighting Installation',
  'Electrical Upgrades',
  'Other',
];

/**
 * EmailJS Public Configuration
 *
 * You can either:
 * 1. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY
 *    in your .env file (or GitHub Repository Secrets for GitHub Actions), OR
 * 2. Paste your EmailJS Service ID, Template ID, and Public Key directly into the
 *    fallback strings below before committing/deploying.
 *
 * Note: EmailJS Public Keys are designed for client-side use and are safe in frontend code.
 * Never store SMTP passwords or private API secrets in frontend files.
 */
export const EMAILJS_CONFIG = {
  serviceId: (import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined)?.trim() || '',
  templateId: (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined)?.trim() || '',
  publicKey: (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined)?.trim() || '',
};

export function isEmailJSConfigured(): boolean {
  const {serviceId, templateId, publicKey} = EMAILJS_CONFIG;
  return Boolean(
    serviceId &&
      templateId &&
      publicKey &&
      !serviceId.startsWith('YOUR_') &&
      !templateId.startsWith('YOUR_') &&
      !publicKey.startsWith('YOUR_'),
  );
}

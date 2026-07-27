export interface PhoneCountry {
  iso: string;
  name: string;
  dialCode: string;
}

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { iso: 'AE', name: 'United Arab Emirates', dialCode: '+971' },
  { iso: 'SA', name: 'Saudi Arabia', dialCode: '+966' },
  { iso: 'QA', name: 'Qatar', dialCode: '+974' },
  { iso: 'KW', name: 'Kuwait', dialCode: '+965' },
  { iso: 'OM', name: 'Oman', dialCode: '+968' },
  { iso: 'BH', name: 'Bahrain', dialCode: '+973' },
  { iso: 'JO', name: 'Jordan', dialCode: '+962' },
  { iso: 'IQ', name: 'Iraq', dialCode: '+964' },
  { iso: 'IR', name: 'Iran', dialCode: '+98' },
  { iso: 'IL', name: 'Israel', dialCode: '+972' },
  { iso: 'LB', name: 'Lebanon', dialCode: '+961' },
  { iso: 'PS', name: 'Palestine', dialCode: '+970' },
  { iso: 'SY', name: 'Syria', dialCode: '+963' },
  { iso: 'YE', name: 'Yemen', dialCode: '+967' },
  { iso: 'TR', name: 'Türkiye', dialCode: '+90' },
  { iso: 'EG', name: 'Egypt', dialCode: '+20' },
  { iso: 'DZ', name: 'Algeria', dialCode: '+213' },
  { iso: 'MA', name: 'Morocco', dialCode: '+212' },
  { iso: 'TN', name: 'Tunisia', dialCode: '+216' },
  { iso: 'ZA', name: 'South Africa', dialCode: '+27' },
  { iso: 'NG', name: 'Nigeria', dialCode: '+234' },
  { iso: 'KE', name: 'Kenya', dialCode: '+254' },
  { iso: 'ET', name: 'Ethiopia', dialCode: '+251' },
  { iso: 'GH', name: 'Ghana', dialCode: '+233' },
  { iso: 'TZ', name: 'Tanzania', dialCode: '+255' },
  { iso: 'CN', name: 'China', dialCode: '+86' },
  { iso: 'IN', name: 'India', dialCode: '+91' },
  { iso: 'PK', name: 'Pakistan', dialCode: '+92' },
  { iso: 'BD', name: 'Bangladesh', dialCode: '+880' },
  { iso: 'ID', name: 'Indonesia', dialCode: '+62' },
  { iso: 'MY', name: 'Malaysia', dialCode: '+60' },
  { iso: 'SG', name: 'Singapore', dialCode: '+65' },
  { iso: 'TH', name: 'Thailand', dialCode: '+66' },
  { iso: 'VN', name: 'Vietnam', dialCode: '+84' },
  { iso: 'PH', name: 'Philippines', dialCode: '+63' },
  { iso: 'JP', name: 'Japan', dialCode: '+81' },
  { iso: 'KR', name: 'South Korea', dialCode: '+82' },
  { iso: 'KZ', name: 'Kazakhstan', dialCode: '+7' },
  { iso: 'UZ', name: 'Uzbekistan', dialCode: '+998' },
  { iso: 'AZ', name: 'Azerbaijan', dialCode: '+994' },
  { iso: 'GE', name: 'Georgia', dialCode: '+995' },
  { iso: 'US', name: 'United States', dialCode: '+1' },
  { iso: 'CA', name: 'Canada', dialCode: '+1' },
  { iso: 'MX', name: 'Mexico', dialCode: '+52' },
  { iso: 'BR', name: 'Brazil', dialCode: '+55' },
  { iso: 'AR', name: 'Argentina', dialCode: '+54' },
  { iso: 'CO', name: 'Colombia', dialCode: '+57' },
  { iso: 'CL', name: 'Chile', dialCode: '+56' },
  { iso: 'PE', name: 'Peru', dialCode: '+51' },
  { iso: 'EC', name: 'Ecuador', dialCode: '+593' },
  { iso: 'VE', name: 'Venezuela', dialCode: '+58' },
  { iso: 'BO', name: 'Bolivia', dialCode: '+591' },
  { iso: 'PY', name: 'Paraguay', dialCode: '+595' },
  { iso: 'UY', name: 'Uruguay', dialCode: '+598' },
  { iso: 'GB', name: 'United Kingdom', dialCode: '+44' },
  { iso: 'IE', name: 'Ireland', dialCode: '+353' },
  { iso: 'DE', name: 'Germany', dialCode: '+49' },
  { iso: 'FR', name: 'France', dialCode: '+33' },
  { iso: 'ES', name: 'Spain', dialCode: '+34' },
  { iso: 'IT', name: 'Italy', dialCode: '+39' },
  { iso: 'PT', name: 'Portugal', dialCode: '+351' },
  { iso: 'NL', name: 'Netherlands', dialCode: '+31' },
  { iso: 'BE', name: 'Belgium', dialCode: '+32' },
  { iso: 'CH', name: 'Switzerland', dialCode: '+41' },
  { iso: 'AT', name: 'Austria', dialCode: '+43' },
  { iso: 'PL', name: 'Poland', dialCode: '+48' },
  { iso: 'CZ', name: 'Czechia', dialCode: '+420' },
  { iso: 'RO', name: 'Romania', dialCode: '+40' },
  { iso: 'GR', name: 'Greece', dialCode: '+30' },
  { iso: 'SE', name: 'Sweden', dialCode: '+46' },
  { iso: 'NO', name: 'Norway', dialCode: '+47' },
  { iso: 'DK', name: 'Denmark', dialCode: '+45' },
  { iso: 'FI', name: 'Finland', dialCode: '+358' },
  { iso: 'UA', name: 'Ukraine', dialCode: '+380' },
  { iso: 'RU', name: 'Russia', dialCode: '+7' },
  { iso: 'BY', name: 'Belarus', dialCode: '+375' },
  { iso: 'AU', name: 'Australia', dialCode: '+61' },
  { iso: 'NZ', name: 'New Zealand', dialCode: '+64' },
];

const PHONE_COUNTRY_BY_ISO = new Map(PHONE_COUNTRIES.map((country) => [country.iso, country]));
const INTERNATIONAL_LEADING_ZERO_COUNTRIES = new Set(['IT']);

export function getPhoneCountry(iso: string | null | undefined) {
  return PHONE_COUNTRY_BY_ISO.get(String(iso || '').trim().toUpperCase());
}

export function getPhoneCountryByDialCode(dialCode: string | null | undefined) {
  const digits = String(dialCode || '').replace(/\D/g, '');
  return PHONE_COUNTRIES.find((country) => country.dialCode.replace(/\D/g, '') === digits);
}

export function normalizeInternationalPhone(
  rawPhone: string,
  countryIso?: string,
  rawDialCode?: string
) {
  const trimmedPhone = String(rawPhone || '').trim();
  if (!trimmedPhone) return '';

  const explicitInternationalPhone = trimmedPhone.replace(/^00/, '+');
  const phoneDigits = explicitInternationalPhone.replace(/\D/g, '');
  if (!phoneDigits) return '';

  if (explicitInternationalPhone.startsWith('+')) {
    return `+${phoneDigits}`;
  }

  const normalizedIso = String(countryIso || '').trim().toUpperCase();
  const dialCode = String(rawDialCode || getPhoneCountry(normalizedIso)?.dialCode || '')
    .replace(/\D/g, '');

  if (!dialCode) {
    return `+${phoneDigits}`;
  }

  // Accept a complete international number even when the visitor omitted only the plus sign.
  if (phoneDigits.startsWith(dialCode) && phoneDigits.length > dialCode.length + 5) {
    return `+${phoneDigits}`;
  }

  const nationalNumber = INTERNATIONAL_LEADING_ZERO_COUNTRIES.has(normalizedIso)
    ? phoneDigits
    : phoneDigits.replace(/^0+/, '');

  return `+${dialCode}${nationalNumber}`;
}

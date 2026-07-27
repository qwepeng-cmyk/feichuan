import { NextResponse } from 'next/server';
import { getPhoneCountry } from '@/lib/phoneCountryCodes';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const countryIso = (
    request.headers.get('cf-ipcountry')
    || request.headers.get('x-vercel-ip-country')
    || ''
  ).trim().toUpperCase();
  const country = getPhoneCountry(countryIso);

  return NextResponse.json(
    country
      ? { countryIso: country.iso, dialCode: country.dialCode }
      : { countryIso: null, dialCode: null },
    { headers: { 'Cache-Control': 'private, no-store, no-cache, must-revalidate' } }
  );
}

import { redirect } from 'next/navigation';
import { type Locale } from '@/i18n/config';
import { localePath } from '@/lib/localePath';

const pageHandle = 'low-altitude-airspace-monitoring';

export default function LowAltitudeProductsRedirect({ params }: { params: { locale: Locale } }) {
  redirect(localePath(params.locale, `/solutions/${pageHandle}`));
}

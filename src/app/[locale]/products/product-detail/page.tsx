import { redirect } from 'next/navigation';
import { Locale } from '@/i18n/config';
import { localePath } from '@/lib/localePath';

const PRODUCT_HANDLE = 'fc-yjtx-01-emergency-communication-drone';

export default function LegacyProductDetailPage({ params }: { params: { locale: Locale } }) {
  redirect(localePath(params.locale, `/products/${PRODUCT_HANDLE}`));
}

import type { Metadata } from 'next';
import LocaleLayout from '@/app/[locale]/layout';
import { SITE_URL } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default function DirectRussianSolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LocaleLayout params={{ locale: 'ru' }}>{children}</LocaleLayout>;
}

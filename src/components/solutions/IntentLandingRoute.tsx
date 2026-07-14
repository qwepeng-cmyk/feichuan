import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import type { IntentLandingConfig } from '@/lib/intentLandingPages';
import { breadcrumbSchema, pageUrl } from '@/lib/structuredData';
import IntentLandingPage from './IntentLandingPage';

export default async function IntentLandingRoute({
  config,
  locale,
}: {
  config: IntentLandingConfig;
  locale: Locale;
}) {
  if (locale !== 'en') notFound();

  const dict = await getDictionary(locale);
  const url = pageUrl(locale, `/solutions/${config.handle}`);
  const breadcrumbs = [
    { name: dict.nav.home || 'Home', url: pageUrl(locale, '/') },
    { name: dict.nav.solutions || 'Solutions', url: pageUrl(locale, '/solutions') },
    { name: config.h1, url },
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: config.h1,
        description: config.purpose,
        serviceType: config.eyebrow.toLowerCase(),
        provider: {
          '@type': 'Organization',
          name: 'N-TET',
          url: pageUrl(locale, '/'),
        },
        areaServed: 'Global',
        url,
        mainEntityOfPage: url,
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: config.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      breadcrumbSchema(breadcrumbs),
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <IntentLandingPage config={config} locale={locale} dict={dict} />
    </>
  );
}

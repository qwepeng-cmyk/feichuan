import { i18n, type Locale } from "@/i18n/config";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/mobile/MobileStickyBar";
import DesktopFloatingContact from "@/components/contact/DesktopFloatingContact";
import DeferredContactTools from "@/components/contact/DeferredContactTools";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { getDictionary } from "@/i18n/getDictionary";
import { notFound } from "next/navigation";
import Script from "next/script";
import JsonLd from "@/components/seo/JsonLd";
import { siteGraphSchema } from "@/lib/structuredData";
import { getAllProducts } from "@/lib/products";
import { getVisibleProductCategoryIds } from "@/lib/productCategoryVisibility";
import { SITE_URL } from "@/config/site";

function isValidLocale(locale: string): locale is Locale {
  return i18n.locales.includes(locale as Locale);
}

function cleanTrackingId(value: string) {
  return value.replace(/[^A-Z0-9-]/gi, '');
}

const fallbackTracking = {
  gaMeasurementId: 'G-ZS6XC2TFCG',
  gaEnabled: true,
  gtmContainerId: 'GTM-PJN9QQWN',
  gtmEnabled: true,
};
const googleAdsTagId = 'AW-18157207807';

async function loadTrackingSettings() {
  try {
    const { getTrackingSettings } = await import("@/lib/siteSettings");
    return getTrackingSettings();
  } catch (error) {
    console.warn('Using fallback tracking settings:', error);
    return fallbackTracking;
  }
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const { locale } = params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const homeTitle = dict.home.hero.title.replace(/<br\s*\/?\s*>/gi, ' ');
  const homeDescription = dict.home.hero.subtitle;

  return {
    title: `${homeTitle} | N-TET`,
    description: homeDescription,
    metadataBase: new URL(SITE_URL),
    verification: {
      yandex: '3525b0a915ebe37e',
    },
    icons: {
      icon: [
        { url: '/favicon.ico?v=20260630-ntet-logo', sizes: 'any' },
        { url: '/icon.png?v=20260630-ntet-logo', type: 'image/png', sizes: '512x512' },
      ],
      shortcut: '/favicon.ico?v=20260630-ntet-logo',
      apple: '/apple-touch-icon.png?v=20260630-ntet-logo',
    },
    alternates: {
      canonical: '/',
      languages: {
        'ru': '/',
        'x-default': '/',
      },
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const locale = params.locale;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const visibleProductCategoryIds = getVisibleProductCategoryIds(await getAllProducts(locale));
  const tracking = await loadTrackingSettings();
  const gaMeasurementId = tracking?.gaEnabled ? cleanTrackingId(tracking.gaMeasurementId) : '';
  const gtmContainerId = tracking?.gtmEnabled ? cleanTrackingId(tracking.gtmContainerId) : '';
  const yandexMetrikaId = locale === 'ru' ? 111375688 : null;

  return (
    <html lang="ru" dir="ltr" data-locale="ru" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <NextTopLoader
          color="#315ba4"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #315ba4,0 0 5px #315ba4"
        />
        {gtmContainerId && (
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmContainerId}');`,
            }}
          />
        )}

        {gaMeasurementId && (
          <>
            <Script
              id="google-tag"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}');
gtag('config', '${googleAdsTagId}');`,
              }}
            />
          </>
        )}
        {yandexMetrikaId && (
          <Script
            id="yandex-metrika"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${yandexMetrikaId}', 'ym');

ym(${yandexMetrikaId}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`,
            }}
          />
        )}
        {gtmContainerId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmContainerId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {yandexMetrikaId && (
          <noscript>
            <div>
              <img
                src={`https://mc.yandex.ru/watch/${yandexMetrikaId}`}
                style={{ position: 'absolute', left: '-9999px' }}
                alt=""
              />
            </div>
          </noscript>
        )}

        <Header
          locale={locale}
          dict={dict}
          visibleProductCategoryIds={visibleProductCategoryIds}
          showLaserPreview={process.env.LOCAL_LASER_PREVIEW === '1'}
        />
        <JsonLd data={siteGraphSchema(locale)} />
        {children}
        <Footer locale={locale} dict={dict} visibleProductCategoryIds={visibleProductCategoryIds} />
        <DesktopFloatingContact locale={locale} />
        <DeferredContactTools />

        {/* MOBILE STICKY BAR */}
        <div className="mobile_only">
            <MobileStickyBar locale={locale} dict={dict} />
        </div>
      </body>
    </html>
  );
}

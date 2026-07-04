import { i18n, type Locale } from "@/i18n/config";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/mobile/MobileStickyBar";
import DesktopFloatingContact from "@/components/contact/DesktopFloatingContact";
import FloatingMessageBox from "@/components/contact/FloatingMessageBox";
import ZoosnetBusinessChat from "@/components/contact/ZoosnetBusinessChat";
import LocaleDocumentState from "@/components/LocaleDocumentState";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { getDictionary } from "@/i18n/getDictionary";
import { notFound } from "next/navigation";
import Script from "next/script";
import JsonLd from "@/components/seo/JsonLd";
import { siteGraphSchema } from "@/lib/structuredData";
import { getAllProducts } from "@/lib/products";
import { getVisibleProductCategoryIds } from "@/lib/productCategoryVisibility";

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

  const baseUrl = 'https://n-tet.com';
  const dict = await getDictionary(locale);
  const homeTitle = dict.home.hero.title.replace(/<br\s*\/?\s*>/gi, ' ');
  const homeDescription = dict.home.hero.subtitle;

  return {
    title: `${homeTitle} | N-TET`,
    description: homeDescription,
    metadataBase: new URL(baseUrl),
    icons: {
      icon: [
        { url: '/favicon.ico?v=20260630-ntet-logo', sizes: 'any' },
        { url: '/icon.png?v=20260630-ntet-logo', type: 'image/png', sizes: '512x512' },
      ],
      shortcut: '/favicon.ico?v=20260630-ntet-logo',
      apple: '/apple-touch-icon.png?v=20260630-ntet-logo',
    },
    alternates: {
      canonical: locale === i18n.defaultLocale ? '/' : `/${locale}`,
      languages: {
        'en': '/',
        'ru': '/ru',
        'es': '/es',
        'ar': '/ar',
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
  const isRtl = locale === 'ar';
  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const visibleProductCategoryIds = getVisibleProductCategoryIds(await getAllProducts(locale));
  const tracking = await loadTrackingSettings();
  const gaMeasurementId = tracking?.gaEnabled ? cleanTrackingId(tracking.gaMeasurementId) : '';
  const gtmContainerId = tracking?.gtmEnabled ? cleanTrackingId(tracking.gtmContainerId) : '';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} data-locale={locale} suppressHydrationWarning>
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
        <LocaleDocumentState locale={locale} />

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
gtag('config', '${gaMeasurementId}');`,
              }}
            />
          </>
        )}
        <ZoosnetBusinessChat />

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

        <Header locale={locale} dict={dict} visibleProductCategoryIds={visibleProductCategoryIds} />
        <JsonLd data={siteGraphSchema(locale)} />
        {children}
        <Footer locale={locale} dict={dict} visibleProductCategoryIds={visibleProductCategoryIds} />
        <DesktopFloatingContact />
        <FloatingMessageBox />

        {/* MOBILE STICKY BAR */}
        <div className="mobile_only">
            <MobileStickyBar locale={locale} dict={dict} />
        </div>
      </body>
    </html>
  );
}

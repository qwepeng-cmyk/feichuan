import { i18n, type Locale } from "@/i18n/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/mobile/MobileStickyBar";
import { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import { notFound } from "next/navigation";
import Script from "next/script";
import JsonLd from "@/components/seo/JsonLd";
import { siteGraphSchema } from "@/lib/structuredData";

function isValidLocale(locale: string): locale is Locale {
  return i18n.locales.includes(locale as Locale);
}

function cleanTrackingId(value: string) {
  return value.replace(/[^A-Z0-9-]/gi, '');
}

const localeHomeMetadata: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'N-TET - Industrial UAV Systems & Low-Altitude Monitoring',
    description: 'Industrial UAV platforms, airspace monitoring equipment, event records, and compliant response workflows for infrastructure operators.',
  },
  ru: {
    title: 'N-TET - Промышленные БПЛА и мониторинг низковысотного пространства',
    description: 'Промышленные платформы БПЛА, оборудование мониторинга воздушного пространства, журналы событий и регламентированные рабочие процессы для инфраструктурных операторов.',
  },
  es: {
    title: 'N-TET - Sistemas UAV industriales y monitoreo de baja altitud',
    description: 'Plataformas UAV industriales, equipos de monitoreo del espacio aéreo, registros de eventos y flujos de respuesta para operadores de infraestructura.',
  },
};

const fallbackTracking = {
  gaMeasurementId: 'G-ZS6XC2TFCG',
  gaEnabled: true,
  gtmContainerId: 'GTM-PJN9QQWN',
  gtmEnabled: true,
};

const tawkPropertyId = '6a1e6979734ebd1c2f45a821';
const tawkWidgetId = '1jq3co0p8';
const shouldLoadTawk = process.env.NODE_ENV === 'production';

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
  const metadata = localeHomeMetadata[locale] || localeHomeMetadata.en;

  return {
    title: metadata.title,
    description: metadata.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: locale === i18n.defaultLocale ? '/' : `/${locale}`,
      languages: {
        'en': '/',
        'ru': '/ru',
        'es': '/es',
        'x-default': '/',
      },
    },
  };
}



export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

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
  const tracking = locale === i18n.defaultLocale ? await loadTrackingSettings() : null;
  const gaMeasurementId = tracking?.gaEnabled ? cleanTrackingId(tracking.gaMeasurementId) : '';
  const gtmContainerId = tracking?.gtmEnabled ? cleanTrackingId(tracking.gtmContainerId) : '';

  return (
    <>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.lang=${JSON.stringify(locale)};`,
          }}
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
gtag('config', '${gaMeasurementId}');`,
              }}
            />
          </>
        )}

        {shouldLoadTawk && (
          <Script
            id="tawk-to"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/${tawkPropertyId}/${tawkWidgetId}';
s1.charset='UTF-8';
s0.parentNode.insertBefore(s1,s0);
})();`,
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

        <Header locale={locale} dict={dict} />
        <JsonLd data={siteGraphSchema(locale)} />
        {children}
        <Footer locale={locale} dict={dict} />

        {/* MOBILE STICKY BAR */}
        <div className="mobile_only">
            <MobileStickyBar locale={locale} dict={dict} />
        </div>
    </>
  );
}

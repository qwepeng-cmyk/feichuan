import { i18n, type Locale } from "@/i18n/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/mobile/MobileStickyBar";
import { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getTrackingSettings } from "@/lib/siteSettings";

function isValidLocale(locale: string): locale is Locale {
  return i18n.locales.includes(locale as Locale);
}

function cleanTrackingId(value: string) {
  return value.replace(/[^A-Z0-9-]/gi, '');
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const { locale } = params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const baseUrl = 'https://n-tet.com';
  
  return {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: locale === i18n.defaultLocale ? '/' : `/${locale}`,
      languages: {
        'en': '/',
        'ru': '/ru',
        'x-default': '/', // 默认语言设为英文
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
  const tracking = locale === i18n.defaultLocale ? getTrackingSettings() : null;
  const gaMeasurementId = tracking?.gaEnabled ? cleanTrackingId(tracking.gaMeasurementId) : '';
  const gtmContainerId = tracking?.gtmEnabled ? cleanTrackingId(tracking.gtmContainerId) : '';

  return (
    <>
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
        {children}
        <Footer locale={locale} dict={dict} />

        {/* MOBILE STICKY BAR */}
        <div className="mobile_only">
            <MobileStickyBar locale={locale} dict={dict} />
        </div>

        {/* STICKY INQUIRY (CRISP STYLE) */}
        <a href="#inquiry" className="pc_only crisp-inquiry-trigger">
            <div className="crisp-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <span className="crisp-label">{dict.products.getQuotation}</span>
        </a>
    </>
  );
}

import { i18n, type Locale } from "@/i18n/config";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/mobile/MobileStickyBar";
import DesktopFloatingContact from "@/components/contact/DesktopFloatingContact";
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

const shouldLoadZoosnet = process.env.NEXT_PUBLIC_DISABLE_ZOOSNET !== 'true';

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

        {shouldLoadZoosnet && (
          <Script
            id="zoosnet-business-chat"
            src="https://drt.zoosnet.net/JS/LsJS.aspx?siteid=DRT78957152&float=1&lng=en"
            strategy="afterInteractive"
          />
        )}

        {shouldLoadZoosnet && (
          <Script
            id="zoosnet-mobile-image-fix"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(){
var pcSrc='https://drt.zoosnet.net/site/78957152/onlineimgsrc_en.png';
var mobileSrc='https://drt.zoosnet.net/site/78957152/mobileonlineimgsrc_en.png';
var mobileWidth='68px';
var mediaQuery=window.matchMedia('(max-width: 991px)');
function patchZoosnetImage(){
  var isMobile=mediaQuery.matches;
  var root=document.getElementById('LRdiv0');
  if(root){
    if(isMobile){
      root.style.width='0';
      root.style.height='0';
      root.style.maxWidth='100vw';
      root.style.overflow='visible';
    }else{
      root.style.width='';
      root.style.height='';
      root.style.maxWidth='';
      root.style.overflow='';
    }
  }
  var images=document.querySelectorAll('#LRfloater0 img,#LRdiv0 img');
  images.forEach(function(img){
    if(!/onlineimgsrc_en\\.png|mobileonlineimgsrc_en\\.png/.test(img.src)) return;
    img.src=isMobile?mobileSrc:pcSrc;
    if(isMobile){
      img.style.width=mobileWidth;
      img.style.height='auto';
      img.style.maxWidth=mobileWidth;
      img.style.display='block';
      var floater=img.closest('#LRfloater0');
      if(floater){
        floater.style.width=mobileWidth;
        floater.style.height='auto';
        floater.style.maxWidth=mobileWidth;
        floater.style.overflow='visible';
      }
    }else{
      img.style.width='';
      img.style.height='';
      img.style.maxWidth='';
      img.style.display='';
      var desktopFloater=img.closest('#LRfloater0');
      if(desktopFloater){
        desktopFloater.style.width='';
        desktopFloater.style.height='';
        desktopFloater.style.maxWidth='';
        desktopFloater.style.overflow='';
      }
    }
  });
  if(isMobile){
    document.documentElement.style.overflowX='hidden';
    document.body.style.overflowX='hidden';
  }
}
patchZoosnetImage();
window.setInterval(patchZoosnetImage,500);
if(mediaQuery.addEventListener){
  mediaQuery.addEventListener('change',patchZoosnetImage);
}else if(mediaQuery.addListener){
  mediaQuery.addListener(patchZoosnetImage);
}
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

        <Header locale={locale} dict={dict} visibleProductCategoryIds={visibleProductCategoryIds} />
        <JsonLd data={siteGraphSchema(locale)} />
        {children}
        <Footer locale={locale} dict={dict} visibleProductCategoryIds={visibleProductCategoryIds} />
        <DesktopFloatingContact />

        {/* MOBILE STICKY BAR */}
        <div className="mobile_only">
            <MobileStickyBar locale={locale} dict={dict} />
        </div>
      </body>
    </html>
  );
}

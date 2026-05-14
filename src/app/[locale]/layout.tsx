import { i18n, type Locale } from "@/i18n/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/mobile/MobileStickyBar";
import { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const { locale } = params;
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
  const dict = await getDictionary(locale);

  return (
    <>
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

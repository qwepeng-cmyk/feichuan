import { Roboto } from "next/font/google";
import { i18n, type Locale } from "@/i18n/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/mobile/MobileStickyBar";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const { locale } = params;
  const baseUrl = 'https://n-tetbj.com'; // 请确认你的正式域名
  
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

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

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

  return (
    <html lang={locale}>
      <body className={`${roboto.className} antialiased`}>
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />

        {/* MOBILE STICKY BAR */}
        <div className="mobile_only">
            <MobileStickyBar />
        </div>

        {/* STICKY BAR (PC) */}
        <div className="pc_only sticky-inquiry">
            <div className="sticky-item orange">
                <svg style={{ width: '24px', height: '24px', fill: '#fff' }} viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>Get Price</span>
            </div>
        </div>
      </body>
    </html>
  );
}

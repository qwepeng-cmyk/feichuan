"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/mobile/MobileStickyBar";
import NotFoundExperience from "./[locale]/not-found-experience";
import enDict from "@/dictionaries/en.json";
import ruDict from "@/dictionaries/ru.json";
import { usePathname } from "next/navigation";

function getLocale(pathname: string) {
  return pathname === "/ru" || pathname.startsWith("/ru/") ? "ru" : "en";
}

export default function RootNotFound() {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const dict = locale === "ru" ? ruDict : enDict;

  return (
    <>
      <Header locale={locale} dict={dict} />
      <NotFoundExperience />
      <Footer locale={locale} dict={dict} />

      <div className="mobile_only">
        <MobileStickyBar locale={locale} dict={dict} />
      </div>

      <a href="#inquiry" className="pc_only crisp-inquiry-trigger">
        <div className="crisp-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="crisp-label">{dict.products.getQuotation}</span>
      </a>
    </>
  );
}

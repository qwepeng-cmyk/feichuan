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
    </>
  );
}

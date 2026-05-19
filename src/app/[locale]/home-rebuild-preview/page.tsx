import type { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import HomeRebuildPreview from "@/components/home-preview/HomeRebuildPreview";

export const metadata: Metadata = {
  title: "Home Rebuild Preview - N-TET",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function HomeRebuildPreviewPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);

  return <HomeRebuildPreview locale={params.locale} dict={dict} />;
}

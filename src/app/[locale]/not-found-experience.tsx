"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath } from "@/lib/localePath";
import styles from "./not-found.module.css";

const solutionLinks = {
  en: [
    { title: "Power Line UAV Intelligent Inspection", href: "/solutions/power-line-uav-intelligent-inspection-solution" },
    { title: "Smart Substation Unattended Inspection", href: "/solutions/smart-substation-unattended-uav-inspection-solution" },
    { title: "Water Conservancy & River-Lake Monitoring", href: "/solutions/water-conservancy-river-lake-uav-monitoring-solution" },
    { title: "UAV Maritime Patrol", href: "/solutions/uav-maritime-patrol" },
    { title: "Urban High-Rise Firefighting & Rescue", href: "/solutions/urban-high-rise-firefighting-emergency-uav-solution" },
    { title: "Disaster-Site Search, Rescue & Reconnaissance", href: "/solutions/disaster-site-search-rescue-reconnaissance-uav-solution" },
    { title: "Post-Disaster Emergency Communication Support", href: "/solutions/post-disaster-emergency-communication-support-uav-solution" },
    { title: "Night Emergency Lighting Support", href: "/solutions/night-emergency-lighting-support-uav-solution" },
    { title: "Chemical Plant Protection", href: "/solutions/chemical-plant-protection" },
    { title: "Oil Production Base Protection", href: "/solutions/oil-production-base-protection" },
    { title: "Hydroelectric Dam Protection", href: "/solutions/hydroelectric-dam-protection" },
    { title: "Judicial Sector Security", href: "/solutions/judicial-sector-security" },
    { title: "Sports Event Security", href: "/solutions/sports-event-security" },
    { title: "Airport Security Protection", href: "/solutions/airport-security-protection" },
  ],
  ru: [
    { title: "Интеллектуальная инспекция ЛЭП с БПЛА", href: "/solutions/power-line-uav-intelligent-inspection-solution" },
    { title: "Безлюдная инспекция умной подстанции", href: "/solutions/smart-substation-unattended-uav-inspection-solution" },
    { title: "Мониторинг водного хозяйства, рек и озер", href: "/solutions/water-conservancy-river-lake-uav-monitoring-solution" },
    { title: "Морское патрулирование с БПЛА", href: "/solutions/uav-maritime-patrol" },
    { title: "Тушение и спасение в высотной городской застройке", href: "/solutions/urban-high-rise-firefighting-emergency-uav-solution" },
    { title: "Поиск, спасение и разведка в зоне ЧС", href: "/solutions/disaster-site-search-rescue-reconnaissance-uav-solution" },
    { title: "Поддержка аварийной связи после ЧС", href: "/solutions/post-disaster-emergency-communication-support-uav-solution" },
    { title: "Поддержка ночного аварийного освещения", href: "/solutions/night-emergency-lighting-support-uav-solution" },
    { title: "Защита химического завода", href: "/solutions/chemical-plant-protection" },
    { title: "Защита нефтедобывающей базы", href: "/solutions/oil-production-base-protection" },
    { title: "Защита гидроэлектрической плотины", href: "/solutions/hydroelectric-dam-protection" },
    { title: "Безопасность судебного сектора", href: "/solutions/judicial-sector-security" },
    { title: "Безопасность спортивных мероприятий", href: "/solutions/sports-event-security" },
    { title: "Защита безопасности аэропорта", href: "/solutions/airport-security-protection" },
  ],
};

const copy = {
  en: {
    label: "Page not found",
    title: "404",
    description: "The page you are looking for does not exist. You can continue from one of our security solutions below.",
    home: "Back to Home",
    allSolutions: "All Solutions",
    recommended: "Recommended Solutions",
  },
  ru: {
    label: "Страница не найдена",
    title: "404",
    description: "Страница, которую вы ищете, не существует. Вы можете перейти к одному из решений безопасности ниже.",
    home: "На главную",
    allSolutions: "Все решения",
    recommended: "Рекомендуемые решения",
  },
};

function getLocale(pathname: string) {
  return pathname === "/ru" || pathname.startsWith("/ru/") ? "ru" : "en";
}

export default function NotFoundExperience() {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const text = copy[locale];
  const links = solutionLinks[locale];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.label}>{text.label}</p>
          <h1>{text.title}</h1>
          <p className={styles.description}>{text.description}</p>
          <div className={styles.actions}>
            <Link href={localePath(locale)}>{text.home}</Link>
            <Link href={localePath(locale, "/solutions")}>{text.allSolutions}</Link>
          </div>
        </div>
      </section>

      <section className={styles.solutions}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span>{text.recommended}</span>
            <Link href={localePath(locale, "/solutions")}>{text.allSolutions}</Link>
          </div>
          <div className={styles.grid}>
            {links.map((item) => (
              <Link key={item.href} href={localePath(locale, item.href)} className={styles.solutionCard}>
                <strong>{item.title}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

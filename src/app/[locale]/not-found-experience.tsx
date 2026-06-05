"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath } from "@/lib/localePath";
import { localeFromPathname } from "@/lib/localization";
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
    { title: "Автономная инспекция умных подстанций", href: "/solutions/smart-substation-unattended-uav-inspection-solution" },
    { title: "Мониторинг водного хозяйства, рек и озер", href: "/solutions/water-conservancy-river-lake-uav-monitoring-solution" },
    { title: "Морское и прибрежное патрулирование с БПЛА", href: "/solutions/uav-maritime-patrol" },
    { title: "Поддержка при высотных пожарах", href: "/solutions/urban-high-rise-firefighting-emergency-uav-solution" },
    { title: "Поиск, спасение и разведка в зоне ЧС", href: "/solutions/disaster-site-search-rescue-reconnaissance-uav-solution" },
    { title: "Аварийная связь после ЧС", href: "/solutions/post-disaster-emergency-communication-support-uav-solution" },
    { title: "Ночное аварийное освещение", href: "/solutions/night-emergency-lighting-support-uav-solution" },
    { title: "Мониторинг химического объекта", href: "/solutions/chemical-plant-protection" },
    { title: "Мониторинг нефтедобывающей базы", href: "/solutions/oil-production-base-protection" },
    { title: "Мониторинг плотины ГЭС", href: "/solutions/hydroelectric-dam-protection" },
    { title: "Безопасность судебных объектов", href: "/solutions/judicial-sector-security" },
    { title: "Безопасность спортивных мероприятий", href: "/solutions/sports-event-security" },
    { title: "Безопасность и мониторинг аэропортов", href: "/solutions/airport-security-protection" },
  ],
  es: [
    { title: "Inspección inteligente de líneas eléctricas con UAV", href: "/solutions/power-line-uav-intelligent-inspection-solution" },
    { title: "Inspección autónoma de subestaciones inteligentes", href: "/solutions/smart-substation-unattended-uav-inspection-solution" },
    { title: "Monitoreo hídrico de ríos y lagos con UAV", href: "/solutions/water-conservancy-river-lake-uav-monitoring-solution" },
    { title: "Patrullaje marítimo y costero con UAV", href: "/solutions/uav-maritime-patrol" },
    { title: "Apoyo UAV para incendios en edificios altos", href: "/solutions/urban-high-rise-firefighting-emergency-uav-solution" },
    { title: "Búsqueda, rescate y reconocimiento en desastres", href: "/solutions/disaster-site-search-rescue-reconnaissance-uav-solution" },
    { title: "Comunicación de emergencia posterior a desastres", href: "/solutions/post-disaster-emergency-communication-support-uav-solution" },
    { title: "Iluminación nocturna de emergencia con UAV", href: "/solutions/night-emergency-lighting-support-uav-solution" },
    { title: "Monitoreo de planta química", href: "/solutions/chemical-plant-protection" },
    { title: "Monitoreo de base de producción petrolera", href: "/solutions/oil-production-base-protection" },
    { title: "Monitoreo de presa hidroeléctrica", href: "/solutions/hydroelectric-dam-protection" },
    { title: "Seguridad para instalaciones judiciales", href: "/solutions/judicial-sector-security" },
    { title: "Seguridad para eventos deportivos", href: "/solutions/sports-event-security" },
    { title: "Seguridad y monitoreo de aeropuertos", href: "/solutions/airport-security-protection" },
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
    description: "Страница, которую вы ищете, не существует. Вы можете перейти к одной из рекомендуемых решений ниже.",
    home: "На главную",
    allSolutions: "Все решения",
    recommended: "Рекомендуемые решения",
  },
  es: {
    label: "Página no encontrada",
    title: "404",
    description: "La página que buscas no existe. Puedes continuar desde una de nuestras soluciones recomendadas.",
    home: "Volver al inicio",
    allSolutions: "Todas las soluciones",
    recommended: "Soluciones recomendadas",
  },
};

export default function NotFoundExperience() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const text = copy[locale] || copy.en;
  const links = solutionLinks[locale] || solutionLinks.en;

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

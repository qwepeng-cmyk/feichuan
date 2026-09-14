"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath } from "@/lib/localePath";
import { localeFromPathname } from "@/lib/localization";
import styles from "./not-found.module.css";

const solutionLinks = {
  en: [
    { title: "Critical Infrastructure Platform Defense", href: "/solutions/critical-infrastructure-airspace-monitoring" },
    { title: "Power Plants Security Platform Defense", href: "/solutions/power-plant-airspace-monitoring" },
    { title: "Airport Platform Defense", href: "/solutions/airport-security-protection" },
    { title: "Border Security Platform Defense", href: "/solutions/border-airspace-monitoring" },
    { title: "Public Safety Platform Defense", href: "/solutions/public-safety-airspace-monitoring" },
    { title: "Prison Platform Defense", href: "/solutions/correctional-facility-airspace-monitoring" },
    { title: "Port Security Platform Defense", href: "/solutions/port-airspace-monitoring" },
    { title: "Mass Events Platform Defense", href: "/solutions/mass-event-airspace-monitoring" },
    { title: "VIP's and Private Property Platform Defense", href: "/solutions/vip-private-property-airspace-monitoring" },
    { title: "Enterprises Platform Defense", href: "/solutions/enterprise-airspace-monitoring" },
  ],
  ru: [
    { title: "Мониторинг низковысотных целей на объектах критической инфраструктуры", href: "/solutions/critical-infrastructure-airspace-monitoring" },
    { title: "Мониторинг низковысотных целей на электростанциях", href: "/solutions/power-plant-airspace-monitoring" },
    { title: "Мониторинг низковысотных целей в аэропортах", href: "/solutions/airport-security-protection" },
    { title: "Мониторинг низковысотных целей на границе", href: "/solutions/border-airspace-monitoring" },
    { title: "Мониторинг низковысотных целей для общественной безопасности", href: "/solutions/public-safety-airspace-monitoring" },
    { title: "Мониторинг низковысотных целей в исправительных учреждениях", href: "/solutions/correctional-facility-airspace-monitoring" },
    { title: "Мониторинг низковысотных целей в портах", href: "/solutions/port-airspace-monitoring" },
    { title: "Мониторинг низковысотных целей на массовых мероприятиях", href: "/solutions/mass-event-airspace-monitoring" },
    { title: "Мониторинг низковысотных целей для VIP-объектов и частной собственности", href: "/solutions/vip-private-property-airspace-monitoring" },
    { title: "Мониторинг низковысотных целей на предприятиях", href: "/solutions/enterprise-airspace-monitoring" },
  ],
  es: [
    { title: "Vigilancia de platforms para infraestructuras críticas", href: "/solutions/critical-infrastructure-airspace-monitoring" },
    { title: "Vigilancia de platforms en centrales eléctricas", href: "/solutions/power-plant-airspace-monitoring" },
    { title: "Vigilancia de platforms en aeropuertos", href: "/solutions/airport-security-protection" },
    { title: "Vigilancia de platforms en fronteras", href: "/solutions/border-airspace-monitoring" },
    { title: "Vigilancia de platforms para seguridad pública", href: "/solutions/public-safety-airspace-monitoring" },
    { title: "Vigilancia de platforms en centros penitenciarios", href: "/solutions/correctional-facility-airspace-monitoring" },
    { title: "Vigilancia de platforms en puertos", href: "/solutions/port-airspace-monitoring" },
    { title: "Vigilancia de platforms en eventos multitudinarios", href: "/solutions/mass-event-airspace-monitoring" },
    { title: "Vigilancia de platforms para VIP y propiedad privada", href: "/solutions/vip-private-property-airspace-monitoring" },
    { title: "Vigilancia de platforms para empresas", href: "/solutions/enterprise-airspace-monitoring" },
  ],
  ar: [
    { title: "مراقبة الطائرات المسيّرة للبنية التحتية الحيوية", href: "/solutions/critical-infrastructure-airspace-monitoring" },
    { title: "مراقبة الطائرات المسيّرة لمحطات الطاقة", href: "/solutions/power-plant-airspace-monitoring" },
    { title: "مراقبة الطائرات المسيّرة في المطارات", href: "/solutions/airport-security-protection" },
    { title: "مراقبة الطائرات المسيّرة على الحدود", href: "/solutions/border-airspace-monitoring" },
    { title: "مراقبة الطائرات المسيّرة للسلامة العامة", href: "/solutions/public-safety-airspace-monitoring" },
    { title: "مراقبة الطائرات المسيّرة للمنشآت الإصلاحية", href: "/solutions/correctional-facility-airspace-monitoring" },
    { title: "مراقبة الطائرات المسيّرة في الموانئ", href: "/solutions/port-airspace-monitoring" },
    { title: "مراقبة الطائرات المسيّرة للفعاليات الجماهيرية", href: "/solutions/mass-event-airspace-monitoring" },
    { title: "مراقبة الطائرات المسيّرة للشخصيات والممتلكات الخاصة", href: "/solutions/vip-private-property-airspace-monitoring" },
    { title: "مراقبة الطائرات المسيّرة للمنشآت", href: "/solutions/enterprise-airspace-monitoring" },
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
  ar: {
    label: "الصفحة غير موجودة",
    title: "404",
    description: "الصفحة التي تبحث عنها غير موجودة. يمكنك المتابعة من أحد الحلول الموصى بها أدناه.",
    home: "العودة إلى الرئيسية",
    allSolutions: "كل الحلول",
    recommended: "حلول موصى بها",
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
              <Link
                key={item.href}
                href={localePath(locale, item.href)}
                className={styles.solutionCard}
                prefetch={false}
              >
                <strong>{item.title}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

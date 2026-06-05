"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Building2,
  ChevronRight,
  Clock3,
  Crosshair,
  MapPin,
  Plane,
  Radar,
  RadioTower,
  ShieldCheck,
} from "lucide-react";
import NEWS_DATA from "../../../public/media/news_data.json";
import { homeCases, products, solutions } from "@/constants/homeData";
import { localePath } from "@/lib/localePath";
import { localizedField } from "@/lib/localization";
import styles from "./HomeRebuildPreview.module.css";

type PreviewDict = Record<string, any>;

const solutionIconMap = [Plane, Building2, ShieldCheck, RadioTower];

const metrics = [
  { value: "06", label: "Product Domains" },
  { value: "04", label: "Scenario Lines" },
  { value: "24h", label: "Response Window" },
  { value: "360", label: "Perimeter View" },
];

export default function HomeRebuildPreview({
  locale,
  dict,
}: {
  locale: string;
  dict: PreviewDict;
}) {
  const [activeProduct, setActiveProduct] = useState(0);
  const latestNews = useMemo(() => NEWS_DATA.slice(0, 3), []);
  const product = products[activeProduct];
  const localizedProduct = {
    top: localizedField(product, "top", locale),
    main: localizedField(product, "main", locale),
    desc: localizedField(product, "desc", locale),
  };

  const solutionNames: Record<string, string> = {
    "01_BorderPatrol": dict.solutions.categories.border,
    "02_InfrastructureProtection": dict.solutions.categories.infrastructure,
    "03_KeyAreaSecurity": dict.solutions.categories.security,
    "04_EmergencyRescue": dict.solutions.categories.emergency,
  };

  return (
    <main className={styles.preview}>
      <section className={styles.hero}>
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/index_banner_bg_4.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroShade} />
        <div className={styles.heroGrid} />

        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <span className={styles.signalDot} />
              N-TET Industrial UAV Systems
            </div>
            <h1
              className={styles.heroTitle}
              dangerouslySetInnerHTML={{ __html: dict.home.hero.title }}
            />
            <p className={styles.heroText}>{dict.home.hero.subtitle}</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href={localePath(locale, "/solutions")}>
                {dict.home.hero.button}
                <ArrowUpRight size={18} />
              </Link>
              <Link className={styles.ghostButton} href={localePath(locale, "/products")}>
                {dict.home.sections.products}
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>

          <div className={styles.commandPanel} aria-label="Mission snapshot">
            <div className={styles.panelHeader}>
              <span>Live Capability Map</span>
              <Activity size={18} />
            </div>
            <div className={styles.radarFace}>
              <span className={styles.radarSweep} />
              <span className={styles.ringOne} />
              <span className={styles.ringTwo} />
              <Crosshair className={styles.crosshair} size={34} />
            </div>
            <div className={styles.panelRows}>
              <div>
                <strong>Airspace Monitoring</strong>
                <span>Situational awareness, records, response support</span>
              </div>
              <div>
                <strong>Critical Sites</strong>
                <span>Utilities, airports, borders, public venues</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.metricStrip} aria-label="N-TET metrics">
        {metrics.map((metric) => (
          <div className={styles.metric} key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </section>

      <section className={styles.productLab}>
        <div className={styles.sectionIntro}>
          <span className={styles.sectionKicker}>Mission Equipment</span>
          <h2>{dict.home.sections.products}</h2>
          <p>
            A tighter preview flow: category selection, product proof, and
            conversion actions stay in one scanning zone.
          </p>
        </div>

        <div className={styles.productStage}>
          <div className={styles.productTabs}>
            {products.map((item, index) => {
              const title = localizedField(item, "top", locale);
              return (
                <button
                  type="button"
                  className={`${styles.productTab} ${
                    index === activeProduct ? styles.activeTab : ""
                  }`}
                  key={item.handle}
                  onClick={() => setActiveProduct(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {title}
                </button>
              );
            })}
          </div>

          <div className={styles.productVisual}>
            <Image
              key={product.img}
              src={product.img}
              alt={localizedProduct.main}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
              className={styles.productImage}
              style={{
                transform: `scale(${product.scale}) translateY(${product.offsetY}px)`,
              }}
            />
          </div>

          <div className={styles.productInfo}>
            <span className={styles.productFamily}>{localizedProduct.top}</span>
            <h3>{localizedProduct.main}</h3>
            <p>{localizedProduct.desc}</p>
            <div className={styles.productActions}>
              <Link href={localePath(locale, `/products/${product.handle}`)}>
                {dict.products.viewSpecs}
                <ArrowUpRight size={17} />
              </Link>
              <Link href={localePath(locale, "/contact")}>{dict.products.getQuote}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.solutionsBand}>
        <div className={styles.sectionIntro}>
          <span className={styles.sectionKicker}>Scenario Architecture</span>
          <h2>{dict.home.sections.solutions}</h2>
        </div>
        <div className={styles.solutionGrid}>
          {solutions.map((solution, index) => {
            const Icon = solutionIconMap[index] || ShieldCheck;
            const name = solutionNames[solution.id] || solution.title;
            return (
              <Link
                className={styles.solutionCard}
                href={localePath(locale, solution.link)}
                key={solution.id}
              >
                <Image
                  src={solution.img}
                  alt={name}
                  fill
                  sizes="(max-width: 900px) 100vw, 25vw"
                />
                <div className={styles.solutionOverlay} />
                <div className={styles.solutionContent}>
                  <Icon size={24} />
                  <h3>{name}</h3>
                  <span>
                    {dict.solutions.viewDetails}
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className={styles.caseDeck}>
        <div className={styles.caseHeader}>
          <div>
            <span className={styles.sectionKicker}>Deployment Evidence</span>
            <h2>{dict.home.sections.cases}</h2>
          </div>
          <Link href={localePath(locale, "/cases")} className={styles.textLink}>
            {dict.home.buttons.viewAllCases}
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className={styles.caseGrid}>
          {homeCases.slice(0, 6).map((item, index) => {
            const title = localizedField(item, "title", locale);
            return (
              <Link
                className={styles.caseCard}
                href={localePath(locale, `/cases/${item.handle}`)}
                key={item.handle}
              >
                <Image src={item.img} alt={title} fill sizes="(max-width: 900px) 100vw, 33vw" />
                <div>
                  <span>{dict.home.labels.successCase}</span>
                  <h3>{title}</h3>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className={styles.aboutBand}>
        <Image src="/index/about_bg.webp" alt={dict.home.sections.about} fill sizes="100vw" />
        <div className={styles.aboutContent}>
          <span className={styles.sectionKicker}>Operational Ecosystem</span>
          <h2>{dict.home.sections.about}</h2>
          <p>{dict.home.about.content}</p>
          <div className={styles.aboutFacts}>
            <span>
              <Radar size={20} />
              Multi-sensor fusion
            </span>
            <span>
              <MapPin size={20} />
              Global deployment support
            </span>
            <span>
              <Clock3 size={20} />
              Rapid project response
            </span>
          </div>
        </div>
      </section>

      <section className={styles.newsSection}>
        <div className={styles.caseHeader}>
          <div>
            <span className={styles.sectionKicker}>Intelligence Feed</span>
            <h2>{dict.home.sections.news}</h2>
          </div>
          <Link href={localePath(locale, "/media")} className={styles.textLink}>
            {dict.home.buttons.viewAllNews}
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className={styles.newsGrid}>
          {latestNews.map((item) => {
            const newsItem = item as typeof item & { title_en?: string };
            const title =
              localizedField(newsItem, "title", locale);
            return (
              <Link className={styles.newsCard} href={localePath(locale, `/media/${item.id}`)} key={item.id}>
                <Image src={item.image} alt={title} fill sizes="(max-width: 900px) 100vw, 33vw" />
                <div>
                  <span>{item.date}</span>
                  <h3>{title}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

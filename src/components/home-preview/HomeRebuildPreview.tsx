"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import WhatsAppLeadButton from "@/components/contact/WhatsAppLeadButton";
import { localePath } from "@/lib/localePath";
import { localizeCuasTree } from "@/lib/cuasLocaleCopy";
import styles from "./HomeRebuildPreview.module.css";

type PreviewDict = Record<string, any>;

const productCategories = [
  {
    number: "01",
    title: "Portable C-UAS Devices",
    navLabel: "Portable C-UAS",
    icon: "/home-preview/icons/portable-cuas.svg?v=2",
    subtitle: "Rapid deployment",
    image: "/products/02-drone-detection/portable-rf-detection-case.webp",
    description:
      "Hand-carried RF detection and counter-drone equipment for patrol teams, temporary sites and event security.",
    capabilities: ["RF detection and identification", "Portable jamming options"],
    href: "/products/portable-rf-detection-case",
    products: [
      {
        model: "PL280P",
        name: "Portable RF Detection Case",
        image: "/products/02-drone-detection/portable-rf-detection-case.webp",
        href: "/products/portable-rf-detection-case",
        scale: 2.05,
      },
      {
        model: "RF FIELD",
        name: "Portable RF Field Unit",
        image: "/products/rf-systems/portable-rf-field-unit.webp",
        href: "/products",
        scale: 1.65,
      },
      {
        model: "RF FIELD PRO",
        name: "Portable RF Analysis Unit",
        image: "/products/rf-systems/portable-integrated-rf-analysis-pro.webp",
        href: "/products",
        scale: 2.05,
      },
      {
        model: "NAV FIELD",
        name: "Portable Navigation Signal Analyzer",
        image: "/products/rf-systems/portable-navigation-signal-analysis-unit-alt.webp",
        href: "/products",
        scale: 2.2,
      },
    ],
  },
  {
    number: "02",
    title: "Fixed-Site C-UAS Systems",
    navLabel: "Fixed-Site C-UAS",
    icon: "/home-preview/icons/fixed-site-cuas.svg?v=2",
    subtitle: "24/7 site protection",
    image: "/products/02-drone-detection/stationary-rf-detection-system.webp",
    description:
      "Fixed RF, radar and EO equipment for continuous detection, tracking, jamming and spoofing workflows.",
    capabilities: ["Unattended monitoring", "Multi-sensor integration"],
    href: "/products/stationary-rf-detection-system",
    products: [
      {
        model: "RF GUARD",
        name: "Stationary RF Detection System",
        image: "/products/02-drone-detection/stationary-rf-detection-system.webp",
        href: "/products/stationary-rf-detection-system",
        scale: 1.8,
      },
      {
        model: "KU RADAR",
        name: "Low-Altitude Detection Radar",
        image: "/products/02-drone-detection/low-altitude-detection-radar.webp",
        href: "/products/low-altitude-detection-radar-ku-band",
        scale: 1.65,
      },
      {
        model: "EO TRACK",
        name: "Electro-Optical Tracking System",
        image: "/products/02-drone-detection/electro-optical-tracking-system.webp",
        href: "/products/composite-electro-optical-tracking-system",
        scale: 1.65,
      },
      {
        model: "RF ARRAY",
        name: "Stationary RF Analysis Unit",
        image: "/products/rf-systems/stationary-rf-analysis-unit.webp",
        href: "/products",
        scale: 1.9,
      },
    ],
  },
  {
    number: "03",
    title: "Vehicle-Mounted C-UAS Systems",
    navLabel: "Vehicle-Mounted C-UAS",
    icon: "/home-preview/icons/vehicle-cuas.svg?v=2",
    subtitle: "Mobile C-UAS operations",
    image: "/solutions/low-altitude-airspace-monitoring/vehicle-mobile-cuas.webp",
    description:
      "Vehicle-integrated counter-drone equipment for fast deployment, mobile patrol and changing protection zones.",
    capabilities: ["Vehicle-ready configuration", "Detection and countermeasure options"],
    href: "/solutions/low-altitude-airspace-monitoring",
    products: [
      {
        model: "MOBILE C-UAS",
        name: "Vehicle-Mounted Counter-Drone System",
        image: "/solutions/low-altitude-airspace-monitoring/vehicle-mobile-cuas.webp",
        href: "/solutions/low-altitude-airspace-monitoring",
        cover: true,
        scale: 1,
      },
      {
        model: "VEHICLE RF",
        name: "Vehicle-Mounted RF Analysis Unit",
        image: "/products/rf-systems/vehicle-mounted-rf-analysis-unit.webp",
        href: "/products",
        scale: 1.75,
      },
      {
        model: "MOBILE NAV",
        name: "Vehicle Navigation Signal Analysis System",
        image: "/products/rf-systems/navigation-signal-analysis-system-alt.webp",
        href: "/products",
        scale: 1.7,
      },
    ],
  },
  {
    number: "04",
    title: "C-UAS Control Platform",
    navLabel: "Control Platform",
    icon: "/home-preview/icons/control-platform.svg?v=2",
    subtitle: "Unified command",
    image: "/solutions/low-altitude-airspace-monitoring/ppt-platform-interface.webp",
    description:
      "A visual command platform connecting RF detection, radar, EO tracking, Remote ID, jammers and spoofers.",
    capabilities: ["Unified situational display", "Alarm and device linkage"],
    href: "/solutions/low-altitude-airspace-monitoring",
    products: [
      {
        model: "C2 PLATFORM",
        name: "Low-Altitude Command Platform",
        image: "/solutions/low-altitude-airspace-monitoring/ppt-platform-interface.webp",
        href: "/solutions/low-altitude-airspace-monitoring",
        cover: true,
        scale: 1,
      },
      {
        model: "COMMAND CENTER",
        name: "Airspace Monitoring Command Center",
        image: "/products/02-drone-detection/low-altitude-monitoring-command-center-hero.webp",
        href: "/solutions/low-altitude-airspace-monitoring",
        cover: true,
        scale: 1,
      },
      {
        model: "AIRSPACE GRID",
        name: "Multi-Sensor Fusion Interface",
        image: "/solutions/low-altitude-airspace-monitoring/low-altitude-grid-hero.webp",
        href: "/solutions/low-altitude-airspace-monitoring",
        cover: true,
        scale: 1,
      },
    ],
  },
];

const solutionCards = [
  {
    title: "Anti-Drone for Critical Infrastructure",
    navLabel: "Critical Infrastructure",
    description: "Layered detection and countermeasures protect power, data and water facilities from unauthorized drones.",
    image: "/solutions/cuas-applications/cuas_index_solution/01 Critical Infrastructure.webp",
    centerImage: "/solutions/cuas-applications/cuas_solution_center/01 Critical Infrastructure.webp",
    href: "/solutions/critical-infrastructure-airspace-monitoring",
  },
  {
    title: "Anti-Drone for Power Plants",
    navLabel: "Power Plants",
    description: "Continuous drone detection and response help protect generation sites and critical energy operations.",
    image: "/solutions/cuas-applications/cuas_index_solution/02 Power Plants.webp",
    centerImage: "/solutions/cuas-applications/cuas_solution_center/02 Power Plants.webp",
    href: "/solutions/power-plant-airspace-monitoring",
  },
  {
    title: "Anti-Drone for Airports",
    navLabel: "Airports",
    description: "Layered C-UAS monitoring detects runway incursions and supports rapid response around controlled airspace.",
    image: "/solutions/cuas-applications/cuas_index_solution/03 Airports.webp",
    centerImage: "/solutions/cuas-applications/cuas_solution_center/03 Airports.webp",
    href: "/solutions/airport-security-protection",
  },
  {
    title: "Anti-Drone for Borders",
    navLabel: "Borders",
    description: "Fixed and portable systems support long-range detection, pilot localization and mobile patrol response.",
    image: "/solutions/cuas-applications/cuas_index_solution/04 Borders.webp",
    centerImage: "/solutions/cuas-applications/cuas_solution_center/04 Borders.webp",
    href: "/solutions/border-airspace-monitoring",
  },
  {
    title: "Anti-Drone for Public Safety",
    navLabel: "Public Safety",
    description: "Rapidly deployable equipment helps law enforcement respond to aerial threats in urban areas.",
    image: "/solutions/cuas-applications/cuas_index_solution/05 Public Safety.webp",
    centerImage: "/solutions/cuas-applications/cuas_solution_center/05 Public Safety.webp",
    href: "/solutions/public-safety-airspace-monitoring",
  },
  {
    title: "Anti-Drone for Prisons",
    navLabel: "Prisons",
    description: "Detect drone deliveries, locate operators and protect correctional facility perimeters.",
    image: "/solutions/cuas-applications/cuas_index_solution/06 Prisons.webp",
    centerImage: "/solutions/cuas-applications/cuas_solution_center/06 Prisons.webp",
    href: "/solutions/correctional-facility-airspace-monitoring",
  },
  {
    title: "Anti-Drone for Ports",
    navLabel: "Ports",
    description: "Maritime-ready systems protect terminals, fuel zones and logistics operations from drone disruption.",
    image: "/solutions/cuas-applications/cuas_index_solution/07 Ports.webp",
    centerImage: "/solutions/cuas-applications/cuas_solution_center/07 Ports.webp",
    href: "/solutions/port-airspace-monitoring",
  },
  {
    title: "Anti-Drone for Mass Events",
    navLabel: "Mass Events",
    description: "Portable and vehicle-mounted equipment protects stadiums, exhibitions and public gatherings.",
    image: "/solutions/cuas-applications/cuas_index_solution/08 Mass Events.webp",
    centerImage: "/solutions/cuas-applications/cuas_solution_center/08 Mass Events.webp",
    href: "/solutions/mass-event-airspace-monitoring",
  },
  {
    title: "Anti-Drone for VIPs & Private Property",
    navLabel: "VIPs & Private Property",
    description: "Low-profile detection and mobile countermeasures protect private sites, convoys and executive movements.",
    image: "/solutions/cuas-applications/cuas_index_solution/09 VIPs & Private Property.webp",
    centerImage: "/solutions/cuas-applications/cuas_solution_center/09 VIPs & Private Property.webp",
    href: "/solutions/vip-private-property-airspace-monitoring",
  },
  {
    title: "Anti-Drone for Enterprises",
    navLabel: "Enterprises",
    description: "Continuous monitoring protects offices, R&D sites and campuses from unauthorized aerial surveillance.",
    image: "/solutions/cuas-applications/cuas_index_solution/10 Enterprises.webp",
    centerImage: "/solutions/cuas-applications/cuas_solution_center/10 Enterprises.webp",
    href: "/solutions/enterprise-airspace-monitoring",
  },
];

const projectCards = [
  {
    title: "Airport C-UAS",
    image: "/cases/airport-security-application/main-home.webp",
    href: "/cases/airport-security-application",
  },
  {
    title: "Power Plant Protection",
    image: "/cases/pakistan-power-plant-airspace-monitoring/main-home.webp",
    href: "/cases/pakistan-power-plant-airspace-monitoring",
  },
  {
    title: "Refinery Airspace Security",
    image: "/cases/brazil-refinery-airspace-monitoring/main-home.webp",
    href: "/cases/brazil-refinery-airspace-monitoring",
  },
  {
    title: "Major Event Security",
    image: "/cases/asian-games-security/case_stadium.webp",
    href: "/cases/asian-games-security",
  },
  {
    title: "Industrial Site Protection",
    image: "/cases/nigeria-factory-airspace-monitoring/main-home.webp",
    href: "/cases/nigeria-factory-airspace-monitoring",
  },
  {
    title: "Water Facility Security",
    image: "/cases/water-conservancy-security/main-home.webp",
    href: "/cases/water-conservancy-security",
  },
];

const technologySteps = [
  {
    number: "01",
    title: "See",
    text: "RF detection, low-altitude radar, EO tracking and Remote ID provide layered airspace awareness.",
  },
  {
    number: "02",
    title: "Identify",
    text: "Multi-source data fusion supports target identification, trajectory review and threat assessment.",
  },
  {
    number: "03",
    title: "Control",
    text: "Jamming, spoofing and linked command devices support a configurable counter-drone response.",
  },
];

export default function HomeRebuildPreview({
  locale,
  dict,
}: {
  locale: string;
  dict: PreviewDict;
}) {
  const solutionTrackRef = useRef<HTMLDivElement>(null);
  const [activeSolution, setActiveSolution] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const selectedCategory = productCategories[activeCategory];
  const featuredProduct = selectedCategory.products[0];
  const useFeatureLayout = activeCategory >= 2;
  const useComputerFrame = activeCategory === 3;

  const updateActiveSolution = () => {
    const track = solutionTrackRef.current;
    if (!track) return;

    const firstCard = track.children[0] as HTMLElement | undefined;
    const secondCard = track.children[1] as HTMLElement | undefined;
    const step = firstCard && secondCard
      ? secondCard.offsetLeft - firstCard.offsetLeft
      : firstCard?.offsetWidth || 1;
    setActiveSolution(Math.min(solutionCards.length - 1, Math.max(0, Math.round(track.scrollLeft / step))));
  };

  const selectSolution = (index: number) => {
    const track = solutionTrackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;

    setActiveSolution(index);
    track.scrollTo({
      left: card.offsetLeft,
      behavior: "smooth",
    });
  };

  const scrollSolutions = (direction: "prev" | "next") => {
    const track = solutionTrackRef.current;
    if (!track) return;
    const distance = Math.min(track.clientWidth * 0.86, 720);
    track.scrollBy({
      left: direction === "next" ? distance : -distance,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const track = solutionTrackRef.current;
    if (!track) return;

    let dragging = false;
    let startX = 0;
    let startLeft = 0;

    const startDrag = (event: PointerEvent) => {
      dragging = true;
      startX = event.clientX;
      startLeft = track.scrollLeft;
      track.classList.add("is-dragging");
      track.setPointerCapture(event.pointerId);
    };

    const dragMove = (event: PointerEvent) => {
      if (!dragging) return;
      track.scrollLeft = startLeft - (event.clientX - startX);
    };

    const stopDrag = (event: PointerEvent) => {
      dragging = false;
      track.classList.remove("is-dragging");
      if (track.hasPointerCapture(event.pointerId)) {
        track.releasePointerCapture(event.pointerId);
      }
    };

    track.addEventListener("pointerdown", startDrag);
    track.addEventListener("pointermove", dragMove);
    track.addEventListener("pointerup", stopDrag);
    track.addEventListener("pointercancel", stopDrag);
    track.addEventListener("scroll", updateActiveSolution, { passive: true });
    window.addEventListener("resize", updateActiveSolution);
    updateActiveSolution();

    return () => {
      track.removeEventListener("pointerdown", startDrag);
      track.removeEventListener("pointermove", dragMove);
      track.removeEventListener("pointerup", stopDrag);
      track.removeEventListener("pointercancel", stopDrag);
      track.removeEventListener("scroll", updateActiveSolution);
      window.removeEventListener("resize", updateActiveSolution);
    };
  }, []);

  return localizeCuasTree(locale, (
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
          <source media="(min-width: 992px)" src="/index_banner_bg_5.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>N-TET C-UAS Equipment</p>
          <h1>Professional C-UAS Equipment Manufacturer &amp; System Supplier</h1>
          <p className={styles.heroCopy}>
            Portable, fixed-site and vehicle-mounted C-UAS equipment with
            multi-sensor integration and a unified control platform for detection,
            identification, tracking and coordinated response.
          </p>
          <div className={styles.heroActions}>
            <WhatsAppLeadButton
              sourceLabel="home_rebuild_hero_whatsapp"
              className={styles.primaryButton}
            >
              Get Price on WhatsApp
              <ArrowUpRight size={18} />
            </WhatsAppLeadButton>
            <a className={styles.secondaryButton} href="#products">
              View Equipment
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="section-solutions" id="solutions">
        <div className="container-wide">
          <div className="solutions-header-row">
            <div>
              <h2 className="solutions-heading">Counter-Drone Solutions</h2>
            </div>
          </div>
          <div className={`solutions-scenario-nav ${styles.solutionDesktopNav}`} role="tablist" aria-label="Select a counter-drone application">
            {solutionCards.map((solution, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeSolution === index}
                className={activeSolution === index ? "is-active" : ""}
                key={solution.href}
                onClick={() => selectSolution(index)}
              >
                {solution.navLabel}
              </button>
            ))}
          </div>
          <div className={`solutions-frame ${styles.solutionDesktopFrame}`}>
            <div className="solutions-controls">
              <button
                type="button"
                aria-label="Previous solutions"
                onClick={() => scrollSolutions("prev")}
              >
                <ChevronLeft size={26} />
              </button>
              <button
                type="button"
                aria-label="Next solutions"
                onClick={() => scrollSolutions("next")}
              >
                <ChevronRight size={26} />
              </button>
            </div>
            <div className="solutions-track" ref={solutionTrackRef}>
              {solutionCards.map((solution, index) => (
                <Link
                  className="solution-card"
                  href={localePath(locale, solution.href)}
                  key={solution.title}
                  prefetch={false}
                >
                  <div className="solution-media">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      sizes="(max-width: 991px) 70vw, 25vw"
                    />
                  </div>
                  <div className="solution-content">
                    <span className="solution-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="solution-title">{solution.title}</h3>
                    <p className="solution-summary">{solution.description}</p>
                    <span className="solution-link-label">
                      View Details <ArrowUpRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.solutionMobileCards}>
            {solutionCards.map((solution, index) => (
              <Link
                className={styles.solutionMobileCard}
                href={localePath(locale, solution.href)}
                key={solution.href}
                prefetch={false}
              >
                <div className={styles.solutionMobileImage}>
                  <Image
                    src={solution.centerImage}
                    alt={solution.title}
                    fill
                    sizes="50vw"
                    priority={index < 2}
                  />
                  <div className={styles.solutionMobileOverlay}>
                    <span className={styles.solutionMobileIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{solution.title}</h3>
                    <span className={styles.solutionMobileLink}>
                      View Details <ArrowUpRight size={12} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.productsSection} id="products">
        <div className={styles.sectionHeader}>
          <p>Select by Deployment</p>
          <h2>Select Your Counter-Drone Equipment</h2>
          <div className={styles.sectionLead}>
            Start with how and where the system will be deployed. Select an
            equipment type to review the matching C-UAS configuration.
          </div>
          <span />
        </div>
        <div className={styles.categoryNav} role="tablist" aria-label="Counter-drone equipment type">
          {productCategories.map((category, index) => {
            const isActive = index === activeCategory;

            return (
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="selected-equipment"
                className={isActive ? styles.activeCategory : ""}
                key={category.title}
                onClick={() => setActiveCategory(index)}
              >
                <Image
                  className={styles.categoryNavIcon}
                  src={category.icon}
                  alt=""
                  width={180}
                  height={105}
                />
                <span>{category.navLabel}</span>
                <small>{category.number}</small>
              </button>
            );
          })}
        </div>

        <div className={styles.productCollection} id="selected-equipment" role="tabpanel">
          <div className={styles.productCollectionHeader}>
            <div>
              <p>{selectedCategory.number} / Selected Equipment Type</p>
              <h3>{selectedCategory.title}</h3>
            </div>
            <div className={styles.collectionGuide}>
              <p>{selectedCategory.description}</p>
              <WhatsAppLeadButton
                sourceLabel="home_rebuild_category_whatsapp"
                className={styles.collectionCta}
              >
                Get Category Pricing <ArrowUpRight size={16} />
              </WhatsAppLeadButton>
            </div>
          </div>

          {useFeatureLayout ? (
            <article className={styles.productFeatureCard}>
              <div className={`${styles.productFeatureImage} ${useComputerFrame ? styles.platformFeatureImage : ""}`}>
                {useComputerFrame ? (
                  <div className={styles.platformComputer}>
                    <div className={styles.platformDisplay}>
                      <span className={styles.platformCamera} aria-hidden="true" />
                      <div className={styles.platformScreenMedia}>
                        <Image
                          key={featuredProduct.image}
                          src={featuredProduct.image}
                          alt={featuredProduct.name}
                          fill
                          sizes="(max-width: 991px) 92vw, 48vw"
                        />
                      </div>
                    </div>
                    <span className={styles.platformStand} aria-hidden="true" />
                    <span className={styles.platformBase} aria-hidden="true" />
                  </div>
                ) : (
                  <Image
                    key={featuredProduct.image}
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    fill
                    className={featuredProduct.cover ? styles.productCover : ""}
                    style={
                      {
                        "--product-scale": featuredProduct.scale,
                        "--product-hover-scale": featuredProduct.scale * 1.025,
                      } as CSSProperties
                    }
                    sizes="(max-width: 991px) 100vw, 50vw"
                  />
                )}
              </div>
              <div className={styles.productFeatureBody}>
                <span>{selectedCategory.subtitle}</span>
                <h4>{featuredProduct.name}</h4>
                <p>{selectedCategory.description}</p>
                <ul>
                  {selectedCategory.capabilities.map((capability) => (
                    <li key={capability}>
                      <ShieldCheck size={16} />
                      {capability}
                    </li>
                  ))}
                </ul>
                <div className={styles.productFeatureActions}>
                  <WhatsAppLeadButton
                    sourceLabel="home_rebuild_feature_product_whatsapp"
                    productName={featuredProduct.name}
                    productHandle={featuredProduct.model}
                    ctaLocation="home_rebuild_feature_product"
                    className={styles.productFeaturePrimary}
                  >
                    Ask About This Device
                  </WhatsAppLeadButton>
                </div>
              </div>
            </article>
          ) : (
            <div
              className={`${styles.productGrid} ${
                selectedCategory.products.length === 3 ? styles.threeProducts : ""
              }`}
            >
              {selectedCategory.products.map((product) => (
                <article className={styles.productItem} key={product.model}>
                  <Link
                    className={styles.productImageStage}
                    href={localePath(locale, product.href)}
                    prefetch={false}
                  >
                    <Image
                      key={product.image}
                      src={product.image}
                      alt={product.name}
                      fill
                      className={product.cover ? styles.productCover : ""}
                      style={
                        {
                          "--product-scale": product.scale,
                          "--product-hover-scale": product.scale * 1.035,
                        } as CSSProperties
                      }
                      sizes="(max-width: 700px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <span>{product.model}</span>
                  </Link>
                  <div className={styles.productMeta}>
                    <h4>{product.name}</h4>
                    <Link
                      className={styles.productGuideButton}
                      href={localePath(locale, product.href)}
                      prefetch={false}
                    >
                      Explore Device <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.technologySection}>
        <div className={styles.technologyIntro}>
          <p>End-to-End C-UAS Chain</p>
          <h2>See. Identify. Control.</h2>
          <div>
            N-TET combines sensing, intelligent assessment and configurable
            countermeasures in one operational workflow.
          </div>
          <Link
            className={styles.technologyLink}
            href={localePath(locale, "/solutions/low-altitude-airspace-monitoring")}
            prefetch={false}
          >
            View Airspace Monitoring Solution
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.technologySteps}>
          {technologySteps.map((step) => (
            <div className={styles.technologyStep} key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.aboutBand}>
        <div className={styles.aboutShell}>
          <div className={styles.aboutMedia}>
            <Image
              src="/index/about_bg.webp"
              alt={dict.home.sections.about}
              fill
              sizes="(max-width: 991px) 100vw, 54vw"
            />
            <span className={styles.aboutLocation}>
              <MapPin size={15} aria-hidden="true" /> Beijing, China
            </span>
          </div>
          <div className={styles.aboutContent}>
            <p className={styles.aboutEyebrow}>N-TET / C-UAS Manufacturing &amp; Integration</p>
            <h2>{dict.home.sections.about}</h2>
            <p className={styles.aboutCopy}>{dict.home.about.content}</p>
            <ul className={styles.aboutCapabilities}>
              <li><ShieldCheck size={17} aria-hidden="true" /> C-UAS Equipment Supply</li>
              <li><ShieldCheck size={17} aria-hidden="true" /> Multi-Sensor System Integration</li>
              <li><ShieldCheck size={17} aria-hidden="true" /> Testing &amp; International Delivery</li>
            </ul>
            <div className={styles.aboutActions}>
              <Link className={styles.aboutPrimary} href={localePath(locale, "/about")}>
                About N-TET <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className={styles.aboutSecondary} href={localePath(locale, "/products")}>
                View Products <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.caseSection}>
        <div className={styles.sectionHeader}>
          <p>Deployment Evidence</p>
          <h2>Counter-Drone Projects</h2>
          <span />
        </div>
        <div className={styles.caseGrid}>
          {projectCards.map((item) => (
            <Link
              className={styles.caseCard}
              href={localePath(locale, item.href)}
              key={item.title}
              prefetch={false}
            >
              <Image src={item.image} alt={item.title} fill sizes="(max-width: 700px) 100vw, 33vw" />
              <div>
                <span>
                  <MapPin size={14} /> Field Deployment
                </span>
                <h3>{item.title}</h3>
                <p>
                  View project equipment and deployment details
                  <ArrowUpRight size={16} />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.purchaseCta}>
        <div>
          <p>Buying Counter-Drone Equipment?</p>
          <h2>Tell Us the Site and Device Type</h2>
          <span>
            Ask for pricing, specifications, delivery lead time and a product
            brochure.
          </span>
        </div>
        <div className={styles.purchaseActions}>
          <WhatsAppLeadButton
            sourceLabel="home_rebuild_purchase_whatsapp"
            className={styles.purchasePrimary}
          >
            Get Price on WhatsApp
            <ArrowUpRight size={18} />
          </WhatsAppLeadButton>
          <Link className={styles.purchaseSecondary} href={localePath(locale, "/contact")}>
            Request Brochure
          </Link>
        </div>
        <ShieldCheck className={styles.ctaMark} aria-hidden="true" />
      </section>
    </main>
  ));
}

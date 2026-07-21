import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, BadgeCheck, Check, Eye, MapPinned, Radar, ScanSearch, Siren } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localePath } from '@/lib/localePath';
import type { IntentLandingConfig } from '@/lib/intentLandingPages';
import InquiryForm from '@/components/products/InquiryForm';
import MobileInquiryForm from '@/components/mobile/MobileInquiryForm';
import styles from './IntentLandingPage.module.css';

const workflowIcons = [Radar, ScanSearch, Eye, Siren];

export default function IntentLandingPage({
  config,
  locale,
  dict,
}: {
  config: IntentLandingConfig;
  locale: Locale;
  dict: any;
}) {
  return (
    <main className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link prefetch={false} href={localePath(locale, '/')}>{dict.nav.home || 'Home'}</Link>
        <span>/</span>
        <Link prefetch={false} href={localePath(locale, '/solutions')}>{dict.nav.solutions || 'Solutions'}</Link>
        <span>/</span>
        <span aria-current="page">{config.h1}</span>
      </nav>

      <section className={styles.hero} aria-labelledby="intent-page-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>{config.eyebrow}</span>
          <h1 id="intent-page-title">{config.h1}</h1>
          <p>{config.purpose}</p>
          <div className={styles.heroFacts}>
            {config.heroFacts.map((fact) => (
              <span key={fact}><Check size={16} aria-hidden="true" />{fact}</span>
            ))}
          </div>
          <Link prefetch={false} href="#inquiry" className={styles.primaryCta}>
            {config.ctaLabel}<ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.heroVisual}>
          <span className={styles.scanLine} aria-hidden="true" />
          <Image
            src={config.heroImage}
            alt={config.heroImageAlt}
            fill
            priority
            sizes="(max-width: 991px) 92vw, 46vw"
            className={styles.heroImage}
          />
          <div className={styles.heroVisualLabel}>
            <Radar size={20} aria-hidden="true" />
            <span>Detection layer / site configuration</span>
          </div>
        </div>
      </section>

      <section className={styles.applications} aria-labelledby="applications-heading">
        <div className={styles.sectionIntro}>
          <span className={styles.sectionNumber}>01</span>
          <div>
            <span className={styles.sectionKicker}>APPLICATION CONTEXT</span>
            <h2 id="applications-heading">{config.applicationHeading}</h2>
          </div>
        </div>
        <p className={styles.answerBlock}>{config.answerBlock}</p>
        <div className={styles.applicationGrid}>
          {config.applications.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.products} aria-labelledby="products-heading">
        <div className={styles.sectionIntro}>
          <span className={styles.sectionNumber}>02</span>
          <div>
            <span className={styles.sectionKicker}>COMPLEMENTARY SENSOR LAYERS</span>
            <h2 id="products-heading">{config.productsHeading}</h2>
            <p>{config.productsIntro}</p>
          </div>
        </div>
        <div className={`${styles.productGrid} ${config.products.length === 2 ? styles.productGridTwo : ''}`}>
          {config.products.map((product) => (
            <Link
              prefetch={false}
              href={localePath(locale, product.href)}
              className={styles.productCard}
              key={product.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.productImageBox}>
                <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 720px) 88vw, 420px" className={styles.productImage} />
              </div>
              <div className={styles.productBody}>
                <h3>{product.name}</h3>
                <p>{product.summary}</p>
                <ul>
                  {product.facts.map((fact) => <li key={fact}><BadgeCheck size={15} aria-hidden="true" />{fact}</li>)}
                </ul>
                <span className={styles.textLink}>View product details <ArrowUpRight size={16} aria-hidden="true" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.comparison} aria-labelledby="comparison-heading">
        <div className={styles.sectionIntro}>
          <span className={styles.sectionNumber}>03</span>
          <div>
            <span className={styles.sectionKicker}>BUYER COMPARISON</span>
            <h2 id="comparison-heading">{config.comparisonHeading}</h2>
            <p>{config.comparisonIntro}</p>
          </div>
        </div>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th scope="col">Selection factor</th>
                {config.comparisonColumns.map((column) => <th scope="col" key={column}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              {config.comparisonRows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((value, index) => <td key={`${row.label}-${config.comparisonColumns[index]}`}>{value}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.workflowSection} aria-labelledby="workflow-heading">
        <div className={styles.sectionIntroLight}>
          <span className={styles.sectionNumberLight}>04</span>
          <div>
            <span className={styles.sectionKickerLight}>OPERATING LOOP</span>
            <h2 id="workflow-heading">{config.workflowHeading}</h2>
            <p>{config.workflowIntro}</p>
          </div>
        </div>
        <div className={styles.workflowGrid}>
          {config.workflow.map((step, index) => {
            const Icon = workflowIcons[index];
            return (
              <article key={step.title} className={styles.workflowStep}>
                <div className={styles.workflowTopline}>
                  <Icon size={24} aria-hidden="true" />
                  <span>0{index + 1}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.summary}</p>
              </article>
            );
          })}
        </div>
        <p className={styles.workflowNote}>
          <Siren size={18} aria-hidden="true" />
          Define escalation contacts, decision authority, site procedures and record-retention requirements before commissioning.
        </p>
      </section>

      <section className={styles.scenarios} aria-labelledby="scenarios-heading">
        <div className={styles.sectionIntro}>
          <span className={styles.sectionNumber}>05</span>
          <div>
            <span className={styles.sectionKicker}>SOLUTION SCENARIOS</span>
            <h2 id="scenarios-heading">{config.scenariosHeading}</h2>
            <p>{config.scenariosIntro}</p>
          </div>
        </div>
        <div className={styles.scenarioGrid}>
          {config.scenarios.map((scenario) => (
            <article className={styles.scenarioCard} key={scenario.href}>
              <div className={styles.scenarioImageBox}>
                <Image src={scenario.image} alt={scenario.imageAlt} fill sizes="(max-width: 720px) 92vw, 48vw" className={styles.scenarioImage} />
              </div>
              <div className={styles.scenarioBody}>
                <MapPinned size={22} aria-hidden="true" />
                <h3>{scenario.title}</h3>
                <p>{scenario.summary}</p>
                <ul>{scenario.points.map((point) => <li key={point}>{point}</li>)}</ul>
                <Link
                  prefetch={false}
                  href={localePath(locale, scenario.href)}
                  className={styles.textLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {scenario.linkLabel || 'View case details'} <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.faqInquiry} aria-labelledby="faq-heading">
        <div className={styles.faqColumn}>
          <span className={styles.sectionNumber} aria-hidden="true">06</span>
          <span className={styles.sectionKicker}>FAQ</span>
          <h2 id="faq-heading">{config.faqHeading}</h2>
          <div className={styles.faqList}>
            {config.faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <div id="inquiry" className={styles.inquiryColumn}>
          <div className={styles.inquiryMarker} aria-hidden="true">
            <span className={styles.sectionNumber}>07</span>
            <span className={styles.sectionKicker}>PROJECT INQUIRY</span>
          </div>
          <div className="pc_only">
            <InquiryForm dict={dict} />
          </div>
          <div className="mobile_only">
            <MobileInquiryForm dict={dict} />
          </div>
        </div>
      </section>
    </main>
  );
}

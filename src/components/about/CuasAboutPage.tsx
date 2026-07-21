import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowRight,
    ArrowUpRight,
    Binary,
    ChevronRight,
    ClipboardCheck,
    Cpu,
    Factory,
    FileText,
    FlaskConical,
    Layers3,
    MapPin,
    Network,
    PackageCheck,
    RadioTower,
    ScanSearch,
    Settings2,
    ShieldCheck,
    Waves,
    Wrench,
} from 'lucide-react';
import FactoryShow from '@/components/about/FactoryShow';
import PrimaryContactButton from '@/components/contact/PrimaryContactButton';
import MobileInquiryForm from '@/components/mobile/MobileInquiryForm';
import InquiryForm from '@/components/products/InquiryForm';
import { localePath } from '@/lib/localePath';
import { cuasText, localizeCuasTree } from '@/lib/cuasLocaleCopy';
import styles from './CuasAboutPage.module.css';

const deliveryAreas = [
    {
        number: '01',
        icon: RadioTower,
        title: 'C-UAS Equipment',
        text: 'Portable and fixed-site equipment for low-altitude detection, identification, tracking and event logging.',
    },
    {
        number: '02',
        icon: Settings2,
        title: 'Deployment Configurations',
        text: 'Fixed-site and vehicle-mounted configurations organized around coverage, mobility, power, network and interface requirements.',
    },
    {
        number: '03',
        icon: Layers3,
        title: 'Command & Control',
        text: 'Map-based awareness, device status, alerts and event records for connected C-UAS equipment.',
    },
    {
        number: '04',
        icon: FileText,
        title: 'Testing & Delivery',
        text: 'Configuration checks, technical records, delivery documents and packing preparation for the confirmed equipment scope.',
    },
];

const coreTechnologies = [
    {
        number: '01',
        icon: Waves,
        title: 'Ultra-Wideband RF Power Amplification',
        text: 'Broadband RF technology considered in equipment architecture and technical configuration.',
    },
    {
        number: '02',
        icon: Cpu,
        title: 'FPGA-Based Software-Defined Radio',
        text: 'Programmable signal-processing resources for responsive RF data handling.',
    },
    {
        number: '03',
        icon: ScanSearch,
        title: 'Weak RF Signal Detection',
        text: 'Signal acquisition and processing focused on low-level radio-frequency activity.',
    },
    {
        number: '04',
        icon: RadioTower,
        title: 'RF Spectrum Analysis & Identification',
        text: 'Spectrum observation and signal-characteristic analysis for equipment applications.',
    },
    {
        number: '05',
        icon: Binary,
        title: 'Software-Defined Radio (SDR)',
        text: 'Flexible radio processing that supports configurable signal workflows.',
    },
    {
        number: '06',
        icon: Network,
        title: 'Multi-Source Data Fusion Algorithms',
        text: 'Data alignment and correlation across connected detection and monitoring sources.',
    },
];

const engineeringResourceGroups = [
    {
        icon: FlaskConical,
        eyebrow: 'Testing & R&D',
        title: 'Controlled environments for RF and system evaluation.',
        description: 'Technical work can draw on environmental, RF and system-level test resources during equipment evaluation and configuration.',
        items: [
            'High- and low-temperature test environment',
            'RF power-amplifier and FPGA algorithm development platforms',
            'Equipment and system-integration test resources',
        ],
        images: [
            {
                src: '/about/engineering-resources/anechoic-chamber.webp',
                alt: 'Anechoic chamber used for RF equipment evaluation',
                label: 'Anechoic Chamber',
            },
            {
                src: '/about/engineering-resources/pilot-laboratory.webp',
                alt: 'Pilot laboratory with RF equipment and development workstations',
                label: 'Pilot Laboratory',
            },
        ],
    },
    {
        icon: Factory,
        eyebrow: 'Production Testing',
        title: 'Repeatable preparation and verification resources.',
        description: 'Preparation and checking resources support equipment consistency, configuration verification and pre-delivery review.',
        items: [
            'Anechoic-chamber test resources',
            'Automated quality-inspection fixtures',
            'Automated production-line resources',
        ],
        images: [
            {
                src: '/about/engineering-resources/outdoor-test-field.webp',
                alt: 'Outdoor field with RF detection and monitoring equipment under test',
                label: 'Test Field',
            },
            {
                src: '/about/engineering-resources/automated-production-line.webp',
                alt: 'Automated production line for equipment preparation and inspection',
                label: 'Automated Production Line',
            },
        ],
    },
];

const workflow = [
    {
        icon: ClipboardCheck,
        step: '01',
        title: 'Requirement Review',
        text: 'We start with the site type, operating mode, deployment form and expected system boundary.',
    },
    {
        icon: Layers3,
        step: '02',
        title: 'Configuration Proposal',
        text: 'The discussion is translated into a practical equipment list, interfaces and optional items.',
    },
    {
        icon: Wrench,
        step: '03',
        title: 'Preparation & Testing',
        text: 'OEM manufacturing and testing resources support assembly, configuration and pre-delivery checks.',
    },
    {
        icon: PackageCheck,
        step: '04',
        title: 'Delivery Coordination',
        text: 'We coordinate packing information, documents and commissioning communication for the agreed scope.',
    },
];

const faqs = [
    {
        question: 'Can N-TET support a complete C-UAS configuration?',
        answer: 'Yes. N-TET can coordinate portable, fixed-site, vehicle-mounted and management-platform equipment as a configured project scope. The final combination depends on the site, coverage objective, deployment method, interfaces and local operating requirements.',
    },
    {
        question: 'What information is needed for a quotation?',
        answer: 'Share the site type, preferred deployment form, quantity, required functions, destination country and any existing system interface. If some details are not yet available, our team can begin with a short requirement checklist.',
    },
    {
        question: 'Can the equipment be configured for fixed-site or vehicle-mounted use?',
        answer: 'Yes. Both fixed-site and vehicle-mounted configurations can be discussed. Installation space, power supply, network connection, mobility, sensor placement and environmental conditions should be confirmed before the configuration is finalized.',
    },
    {
        question: 'Do you provide brochures, specifications and delivery documents?',
        answer: 'Available product brochures and specification sheets can be provided during selection. The document set for delivery is confirmed according to the selected equipment and agreed project scope.',
    },
    {
        question: 'Do you support commissioning and after-sales communication?',
        answer: 'Commissioning and after-sales communication can be included in the project discussion. The exact support method—remote guidance, documentation, training coordination or on-site service—is confirmed before order placement.',
    },
];

function PurchaseActions({ locale, mobile = false }: { locale: string; mobile?: boolean }) {
    return localizeCuasTree(locale, (
        <div className={mobile ? styles.mobileActions : styles.actions}>
            <PrimaryContactButton
                sourceLabel={mobile ? 'about_mobile_whatsapp' : 'about_desktop_whatsapp'}
                ctaLocation={mobile ? 'about_mobile' : 'about_desktop'}
                className={styles.primaryAction}
            >
                Get Price on WhatsApp <ArrowUpRight size={18} aria-hidden="true" />
            </PrimaryContactButton>
            <Link className={styles.secondaryAction} href={localePath(locale, '/contact')} prefetch={false}>
                Request Brochure <ArrowRight size={17} aria-hidden="true" />
            </Link>
        </div>
    ));
}

function EngineeringResources({ locale, mobile = false }: { locale: string; mobile?: boolean }) {
    const headingId = mobile ? 'mobile-engineering-resources-title' : 'engineering-resources-title';

    return localizeCuasTree(locale, (
        <section
            className={`${styles.resourceSection} ${mobile ? styles.resourceSectionMobile : ''}`}
            aria-labelledby={headingId}
        >
            <div className={mobile ? styles.resourceInnerMobile : styles.shell}>
                <div className={styles.resourceHeader}>
                    <div>
                        <p className={styles.sectionEyebrow}>Engineering Resources</p>
                        <h2 id={headingId}>Where RF development meets repeatable testing.</h2>
                    </div>
                    <p>
                        Engineering, test and preparation resources support the technical path from signal processing
                        to equipment configuration and delivery review.
                    </p>
                </div>

                <div className={styles.resourceRows}>
                    {engineeringResourceGroups.map((group) => {
                        const Icon = group.icon;
                        return (
                            <article className={styles.resourceRow} key={group.eyebrow}>
                                <div className={styles.resourceCopy}>
                                    <div className={styles.resourceLabel}>
                                        <Icon size={31} strokeWidth={1.65} aria-hidden="true" />
                                        <span>{group.eyebrow}</span>
                                    </div>
                                    <h3>{group.title}</h3>
                                    <p>{group.description}</p>
                                    <ul>
                                        {group.items.map((item) => (
                                            <li key={item}>
                                                <ChevronRight size={15} strokeWidth={2.2} aria-hidden="true" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={styles.resourceGallery}>
                                    {group.images.map((image) => (
                                        <figure key={image.src}>
                                            <div className={styles.resourceImage}>
                                                <Image
                                                    src={image.src}
                                                    alt={image.alt}
                                                    fill
                                                    sizes={mobile ? '50vw' : '(max-width: 1200px) 32vw, 390px'}
                                                />
                                            </div>
                                            <figcaption>{image.label}</figcaption>
                                        </figure>
                                    ))}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    ));
}

function DesktopCuasAbout({ locale, dict }: { locale: string; dict?: any }) {
    return localizeCuasTree(locale, (
        <div className={styles.desktopPage}>
            <section className={styles.hero}>
                <Image
                    src="/index/about_bg.webp"
                    alt="N-TET engineering office and OEM manufacturing support"
                    fill
                    priority
                    sizes="100vw"
                    className={styles.heroImage}
                />
                <div className={styles.heroShade} />
                <div className={styles.heroGrid} aria-hidden="true" />
                <div className={styles.shell}>
                    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                        <Link href={localePath(locale)} prefetch={false}>Home</Link>
                        <ChevronRight size={14} />
                        <span>About N-TET</span>
                    </nav>
                    <div className={styles.heroContent}>
                        <p className={styles.eyebrow}>About N-TET / Beijing, China</p>
                        <h1>C-UAS Equipment &amp; System Solutions</h1>
                        <p className={styles.heroLead}>
                            N-TET supplies C-UAS equipment, multi-sensor system configurations and coordinated
                            international delivery for site-specific projects.
                        </p>
                        <PurchaseActions locale={locale} />
                    </div>
                </div>
            </section>

            <main>
                <section className={styles.profileSection}>
                    <div className={`${styles.shell} ${styles.profileGrid}`}>
                        <div className={styles.profileMedia}>
                            <Image
                                src="/about/about_company.webp"
                                alt="N-TET Beijing office reception"
                                fill
                                sizes="(max-width: 1200px) 50vw, 600px"
                            />
                        </div>
                        <div className={styles.profileContent}>
                            <div className={styles.profileHeading}>
                                <p className={styles.sectionEyebrow}>Company Profile</p>
                                <h2>Equipment expertise carried through to delivery.</h2>
                                <span className={styles.blueRule} />
                            </div>
                            <div className={styles.profileCopy}>
                                <p>
                                    N-TET is a Beijing-based professional C-UAS equipment and system supplier. We
                                    provide portable, fixed-site and vehicle-mounted equipment,
                                    multi-sensor integration and command-platform configuration for site-specific
                                    projects.
                                </p>
                                <p>
                                    Our work also covers equipment preparation and testing, technical documentation
                                    and coordinated international delivery for airports, energy facilities, industrial
                                    sites and major public venues. Coverage, interfaces and included items are
                                    confirmed before equipment preparation begins.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.deliverySection}>
                    <div className={styles.shell}>
                        <div className={styles.sectionHeader}>
                            <div>
                                <p className={styles.sectionEyebrow}>Core Capabilities</p>
                                <h2>C-UAS equipment shaped around real deployment conditions.</h2>
                            </div>
                            <p>
                                A project may begin with a standalone device or a multi-device site configuration.
                                Coverage, mobility, power, network and interface requirements define the equipment
                                scope from the first review.
                            </p>
                        </div>
                        <div className={styles.deliveryGrid}>
                            {deliveryAreas.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <article className={styles.deliveryCard} key={item.number}>
                                        <span className={styles.cardNumber}>{item.number}</span>
                                        <Icon size={31} aria-hidden="true" />
                                        <h3>{item.title}</h3>
                                        <p>{item.text}</p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className={styles.technologySection}>
                    <div className={`${styles.shell} ${styles.technologyLayout}`}>
                        <div className={styles.technologyIntro}>
                            <p className={styles.sectionEyebrow}>Core Technologies</p>
                            <h2>RF sensing, signal processing and data fusion.</h2>
                            <span className={styles.technologyRule} />
                            <p>
                                These technology areas support equipment evaluation, configuration discussions and
                                the technical path from radio-frequency signals to usable site information.
                            </p>
                        </div>
                        <div className={styles.technologyGrid}>
                            {coreTechnologies.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <article className={styles.technologyCard} key={item.number}>
                                        <div className={styles.technologyCardTop}>
                                            <Icon size={29} strokeWidth={1.7} aria-hidden="true" />
                                            <span>{item.number}</span>
                                        </div>
                                        <h3>{item.title}</h3>
                                        <p>{item.text}</p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <EngineeringResources locale={locale} />

                <FactoryShow locale={locale} dict={{ about: { factoryShowTitle: cuasText(locale, 'Equipment Preparation & Testing') } }} />

                <section className={styles.workflowSection}>
                    <div className={styles.shell}>
                        <div className={styles.sectionHeader}>
                            <div>
                                <p className={styles.sectionEyebrow}>Project Workflow</p>
                                <h2>A visible path from requirement to delivery.</h2>
                            </div>
                            <p>Each stage produces the information needed for the next decision.</p>
                        </div>
                        <div className={styles.workflowGrid}>
                            {workflow.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <article className={styles.workflowCard} key={item.step}>
                                        <div className={styles.workflowTop}>
                                            <Icon size={28} aria-hidden="true" />
                                            <span>{item.step}</span>
                                        </div>
                                        <h3>{item.title}</h3>
                                        <p>{item.text}</p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className={styles.faqSection}>
                    <div className={`${styles.shell} ${styles.faqLayout}`}>
                        <div className={styles.faqIntro}>
                            <p className={styles.sectionEyebrow}>FAQ</p>
                            <h2>Questions buyers usually ask first.</h2>
                            <p>Short answers before a configuration discussion begins.</p>
                            <Link href={localePath(locale, '/contact')} prefetch={false}>
                                Ask another question <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className={styles.faqList}>
                            {faqs.map((faq, index) => (
                                <details key={faq.question} open={index === 0}>
                                    <summary>
                                        <span>{String(index + 1).padStart(2, '0')}</span>
                                        {faq.question}
                                        <i aria-hidden="true" />
                                    </summary>
                                    <p>{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={styles.finalCta}>
                    <div className={styles.ctaGrid} aria-hidden="true" />
                    <div className={`${styles.shell} ${styles.finalCtaInner}`}>
                        <div>
                            <p>Plan a C-UAS configuration</p>
                            <h2>Tell us the site, deployment form and equipment you need.</h2>
                            <span>We can start with a short requirement review and the relevant product information.</span>
                        </div>
                        <PurchaseActions locale={locale} />
                    </div>
                </section>

                <section id="inquiry" className={styles.inquirySection}>
                    <div className={styles.shell}>
                        <InquiryForm dict={dict} />
                    </div>
                </section>
            </main>
        </div>
    ));
}

function MobileCuasAbout({ locale, dict }: { locale: string; dict?: any }) {
    return localizeCuasTree(locale, (
        <div className={styles.mobilePage}>
            <section className={styles.mobileHero}>
                <Image
                    src="/index/about_bg.webp"
                    alt="N-TET engineering office and OEM manufacturing support"
                    fill
                    priority
                    sizes="100vw"
                />
                <div className={styles.mobileHeroShade} />
                <div className={styles.mobileHeroContent}>
                    <p>About N-TET / Beijing</p>
                    <div className={styles.mobileTitle} role="heading" aria-level={1}>C-UAS Equipment &amp; System Solutions</div>
                    <span>C-UAS equipment, system configuration and coordinated international delivery.</span>
                    <PurchaseActions locale={locale} mobile />
                </div>
            </section>

            <main>
                <section className={styles.mobileProfile}>
                    <div className={styles.mobileProfileImage}>
                        <Image
                            src="/about/about_company.webp"
                            alt="N-TET Beijing office reception"
                            fill
                            sizes="100vw"
                        />
                    </div>
                    <p className={styles.sectionEyebrow}>Company Profile</p>
                    <h2>Equipment expertise carried through to delivery.</h2>
                    <p>
                        N-TET is a Beijing-based professional C-UAS equipment and system supplier. We provide
                        portable, fixed-site and vehicle-mounted equipment, multi-sensor integration,
                        command-platform configuration, testing, documentation and coordinated international delivery.
                    </p>
                    <div className={styles.mobileTrustNote}>
                        <ShieldCheck size={24} />
                        <span><strong>Clear scope first.</strong> Included equipment, configuration items and required site information stay visible.</span>
                    </div>
                </section>

                <section className={styles.mobileDelivery}>
                    <div className={styles.mobileSectionHead}>
                        <p className={styles.sectionEyebrow}>Core Capabilities</p>
                        <h2>Equipment, configuration and delivery.</h2>
                    </div>
                    <div className={styles.mobileDeliveryGrid}>
                        {deliveryAreas.map((item) => {
                            const Icon = item.icon;
                            return (
                                <article key={item.number}>
                                    <div><Icon size={25} /><span>{item.number}</span></div>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className={styles.mobileTechnology}>
                    <div className={styles.mobileSectionHead}>
                        <p className={styles.sectionEyebrow}>Core Technologies</p>
                        <h2>RF sensing, signal processing and data fusion.</h2>
                        <span>Six technical areas supporting equipment and system configuration.</span>
                    </div>
                    <div className={styles.mobileTechnologyGrid}>
                        {coreTechnologies.map((item) => {
                            const Icon = item.icon;
                            return (
                                <article key={item.number}>
                                    <div>
                                        <Icon size={25} strokeWidth={1.7} aria-hidden="true" />
                                        <span>{item.number}</span>
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <EngineeringResources locale={locale} mobile />

                <FactoryShow locale={locale} dict={{ about: { factoryShowTitle: cuasText(locale, 'Equipment Preparation & Testing') } }} />

                <section className={styles.mobileWorkflow}>
                    <div className={styles.mobileSectionHead}>
                        <p className={styles.sectionEyebrow}>Project Workflow</p>
                        <h2>Four visible project stages.</h2>
                    </div>
                    <div className={styles.mobileWorkflowList}>
                        {workflow.map((item) => {
                            const Icon = item.icon;
                            return (
                                <article key={item.step}>
                                    <div><Icon size={23} /><span>{item.step}</span></div>
                                    <section><h3>{item.title}</h3><p>{item.text}</p></section>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className={styles.mobileFaq}>
                    <div className={styles.mobileSectionHead}>
                        <p className={styles.sectionEyebrow}>FAQ</p>
                        <h2>Questions buyers ask first.</h2>
                    </div>
                    <div className={styles.faqList}>
                        {faqs.map((faq, index) => (
                            <details key={faq.question} open={index === 0}>
                                <summary>
                                    <span>{String(index + 1).padStart(2, '0')}</span>
                                    {faq.question}
                                    <i aria-hidden="true" />
                                </summary>
                                <p>{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>

                <section className={styles.mobileCta}>
                    <MapPin size={22} />
                    <p>Plan a C-UAS configuration</p>
                    <h2>Tell us the site and deployment form.</h2>
                    <span>Start with a short requirement review and the relevant product information.</span>
                    <PurchaseActions locale={locale} mobile />
                </section>

                <section id="inquiry-mobile" className={styles.mobileInquiry}>
                    <MobileInquiryForm dict={dict} />
                </section>
            </main>
        </div>
    ));
}

export default function CuasAboutPage({ locale, dict }: { locale: string; dict?: any }) {
    return (
        <>
            <DesktopCuasAbout locale={locale} dict={dict} />
            <MobileCuasAbout locale={locale} dict={dict} />
        </>
    );
}

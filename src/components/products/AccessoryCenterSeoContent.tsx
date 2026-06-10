import Link from 'next/link';
import { localePath } from '@/lib/localePath';

type AccessoryContent = {
  eyebrow: string;
  title: string;
  intro: string[];
  cards: Array<{ title: string; body: string }>;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  linksTitle: string;
  links: Array<{ label: string; href: string }>;
};

const CONTENT: Record<string, AccessoryContent> = {
  en: {
    eyebrow: 'Accessory planning',
    title: 'Drone Accessories and UAV Components for Industrial Platforms',
    intro: [
      'Drone accessories should be selected around platform compatibility, payload interface, endurance target, data workflow, and field maintenance plan. N-TET organizes UAV components such as electro-optical gimbals, UAV engines, data links, propellers, motors, batteries, remote controllers, and flight controllers so technical teams can compare parts by function.',
      'For industrial UAV systems, accessory planning affects imaging quality, flight stability, communication reliability, spare-parts readiness, and deployment continuity. The catalog below is intended to help buyers connect components with UAV platforms, inspection solutions, and after-sales support requirements.',
    ],
    cards: [
      {
        title: 'Payload and sensing compatibility',
        body: 'Match gimbals, optical payloads, sensors, and mounting interfaces with the UAV platform, mission altitude, image-recording requirement, and inspection workflow.',
      },
      {
        title: 'Power and propulsion readiness',
        body: 'Review batteries, motors, propellers, engines, and spare modules together so endurance, lift, operating temperature, and maintenance intervals stay aligned.',
      },
      {
        title: 'Control and data workflow',
        body: 'Check remote controllers, flight controllers, and UAV data links against command distance, telemetry needs, video transmission, and field support expectations.',
      },
    ],
    faqTitle: 'Drone Accessories FAQ',
    faqs: [
      {
        question: 'Which drone accessories should be confirmed before procurement?',
        answer: 'Confirm platform model, payload weight, voltage, mounting interface, communication distance, flight-control compatibility, spare battery plan, and the field maintenance process.',
      },
      {
        question: 'How do UAV components affect inspection performance?',
        answer: 'Gimbals and sensors affect image stability, motors and propellers affect lift and endurance, batteries affect mission duration, and data links affect command and video reliability.',
      },
      {
        question: 'Can accessories be supplied as a package with UAV systems?',
        answer: 'Yes. Accessories are often selected together with UAV platforms, solution workflows, training needs, and recommended spare parts for the project environment.',
      },
    ],
    linksTitle: 'Related planning pages',
    links: [
      { label: 'Industrial UAV systems product center', href: '/products' },
      { label: 'UAV inspection solutions and workflows', href: '/solutions' },
      { label: 'Project consultation for UAV components', href: '/contact' },
    ],
  },
  es: {
    eyebrow: 'Planificación de accesorios',
    title: 'Accesorios para drones y componentes UAV para plataformas industriales',
    intro: [
      'Los accesorios para drones deben seleccionarse según compatibilidad de plataforma, interfaz de carga útil, autonomía esperada, flujo de datos y plan de mantenimiento. N-TET organiza componentes UAV como gimbals electro-ópticos, motores, enlaces de datos, hélices, baterías, controles remotos y controladores de vuelo por función.',
      'En sistemas UAV industriales, la planificación de accesorios influye en calidad de imagen, estabilidad de vuelo, fiabilidad de comunicación, repuestos y continuidad de despliegue. Este catálogo ayuda a conectar componentes con plataformas UAV, soluciones de inspección y soporte posventa.',
    ],
    cards: [
      {
        title: 'Compatibilidad de carga útil y sensores',
        body: 'Relacione gimbals, cargas ópticas, sensores e interfaces de montaje con la plataforma UAV, altitud de misión, registro de imagen y flujo de inspección.',
      },
      {
        title: 'Preparación de energía y propulsión',
        body: 'Revise baterías, motores, hélices y módulos de repuesto para alinear autonomía, elevación, temperatura de operación e intervalos de mantenimiento.',
      },
      {
        title: 'Control y flujo de datos',
        body: 'Verifique controles remotos, controladores de vuelo y enlaces de datos UAV frente a distancia de mando, telemetría, video y soporte de campo.',
      },
    ],
    faqTitle: 'FAQ de accesorios para drones',
    faqs: [
      {
        question: '¿Qué accesorios para drones se deben confirmar antes de comprar?',
        answer: 'Confirme modelo de plataforma, peso de carga útil, voltaje, interfaz de montaje, distancia de comunicación, compatibilidad de control de vuelo, baterías de repuesto y mantenimiento.',
      },
      {
        question: '¿Cómo afectan los componentes UAV al rendimiento de inspección?',
        answer: 'Los gimbals y sensores influyen en estabilidad de imagen; motores y hélices en elevación y autonomía; baterías en duración; enlaces de datos en mando y video.',
      },
      {
        question: '¿Se pueden suministrar accesorios junto con sistemas UAV?',
        answer: 'Sí. Los accesorios suelen seleccionarse con plataformas UAV, flujos de solución, capacitación y repuestos recomendados para el entorno del proyecto.',
      },
    ],
    linksTitle: 'Páginas relacionadas',
    links: [
      { label: 'Centro de productos de sistemas UAV industriales', href: '/products' },
      { label: 'Soluciones de inspección UAV', href: '/solutions' },
      { label: 'Consulta de proyecto para componentes UAV', href: '/contact' },
    ],
  },
  ru: {
    eyebrow: 'Планирование аксессуаров',
    title: 'Аксессуары для дронов и компоненты БПЛА для промышленных платформ',
    intro: [
      'Аксессуары для дронов следует выбирать по совместимости платформы, интерфейсу полезной нагрузки, требуемой автономности, потоку данных и плану обслуживания. N-TET группирует компоненты БПЛА: электрооптические подвесы, двигатели, каналы данных, пропеллеры, аккумуляторы, пульты управления и полетные контроллеры.',
      'Для промышленных БПЛА планирование аксессуаров влияет на качество изображения, стабильность полета, надежность связи, готовность запасных частей и непрерывность развертывания. Каталог помогает связать компоненты с платформами БПЛА, решениями инспекции и послепродажной поддержкой.',
    ],
    cards: [
      {
        title: 'Совместимость полезной нагрузки и сенсоров',
        body: 'Сопоставьте подвесы, оптические нагрузки, сенсоры и крепления с платформой БПЛА, высотой миссии, требованиями к записи и рабочим процессом инспекции.',
      },
      {
        title: 'Готовность питания и тяги',
        body: 'Проверяйте аккумуляторы, моторы, пропеллеры и запасные модули вместе, чтобы согласовать автономность, подъемную силу, температуру работы и обслуживание.',
      },
      {
        title: 'Управление и поток данных',
        body: 'Оцените пульты управления, полетные контроллеры и каналы данных БПЛА по дальности управления, телеметрии, видеопередаче и поддержке в поле.',
      },
    ],
    faqTitle: 'FAQ по аксессуарам для дронов',
    faqs: [
      {
        question: 'Какие аксессуары для дронов нужно подтвердить перед закупкой?',
        answer: 'Подтвердите модель платформы, вес полезной нагрузки, напряжение, крепление, дальность связи, совместимость контроллера, запасные аккумуляторы и процесс обслуживания.',
      },
      {
        question: 'Как компоненты БПЛА влияют на инспекционные задачи?',
        answer: 'Подвесы и сенсоры влияют на стабильность изображения, моторы и пропеллеры - на тягу и автономность, аккумуляторы - на длительность миссии, каналы данных - на управление и видео.',
      },
      {
        question: 'Можно ли поставлять аксессуары вместе с системами БПЛА?',
        answer: 'Да. Аксессуары часто подбираются вместе с платформами БПЛА, рабочими процессами решений, обучением и рекомендуемыми запасными частями.',
      },
    ],
    linksTitle: 'Связанные страницы',
    links: [
      { label: 'Центр продуктов промышленных БПЛА', href: '/products' },
      { label: 'Решения инспекции БПЛА', href: '/solutions' },
      { label: 'Консультация по компонентам БПЛА', href: '/contact' },
    ],
  },
};

export default function AccessoryCenterSeoContent({ locale, compact = false }: { locale: string; compact?: boolean }) {
  const content = CONTENT[locale] || CONTENT.en;
  const cardGrid = compact ? '1fr' : 'repeat(3, minmax(0, 1fr))';
  const faqGrid = compact ? '1fr' : 'repeat(3, minmax(0, 1fr))';

  return (
    <section style={{ padding: compact ? '34px 16px' : '70px 0 20px', background: '#fff', borderBottom: '1px solid #eef2f7' }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: compact ? 0 : '0 20px' }}>
        <div style={{ maxWidth: '940px', margin: compact ? 0 : '0 auto', textAlign: compact ? 'left' : 'center' }}>
          <div style={{ color: '#315ba4', fontSize: compact ? '1.2rem' : '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
            {content.eyebrow}
          </div>
          <h2 style={{ margin: 0, color: '#172033', fontSize: compact ? '2.35rem' : '3.35rem', lineHeight: 1.18, fontWeight: 900 }}>
            {content.title}
          </h2>
          <div style={{ marginTop: compact ? '18px' : '24px', color: '#4b5563', fontSize: compact ? '1.5rem' : '1.72rem', lineHeight: 1.75 }}>
            {content.intro.map((paragraph) => (
              <p key={paragraph} style={{ margin: '0 0 14px' }}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: cardGrid, gap: compact ? '14px' : '22px', marginTop: compact ? '26px' : '38px' }}>
          {content.cards.map((card) => (
            <div key={card.title} style={{ border: '1px solid #e3eaf3', padding: compact ? '18px' : '24px', background: '#f8fafc' }}>
              <h3 style={{ margin: '0 0 10px', color: '#1f2a44', fontSize: compact ? '1.65rem' : '1.95rem', lineHeight: 1.3, fontWeight: 850 }}>{card.title}</h3>
              <p style={{ margin: 0, color: '#566174', fontSize: compact ? '1.42rem' : '1.55rem', lineHeight: 1.7 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: compact ? '30px' : '46px' }}>
          <h2 style={{ margin: '0 0 22px', color: '#172033', fontSize: compact ? '2.05rem' : '2.75rem', fontWeight: 900 }}>{content.faqTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: faqGrid, gap: compact ? '14px' : '20px' }}>
            {content.faqs.map((faq) => (
              <div key={faq.question} style={{ borderTop: '2px solid #315ba4', paddingTop: '14px' }}>
                <h3 style={{ margin: '0 0 8px', color: '#1f2a44', fontSize: compact ? '1.55rem' : '1.8rem', lineHeight: 1.35, fontWeight: 850 }}>{faq.question}</h3>
                <p style={{ margin: 0, color: '#566174', fontSize: compact ? '1.42rem' : '1.55rem', lineHeight: 1.72 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: compact ? '28px' : '40px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: compact ? '10px' : '14px' }}>
          <strong style={{ color: '#172033', fontSize: compact ? '1.42rem' : '1.58rem' }}>{content.linksTitle}</strong>
          {content.links.map((link) => (
            <Link
              key={link.href}
              prefetch={false}
              href={localePath(locale, link.href)}
              style={{ color: '#315ba4', fontSize: compact ? '1.4rem' : '1.52rem', fontWeight: 800, textDecoration: 'none', borderBottom: '1px solid rgba(49, 91, 164, 0.35)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

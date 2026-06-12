import FaqListSection from '@/components/common/FaqListSection';

type LocaleContent = {
  eyebrow: string;
  title: string;
  intro: string[];
  cards: Array<{ title: string; body: string }>;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  linksTitle: string;
  links: Array<{ label: string; href: string }>;
};

type ProductContentPlacement = 'intro' | 'faq';

const CONTENT: Record<string, LocaleContent> = {
  en: {
    eyebrow: 'Product range',
    title: 'Industrial UAV Systems, Monitoring Equipment, Accessories, and Field Equipment',
    intro: [
      'N-TET product families include industrial UAV platforms, low-altitude monitoring equipment, security screening systems, engineering materials, field medical equipment, drone accessories, and UAV components.',
      'Product pages list product type, model, payload, endurance, operating radius, sensor, data link, power module, compatible accessories, and available spare parts where the source data provides them.',
    ],
    cards: [
      {
        title: 'UAV platforms',
        body: 'Includes multi-rotor UAVs, VTOL fixed-wing UAVs, tethered UAVs, emergency communication UAVs, lighting UAVs, firefighting UAVs, inspection UAVs, and water-resource monitoring UAVs.',
      },
      {
        title: 'Monitoring and screening equipment',
        body: 'Includes low-altitude detection radars, RF detection systems, electro-optical tracking systems, Remote ID monitoring, X-ray baggage scanners, metal detectors, liquid inspectors, explosive detectors, and access-control turnstiles.',
      },
      {
        title: 'Accessories and field equipment',
        body: 'Includes gimbals, UAV engines, data links, propellers, motors, batteries, remote controllers, flight controllers, prefabricated steel bridges, bridge components, containerized medical systems, and mobile cabin hospitals.',
      },
    ],
    faqTitle: 'Product Category FAQ',
    faqs: [
      {
        question: 'Which UAV product types are listed?',
        answer: 'The UAV category includes multi-rotor UAVs, VTOL fixed-wing UAVs, tethered UAVs, emergency communication UAVs, lighting UAVs, firefighting UAVs, inspection UAVs, and water-resource monitoring UAVs.',
      },
      {
        question: 'Which monitoring and screening products are listed?',
        answer: 'The catalog includes low-altitude detection radars, RF detection systems, electro-optical tracking systems, Remote ID monitoring, X-ray baggage scanners, metal detectors, liquid inspectors, explosive detectors, radiation detectors, and access-control turnstiles.',
      },
      {
        question: 'Which UAV accessories are listed?',
        answer: 'The accessories category includes electro-optical gimbals, UAV engines, UAV data links, propellers, motors, batteries, remote controllers, and flight controllers.',
      },
      {
        question: 'Which field equipment categories are listed?',
        answer: 'Field equipment includes prefabricated steel bridges, bridge components, containerized medical systems, intelligent mobile cabin hospitals, smart electronic sentinels, radar-vision systems, EO/IR PTZ cameras, thermal domes, and HD laser cameras.',
      },
    ],
    linksTitle: 'Related product pages',
    links: [
      { label: 'Drone accessories and UAV components', href: '/accessories' },
      { label: 'Industrial UAV solutions', href: '/solutions' },
      { label: 'Product inquiry', href: '/contact' },
    ],
  },
  es: {
    eyebrow: 'Gama de productos',
    title: 'Sistemas UAV industriales, equipos de monitoreo, accesorios y equipos de campo',
    intro: [
      'Las familias de productos N-TET incluyen plataformas UAV industriales, equipos de monitoreo de baja altitud, sistemas de inspección de seguridad, materiales de ingeniería, equipos médicos de campo, accesorios para drones y componentes UAV.',
      'Las páginas de producto muestran tipo de producto, modelo, carga útil, autonomía, radio operativo, sensor, enlace de datos, módulo de energía, accesorios compatibles y repuestos disponibles cuando los datos de origen los incluyen.',
    ],
    cards: [
      {
        title: 'Plataformas UAV',
        body: 'Incluye UAV multirrotor, UAV VTOL de ala fija, UAV cautivos, UAV de comunicación de emergencia, UAV de iluminación, UAV de extinción de incendios, UAV de inspección y UAV de monitoreo de recursos hídricos.',
      },
      {
        title: 'Equipos de monitoreo e inspección',
        body: 'Incluye radares de detección de baja altitud, sistemas de detección RF, sistemas electroópticos de seguimiento, monitoreo Remote ID, escáneres X-ray, detectores de metales, inspectores de líquidos, detectores de explosivos y torniquetes.',
      },
      {
        title: 'Accesorios y equipos de campo',
        body: 'Incluye gimbals, motores UAV, enlaces de datos, hélices, motores, baterías, controles remotos, controladores de vuelo, puentes prefabricados de acero, componentes de puente, sistemas médicos en contenedor y hospitales móviles.',
      },
    ],
    faqTitle: 'Preguntas frecuentes de categorías de productos',
    faqs: [
      {
        question: '¿Qué tipos de UAV aparecen en el catálogo?',
        answer: 'La categoría UAV incluye UAV multirrotor, UAV VTOL de ala fija, UAV cautivos, UAV de comunicación de emergencia, UAV de iluminación, UAV de extinción de incendios, UAV de inspección y UAV de monitoreo de recursos hídricos.',
      },
      {
        question: '¿Qué equipos de monitoreo e inspección aparecen?',
        answer: 'El catálogo incluye radares de detección de baja altitud, sistemas de detección RF, sistemas electroópticos de seguimiento, monitoreo Remote ID, escáneres X-ray, detectores de metales, inspectores de líquidos, detectores de explosivos, detectores de radiación y torniquetes.',
      },
      {
        question: '¿Qué accesorios UAV aparecen?',
        answer: 'La categoría de accesorios incluye gimbals electroópticos, motores UAV, enlaces de datos UAV, hélices, motores, baterías, controles remotos y controladores de vuelo.',
      },
      {
        question: '¿Qué equipos de campo aparecen?',
        answer: 'Los equipos de campo incluyen puentes prefabricados de acero, componentes de puente, sistemas médicos en contenedor, hospitales móviles, centinelas electrónicos, sistemas radar-visión, cámaras EO/IR PTZ, domos térmicos y cámaras láser HD.',
      },
    ],
    linksTitle: 'Páginas de productos relacionadas',
    links: [
      { label: 'Accesorios para drones y componentes UAV', href: '/accessories' },
      { label: 'Soluciones UAV industriales', href: '/solutions' },
      { label: 'Consulta de producto', href: '/contact' },
    ],
  },
  ru: {
    eyebrow: 'Линейка продуктов',
    title: 'Промышленные БПЛА, оборудование мониторинга, аксессуары и полевое оборудование',
    intro: [
      'Линейки N-TET включают промышленные платформы БПЛА, оборудование мониторинга низкой высоты, системы досмотра, инженерные материалы, полевое медицинское оборудование, аксессуары для дронов и компоненты БПЛА.',
      'Страницы продуктов показывают тип продукта, модель, полезную нагрузку, автономность, рабочий радиус, датчик, канал данных, модуль питания, совместимые аксессуары и доступные запасные части, если эти данные есть в источнике.',
    ],
    cards: [
      {
        title: 'Платформы БПЛА',
        body: 'Включает мультироторные БПЛА, БПЛА VTOL, привязные БПЛА, БПЛА экстренной связи, осветительные БПЛА, пожарные БПЛА, инспекционные БПЛА и БПЛА мониторинга водных ресурсов.',
      },
      {
        title: 'Оборудование мониторинга и досмотра',
        body: 'Включает низковысотные радары обнаружения, RF-системы обнаружения, электрооптические системы сопровождения, мониторинг Remote ID, X-ray сканеры багажа, металлодетекторы, инспекторы жидкостей, детекторы взрывчатых веществ и турникеты.',
      },
      {
        title: 'Аксессуары и полевое оборудование',
        body: 'Включает подвесы, двигатели БПЛА, каналы данных, пропеллеры, моторы, аккумуляторы, пульты управления, полетные контроллеры, сборные стальные мосты, компоненты мостов, контейнерные медицинские системы и мобильные госпитали.',
      },
    ],
    faqTitle: 'FAQ по категориям продуктов',
    faqs: [
      {
        question: 'Какие типы БПЛА указаны в каталоге?',
        answer: 'Категория БПЛА включает мультироторные БПЛА, БПЛА VTOL, привязные БПЛА, БПЛА экстренной связи, осветительные БПЛА, пожарные БПЛА, инспекционные БПЛА и БПЛА мониторинга водных ресурсов.',
      },
      {
        question: 'Какое оборудование мониторинга и досмотра указано?',
        answer: 'Каталог включает низковысотные радары обнаружения, RF-системы обнаружения, электрооптические системы сопровождения, мониторинг Remote ID, X-ray сканеры, металлодетекторы, инспекторы жидкостей, детекторы взрывчатых веществ, радиационные детекторы и турникеты.',
      },
      {
        question: 'Какие аксессуары БПЛА указаны?',
        answer: 'Категория аксессуаров включает электрооптические подвесы, двигатели БПЛА, каналы данных БПЛА, пропеллеры, моторы, аккумуляторы, пульты управления и полетные контроллеры.',
      },
      {
        question: 'Какие категории полевого оборудования указаны?',
        answer: 'Полевое оборудование включает сборные стальные мосты, компоненты мостов, контейнерные медицинские системы, мобильные госпитали, электронные посты, системы радар-оптика, EO/IR PTZ камеры, тепловизионные купольные камеры и HD лазерные камеры.',
      },
    ],
    linksTitle: 'Связанные страницы продуктов',
    links: [
      { label: 'Аксессуары и компоненты БПЛА', href: '/accessories' },
      { label: 'Промышленные решения БПЛА', href: '/solutions' },
      { label: 'Запрос по продукту', href: '/contact' },
    ],
  },
  ar: {
    eyebrow: 'نطاق المنتجات',
    title: 'أنظمة UAV الصناعية ومعدات المراقبة والملحقات والمعدات الميدانية',
    intro: [
      'تغطي عائلات منتجات N-TET منصات UAV الصناعية، ومعدات مراقبة الارتفاع المنخفض، وأنظمة الفحص الأمني، ومواد الهندسة، والمعدات الطبية الميدانية، وملحقات الطائرات بدون طيار، ومكونات UAV.',
      'تعرض صفحات المنتجات نوع المنتج والطراز والحمولة ومدة الطيران ونطاق التشغيل والمستشعر ورابط البيانات ووحدة الطاقة والملحقات المتوافقة وقطع الغيار المتاحة عندما تتوفر هذه البيانات في المصدر.',
    ],
    cards: [
      {
        title: 'منصات UAV',
        body: 'تشمل UAV متعددة الدوارات، وUAV ذات الإقلاع العمودي، وUAV المربوطة، وUAV للاتصالات الطارئة، وUAV للإضاءة، وUAV لمكافحة الحرائق، وUAV للتفتيش، وUAV لمراقبة الموارد المائية.',
      },
      {
        title: 'معدات المراقبة والفحص',
        body: 'تشمل رادارات كشف الارتفاع المنخفض، وأنظمة كشف RF، وأنظمة التتبع الكهروبصرية، ومراقبة Remote ID، وأجهزة X-ray للأمتعة، وكواشف المعادن، وأجهزة فحص السوائل، وكواشف المتفجرات، وبوابات المرور.',
      },
      {
        title: 'الملحقات والمعدات الميدانية',
        body: 'تشمل الحوامل، ومحركات UAV، وروابط البيانات، والمراوح، والمحركات، والبطاريات، ووحدات التحكم عن بعد، ووحدات التحكم بالطيران، والجسور الفولاذية الجاهزة، ومكونات الجسور، والأنظمة الطبية الحاوية، والمستشفيات المتنقلة.',
      },
    ],
    faqTitle: 'الأسئلة الشائعة لفئات المنتجات',
    faqs: [
      {
        question: 'ما أنواع UAV المعروضة في الكتالوج؟',
        answer: 'تشمل فئة UAV الطائرات متعددة الدوارات، وUAV ذات الإقلاع العمودي، وUAV المربوطة، وUAV للاتصالات الطارئة، وUAV للإضاءة، وUAV لمكافحة الحرائق، وUAV للتفتيش، وUAV لمراقبة الموارد المائية.',
      },
      {
        question: 'ما معدات المراقبة والفحص المعروضة؟',
        answer: 'يشمل الكتالوج رادارات كشف الارتفاع المنخفض، وأنظمة كشف RF، وأنظمة التتبع الكهروبصرية، ومراقبة Remote ID، وأجهزة X-ray، وكواشف المعادن، وأجهزة فحص السوائل، وكواشف المتفجرات، وكواشف الإشعاع، وبوابات المرور.',
      },
      {
        question: 'ما ملحقات UAV المعروضة؟',
        answer: 'تشمل فئة الملحقات الحوامل الكهروبصرية، ومحركات UAV، وروابط بيانات UAV، والمراوح، والمحركات، والبطاريات، ووحدات التحكم عن بعد، ووحدات التحكم بالطيران.',
      },
      {
        question: 'ما فئات المعدات الميدانية المعروضة؟',
        answer: 'تشمل المعدات الميدانية الجسور الفولاذية الجاهزة، ومكونات الجسور، والأنظمة الطبية الحاوية، والمستشفيات المتنقلة، والحراس الإلكترونيين، وأنظمة الرادار والرؤية، وكاميرات EO/IR PTZ، والقباب الحرارية، وكاميرات الليزر HD.',
      },
    ],
    linksTitle: 'صفحات منتجات ذات صلة',
    links: [
      { label: 'ملحقات ومكونات UAV', href: '/accessories' },
      { label: 'حلول UAV الصناعية', href: '/solutions' },
      { label: 'استفسار عن المنتج', href: '/contact' },
    ],
  },
};

function getProductSummary(locale: string) {
  if (locale === 'es') {
    return 'Explore plataformas UAV industriales, equipos de monitoreo, sistemas de inspección, materiales de ingeniería, equipos médicos de campo, accesorios para drones y componentes UAV por categoría de producto.';
  }

  if (locale === 'ru') {
    return 'Просмотрите промышленные БПЛА, оборудование мониторинга, системы досмотра, инженерные материалы, полевое медицинское оборудование, аксессуары и компоненты БПЛА по категории продукта.';
  }

  if (locale === 'ar') {
    return 'استعرض منصات UAV الصناعية ومعدات المراقبة وأنظمة الفحص ومواد الهندسة والمعدات الطبية الميدانية وملحقات الطائرات بدون طيار ومكونات UAV حسب فئة المنتج.';
  }

  return 'Explore industrial UAV platforms, monitoring equipment, security screening systems, engineering materials, field medical equipment, drone accessories, and UAV components by product category.';
}

export default function ProductCenterSeoContent({
  locale,
  compact = false,
  placement = 'intro',
}: {
  locale: string;
  compact?: boolean;
  placement?: ProductContentPlacement;
}) {
  const content = CONTENT[locale] || CONTENT.en;
  const sectionPadding = compact ? '30px 16px' : '58px 0 0';
  const cardGrid = compact ? '1fr' : 'repeat(3, minmax(0, 1fr))';
  const summary = getProductSummary(locale);

  if (placement === 'faq') {
    return <FaqListSection title={content.faqTitle} items={content.faqs} compact={compact} />;
  }

  return (
    <section style={{ padding: sectionPadding, background: '#fff' }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: compact ? 0 : '0 20px' }}>
        <div style={{ maxWidth: '940px', margin: compact ? '0' : '0 auto', textAlign: compact ? 'left' : 'center' }}>
          <h2 style={{ margin: 0, color: '#172033', fontSize: compact ? '2.4rem' : '3.4rem', lineHeight: 1.18, fontWeight: 900 }}>
            {content.title}
          </h2>
          <p style={{ margin: compact ? '16px 0 0' : '22px auto 0', maxWidth: '820px', color: '#40506a', fontSize: compact ? '1.55rem' : '1.75rem', lineHeight: 1.72 }}>
            {summary}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: cardGrid, gap: compact ? '14px' : '22px', marginTop: compact ? '26px' : '38px' }}>
          {content.cards.map((card) => (
            <div key={card.title} style={{ border: '1px solid #e3eaf3', padding: compact ? '18px' : '24px', background: '#f8fafc' }}>
              <h3 style={{ margin: '0 0 10px', color: '#1f2a44', fontSize: compact ? '1.7rem' : '2rem', lineHeight: 1.3, fontWeight: 850 }}>
                {card.title}
              </h3>
              <p style={{ margin: 0, color: '#566174', fontSize: compact ? '1.45rem' : '1.6rem', lineHeight: 1.7 }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

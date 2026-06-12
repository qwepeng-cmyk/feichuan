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
    eyebrow: 'Selection guide',
    title: 'Industrial UAV Systems, Monitoring Equipment, and Project Fit',
    intro: [
      'Industrial UAV systems should be selected by mission, payload, endurance, data workflow, and site constraints. N-TET groups UAV platforms, low-altitude monitoring equipment, inspection drones, screening systems, engineering materials, and field medical equipment so project teams can compare equipment by operational scenario rather than by catalog name alone.',
      'For procurement teams, the useful starting point is the field task: utility inspection, emergency response, water conservancy monitoring, public-site screening, perimeter observation, or temporary infrastructure support. Each product family below links to equipment that can be matched with solution pages, case evidence, and a project quotation workflow.',
    ],
    cards: [
      {
        title: 'Mission and application fit',
        body: 'Match UAV inspection drone options to power-line patrol, substation inspection, search and rescue, emergency communication, lighting, firefighting support, and water-resource monitoring tasks.',
      },
      {
        title: 'Platform and payload selection',
        body: 'Compare multi-rotor UAVs, VTOL fixed-wing UAVs, tethered UAVs, payload capacity, endurance, data links, gimbals, and field deployment requirements before requesting a quote.',
      },
      {
        title: 'Operational support evidence',
        body: 'Use related solution pages and deployment cases to check workflow fit, recommended equipment, operating environment, and post-deployment support expectations.',
      },
    ],
    faqTitle: 'Product Selection FAQ',
    faqs: [
      {
        question: 'How should a team choose between UAV platforms and monitoring equipment?',
        answer: 'Start with the site task and response workflow. A utility inspection team usually prioritizes route planning, imaging payloads, endurance, and inspection records, while a low-altitude monitoring project prioritizes sensor coverage, event records, and command-center integration.',
      },
      {
        question: 'What information is needed for an industrial UAV quote?',
        answer: 'Useful quotation inputs include mission type, operating area, expected endurance, payload or sensor needs, communication distance, deployment frequency, and whether the project needs training, spare parts, or integration with existing systems.',
      },
      {
        question: 'Can products be matched with solution pages and cases?',
        answer: 'Yes. Product pages should be reviewed together with solution workflows and deployment cases so buyers can see how equipment supports inspection, emergency response, monitoring, or screening operations.',
      },
      {
        question: 'When is a custom configuration needed?',
        answer: 'Custom configuration is usually needed when a project has unusual payload requirements, long endurance targets, harsh field conditions, multi-site deployment, or a need to combine UAV, monitoring, and screening equipment in one workflow.',
      },
    ],
    linksTitle: 'Related product planning pages',
    links: [
      { label: 'UAV inspection solutions for field teams', href: '/solutions' },
      { label: 'UAV inspection cases and deployment references', href: '/cases' },
      { label: 'Industrial UAV quote and project consultation', href: '/contact' },
    ],
  },
  es: {
    eyebrow: 'Guía de selección',
    title: 'Sistemas UAV industriales, equipos de monitoreo y ajuste al proyecto',
    intro: [
      'Los sistemas UAV industriales deben seleccionarse según misión, carga útil, autonomía, flujo de datos y condiciones del sitio. N-TET organiza plataformas UAV, equipos de monitoreo de baja altitud, drones de inspección, sistemas de inspección de seguridad, materiales de ingeniería y equipos médicos de campaña para comparar productos por escenario operativo.',
      'Para equipos de compra, el punto de partida es la tarea de campo: inspección de servicios públicos, respuesta de emergencia, monitoreo de recursos hídricos, inspección de sitios públicos, observación perimetral o soporte temporal de infraestructura. Cada familia de productos se puede revisar junto con soluciones, casos y consulta de cotización.',
    ],
    cards: [
      {
        title: 'Ajuste por misión y aplicación',
        body: 'Relacione drones de inspección UAV con patrullaje de líneas eléctricas, inspección de subestaciones, búsqueda y rescate, comunicación de emergencia, iluminación, apoyo contra incendios y monitoreo hídrico.',
      },
      {
        title: 'Selección de plataforma y carga útil',
        body: 'Compare UAV multirrotor, UAV VTOL de ala fija, UAV cautivo, capacidad de carga, autonomía, enlaces de datos, gimbals y requisitos de despliegue antes de solicitar cotización.',
      },
      {
        title: 'Evidencia de soporte operativo',
        body: 'Use páginas de soluciones y casos de despliegue para revisar flujo de trabajo, equipos recomendados, entorno operativo y expectativas de soporte posterior.',
      },
    ],
    faqTitle: 'Preguntas frecuentes de selección de productos',
    faqs: [
      {
        question: '¿Cómo elegir entre plataformas UAV y equipos de monitoreo?',
        answer: 'Empiece por la tarea del sitio y el flujo de respuesta. Un equipo de inspección suele priorizar rutas, carga de imagen, autonomía y registros; un proyecto de monitoreo de baja altitud prioriza cobertura, registros de eventos e integración con centro de mando.',
      },
      {
        question: '¿Qué datos ayudan a preparar una cotización UAV industrial?',
        answer: 'Conviene definir tipo de misión, área de operación, autonomía esperada, sensores o carga útil, distancia de comunicación, frecuencia de despliegue y necesidades de capacitación, repuestos o integración.',
      },
      {
        question: '¿Los productos se pueden relacionar con soluciones y casos?',
        answer: 'Sí. Las páginas de productos deben revisarse con soluciones y casos para ver cómo el equipo apoya inspección, respuesta de emergencia, monitoreo o inspección de seguridad.',
      },
      {
        question: '¿Cuándo se necesita configuración personalizada?',
        answer: 'Suele ser necesaria cuando hay cargas útiles especiales, objetivos de larga autonomía, condiciones de campo difíciles, despliegues en varios sitios o combinación de UAV, monitoreo y equipos de inspección.',
      },
    ],
    linksTitle: 'Páginas relacionadas para planificación',
    links: [
      { label: 'Soluciones de inspección UAV para equipos de campo', href: '/solutions' },
      { label: 'Casos UAV y referencias de despliegue', href: '/cases' },
      { label: 'Cotización UAV industrial y consulta de proyecto', href: '/contact' },
    ],
  },
  ru: {
    eyebrow: 'Руководство по выбору',
    title: 'промышленные БПЛА, оборудование мониторинга и соответствие проекту',
    intro: [
      'промышленные БПЛА следует выбирать по задаче, полезной нагрузке, времени полета, рабочему процессу данных и условиям площадки. N-TET группирует платформы БПЛА, оборудование мониторинга низкой высоты, инспекционные дроны, системы досмотра, инженерные материалы и полевое медицинское оборудование по практическим сценариям.',
      'Для закупочной команды отправная точка - полевая задача: инспекция инфраструктуры, аварийное реагирование, мониторинг водных объектов, досмотр общественных площадок, периметральное наблюдение или временная инфраструктурная поддержка. Каждая группа продуктов связана с решениями, кейсами и консультацией по проекту.',
    ],
    cards: [
      {
        title: 'Соответствие миссии и применению',
        body: 'Сопоставьте инспекционные БПЛА с патрулированием ЛЭП, инспекцией подстанций, поиском и спасением, аварийной связью, освещением, пожарной поддержкой и мониторингом водных ресурсов.',
      },
      {
        title: 'Выбор платформы и нагрузки',
        body: 'Сравните мультироторные БПЛА, БПЛА VTOL, привязные БПЛА, грузоподъемность, автономность, каналы данных, подвесы и требования к развертыванию перед запросом КП.',
      },
      {
        title: 'Операционные доказательства',
        body: 'Используйте страницы решений и кейсы, чтобы проверить рабочий процесс, рекомендуемое оборудование, условия эксплуатации и ожидания по поддержке после внедрения.',
      },
    ],
    faqTitle: 'FAQ по выбору продуктов',
    faqs: [
      {
        question: 'Как выбрать между платформами БПЛА и оборудованием мониторинга?',
        answer: 'Начните с задачи площадки и рабочего процесса реагирования. Инспекционная команда обычно оценивает маршруты, полезную нагрузку, автономность и записи инспекции, а проект мониторинга низкой высоты - покрытие сенсоров, записи событий и интеграцию с центром управления.',
      },
      {
        question: 'Какие данные нужны для запроса КП на промышленные БПЛА?',
        answer: 'Полезно указать тип миссии, район работы, ожидаемую автономность, датчики или полезную нагрузку, дальность связи, частоту развертывания, потребность в обучении, запасных частях или интеграции.',
      },
      {
        question: 'Можно ли сопоставить продукты со страницами решений и кейсами?',
        answer: 'Да. Страницы продуктов следует рассматривать вместе с решениями и кейсами, чтобы увидеть, как оборудование поддерживает инспекцию, аварийное реагирование, мониторинг или досмотровые операции.',
      },
      {
        question: 'Когда нужна индивидуальная конфигурация?',
        answer: 'Она обычно требуется при нестандартной полезной нагрузке, долгой автономности, сложных полевых условиях, нескольких площадках или объединении БПЛА, мониторинга и досмотрового оборудования в один процесс.',
      },
    ],
    linksTitle: 'Связанные страницы для планирования',
    links: [
      { label: 'Решения инспекции БПЛА для полевых команд', href: '/solutions' },
      { label: 'Кейсы БПЛА и примеры развертывания', href: '/cases' },
      { label: 'Запрос КП на промышленные БПЛА и консультация', href: '/contact' },
    ],
  },
  ar: {
    eyebrow: 'دليل الاختيار',
    title: 'أنظمة UAV الصناعية ومعدات المراقبة وملاءمة المشروع',
    intro: [
      'يجب اختيار أنظمة UAV الصناعية حسب المهمة والحمولة ومدة الطيران وسير عمل البيانات وقيود الموقع. تنظم N-TET منصات UAV ومعدات مراقبة الارتفاع المنخفض وطائرات التفتيش وأنظمة الفحص ومواد الهندسة ومعدات الدعم الميداني حسب سيناريو التشغيل.',
      'بالنسبة لفرق الشراء، نقطة البداية هي المهمة الميدانية: تفتيش المرافق، الاستجابة للطوارئ، مراقبة الموارد المائية، فحص المواقع العامة، مراقبة المحيط أو دعم البنية التحتية المؤقتة.',
    ],
    cards: [
      {
        title: 'ملاءمة المهمة والتطبيق',
        body: 'طابق خيارات طائرات UAV للتفتيش مع دوريات خطوط الكهرباء، تفتيش المحطات الفرعية، البحث والإنقاذ، الاتصالات الطارئة، الإضاءة، دعم مكافحة الحرائق ومراقبة المياه.',
      },
      {
        title: 'اختيار المنصة والحمولة',
        body: 'قارن UAV متعددة الدوارات، UAV ذات الإقلاع العمودي، UAV المربوطة، الحمولة، مدة الطيران، روابط البيانات، الحوامل ومتطلبات النشر الميداني قبل طلب عرض السعر.',
      },
      {
        title: 'أدلة الدعم التشغيلي',
        body: 'استخدم صفحات الحلول وحالات النشر للتحقق من سير العمل والمعدات الموصى بها وبيئة التشغيل وتوقعات الدعم بعد النشر.',
      },
    ],
    faqTitle: 'الأسئلة الشائعة لاختيار المنتجات',
    faqs: [
      {
        question: 'كيف تختار الفرق بين منصات UAV ومعدات المراقبة؟',
        answer: 'ابدأ بمهمة الموقع وسير الاستجابة. فريق التفتيش يركز عادة على تخطيط المسار وحمولة التصوير ومدة الطيران وسجلات التفتيش، بينما يركز مشروع مراقبة الارتفاع المنخفض على تغطية المستشعرات وسجلات الأحداث والتكامل مع مركز القيادة.',
      },
      {
        question: 'ما المعلومات المطلوبة لعرض سعر UAV صناعي؟',
        answer: 'تشمل مدخلات عرض السعر نوع المهمة، منطقة التشغيل، مدة الطيران المطلوبة، احتياجات الحمولة أو المستشعر، مسافة الاتصال، تكرار النشر، وهل يحتاج المشروع إلى تدريب أو قطع غيار أو تكامل مع أنظمة قائمة.',
      },
      {
        question: 'هل يمكن ربط المنتجات بصفحات الحلول والحالات؟',
        answer: 'نعم. يجب مراجعة صفحات المنتجات مع سير عمل الحلول وحالات النشر حتى يرى المشتري كيف تدعم المعدات التفتيش أو الاستجابة الطارئة أو المراقبة أو عمليات الفحص.',
      },
      {
        question: 'متى تكون التهيئة المخصصة مطلوبة؟',
        answer: 'تكون التهيئة المخصصة مطلوبة غالبا عند وجود حمولة خاصة، أهداف مدة طيران طويلة، ظروف ميدانية قاسية، نشر متعدد المواقع، أو الحاجة إلى جمع UAV والمراقبة ومعدات الفحص في سير عمل واحد.',
      },
    ],
    linksTitle: 'صفحات تخطيط ذات صلة',
    links: [
      { label: 'حلول تفتيش UAV للفرق الميدانية', href: '/solutions' },
      { label: 'حالات UAV ومراجع النشر', href: '/cases' },
      { label: 'عرض سعر UAV صناعي واستشارة مشروع', href: '/contact' },
    ],
  },
};

function getProductSummary(locale: string) {
  if (locale === 'es') {
    return 'Compare sistemas UAV industriales por ajuste de mision, carga util, autonomia, flujo de monitoreo y soporte en campo antes de seleccionar equipos para un proyecto industrial o de emergencia.';
  }

  if (locale === 'ru') {
    return 'Compare industrial UAV systems by mission fit, payload, endurance, monitoring workflow, and field support before selecting equipment for an infrastructure or emergency project.';
  }

  if (locale === 'ar') {
    return 'قارن أنظمة UAV الصناعية حسب ملاءمة المهمة والحمولة ومدة الطيران وسير المراقبة والدعم الميداني قبل اختيار المعدات لمشروع بنية تحتية أو طوارئ.';
  }

  return 'Compare industrial UAV systems by mission fit, payload, endurance, monitoring workflow, and field support before selecting equipment for an infrastructure or emergency project.';
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

import FaqListSection from '@/components/common/FaqListSection';

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

type AccessoryContentPlacement = 'intro' | 'faq';

function getAccessorySummary(locale: string) {
  if (locale === 'es') {
    return 'Explore accesorios para drones y componentes UAV, incluidos gimbals, motores, enlaces de datos, hélices, baterías, controles remotos y controladores de vuelo.';
  }

  if (locale === 'ru') {
    return 'Просмотрите аксессуары и компоненты БПЛА: подвесы, двигатели, каналы данных, пропеллеры, аккумуляторы, пульты управления и полетные контроллеры.';
  }

  if (locale === 'ar') {
    return 'استعرض ملحقات ومكونات UAV، بما في ذلك الحوامل والمحركات وروابط البيانات والمراوح والبطاريات ووحدات التحكم عن بعد ووحدات التحكم بالطيران.';
  }

  return 'Explore drone accessories and UAV components, including gimbals, engines, data links, propellers, motors, batteries, remote controllers, and flight controllers.';
}

const CONTENT: Record<string, AccessoryContent> = {
  en: {
    eyebrow: 'Accessory catalog',
    title: 'Drone Accessories and UAV Components for Industrial Platforms',
    intro: [
      'N-TET accessory categories include electro-optical gimbals, UAV engines, UAV data links, propellers, motors, batteries, remote controllers, and flight controllers.',
      'Accessory pages list product name, category, model, image, key parameters, product description, and technical specifications where source data is available.',
    ],
    cards: [
      {
        title: 'Gimbals and imaging components',
        body: 'Includes electro-optical gimbals, optical pods, visible-light payloads, thermal payloads, laser rangefinder modules, mounting interfaces, and related imaging accessories.',
      },
      {
        title: 'Propulsion and power components',
        body: 'Includes UAV engines, motors, propellers, batteries, power modules, and spare propulsion parts listed by product category and available specifications.',
      },
      {
        title: 'Control and communication components',
        body: 'Includes UAV data links, remote controllers, flight controllers, antennas, telemetry modules, and related command or transmission accessories.',
      },
    ],
    faqTitle: 'Drone Accessories Product FAQ',
    faqs: [
      {
        question: 'Which drone accessory categories are listed?',
        answer: 'The catalog includes electro-optical gimbals, UAV engines, UAV data links, propellers, motors, batteries, remote controllers, and flight controllers.',
      },
      {
        question: 'Which parameters can appear on an accessory page?',
        answer: 'Accessory pages can show model, product category, weight, voltage, interface, communication distance, payload type, power type, size, image, description, and technical specifications when the source data provides them.',
      },
      {
        question: 'Which UAV components are related to control and communication?',
        answer: 'Control and communication components include UAV data links, remote controllers, flight controllers, antennas, telemetry modules, and transmission accessories.',
      },
    ],
    linksTitle: 'Related product pages',
    links: [
      { label: 'Industrial UAV systems product center', href: '/products' },
      { label: 'Drone accessories inquiry', href: '/contact' },
      { label: 'Industrial UAV solutions', href: '/solutions' },
    ],
  },
  es: {
    eyebrow: 'Catálogo de accesorios',
    title: 'Accesorios para drones y componentes UAV para plataformas industriales',
    intro: [
      'Las categorías de accesorios N-TET incluyen gimbals electro-ópticos, motores UAV, enlaces de datos UAV, hélices, motores, baterías, controles remotos y controladores de vuelo.',
      'Las páginas de accesorios muestran nombre del producto, categoría, modelo, imagen, parámetros principales, descripción y especificaciones técnicas cuando los datos de origen están disponibles.',
    ],
    cards: [
      {
        title: 'Gimbals y componentes de imagen',
        body: 'Incluye gimbals electro-ópticos, pods ópticos, cargas visibles, cargas térmicas, módulos láser de medición, interfaces de montaje y accesorios de imagen.',
      },
      {
        title: 'Propulsión y energía',
        body: 'Incluye motores UAV, motores eléctricos, hélices, baterías, módulos de energía y piezas de propulsión listadas por categoría y especificaciones disponibles.',
      },
      {
        title: 'Control y comunicación',
        body: 'Incluye enlaces de datos UAV, controles remotos, controladores de vuelo, antenas, módulos de telemetría y accesorios de transmisión.',
      },
    ],
    faqTitle: 'FAQ de productos de accesorios',
    faqs: [
      {
        question: '¿Qué categorías de accesorios para drones aparecen?',
        answer: 'El catálogo incluye gimbals electro-ópticos, motores UAV, enlaces de datos UAV, hélices, motores, baterías, controles remotos y controladores de vuelo.',
      },
      {
        question: '¿Qué parámetros puede mostrar una página de accesorio?',
        answer: 'Una página de accesorio puede mostrar modelo, categoría, peso, voltaje, interfaz, distancia de comunicación, tipo de carga útil, tipo de energía, tamaño, imagen, descripción y especificaciones técnicas cuando los datos de origen los incluyen.',
      },
      {
        question: '¿Qué componentes UAV pertenecen a control y comunicación?',
        answer: 'Los componentes de control y comunicación incluyen enlaces de datos UAV, controles remotos, controladores de vuelo, antenas, módulos de telemetría y accesorios de transmisión.',
      },
    ],
    linksTitle: 'Páginas de productos relacionadas',
    links: [
      { label: 'Centro de productos de sistemas UAV industriales', href: '/products' },
      { label: 'Consulta de accesorios para drones', href: '/contact' },
      { label: 'Soluciones UAV industriales', href: '/solutions' },
    ],
  },
  ru: {
    eyebrow: 'Каталог аксессуаров',
    title: 'Аксессуары для дронов и компоненты БПЛА для промышленных платформ',
    intro: [
      'Категории аксессуаров N-TET включают электрооптические подвесы, двигатели БПЛА, каналы данных БПЛА, пропеллеры, моторы, аккумуляторы, пульты управления и полетные контроллеры.',
      'Страницы аксессуаров показывают название продукта, категорию, модель, изображение, ключевые параметры, описание продукта и технические характеристики, если эти данные есть в источнике.',
    ],
    cards: [
      {
        title: 'Подвесы и компоненты изображения',
        body: 'Включает электрооптические подвесы, оптические модули, видимые камеры, тепловизионные нагрузки, лазерные дальномеры, крепления и аксессуары для съемки.',
      },
      {
        title: 'Тяга и питание',
        body: 'Включает двигатели БПЛА, моторы, пропеллеры, аккумуляторы, модули питания и запасные детали тяговой системы по категории и доступным характеристикам.',
      },
      {
        title: 'Управление и связь',
        body: 'Включает каналы данных БПЛА, пульты управления, полетные контроллеры, антенны, телеметрические модули и аксессуары передачи данных.',
      },
    ],
    faqTitle: 'FAQ по продуктам аксессуаров',
    faqs: [
      {
        question: 'Какие категории аксессуаров для дронов указаны?',
        answer: 'Каталог включает электрооптические подвесы, двигатели БПЛА, каналы данных БПЛА, пропеллеры, моторы, аккумуляторы, пульты управления и полетные контроллеры.',
      },
      {
        question: 'Какие параметры может показывать страница аксессуара?',
        answer: 'Страница аксессуара может показывать модель, категорию, вес, напряжение, интерфейс, дальность связи, тип полезной нагрузки, тип питания, размер, изображение, описание и технические характеристики, если эти данные есть в источнике.',
      },
      {
        question: 'Какие компоненты БПЛА относятся к управлению и связи?',
        answer: 'К компонентам управления и связи относятся каналы данных БПЛА, пульты управления, полетные контроллеры, антенны, телеметрические модули и аксессуары передачи данных.',
      },
    ],
    linksTitle: 'Связанные страницы продуктов',
    links: [
      { label: 'Центр продуктов промышленных БПЛА', href: '/products' },
      { label: 'Запрос по аксессуарам для дронов', href: '/contact' },
      { label: 'Промышленные решения БПЛА', href: '/solutions' },
    ],
  },
  ar: {
    eyebrow: 'كتالوج الملحقات',
    title: 'ملحقات الطائرات بدون طيار ومكونات UAV للمنصات الصناعية',
    intro: [
      'تشمل فئات ملحقات N-TET الحوامل الكهروبصرية، ومحركات UAV، وروابط بيانات UAV، والمراوح، والمحركات، والبطاريات، ووحدات التحكم عن بعد، ووحدات التحكم بالطيران.',
      'تعرض صفحات الملحقات اسم المنتج والفئة والطراز والصورة والمعلمات الرئيسية ووصف المنتج والمواصفات الفنية عندما تتوفر هذه البيانات في المصدر.',
    ],
    cards: [
      {
        title: 'الحوامل ومكونات التصوير',
        body: 'تشمل الحوامل الكهروبصرية، والوحدات البصرية، وحمولات الضوء المرئي، والحمولات الحرارية، ووحدات قياس المسافة بالليزر، وواجهات التثبيت، وملحقات التصوير.',
      },
      {
        title: 'الدفع والطاقة',
        body: 'تشمل محركات UAV، والمحركات الكهربائية، والمراوح، والبطاريات، ووحدات الطاقة، وقطع الدفع الاحتياطية حسب فئة المنتج والمواصفات المتاحة.',
      },
      {
        title: 'التحكم والاتصال',
        body: 'تشمل روابط بيانات UAV، ووحدات التحكم عن بعد، ووحدات التحكم بالطيران، والهوائيات، ووحدات القياس عن بعد، وملحقات الإرسال.',
      },
    ],
    faqTitle: 'الأسئلة الشائعة لمنتجات الملحقات',
    faqs: [
      {
        question: 'ما فئات ملحقات الطائرات بدون طيار المعروضة؟',
        answer: 'يشمل الكتالوج الحوامل الكهروبصرية، ومحركات UAV، وروابط بيانات UAV، والمراوح، والمحركات، والبطاريات، ووحدات التحكم عن بعد، ووحدات التحكم بالطيران.',
      },
      {
        question: 'ما المعلمات التي يمكن أن تعرضها صفحة الملحق؟',
        answer: 'يمكن أن تعرض صفحة الملحق الطراز، والفئة، والوزن، والجهد، والواجهة، ومسافة الاتصال، ونوع الحمولة، ونوع الطاقة، والحجم، والصورة، والوصف، والمواصفات الفنية عندما تتوفر في المصدر.',
      },
      {
        question: 'ما مكونات UAV المرتبطة بالتحكم والاتصال؟',
        answer: 'تشمل مكونات التحكم والاتصال روابط بيانات UAV، ووحدات التحكم عن بعد، ووحدات التحكم بالطيران، والهوائيات، ووحدات القياس عن بعد، وملحقات الإرسال.',
      },
    ],
    linksTitle: 'صفحات منتجات ذات صلة',
    links: [
      { label: 'مركز منتجات أنظمة UAV الصناعية', href: '/products' },
      { label: 'استفسار عن ملحقات الطائرات بدون طيار', href: '/contact' },
      { label: 'حلول UAV الصناعية', href: '/solutions' },
    ],
  },
};

export default function AccessoryCenterSeoContent({
  locale,
  compact = false,
  placement = 'intro',
}: {
  locale: string;
  compact?: boolean;
  placement?: AccessoryContentPlacement;
}) {
  const content = CONTENT[locale] || CONTENT.en;
  const cardGrid = compact ? '1fr' : 'repeat(3, minmax(0, 1fr))';
  const summary = getAccessorySummary(locale);

  if (placement === 'faq') {
    return <FaqListSection title={content.faqTitle} items={content.faqs} compact={compact} />;
  }

  return (
    <section style={{ padding: compact ? '30px 16px' : '58px 0 0', background: '#fff' }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: compact ? 0 : '0 20px' }}>
        <div style={{ maxWidth: '940px', margin: compact ? 0 : '0 auto', textAlign: compact ? 'left' : 'center' }}>
          <h2 style={{ margin: 0, color: '#172033', fontSize: compact ? '2.35rem' : '3.35rem', lineHeight: 1.18, fontWeight: 900 }}>
            {content.title}
          </h2>
          <p style={{ margin: compact ? '16px 0 0' : '18px auto 0', maxWidth: '780px', color: '#4b5563', fontSize: compact ? '1.5rem' : '1.68rem', lineHeight: 1.75 }}>
            {summary}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: cardGrid, gap: compact ? '14px' : '22px', marginTop: compact ? '26px' : '38px' }}>
          {content.cards.map((card) => (
            <div key={card.title} style={{ border: '1px solid #e3eaf3', padding: compact ? '18px' : '24px', background: '#f8fafc' }}>
              <h3 style={{ margin: '0 0 10px', color: '#1f2a44', fontSize: compact ? '1.65rem' : '1.95rem', lineHeight: 1.3, fontWeight: 850 }}>{card.title}</h3>
              <p style={{ margin: 0, color: '#566174', fontSize: compact ? '1.42rem' : '1.55rem', lineHeight: 1.7 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

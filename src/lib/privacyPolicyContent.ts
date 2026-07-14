import type { Locale } from '@/i18n/config';

export type PrivacyPolicySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  showEmail?: boolean;
};

export type PrivacyPolicyContent = {
  title: string;
  eyebrow: string;
  summary: string;
  homeLabel: string;
  contentsLabel: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  contactEmailLabel: string;
  sections: PrivacyPolicySection[];
};

const policies: Record<Locale, PrivacyPolicyContent> = {
  en: {
    title: 'Privacy Policy',
    eyebrow: 'Legal & Data Protection',
    summary:
      'This policy explains how N-TET collects, uses, stores, and shares personal information when you visit n-tet.com or contact our team.',
    homeLabel: 'Home',
    contentsLabel: 'On this page',
    lastUpdatedLabel: 'Last updated',
    lastUpdated: 'July 14, 2026',
    contactEmailLabel: 'Privacy contact',
    sections: [
      {
        id: 'scope',
        title: '1. Scope and who we are',
        paragraphs: [
          'This Privacy Policy applies to n-tet.com and the business communications initiated through this website. The website is operated by Beijing Non-traditional Equipment Technology Co., Ltd. (N-TET).',
        ],
      },
      {
        id: 'information',
        title: '2. Information we collect',
        paragraphs: ['We collect information in three main ways:'],
        bullets: [
          'Information you submit, such as your name, company, email address, phone or WhatsApp number, preferred contact method, inquiry type, and message.',
          'Technical and usage information, such as IP address, browser and device details, pages viewed, referring page, timestamps, and website interactions.',
          'Business communications you send to us by email, WhatsApp, inquiry form, or online chat.',
        ],
      },
      {
        id: 'use',
        title: '3. How we use information',
        bullets: [
          'Respond to inquiries and provide product information, quotations, documents, and project support.',
          'Operate, secure, troubleshoot, and improve the website and its forms.',
          'Measure website performance and understand which pages and services are useful to visitors.',
          'Maintain business records, prevent misuse, and meet legal or regulatory obligations.',
        ],
      },
      {
        id: 'cookies',
        title: '4. Cookies, analytics, and third-party services',
        paragraphs: [
          'Depending on the website settings in use, Google Analytics and Google Tag Manager may place cookies or use similar identifiers to measure visits and interactions. When online business chat is enabled, Zoosnet may process technical details and chat activity. WhatsApp processes information when you choose to contact us through its service.',
          'The website also uses limited browser session storage to avoid repeatedly showing the same automatic message prompt during one browsing session. Third-party services handle information under their own privacy terms and may process it in other countries or regions.',
        ],
      },
      {
        id: 'sharing',
        title: '5. Sharing and international transfers',
        paragraphs: [
          'We may share information with service providers that support hosting, analytics, email delivery, customer communications, and website operations; with authorities where disclosure is legally required; or as part of a business reorganization or transfer. We do not sell personal information.',
          'N-TET is based in China. Information submitted by international visitors may be processed in China and in locations where our service providers operate.',
        ],
      },
      {
        id: 'retention',
        title: '6. Retention and security',
        paragraphs: [
          'We keep personal information only for as long as reasonably necessary for the purposes described in this policy, including follow-up on inquiries, business records, security, and legal requirements. We use reasonable administrative and technical safeguards, but no internet transmission or storage system can be guaranteed completely secure.',
        ],
      },
      {
        id: 'choices',
        title: '7. Your choices and requests',
        paragraphs: [
          'You may decline to provide optional information, adjust cookie controls in your browser, or avoid third-party chat and messaging services. Subject to applicable law, you may ask us to access, correct, or delete personal information associated with you. We may need to verify your identity before completing a request.',
        ],
      },
      {
        id: 'children',
        title: '8. Children',
        paragraphs: [
          'This business-to-business website is not directed to children under 16, and we do not knowingly collect their personal information.',
        ],
      },
      {
        id: 'updates',
        title: '9. Changes to this policy',
        paragraphs: [
          'We may update this policy when our website, services, or legal obligations change. The date at the top of this page shows the latest revision.',
        ],
      },
      {
        id: 'contact',
        title: '10. Contact us',
        paragraphs: [
          'For privacy questions or requests, contact Beijing Non-traditional Equipment Technology Co., Ltd. at the email address below.',
        ],
        showEmail: true,
      },
    ],
  },
  ru: {
    title: 'Политика конфиденциальности',
    eyebrow: 'Правовая информация и защита данных',
    summary:
      'В этой политике описано, как N-TET собирает, использует, хранит и передает персональные данные при посещении n-tet.com или обращении к нашей команде.',
    homeLabel: 'Главная',
    contentsLabel: 'Содержание',
    lastUpdatedLabel: 'Последнее обновление',
    lastUpdated: '14 июля 2026 г.',
    contactEmailLabel: 'Контакт по вопросам конфиденциальности',
    sections: [
      {
        id: 'scope',
        title: '1. Область действия и сведения о компании',
        paragraphs: [
          'Настоящая Политика конфиденциальности применяется к сайту n-tet.com и деловой переписке, начатой через этот сайт. Оператор сайта — Beijing Non-traditional Equipment Technology Co., Ltd. (N-TET).',
        ],
      },
      {
        id: 'information',
        title: '2. Какие данные мы собираем',
        paragraphs: ['Мы получаем данные тремя основными способами:'],
        bullets: [
          'Данные, которые вы указываете: имя, компания, адрес электронной почты, номер телефона или WhatsApp, предпочтительный способ связи, тип запроса и текст сообщения.',
          'Технические данные и сведения об использовании: IP-адрес, браузер и устройство, просмотренные страницы, источник перехода, время посещения и действия на сайте.',
          'Деловые сообщения, отправленные нам по электронной почте, через WhatsApp, форму запроса или онлайн-чат.',
        ],
      },
      {
        id: 'use',
        title: '3. Как мы используем данные',
        bullets: [
          'Отвечаем на запросы и предоставляем сведения о продукции, предложения, документы и поддержку по проекту.',
          'Обеспечиваем работу и безопасность сайта и форм, устраняем ошибки и улучшаем их.',
          'Оцениваем работу сайта и востребованность страниц и услуг.',
          'Ведем деловую документацию, предотвращаем злоупотребления и выполняем требования закона.',
        ],
      },
      {
        id: 'cookies',
        title: '4. Файлы cookie, аналитика и сторонние сервисы',
        paragraphs: [
          'В зависимости от действующих настроек сайта Google Analytics и Google Tag Manager могут использовать cookie или аналогичные идентификаторы для измерения посещений и действий. Когда онлайн-чат включен, Zoosnet может обрабатывать технические данные и активность в чате. При обращении через WhatsApp данные обрабатываются этим сервисом.',
          'Сайт также использует ограниченное хранилище сеанса браузера, чтобы не показывать одно и то же автоматическое сообщение повторно в течение одного сеанса. Сторонние сервисы обрабатывают данные по собственным правилам конфиденциальности, в том числе в других странах и регионах.',
        ],
      },
      {
        id: 'sharing',
        title: '5. Передача данных и международная обработка',
        paragraphs: [
          'Мы можем передавать данные поставщикам услуг хостинга, аналитики, электронной почты, клиентских коммуникаций и поддержки сайта; государственным органам, если этого требует закон; либо в рамках реорганизации или передачи бизнеса. Мы не продаем персональные данные.',
          'N-TET находится в Китае. Данные иностранных посетителей могут обрабатываться в Китае и в странах, где работают наши поставщики услуг.',
        ],
      },
      {
        id: 'retention',
        title: '6. Срок хранения и безопасность',
        paragraphs: [
          'Мы храним персональные данные только столько, сколько обоснованно необходимо для целей этой политики: обработки запросов, ведения деловой документации, обеспечения безопасности и выполнения требований закона. Мы применяем разумные административные и технические меры защиты, однако абсолютную безопасность передачи или хранения данных в интернете гарантировать невозможно.',
        ],
      },
      {
        id: 'choices',
        title: '7. Ваш выбор и запросы',
        paragraphs: [
          'Вы можете не предоставлять необязательные данные, изменить настройки cookie в браузере или не использовать сторонние чаты и мессенджеры. В пределах, предусмотренных применимым законодательством, вы можете запросить доступ, исправление или удаление относящихся к вам данных. До выполнения запроса нам может потребоваться подтвердить вашу личность.',
        ],
      },
      {
        id: 'children',
        title: '8. Дети',
        paragraphs: [
          'Этот сайт предназначен для деловой аудитории, а не для детей младше 16 лет. Мы сознательно не собираем их персональные данные.',
        ],
      },
      {
        id: 'updates',
        title: '9. Изменения политики',
        paragraphs: [
          'Мы можем обновлять эту политику при изменении сайта, услуг или правовых требований. Дата в верхней части страницы указывает на последнюю редакцию.',
        ],
      },
      {
        id: 'contact',
        title: '10. Связь с нами',
        paragraphs: [
          'По вопросам конфиденциальности и для направления запросов свяжитесь с Beijing Non-traditional Equipment Technology Co., Ltd. по указанному ниже адресу электронной почты.',
        ],
        showEmail: true,
      },
    ],
  },
  es: {
    title: 'Política de privacidad',
    eyebrow: 'Información legal y protección de datos',
    summary:
      'Esta política explica cómo N-TET recopila, utiliza, conserva y comparte datos personales cuando visita n-tet.com o se comunica con nuestro equipo.',
    homeLabel: 'Inicio',
    contentsLabel: 'En esta página',
    lastUpdatedLabel: 'Última actualización',
    lastUpdated: '14 de julio de 2026',
    contactEmailLabel: 'Contacto de privacidad',
    sections: [
      {
        id: 'scope',
        title: '1. Alcance e identidad del responsable',
        paragraphs: [
          'Esta Política de privacidad se aplica a n-tet.com y a las comunicaciones comerciales iniciadas a través del sitio. El sitio es operado por Beijing Non-traditional Equipment Technology Co., Ltd. (N-TET).',
        ],
      },
      {
        id: 'information',
        title: '2. Información que recopilamos',
        paragraphs: ['Recopilamos información de tres formas principales:'],
        bullets: [
          'Información que usted envía, como nombre, empresa, correo electrónico, teléfono o WhatsApp, método de contacto preferido, tipo de consulta y mensaje.',
          'Información técnica y de uso, como dirección IP, navegador y dispositivo, páginas visitadas, página de referencia, fechas, horas e interacciones con el sitio.',
          'Comunicaciones comerciales enviadas por correo electrónico, WhatsApp, formulario de consulta o chat en línea.',
        ],
      },
      {
        id: 'use',
        title: '3. Cómo utilizamos la información',
        bullets: [
          'Responder consultas y facilitar información de productos, cotizaciones, documentos y asistencia para proyectos.',
          'Operar, proteger, diagnosticar y mejorar el sitio y sus formularios.',
          'Medir el rendimiento del sitio y conocer qué páginas y servicios resultan útiles.',
          'Mantener registros comerciales, prevenir usos indebidos y cumplir obligaciones legales.',
        ],
      },
      {
        id: 'cookies',
        title: '4. Cookies, analítica y servicios de terceros',
        paragraphs: [
          'Según la configuración activa del sitio, Google Analytics y Google Tag Manager pueden utilizar cookies o identificadores similares para medir visitas e interacciones. Cuando el chat comercial está habilitado, Zoosnet puede procesar datos técnicos y la actividad del chat. WhatsApp procesa información cuando decide contactarnos mediante su servicio.',
          'El sitio también utiliza almacenamiento de sesión limitado en el navegador para no mostrar repetidamente el mismo mensaje automático durante una sesión. Los terceros tratan la información conforme a sus propias políticas y pueden procesarla en otros países o regiones.',
        ],
      },
      {
        id: 'sharing',
        title: '5. Cesiones y transferencias internacionales',
        paragraphs: [
          'Podemos compartir datos con proveedores de alojamiento, analítica, correo, comunicaciones con clientes y operación del sitio; con autoridades cuando la ley lo exija; o como parte de una reorganización o transferencia empresarial. No vendemos datos personales.',
          'N-TET está establecida en China. Los datos enviados por visitantes internacionales pueden tratarse en China y en los lugares donde operan nuestros proveedores.',
        ],
      },
      {
        id: 'retention',
        title: '6. Conservación y seguridad',
        paragraphs: [
          'Conservamos los datos personales solo durante el tiempo razonablemente necesario para atender consultas, mantener registros comerciales, proteger el servicio y cumplir requisitos legales. Aplicamos medidas administrativas y técnicas razonables, aunque ningún sistema de transmisión o almacenamiento por internet puede garantizar una seguridad absoluta.',
        ],
      },
      {
        id: 'choices',
        title: '7. Sus opciones y solicitudes',
        paragraphs: [
          'Puede no facilitar datos opcionales, ajustar los controles de cookies del navegador o no utilizar servicios externos de chat y mensajería. De acuerdo con la legislación aplicable, puede solicitar acceso, rectificación o supresión de sus datos. Es posible que debamos verificar su identidad antes de atender la solicitud.',
        ],
      },
      {
        id: 'children',
        title: '8. Menores',
        paragraphs: [
          'Este sitio de empresa a empresa no está dirigido a menores de 16 años y no recopilamos conscientemente sus datos personales.',
        ],
      },
      {
        id: 'updates',
        title: '9. Cambios en esta política',
        paragraphs: [
          'Podemos actualizar esta política cuando cambien el sitio, los servicios o nuestras obligaciones legales. La fecha indicada al principio muestra la última revisión.',
        ],
      },
      {
        id: 'contact',
        title: '10. Contacto',
        paragraphs: [
          'Para preguntas o solicitudes de privacidad, contacte con Beijing Non-traditional Equipment Technology Co., Ltd. en la dirección de correo indicada a continuación.',
        ],
        showEmail: true,
      },
    ],
  },
  ar: {
    title: 'سياسة الخصوصية',
    eyebrow: 'المعلومات القانونية وحماية البيانات',
    summary:
      'توضح هذه السياسة كيفية جمع N-TET للمعلومات الشخصية واستخدامها والاحتفاظ بها ومشاركتها عند زيارة n-tet.com أو التواصل مع فريقنا.',
    homeLabel: 'الرئيسية',
    contentsLabel: 'محتويات الصفحة',
    lastUpdatedLabel: 'آخر تحديث',
    lastUpdated: '14 يوليو 2026',
    contactEmailLabel: 'التواصل بشأن الخصوصية',
    sections: [
      {
        id: 'scope',
        title: '1. نطاق السياسة والجهة المسؤولة',
        paragraphs: [
          'تنطبق سياسة الخصوصية هذه على موقع n-tet.com وعلى المراسلات التجارية التي تبدأ من خلاله. تدير الموقع شركة Beijing Non-traditional Equipment Technology Co., Ltd. (N-TET).',
        ],
      },
      {
        id: 'information',
        title: '2. المعلومات التي نجمعها',
        paragraphs: ['نجمع المعلومات بثلاث طرق رئيسية:'],
        bullets: [
          'المعلومات التي تقدمها، مثل الاسم والشركة والبريد الإلكتروني ورقم الهاتف أو WhatsApp وطريقة الاتصال المفضلة ونوع الاستفسار ونص الرسالة.',
          'المعلومات التقنية ومعلومات الاستخدام، مثل عنوان IP والمتصفح والجهاز والصفحات التي تمت زيارتها وصفحة الإحالة والتوقيت والتفاعلات مع الموقع.',
          'المراسلات التجارية التي ترسلها عبر البريد الإلكتروني أو WhatsApp أو نموذج الاستفسار أو المحادثة عبر الإنترنت.',
        ],
      },
      {
        id: 'use',
        title: '3. كيفية استخدام المعلومات',
        bullets: [
          'الرد على الاستفسارات وتقديم معلومات المنتجات وعروض الأسعار والمستندات ودعم المشروعات.',
          'تشغيل الموقع ونماذجه وحمايتهما ومعالجة الأعطال وتحسين الأداء.',
          'قياس أداء الموقع وفهم الصفحات والخدمات المفيدة للزوار.',
          'الاحتفاظ بسجلات الأعمال ومنع إساءة الاستخدام والامتثال للالتزامات القانونية.',
        ],
      },
      {
        id: 'cookies',
        title: '4. ملفات تعريف الارتباط والتحليلات وخدمات الأطراف الثالثة',
        paragraphs: [
          'وفقاً لإعدادات الموقع المفعلة، قد تستخدم Google Analytics وGoogle Tag Manager ملفات تعريف الارتباط أو معرفات مماثلة لقياس الزيارات والتفاعلات. وعند تفعيل محادثة الأعمال، قد تعالج Zoosnet البيانات التقنية ونشاط المحادثة. كما تعالج WhatsApp المعلومات عند اختيار التواصل معنا من خلال خدمتها.',
          'يستخدم الموقع أيضاً مساحة محدودة من تخزين جلسة المتصفح لتجنب عرض الرسالة التلقائية نفسها عدة مرات خلال الجلسة الواحدة. تعالج الأطراف الثالثة المعلومات وفق سياسات الخصوصية الخاصة بها، وقد تتم المعالجة في دول أو مناطق أخرى.',
        ],
      },
      {
        id: 'sharing',
        title: '5. مشاركة المعلومات والنقل الدولي',
        paragraphs: [
          'قد نشارك المعلومات مع مزودي خدمات الاستضافة والتحليلات والبريد الإلكتروني والتواصل مع العملاء وتشغيل الموقع، أو مع الجهات المختصة إذا كان الإفصاح مطلوباً قانوناً، أو ضمن إعادة تنظيم أو نقل للأعمال. نحن لا نبيع المعلومات الشخصية.',
          'يقع مقر N-TET في الصين. وقد تتم معالجة معلومات الزوار الدوليين في الصين وفي المواقع التي يعمل فيها مزودو خدماتنا.',
        ],
      },
      {
        id: 'retention',
        title: '6. الاحتفاظ والأمان',
        paragraphs: [
          'نحتفظ بالمعلومات الشخصية فقط للمدة اللازمة بشكل معقول لمعالجة الاستفسارات والاحتفاظ بسجلات الأعمال وتحقيق الأمان والوفاء بالمتطلبات القانونية. نطبق إجراءات إدارية وتقنية معقولة، لكن لا يمكن ضمان الأمان الكامل لأي نظام نقل أو تخزين عبر الإنترنت.',
        ],
      },
      {
        id: 'choices',
        title: '7. خياراتك وطلباتك',
        paragraphs: [
          'يمكنك عدم تقديم المعلومات الاختيارية، أو تعديل إعدادات ملفات تعريف الارتباط في متصفحك، أو عدم استخدام خدمات المحادثة والمراسلة التابعة لأطراف ثالثة. ووفقاً للقانون المعمول به، يمكنك طلب الوصول إلى معلوماتك أو تصحيحها أو حذفها. وقد نحتاج إلى التحقق من هويتك قبل تنفيذ الطلب.',
        ],
      },
      {
        id: 'children',
        title: '8. الأطفال',
        paragraphs: [
          'هذا الموقع مخصص للتعاملات بين الشركات وليس موجهاً إلى الأطفال دون 16 عاماً، ولا نجمع معلوماتهم الشخصية عن علم.',
        ],
      },
      {
        id: 'updates',
        title: '9. التغييرات على هذه السياسة',
        paragraphs: [
          'قد نحدّث هذه السياسة عند تغير الموقع أو الخدمات أو الالتزامات القانونية. ويوضح التاريخ في أعلى الصفحة آخر مراجعة.',
        ],
      },
      {
        id: 'contact',
        title: '10. اتصل بنا',
        paragraphs: [
          'للاستفسارات أو الطلبات المتعلقة بالخصوصية، تواصل مع Beijing Non-traditional Equipment Technology Co., Ltd. عبر عنوان البريد الإلكتروني أدناه.',
        ],
        showEmail: true,
      },
    ],
  },
};

export function getPrivacyPolicyContent(locale: string): PrivacyPolicyContent {
  return policies[locale as Locale] || policies.en;
}

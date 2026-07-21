export type InquiryFormUxCopy = {
  optional: string;
  contactRequirement: string;
  contactRequiredError: string;
  privacyNote: string;
  closeQuote: string;
  stepLabel: (step: number) => string;
  requirementsTitle: string;
  contactTitle: string;
  applicationLabel: string;
  applicationPlaceholder: string;
  applicationOptions: Array<{ value: string; label: string }>;
  deploymentLabel: string;
  deploymentOptions: Array<{ value: string; label: string }>;
  detailsLabel: string;
  detailsPlaceholder: string;
  detailsHint: string;
  phoneHint: string;
  continueLabel: string;
  backLabel: string;
  applicationRequiredError: string;
  deploymentRequiredError: string;
  otherDetailsRequiredError: string;
};

const inquiryFormUxCopy: Record<string, InquiryFormUxCopy> = {
  en: {
    optional: 'Optional',
    contactRequirement: 'Email and Phone / WhatsApp are both required.',
    contactRequiredError: 'Please enter both an email address and a Phone / WhatsApp number.',
    privacyNote: 'We protect your privacy. Your contact details are used only to respond to this inquiry and are not shared with unrelated third parties.',
    closeQuote: 'Close quote form',
    stepLabel: (step) => `Step ${step} of 2`,
    requirementsTitle: 'Tell us about your project',
    contactTitle: 'How can we reach you?',
    applicationLabel: 'Application scenario',
    applicationPlaceholder: 'Select a scenario',
    applicationOptions: [
      { value: 'Enterprises', label: 'Enterprises' },
      { value: 'VIPs & Private Property', label: 'VIPs & Private Property' },
      { value: 'Critical Infrastructure', label: 'Critical Infrastructure' },
      { value: 'Power Plants', label: 'Power Plants' },
      { value: 'Airports', label: 'Airports' },
      { value: 'Mass Events', label: 'Mass Events' },
      { value: 'Prisons', label: 'Prisons' },
      { value: 'Ports', label: 'Ports' },
      { value: 'Public Safety', label: 'Public Safety' },
      { value: 'Borders', label: 'Borders' },
      { value: 'Other', label: 'Other' },
    ],
    deploymentLabel: 'Deployment type',
    deploymentOptions: [
      { value: 'Fixed-site', label: 'Fixed-site' },
      { value: 'Portable / Rapid-deployment', label: 'Portable / Rapid-deployment' },
      { value: 'Vehicle-mounted', label: 'Vehicle-mounted' },
      { value: 'Not sure / Need a recommendation', label: 'Not sure / Need a recommendation' },
    ],
    detailsLabel: 'Additional details',
    detailsPlaceholder: 'For example: the product you’re interested in, approximate quantity, coverage area, project timeline, or whether you need specifications, pricing, or a system recommendation.',
    detailsHint: 'A short note is enough.',
    phoneHint: 'Include country code. We’ll only use this to follow up on your inquiry.',
    continueLabel: 'Continue',
    backLabel: 'Back',
    applicationRequiredError: 'Please select an application scenario.',
    deploymentRequiredError: 'Please select a deployment type.',
    otherDetailsRequiredError: 'Please briefly describe your application scenario.',
  },
  ru: {
    optional: 'Необязательно',
    contactRequirement: 'Адрес электронной почты и номер телефона / WhatsApp обязательны.',
    contactRequiredError: 'Укажите адрес электронной почты и номер телефона / WhatsApp.',
    privacyNote: 'Мы защищаем вашу конфиденциальность. Контактные данные используются только для ответа на запрос и не передаются посторонним лицам.',
    closeQuote: 'Закрыть форму запроса',
    stepLabel: (step) => `Шаг ${step} из 2`,
    requirementsTitle: 'Расскажите о вашем проекте',
    contactTitle: 'Как с вами связаться?',
    applicationLabel: 'Сценарий применения',
    applicationPlaceholder: 'Выберите сценарий',
    applicationOptions: [
      { value: 'Enterprises', label: 'Предприятия' },
      { value: 'VIPs & Private Property', label: 'VIP-персоны и частная собственность' },
      { value: 'Critical Infrastructure', label: 'Критическая инфраструктура' },
      { value: 'Power Plants', label: 'Электростанции' },
      { value: 'Airports', label: 'Аэропорты' },
      { value: 'Mass Events', label: 'Массовые мероприятия' },
      { value: 'Prisons', label: 'Исправительные учреждения' },
      { value: 'Ports', label: 'Порты' },
      { value: 'Public Safety', label: 'Общественная безопасность' },
      { value: 'Borders', label: 'Границы' },
      { value: 'Other', label: 'Другое' },
    ],
    deploymentLabel: 'Тип развертывания',
    deploymentOptions: [
      { value: 'Fixed-site', label: 'Стационарное' },
      { value: 'Portable / Rapid-deployment', label: 'Переносное / быстро развертываемое' },
      { value: 'Vehicle-mounted', label: 'На транспортном средстве' },
      { value: 'Not sure / Need a recommendation', label: 'Не уверен — нужна рекомендация' },
    ],
    detailsLabel: 'Дополнительная информация',
    detailsPlaceholder: 'Например: интересующий продукт, примерное количество, зона покрытия, сроки проекта или необходимость в характеристиках, цене или рекомендации по системе.',
    detailsHint: 'Достаточно краткого сообщения.',
    phoneHint: 'Укажите код страны. Номер используется только для ответа на ваш запрос.',
    continueLabel: 'Продолжить',
    backLabel: 'Назад',
    applicationRequiredError: 'Выберите сценарий применения.',
    deploymentRequiredError: 'Выберите тип развертывания.',
    otherDetailsRequiredError: 'Кратко опишите ваш сценарий применения.',
  },
  es: {
    optional: 'Opcional',
    contactRequirement: 'El correo electrónico y el teléfono / WhatsApp son obligatorios.',
    contactRequiredError: 'Ingrese el correo electrónico y el teléfono / WhatsApp.',
    privacyNote: 'Protegemos su privacidad. Sus datos de contacto se usan únicamente para responder a esta consulta y no se comparten con terceros no relacionados.',
    closeQuote: 'Cerrar formulario de cotización',
    stepLabel: (step) => `Paso ${step} de 2`,
    requirementsTitle: 'Cuéntenos sobre su proyecto',
    contactTitle: '¿Cómo podemos contactarle?',
    applicationLabel: 'Escenario de aplicación',
    applicationPlaceholder: 'Seleccione un escenario',
    applicationOptions: [
      { value: 'Enterprises', label: 'Empresas' },
      { value: 'VIPs & Private Property', label: 'VIP y propiedad privada' },
      { value: 'Critical Infrastructure', label: 'Infraestructura crítica' },
      { value: 'Power Plants', label: 'Centrales eléctricas' },
      { value: 'Airports', label: 'Aeropuertos' },
      { value: 'Mass Events', label: 'Eventos multitudinarios' },
      { value: 'Prisons', label: 'Centros penitenciarios' },
      { value: 'Ports', label: 'Puertos' },
      { value: 'Public Safety', label: 'Seguridad pública' },
      { value: 'Borders', label: 'Fronteras' },
      { value: 'Other', label: 'Otro' },
    ],
    deploymentLabel: 'Tipo de despliegue',
    deploymentOptions: [
      { value: 'Fixed-site', label: 'Instalación fija' },
      { value: 'Portable / Rapid-deployment', label: 'Portátil / despliegue rápido' },
      { value: 'Vehicle-mounted', label: 'Montado en vehículo' },
      { value: 'Not sure / Need a recommendation', label: 'No estoy seguro — necesito una recomendación' },
    ],
    detailsLabel: 'Detalles adicionales',
    detailsPlaceholder: 'Por ejemplo: producto de interés, cantidad aproximada, área de cobertura, plazo del proyecto o si necesita especificaciones, precios o una recomendación del sistema.',
    detailsHint: 'Una nota breve es suficiente.',
    phoneHint: 'Incluya el código de país. Solo utilizaremos el número para responder a esta consulta.',
    continueLabel: 'Continuar',
    backLabel: 'Atrás',
    applicationRequiredError: 'Seleccione un escenario de aplicación.',
    deploymentRequiredError: 'Seleccione un tipo de despliegue.',
    otherDetailsRequiredError: 'Describa brevemente su escenario de aplicación.',
  },
  ar: {
    optional: 'اختياري',
    contactRequirement: 'البريد الإلكتروني ورقم الهاتف / WhatsApp مطلوبان.',
    contactRequiredError: 'يرجى إدخال البريد الإلكتروني ورقم الهاتف / WhatsApp.',
    privacyNote: 'نحن نحمي خصوصيتك. تُستخدم بيانات الاتصال فقط للرد على هذا الاستفسار ولا تتم مشاركتها مع أطراف ثالثة غير ذات صلة.',
    closeQuote: 'إغلاق نموذج عرض السعر',
    stepLabel: (step) => `الخطوة ${step} من 2`,
    requirementsTitle: 'أخبرنا عن مشروعك',
    contactTitle: 'كيف يمكننا التواصل معك؟',
    applicationLabel: 'سيناريو الاستخدام',
    applicationPlaceholder: 'اختر سيناريو',
    applicationOptions: [
      { value: 'Enterprises', label: 'الشركات' },
      { value: 'VIPs & Private Property', label: 'الشخصيات المهمة والممتلكات الخاصة' },
      { value: 'Critical Infrastructure', label: 'البنية التحتية الحيوية' },
      { value: 'Power Plants', label: 'محطات الطاقة' },
      { value: 'Airports', label: 'المطارات' },
      { value: 'Mass Events', label: 'الفعاليات الجماهيرية' },
      { value: 'Prisons', label: 'المنشآت الإصلاحية' },
      { value: 'Ports', label: 'الموانئ' },
      { value: 'Public Safety', label: 'السلامة العامة' },
      { value: 'Borders', label: 'الحدود' },
      { value: 'Other', label: 'أخرى' },
    ],
    deploymentLabel: 'نوع النشر',
    deploymentOptions: [
      { value: 'Fixed-site', label: 'موقع ثابت' },
      { value: 'Portable / Rapid-deployment', label: 'محمول / سريع النشر' },
      { value: 'Vehicle-mounted', label: 'مثبت على مركبة' },
      { value: 'Not sure / Need a recommendation', label: 'غير متأكد — أحتاج إلى توصية' },
    ],
    detailsLabel: 'تفاصيل إضافية',
    detailsPlaceholder: 'مثال: المنتج محل الاهتمام، الكمية التقريبية، نطاق التغطية، الجدول الزمني للمشروع، أو الحاجة إلى المواصفات أو السعر أو توصية بالنظام.',
    detailsHint: 'تكفي ملاحظة قصيرة.',
    phoneHint: 'أدخل رمز الدولة. سنستخدم الرقم فقط للرد على هذا الاستفسار.',
    continueLabel: 'متابعة',
    backLabel: 'رجوع',
    applicationRequiredError: 'يرجى اختيار سيناريو الاستخدام.',
    deploymentRequiredError: 'يرجى اختيار نوع النشر.',
    otherDetailsRequiredError: 'يرجى وصف سيناريو الاستخدام بإيجاز.',
  },
};

export function getInquiryFormUxCopy(pathname: string): InquiryFormUxCopy {
  const locale = pathname.split('/').filter(Boolean)[0];
  return inquiryFormUxCopy[locale] || inquiryFormUxCopy.en;
}

export function getContactMethod(email: string, phone: string) {
  if (email && phone) return 'Email + Phone / WhatsApp';
  if (phone) return 'Phone / WhatsApp';
  return 'Email';
}

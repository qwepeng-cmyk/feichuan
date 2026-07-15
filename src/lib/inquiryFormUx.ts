export type InquiryFormUxCopy = {
  optional: string;
  contactRequirement: string;
  contactRequiredError: string;
  privacyNote: string;
  quickTypes: string[];
  closeQuote: string;
};

const inquiryFormUxCopy: Record<string, InquiryFormUxCopy> = {
  en: {
    optional: 'Optional',
    contactRequirement: 'Email and Phone / WhatsApp are both required.',
    contactRequiredError: 'Please enter both an email address and a Phone / WhatsApp number.',
    privacyNote: 'We protect your privacy. Your contact details are used only to respond to this inquiry and are not shared with unrelated third parties.',
    quickTypes: ['Pricing', 'Technical Details', 'System Proposal'],
    closeQuote: 'Close quote form',
  },
  ru: {
    optional: 'Необязательно',
    contactRequirement: 'Адрес электронной почты и номер телефона / WhatsApp обязательны.',
    contactRequiredError: 'Укажите адрес электронной почты и номер телефона / WhatsApp.',
    privacyNote: 'Мы защищаем вашу конфиденциальность. Контактные данные используются только для ответа на запрос и не передаются посторонним лицам.',
    quickTypes: ['Цены', 'Технические детали', 'Системное предложение'],
    closeQuote: 'Закрыть форму запроса',
  },
  es: {
    optional: 'Opcional',
    contactRequirement: 'El correo electrónico y el teléfono / WhatsApp son obligatorios.',
    contactRequiredError: 'Ingrese el correo electrónico y el teléfono / WhatsApp.',
    privacyNote: 'Protegemos su privacidad. Sus datos de contacto se usan únicamente para responder a esta consulta y no se comparten con terceros no relacionados.',
    quickTypes: ['Precios', 'Detalles técnicos', 'Propuesta de sistema'],
    closeQuote: 'Cerrar formulario de cotización',
  },
  ar: {
    optional: 'اختياري',
    contactRequirement: 'البريد الإلكتروني ورقم الهاتف / WhatsApp مطلوبان.',
    contactRequiredError: 'يرجى إدخال البريد الإلكتروني ورقم الهاتف / WhatsApp.',
    privacyNote: 'نحن نحمي خصوصيتك. تُستخدم بيانات الاتصال فقط للرد على هذا الاستفسار ولا تتم مشاركتها مع أطراف ثالثة غير ذات صلة.',
    quickTypes: ['الأسعار', 'التفاصيل الفنية', 'مقترح النظام'],
    closeQuote: 'إغلاق نموذج عرض السعر',
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

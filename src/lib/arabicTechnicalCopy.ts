const ARABIC_LABELS: Record<string, string> = {
  Model: 'الطراز', Weight: 'الوزن', Dimensions: 'الأبعاد', Size: 'الحجم', Energy: 'الطاقة',
  'Energy Density': 'كثافة الطاقة', 'Nominal Voltage': 'الجهد الاسمي', 'Charging Voltage': 'جهد الشحن',
  'Rated Capacity': 'السعة الاسمية', 'Power Supply': 'مصدر الطاقة', 'Power Consumption': 'استهلاك الطاقة',
  'Operating Temperature': 'درجة حرارة التشغيل', 'Operating Temp': 'درجة حرارة التشغيل',
  'Storage Temperature': 'درجة حرارة التخزين', 'IP Rating': 'درجة الحماية', 'Protection Rating': 'درجة الحماية',
  'Frequency Range': 'نطاق التردد', 'Operating Frequency': 'تردد التشغيل', 'Response Time': 'زمن الاستجابة',
  'Detection Range': 'مدى الكشف', 'Detection Radius': 'نطاق الكشف', 'Detection Angle': 'زاوية الكشف',
  'Detection Mode': 'وضع الكشف', 'Detection Bands': 'نطاقات الكشف', 'Detection Targets': 'الأهداف القابلة للكشف',
  Accuracy: 'الدقة', Sensitivity: 'الحساسية', Positioning: 'التموضع', 'Positioning Accuracy': 'دقة التموضع',
  'Control Interface': 'واجهة التحكم', Interfaces: 'الواجهات', Connectivity: 'الاتصال',
  'Data Rate': 'معدل البيانات', 'Transmission Range': 'مدى الإرسال', 'Transmission Mode': 'وضع الإرسال',
  'Transmit Power': 'قدرة الإرسال', 'Receiver Sensitivity': 'حساسية الاستقبال', Encryption: 'التشفير',
  Payload: 'الحمولة', 'Max Payload': 'الحمولة القصوى', Endurance: 'مدة الطيران',
  'Max Flight Speed': 'أقصى سرعة طيران', 'Cruise Speed': 'سرعة الطيران', 'Max Flight Altitude': 'أقصى ارتفاع طيران',
  'Wind Resistance': 'مقاومة الرياح', Battery: 'البطارية', Propeller: 'المروحة', Engine: 'المحرك',
  Display: 'الشاشة', Technology: 'التقنية', Applications: 'التطبيقات', Deployment: 'شكل النشر',
  'Continuous Operation': 'مدة التشغيل المستمر', 'Continuous Work': 'التشغيل المستمر',
  'External Power': 'مصدر الطاقة الخارجي', 'Device Weight': 'وزن الجهاز', 'Device Dimensions': 'أبعاد الجهاز',
  'Overall Dimensions': 'الأبعاد الكلية', 'External Dimensions': 'الأبعاد الخارجية',
  'Product Parameters': 'مواصفات المنتج', 'Technical Parameters': 'المواصفات الفنية',
  'Specification Table': 'جدول المواصفات', Performance: 'الأداء', 'Performance table': 'جدول الأداء',
  Item: 'البند', name: 'الاسم', description: 'الوصف', label: 'التسمية', value: 'القيمة',
  Altitude: 'الارتفاع', 'Operating Altitude': 'ارتفاع التشغيل', 'Hovering Altitude': 'ارتفاع التحويم',
  Range: 'النطاق', 'Working Range': 'نطاق العمل', 'Capacity Range': 'نطاق السعة',
  'Illuminated Area': 'مساحة الإضاءة', 'Illumination Area': 'مساحة الإضاءة', Coverage: 'التغطية',
  Resolution: 'الدقة', Camera: 'الكاميرا', Duration: 'مدة التشغيل', 'Deployment Mode': 'نمط النشر',
};

const BROKEN_ARABIC_TECHNICAL_COPY = /حل N-TET صناعي|القيمة الفنية:|منخفض الارتفاع هدف هدف/;

export function hasBrokenArabicTechnicalCopy(value: unknown) {
  const serialized = typeof value === 'string' ? value : JSON.stringify(value || '');
  return BROKEN_ARABIC_TECHNICAL_COPY.test(serialized);
}

function localizeLabel(label: string) {
  if (ARABIC_LABELS[label]) return ARABIC_LABELS[label];
  const parts = label.split(' - ');
  if (parts.length > 1) return parts.map((part) => ARABIC_LABELS[part] || part).join(' — ');
  return label.replaceAll('_', ' ');
}

function localizeValue(value: string) {
  return value
    .replace(/Environment dependent/gi, 'بحسب بيئة الموقع')
    .replace(/Dependent on environment\/model/gi, 'بحسب البيئة والطراز')
    .replace(/Adjustable/gi, 'قابل للضبط')
    .replace(/Horizontal/gi, 'أفقياً')
    .replace(/Vertical/gi, 'رأسياً')
    .replace(/Outdoor use supported/gi, 'يدعم الاستخدام الخارجي')
    .replace(/Built-in/gi, 'مدمج')
    .replace(/Swappable/gi, 'قابل للاستبدال');
}

function localizeNode(value: unknown): unknown {
  if (typeof value === 'string') return localizeValue(value);
  if (Array.isArray(value)) return value.map(localizeNode);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([key, item]) => [
      localizeLabel(key),
      localizeNode(item),
    ]));
  }
  return value;
}

function readJson(value: unknown) {
  if (typeof value !== 'string') return value;
  try { return JSON.parse(value); } catch { return value; }
}

export function getArabicTechnicalParameters(product: Record<string, any>, locale: string) {
  const localized = product[`parameters_${locale}`] || product.parameters_en;
  if (locale !== 'ar') return localized;

  if (!hasBrokenArabicTechnicalCopy(localized)) return localized;
  return localizeNode(readJson(product.parameters_en));
}

export function getArabicTechnicalHighlight(
  record: Record<string, any>,
  field: 'key_parameter_1' | 'key_parameter_2',
  locale: string,
) {
  const localized = record[`${field}_${locale}`] || record[`${field}_en`];
  if (locale !== 'ar' || typeof localized !== 'string' || !BROKEN_ARABIC_TECHNICAL_COPY.test(localized)) {
    return localized;
  }

  const source = record[`${field}_en`];
  if (typeof source !== 'string' || !source.trim()) return '';

  const separator = source.indexOf(':');
  if (separator < 0) return localizeValue(source.trim());

  const label = source.slice(0, separator).trim();
  const value = source.slice(separator + 1).trim();
  return `${localizeLabel(label)}: ${localizeValue(value)}`;
}

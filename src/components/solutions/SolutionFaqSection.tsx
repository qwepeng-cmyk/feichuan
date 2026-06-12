import type { SeoKeywordTarget } from '@/lib/seoKeywordTargets';
import FaqListSection from '@/components/common/FaqListSection';

type SolutionFaqSectionProps = {
  locale: string;
  subject: string;
  target?: Pick<SeoKeywordTarget, 'primary' | 'secondary'>;
  compact?: boolean;
  id?: string;
};

function keywordList(target?: Pick<SeoKeywordTarget, 'primary' | 'secondary'>) {
  const primary = target?.primary?.trim();
  const secondary = (target?.secondary || []).filter(Boolean).slice(0, 3);
  return {
    primary,
    related: secondary.join(', '),
  };
}

function faqCopy(locale: string, subject: string, target?: Pick<SeoKeywordTarget, 'primary' | 'secondary'>) {
  const { primary, related } = keywordList(target);
  const theme = primary || subject;
  const supporting = related || subject;

  if (locale === 'es') {
    return {
      eyebrow: '',
      title: 'FAQ de la solucion',
      intro: `Para ${theme}, confirme escenario operativo, carga util, comunicacion, autonomia, mantenimiento y evidencia de casos relacionados antes de seleccionar el equipo.`,
      items: [
        {
          q: `Que informacion se necesita antes de seleccionar ${theme}?`,
          a: `Antes de seleccionar ${theme}, el equipo debe confirmar zona de operacion, duracion prevista, carga util, condiciones de comunicacion, requisitos de seguridad y datos que deben entregarse al centro de mando.`,
        },
        {
          q: 'Como se combina esta solucion con equipos relacionados?',
          a: `La seleccion suele comparar ${supporting}, estaciones de control, sensores, enlaces de datos, fuentes de energia y equipos de soporte para que el flujo de trabajo sea estable desde la preparacion hasta la revision de resultados.`,
        },
        {
          q: 'Que debe validarse antes del despliegue?',
          a: 'El plan debe revisar permisos locales, entrenamiento del operador, repuestos, procedimiento de mantenimiento, transferencia de datos y criterios de aceptacion del proyecto.',
        },
      ],
    };
  }

  if (locale === 'ru') {
    return {
      eyebrow: '',
      title: 'FAQ по решению',
      intro: `Для ${theme} подтвердите рабочий сценарий, полезную нагрузку, связь, автономность, обслуживание и связанные проектные примеры перед выбором оборудования.`,
      items: [
        {
          q: `Какие данные нужны перед выбором ${theme}?`,
          a: `Перед выбором ${theme} команда уточняет зону работ, продолжительность, полезную нагрузку, условия связи, требования безопасности и формат данных для оперативного центра.`,
        },
        {
          q: 'Как решение сочетается с сопутствующим оборудованием?',
          a: `Обычно сравнивают ${supporting}, станции управления, сенсоры, каналы передачи данных, источники питания и сервисные принадлежности, чтобы рабочий процесс оставался устойчивым.`,
        },
        {
          q: 'Что проверить перед развертыванием?',
          a: 'План должен подтвердить местные разрешения, подготовку оператора, запасные части, регламент обслуживания, передачу данных и критерии приемки проекта.',
        },
      ],
    };
  }

  if (locale === 'ar') {
    return {
      eyebrow: '',
      title: 'الأسئلة الشائعة حول الحل',
      intro: `بالنسبة إلى ${theme}، أكد سيناريو التشغيل والحمولة والاتصالات ومدة الطيران وخطة الصيانة وأدلة الحالات ذات الصلة قبل اختيار المعدات.`,
      items: [
        {
          q: `ما المعلومات المطلوبة قبل اختيار ${theme}؟`,
          a: `قبل اختيار ${theme}، يجب على فريق المشروع تأكيد منطقة التشغيل ومدة المهمة واحتياجات الحمولة وظروف الاتصال ومتطلبات السلامة والبيانات المتوقعة من فريق القيادة أو التفتيش.`,
        },
        {
          q: 'كيف يجب مطابقة هذا الحل مع المعدات ذات الصلة؟',
          a: `عادة تقارن عملية الاختيار ${supporting}، ومحطات التحكم، والمستشعرات، وروابط البيانات، ودعم الطاقة وملحقات الخدمة حتى يبقى سير العمل مستقرا من الإعداد الميداني إلى مراجعة النتائج.`,
        },
        {
          q: 'ما الذي يجب تأكيده قبل النشر؟',
          a: 'يجب أن تؤكد الفرق التصاريح المحلية وتدريب المشغل وقطع الغيار وفترات الصيانة وتسليم البيانات ومعايير قبول المشروع ومسار التصعيد للدعم الميداني.',
        },
      ],
    };
  }

  return {
    eyebrow: '',
    title: 'Solution FAQ',
    intro: `For ${theme}, confirm the operating scenario, payload, communications, endurance, maintenance plan, and related case evidence before selecting equipment.`,
    items: [
      {
        q: `What inputs are needed before selecting ${theme}?`,
        a: `Before selecting ${theme}, the project team should confirm the operating area, mission duration, payload needs, communication conditions, safety requirements, and the data expected by the command or inspection team.`,
      },
      {
        q: 'How should this solution be matched with related equipment?',
        a: `Selection usually compares ${supporting}, control stations, sensors, data links, power support, and service accessories so field operation stays stable from setup to result review.`,
      },
      {
        q: 'What should teams confirm before deployment?',
        a: 'Teams should confirm local permissions, operator training, spare parts, maintenance intervals, data handover, acceptance criteria, and the escalation path for field support.',
      },
    ],
  };
}

export default function SolutionFaqSection({
  locale,
  subject,
  target,
  compact = false,
  id = 'faq',
}: SolutionFaqSectionProps) {
  const copy = faqCopy(locale, subject, target);

  return (
    <FaqListSection
      id={id}
      className={compact ? undefined : 'detail-section'}
      compact={compact}
      eyebrow={copy.eyebrow}
      title={copy.title}
      intro={copy.intro}
      items={copy.items.map((item) => ({ question: item.q, answer: item.a }))}
    />
  );
}

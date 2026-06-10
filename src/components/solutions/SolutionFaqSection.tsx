import type { SeoKeywordTarget } from '@/lib/seoKeywordTargets';

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
      eyebrow: 'Decision de proyecto',
      title: 'FAQ y planificacion del proyecto',
      intro: `${theme} se debe evaluar por escenario operativo, carga util, comunicacion, autonomia, mantenimiento y evidencia de casos relacionados, no solo por el modelo de UAV.`,
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
      eyebrow: 'Планирование проекта',
      title: 'FAQ по решению и подготовке проекта',
      intro: `${theme} следует оценивать по сценарию работ, полезной нагрузке, связи, автономности, обслуживанию и связанным проектным примерам, а не только по модели БПЛА.`,
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

  return {
    eyebrow: 'Project Decision',
    title: 'FAQ and Project Planning',
    intro: `${theme} should be evaluated by operating scenario, payload, communications, endurance, maintenance plan, and related case evidence, not only by UAV model.`,
    items: [
      {
        q: `What inputs are needed before selecting ${theme}?`,
        a: `Before selecting ${theme}, the project team should confirm the operating area, mission duration, payload needs, communication conditions, safety requirements, and the data expected by the command or inspection team.`,
      },
      {
        q: 'How should this solution be matched with related equipment?',
        a: `Selection usually compares ${supporting}, control stations, sensors, data links, power support, and service accessories so the workflow stays stable from field setup to result review.`,
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
    <section
      id={id}
      className={compact ? undefined : 'detail-section'}
      style={{
        padding: compact ? '34px 18px' : '96px 0',
        background: compact ? '#fff' : '#f7faff',
      }}
    >
      <div
        className={compact ? undefined : 'container'}
        style={compact ? undefined : { maxWidth: '1120px' }}
      >
        <div style={{ maxWidth: compact ? '100%' : '760px', marginBottom: compact ? '20px' : '38px' }}>
          <div style={{ color: '#315ba4', fontSize: compact ? '13px' : '1.4rem', fontWeight: 850, textTransform: 'uppercase', marginBottom: '10px' }}>
            {copy.eyebrow}
          </div>
          <h2 style={{ fontSize: compact ? '24px' : '4rem', lineHeight: 1.16, color: '#0f172a', margin: '0 0 16px', fontWeight: 900, letterSpacing: 0 }}>
            {copy.title}
          </h2>
          <p style={{ fontSize: compact ? '15px' : '1.8rem', lineHeight: 1.75, color: '#52606d', margin: 0 }}>
            {copy.intro}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: compact ? '12px' : '22px' }}>
          {copy.items.map((item, index) => (
            <article
              key={item.q}
              style={{
                background: '#fff',
                border: '1px solid #dbe7f6',
                padding: compact ? '18px' : '28px',
                minHeight: compact ? undefined : '250px',
                boxShadow: compact ? 'none' : '0 18px 42px rgba(15, 23, 42, 0.06)',
              }}
            >
              <div style={{ color: '#315ba4', fontSize: compact ? '12px' : '1.35rem', fontWeight: 900, marginBottom: '12px' }}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 style={{ fontSize: compact ? '17px' : '2.1rem', lineHeight: 1.3, color: '#152235', margin: '0 0 12px', fontWeight: 850 }}>
                {item.q}
              </h3>
              <p style={{ fontSize: compact ? '14px' : '1.6rem', lineHeight: 1.75, color: '#52606d', margin: 0 }}>
                {item.a}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

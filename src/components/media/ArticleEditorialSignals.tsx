type ArticleEditorialSignalsProps = {
  locale: string;
  title: string;
  date: string;
  dateTime?: string;
  compact?: boolean;
};

function localizedCopy(locale: string, title: string) {
  if (locale === 'es') {
    return {
      heading: 'Revision editorial y senales de proyecto',
      published: 'Publicado',
      editor: 'Editor',
      editorName: 'Equipo tecnico de contenido de N-TET',
      summary: `Este articulo sobre ${title} fue revisado como una nota de planificacion con 3 puntos: escenario operativo, ajuste de equipos y requisitos de soporte en campo.`,
      note: 'Para decisiones de compra, el lector debe comparar la informacion del articulo con paginas de soluciones, fichas de producto, accesorios relacionados y requisitos locales de operacion.',
    };
  }

  if (locale === 'ru') {
    return {
      heading: 'Редакционная проверка и проектные сигналы',
      published: 'Опубликовано',
      editor: 'Редактор',
      editorName: 'Техническая контент-команда N-TET',
      summary: `Эта статья о ${title} проверена как проектная заметка с 3 контрольными пунктами: рабочий сценарий, подбор оборудования и требования к полевой поддержке.`,
      note: 'Для закупочного решения читателю следует сопоставить материал со страницами решений, карточками продуктов, связанными аксессуарами и местными правилами эксплуатации.',
    };
  }

  if (locale === 'ar') {
    return {
      heading: 'مراجعة تحريرية وإشارات المشروع',
      published: 'نشر في',
      editor: 'المحرر',
      editorName: 'فريق المحتوى الفني في N-TET',
      summary: `تمت مراجعة هذا المقال حول ${title} كملاحظة تخطيط بثلاث نقاط: سيناريو التشغيل، وملاءمة المعدات، ومتطلبات الدعم الميداني.`,
      note: 'قبل قرار الشراء، ينبغي مقارنة هذا المقال مع صفحات الحلول ومواصفات المنتجات والملحقات ذات الصلة ومتطلبات التشغيل المحلية.',
    };
  }

  return {
    heading: 'Editorial Review and Project Signals',
    published: 'Published',
    editor: 'Editor',
    editorName: 'N-TET Technical Content Team',
    summary: `This article about ${title} is reviewed as a 3-checkpoint planning note: operating scenario, equipment fit, and field support requirements.`,
    note: 'For procurement decisions, readers should compare the article with solution pages, product specifications, related accessories, and local operating requirements.',
  };
}

export default function ArticleEditorialSignals({
  locale,
  title,
  date,
  dateTime,
  compact = false,
}: ArticleEditorialSignalsProps) {
  const copy = localizedCopy(locale, title);

  return (
    <section
      style={{
        margin: compact ? '22px 0' : '34px auto 48px',
        padding: compact ? '18px' : '28px 32px',
        background: '#f7faff',
        border: '1px solid #dbe7f6',
        maxWidth: compact ? undefined : '900px',
        textAlign: 'left',
      }}
    >
      <h2 style={{ margin: '0 0 16px', color: '#0f172a', fontSize: compact ? '22px' : '2.8rem', lineHeight: 1.2, fontWeight: 900, letterSpacing: 0 }}>
        {copy.heading}
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: compact ? '8px' : '14px', marginBottom: '18px', color: '#315ba4', fontWeight: 850, fontSize: compact ? '13px' : '1.45rem' }}>
        <span>
          {copy.published}:{' '}
          <time dateTime={dateTime || date}>{date}</time>
        </span>
        <span>{copy.editor}: {copy.editorName}</span>
      </div>
      <p style={{ margin: '0 0 12px', color: '#334155', fontSize: compact ? '15px' : '1.72rem', lineHeight: 1.75 }}>
        {copy.summary}
      </p>
      <p style={{ margin: 0, color: '#52606d', fontSize: compact ? '15px' : '1.72rem', lineHeight: 1.75 }}>
        {copy.note}
      </p>
    </section>
  );
}

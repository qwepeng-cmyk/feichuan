export default function PerformanceConditionsNote({ locale }: { locale: string }) {
  const title = locale === 'ru' ? 'Условия применимости характеристик' : 'Performance conditions';
  const text = locale === 'ru'
    ? 'Дальность, точность, зона наблюдения и устойчивость сопровождения зависят от конфигурации, высоты установки, рельефа, застройки, погоды, электромагнитной обстановки и характеристик цели. Опубликованные значения относятся к указанным условиям испытаний и подтверждаются обследованием объекта и приемочными испытаниями.'
    : 'Range, accuracy, observation coverage and tracking stability depend on configuration, mounting height, terrain, buildings, weather, RF conditions and target characteristics. Published values apply to stated test conditions and require site survey and acceptance testing.';

  return (
    <aside
      role="note"
      aria-label={title}
      style={{
        width: 'min(1180px, calc(100% - 32px))',
        margin: '32px auto',
        padding: '18px 20px',
        borderLeft: '3px solid #315ba4',
        background: '#f2f6fb',
        color: '#26374d',
        lineHeight: 1.65,
      }}
    >
      <strong style={{ display: 'block', marginBottom: 6 }}>{title}</strong>
      <span>{text}</span>
    </aside>
  );
}

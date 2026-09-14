import styles from './CaseEquipmentList.module.css';

interface CaseEquipmentListProps {
  heading: string;
  items: string[];
  compact?: boolean;
}

export default function CaseEquipmentList({
  heading,
  items,
  compact = false,
}: CaseEquipmentListProps) {
  if (items.length === 0) return null;

  return (
    <section className={`${styles.panel} ${compact ? styles.compact : ''}`}>
      <h2 className={styles.heading}>{heading}</h2>
      <ol className={styles.list}>
        {items.map((item, index) => (
          <li key={`${item}-${index}`} className={styles.item}>
            <span className={styles.index} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className={styles.label}>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

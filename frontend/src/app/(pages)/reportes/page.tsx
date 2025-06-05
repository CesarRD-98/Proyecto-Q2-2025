'use client';
import styles from './reportes.module.scss';

export default function ReportesPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>Abiertos</div>
        <div className={styles.value}>5</div>
      </div>
      <div className={styles.card}>
        <div className={styles.title}>En Progreso</div>
        <div className={styles.value}>3</div>
      </div>
      <div className={styles.card}>
        <div className={styles.title}>Escalado</div>
        <div className={styles.value}>2</div>
      </div>
      <div className={styles.card}>
        <div className={styles.title}>Reabierto</div>
        <div className={styles.value}>2</div>
      </div>
      <div className={styles.card}>
        <div className={styles.title}>Solucionado</div>
        <div className={styles.value}>2</div>
      </div>
      <div className={styles.card}>
        <div className={styles.title}>Total Tickets</div>
        <div className={styles.value}>14</div>
      </div>
    </div>
  );
}

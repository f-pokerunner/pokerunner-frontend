import styles from './index.module.scss';

export default function InfoCard({
  title = '포켓몬 도감',
  backgroundColor = '#b13500',
  children,
}) {
  return (
    <div className={styles.area}>
      <div
        className={styles.titleBox}
        style={{ backgroundColor: backgroundColor }}
      >
        <span className={styles.title}>{title}</span>
      </div>
      <div
        className={styles.infoBox}
        style={{ backgroundColor: backgroundColor }}
      >
        {children}
      </div>
    </div>
  );
}

import styles from "../css/navsection.module.css";

type NavSectionProps = {
  name: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  active?: boolean;
};

export default function NavSection({
  name,
  icon,
  children,
  active,
}: NavSectionProps) {
  return (
    <>
      <div
        className={`${styles.NavSection} ${active ? `${styles.active}` : " "} ${children ? `${styles.scroll}` : " "}`}
      >
        <span className={styles.sectionTitle}>{name.toUpperCase()}</span>
        {icon}
        {children ? (
          <>
            <span className={styles.horDivider} />
            {children}
          </>
        ) : null}
      </div>
    </>
  );
}

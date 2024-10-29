import { ReactNode } from "react";
import styles from "../css/navsection.module.css";

type NavSectionProps = {
  name: string;
  icon: ReactNode;
  children?: ReactNode;
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
        <span className="text-[10px] text-[#919498]">{name.toUpperCase()}</span>
        {icon}
        {children ? (
          <>
            <span className="h-[1px] w-4/5 border-t border-t-[#515151]" />
            {children}
          </>
        ) : null}
      </div>
    </>
  );
}

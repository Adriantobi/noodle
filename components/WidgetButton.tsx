import styles from "../css/widgetbutton.module.css";
type WidgetButtonProps = {
  icon: React.ReactNode;
  label: string;
  currentState?: (arg0: string) => void;
  selected: boolean;
};

export default function WidgetButton({
  icon,
  label,
  currentState,
  selected,
}: WidgetButtonProps) {
  const handleClick = currentState
    ? () => currentState(label.toLowerCase())
    : undefined;

  return (
    <div
      className={`${styles.WidgetButton} ${selected ? `${styles.active}` : " "}`}
      onClick={handleClick}
    >
      <span className={styles.widgetIcon}>{icon}</span>
      <span className={styles.widgetLabel}>{label}</span>
    </div>
  );
}

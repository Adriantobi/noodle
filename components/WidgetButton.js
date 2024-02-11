import styles from '../css/widgetbutton.module.css'

export default function WidgetButton( { icon, label, currentState, menuState, selected } ) {
    return (
        <div className={`${styles.WidgetButton} ${selected ? `${styles.active}` : ' '}`} onClick={ currentState ? () => currentState(label.toLowerCase()) : menuState ? () => menuState() : null }>
            <span className={styles.widgetIcon}>{icon}</span>
            <span className={styles.widgetLabel}>{label}</span>
        </div>
    )
}

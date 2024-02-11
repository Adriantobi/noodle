import styles from '../css/navsection.module.css'

export default function NavSection ( { name, icon, children, active } ) {
    return (
        <>
        <div className={`${styles.NavSection} ${active ? `${styles.active}` : ' '} ${children ? `${styles.scroll}` : ' '}`}>
            <span className={styles.sectionTitle}>{name.toUpperCase()}</span>
            {icon}
            {children ?
                <>
                    <span className={styles.horDivider} />
                    {children}
                </>
                : null
            }
        </div>
        </>
    )
}

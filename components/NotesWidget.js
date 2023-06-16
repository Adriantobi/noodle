import styles from '../css/noteswidget.module.css'

import WidgetCanvas from './Widget'

export default function NotesWidget( props ) {
    return(
        <>
                <WidgetCanvas name='Notes' header='Notes' resize={true} close={props.function} display={props.display}>
                    <div className={styles.notesWrapper}>
                        <textarea className={styles.notesInput} placeholder="Type your notes here..."></textarea>
                    </div>
                </WidgetCanvas>
        </>
    )
}
import styles from '../css/widgetcanvas.module.css'

import FortuneWidget from './widgets/FortuneWidget'
import MediaWidget from './widgets/MediaWidget'
import NotesWidget from './widgets/NotesWidget'
import PomodoroWidget from './widgets/PomodoroWidget'
import SoundBoardWidget from './widgets/SoundBoardWidget'
import TasksWidget from './widgets/TasksWidget'

export default function WidgetCanvas( { states, widgetState } ) {
    return (
        <div className={styles.WidgetCanvas}>
            <FortuneWidget display={states[5]} widgetState={widgetState} /> {/* Refresh every 24hrs */}
            <NotesWidget display={states[2]} widgetState={widgetState} />
            <MediaWidget display={states[3]} widgetState={widgetState} defaultHeight={'236'} defaultWidth={'400'} />
            <PomodoroWidget display={states[0]} widgetState={widgetState} />
            <TasksWidget display={states[1]} widgetState={widgetState} defaultHeight={'240'} defaultWidth={'400'} />
            <SoundBoardWidget display={states[4]} widgetState={widgetState} defaultHeight={'280'} />
        </div>
    )
}

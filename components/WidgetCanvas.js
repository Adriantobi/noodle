import styles from '../css/widgetcanvas.module.css'

import MusicWidget from './MusicWidget'
import PomodoroTimer from './PomodoroTimer'
import ToDoWidget from './ToDoWidget'
import SoundBoardWidget from './SoundBoardWidget'
import QuoteWidget from './QuotesWidget'
import NotesWidget from './NotesWidget'

export default function WidgetCanvas( props ) {
    return (
        <div className={styles.widgetCanvas}>
            <PomodoroTimer display={props.pomodoro} function={ props.pomodoroClose } /> {/* Time and Settings */}
            <ToDoWidget display={props.todo} function={ props.toDoClose } /> {/* Add Percent Completed and Drag */}
            <SoundBoardWidget display={props.sound} function={ props.soundClose } /> {/* Done */}
            <MusicWidget display={props.music} function={ props.musicClose } /> {/* Add Input Transition */}
            <QuoteWidget display={props.quote} function={ props.quoteClose } /> {/* Refresh every 24hrs */}
            <NotesWidget display={props.notes} function={ props.notesClose }/> {/* Done */} 
        </div>
    )
}
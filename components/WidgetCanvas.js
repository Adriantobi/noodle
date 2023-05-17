import styles from '../css/widgetcanvas.module.css'

import MusicWidget from './MusicWidget'
import PomodoroTimer from './PomodoroTimer'
import ToDoWidget from './ToDoWidget'
import SoundBoardWidget from './SoundBoardWidget'
import QuoteWidget from './QuotesWidget'
import NotesWidget from './NotesWidget'

export default function WidgetCanvas() {
   return (
        <div className={styles.widgetCanvas}>
            <MusicWidget /> {/* Add Input Transition */}
            <PomodoroTimer/> {/* Time and Settings */}
            <ToDoWidget /> {/* Add Percent Completed and Drag */}
            <SoundBoardWidget/> {/* Done */}
            <QuoteWidget /> {/* Refresh every 24hrs */}
            <NotesWidget /> {/* Done */} 
        </div>
   )
}
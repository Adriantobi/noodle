import styles from '../../css/widgets/pomodorowidget.module.css'

import Widget from '../Widget'
import { RotateCw, Settings } from 'lucide-react'

export default function PomodoroWidget( { display, widgetState} ) {
    return (
        <>
                <Widget title='Timer' header='Timer' resize={false} widgetState={widgetState} display={display}>
                    <div className={styles.pomodoroTimer}>
                        <div className={styles.timer}>
                            <div className={styles.timerValue}>
                                <span>20:00</span>
                            </div>
                            
                            <div className={styles.timerControls}>
                                <div className={styles.startStop}>Start</div>
                                <span className={styles.resetTimer}>
                                    <RotateCw />
                                </span>
                            </div>
                        </div>
                        
                        <div className={styles.timerOptions}>
                            <div className={`${styles.timerType} ${styles.pomodoro}`}>Pomodoro</div>
                            <div className={`${styles.timerType} ${styles.shortBreak}`}>Short Break</div>
                            <div className={`${styles.timerType} ${styles.longBreak}`}>Long Break</div>
                            <span className={styles.timerSettings}>
                               <Settings /> 
                            </span>
                        </div>
                    </div>
                </Widget>
        </>
    )
}

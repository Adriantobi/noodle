'use client'

import styles from '../../css/widgets/taskswidget.module.css'

import Widget from "../Widget";
import TaskItem from "./components/TaskItem";
import { Plus } from 'lucide-react';

import { useState } from 'react';

export default function TasksWidget( { display, widgetState, defaultHeight, defaultWidth } ) {
    const [taskList, setTaskList] = useState([])
    const [totalTasks, setTotalTasks] = useState(0)
    const [totalCheckedTasks, setTotalCheckedTasks] = useState(0)

    const addItem = () => {
        setTaskList(prevTaskList => [<TaskItem key={taskList.length} taskKey={taskList.length} removeTask={removeTask} changeCheckedTasks={changeCheckedTasks} />, ...prevTaskList])
        setTotalTasks(totalTasks + 1)
    }

    const removeTask = () => {
        if (totalTasks > 0) {
            setTotalTasks(totalTasks - 1)
        }
    }

    const changeCheckedTasks = (toDo) => {
        if (toDo === 'add') {
            if (totalCheckedTasks < totalTasks) {
                setTotalCheckedTasks(totalCheckedTasks + 1)
            }
        } else if (toDo === 'remove') {
            if (totalCheckedTasks > 0) {
                setTotalCheckedTasks(totalCheckedTasks - 1)
            }
        }
    }

    return (
        <>
            <Widget title='Tasks' header='Tasks' resize={true} widgetState={widgetState} display={display} visibleResize={true} defaultHeight={defaultHeight} defaultWidth={defaultWidth}>
                    <div className={styles.newTaskItem} onClick={ addItem }>
                        <Plus />
                        <span>Add task</span>
                    </div>
                    <div className={styles.tasksList}>
                        {taskList}
                    </div>
                    <div className={styles.taskProgress}>
                        <div className={styles.progressBar}>
                            <div className={styles.innerProgressBar} style={{width : `${totalCheckedTasks/totalTasks * 100}%`}}/>
                        </div>
                        <span className={styles.progressInfo}>{`${totalCheckedTasks} / ${totalTasks}`}</span>
                    </div>
            </Widget>
        </>
    )
}

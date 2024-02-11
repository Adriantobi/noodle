import styles from  '../../../css/widgets/components/taskitem.module.css'

import { useState, useEffect } from 'react';
import { MoreVertical, Trash } from 'lucide-react';

export default function TaskItem( { taskKey, removeTask, changeCheckedTasks } ) {
    const [checked, setChecked] = useState(false)
    const [display, setDisplay] = useState(true)
    const [more, setMore] = useState(false)

    useEffect(() => {
        if (checked === true) {
            if (document.querySelector(`.${styles.taskItemName}_${taskKey}`).value === '') {
                deleteTask() 
            } else if (document.querySelector(`.${styles.taskItemName}_${taskKey}`).value !== '') {
                document.querySelector(`.${styles.taskItemName}_${taskKey}`).style.textDecoration = 'line-through'
                document.querySelector(`.${styles.taskItemName}_${taskKey}`).style.color = 'rgb(145, 148, 152)'
                changeCheckedTasks('add')
            }
        } else {
            document.querySelector(`.${styles.taskItemName}_${taskKey}`).style.textDecoration = 'none'
            document.querySelector(`.${styles.taskItemName}_${taskKey}`).style.color = 'rgb(255, 255, 255)'
            changeCheckedTasks('remove')
        }
    }, [checked])

    const deleteTask = () => {
        setDisplay(false)
        removeTask()
        if (checked === true) {
            changeCheckedTasks('remove')
        }
    }

    const autoHeight = () => {
        const text = document.querySelector(`.${styles.taskItemName}_${taskKey}`)
        text.style.height = '18px'
        text.style.height = `${text.scrollHeight}px`
    }

    return (
        <>
            { display ?
                <div className={styles.taskItem} key={taskKey} draggable={true}>
                    <div className={`${styles.dragItem} ${styles.iconButtons}`}>
                        <MoreVertical />
                        <MoreVertical />
                    </div>

                    <div className={styles.itemDetails}>
                        <input type='checkbox' onClick={ () => setChecked(!checked) } />
                        <textarea className={`${styles.taskItemName} ${styles.taskItemName}_${taskKey}`} onChange={() => autoHeight()} placeholder='Add a task' disabled={checked} />
                        <span className={styles.moreOptions} onClick={() => deleteTask()}> {/*setMore(!more)*/}
                            {/*<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>*/}
                            <Trash />
                        </span>
                    </div>

                    {more ? <div className={styles.itemActions}>
                        <div className={styles.actionItem}>
                            Edit
                        </div>
                        <div className={styles.actionItem} onClick={() => deleteTask()}>
                            Delete
                        </div>
                    </div> : null}
                </div>
            : null }
        </>
    )
}

import styles from  '../css/todolistitem.module.css'

import { useState, useEffect } from 'react';

import MenuSpaces from './MenuSpaces';

export default function ToDoListItem( props ) {
    const [checked, setChecked] = useState(false)
    const [display, setDisplay] = useState(true)

    useEffect(() => {
        if (checked === true && document.querySelector(`.${styles.toDoItemName}`).value !== '') {
            document.querySelector(`.${styles.toDoItemName}`).style.textDecoration = 'line-through'
        }
        else {
            document.querySelector(`.${styles.toDoItemName}`).style.textDecoration = 'none'
        }
    }, [checked])

    return (
        <>
            { display ?
                <div className={styles.toDoListItem} key={props.key}>
                    <div className={`${styles.dragItem} ${styles.iconButtons}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </div>

                    <div className={styles.itemDetails}>
                        <input type='checkbox' onChange={ () => setChecked(!checked) }></input>
                        <input className={styles.toDoItemName} placeholder='To-Do'></input>
                    </div>

                    <div className={styles.itemActions}>
                        <div className={`${styles.removeItem} ${styles.iconButtons}`} onClick={() => setDisplay(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </div>
                    </div>
                </div>
            : null }
        </>
    )
}
'use client'

import styles from '../css/todowidget.module.css'

import Widget from "./Widget";
import ToDoListItem from "./ToDoListItem";

import { useState, useEffect } from 'react';

export default function ToDoWidget() {
    var plusSvg = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>

    const [toDoList, setToDoList] = useState([]);

    const addItem = event => {
        setToDoList(toDoList.concat(<ToDoListItem key={toDoList.length}/>))
    }

    return (
        <Widget name='To_Do' header='To-Do' resize={true}>
            <div className={styles.toDoList}>
                {toDoList}
                <div className={styles.newToDoItem} onClick={ addItem }>
                    {plusSvg}
                    <span>New To-Do</span>
                </div>
            </div>
        </Widget>
    )
}
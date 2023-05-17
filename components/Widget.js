'use client'

import styles from '../css/widget.module.css'

import React, { useState, useEffect } from 'react'

export default function WidgetCanvas( props ) {
    const [resizeIcon, setResizeIcon] = useState(false)
    const [drag, setDrag] = useState(false)
    const [position, setPosition] = useState({x: 0, y: 0})

    useEffect(() => {
          document.querySelector(`.${styles.widget}_${props.name}`).style.top = `${position.y}px`
          document.querySelector(`.${styles.widget}_${props.name}`).style.left = `${position.x}px`
    }, [position, props])

    // Update the current position if mouse is down
    const onMouseMove = (event) => {
        if (drag) {
            setPosition({
                x: position.x + event.movementX,
                y: position.y + event.movementY
            })

            document.querySelector(`.${styles.widgetHeader}_${props.name}`).style.cursor = 'grabbing'
            document.body.style.cursor = 'grabbing'
        }

        else {
            document.querySelector(`.${styles.widgetHeader}_${props.name}`).style.cursor = 'grab'
            document.body.style.cursor = 'default'
        }
    }

    document.body.addEventListener('mousemove', onMouseMove)

    document.body.addEventListener('mouseup', (e) => { setDrag(false); document.body.removeEventListener('mousemove', onMouseMove) })

    return (
        <div className={`${styles.widget} ${styles.widget}_${props.name} ${props.resize ? `${styles.resizable}` : '' } ${props.clear ? `${styles.transparent}` : '' }`} onMouseEnter={ () => setResizeIcon(!resizeIcon) } onMouseMove={ () => setResizeIcon(true) } onMouseLeave={() => setResizeIcon(!resizeIcon)}>
            <div className={`${styles.widgetHeader} ${styles.widgetHeader}_${props.name} ${props.clear ? `${styles.transparent}` : '' }`} onMouseDown={ () => setDrag(true) } id={styles.header}>
                <div className={styles.widgetTitle}>{props.header}</div>
                <div className={styles.closeWidget}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </div>
            </div>

            <div className={styles.widgetContent}>
                { props.children }
            </div>

            {props.resize && resizeIcon ? <div className={styles.resize}><svg width="16" height="16" fill="none" class="resize-widget-corner"><path d="M5.333 11.333a.667.667 0 100-1.333.667.667 0 000 1.333zM8 11.333A.667.667 0 108 10a.667.667 0 000 1.333zM8 8.666a.667.667 0 100-1.333.667.667 0 000 1.333zM10.667 6a.667.667 0 100-1.333.667.667 0 000 1.333zM10.667 11.333a.667.667 0 100-1.333.667.667 0 000 1.333zM10.667 8.666a.667.667 0 100-1.333.667.667 0 000 1.333z"></path></svg></div> : null}
        </div>
    )
}
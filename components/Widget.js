'use client'

import { Minus } from 'lucide-react'
import styles from '../css/widget.module.css'

import React, { useState, useEffect } from 'react'

export default function Widget( { title, resize, visibleResize, clear, display, header, widgetState, children, defaultHeight, defaultWidth } ) {
    const [resizeIcon, setResizeIcon] = useState(false)
    const [drag, setDrag] = useState(false)
    const [position, setPosition] = useState({x: 0, y: 0})

    useEffect(() => {
          document.querySelector(`.${styles.widget}_${title}`).style.top = `${position.y}px`
          document.querySelector(`.${styles.widget}_${title}`).style.left = `${position.x}px`
    }, [position, title] )

    // Update the current position if mouse is down
    useEffect(() => {
        const onMouseMove = (event) => {
            const windowHeight = document.querySelector(`.${styles.widget}_${title}`).parentNode.getBoundingClientRect().height
            const windowWidth = document.querySelector(`.${styles.widget}_${title}`).parentNode.getBoundingClientRect().width
    
            const widgetTopPos = document.querySelector(`.${styles.widget}_${title}`).getBoundingClientRect().bottom + event.movementY
            const widgetLeftPos = document.querySelector(`.${styles.widget}_${title}`).getBoundingClientRect().right +event.movementX
    
            const widgetWidth = document.querySelector(`.${styles.widget}_${title}`).getBoundingClientRect().width
            const widgetHeight = document.querySelector(`.${styles.widget}_${title}`).getBoundingClientRect().height
    
            if (drag) {
                if (widgetTopPos >= 48 + widgetHeight && widgetLeftPos > widgetWidth && widgetTopPos <= windowHeight + 48 && widgetLeftPos <= windowWidth) {
                    setPosition({
                        x: position.x + event.movementX,
                        y: position.y + event.movementY
                    })
                }
    
                document.querySelector(`.${styles.widgetHeader}_${title}`).style.cursor = 'grabbing'
                document.body.style.cursor = 'grabbing'
            }
    
            else {
                document.querySelector(`.${styles.widgetHeader}_${title}`).style.cursor = 'grab'
                document.body.style.cursor = 'default'
            }
        }
    
        document.body.addEventListener('mousemove', onMouseMove)
        document.body.addEventListener('touchmove', onMouseMove)
    
        document.body.addEventListener('mouseleave', (e) => { setDrag(false); document.body.removeEventListener('mousemove', onMouseMove) })
    
        document.body.addEventListener('mouseup', (e) => { setDrag(false); document.body.removeEventListener('mousemove', onMouseMove) })
        document.body.addEventListener('touchend', (e) => { setDrag(false); document.body.removeEventListener('touchmove', onMouseMove) })
    },[drag, position, title])

    return (
        <div style={{ height : defaultHeight ? `${defaultHeight}px` : 'auto', width : defaultWidth ? `${defaultWidth}px` : ''}} className={`${styles.widget} ${styles.widget}_${title} ${resize ? `${styles.resizable}` : '' } ${clear ? `${styles.transparent}` : '' } ${display ? ' ' : `${styles.display}` }`} onMouseEnter={ () => setResizeIcon(!resizeIcon) } onMouseMove={ () => setResizeIcon(true) } onMouseLeave={() => setResizeIcon(!resizeIcon)}>
            <div className={`${styles.widgetHeader} ${styles.widgetHeader}_${title} ${clear ? `${styles.transparent}` : '' }`} onMouseDown={ () => setDrag(true) } onTouchStart={ () => setDrag(true) } id={styles.header}>
                <div className={styles.widgetTitle}>{header}</div>
                <div className={styles.closeWidget} onClick={() => widgetState(title.toLowerCase())}>
                    <Minus />
                </div>
            </div>

            <div className={styles.widgetContent}>
                { children }
            </div>

            {(resize && resizeIcon) || visibleResize ? <div className={`${styles.resize} ${visibleResize ? `${styles.visibleResize}` : ''}`}><svg width="16" height="16" fill="none" class="resize-widget-corner"><path d="M5.333 11.333a.667.667 0 100-1.333.667.667 0 000 1.333zM8 11.333A.667.667 0 108 10a.667.667 0 000 1.333zM8 8.666a.667.667 0 100-1.333.667.667 0 000 1.333zM10.667 6a.667.667 0 100-1.333.667.667 0 000 1.333zM10.667 11.333a.667.667 0 100-1.333.667.667 0 000 1.333zM10.667 8.666a.667.667 0 100-1.333.667.667 0 000 1.333z"></path></svg></div> : null}
        </div>
    )
}

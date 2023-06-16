'use client'

import styles from '../css/sidenav.module.css'

import MenuSpaces from './MenuSpaces'

import { useState, useEffect } from 'react'

export default function SideNav( props ) {
    const [menuSpacesOpen, setMenuSpacesOpen] = useState(false)
    const [showElement, setShowElement] = useState(true)

    const changeState = () => {
        setMenuSpacesOpen(!menuSpacesOpen)
    }

    useEffect(() => {
        setTimeout(() => {
            setShowElement(false)
        }, 30000)
    },[showElement])

    useEffect(() => {
        window.addEventListener('click', () => setShowElement(true))
        window.addEventListener('mousemove', () => setShowElement(true))
    },[])

    return (
        <div className={styles.SideNav}>
            { showElement ?
                <div className={styles.SideNavMenu}>
                    <ul>
                        <li className={styles.toolBarIcon} onClick={ () => setMenuSpacesOpen(!menuSpacesOpen) }><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg><p className={styles.toolBarTitles}>Spaces</p></li>
                        <li className={styles.toolBarIcon}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-wind"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg><p className={styles.toolBarTitles}>Breathe</p></li>
                        <span className={styles.horizontalSpacer}></span>
                        <li className={styles.toolBarIcon}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg><p className={styles.toolBarTitles}>Calendar</p></li>
                        <li className={styles.toolBarIcon} onClick={ props.pomodoro } ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg><p className={styles.toolBarTitles}>Timer</p></li>
                        <li className={styles.toolBarIcon} onClick={ props.music }><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-music"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg><p className={styles.toolBarTitles}>Music</p></li>
                        <li className={styles.toolBarIcon} onClick={ props.sound }><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sliders"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg><p className={styles.toolBarTitles}>Sounds</p></li>
                        <li className={styles.toolBarIcon} onClick={ props.toDo }><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg><p className={styles.toolBarTitles}>To-do</p></li>
                        <li className={styles.toolBarIcon} onClick={ props.notes }><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg><p className={styles.toolBarTitles}>Notes</p></li>
                        <li className={styles.toolBarIcon} onClick={ props.quote }><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg><p className={styles.toolBarTitles}>Quote</p></li>
                        <span className={styles.horizontalSpacer}></span>
                    </ul>
                </div>
            : null }
                
            { menuSpacesOpen ? <MenuSpaces function={changeState} class={showElement} creator={props.creatorname} space={props.spacename} link={props.link} instagram={props.instagram} youtube={props.youtube} website={props.website} twitter={props.twitter} /> : null }
        </div>
    )
}
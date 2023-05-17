'use client'

import styles from '../css/topnav.module.css'

import DropMenu from './DropMenu';

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function TopNav() {
    const [dropDownOpen, setDropDownOpen] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)

    useEffect(() => {
        if (fullScreen) {
            document.querySelector(`.${styles.minimise}`).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minimize-2"><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>'
            document.body.requestFullscreen()
        }
        else {
            document.querySelector(`.${styles.minimise}`).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-maximize-2"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>'
            document.exitFullscreen()
        }
    },[fullScreen])

    document.addEventListener('fullscreenchange', (event) => {
        if (document.fullscreenElement) {
            setFullScreen(true)
        } else {
            setFullScreen(false)
        }
    })

    return (
        <>
            <div className={styles.TopNav}>
                <div className={styles.noodleInfoSection}>
                    <Link href='/home'>
                        <div className={`${styles.companyButton} ${styles.noodleTopNavButton}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        </div>
                    </Link>

                    <div className={`${styles.upgradeButton} ${styles.noodleTopNavButton}`}>🎁 For you</div>

                    <div className={`${styles.userMetrics} ${styles.noodleTopNavButton}`}>4 🔥</div>
                </div>

                <div className={styles.roomInfo}>
                    <div className={`${styles.roomName} ${styles.noodleTopNavButton}`}>adriantd&apos;s Room</div>
                </div>

                <div className={styles.roomSettings}>
                    <div className={`${styles.settingsButton} ${styles.noodleTopNavButton}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    </div>

                    <div className={`${styles.settingsButton} ${styles.noodleTopNavButton}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                    </div>

                    <div className={`${styles.settingsButton} ${styles.noodleTopNavButton} ${styles.minimise}`} onClick={ () => setFullScreen(!fullScreen) }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-maximize-2"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                    </div>

                    <span className={styles.verticalSpacer}></span>

                    <div className={`${styles.settingsButton} ${styles.noodleTopNavButton}`} onClick={ () => setDropDownOpen(!dropDownOpen) }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                </div>
            </div>

            { dropDownOpen ? <DropMenu /> : null }
        </>
    )
}
'use client'

import styles from '../css/audiocomponent.module.css'

import { useState, useEffect } from 'react'

export default function AudioComponent( props ) {
    const [volume, setVolume] = useState(0)
    const [muted,setMuted] = useState(true);

    useEffect(() => {
        var mutedicon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-x"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>'
        var unmutedicon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>'

        if (muted === true) {
            document.querySelector(`.${styles.volumeStateToggle}_${props.id}`).innerHTML = mutedicon
            document.querySelector(`.${styles.audioControls}_${props.id} audio`).muted = true
            document.querySelector(`.${styles.volumeSlider}_${props.id}`).value = 0
        }

        else {
            if (volume > 0) {
                document.querySelector(`.${styles.audioControls}_${props.id} audio`).muted = false
                document.querySelector(`.${styles.volumeSlider}_${props.id}`).value = volume
                document.querySelector(`.${styles.audioControls}_${props.id} audio`).volume = volume/100
            }

            else {
                document.querySelector(`.${styles.audioControls}_${props.id} audio`).muted = false
                document.querySelector(`.${styles.volumeSlider}_${props.id}`).value = 50
                document.querySelector(`.${styles.audioControls}_${props.id} audio`).volume = 50/100
            }
            document.querySelector(`.${styles.volumeStateToggle}_${props.id}`).innerHTML = unmutedicon
        }
    },[muted, volume, props])

    useEffect(() => {
        var mutedicon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-x"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>'
        var unmutedicon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>'
        
        if (volume > 0) {
            document.querySelector(`.${styles.audioControls}_${props.id} audio`).muted = false
            document.querySelector(`.${styles.audioControls}_${props.id} audio`).volume = volume/100
            document.querySelector(`.${styles.volumeStateToggle}_${props.id}`).innerHTML = unmutedicon
        }

        else {
            document.querySelector(`.${styles.audioControls}_${props.id} audio`).muted = true
            document.querySelector(`.${styles.volumeStateToggle}_${props.id}`).innerHTML = mutedicon
        }
    }, [volume, props])

    return (
        <div className={styles.audioSource}>
            <div className={styles.audioTitle}>{props.name}</div>
            <div className={`${styles.audioControls} ${styles.audioControls}_${props.id}`}>
                <div className={`${styles.volumeStateToggle} ${styles.volumeStateToggle}_${props.id}`} onClick={ () => setMuted(!muted) }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-x"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                </div>

                <audio autoplay="autoplay" loop="loop" src={`${props.source}`} controls />

                <input type="range" min="0" max="100" value={volume} className={`${styles.volumeSlider} ${styles.volumeSlider}_${props.id}`} onChange={(event) => setVolume(event.target.value)}/>
            </div>
        </div>
    )
}
'use client'

import styles from '../../../css/widgets/components/audiocomponent.module.css'
import { Volume2, VolumeX } from 'lucide-react'

import { useState, useEffect } from 'react'

export default function AudioComponent( { id, name, source } ) {
    const [volume, setVolume] = useState(0)
    const [tempVol, setTempVol] = useState(0)
    const [muted,setMuted] = useState(true);
    const [muteIcon, setMuteIcon] = useState(<VolumeX />)

    useEffect(() => {
        setTempVol(volume)
        if (muted === true) {
            setMuteIcon(<VolumeX />)
            document.querySelector(`.${styles.audioControls}_${id} audio`).muted = true
            setVolume(0)
        }

        else {
            if (tempVol > 0) {
                document.querySelector(`.${styles.audioControls}_${id} audio`).muted = false
                document.querySelector(`.${styles.audioControls}_${id} audio`).volume = tempVol/100
                setVolume(tempVol)
            }

            else {
                document.querySelector(`.${styles.audioControls}_${id} audio`).muted = false
                setVolume(50)
                document.querySelector(`.${styles.audioControls}_${id} audio`).volume = 50/100
            }
            setMuteIcon(<Volume2 />)
        }
    },[muted])

    useEffect(() => {
        if (volume > 0) {
            setTempVol(volume)
            setMuted(false)
            document.querySelector(`.${styles.audioControls}_${id} audio`).volume = volume/100
            setMuteIcon(<Volume2 />)
        }

        else {
            setMuted(true)
        }
    }, [volume])

    return (
        <div className={styles.audioSource}>
            <div className={styles.audioTitle}>{name}</div>
            <div className={`${styles.audioControls} ${styles.audioControls}_${id}`}>
                <div className={`${styles.volumeStateToggle} ${styles.volumeStateToggle}_${id}`} onClick={ () => setMuted(!muted) }>
                    {muteIcon}
                </div>

                <audio autoplay="autoplay" loop="loop" src={`${source}`} controls />

                <input type="range" min="0" max="100" value={volume} className={`${styles.volumeSlider} ${styles.volumeSlider}_${id}`} onChange={(event) => setVolume(event.target.value)}/>
            </div>
        </div>
    )
}

'use client'

import styles from '../../css/widgets/mediawidget.module.css'

import Widget from "../Widget"
import { RotateCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MediaWidget ( { display, widgetState, defaultHeight, defaultWidth } ) {
    const [playlist, setPlaylist] = useState()

    useEffect(() => {
        setPlaylist(localStorage.getItem('playlist') !== null ? localStorage.getItem('playlist') : 'playlist/3BagbZs5aHeJke8kQqyomJ')
    }, [])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && document.querySelector(`.${styles.changePlaylist} input`).value !== '') {
            handleSubmit()
        }
    };

    const handleSubmit = (event) => {
        if (document.querySelector(`.${styles.changePlaylist} input`).value !== '') {
            const playlistId = document.querySelector(`.${styles.changePlaylist} input`).value.replace('https://open.spotify.com/','')
            setPlaylist(playlistId)
            document.querySelector(`.${styles.changePlaylist} input`).value = ''
            localStorage.setItem('playlist', playlistId)
        }
    }

    return (
        <>
                <Widget title='Media' header='Media' resize={true} widgetState={widgetState} display={display} defaultHeight={defaultHeight} defaultWidth={defaultWidth}>
                    <iframe style={{borderRadius: '12px', width: '100%', backgroundColor: 'rgb(35, 42, 49)'}} className={styles.spotifyEmbed} src={`https://open.spotify.com/embed/${playlist}?utm_source=generator`} width="100%" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

                    <div className={styles.musicSettings}>
                        <div className={styles.changePlaylist}>
                            <input type="text" placeholder="Enter Spotify URL here" data-tip="Paste a link to YouTube video/playlist, or a Spotify or Apple Music playlist, album, or song, then press 'enter'" tabindex="-1" onKeyDown={handleKeyDown}/>
                        </div>
                        <div className={styles.saveNewPlayList} onClick={ handleSubmit }>Save</div>
                        <div className={styles.resetPlaylist} onClick={() => {setPlaylist('playlist/3BagbZs5aHeJke8kQqyomJ'); localStorage.setItem('playlist', 'playlist/3BagbZs5aHeJke8kQqyomJ')}}>
                            <RotateCw />
                        </div>
                    </div>
                </Widget>
        </>
    )
}

'use client'

import styles from '../css/musicwidget.module.css'

import Widget from "./Widget"

import { useState, useEffect } from 'react';

export default function MusicWidget () {
    const [playlist, setPlaylist] = useState('playlist/3BagbZs5aHeJke8kQqyomJ')

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && document.querySelector(`.${styles.changePlaylist} input`).value !== '') {
          setPlaylist(document.querySelector(`.${styles.changePlaylist} input`).value.replace('https://open.spotify.com/',''))
          document.querySelector(`.${styles.changePlaylist} input`).value = ''
        }
    };

    const handleSubmit = (event) => {
        if (document.querySelector(`.${styles.changePlaylist} input`).value !== '') {
            setPlaylist(document.querySelector(`.${styles.changePlaylist} input`).value.replace('https://open.spotify.com/',''))
            document.querySelector(`.${styles.changePlaylist} input`).value = ''
        }
    }

    return (
        <Widget name='Media' header='Media' resize={true}>
            <iframe width="100%" className={styles.spotifyEmbed} style={{borderRadius:'0px', width : '100%'}} src={`https://open.spotify.com/embed/${playlist}?utm_source=generator`} frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
            
            <div className={styles.musicSettings}>
                <div className={styles.changePlaylist}>
                    <input type="text" placeholder="Enter Spotify URL here" data-tip="Paste a link to YouTube video/playlist, or a Spotify or Apple Music playlist, album, or song, then press 'enter'" tabindex="-1" onKeyDown={handleKeyDown}/>
                </div>
                <div className={styles.saveNewPlayList} onClick={ handleSubmit }>Save</div>
                <div className={styles.resetPlaylist} onClick={() => setPlaylist('playlist/3BagbZs5aHeJke8kQqyomJ')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rotate-cw"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                </div>
            </div>
        </Widget>
    )
}
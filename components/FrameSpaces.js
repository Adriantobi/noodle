'use client'

import styles from '../css/framespaces.module.css'

import YouTube from "react-youtube";

export default function FrameSpaces( props ) {
    const opts = { 
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          loop: 1,
        }
    }

    return (
        <div className={styles.FrameSpaces} key={`category ${props.category}`}>
            <YouTube 
                videoId={props.source}
                className={styles.FrameVideo}
                opts={opts}
            />
            {/* <iframe width="560" height="315" className={styles.FrameVideo} src={`https://www.youtube.com/embed/${props.source}?autoplay=1&loop=1&playlist=${props.source}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
        </div>
    )
}
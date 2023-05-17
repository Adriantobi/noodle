import styles from '../css/framespaces.module.css'

export default function FrameSpaces( props ) {
    return (
        <div className={styles.FrameSpaces} key={`category ${props.category}`}>
            <iframe width="560" height="315" className={styles.FrameVideo} src={`https://www.youtube.com/embed/${props.source}?autoplay=1&loop=1&playlist=${props.source}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
    )
}
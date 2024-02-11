import styles from '../../css/widgets/breathewidget.module.css'
import Image from 'next/image'
import { X } from 'lucide-react'

export default function BreatheWidget ({ display, widgetState }) {
    return (
        <>
        <div className={styles.BreatheWidget} style={{display : display ? 'flex' : 'none'}}>
            <span className={styles.closeButton} onClick={() => widgetState('breathe')}>
                <X />
            </span>
            <Image 
                src={'https://lifeat.io/6ed030cabcec50a1584a.gif'}
                width={0}
                height={0}
                sizes="100vw"
                style={{ maxWidth: '60%', maxHeight: '60%', width: 'auto', height: 'auto' }}
                alt={'Breathe Gif'}
            />
        </div>
        </>
    )
}

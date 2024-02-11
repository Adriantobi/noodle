import { useEffect } from 'react'

import styles from '../css/shufflecategorywrapper.module.css'
import { useRouter } from 'next/navigation';

function CategoryItem ( { category, src, setAllSpaceDetails } ) {
    const showTooltip = (e) => {
        const tooltip = e.target.classList.contains(`.${styles.noodleToolTip}`)
            ? e.target
            : e.target.querySelector(`:scope .${styles.noodleToolTip}`);
        tooltip.style.left =
            (e.pageX + tooltip.clientWidth + 10 < document.body.clientWidth)
                ? (e.pageX + 10 + "px")
                : (document.body.clientWidth + 5 - tooltip.clientWidth + "px");
        tooltip.style.top =
            (e.pageY + tooltip.clientHeight + 10 < document.body.clientHeight)
                ? (e.pageY + 10 + "px")
                : (document.body.clientHeight + 5 - tooltip.clientHeight + "px");
    }

    useEffect(() => {
        const tooltips = document.querySelectorAll(`.${styles.shuffleCategoryWrapper}`);
        for(var i = 0; i < tooltips.length; i++) {
            tooltips[i].addEventListener('mousemove', showTooltip);
        }
    }, [])

    const router = useRouter()
    
    return (
        <div className={styles.shuffleCategoryWrapper} onClick={() => { setAllSpaceDetails(category) }}>
            <div className={styles.shuffleCategoryButton}>
                <span className={styles.noodleToolTip}>{category}</span>
                <picture>
                    <img 
                        className={styles.spaceCategoryIcon}
                        src={src}
                        alt={`An emoji for ${category.toUpperCase()} space category.`}
                    />
                </picture>
            </div>
        </div>
    )
}

export default function ShuffleCategoryWrapper ( props ) {
    return (
        <CategoryItem {...props} />
    )
}

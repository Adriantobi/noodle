import { useEffect } from 'react';

import styles from '../css/shufflecategorywrapper.module.css'

export default async function ShuffleCategoryWrapper ( props ) {
    function showTooltip(e) {
        var tooltip = e.target.classList.contains(`.${styles.noodleToolTip}`)
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
        var tooltips = document.querySelectorAll(`.${styles.shuffleCategoryWrapper}`);
        for(var i = 0; i < tooltips.length; i++) {
            tooltips[i].addEventListener('mousemove', showTooltip);
        }
    }, [])
    
    return (
        <div className={styles.shuffleCategoryWrapper}>
            <div className={styles.shuffleCategoryButton}>
                <span className={styles.noodleToolTip}>{props.tooltip}</span>
                <picture>
                    <img 
                        className={styles.spaceCategoryIcon}
                        src={props.src}
                        alt={`An emoji for ${props.tooltip.toUpperCase()} space category.`}
                    />
                </picture>
            </div>
        </div>
    )
}
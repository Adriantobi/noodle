import styles from '../css/menuspaces.module.css'

import ShuffleCategoryWrapper from './ShuffleCategoryWrapper'

import React, { useState, useEffect } from 'react'

export default function MenuSpaces( props ) {
    //Close MenuSpaces
    const [menuSpacesOpen, setMenuSpacesOpen] = useState(props.open);
    const [dateState, setDateState] = useState(new Date());
    useEffect(() => {
           setInterval(() => setDateState(new Date()), 1000);
    }, []);

    //Set Volume
    const [volume,setVolume] = useState(0);

    useEffect(() => {
        if (volume > 0) {
            setMuted(false)
        }

        else {
            setMuted(true)
        }
    },[volume])

    //Move Carousel
    function moveCarouselLeft() {
        if (document.querySelector(`.${styles.spacesCategoryCarousel}`).scrollLeft > 252) {
            document.querySelector(`.${styles.spacesCategoryCarousel}`).scrollTo(252,0);
        }
        else {
            document.querySelector(`.${styles.spacesCategoryCarousel}`).scrollTo(0,0);
        }
    }
    
    function moveCarouselRight() {
        if (document.querySelector(`.${styles.spacesCategoryCarousel}`).scrollLeft < 252) {
            document.querySelector(`.${styles.spacesCategoryCarousel}`).scrollTo(252,0);
        }
        else {
            document.querySelector(`.${styles.spacesCategoryCarousel}`).scrollTo(376,0);
        }
    }

    const [muted,setMuted] = useState(true);

    useEffect(() => {
        var mutedicon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-x"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>'
        var unmutedicon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>'

        if (muted === true) {
            document.querySelector(`.${styles.volumeStateToggle}`).innerHTML = mutedicon
            document.querySelector(`.${styles.volumeSlider}`).value = 0
        }

        else {
            if (volume > 0) {
                document.querySelector(`.${styles.volumeSlider}`).value = volume
            }

            else {
                document.querySelector(`.${styles.volumeSlider}`).value = 50
            }
            document.querySelector(`.${styles.volumeStateToggle}`).innerHTML = unmutedicon
        }
    },[muted, volume])

    const [saved, setSaved] = useState(false)

    useEffect(() => {
        if (saved === true) {
            document.querySelector(`.${styles.saveSpace} svg`).style.fill = '#d68e7f';
        }
        else {
            document.querySelector(`.${styles.saveSpace} svg`).style.fill = 'none';
        }
    },[saved])

    return (
        <>
            { menuSpacesOpen ?
                <div className={styles.MenuSpacesContainer}>
                    <div className={styles.sideBarIcon} onClick={ () => {setMenuSpacesOpen(!menuSpacesOpen)} }>
                        <svg width="26" height="42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h21a5 5 0 015 5v32a5 5 0 01-5 5H0V0z" fill="#3C4551"></path><path d="M7.923 21.64a.778.778 0 010-1.28l6.606-4.576a.778.778 0 011.221.639v9.154a.778.778 0 01-1.22.64l-6.607-4.578z" fill="#fff"></path></svg>
                    </div>

                    <div className={styles.MenuSpaces}>
                        <div className={styles.spacesSideBarHeader}>
                            <div className={styles.noodleButton}>Explore 🔍</div>
                            <span className={styles.currentTime}>
                                {dateState.toLocaleString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                })}
                            </span>
                        </div>

                        <div className={styles.shufflerHeader}>
                            <div className={styles.shufflerHeaderTitle}>Shuffle Spaces</div>
                            <div className={styles.shufflerControls}>
                                <div className={styles.shufflerLeft} onClick={moveCarouselLeft}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg></div>
                                <div className={styles.shufflerRight} onClick={moveCarouselRight}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
                            </div>
                        </div>

                        <div className={styles.shufflerDescription}>Click an emoji multiple times for more content</div>

                        <div className={styles.spacesCategoryCarousel}>
                            <div className={styles.carouselRow}>
                                <ShuffleCategoryWrapper 
                                    category='Beach' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/beach-with-umbrella_1f3d6-fe0f.png'
                                />
                                <ShuffleCategoryWrapper 
                                    category='Code' 
                                    src='https://em-content.zobj.net/thumbs/120/apple/325/laptop_1f4bb.png'
                                />
                                <ShuffleCategoryWrapper 
                                    category='Celebrity' 
                                    src='https://em-content.zobj.net/thumbs/120/apple/325/microphone_1f3a4.png'
                                />
                                <ShuffleCategoryWrapper 
                                    category='Mystery' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/face-with-monocle_1f9d0.png'
                                />                    
                                <ShuffleCategoryWrapper 
                                    category='Anime' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/354/shinto-shrine_26e9-fe0f.png'
                                />
                                <ShuffleCategoryWrapper 
                                    category='Nature' 
                                    src='https://em-content.zobj.net/thumbs/120/apple/325/mountain_26f0-fe0f.png'
                                />
                                <ShuffleCategoryWrapper 
                                    category='Study With Me' 
                                    src='https://em-content.zobj.net/thumbs/120/apple/325/woman-technologist_1f469-200d-1f4bb.png'
                                />
                                <ShuffleCategoryWrapper 
                                    category='Walk' 
                                    src='https://em-content.zobj.net/thumbs/120/apple/325/person-walking_1f6b6.png'
                                />
                                <ShuffleCategoryWrapper 
                                    category='Snow' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/snowman_2603-fe0f.png'
                                />
                                <ShuffleCategoryWrapper 
                                    category='Art' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/artist-palette_1f3a8.png'
                                />
                            </div>
                            <div className={styles.carouselRow}>
                                <ShuffleCategoryWrapper 
                                    category='Window' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/window_1fa9f.png'
                                />
                                <ShuffleCategoryWrapper 
                                    category='Lofi' 
                                    src='https://em-content.zobj.net/thumbs/120/apple/325/crystal-ball_1f52e.png'
                                />
                                <ShuffleCategoryWrapper 
                                    category='Space' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/ringed-planet_1fa90.png'
                                />
                                <ShuffleCategoryWrapper 
                                    category='Cafe' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/hot-beverage_2615.png'
                                />                    
                                <ShuffleCategoryWrapper 
                                    category='Synthwave' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/videocassette_1f4fc.png'
                                />
                                <ShuffleCategoryWrapper 
                                    category='Library' 
                                    src='https://em-content.zobj.net/thumbs/120/apple/325/books_1f4da.png'
                                />
                                <ShuffleCategoryWrapper 
                                    category='Transport' 
                                    src='https://em-content.zobj.net/thumbs/120/apple/325/bullet-train_1f685.png'
                                />
                                <ShuffleCategoryWrapper 
                                    category='Games' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/joystick_1f579-fe0f.png'
                                />
                                <ShuffleCategoryWrapper 
                                    category='City' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/cityscape_1f3d9-fe0f.png'
                                />
                                <ShuffleCategoryWrapper 
                                    category='Pets' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/cat_1f408.png'
                                />
                            </div>
                        </div>

                        <div className={styles.spacesInfoBlock}>
                            <div className={styles.spaceIndicator}>
                                <div className={styles.shareSpaceName}>
                                    <div className={styles.spaceNameText}>{props.space}</div>
                                    <div className={styles.shareSpaceLinkButton}>Share Space ⟶</div>
                                </div>
                                
                                <div className={styles.spacesOptions}>
                                    <div className={styles.saveSpace} onClick={ () => setSaved(!saved) }><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d68e7f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></div>
                                    <div className={styles.playlist}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-archive"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg></div>
                                </div>
                            </div>
                            <div className={styles.volumeSettingSection}>
                                <div className={styles.volumeStateToggle} onClick={ () => setMuted(!muted) }>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-x"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                                </div>
                                <input type="range" min="0" max="100" value={volume} className={styles.volumeSlider} onChange={(event) => setVolume(event.target.value)}/>
                            </div>
                        </div>

                        <div className={styles.spaceCreatorInfo}>
                            <div className={styles.circleIcon}></div>
                            <div className={styles.creatorTextContent}>
                                <div className={styles.creatorUserNameSection}><span className={styles.creatorUserName}>@{props.creator}</span><sup><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 10 10" fill="none" class="feather feather-verified-icon"><path fill="#fff" d="M1.875 1.875h6.25v6.25h-6.25z"></path><path fill-rule="evenodd" d="M5 10a5 5 0 003.536-8.536 5 5 0 00-7.072 0A5 5 0 005 10zm2.317-5.808a.62.62 0 00.175-.44.63.63 0 00-.183-.437.624.624 0 00-.437-.183.63.63 0 00-.44.175L4.375 5.366l-.808-.808a.62.62 0 00-.44-.175.63.63 0 00-.437.183.624.624 0 00-.183.437.63.63 0 00.175.44l1.25 1.25a.625.625 0 00.884 0l2.5-2.5z" fill="#127fff"></path></svg></sup></div>
                                <div className={styles.creatorLinks}>
                                    <a href="" target="_blank" id="instagram" className={styles.socialLinksForCreator}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                                    <a href="" target="_blank" id="twitter" className={styles.socialLinksForCreator}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                                    <a href="" target="_blank" id="website" className={styles.socialLinksForCreator}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></a>
                                    <a href="" target="_blank" id="twitch" className={styles.socialLinksForCreator}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-youtube"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>
                                </div>
                            </div>
                        </div>

                        <div className={styles.spacesSideBarContent}></div>

                        <div className={styles.spacesSideBarFooterButtons}>
                            <div className={`${styles.desktopApp} ${styles.noodleInfoButton}`}><a href="#" target="_blank">Desktop App</a></div>
                            <div className={`${styles.showCaseButton} ${styles.noodleInfoButton}`}><a href="#" target="_blank">Showcase</a></div>
                            <div className={`${styles.faqLinkButton} ${styles.noodleInfoButton}`}><a href="#" target="_blank">FAQ</a></div>
                            <div className={`${styles.notifications} ${styles.noodleInfoButton}`}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div>
                        </div>
                    </div>
                </div>
            : null }
        </>
    )
}
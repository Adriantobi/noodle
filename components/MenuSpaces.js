'use client';

import styles from '../css/menuspaces.module.css'

import ShuffleCategoryWrapper from './ShuffleCategoryWrapper'

import React, { useState, useEffect } from 'react'

export default function MenuSpaces( props ) {
    //Close MenuSpaces
    const [menuSpacesOpen, setMenuSpacesOpen] = useState(props.open);

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

    //Format Time
    var currentTime
    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = hours < 10 ? '0'+hours : hours;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        currentTime = strTime
        return strTime
    }

    const [saved, setSaved] = useState(false)

    useEffect(() => {
        if (saved === true) {
            document.querySelector(`.${styles.saveSpace} svg`).style.fill = '#d68e7f';
        }
        else {
            document.querySelector(`.${styles.saveSpace} svg`).style.fill = 'none';
        }
    },[saved])

    setInterval(formatAMPM(new Date), 1000)

    return (
        <>
            { menuSpacesOpen ? 
                <div className={styles.MenuSpacesContainer} id='menu-spaces-container'>
                    <div className={styles.sideBarIcon} onClick={() => setMenuSpacesOpen(!menuSpacesOpen)}>
                        <svg width="26" height="42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h21a5 5 0 015 5v32a5 5 0 01-5 5H0V0z" fill="#3C4551"></path><path d="M7.923 21.64a.778.778 0 010-1.28l6.606-4.576a.778.778 0 011.221.639v9.154a.778.778 0 01-1.22.64l-6.607-4.578z" fill="#fff"></path></svg>
                    </div>
        
                    <div className={styles.MenuSpaces}>
                        <div className={styles.spacesSideBarHeader}>
                            <div className={styles.noodleButton}>Explore 🔍</div>
                            <span className={styles.currentTime}>{currentTime}</span>
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
                                    tooltip='Beach' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/beach-with-umbrella_1f3d6-fe0f.png'
                                />
                                <ShuffleCategoryWrapper 
                                    tooltip='Code' 
                                    src='https://em-content.zobj.net/thumbs/120/apple/325/laptop_1f4bb.png'
                                />
                                <ShuffleCategoryWrapper 
                                    tooltip='Celebrity' 
                                    src='https://em-content.zobj.net/thumbs/120/apple/325/microphone_1f3a4.png'
                                />
                                <ShuffleCategoryWrapper 
                                    tooltip='Mystery' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/face-with-monocle_1f9d0.png'
                                />                    
                                <ShuffleCategoryWrapper 
                                    tooltip='Anime' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/354/shinto-shrine_26e9-fe0f.png'
                                />
                                <ShuffleCategoryWrapper 
                                    tooltip='Nature' 
                                    src='https://em-content.zobj.net/thumbs/120/apple/325/mountain_26f0-fe0f.png'
                                />
                                <ShuffleCategoryWrapper 
                                    tooltip='Study With Me' 
                                    src='https://em-content.zobj.net/thumbs/120/apple/325/woman-technologist_1f469-200d-1f4bb.png'
                                />
                                <ShuffleCategoryWrapper 
                                    tooltip='Walk' 
                                    src='https://em-content.zobj.net/thumbs/120/apple/325/person-walking_1f6b6.png'
                                />
                                <ShuffleCategoryWrapper 
                                    tooltip='Snow' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/snowman_2603-fe0f.png'
                                />
                                <ShuffleCategoryWrapper 
                                    tooltip='Art' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/artist-palette_1f3a8.png'
                                />
                            </div>
                            <div className={styles.carouselRow}>
                                <ShuffleCategoryWrapper 
                                    tooltip='Window' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/window_1fa9f.png'
                                />
                                <ShuffleCategoryWrapper 
                                    tooltip='Lofi' 
                                    src='https://em-content.zobj.net/thumbs/120/apple/325/crystal-ball_1f52e.png'
                                />
                                <ShuffleCategoryWrapper 
                                    tooltip='Space' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/ringed-planet_1fa90.png'
                                />
                                <ShuffleCategoryWrapper 
                                    tooltip='Cafe' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/hot-beverage_2615.png'
                                />                    
                                <ShuffleCategoryWrapper 
                                    tooltip='Synthwave' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/videocassette_1f4fc.png'
                                />
                                <ShuffleCategoryWrapper 
                                    tooltip='Library' 
                                    src='https://em-content.zobj.net/thumbs/120/apple/325/books_1f4da.png'
                                />
                                <ShuffleCategoryWrapper 
                                    tooltip='Transport' 
                                    src='https://em-content.zobj.net/thumbs/120/apple/325/bullet-train_1f685.png'
                                />
                                <ShuffleCategoryWrapper 
                                    tooltip='Games' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/joystick_1f579-fe0f.png'
                                />
                                <ShuffleCategoryWrapper 
                                    tooltip='City' 
                                    src='https://em-content.zobj.net/thumbs/160/apple/325/cityscape_1f3d9-fe0f.png'
                                />
                                <ShuffleCategoryWrapper 
                                    tooltip='Pets' 
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
                                <div className={styles.volumeStateToggle} onClick={() => setMuted((prev) => !prev)}>
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
                                    <a href="" target="_blank" id="twitch" className={styles.socialLinksForCreator}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitch"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path></svg></a>
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
            : null}
        </>
    )
}
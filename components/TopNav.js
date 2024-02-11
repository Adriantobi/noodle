'use client'

import styles from '../css/topnav.module.css'
import account from '../css/modal/account.module.css'
import appearance from '../css/modal/appearance.module.css'

import DropMenu from './DropMenu';

import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react';
import { ChevronDown, Sidebar, User, Volume2, Home, ShareIcon, Maximize2, Minimize2, Moon } from 'lucide-react';
import Modal from './Modal';
import Image from 'next/image';

function Appearance({ state, setState }) {
    return (
    <>
        { state ?
            <Modal title={'Appearance Settings'} setState={setState} name={'appearance'}>
                <div className={appearance.appearanceSettings}>
                    <div className={appearance.settingSection}>
                        <span className={appearance.sectionTitle}>THEME</span>
                        <div className={appearance.sectionOption}>
                            <span className={appearance.optionTitle}>Dark Mode</span>
                            <span className={appearance.themeButton}>
                                <Moon />
                            </span>
                        </div>
                    </div>
                    <div className={appearance.settingSection}>
                        <span className={appearance.sectionTitle}>FOCUS MODE</span>
                        <div className={appearance.sectionOption}>
                            <span className={appearance.optionTitle}>Hide Elements</span>
                        </div>
                    </div>
                </div>
            </Modal>
        : null }
    </>
    )
}

function Account({ state, setState }) {
    const { data } = useSession()

    return (
        <>
        { state ?
            <Modal title={'My account'} setState={setState} name={'account'}>
                <div className={account.userOptions}>
                    <div className={account.userImageWrapper}>
                        <Image
                            width={45}
                            height={45}
                            quality={100}
                            src={data?.user?.image}
                            alt={`${data?.user?.name}'s Image`}
                        />
                    </div>
                    <div className={account.userSetting}>
                        <span className={account.settingLabel}>Email:</span>
                        <span>
                            <input className={account.settingInput} type='text' placeholder={data?.user?.email} disabled/>
                        </span>
                    </div>
                    <div className={account.userSetting}>
                        <span className={account.settingLabel}>Name:</span>
                        <span>
                            <input className={account.settingInput} type='text' defaultValue={data?.user?.name} />
                        </span>
                    </div>

                    <div className={account.accountAction}>
                        <span className={account.logOut} onClick={() => signOut()}>Log out</span>
                    </div>
                </div>
            </Modal>
        : null }
        </>
    )
}

export default function TopNav( { widgetState } ) {
    const [dropDownOpen, setDropDownOpen] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)
    const [showElement, setShowElement] = useState(true)
    const [mobile, setMobile] = useState(false)
    const [screenTypeIcon, setScreenTypeIcon] = useState(<Maximize2 />)
    const { status, data } = useSession()

    let timerId = null

    useEffect(() => {
        if (showElement) {
            timerId = setTimeout(() => {
                setShowElement(false);
            }, 30000);
        }

        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        };
    }, [showElement]);

    useEffect(() => {
        window.addEventListener('click', () => {
            if (timerId) {
                clearTimeout(timerId);
            }
            setShowElement(true);
        });

        window.addEventListener('mousemove', () => {
            if (timerId) {
                clearTimeout(timerId);
            }
            setShowElement(true);
        });

        return () => {
            window.removeEventListener('click', () => setShowElement(true));
            window.removeEventListener('mousemove', () => setShowElement(true));
        };
    }, []);

    useEffect(() => {
        document.addEventListener('fullscreenchange', (event) => {
            if (document.fullscreenElement) {
                setFullScreen(true)
            } else {
                setFullScreen(false)
            }
        })
    },[])

    useEffect(() => {
        const resize = () => {
            if(window.innerWidth < 620) {
                setMobile(true)
            }
    
            else {
                setMobile(false)
            }
        }

        window.onload = resize()
        window.addEventListener('resize', resize)
    },[])

    useEffect(() => {
        if (fullScreen) {
            setScreenTypeIcon(<Minimize2 />)
            document.body.requestFullscreen()
        }
        else {
            setScreenTypeIcon(<Maximize2 />)
            document.exitFullscreen()
        }
    },[fullScreen])


    const [showAccountModal, setShowAccountModal] = useState(false)
    const [showAppearanceModal, setShowAppearanceModal] = useState(false)
    const [showStatsModal, setShowStatsModal ] = useState(false)
    const [showRoomModal, setShowRoomModal] = useState(false)

    const setModals = (modal) => {
        switch (modal) {
            case 'account':
                setShowAccountModal(!showAccountModal)
                break
            case 'appearance':
                setShowAppearanceModal(!showAppearanceModal)
                break
            case 'stats':
                setShowStatsModal(!showStatsModal)
                break
            case 'room':
                setShowRoomModal(!showRoomModal)
                break
            default:
        }
    }

    return (
        <>
            <Account state={showAccountModal} setState={setModals} />
            <Appearance state={showAppearanceModal} setState={setModals} />
            { showElement ?
                <div className={styles.TopNav}>
                    <div className={styles.noodleInfoSection}>
                        <div className={`${styles.sideNavToggle} ${styles.noodleTopNavButton}`} onClick={() => widgetState('spaces')}><Sidebar /></div>
    
                        <div className={`${styles.roomsToggle} ${styles.noodleTopNavButton}`}>
                            <Home />
                            <ChevronDown />
                        </div>

                        <div className={`${styles.upgradeButton} ${styles.noodleTopNavButton}`} onClick={status !== 'authenticated' ? () => signIn('google') : () => {}}>
                            🚀 { status === 'authenticated' && !mobile ? 'Upgrade' : status === 'authenticated' && mobile ? '' : status !== 'authenticated' ? 'Sign Up' : 'Sign Up' }
                        </div>
    
                        <div className={`${styles.userMetrics} ${styles.noodleTopNavButton}`} onClick={() => setModals('stats')}>{ mobile ? '' : '4' } 🔥</div>
                    </div>
    
                    <div className={styles.roomInfo}>
                        <div className={`${styles.roomName} ${styles.noodleTopNavButton}`} onClick={() => setModals('room')}>
                            { status === "authenticated" ? `${data?.user?.name}'s` : 'My' } Room
                        </div>
                    </div>
    
                    <div className={styles.roomSettings}>
                        { mobile ? null : 
                            <div className={`${styles.settingsButton} ${styles.noodleTopNavButton}`}>
                                <Volume2 />
                            </div> 
                        }
    
                        <div className={`${styles.settingsButton} ${styles.noodleTopNavButton}`}>
                            <ShareIcon />
                        </div>
    
                        <div className={`${styles.settingsButton} ${styles.noodleTopNavButton} ${styles.minimise}`} onClick={ () => setFullScreen(!fullScreen) }>
                            {screenTypeIcon}
                        </div>
    
                        <span className={styles.verticalSpacer} />
    
                        <div className={`${styles.settingsButton} ${styles.noodleTopNavButton}`} onClick={ () => setDropDownOpen(!dropDownOpen) }>
                            <User />
                        </div>
                    </div>
                </div>
            : null }

            { dropDownOpen ? <DropMenu full={showElement} modalStates={setModals} /> : null }
        </>
    )
}

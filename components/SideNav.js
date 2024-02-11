'use client'

import { useState, useEffect } from 'react'
import styles from '../css/sidenav.module.css'
import settings from '../css/topnav.module.css'

import NavSection from './NavSection'
import WidgetButton from './WidgetButton'
import SpacesMenuWidget from './SpacesMenuWidget'
import { AlarmClock, Bell, Calendar, Globe, Headphones, ImageIcon, ListChecks, Music, NotepadText, PenTool, Settings, SlidersHorizontal, Sparkles, Wind } from 'lucide-react'

export default function SideNav( { spaces, creator, categories, widgetState, states, setAllSpaceDetails, setIframeVolume } ) {
    const [showElement, setShowElement] = useState(true)
    let timerId = null;

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

  return (
    <div className={`${styles.SideNavWrapper} ${ showElement ? '' : `${styles.full}`}`}>
    { showElement ?
        <div className={styles.SideNav}>
            <NavSection name='Plan' icon={<ListChecks />} />
            <NavSection active={true} name='Focus' icon={<Headphones />}>
                <WidgetButton selected={states[6]} icon={<ImageIcon />} label='Spaces' currentState={widgetState} />
                <WidgetButton selected={states[0]} icon={<AlarmClock />} label='Timer' currentState={widgetState} />
                <WidgetButton selected={states[1]} icon={<PenTool />} label='Tasks' currentState={widgetState} />
                <WidgetButton selected={false} icon={<Calendar />} label='Cal' />
                <WidgetButton selected={states[2]} icon={<NotepadText />} label='Notes' currentState={widgetState} />
                <WidgetButton selected={states[3]} icon={<Music />} label='Media' currentState={widgetState} />
                <WidgetButton selected={states[4]} icon={<SlidersHorizontal />} label='Sounds' currentState={widgetState} />
                <WidgetButton selected={states[5]} icon={<Sparkles />} label='Fortune' currentState={widgetState} />
                <WidgetButton selected={states[7]} icon={<Wind />} label='Breathe' currentState={widgetState} />
            </NavSection>
            <NavSection name='Explore' icon={<Globe />} />
            <div className={styles.sideNavOptions}>
                <span className={`${settings.settingsButton} ${settings.noodleTopNavButton}`}>
                    <Bell />
                </span>
                <span className={`${settings.settingsButton} ${settings.noodleTopNavButton}`}>
                    <Settings />
                </span>
            </div>
        </div>
    : null }

    <SpacesMenuWidget spaces={spaces} creator={creator} categories={categories} widgetState={widgetState} menuState={states[6]} setAllSpaceDetails={setAllSpaceDetails} setIframeVolume={setIframeVolume} />
    </div>
  )
}

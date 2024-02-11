'use client'

import styles from '../css/interact.module.css'

import TopNav from "./TopNav"
import SideNav from "./SideNav"
import WidgetCanvas from './WidgetCanvas'
import { useState } from 'react'
import BreatheWidget from './widgets/BreatheWidget'

export default function Interact({ spaces, creator, categories, setAllSpaceDetails, setIframeVolume }) {
    const [showTimer, setShowTimer] = useState(false)
    const [showTasks, setShowTasks] = useState(false)
    const [showNotes, setShowNotes] = useState(false)
    const [showMedia, setShowMedia] = useState(false)
    const [showSounds, setShowSounds] = useState(false)
    const [showSpaceMenuWidget, setShowSpaceMenuWidget] = useState(false)
    const [showFortune, setShowFortune] = useState(false)
    const [showBreathe, setShowBreathe] = useState(false)

    const setWidget = (widget) => {
        switch (widget) {
            case 'timer':
                setShowTimer(!showTimer)
                break
            case 'tasks':
                setShowTasks(!showTasks)
                break
            case 'notes':
                setShowNotes(!showNotes)
                break
            case 'media':
                setShowMedia(!showMedia)
                break
            case 'sounds':
                setShowSounds(!showSounds)
                break
            case 'fortune':
                setShowFortune(!showFortune)
                break
            case 'spaces':
                setShowSpaceMenuWidget(!showSpaceMenuWidget)
                break
            case 'breathe':
                setShowBreathe(!showBreathe)
                break
            default:
        }
    }

    return (
        <div className={styles.Interact}>
            <TopNav widgetState={setWidget} />
            <SideNav spaces={spaces} creator={creator} categories={categories} widgetState={setWidget} states={[showTimer, showTasks, showNotes, showMedia, showSounds, showFortune, showSpaceMenuWidget, showBreathe]} setAllSpaceDetails={setAllSpaceDetails} setIframeVolume={setIframeVolume} />
            <WidgetCanvas states={[showTimer, showTasks, showNotes, showMedia, showSounds, showFortune]} widgetState={setWidget} />
            <BreatheWidget display={showBreathe} widgetState={setWidget} />
        </div>
    )
}

'use client'

import SideNav from './SideNav'
import TopNav from './TopNav'
import FrameSpaces from './FrameSpaces'
import WidgetCanvas from './WidgetCanvas'

import { useState } from 'react'

export default function AppContent( props ) {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const [pomodoroOpen, setPomodoroOpen] = useState(false)
  const [todoOpen, setToDoOpen] = useState(false)
  const [soundOpen, setSoundOpen] = useState(false)
  const [musicOpen, setMusicOpen] = useState(false)

  const changeNotes = () => {
    setNotesOpen(!notesOpen)
  }

  const changeMusic = () => {
    setMusicOpen(!musicOpen)
  }

  const changeQuote = () => {
    setQuoteOpen(!quoteOpen)
  }

  const changeSound = () => {
    setSoundOpen(!soundOpen)
  }

  const changePomodoro = () => {
    setPomodoroOpen(!pomodoroOpen)
  }

  const changeToDo = () => {
    setToDoOpen(!todoOpen)
  }

  return (
    <>
        <TopNav />
        <SideNav creatorname={props.creatorname} spacename={props.spacename} link={props.link} instagram={props.instagram} youtube={props.youtube} website={props.website} twitter={props.twitter} notes={changeNotes} music={changeMusic} pomodoro={changePomodoro} toDo={changeToDo} sound={changeSound} quote={changeQuote} />
        <FrameSpaces source={props.link} category={props.category} />
        <WidgetCanvas notes={notesOpen} music={musicOpen} pomodoro={pomodoroOpen} todo={todoOpen} sound={soundOpen} quote={quoteOpen} notesClose={changeNotes} musicClose={changeMusic} pomodoroClose={changePomodoro} toDoClose={changeToDo} soundClose={changeSound} quoteClose={changeQuote} />
    </>
  )
}
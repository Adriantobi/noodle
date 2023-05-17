import styles from '../../css/app.module.css'

import SideNav from '@/components/SideNav'
import TopNav from '@/components/TopNav'
import FrameSpaces from '@/components/FrameSpaces'
import WidgetCanvas from '@/components/WidgetCanvas'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function Home() {
  const creators = {id:1, name:'Community Member'}
  const spaces = {id:1, name:'Colourful Bubbles', src:'RhlQvbvMg-0'}

  return (
    <main className={styles.main}>
      <TopNav />
      <SideNav creatorname={creators.name} spacename={spaces.name} />
      <FrameSpaces source={spaces.src} category='Mystery' />
      <WidgetCanvas />
    </main>
  )
}

export async function getServerSideProps() {
  const spaces = await prisma.space.findMany()

  return{
    props : {
      spaces,
    },
  }
}
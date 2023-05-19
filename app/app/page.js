import styles from '../../css/app.module.css'

import SideNav from '@/components/SideNav'
import TopNav from '@/components/TopNav'
import FrameSpaces from '@/components/FrameSpaces'
import WidgetCanvas from '@/components/WidgetCanvas'

import { PrismaClient } from '@prisma/client'

export default async function Home() {
  const prisma = new PrismaClient()

  const spaces = await prisma.space.findMany()
  const creators = await prisma.creator.findMany()

  return (
    <main className={styles.main}>
      <TopNav />
      <SideNav creatorname={creators[spaces[8].authorId - 1].name} spacename={spaces[8].title} />
      <FrameSpaces source={spaces[8].link} category={spaces[8].category} />
      <WidgetCanvas />
    </main>
  )
}
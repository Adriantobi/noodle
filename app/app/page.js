import styles from '../../css/app.module.css'

import SideNav from '@/components/SideNav'
import TopNav from '@/components/TopNav'
import FrameSpaces from '@/components/FrameSpaces'
import WidgetCanvas from '@/components/WidgetCanvas'

import prisma from '@/lib/client'

export default async function Home() {
  const spaces = await prisma.space.findMany()
  const creators = await prisma.creator.findMany()

  const randomSpace = () => {
    let randomNum = Math.floor(Math.random() * spaces.length)
    return randomNum
  }

  const num = randomSpace()

  return (
    <main className={styles.main}>
      <TopNav />
      <SideNav creatorname={creators[spaces[num].authorId-1].name} spacename={spaces[num].title} />
      <FrameSpaces source={spaces[num].link} category={spaces[num].category} />
      {/* <WidgetCanvas /> */}
    </main>
  )
}
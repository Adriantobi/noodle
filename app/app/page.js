import styles from '../../css/app.module.css'

import SideNav from '@/components/SideNav'
import TopNav from '@/components/TopNav'
import FrameSpaces from '@/components/FrameSpaces'
import WidgetCanvas from '@/components/WidgetCanvas'

import prisma from '@/lib/client'

export default async function Home() {
  const spaces = await prisma.space.findMany()
  const randomSpace = () => {
    let randomNum = Math.floor(Math.random() * spaces.length)
    return randomNum
  }

  const num = randomSpace()
  const space = await prisma.space.findMany({
    where: {
      id: num
    }
  })

  const creator = await prisma.creator.findMany({
    where: {
      id: space[0].authorId
    }
  })

  return (
    <main className={styles.main}>
      <TopNav />
      <SideNav creatorname={creator[0].name} spacename={space[0].title} link={space[0].link} instagram={creator[0].instagram} youtube={creator[0].youtube} website={creator[0].website} twitter={creator[0].twitter} />
      <FrameSpaces source={space[0].link} category={space[0].category} />
      {/* <WidgetCanvas /> */}
    </main>
  )
}
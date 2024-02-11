import Frame from '@/components/Frame'

import prisma from '@/lib/prisma'
import { Suspense } from 'react'

export default async function App() {
  const spaces = await prisma.space.findMany({
    orderBy: {
      id: 'asc',
    },
  })
  const categories = await prisma.category.findMany({
    orderBy: {
      id: 'asc',
    },
  })
  const creators = await prisma.creator.findMany({
    orderBy: {
      id: 'asc',
    },
  })

  return (
    <Suspense>
      <Frame spaces={spaces} categories={categories} creators={creators} />
    </Suspense>
  )
}

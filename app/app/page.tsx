import Frame from "@/components/frame";

import prisma from "@/lib/prisma";
import {
  categoryInterface,
  creatorInterface,
  spaceInterface,
} from "@/types/types";
import { Suspense } from "react";

export default async function App() {
  const spaces: spaceInterface[] = await prisma.space.findMany({
    orderBy: {
      id: "asc",
    },
  });
  const categories: categoryInterface[] = await prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
  });
  const creators: creatorInterface[] = await prisma.creator.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <Suspense>
      <Frame
        spaces={spaces as spaceInterface[]}
        categories={categories}
        creators={creators}
      />
    </Suspense>
  );
}

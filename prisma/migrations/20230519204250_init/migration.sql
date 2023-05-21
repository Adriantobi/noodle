-- CreateTable
CREATE TABLE "Space" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "link" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Creator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "instagram" VARCHAR(255) NOT NULL,
    "youtube" VARCHAR(255) NOT NULL,
    "website" VARCHAR(255) NOT NULL,
    "twitter" VARCHAR(255) NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

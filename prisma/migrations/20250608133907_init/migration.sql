-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isGoEvent" BOOLEAN NOT NULL,
    "countChildren" INTEGER NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Companion" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Companion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Companion" ADD CONSTRAINT "Companion_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

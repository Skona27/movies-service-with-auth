-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "released" TIMESTAMP(3) NOT NULL,
    "genre" TEXT NOT NULL,
    "directory" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

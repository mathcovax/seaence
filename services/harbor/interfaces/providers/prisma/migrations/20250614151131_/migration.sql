-- AlterTable
ALTER TABLE "User" ADD COLUMN     "banned" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Warning" (
    "id" TEXT NOT NULL,
    "makeUserBan" BOOLEAN NOT NULL,
    "reason" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reference" JSONB NOT NULL,

    CONSTRAINT "Warning_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Warning" ADD CONSTRAINT "Warning_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

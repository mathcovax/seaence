-- AlterEnum
ALTER TYPE "missionStatus" ADD VALUE 'resume';

-- CreateTable
CREATE TABLE "SendOneSearchResultMission" (
    "id" TEXT NOT NULL,
    "status" "missionStatus" NOT NULL,
    "searchResultReference" TEXT NOT NULL,
    "searchResultProvider" "provider" NOT NULL,

    CONSTRAINT "SendOneSearchResultMission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SendOneSearchResultMission" ADD CONSTRAINT "SendOneSearchResultMission_searchResultReference_searchRes_fkey" FOREIGN KEY ("searchResultReference", "searchResultProvider") REFERENCES "searchResult"("reference", "provider") ON DELETE RESTRICT ON UPDATE CASCADE;

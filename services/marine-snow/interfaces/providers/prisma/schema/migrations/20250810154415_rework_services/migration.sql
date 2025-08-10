/*
  Warnings:

  - You are about to drop the `SearchResultPubMedMission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SearchResultPubMedMissionStep` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SendOneSearchResultMission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SendSearchResultMission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SendSearchResultMissionStep` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `searchResult` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "exportArticleReferenceMissionStatus" AS ENUM ('inProgress', 'failed', 'success');

-- CreateEnum
CREATE TYPE "fetchArticleReferenceMissionStatus" AS ENUM ('created', 'inRecovery', 'inProgress', 'failed', 'success');

-- DropForeignKey
ALTER TABLE "SearchResultPubMedMissionStep" DROP CONSTRAINT "SearchResultPubMedMissionStep_missionId_fkey";

-- DropForeignKey
ALTER TABLE "SendSearchResultMissionStep" DROP CONSTRAINT "SendSearchResultMissionStep_missionId_fkey";

-- DropTable
DROP TABLE "SearchResultPubMedMission";

-- DropTable
DROP TABLE "SearchResultPubMedMissionStep";

-- DropTable
DROP TABLE "SendOneSearchResultMission";

-- DropTable
DROP TABLE "SendSearchResultMission";

-- DropTable
DROP TABLE "SendSearchResultMissionStep";

-- DropTable
DROP TABLE "searchResult";

-- DropEnum
DROP TYPE "missionStatus";

-- CreateTable
CREATE TABLE "articleReference" (
    "value" TEXT NOT NULL,
    "provider" "provider" NOT NULL,
    "failedToSend" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "articleReference_pkey" PRIMARY KEY ("value","provider")
);

-- CreateTable
CREATE TABLE "exportOneArticleReferenceMission" (
    "id" TEXT NOT NULL,
    "status" "exportArticleReferenceMissionStatus" NOT NULL,
    "provider" "provider" NOT NULL,
    "referenceValue" TEXT NOT NULL,

    CONSTRAINT "exportOneArticleReferenceMission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exportManyArticleReferenceMission" (
    "id" TEXT NOT NULL,
    "status" "exportArticleReferenceMissionStatus" NOT NULL,
    "concurrency" INTEGER NOT NULL,
    "quantityProcessed" INTEGER NOT NULL,
    "failedArticleReference" JSONB,

    CONSTRAINT "exportManyArticleReferenceMission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pubmedFetchArticleReferenceMission" (
    "id" TEXT NOT NULL,
    "articleType" "articleType" NOT NULL,
    "status" "fetchArticleReferenceMissionStatus" NOT NULL,
    "intervalFrom" TIMESTAMP(3) NOT NULL,
    "intervalTo" TIMESTAMP(3) NOT NULL,
    "currentStepDate" TIMESTAMP(3) NOT NULL,
    "currentStepPage" INTEGER NOT NULL,

    CONSTRAINT "pubmedFetchArticleReferenceMission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exportOneArticleReferenceMission_id_key" ON "exportOneArticleReferenceMission"("id");

-- CreateIndex
CREATE UNIQUE INDEX "exportManyArticleReferenceMission_id_key" ON "exportManyArticleReferenceMission"("id");

-- CreateIndex
CREATE UNIQUE INDEX "pubmedFetchArticleReferenceMission_id_key" ON "pubmedFetchArticleReferenceMission"("id");

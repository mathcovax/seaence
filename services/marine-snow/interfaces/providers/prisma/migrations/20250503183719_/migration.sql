/*
  Warnings:

  - You are about to drop the column `quantity` on the `SendSearchResultMission` table. All the data in the column will be lost.
  - Added the required column `concurrency` to the `SendSearchResultMission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SendSearchResultMission" DROP COLUMN "quantity",
ADD COLUMN     "concurrency" INTEGER NOT NULL;

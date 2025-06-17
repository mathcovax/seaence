/*
  Warnings:

  - Added the required column `language` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserLanguage" AS ENUM ('fr_FR', 'en_US');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "language" "UserLanguage" NOT NULL;

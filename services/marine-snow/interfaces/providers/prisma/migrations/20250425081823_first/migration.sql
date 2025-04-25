-- CreateEnum
CREATE TYPE "articleType" AS ENUM ('adaptiveClinicalTrial', 'address', 'autobiography', 'bibliography', 'biography', 'booksAndDocuments', 'caseReports', 'classicalArticle', 'clinicalConference', 'clinicalStudy', 'clinicalTrial', 'clinicalTrialProtocol', 'clinicalTrialPhaseI', 'clinicalTrialPhaseII', 'clinicalTrialPhaseIII', 'clinicalTrialPhaseIV', 'clinicalTrialVeterinary', 'collectedWork', 'comment', 'comparativeStudy', 'congress', 'consensusDevelopmentConference', 'consensusDevelopmentConferenceNIH', 'controlledClinicalTrial', 'correctedAndRepublishedArticle', 'dataset', 'dictionary', 'directory', 'duplicatePublication', 'editorial', 'electronicSupplementaryMaterials', 'englishAbstract', 'equivalenceTrial', 'evaluationStudy', 'expressionOfConcern', 'festschrift', 'governmentPublication', 'guideline', 'historicalArticle', 'interactiveTutorial', 'interview', 'introductoryJournalArticle', 'journalArticle', 'lecture', 'legalCase', 'legislation', 'letter', 'metaAnalysis', 'multicenterStudy', 'news', 'newspaperArticle', 'observationalStudy', 'observationalStudyVeterinary', 'overall', 'patientEducationHandout', 'periodicalIndex', 'personalNarrative', 'portrait', 'practiceGuideline', 'pragmaticClinicalTrial', 'preprint', 'publishedErratum', 'randomizedControlledTrial', 'randomizedControlledTrialVeterinary', 'researchSupportAmericanRecoveryAndReinvestmentAct', 'researchSupportNIHExtramural', 'researchSupportNIHIntramural', 'researchSupportNonUSGovt', 'researchSupportUSGovtNonPHS', 'researchSupportUSGovtPHS', 'researchSupportUSGovt', 'retractedPublication', 'retractionOfPublication', 'review', 'scopingReview', 'scientificIntegrityReview', 'systematicReview', 'technicalReport', 'twinStudy', 'validationStudy', 'videoAudioMedia', 'webcast');

-- CreateEnum
CREATE TYPE "provider" AS ENUM ('pubmed');

-- CreateEnum
CREATE TYPE "missionStatus" AS ENUM ('created', 'inProgress', 'failed', 'success');

-- CreateTable
CREATE TABLE "searchResult" (
    "reference" TEXT NOT NULL,
    "provider" "provider" NOT NULL,
    "failedToSend" BOOLEAN NOT NULL DEFAULT false,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "searchResult_pkey" PRIMARY KEY ("reference","provider")
);

-- CreateTable
CREATE TABLE "SearchResultPubMedMissionStep" (
    "missionId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "page" INTEGER NOT NULL,

    CONSTRAINT "SearchResultPubMedMissionStep_pkey" PRIMARY KEY ("missionId")
);

-- CreateTable
CREATE TABLE "SearchResultPubMedMission" (
    "id" TEXT NOT NULL,
    "articleType" "articleType" NOT NULL,
    "searchDateFrom" TIMESTAMP(3) NOT NULL,
    "searchDateTo" TIMESTAMP(3) NOT NULL,
    "status" "missionStatus" NOT NULL,

    CONSTRAINT "SearchResultPubMedMission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SendSearchResultMissionStep" (
    "missionId" TEXT NOT NULL,
    "quantityProcessed" INTEGER NOT NULL,
    "faildedSearchResults" JSONB[],

    CONSTRAINT "SendSearchResultMissionStep_pkey" PRIMARY KEY ("missionId")
);

-- CreateTable
CREATE TABLE "SendSearchResultMission" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "missionStatus" NOT NULL,

    CONSTRAINT "SendSearchResultMission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SearchResultPubMedMissionStep" ADD CONSTRAINT "SearchResultPubMedMissionStep_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "SearchResultPubMedMission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SendSearchResultMissionStep" ADD CONSTRAINT "SendSearchResultMissionStep_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "SendSearchResultMission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

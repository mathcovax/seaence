import { createEnum, zod } from "@vendors/clean";

export namespace ArticleType {
	export const indexEnum = createEnum([
		"adaptiveClinicalTrial",
		"address",
		"autobiography",
		"bibliography",
		"biography",
		"booksAndDocuments",
		"caseReports",
		"classicalArticle",
		"clinicalConference",
		"clinicalStudy",
		"clinicalTrial",
		"clinicalTrialProtocol",
		"clinicalTrialPhaseI",
		"clinicalTrialPhaseII",
		"clinicalTrialPhaseIII",
		"clinicalTrialPhaseIV",
		"clinicalTrialVeterinary",
		"collectedWork",
		"comment",
		"comparativeStudy",
		"congress",
		"consensusDevelopmentConference",
		"consensusDevelopmentConferenceNIH",
		"controlledClinicalTrial",
		"correctedAndRepublishedArticle",
		"dataset",
		"dictionary",
		"directory",
		"duplicatePublication",
		"editorial",
		"electronicSupplementaryMaterials",
		"englishAbstract",
		"equivalenceTrial",
		"evaluationStudy",
		"expressionOfConcern",
		"festschrift",
		"governmentPublication",
		"guideline",
		"historicalArticle",
		"interactiveTutorial",
		"interview",
		"introductoryJournalArticle",
		"journalArticle",
		"lecture",
		"legalCase",
		"legislation",
		"letter",
		"metaAnalysis",
		"multicenterStudy",
		"news",
		"newspaperArticle",
		"observationalStudy",
		"observationalStudyVeterinary",
		"overall",
		"patientEducationHandout",
		"periodicalIndex",
		"personalNarrative",
		"portrait",
		"practiceGuideline",
		"pragmaticClinicalTrial",
		"preprint",
		"publishedErratum",
		"randomizedControlledTrial",
		"randomizedControlledTrialVeterinary",
		"researchSupportAmericanRecoveryAndReinvestmentAct",
		"researchSupportNIHExtramural",
		"researchSupportNIHIntramural",
		"researchSupportNonUSGovt",
		"researchSupportUSGovtNonPHS",
		"researchSupportUSGovtPHS",
		"researchSupportUSGovt",
		"retractedPublication",
		"retractionOfPublication",
		"review",
		"scopingReview",
		"scientificIntegrityReview",
		"systematicReview",
		"technicalReport",
		"twinStudy",
		"validationStudy",
		"videoAudioMedia",
		"webcast",
	]);

	export const index = zod
		.enum(indexEnum.toTuple());
}

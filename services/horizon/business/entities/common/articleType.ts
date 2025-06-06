import { createEnum, zod, type GetEnumValue } from "@vendors/clean";

export const articleTypeEnum = createEnum([
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

export type ArticleType = GetEnumValue<typeof articleTypeEnum>;

export const articleTypeObjecter = zod
	.enum(articleTypeEnum.toTuple())
	.createValueObjecter("articleType");

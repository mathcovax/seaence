import { type GetValueObject } from "@vendors/clean";
import { authorObjecter } from "./document";
import { urlObjecter } from "../common";

const figureObjecter = zod.object({
	name: zod.string(),
	url: urlObjecter.zodSchema,
}).createValueObjecter("figure");
type Figure = GetValueObject<typeof figureObjecter>;

const commentObjecter = zod.object({
	text: zod.string(),
	source: zod.string().nullable(),
}).createValueObjecter("comment");
type Comment = GetValueObject<typeof commentObjecter>;

const associatedDataObjecter = zod.object({
	name: zod.string(),
	urls: urlObjecter.zodSchema.array(),
}).createValueObjecter("associatedData");
type AssociatedData = GetValueObject<typeof associatedDataObjecter>;

const relatedInformationObjecter = zod.object({
	type: zod.enum([
		"book",
		"article",
	]),
	name: zod.string(),
	url: urlObjecter.zodSchema,
}).createValueObjecter("relatedInformation");
type RelatedInformation = GetValueObject<typeof relatedInformationObjecter>;

const linkOutObjecter = zod.object({
	name: zod.string(),
	url: urlObjecter.zodSchema,
}).createValueObjecter("linkOut");
type LinkOut = GetValueObject<typeof linkOutObjecter>;

const substanceObjecter = zod.object({
	name: zod.string(),
	urls: urlObjecter.zodSchema.array(),
}).createValueObjecter("substance");
type Substance = GetValueObject<typeof substanceObjecter>;

const meshTermObjecter = zod.object({
	term: zod.string(),
	urls: urlObjecter.zodSchema.array(),
}).createValueObjecter("meshTerm");
type MeshTerm = GetValueObject<typeof meshTermObjecter>;

const chemicalObjecter = zod.object({
	name: zod.string(),
	registryNumber: zod.string(),
}).createValueObjecter("chemical");
type Chemical = GetValueObject<typeof chemicalObjecter>;

const issnObjecter = zod.string().regex(/^\d{4}-\d{4}/).createValueObjecter("issn");
type Issn = GetValueObject<typeof issnObjecter>;

const journalObjecter = zod.object({
	title: zod.string(),
	issn: issnObjecter.zodSchema,
	volume: zod.number(),
	issue: zod.number(),
}).createValueObjecter("journal");
type Journal = GetValueObject<typeof journalObjecter>;

const citedByObjecter = zod.object({
	title: zod.string(),
	authors: authorObjecter.zodSchema.array(),
	journal: journalObjecter.zodSchema,
}).createValueObjecter("citedBy");
type CitedBy = GetValueObject<typeof citedByObjecter>;

const similarArticleObjecter = zod.object({
	title: zod.string(),
	authors: authorObjecter.zodSchema.array(),
	journal: journalObjecter.zodSchema,
}).createValueObjecter("similarArticle");
type SimilarArticle = GetValueObject<typeof similarArticleObjecter>;

const referenceObjecter = zod.object({
	citation: zod.string(),
	authors: authorObjecter.zodSchema.array(),
	sourceUrl: urlObjecter.zodSchema,
}).createValueObjecter("reference");
type Reference = GetValueObject<typeof referenceObjecter>;

const pubmedIdObjecter = zod.string().createValueObjecter("pubmedId");
type PubmedId = GetValueObject<typeof pubmedIdObjecter>;

const articleTypeObjecter = zod.enum([
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
	"scientificIntegrityReview",
	"systematicReview",
	"technicalReport",
	"twinStudy",
	"validationStudy",
	"videoAudioMedia",
	"webcast",
]).createValueObjecter("articleType");
type ArticleType = GetValueObject<typeof articleTypeObjecter>;

const expectObjecter = zod.string().createValueObjecter("expect");
type Expect = GetValueObject<typeof expectObjecter>;

const structureAbstractObjecter = zod.object({
	label: zod.string(),
	text: zod.string(),
}).createValueObjecter("structureAbstract");
type StructureAbstract = GetValueObject<typeof structureAbstractObjecter>;

const abstractObjecter = zod.object({
	full: zod.string(),
	structure: structureAbstractObjecter.zodSchema.array().nullable(),
}).createValueObjecter("abstract");
type Abtstract = GetValueObject<typeof abstractObjecter>;

export {
	pubmedIdObjecter,
	PubmedId,
	figureObjecter,
	Figure,
	commentObjecter,
	Comment,
	associatedDataObjecter,
	AssociatedData,
	relatedInformationObjecter,
	RelatedInformation,
	linkOutObjecter,
	LinkOut,
	substanceObjecter,
	Substance,
	meshTermObjecter,
	MeshTerm,
	chemicalObjecter,
	Chemical,
	citedByObjecter,
	CitedBy,
	journalObjecter,
	Journal,
	similarArticleObjecter,
	SimilarArticle,
	referenceObjecter,
	Reference,
	issnObjecter,
	Issn,
	articleTypeObjecter,
	ArticleType,
	expectObjecter,
	Expect,
	structureAbstractObjecter,
	StructureAbstract,
	abstractObjecter,
	Abtstract,
};

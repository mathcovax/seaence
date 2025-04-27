import { createEnum } from "@vendors/clean";

export const dateSchema = zod
	.object({
		day: zod.number().nullable(),
		month: zod.number().nullable(),
		year: zod.number(),
	});

export const abstractSectionNameEnum = createEnum([
	"introduction",
	"background",
	"objective",
	"method",
	"result",
	"conclusion",
	"reference",
	"acknowledgment",
	"objective",
	"option",
	"outcome",
	"evidence",
	"value",
	"benefit",
	"recommendation",
	"validation",
	"sponsor",
	"purpose",
	"patient",
	"setting",
	"studyObjective",
	"measurementAndMainResult",

	"introductions",
	"backgrounds",
	"objectives",
	"methods",
	"results",
	"conclusions",
	"references",
	"acknowledgments",
	"objectives",
	"options",
	"outcomes",
	"evidences",
	"values",
	"benefits",
	"recommendations",
	"validations",
	"sponsors",
	"purposes",
	"patients",
	"settings",
	"studyObjectives",
	"measurementsAndMainResults",
]);

export const abstractSectionNameEnumSchema = zod.enum(abstractSectionNameEnum.toTuple());

export const languageEnum = createEnum([
	"fr-Fr",
	"en-US",
]);

export const documentSchema = zod
	.object({
		language: zod.enum(languageEnum.toTuple()),
		AbysBakedDocumentId: zod.string(),
		title: zod.string(),
		abstract: zod.string().optional(),
		abstractDetails: zod.record(
			abstractSectionNameEnumSchema,
			zod.object({
				value: zod.string(),
			}).passthrough().optional(),
		),
		ressources: zod.object({
			pubmed: zod.object({
				name: zod.string().optional(),
				url: zod.string().optional(),
			}).optional(),
		}),
		keywords: zod.object({
			pound: zod.number(),
			value: zod.string(),
		}).array().optional(),
		webPublishDate: dateSchema,
		journalPublishDate: dateSchema,
	});

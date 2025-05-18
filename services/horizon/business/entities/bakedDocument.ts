import { createEnum, zod } from "@vendors/clean";

export const bakedDocumentLanguageEnum = createEnum([
	"fr-FR",
	"en-US",
]);

export const bakedDocumentLanguageObjecter = zod
	.enum(bakedDocumentLanguageEnum.toTuple())
	.createValueObjecter("backedDocumentLanguage");

export const bakedDocumentObjecter = zod
	.object({
		id: zod.string(),
		title: zod.string(),
		language: bakedDocumentLanguageObjecter.zodSchema,
	})
	.createValueObjecter("backedDocument");

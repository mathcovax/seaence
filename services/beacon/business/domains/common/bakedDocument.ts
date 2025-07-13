import { createEnum, type GetValueObject, zod } from "@vendors/clean";

export const bakedDocumentIdObjecter = zod
	.string()
	.createValueObjecter("bakedDocumentId");

export type BakedDocumentId = GetValueObject<typeof bakedDocumentIdObjecter>;

export const bakedDocumentLanguageEnum = createEnum([
	"fr-FR",
	"en-US",
]);

export const bakedDocumentLanguageObjecter = zod
	.enum(bakedDocumentLanguageEnum.toTuple())
	.createValueObjecter("bakedDocumentLanguage");

export type BakedDocumentLanguage = GetValueObject<typeof bakedDocumentLanguageObjecter>;

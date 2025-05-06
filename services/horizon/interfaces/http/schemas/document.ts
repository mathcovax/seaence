import { createEnum } from "@vendors/clean";

export const documentLanguageEnum = createEnum([
	"fr-FR",
	"en-US",
]);

export const documentLanguageSchema = zod.enum(documentLanguageEnum.toTuple());

export const documentSchema = zod.object({
	id: zod.string(),
	title: zod.string(),
	language: documentLanguageSchema,
});

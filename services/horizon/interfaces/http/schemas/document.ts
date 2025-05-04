import { createEnum } from "@vendors/clean";

export const documentSchema = zod.object({
	id: zod.string(),
	title: zod.string(),
});

export const documentLanguageEnum = createEnum([
	"fr-FR",
	"en-US",
]);

export const documentLanguageSchema = zod.enum(documentLanguageEnum.toTuple());

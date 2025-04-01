import { contentObjecter, methodObjecter, strutureContentObjecter } from "@business/domains/types/raw/pedro";
import { baseInputSchema } from "../base";
import { urlObjecter } from "@business/domains/types/common";
import { zod } from "@vendors/clean";

export const pedroArticleSchema = baseInputSchema.extend({
	source: zod.literal("Pedro"),
	method: methodObjecter.toZodSchema(),
	content: contentObjecter.toZodSchema().nullable(),
	structureContent: strutureContentObjecter.toZodSchema().array().nullable(),
	links: urlObjecter.toZodSchema().array(),
});

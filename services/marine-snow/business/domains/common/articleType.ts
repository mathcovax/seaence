import { zod, type GetValueObject } from "@vendors/clean";

export const articleTypeValues = [
	"metaAnalysis",
	"randomizedControlledTrial",
] as const;

export const articleTypeObjecter = zod.enum(articleTypeValues).createValueObjecter("articleType");

export type ArticleType = GetValueObject<typeof articleTypeObjecter>;

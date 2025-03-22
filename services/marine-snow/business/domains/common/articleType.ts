import { zod, type GetValueObject } from "@vendors/clean";

export const articleTypeValues = ["metaAnalysis"] as const;

export const articleTypeObjecter = zod.enum(articleTypeValues).createValueObjecter("articleType");

export type ArticleType = GetValueObject<typeof articleTypeObjecter>;

import { type GetValueObject } from "@vendors/clean";

export const articleTypeValues = ["meta-analysis"] as const;

export const articleType = zod.enum(articleTypeValues).createValueObjecter("articleType");

export type ArticleType = GetValueObject<typeof articleType>;

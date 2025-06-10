import { createEnum, zod, type GetEnumValue } from "@vendors/clean";
import { type BaseComparator } from ".";
import { type ZodType } from "zod";

export const articleTypeEnum = createEnum(["metaAnalysis"]);

export type ArticleTypeEnumValue = GetEnumValue<typeof articleTypeEnum>;

export interface ComparatorArticleType extends BaseComparator<"articleType"> {
	value: ArticleTypeEnumValue[];
}

export const comparatorArticleTypeSchema: ZodType<ComparatorArticleType> = zod.object({
	type: zod.literal("comparator"),
	name: zod.literal("articleType"),
	value: zod.enum(articleTypeEnum.toTuple()).array(),
});

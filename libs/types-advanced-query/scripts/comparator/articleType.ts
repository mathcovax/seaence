import { createEnum, zod, type GetEnumValue } from "@vendors/clean";
import { createBaseComparator, type BaseComparator } from "./base";
import { type ZodType } from "zod";

export const articleTypeEnum = createEnum([
	"metaAnalysis",
	"controlledClinicalTrial",
	"randomizedControlledTrial",
]);

export type ArticleTypeEnumValue = GetEnumValue<typeof articleTypeEnum>;

export interface ComparatorArticleType extends BaseComparator<"articleType"> {
	value: ArticleTypeEnumValue[];
}

export const comparatorArticleTypeConfig = {
	minContent: 1,
};

export const comparatorArticleTypeSchema: ZodType<ComparatorArticleType>
	= createBaseComparator("articleType")
		.extend({
			value: zod
				.enum(articleTypeEnum.toTuple())
				.array()
				.min(comparatorArticleTypeConfig.minContent),
		});

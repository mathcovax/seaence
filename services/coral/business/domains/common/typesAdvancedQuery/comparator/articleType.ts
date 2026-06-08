import { createEnum, DPE, type GetEnumValue } from "@duplojs/utils";
import { type BaseComparator, createBaseComparator } from "./base";

export const articleTypeEnum = createEnum([
	"metaAnalysis",
	"controlledClinicalTrial",
	"randomizedControlledTrial",
]);

export type ArticleTypeUnion = GetEnumValue<typeof articleTypeEnum>;

export interface ComparatorArticleType extends BaseComparator<"articleType"> {
	value: ArticleTypeUnion[];
}

export const comparatorArticleTypeConfig = {
	minContent: 1,
} as const;

export const comparatorArticleTypeSchema = createBaseComparator("articleType")
	.extends({
		value: DPE
			.literal(articleTypeEnum.toTuple())
			.array()
			.min(comparatorArticleTypeConfig.minContent),
	});

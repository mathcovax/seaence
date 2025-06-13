import { type estypes } from "@elastic/elasticsearch";
import { type Comparator } from "@vendors/types-advanced-query";
import { match } from "ts-pattern";
import { buildTextComparator } from "./text";
import { buildYearComparator } from "./year";
import { buildStrictTextComparator } from "./strictText";
import { buildProviderComparator } from "./provider";
import { buildArticleTypeComparator } from "./articleType";
import { buildAuthorComparator } from "./author";
import { buildYearIntervalComparator } from "./yearInterval";

export function buildComparator(comparator: Comparator): estypes.QueryDslQueryContainer {
	return match(comparator)
		.with(
			{ name: "text" },
			buildTextComparator,
		)
		.with(
			{ name: "year" },
			buildYearComparator,
		)
		.with(
			{ name: "strictText" },
			buildStrictTextComparator,
		)
		.with(
			{ name: "articleType" },
			buildArticleTypeComparator,
		)
		.with(
			{ name: "provider" },
			buildProviderComparator,
		)
		.with(
			{ name: "author" },
			buildAuthorComparator,
		)
		.with(
			{ name: "yearInterval" },
			buildYearIntervalComparator,
		)
		.exhaustive();
}

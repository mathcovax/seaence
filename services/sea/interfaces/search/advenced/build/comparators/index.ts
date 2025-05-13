import { type estypes } from "@elastic/elasticsearch";
import { type Comparator } from "@vendors/types-advanced-query";
import { match } from "ts-pattern";
import { buildTextOperator } from "./text";
import { buildYearOperator } from "./year";

export function buildComparator(comparator: Comparator): estypes.QueryDslQueryContainer {
	return match(comparator)
		.with(
			{ name: "text" },
			buildTextOperator,
		)
		.with(
			{ name: "year" },
			buildYearOperator,
		)
		.exhaustive();
}

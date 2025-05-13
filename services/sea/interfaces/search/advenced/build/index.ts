import { type estypes } from "@elastic/elasticsearch";
import { type OperatorContent } from "@vendors/types-advanced-query";
import { match } from "ts-pattern";
import { buildComparator } from "./comparators";

export function buildOperatorContent(term: OperatorContent): estypes.QueryDslQueryContainer {
	return match(term)
		.returnType<estypes.QueryDslQueryContainer>()
		.with(
			{ type: "comparator" },
			buildComparator,
		)
		.with(
			{
				type: "operator",
				name: "and",
			},
			({ content }) => ({
				bool: {
					must: content.map(buildOperatorContent),
				},
			}),
		)
		.with(
			{
				type: "operator",
				name: "or",
			},
			({ content }) => ({
				bool: {
					should: content.map(buildOperatorContent),
					minimum_should_match: 1,
				},
			}),
		)
		.with(
			{
				type: "operator",
				name: "not",
			},
			({ content }) => (
				content
					? {
						bool: {
							must_not: buildOperatorContent(content),
						},
					}
					: {
						exists: {
							field: "bakedDocumentId",
						},
					}
			),
		)
		.exhaustive();
}

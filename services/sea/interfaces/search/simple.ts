import { type buildFilters } from "./facet";
import { type estypes } from "@elastic/elasticsearch";
import { availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";

interface BuildSimpleSearchQueryParams {
	term: string;
	buildedFilters?: ReturnType<typeof buildFilters>;
}

const minimumShouldMatch = 1;

const strictWordRegex = /"([^"]+)"/g;

export function buildSimpleSearchQuery(
	{
		term,
		buildedFilters,
	}: BuildSimpleSearchQueryParams,
) {
	const strictWord = Array.from(
		term.matchAll(strictWordRegex),
	);

	const refinedTerm = strictWord.reduce(
		(acc, [match]) => acc.replace(match, ""),
		term,
	);

	return {
		__id: "simpleSearchQuery",
		function_score: {
			query: {
				bool: {
					must: [
						...(buildedFilters?.must ?? []),
						...(
							strictWord.length
								? strictWord.map(
									([_match, value]) => ({
										multi_match: {
											query: value,
											type: "phrase",
											fields: [
												`${availableFieldEnum["abstract.strict"]}^40`,
												`${availableFieldEnum["title.strict"]}^80`,
												`${availableFieldEnum["keywords.strict"]}^90`,
												`${availableFieldEnum["authors.strict"]}^100`,
											],
										},
									}) satisfies estypes.QueryDslQueryContainer,
								)
								: []
						),
					],
					should: refinedTerm
						? [
							{
								multi_match: {
									query: refinedTerm,
									type: "phrase",
									fields: [
										`${availableFieldEnum["title.stemmed"]}^30`,
										`${availableFieldEnum["abstract.stemmed"]}^15`,
										`${availableFieldEnum.title}^30`,
										`${availableFieldEnum.abstract}^15`,
									],
									slop: 3,
								},
							},
							{
								multi_match: {
									query: refinedTerm,
									fields: [
										`${availableFieldEnum["title.stemmed"]}^10`,
										availableFieldEnum["abstract.stemmed"],
										`${availableFieldEnum.title}^10`,
										availableFieldEnum.abstract,
										`${availableFieldEnum.keywords}^50`,
									],
								},
							},
						]
						: undefined,
					minimum_should_match: refinedTerm ? minimumShouldMatch : undefined,
				},
			},
			functions: [
				{
					filter: {
						bool: {
							must_not: {
								exists: {
									field: "abstract",
								},
							},
						},
					},
					weight: 0.4,
				},
			],
			boost_mode: "multiply",
		},
	} satisfies estypes.QueryDslQueryContainer & { __id: "simpleSearchQuery" };
}


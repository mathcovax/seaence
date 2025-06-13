import { type buildFilters } from "./facet";
import { type estypes } from "@elastic/elasticsearch";
import { availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";

interface BuildSimpleSearchQueryParams {
	term: string;
	buildedFilters?: ReturnType<typeof buildFilters>;
}

const minimumShouldMatch = 1;

const strictWordRegex = /"([^"]+)"/g;
const truncationWordRegex = /[a-z]+\*/gi;
const minTruncationLength = 3;

export function buildSimpleSearchQuery(
	{
		term,
		buildedFilters,
	}: BuildSimpleSearchQueryParams,
) {
	const strictWords = Array.from(
		term.matchAll(strictWordRegex),
	);

	const truncationWords = Array.from(
		term.matchAll(truncationWordRegex),
	);

	const refinedTerm = [...strictWords, ...truncationWords].reduce(
		(acc, [match]) => acc.replace(match, ""),
		term,
	);

	const should: estypes.QueryDslQueryContainer[] = [];

	if (refinedTerm) {
		should.push(
			{
				multi_match: {
					query: refinedTerm,
					type: "phrase",
					fields: [
						`${availableFieldEnum["title.stemmed"]}^30`,
						`${availableFieldEnum["abstract.stemmed"]}^15`,
					],
					slop: 2,
				},
			},
			{
				multi_match: {
					query: refinedTerm,
					fields: [
						`${availableFieldEnum["title.stemmed"]}^10`,
						availableFieldEnum["abstract.stemmed"],
						`${availableFieldEnum.keywords}^50`,
					],
				},
			},
		);
	}

	if (truncationWords.length) {
		should.push(
			...truncationWords.flatMap(
				([match]) => match.length > minTruncationLength
					? {
						query_string: {
							query: match,
							fields: [
								`${availableFieldEnum["title.stemmed"]}^30`,
								`${availableFieldEnum["abstract.stemmed"]}^15`,
							],
						},
					}
					: [],
			),
		);
	}

	return {
		__id: "simpleSearchQuery",
		function_score: {
			query: {
				bool: {
					must: [
						...(buildedFilters?.must ?? []),
						...(
							strictWords.length
								? strictWords.map(
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
					should: should.length
						? should
						: undefined,
					minimum_should_match: should.length
						? minimumShouldMatch
						: undefined,
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


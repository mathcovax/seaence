import { type buildFilters } from "./facet";
import { type estypes } from "@elastic/elasticsearch";
import { availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";

interface BuildSimpleSearchQueryParams {
	term: string;
	buildedFilters?: ReturnType<typeof buildFilters>;
}

export function buildSimpleSearchQuery(
	{
		term,
		buildedFilters,
	}: BuildSimpleSearchQueryParams,
) {
	return {
		__id: "simpleSearchQuery",
		bool: {
			should: [
				{
					multi_match: {
						query: term,
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
						query: term,
						fields: [
							`${availableFieldEnum["title.stemmed"]}^10`,
							availableFieldEnum["abstract.stemmed"],
							`${availableFieldEnum.title}^10`,
							availableFieldEnum.abstract,
							`${availableFieldEnum.keywords}^50`,
						],
					},
				},
				{
					match: {
						[availableFieldEnum["authors.strict"]]: {
							query: term,
							boost: 50,
						},
					},
				},
			],
			minimum_should_match: 1,
			...buildedFilters,
		},
	} satisfies estypes.QueryDslQueryContainer & { __id: "simpleSearchQuery" };
}


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
							`${availableFieldEnum["title.stemmed"]}^15`,
							`${availableFieldEnum["abstract.stemmed"]}^5`,
						],
						slop: 3,
					},
				},
				{
					multi_match: {
						query: term,
						fields: [
							`${availableFieldEnum["title.stemmed"]}^5`,
							availableFieldEnum["abstract.stemmed"],
							`${availableFieldEnum.keywords}^20`,
						],
					},
				},
				{
					match: {
						[availableFieldEnum["authors.strict"]]: {
							query: term,
							boost: 20,
						},
					},
				},
			],
			...buildedFilters,
		},
	} satisfies estypes.QueryDslQueryContainer & { __id: "simpleSearchQuery" };
}


import { aggregationsResultsToFacetWrapper, findFacets } from "@interfaces/search/facet";
import { languageSchema } from "../schemas/common";
import { endpointFacetsSchema, type EndpointFacetsSchema } from "../schemas/facet";
import { filtersValuesSchema } from "../schemas/filter";
import { operatorContentSchema } from "@vendors/types-advanced-query";

useBuilder()
	.createRoute("POST", "/facets")
	.extract({
		body: zod.object({
			language: languageSchema,
			term: zod.union([
				zod.string(),
				operatorContentSchema,
			]),
			filtersValues: filtersValuesSchema.optional(),
		}),
	})
	.handler(
		async(pickup) => {
			const {
				language,
				term,
				filtersValues,
			} = pickup("body");

			const facets = await findFacets({
				language,
				term,
				filtersValues,
			})
				.then(
					({ aggregations, hits }): EndpointFacetsSchema => ({
						total: hits.total.value,
						facets: aggregationsResultsToFacetWrapper(language, aggregations),
					}),
				);

			return new OkHttpResponse(
				"facets.results",
				facets,
			);
		},
		makeResponseContract(OkHttpResponse, "facets.results", endpointFacetsSchema),
	);

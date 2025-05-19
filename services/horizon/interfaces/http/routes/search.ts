import { bakedDocumentLanguageObjecter } from "@business/entities/bakedDocument";
import { filtersValuesSchema } from "../schemas/search/filter";
import { SeaAPI } from "@interfaces/providers/sea";
import { searchConfig } from "@interfaces/configs/search";
import { endpointSimpleSearchResultSchema, simpleSearchTermSchema } from "../schemas/search/search";
import { endpointSearchDetailsSchema } from "../schemas/search/facet";
import { match } from "ts-pattern";
import { type Facet } from "@business/entities/facets";
import { operatorContentSchema } from "@vendors/types-advanced-query";
import { BodyLimitDescription } from "../plugins/bodyLimit";

useBuilder()
	.createRoute("POST", "/search-details")
	.extract(
		{
			body: zod.object({
				language: bakedDocumentLanguageObjecter.zodSchema,
				term: zod.union([
					simpleSearchTermSchema,
					operatorContentSchema,
				]),
				filtersValues: filtersValuesSchema.optional(),
			}),
		},
		undefined,
		new BodyLimitDescription("15kb"),
	)
	.handler(
		async(pickup) => {
			const body = pickup("body");

			const { body: results } = await SeaAPI.facets(body);

			const facets = results.facets.map(
				(facet) => match(facet)
					.returnType<Facet>()
					.with(
						{ name: "articleType" },
						(facet) => ({
							type: "multiSelect",
							...facet,
						}),
					)
					.with(
						{ name: "gender" },
						(facet) => ({
							type: "checkbox",
							...facet,
						}),
					)
					.with(
						{ name: "species" },
						(facet) => ({
							type: "checkbox",
							...facet,
						}),
					)
					.with(
						{ name: "year" },
						(facet) => ({
							type: "range",
							...facet,
						}),
					)
					.exhaustive(),
			);

			const total = results.total > searchConfig.maxPage
				? searchConfig.maxPage
				: results.total;

			return new OkHttpResponse(
				"search.details",
				{
					total,
					facets,
					quantityPerPage: searchConfig.quantityPerPage,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "search.details", endpointSearchDetailsSchema),
	);

useBuilder()
	.createRoute("POST", "/search-results")
	.extract(
		{
			body: zod.object({
				language: bakedDocumentLanguageObjecter.zodSchema,
				page: zod.number().max(searchConfig.maxPage),
				term: zod.union([
					simpleSearchTermSchema,
					operatorContentSchema,
				]),
				filtersValues: filtersValuesSchema.optional(),
			}),
		},
		undefined,
		new BodyLimitDescription("15kb"),
	)
	.handler(
		async(pickup) => {
			const body = pickup("body");

			const { body: results } = await SeaAPI.searchResult({
				...body,
				quantityPerPage: searchConfig.quantityPerPage,
				page: body.page - searchConfig.pageOffset,
			});

			return new OkHttpResponse(
				"simpleSearch.results",
				results,
			);
		},
		makeResponseContract(OkHttpResponse, "simpleSearch.results", endpointSimpleSearchResultSchema.array()),
	);

import { bakedDocumentLanguageObjecter } from "@business/entities/bakedDocument";
import { filtersValuesSchema } from "../schemas/search/filter";
import { SeaAPI } from "@interfaces/providers/sea";
import { searchConfig } from "@interfaces/configs/search";
import { endpointSimpleSearchResultSchema } from "../schemas/search/search";

useBuilder()
	.createRoute("POST", "/simple-search-results")
	.extract({
		body: zod.object({
			language: bakedDocumentLanguageObjecter.zodSchema,
			page: zod.number().max(searchConfig.maxPage),
			term: zod.string(),
			filtersValues: filtersValuesSchema.optional(),
		}),
	})
	.handler(
		async(pickup) => {
			const body = pickup("body");

			const { body: results } = await SeaAPI.simpleSearchResult({
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

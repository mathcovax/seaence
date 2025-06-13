import { type EndpointSimpleSearchResultSchema, endpointSimpleSearchResultSchema } from "../schemas/search";
import { languageSchema } from "../schemas/common";
import { filtersValuesSchema } from "../schemas/filter";
import { search } from "@interfaces/search";
import { operatorContentSchema } from "@vendors/types-advanced-query";
import { resultConfig } from "@interfaces/configs/result";

useBuilder()
	.createRoute("POST", "/search-results")
	.extract({
		body: zod.object({
			language: languageSchema,
			page: zod.number(),
			quantityPerPage: zod.number(),
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
				page,
				quantityPerPage,
				filtersValues,
			} = pickup("body");

			const results = await search({
				language,
				term,
				page,
				quantityPerPage,
				filtersValues,
			})
				.then(
					(rawResult): EndpointSimpleSearchResultSchema[] => rawResult.hits.hits.map(
						({ _source, highlight, _score }) => ({
							score: _score,
							bakedDocumentId: _source.bakedDocumentId,
							title: highlight.title,
							articleTypes: _source.articleTypes,
							authors: [
								...(highlight?.authors?.length ? highlight.authors : []),
								..._source.authors,
							],
							keywords: highlight?.keywords ?? null,
							webPublishDate: _source.webPublishDate,
							journalPublishDate: _source.journalPublishDate,
							summary: highlight?.abstract?.length
								? highlight.abstract
									.join(".. ")
									.concat(
										...(_source.summary
											? [" ", _source.summary]
											: []
										),
									)
									.substring(
										resultConfig.summary.tronc.from,
										resultConfig.summary.tronc.to,
									)
									.concat("..")
								: _source.summary,
						}),
					),
				);

			return new OkHttpResponse(
				"simpleSearch.results",
				results,
			);
		},
		makeResponseContract(OkHttpResponse, "simpleSearch.results", endpointSimpleSearchResultSchema.array()),
	);

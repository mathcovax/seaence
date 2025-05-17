import { type EndpointSimpleSearchResultSchema, endpointSimpleSearchResultSchema } from "../schemas/search";
import { languageSchema } from "../schemas/common";
import { filtersValuesSchema } from "../schemas/filter";
import { search } from "@interfaces/search";
import { operatorContentSchema } from "@vendors/types-advanced-query";

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

			const summaryTronc = {
				from: 0,
				to: 300,
			};

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
							title: highlight?.["title.stemmed"]?.shift() ?? _source.title,
							articleTypes: _source.articleTypes,
							authors: [
								...(highlight?.["authors.strict"] ? highlight["authors.strict"] : []),
								..._source.authors,
							],
							keywords: highlight?.keywords ?? null,
							webPublishDate: _source.webPublishDate,
							journalPublishDate: _source.journalPublishDate,
							summary: highlight?.["abstract.stemmed"]?.length
								? `${highlight["abstract.stemmed"].join(".. ").substring(summaryTronc.from, summaryTronc.to)}..`
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

import { simpleSearch } from "@interfaces/search/simple";
import { type EndpointSimpleSearchSchema, endpointSimpleSearchSchema } from "../schemas/search";
import { languageSchema } from "../schemas/common";
import { aggregationsResultsToFacetWrapper } from "@interfaces/search/facet";

useBuilder()
	.createRoute("POST", "/simple-search")
	.extract({
		body: zod.object({
			language: languageSchema,
			page: zod.number(),
			quantityPerPage: zod.number(),
			term: zod.string(),
		}),
	})
	.handler(
		async(pickup) => {
			const { language, term, page, quantityPerPage } = pickup("body");

			const summaryTronc = {
				from: 0,
				to: 300,
			};

			const results = await simpleSearch({
				language,
				term,
				page,
				quantityPerPage,
			})
				.then(
					(rawResult): EndpointSimpleSearchSchema => ({
						total: rawResult.hits.total.value,
						results: rawResult.hits.hits.map(
							({ _source, highlight, _score }) => ({
								score: _score,
								abysBakedDocumentId: _source.abysBakedDocumentId,
								title: highlight?.title?.shift() ?? _source.title,
								articleType: _source.articleTypes,
								authors: _source.authors.map(
									(author) => {
										const highlighted = highlight
											?.authors
											?.find(
												(highlightAuthor) => highlightAuthor.replace(/<\/?em>/g, "").toLowerCase() === author.toLowerCase(),
											);

										return highlighted ?? author;
									},
								),
								keywords: highlight?.keywords ?? null,
								webPublishDate: _source.webPublishDate,
								journalPublishDate: _source.journalPublishDate,
								summary: highlight?.abstract?.join(" ").substring(summaryTronc.from, summaryTronc.to)
									?? _source.summary,
							}),
						),
						facetWrapper: aggregationsResultsToFacetWrapper(rawResult.aggregations),
					}),
				);

			return new OkHttpResponse(
				"simpleSearch.results",
				results,
			);
		},
		// makeResponseContract(OkHttpResponse, "simpleSearch.results", endpointSimpleSearchSchema),
	);

import { simpleSearch } from "@interfaces/search/simple";
import { type EndpointSimpleSearchResultSchema, endpointSimpleSearchResultSchema } from "../schemas/search";
import { languageSchema } from "../schemas/common";
import { filtersValuesSchema } from "../schemas/filter";

useBuilder()
	.createRoute("POST", "/simple-search-result")
	.extract({
		body: zod.object({
			language: languageSchema,
			page: zod.number(),
			quantityPerPage: zod.number(),
			term: zod.string(),
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

			const results = await simpleSearch({
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
							summary: highlight?.abstract?.join(".. ").substring(summaryTronc.from, summaryTronc.to)
								?? _source.summary,
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

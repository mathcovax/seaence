import { BackedDocument } from "@business/entities/bakedDocument";
import { SeaAPI } from "@interfaces/providers/sea";
import { searchConfig } from "@interfaces/configs/search";
import { match } from "ts-pattern";
import { Facet } from "@business/entities/facets";
import { operatorContentSchema } from "@vendors/types-advanced-query";
import { BodyLimitDescription } from "../plugins/bodyLimit";
import { tryAuthenticationProcess } from "../security/authentication";
import { CoralAPI } from "@interfaces/providers/coral";

useBuilder()
	.createRoute("POST", "/search-details")
	.extract(
		{
			body: zod.object({
				language: BackedDocument.language,
				term: zod.union([
					zod.string()
						.max(searchConfig.simple.maxLength)
						.min(searchConfig.simple.minLength),
					operatorContentSchema,
				]),
				filtersValues: Facet.filters.optional(),
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
					.returnType<Facet.Index>()
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

			return new OkHttpResponse(
				"search.details",
				{
					total: results.total,
					facets,
					quantityPerPage: searchConfig.quantityPerPage,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "search.details", Facet.searchDetails),
	);

useBuilder()
	.createRoute("POST", "/search-results")
	.execute(
		tryAuthenticationProcess,
		{ pickup: ["user"] },
	)
	.extract(
		{
			body: zod.object({
				language: BackedDocument.language,
				page: zod.number().max(searchConfig.maxPage),
				term: zod.union([
					zod.string()
						.max(searchConfig.simple.maxLength)
						.min(searchConfig.simple.minLength),
					operatorContentSchema,
				]),
				filtersValues: Facet.filters.optional(),
			}),
		},
		undefined,
		new BodyLimitDescription("15kb"),
	)
	.handler(
		async(pickup) => {
			const { body, user } = pickup(["body", "user"]);

			const { body: results } = await SeaAPI.searchResult({
				...body,
				quantityPerPage: searchConfig.quantityPerPage,
				page: body.page - searchConfig.pageOffset,
			});

			const likedDocumentInFolder = user && results.length
				? await CoralAPI
					.nodeSameRawDocumentIdsHaveDocumentInFolder({
						userId: user.id,
						nodeSameRawDocumentIds: results.map(
							({ nodeSameRawDocumentId }) => nodeSameRawDocumentId,
						),
					})
					.then(({ body }) => body)
				: [];

			const searchResults = likedDocumentInFolder.length
				? results.map((result): typeof BackedDocument.searchResult["_output"] => ({
					...result,
					userHaveLinkedDocumentInFolder: likedDocumentInFolder
						.includes(result.nodeSameRawDocumentId),
				}))
				: results;

			return new OkHttpResponse(
				"simpleSearch.results",
				searchResults,
			);
		},
		makeResponseContract(OkHttpResponse, "simpleSearch.results", BackedDocument.searchResult.array()),
	);

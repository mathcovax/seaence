/* eslint-disable camelcase */
import { HttpClient } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type PubMedRoute } from "./types/pubmedRoute";
import { XMLParser } from "fast-xml-parser";
import { searchResultPayloadBuildedSchema } from "./types/searchResult";
import { type PubmedFilterArticleType } from "./types/utils";
import { articlePayloadBuildedSchema } from "./types/article";
import { useAsyncRetry } from "@vendors/clean";

/**
 * @link https://pubmed.ncbi.nlm.nih.gov/help/#dp
 */
export type PubmedDateFilter = "dp" | "epdat" | "ppdat" | "edat" | "mhda" | "crdt";

export namespace PubMedAPI {

	const httpClient = new HttpClient<PubMedRoute>({
		baseUrl: envs.PUBMED_BASE_URL,
	});

	httpClient.setDefaultRequestParams({
		query: {
			api_key: envs.PUBMED_API_KEY,
		},
	});

	const parser = new XMLParser({
		alwaysCreateTextNode: true,
		parseAttributeValue: true,
		ignoreAttributes: false,
		htmlEntities: true,
	});

	httpClient.interceptors.response = (response) => {
		if (
			typeof response.body === "string"
				&& response.headers.get("content-type")?.includes("text/xml")
		) {
			response.body = parser.parse(response.body);
		}

		return response;
	};

	const offsetMonth = 1;

	const quantitySearchResultParPage = 50;
	const expectedCode = 200;

	export function getSearchResult(
		page: number,
		date: Date,
		filterArticleType: PubmedFilterArticleType,
		dateFilter: PubmedDateFilter = "crdt",
	) {
		const fullYear = date.getFullYear();
		const month = date.getMonth() + offsetMonth;
		const monthDay = date.getDate();
		const publicationDate = `${fullYear}/${month}/${monthDay}`;

		return useAsyncRetry(
			() => httpClient
				.get(
					"/entrez/eutils/esearch.fcgi",
					{
						query: {
							db: "pubmed",
							term: `(${publicationDate}[${dateFilter}]) AND (${filterArticleType}[Filter])`,
							retmax: quantitySearchResultParPage.toString(),
							retstart: (quantitySearchResultParPage * page).toString(),
							retmode: "json",
						},
					},
				)
				.catch((error: unknown) => error as Error),
			(response) => response instanceof Error || response.code !== expectedCode,
			{
				maxRetry: 10,
				timeToSleep: 5_000,
				log: true,
			},
		)
			.then((response) => {
				if (response instanceof Error) {
					return response;
				} else if (response.code === expectedCode) {
					const result = searchResultPayloadBuildedSchema.safeParse(response.body);
					if (!result.success) {
						return result.error;
					}
					response.body = result.data;
				}
				return response;
			});
	}

	export function getArticle(pubmedId: string[]) {
		return useAsyncRetry(
			() => httpClient
				.get(
					"/entrez/eutils/efetch.fcgi",
					{
						query: {
							db: "pubmed",
							id: pubmedId,
							retmode: "xml",
						},
					},
				)
				.catch((error: unknown) => error as Error),
			(response) => response instanceof Error || response.code !== expectedCode,
			{
				maxRetry: 5,
				timeToSleep: 1000,
			},
		)
			.then((response) => {
				if (response instanceof Error) {
					return response;
				} else if (response.code === expectedCode) {
					const result = articlePayloadBuildedSchema.safeParse(response.body);
					if (!result.success) {
						return result.error;
					}
					response.body = result.data;
				}
				return response;
			})
			.catch((error: unknown) => error as Error);
	}

	export function articleExist(pubmedId: string) {
		return httpClient
			.get(
				"/entrez/eutils/efetch.fcgi",
				{
					query: {
						db: "pubmed",
						id: pubmedId,
						retmode: "xml",
					},
				},
			)
			.then(
				({ code, body }) => code === expectedCode
					&& "PubmedArticle" in body.PubmedArticleSet
					&& !!body.PubmedArticleSet.PubmedArticle,
			);
	}
}

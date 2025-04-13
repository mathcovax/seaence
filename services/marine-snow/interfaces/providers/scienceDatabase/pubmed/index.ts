/* eslint-disable camelcase */
import { HttpClient } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { retry } from "@interfaces/utils/retrying";
import { type PubMedRoute } from "./types/Route";
import { XMLParser } from "fast-xml-parser";
import { searchResultPayloadBuildedSchema } from "./types/searchResult";
import { type PubmedFilterArticleType } from "./types/utils";
import { articlePayloadBuildedSchema } from "./types/article";

/**
 * @link https://pubmed.ncbi.nlm.nih.gov/help/#dp
 */
export type PubmedDateFilter = "dp" | "epdat" | "ppdat" | "edat" | "mhda" | "crdt";

export class PubMedAPI {
	private static config = {
		offsetMonth: 1,
		quantityParPage: 50,
		maxRetry: 30,
		httpCodeWichMakeRetry: 429,
		httpCodeWithPayload: 200,
		timeToSleepBetweenRetry: 100,
	};

	public static httpClient: HttpClient<PubMedRoute>;

	public static getSearchResult(
		page: number,
		date: Date,
		filterArticleType: PubmedFilterArticleType,
		dateFilter: PubmedDateFilter = "crdt",
	) {
		const fullYear = date.getFullYear();
		const month = date.getMonth() + this.config.offsetMonth;
		const monthDay = date.getDate();
		const publicationDate = `${fullYear}/${month}/${monthDay}`;

		return retry(
			() => this.httpClient.get(
				"/entrez/eutils/esearch.fcgi",
				{
					query: {
						db: "pubmed",
						term: `(${publicationDate}[${dateFilter}]) AND (${filterArticleType}[Filter])`,
						retmax: this.config.quantityParPage.toString(),
						retstart: (this.config.quantityParPage * page).toString(),
						retmode: "json",
					},
				},
			),
			(response) => response.code === this.config.httpCodeWichMakeRetry,
			{
				maxRetry: this.config.maxRetry,
				timeToSleep: this.config.timeToSleepBetweenRetry,
			},
		)
			.then((response) => {
				if (response.code === this.config.httpCodeWithPayload) {
					const result = searchResultPayloadBuildedSchema.safeParse(response.body);
					if (!result.success) {
						return result.error;
					}
					response.body = result.data;
				}
				return response;
			});
	}

	public static getArticle(pubmedId: string) {
		return retry(
			() => this.httpClient.get(
				"/entrez/eutils/efetch.fcgi",
				{
					query: {
						db: "pubmed",
						id: pubmedId,
						retmode: "xml",
					},
				},
			),
			(response) => response.code === this.config.httpCodeWichMakeRetry,
			{
				maxRetry: this.config.maxRetry,
				timeToSleep: this.config.timeToSleepBetweenRetry,
			},
		)
			.then((response) => {
				if (response.code === this.config.httpCodeWithPayload) {
					const result = articlePayloadBuildedSchema.safeParse(response.body);
					if (!result.success) {
						return result.error;
					}
					response.body = result.data;
				}
				return response;
			});
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.PUBMED_BASE_URL,
		});

		this.httpClient.setDefaultRequestParams({
			query: {
				api_key: envs.PUBMED_API_KEY,
			},
		});

		const parser = new XMLParser({
			alwaysCreateTextNode: true,
			parseAttributeValue: true,
			ignoreAttributes: false,
		});

		this.httpClient.interceptor.response = (response) => {
			if (
				typeof response.body === "string"
				&& response.headers.get("content-type")?.includes("text/xml")
			) {
				response.body = parser.parse(response.body);
			}

			return response;
		};
	}
}

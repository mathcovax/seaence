/* eslint-disable camelcase */
import { type ArticleType } from "@business/domains/common/articleType";
import { HttpClient } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { retry } from "@interfaces/utils/retrying";
import { type PubMedRoute } from "./pubmedType";
import { XMLParser } from "fast-xml-parser";

export class PubMedAPI {
	private static config = {
		offsetMonth: 1,
		quantityParPage: 50,
		maxRetry: 30,
		httpCodeWichMakeRetry: 429,
		timeToSleepBetweenRetry: 100,
	};

	private static httpClient: HttpClient<PubMedRoute>;

	private static articleTypeMapper: Record<ArticleType["value"], string> = {
		metaAnalysis: "meta-analysis",
		randomizedControlledTrial: "randomizedcontrolledtrial",
	};

	public static getSearchResult(
		page: number,
		date: Date,
		articleType: ArticleType["value"],
	) {
		const filterArticleType = this.articleTypeMapper[articleType];

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
						term: `(${publicationDate}[Date - Publication]) AND (${filterArticleType}[Filter])`,
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
		);
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

		const parser = new XMLParser();

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

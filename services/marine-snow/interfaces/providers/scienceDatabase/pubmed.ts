/* eslint-disable camelcase */
import { type ArticleType } from "@business/domains/common/articleType";
import { HttpClient } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { convertXML } from "simple-xml-to-json";

export class PubMedAPI {
	private static config = {
		offsetMonth: 1,
		quantityParPage: 50,
	};

	private static httpClient: HttpClient;

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

		return this.httpClient.get(
			"/entrez/eutils/esearch.fcgi",
			{
				query: {
					db: "pubmed",
					term: `(${publicationDate}[Date - Publication]) AND (${filterArticleType}[Filter])`,
					retmax: this.config.quantityParPage,
					retstart: this.config.quantityParPage * page,
					retmode: "json",
				},
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
		this.httpClient.interceptor.response = (response) => {
			if (
				typeof response.body === "string"
				&& response.headers.get("content-type")?.includes("text/xml")
			) {
				response.body = convertXML(response.body);
			}

			return response;
		};
	}
}

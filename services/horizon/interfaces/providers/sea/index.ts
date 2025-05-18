import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/sea/duplojsTypesCodegen";
import { type SearchResultBody } from "./types/simpleSearchResult";
import { type FacetBody } from "./types/facets";

export type SeaClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export class SeaAPI {
	private static httpClient: HttpClient<SeaClientRoute>;

	public static searchResult(
		body: SearchResultBody,
	) {
		return this.httpClient
			.post(
				"/search-results",
				{
					body,
				},
			)
			.iWantInformation("simpleSearch.results");
	}

	public static facets(
		body: FacetBody,
	) {
		return this.httpClient
			.post(
				"/facets",
				{
					body,
				},
			)
			.iWantInformation("facets.results");
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.SEA_BASE_URL,
		});
	}
}

import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/sea/duplojsTypesCodegen";
import { type SimpleSearchResultBody } from "./types/simpleSearchResult";

export type SeaClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export class SeaAPI {
	private static httpClient: HttpClient<SeaClientRoute>;

	public static simpleSearchResult(
		body: SimpleSearchResultBody,
	) {
		return this.httpClient
			.post(
				"/simple-search-results",
				{
					body,
				},
			)
			.iWantInformation("simpleSearch.results");
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.ABYS_BASE_URL,
		});
	}
}

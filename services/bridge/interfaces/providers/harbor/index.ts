import { type FindHttpClientRoute, HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/harbor/duplojsTypesCodegen";

export type HarborClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

type InputCreateWarning = FindHttpClientRoute<HarborClientRoute, "POST", "/create-post-user-warning">["body"];

export class HarborAPI {
	private static httpClient: HttpClient<HarborClientRoute>;

	public static async createPostUserWarning(warning: InputCreateWarning) {
		return this.httpClient
			.post(
				"/create-post-user-warning",
				{
					body: warning,
				},
			)
			.iWantExpectedResponse();
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.HARBOR_BASE_URL,
		});
	}
}

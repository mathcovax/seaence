import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/school/duplojsTypesCodegen";

export type SchoolClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export class SchoolAPI {
	private static httpClient: HttpClient<SchoolClientRoute>;

	public static indicatePostIsNotCompliant(postId: string) {
		return this.httpClient.patch(
			"/posts/{postId}/is-not-compliant",
			{
				params: {
					postId,
				},
			},
		).iWantExpectedResponse();
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.SCHOOL_BASE_URL,
		});
	}
}

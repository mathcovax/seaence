import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/school/duplojsTypesCodegen";

export type SchoolClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export class SchoolAPI {
	private static httpClient: HttpClient<SchoolClientRoute>;

	public static findOldestUnprocessedPost() {
		return this.httpClient
			.get(
				"/find-oldest-unprocessed-post",
			)
			.iWantExpectedResponse();
	}

	public static findPostById(postId: string) {
		return this.httpClient
			.get(
				"/posts/{postId}",
				{
					params: {
						postId,
					},
				},
			)
			.iWantExpectedResponse();
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.SCHOOL_BASE_URL,
		});
	}
}

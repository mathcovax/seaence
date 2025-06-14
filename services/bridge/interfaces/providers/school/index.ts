import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/school/duplojsTypesCodegen";

export type SchoolClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

interface InputIndicatePostIsNotCompliantAndCreateWarning {
	postId: string;
	makeUserBan: boolean;
	reason: string;
}
export class SchoolAPI {
	private static httpClient: HttpClient<SchoolClientRoute>;

	public static findOldestUnprocessedPost() {
		return this.httpClient
			.get(
				"/find-oldest-unprocessed-post",
			)
			.iWantExpectedResponse();
	}

	public static getUnprocessedPostDetails() {
		return this.httpClient
			.get(
				"/unprocessed-post-details",
			)
			.iWantExpectedResponse();
	}

	public static indicatePostIsCompliant(postId: string) {
		return this.httpClient.patch(
			"/posts/{postId}/is-compliant",
			{
				params: {
					postId,
				},
			},
		).iWantExpectedResponse();
	}

	public static indicatePostIsNotCompliantAndCreateWarning(params: InputIndicatePostIsNotCompliantAndCreateWarning) {
		return this.httpClient
			.patch(
				"/posts/{postId}/is-not-compliant",
				{
					params: {
						postId: params.postId,
					},
					body: {
						makeUserBan: params.makeUserBan,
						reason: params.reason,
					},
				},
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

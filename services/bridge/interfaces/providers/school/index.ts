import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/school/duplojsTypesCodegen";

export type SchoolClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

interface InputIndicateIsNotCompliantAndCreateWarning {
	makeUserBan: boolean;
	reason: string;
}

interface InputIndicatePostIsNotCompliantAndCreateWarning extends InputIndicateIsNotCompliantAndCreateWarning {
	postId: string;
}

interface InputIndicateAnswerIsNotCompliantAndCreateWarning extends InputIndicateIsNotCompliantAndCreateWarning {
	answerId: string;
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
				"/posts/{postId}/is-not-compliant-and-create-warning",
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

	public static findOldestUnprocessedAnswer() {
		return this.httpClient
			.get(
				"/find-oldest-unprocessed-answer",
			)
			.iWantExpectedResponse();
	}

	public static getUnprocessedAnswerDetails() {
		return this.httpClient
			.get(
				"/unprocessed-answer-details",
			)
			.iWantExpectedResponse();
	}

	public static indicateAnswerIsCompliant(answerId: string) {
		return this.httpClient.patch(
			"/answers/{answerId}/is-compliant",
			{
				params: {
					answerId,
				},
			},
		).iWantExpectedResponse();
	}

	public static indicateAnswerIsNotCompliantAndCreateWarning(
		params: InputIndicateAnswerIsNotCompliantAndCreateWarning,
	) {
		return this.httpClient
			.patch(
				"/answers/{answerId}/is-not-compliant-and-create-warning",
				{
					params: {
						answerId: params.answerId,
					},
					body: {
						makeUserBan: params.makeUserBan,
						reason: params.reason,
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

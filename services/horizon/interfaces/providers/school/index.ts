import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/school/duplojsTypesCodegen";
import { type InputCreateAnswer, type InputCreatePost } from "./types";

export type SchoolClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export class SchoolAPI {
	private static httpClient: HttpClient<SchoolClientRoute>;

	public static findPosts(
		nodeSameRawDocumentId: string,
		quantityPerPage: number,
		page: number,
	) {
		return this.httpClient
			.get(
				"/documents/{nodeSameRawDocumentId}/posts",
				{
					params: {
						nodeSameRawDocumentId,
					},
					query: {
						page: page.toString(),
						quantityPerPage: quantityPerPage.toString(),
					},
				},
			)
			.iWantInformation("posts.found");
	}

	public static createPost(body: InputCreatePost) {
		return this.httpClient
			.post(
				"/posts",
				{
					body,
				},
			)
			.iWantInformation("post.created");
	}

	public static findAnswers(
		postId: string,
		quantityPerPage: number,
		page: number,
	) {
		return this.httpClient
			.get(
				"/posts/{postId}/answers",
				{
					params: {
						postId,
					},
					query: {
						page: page.toString(),
						quantityPerPage: quantityPerPage.toString(),
					},
				},
			)
			.iWantExpectedResponse();
	}

	public static replyToPost(postId: string, body: InputCreateAnswer) {
		return this.httpClient
			.post(
				"/posts/{postId}/answers",
				{
					params: {
						postId,
					},
					body,
				},
			)
			.iWantExpectedResponse();
	}

	public static findPost(postId: string) {
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

	public static findDocumentPostsDetails(nodeSameRawDocumentId: string) {
		return this.httpClient
			.get(
				"/documents/{nodeSameRawDocumentId}/posts-details",
				{
					params: {
						nodeSameRawDocumentId,
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

import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/school/duplojsTypesCodegen";

export type SchoolClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

interface User {
	id: string;
	username: string;
}

interface InputCreatePost {
	topic: string;
	content: string;
	nodeSameRawDocumentId: string;
	author: User;
}

interface InputReplyToPost {
	postId: string;
	content: string;
	author: User;
}

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

	public static createPost(params: InputCreatePost) {
		const { topic, content, nodeSameRawDocumentId, author } = params;

		return this.httpClient
			.post(
				"/posts",
				{
					body: {
						topic,
						content,
						nodeSameRawDocumentId,
						author,
					},
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

	public static replyToPost(params: InputReplyToPost) {
		const { postId, content, author } = params;

		return this.httpClient
			.post(
				"/posts/{postId}/answers",
				{
					params: {
						postId,
					},
					body: {
						content,
						author,
					},
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

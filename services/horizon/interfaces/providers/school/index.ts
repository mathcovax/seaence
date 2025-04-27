import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/school/duplojsTypesCodegen";

export type SchoolClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

interface Article {
	id: string;
	title: string;
}

interface User {
	id: string;
	username: string;
}

interface InputCreatePost {
	topic: string;
	content: string;
	article: Article;
	author: User;
}

interface InputReplyToPost {
	postId: string;
	content: string;
	author: User;
}

export class SchoolAPI {
	private static httpClient: HttpClient<SchoolClientRoute>;

	public static async getPosts(articleId: string, page: number) {
		return this.httpClient.get(
			"/articles/{articleId}/posts",
			{
				params: {
					articleId,
				},
				query: {
					page: page.toString(),
				},
			},
		).iWantExpectedResponse();
	}

	public static async createPost(params: InputCreatePost) {
		const { topic, content, article, author } = params;

		return this.httpClient.post(
			"/posts",
			{
				body: {
					topic,
					content,
					article,
					author,
				},
			},
		).iWantExpectedResponse();
	}

	public static async getAnswers(postId: string, page: number) {
		return this.httpClient.get(
			"/posts/{postId}/answers",
			{
				params: {
					postId,
				},
				query: {
					page: page.toString(),
				},
			},
		).iWantExpectedResponse();
	}

	public static async replyToPost(params: InputReplyToPost) {
		const { postId, content, author } = params;

		return this.httpClient.post(
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
		).iWantExpectedResponse();
	}

	public static async getPost(postId: string) {
		return this.httpClient.get(
			"/posts/{postId}",
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

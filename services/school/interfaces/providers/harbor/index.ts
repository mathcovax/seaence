import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/harbor/duplojsTypesCodegen";

export type HarborClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

interface InputCreateWarning {
	makeUserBan: boolean;
	reason: string;
	userId: string;
}

interface InputCreatePostWarning extends InputCreateWarning {
	postId: string;
}

interface InputCreateAnswerWarning extends InputCreateWarning {
	answerId: string;
	postId: string;
}

export class HarborAPI {
	private static httpClient: HttpClient<HarborClientRoute>;

	public static async createPostUserWarning(warning: InputCreatePostWarning) {
		return this.httpClient
			.post(
				"/create-post-user-warning",
				{
					body: warning,
				},
			)
			.iWantExpectedResponse();
	}

	public static async createAnswerUserWarning(warning: InputCreateAnswerWarning) {
		return this.httpClient
			.post(
				"/create-answer-user-warning",
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

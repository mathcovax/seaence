import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/bottle/duplojsTypesCodegen";

export type BottleClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

interface InputCreateNotification {
	userId: string;
	warningId: string;
	reason: string;
}

interface InputCreateUserPostNotification extends InputCreateNotification {
	postId: string;
}

interface InputCreateUserAnswerNotification extends InputCreateNotification {
	postId: string;
	answerId: string;
}

export class BottleAPI {
	private static httpClient: HttpClient<BottleClientRoute>;

	public static createUserPostBanNotification(params: InputCreateUserPostNotification) {
		return this.httpClient.post(
			"/create-post-ban-notification",
			{
				body: params,
			},
		).iWantExpectedResponse();
	}

	public static createUserPostWarningNotification(params: InputCreateUserPostNotification) {
		return this.httpClient.post(
			"/create-post-warning-notification",
			{
				body: params,
			},
		).iWantExpectedResponse();
	}

	public static createUserAnswerBanNotification(params: InputCreateUserAnswerNotification) {
		return this.httpClient.post(
			"/create-answer-ban-notification",
			{
				body: params,
			},
		).iWantExpectedResponse();
	}

	public static createUserAnswerWarningNotification(params: InputCreateUserAnswerNotification) {
		return this.httpClient.post(
			"/create-answer-warning-notification",
			{
				body: params,
			},
		).iWantExpectedResponse();
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.BOTTLE_BASE_URL,
		});
	}
}

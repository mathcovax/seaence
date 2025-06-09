import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/bottle/duplojsTypesCodegen";

export type BottleClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

interface InputCreateUserPostNotification {
	userId: string;
	warningId: string;
	postId: string;
	reason: string;
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

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.BOTTLE_BASE_URL,
		});
	}
}

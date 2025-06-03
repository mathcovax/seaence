import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/bottle/duplojsTypesCodegen";

export type BottleClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

interface InputActivateReplyPostNotification {
	postId: string;
	userId: string;
}

export class BottleAPI {
	private static httpClient: HttpClient<BottleClientRoute>;

	public static enableReplyPostNotification(input: InputActivateReplyPostNotification) {
		return this.httpClient
			.post(
				"/enable-reply-post-notification-settings",
				{
					body: input,
				},
			)
			.iWantInformation("replyPostNotification.enable");
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.BOTTLE_BASE_URL,
		});
	}
}

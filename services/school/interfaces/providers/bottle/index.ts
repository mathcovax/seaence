import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/bottle/duplojsTypesCodegen";
import type { InputEnableNotification } from "./types";

export type BottleClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export class BottleAPI {
	private static httpClient: HttpClient<BottleClientRoute>;

	public static enableReplyPostNotification(input: InputEnableNotification) {
		return this.httpClient
			.post(
				"/notification-reply-post-setting-enable",
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

import { HttpClient, type TransformCodegenRouteToHttpClientRoute, type FindHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/bottle/duplojsTypesCodegen";

export type BottleClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

type InputRegisterNotification = FindHttpClientRoute<BottleClientRoute, "POST", "/send-registration-email">["body"];

export class BottleAPI {
	private static httpClient: HttpClient<BottleClientRoute>;

	public static sendRegisterNotification(input: InputRegisterNotification) {
		return this.httpClient.post(
			"/send-registration-email",
			{
				body: input,
			},
		).iWantInformation("notification.sent");
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.BOTTLE_BASE_URL,
		});
	}
}

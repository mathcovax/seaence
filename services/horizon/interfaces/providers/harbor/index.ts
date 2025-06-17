import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/harbor/duplojsTypesCodegen";
import { type InputUserPayload, type InputRegisterUser } from "./types";

export type HarborClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export class HarborAPI {
	private static httpClient: HttpClient<HarborClientRoute>;

	public static login(firebaseToken: string) {
		return this.httpClient
			.post(
				"/login",
				{
					body: { firebaseToken },
				},
			)
			.iWantExpectedResponse();
	}

	public static register(body: InputRegisterUser) {
		return this.httpClient
			.post(
				"/register",
				{
					body,
				},
			)
			.iWantExpectedResponse();
	}

	public static findUser(accessToken: string) {
		return this.httpClient
			.post(
				"/find-user",
				{
					body: { accessToken },
				},
			)
			.iWantExpectedResponse();
	}

	public static updateUser(body: InputUserPayload) {
		return this.httpClient
			.post(
				"/update-user",
				{
					body,
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

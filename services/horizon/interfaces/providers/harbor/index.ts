import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/harbor/duplojsTypesCodegen";

export type HarborClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export class HarborAPI {
	private static httpClient: HttpClient<HarborClientRoute>;

	public static async auth(firebaseTokenId: string) {
		return this.httpClient
			.post(
				"/authentication",
				{
					body: firebaseTokenId,
				},
			)
			.iWantExpectedResponse();
	}

	public static async findUser(accessToken: string) {
		return this.httpClient
			.post(
				"/find-user",
				{
					body: { accessToken },
				},
			)
			.iWantExpectedResponse();
	}

	public static async renameUser(
		userId: string,
		newUsername: string,
	) {
		return this.httpClient
			.post(
				"/rename-user",
				{
					body: {
						userId,
						newUsername,
					},
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

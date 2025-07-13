import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/harbor/duplojsTypesCodegen";
import { type InputUpdateUserPersonalDataPayload, type InputRegisterUser } from "./types";

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

	public static findOneUserByAccessToken(accessToken: string) {
		return this.httpClient
			.post(
				"/user/find-one-by-access-token",
				{
					body: { accessToken },
				},
			)
			.iWantExpectedResponse();
	}

	public static updateUserPersonalData(body: InputUpdateUserPersonalDataPayload) {
		return this.httpClient
			.post(
				"/user/update-personal-data",
				{
					body,
				},
			)
			.iWantExpectedResponse();
	}

	public static deleteUser(userId: string) {
		return this.httpClient
			.post(
				"/user/delete",
				{
					body: { userId },
				},
			)
			.iWantInformation([
				"user.alreadyDelete",
				"user.deleted",
				"user.notfound",
			]);
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.HARBOR_BASE_URL,
		});
	}
}

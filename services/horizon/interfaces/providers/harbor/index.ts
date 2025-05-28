import { type FindHttpClientRoute, HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/harbor/duplojsTypesCodegen";

export type HarborClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

type UpdateUserPayload = FindHttpClientRoute<
	HarborClientRoute,
	"POST",
	"/update-user"
>["body"];

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

	public static register(firebaseToken: string, username: string) {
		return this.httpClient
			.post(
				"/register",
				{
					body: {
						firebaseToken,
						username,
					},
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

	public static updateUser(
		userId: string,
		payload: Omit<UpdateUserPayload, "userId">,
	) {
		return this.httpClient
			.post(
				"/update-user",
				{
					body: {
						userId,
						...payload,
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

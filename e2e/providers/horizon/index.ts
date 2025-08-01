import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@envs";
import { type CodegenRoutes } from "@vendors/clients-type/harbor/duplojsTypesCodegen";

export type HorizonClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export class HorizonAPI {
	private static httpClient: HttpClient<HorizonClientRoute>;

	public static login(firebaseToken: string) {
		return this.httpClient
			.post(
				"/login",
				{
					body: {
						firebaseToken,
					},
				},
			);
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.BASE_URL_HORIZON,
		});
	}
}

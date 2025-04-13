import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/harbor/duplojsTypesCodegen";

export type HarborClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export const harborHttpClient = new HttpClient<HarborClientRoute>({
	baseUrl: envs.HARBOR_BASE_URL,
});

export class HarborAPI {
	public static async auth(firebaseTokenId: string) {
		return harborHttpClient.post(
			"/authentication",
			{
				body: firebaseTokenId,
			},
		);
	}
}

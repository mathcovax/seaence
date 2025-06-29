import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/rosetta/duplojsTypesCodegen";
import { type InputTranslate } from "./types";

export type RosettaHttpRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export class RosettaAPI {
	private static httpClient: HttpClient<RosettaHttpRoute>;

	public static translate(body: InputTranslate) {
		return this.httpClient
			.post(
				"/translate",
				{
					body,
				},
			)
			.iWantInformation("text.translated")
			.then(({ body }) => body);
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.ROSETTA_BASE_URL,
		});
	}
}

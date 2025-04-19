/* eslint-disable id-length */
import { HttpClient, type TransformCodegenRouteToHttpClientRoute, StrictFormData, type FindHttpClientRoute } from "@duplojs/http-client";
import { type CodegenRoutes } from "./types/api";
import { envs } from "@interfaces/envs";

export type RosettaClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export type SupportedLanguage = FindHttpClientRoute<
	RosettaClientRoute,
	"POST",
	"/translate"
>["body"]["data"]["target"];

export class RosettaAPI {
	private static httpClient: HttpClient<RosettaClientRoute>;

	public static async translateText(text: string, language: SupportedLanguage) {
		const result = await this.httpClient.post(
			"/translate",
			{
				body: new StrictFormData({
					format: "text",
					source: "auto",
					target: language,
					q: text,
				}),
			},
		)
			.iWantCode("200");

		return result.body.translatedText;
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.ROSETTA_BASE_URL,
		});
	}
}

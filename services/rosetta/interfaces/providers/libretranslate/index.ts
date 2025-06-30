/* eslint-disable id-length */
import { HttpClient, type TransformCodegenRouteToHttpClientRoute, StrictFormData } from "@duplojs/http-client";
import { type SupportedLanguage, type CodegenRoutes } from "./types/api";
import { envs } from "@interfaces/envs";
import { type Translate } from "@business/entites/translate";

export type LibretranslateClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

const languageMapper: Record<Translate.Language, SupportedLanguage> = {
	"fr-FR": "fr",
	"en-US": "en",
};

export class LibretranslateAPI {
	private static httpClient: HttpClient<LibretranslateClientRoute>;

	public static async translate(text: string, language: Translate.Language) {
		const result = await this.httpClient.post(
			"/translate",
			{
				body: new StrictFormData({
					format: "text",
					source: "auto",
					target: languageMapper[language],
					q: text,
				}),
			},
		)
			.iWantCode("200");

		return result.body.translatedText;
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.LIBRETRANSLATE_BASE_URL,
		});
	}
}

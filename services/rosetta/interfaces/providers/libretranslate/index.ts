/* eslint-disable camelcase */
/* eslint-disable id-length */
import { HttpClient, type TransformCodegenRouteToHttpClientRoute, StrictFormData, WrongResponseError } from "@duplojs/http-client";
import { type SupportedLanguage, type CodegenRoutes } from "./types/api";
import { envs } from "@interfaces/envs";
import { type Translate } from "@business/entites/translate";
import { useAsyncRetry } from "@vendors/clean";

export type LibretranslateClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

const languageMapper: Record<Translate.Language, SupportedLanguage> = {
	"fr-FR": "fr",
	"en-US": "en",
};

export namespace LibretranslateAPI {
	const httpClient = new HttpClient<LibretranslateClientRoute>({
		baseUrl: envs.LIBRETRANSLATE_BASE_URL,
	});

	const expectedCode = 200;

	export async function translate(text: string, language: Translate.Language) {
		const response = await useAsyncRetry(
			() => httpClient
				.post(
					"/translate",
					{
						body: new StrictFormData({
							format: "text",
							source: "auto",
							target: languageMapper[language],
							q: text,
							api_key: envs.LIBRETRANSLATE_KEY,
						}),
					},
				)
				.catch(
					(error: unknown) => {
						if (error instanceof TypeError) {
							return error;
						}

						throw error;
					},
				),
			(response) => response instanceof TypeError || response.code !== expectedCode,
			{
				maxRetry: 5,
				timeToSleep: 1000,
			},
		);

		if (response instanceof TypeError) {
			throw response;
		} else if (response.code !== expectedCode) {
			throw new WrongResponseError(response, {
				expect: expectedCode.toString(),
				receive: response.code.toString(),
			});
		}

		return response.body.translatedText;
	}
}

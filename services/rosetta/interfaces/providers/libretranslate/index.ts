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

export namespace LibretranslateAPI {
	const httpClient = new HttpClient<LibretranslateClientRoute>({
		baseUrl: envs.LIBRETRANSLATE_BASE_URL,
	});

	const expectedCode = 200;

	const languageMapper: Record<Translate.Language, SupportedLanguage> = {
		"fr-FR": "fr",
		"en-US": "en",
	};

	export function translate(text: string, language: Translate.Language) {
		return useAsyncRetry(
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
				.catch((error: unknown) => error as Error),
			(response) => response instanceof Error || response.code !== expectedCode,
			{
				maxRetry: 10,
				timeToSleep: 30_000,
				log: true,
			},
		)
			.then(
				(response) => {
					if (response instanceof Error) {
						throw response;
					} else if (response.code !== expectedCode) {
						throw new WrongResponseError(response, {
							expect: expectedCode.toString(),
							receive: response.code.toString(),
						});
					}

					return response.body.translatedText;
				},
			);
	}
}

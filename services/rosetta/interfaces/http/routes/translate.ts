import { Translate } from "@business/entites/translate";
import { translateConfig } from "@interfaces/configs/translate";
import { GoogleScrape } from "@interfaces/providers/googleScrape";
import { LibretranslateAPI } from "@interfaces/providers/libretranslate";
import { match, P } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/translate")
	.extract({
		body: zod.object({
			provider: Translate.provider,
			language: Translate.language,
			text: zod.string().max(translateConfig.max),
		}),
	})
	.handler(
		async(pickup) => {
			const { provider, language, text } = pickup("body");

			const translatedText = await match(provider)
				.with(
					P.union("default", "libretranslate"),
					() => LibretranslateAPI
						.translate(text, language),
				)
				.with(
					"googleScrape",
					() => GoogleScrape
						.translate(text, language),
				)
				.exhaustive();

			return new OkHttpResponse("text.translated", translatedText);
		},
		makeResponseContract(OkHttpResponse, "text.translated", zod.string()),
	);

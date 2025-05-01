import { entrypointDocumentSchema } from "@interfaces/http/schemas/document";
import { elastic } from "@interfaces/providers/elastic";
import { languageEnum } from "@interfaces/providers/elastic/common/language";
import { match } from "ts-pattern";

useBuilder()
	.createRoute("PUT", "/document/{language}")
	.extract({
		params: {
			language: zod.enum(languageEnum.toTuple()),
		},
		body: entrypointDocumentSchema,
	})
	.handler(
		async(pickup) => {
			const { body: document, language } = pickup(["body", "language"]);

			await match(language)
				.with(
					"fr-FR",
					() => elastic.frFrDocument.upsertOne(document),
				)
				.with(
					"en-US",
					() => elastic.enUsDocument.upsertOne(document),
				)
				.exhaustive();

			return new OkHttpResponse("document.upsert");
		},
		makeResponseContract(OkHttpResponse, "document.upsert"),
	);

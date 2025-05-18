import { entrypointDocumentSchema } from "@interfaces/http/schemas/document";
import { elastic } from "@interfaces/providers/elastic";
import { match } from "ts-pattern";
import { languageSchema } from "../schemas/common";

useBuilder()
	.createRoute("PUT", "/document/{language}")
	.extract({
		params: {
			language: languageSchema,
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

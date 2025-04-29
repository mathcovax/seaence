import { entrypointDocumentSchema } from "@interfaces/http/schemas/document";
import { languageEnum } from "@interfaces/providers/elastic/common/language";
import { enUsBackedDocument, frFrBackedDocument } from "@interfaces/providers/elastic/indexes/document";
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
					"fr-Fr",
					() => frFrBackedDocument.upsertOne(document),
				)
				.with(
					"en-US",
					() => enUsBackedDocument.upsertOne(document),
				)
				.exhaustive();

			return new OkHttpResponse("document.upsert");
		},
		makeResponseContract(OkHttpResponse, "document.upsert"),
	);

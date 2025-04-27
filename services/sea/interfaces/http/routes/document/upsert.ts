import { documentSchema } from "@interfaces/http/schemas/document";
import { elastic } from "@interfaces/providers/elastic";

useBuilder()
	.createRoute("PUT", "/document")
	.extract({
		body: documentSchema,
	})
	.handler(
		async(pickup) => {
			const { language, ...newDocument } = pickup("body");

			await elastic.upsertOne(newDocument, language);

			return new OkHttpResponse("document.upsert");
		},
		makeResponseContract(OkHttpResponse, "document.upsert"),
	);

import { documentSchema } from "@interfaces/http/schemas/document";
import { elastic } from "@interfaces/providers/elastic";
import { match } from "ts-pattern";

useBuilder()
	.createRoute("PUT", "/document")
	.extract({
		body: documentSchema,
	})
	.handler(
		async(pickup) => {
			const { language, ...newDocument } = pickup("body");

			const { result } = await elastic.upsertOne(newDocument, language);

			return match({ result })
				.with(
					{ result: "created" },
					() => new CreatedHttpResponse("document.created"),
				)
				.with(
					{ result: "updated" },
					() => new OkHttpResponse("document.updated"),
				)
				.otherwise(() => new InternalServerErrorHttpResponse("document.error.operation_failed"));
		},
		[
			...makeResponseContract(CreatedHttpResponse, "document.created"),
			...makeResponseContract(OkHttpResponse, "document.updated"),
			...makeResponseContract(InternalServerErrorHttpResponse, "document.error.operation_failed"),
		],
	);

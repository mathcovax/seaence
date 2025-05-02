import { entryPointCreatePubmedRawDocument } from "@interfaces/http/schemas/rawDocument/pubmed";
import { upsertPubmedRawDocumentUsecase } from "@interfaces/usecase";
import { match } from "ts-pattern";

useBuilder()
	.createRoute("PUT", "/raw-document")
	.extract({
		body: entryPointCreatePubmedRawDocument,
	})
	.cut(
		async({ pickup, dropper }) => {
			const { body } = pickup(["body"]);

			const result = await match(body)
				.with(
					{ provider: "pubmed" },
					(input) => upsertPubmedRawDocumentUsecase.execute(input),
				)
				.exhaustive();

			if (result instanceof Error) {
				return new BadRequestHttpResponse("rawDocument.upsert.error", result.information);
			}

			return dropper(null);
		},
		undefined,
		makeResponseContract(BadRequestHttpResponse, "rawDocument.upsert.error", zod.string()),
	)
	.handler(
		() => new CreatedHttpResponse("rawDocument.upsert"),
		makeResponseContract(CreatedHttpResponse, "rawDocument.upsert"),
	);

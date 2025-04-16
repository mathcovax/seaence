import { entryPointCreatePubmedRawDocument } from "@interfaces/http/schemas/rawDocument/pubmed";
import { upsertPubmedRawDocumentUsecase } from "@interfaces/usecase";
import { match } from "ts-pattern";

useBuilder()
	.createRoute("PUT", "/raw-document")
	.extract({
		body: entryPointCreatePubmedRawDocument,
	})
	.handler(
		async(pickup) => {
			const { body } = pickup(["body"]);

			await match(body)
				.with(
					{ provider: "pubmed" },
					(input) => upsertPubmedRawDocumentUsecase.execute(input),
				)
				.exhaustive();

			return new CreatedHttpResponse("rawDocument.upsert");
		},
		makeResponseContract(CreatedHttpResponse, "rawDocument.upsert"),
	);

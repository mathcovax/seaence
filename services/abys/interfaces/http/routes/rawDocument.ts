import { rawDocumentShouldNotExistByResourceUrl } from "@interfaces/http/checkers/rawDocument";
import { entryPointCreatePubmedRawDocument } from "@interfaces/http/schemas/rawDocument/pubmed";
import { upsertPubmedRawDocumentUsecase } from "@interfaces/usecase";
import { match } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/raw-document")
	.extract({
		body: entryPointCreatePubmedRawDocument,
	})
	.presetCheck(
		rawDocumentShouldNotExistByResourceUrl,
		(pickup) => pickup("body").resourceUrl,
	)
	.handler(
		async(pickup) => {
			const { body } = pickup(["body"]);

			await match(body)
				.with(
					{ provider: "pubmed" },
					(input) => upsertPubmedRawDocumentUsecase.execute(input),
				)
				.exhaustive();

			return new CreatedHttpResponse("rawDocument.created");
		},
		makeResponseContract(CreatedHttpResponse, "rawDocument.created"),
	);

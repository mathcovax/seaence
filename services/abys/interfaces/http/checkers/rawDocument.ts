import { rawDocumentRepository } from "@business/applications/repositories/rawDocument";
import { type PubmedRawDocumentResourceUrl } from "@business/domains/entities/rawDocument/pubmed";
import { type GetTypeInput } from "@duplojs/core";
import { match } from "ts-pattern";

export const inpurRawDocumentExist = createTypeInput<{
	resourceUrl: PubmedRawDocumentResourceUrl;
}>();

export const rawDocumentExistCheck = createChecker("rawDocumentExist")
	.handler(
		async(input: GetTypeInput<typeof inpurRawDocumentExist>, output) => {
			const rawDocument = await match(input)
				.with(
					{ inputName: "resourceUrl" },
					({ value }) => rawDocumentRepository.use.findByResourceUrl(value),
				)
				.exhaustive();

			if (rawDocument) {
				return output("rawDocument.exist", rawDocument);
			} else {
				return output("rawDocument.notfound", null);
			}
		},
	);

export const rawDocumentShouldNotExistByResourceUrl = createPresetChecker(
	rawDocumentExistCheck,
	{
		result: "rawDocument.notfound",
		catch: () => new ConflictHttpResponse("rawDocument.alreadyExists"),
		transformInput: inpurRawDocumentExist.resourceUrl,
	},
	makeResponseContract(ConflictHttpResponse, "rawDocument.alreadyExists"),
);

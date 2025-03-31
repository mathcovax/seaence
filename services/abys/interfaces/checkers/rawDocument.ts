import { urlObjecter } from "@business/domains/types/common";
import { documentIdObjecter } from "@business/domains/types/raw/document";
import { type GetTypeInput } from "@duplojs/core";
import { rawDocumentRepository } from "@interfaces/repositories/rawDocument";

export const inpurRawDocumentExist = createTypeInput<{
	documentId: string;
	sourceUrl: string;
}>();

export const rawDocumentExistCheck = createChecker("rawDocumentExist")
	.handler(
		async({ inputName, value }: GetTypeInput<typeof inpurRawDocumentExist>, output) => {
			let rawDocument = null;

			if (inputName === "documentId") {
				const documentId = documentIdObjecter.throwCreate(value);
				rawDocument = await rawDocumentRepository.use.findByDocumentId(documentId);
			} else if (inputName === "sourceUrl") {
				const sourceUrl = urlObjecter.throwCreate(value);
				rawDocument = await rawDocumentRepository.use.findBySourceUrl(sourceUrl);
			}

			if (rawDocument) {
				return output("rawDocument.exist", rawDocument);
			} else {
				return output("rawDocument.notfound", undefined);
			}
		},
	);

export const iWantRawDocumentBySourceUrl = createPresetChecker(
	rawDocumentExistCheck,
	{
		result: "rawDocument.exist",
		catch: () => new NotFoundHttpResponse("rawDocument.notfound"),
		transformInput: inpurRawDocumentExist.sourceUrl,
	},
);

export const rawDocumentShouldNotExistBySourceUrl = createPresetChecker(
	rawDocumentExistCheck,
	{
		result: "rawDocument.notfound",
		catch: () => new ConflictHttpResponse("rawDocument.alreadyExists"),
		transformInput: inpurRawDocumentExist.sourceUrl,
	},
);

export const iWantRawDocumentByDocumentId = createPresetChecker(
	rawDocumentExistCheck,
	{
		result: "rawDocument.exist",
		catch: () => new NotFoundHttpResponse("rawDocument.notfound"),
		transformInput: inpurRawDocumentExist.documentId,
	},
);

export const rawDocumentShouldNotExistByDocumentId = createPresetChecker(
	rawDocumentExistCheck,
	{
		result: "rawDocument.notfound",
		catch: () => new ConflictHttpResponse("rawDocument.alreadyExists"),
		transformInput: inpurRawDocumentExist.documentId,
	},
);

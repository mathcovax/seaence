import { type Url } from "@business/domains/types/common";
import { type DocumentId } from "@business/domains/types/raw/document";
import { type GetTypeInput } from "@duplojs/core";
import { rawDocumentRepository } from "@interfaces/repositories/rawDocument";

export const inpurRawDocumentExist = createTypeInput<{
	documentId: DocumentId;
	sourceUrl: Url;
}>();

export const rawDocumentExistCheck = createChecker("rawDocumentExist")
	.handler(
		async({ inputName, value }: GetTypeInput<typeof inpurRawDocumentExist>, output) => {
			let rawDocument = null;

			if (inputName === "documentId") {
				rawDocument = await rawDocumentRepository.use.findByDocumentId(value);
			} else if (inputName === "sourceUrl") {
				rawDocument = await rawDocumentRepository.use.findBySourceUrl(value);
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

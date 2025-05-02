import { AbysAPI } from "@interfaces/providers/abys";

export const documentExistCheck = createChecker("documentExist")
	.handler(
		async(input: string, output) => {
			const documentResponse = await AbysAPI.getBakedDocumentById(input);

			if (documentResponse.information === "bakedDocument.get") {
				return output("document.exist", documentResponse.body);
			} else {
				return output("document.notfound", null);
			}
		},
	);

export const iWantDocumentExistById = createPresetChecker(
	documentExistCheck,
	{
		result: "document.exist",
		catch: () => new NotFoundHttpResponse("document.notfound"),
		indexing: "document",
	},
	makeResponseContract(NotFoundHttpResponse, "document.notfound"),
);

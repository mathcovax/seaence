import { AbysAPI } from "@interfaces/providers/abys";

export const nodeSameRawDocumentExistCheck = createChecker("dnodeSameRawDocumentExist")
	.handler(
		async(nodeSameRawDocumentId: string, output) => {
			const response = await AbysAPI.findNodeSameRawDocument(nodeSameRawDocumentId);

			if (response.information === "nodeSameRawDocument.found") {
				return output("nodeSameRawDocument.exist", response.body);
			} else {
				return output("nodeSameRawDocument.notfound", null);
			}
		},
	);

export const iWantNodeSameRawDocumentExist = createPresetChecker(
	nodeSameRawDocumentExistCheck,
	{
		result: "nodeSameRawDocument.exist",
		catch: () => new NotFoundHttpResponse("nodeSameRawDocument.notfound"),
		indexing: "nodeSameRawDocument",
	},
	makeResponseContract(NotFoundHttpResponse, "nodeSameRawDocument.notfound"),
);

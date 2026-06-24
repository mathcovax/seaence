import { ResponseContract, useProcessBuilder } from "@duplojs/http";
import { mustBeOwnerDocumentFolderProcess } from "./mustBeOwnerDocumentFolder";
import { NodeSameRawDocumentId } from "@business/domains/common/nodeSameRawDocument";
import { asyncPipe, E } from "@duplojs/utils";
import { useCases } from "@interfaces/useCases";

export const mustBeOwnerDocumentInFolderProcess = useProcessBuilder()
	.exec(
		mustBeOwnerDocumentFolderProcess,
		{ imports: ["ownerDocumentFolder"] },
	)
	.extract({
		body: {
			nodeSameRawDocumentId: NodeSameRawDocumentId.toExtractParser(),
		},
	})
	.cut(
		ResponseContract.notFound("documentInFolder.notfound"),
		({ nodeSameRawDocumentId, ownerDocumentFolder }, { response, output }) => asyncPipe(
			useCases.ownerFindDocumentInFolderByUniqueCombinationUseCase({
				nodeSameRawDocumentId,
				ownerDocumentFolder,
			}),
			E.whenHasInformation(
				"none-documentInFolder",
				() => response("documentInFolder.notfound"),
			),
			E.whenHasInformation(
				"success",
				(ownerDocumentInFolder) => output({ ownerDocumentInFolder }),
			),
		),
	)
	.exports(["ownerDocumentFolder", "ownerDocumentInFolder"]);

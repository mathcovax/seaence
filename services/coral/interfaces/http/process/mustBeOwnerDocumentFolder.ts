import { UserId } from "@business/domains/common/user";
import { DocumentFolder } from "@business/domains/entities/documentFolder";
import { ResponseContract, useProcessBuilder } from "@duplojs/http";
import { asyncPipe, DPE, E } from "@duplojs/utils";
import { useCases } from "@interfaces/useCases";

export const mustBeOwnerDocumentFolderProcess = useProcessBuilder()
	.extract({
		body: DPE.object({
			documentFolderId: DocumentFolder.Id.toExtractParser(),
			userId: UserId.toExtractParser(),
		}),
	})
	.cut(
		[
			ResponseContract.forbidden("documentFolder.wrongProprietary"),
			ResponseContract.notFound("documentFolder.notfound"),
		],
		({ body }, { response, output }) => asyncPipe(
			useCases.ownerFindDocumentFolderUseCase(body),
			E.whenHasInformation(
				"none-documentFolder",
				() => response("documentFolder.notfound"),
			),
			E.whenHasInformation(
				"wrong-proprietary",
				() => response("documentFolder.wrongProprietary"),
			),
			E.whenHasInformation(
				"success",
				(ownerDocumentFolder) => output({ ownerDocumentFolder }),
			),
		),
	)
	.exports(["ownerDocumentFolder"]);

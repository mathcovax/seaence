import { UserId } from "@business/domains/common/user";
import { DocumentFolder } from "@business/domains/entities/documentFolder";
import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { asyncPipe, DPE, E } from "@duplojs/utils";
import { useCases } from "@interfaces/useCases";

useRouteBuilder("POST", "/create-document-folder")
	.extract({
		body: DPE.object({
			userId: UserId.toExtractParser(),
			documentFolderName: DocumentFolder.Name.toExtractParser(),
		}),
	})
	.handler(
		[
			ResponseContract.created("documentFolder.created"),
			ResponseContract.conflict("documentFolder.alreadyExists"),
			ResponseContract.conflict("documentFolder.maxQuantity"),
		],
		({ body }, { response }) => asyncPipe(
			useCases.createDocumentFolderUseCase(body),
			E.whenHasInformation(
				"document-folder-already-exist",
				() => response("documentFolder.alreadyExists"),
			),
			E.whenHasInformation(
				"document-folder-max-quantity",
				() => response("documentFolder.maxQuantity"),
			),
			E.whenHasInformation(
				"success",
				() => response("documentFolder.created"),
			),
		),
	);

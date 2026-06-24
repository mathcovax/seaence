import { NodeSameRawDocumentId } from "@business/domains/common/nodeSameRawDocument";
import { UserId } from "@business/domains/common/user";
import { DocumentFolder } from "@business/domains/entities/documentFolder";
import { DocumentInFolder } from "@business/domains/entities/documentInFolder";
import { ResponseContract, useRouteBuilder } from "@duplojs/http";
import { A, DPE } from "@duplojs/utils";
import { useCases } from "@interfaces/useCases";

const defaultCountErrors = 0;

const endpointDataParser = DPE.object({
	capacityError: DPE.number(),
	foundError: DPE.number(),
});

useRouteBuilder("POST", "/create-many-document-in-folder")
	.extract({
		body: DPE.object({
			userId: UserId.toExtractParser(),
			nodeSameRawDocumentId: NodeSameRawDocumentId.toExtractParser(),
			documentInFolderName: DocumentInFolder.Name.toExtractParser(),
			documentFolderIds: DocumentFolder.Id.toExtractParser().array(),
		}),
	})
	.cut(
		ResponseContract.notFound("documentFolder.noneFound"),
		async({ body }, { output, response }) => {
			const { ownerDocumentFolders, errors } = await useCases.ownerFindManyDocumentFolderUseCase({
				userId: body.userId,
				documentFolderIds: body.documentFolderIds,
			});

			if (!ownerDocumentFolders) {
				return response("documentFolder.noneFound");
			}

			return output({
				ownerDocumentFolders,
				foundErrors: errors,
			});
		},
	)
	.cut(
		ResponseContract.forbidden("documentFolder.noneCapacity"),
		async({ ownerDocumentFolders }, { output, response }) => {
			const { ownerDocumentFoldersWithCapacity, errors } = await useCases.checkManyDocumentFolderCapacityUseCase({
				documentFolders: ownerDocumentFolders,
			});

			if (!ownerDocumentFoldersWithCapacity) {
				return response("documentFolder.noneCapacity");
			}

			return output({
				ownerDocumentFoldersWithCapacity,
				capacityErrors: errors,
			});
		},
	)
	.handler(
		ResponseContract.ok("documentInFolder.created", endpointDataParser),
		(
			{
				body: { nodeSameRawDocumentId, documentInFolderName },
				foundErrors,
				capacityErrors,
				ownerDocumentFoldersWithCapacity,
			},
			{ response },
		) => useCases.ownerCreateDocumentInManyFolderUseCase({
			ownerDocumentFoldersWithCapacity,
			nodeSameRawDocumentId,
			documentInFolderName,
		})
			.then(
				() => response("documentInFolder.created", {
					foundError: foundErrors
						? A.length(foundErrors)
						: defaultCountErrors,
					capacityError: capacityErrors
						? A.length(capacityErrors)
						: defaultCountErrors,
				}),
			),
	);

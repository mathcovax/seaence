import { userIdObjecter } from "@business/domains/common/user";
import { nodeSameRawDocumentIdObjecter } from "@business/domains/entities/documentInFolder";
import { endpointNodeSameRawDocumentIdsHaveDocumentInFolderSchema } from "@interfaces/http/schemas/nodeSameRawDocument";
import { nodeSameRawDocumentIdsHaveDocumentInFolderUsecase } from "@interfaces/usecase";
import { toSimpleObject } from "@vendors/clean";

useBuilder()
	.createRoute("POST", "/node-same-raw-document-ids-have-document-in-folder")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			nodeSameRawDocumentIds: nodeSameRawDocumentIdObjecter
				.toZodSchema()
				.array(),
		}),
	})
	.handler(
		async(pickup) => {
			const { nodeSameRawDocumentIds, userId } = pickup("body");

			const resultNodeSameRawDocumentIds
				= await nodeSameRawDocumentIdsHaveDocumentInFolderUsecase
					.execute({
						userId,
						nodeSameRawDocumentIds,
					});

			return new OkHttpResponse(
				"nodeSameRawDocumentIdsHaveDocumentInFolder.found",
				toSimpleObject(resultNodeSameRawDocumentIds),
			);
		},
		makeResponseContract(
			OkHttpResponse,
			"nodeSameRawDocumentIdsHaveDocumentInFolder.found",
			endpointNodeSameRawDocumentIdsHaveDocumentInFolderSchema,
		),
	);

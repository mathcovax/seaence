import { userIdObjecter } from "@business/domains/common/user";
import { documentFolderIdObjecter } from "@business/domains/entities/documentFolder";
import { nodeSameRawDocumentIdObjecter, documentInFolderNameObjecter } from "@business/domains/entities/documentInFolder";
import { userCheckManyDocumentFolderCapacityUsecase, userCreateDocumentInManyFoldersUsecase, userFindManyDocumentFolderByIdsUsecase } from "@interfaces/usecase";

useBuilder()
	.createRoute("POST", "/create-many-document-in-folder")
	.extract({
		body: zod.object({
			documentFolderIds: documentFolderIdObjecter.array().toZodSchema(),
			userId: userIdObjecter.toZodSchema(),
			nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.toZodSchema(),
			documentInFolderName: documentInFolderNameObjecter.toZodSchema(),
		}),
	})
	.cut(
		async({ pickup, dropper }) => {
			const { documentFolderIds, userId } = pickup("body");

			const { userDocumentFolders } = await userFindManyDocumentFolderByIdsUsecase
				.execute({
					userId,
					documentFolderIds,
				});

			if (!userDocumentFolders.length) {
				return new NotFoundHttpResponse("documentFolder.noneFound");
			}

			return dropper({ userDocumentFolders });
		},
		["userDocumentFolders"],
		makeResponseContract(NotFoundHttpResponse, "documentFolder.noneFound"),
	)
	.cut(
		({ pickup, dropper }) => {
			const { userDocumentFolders } = pickup(["userDocumentFolders"]);

			const { userDocumentFoldersWithCapacity } = userCheckManyDocumentFolderCapacityUsecase
				.execute({
					userDocumentFolders,
				});

			return dropper({ userDocumentFoldersWithCapacity });
		},
		["userDocumentFoldersWithCapacity"],
	)
	.handler(
		async(pickup) => {
			const {
				body: { nodeSameRawDocumentId, documentInFolderName },
				userDocumentFoldersWithCapacity,
			} = pickup(["body", "userDocumentFoldersWithCapacity"]);

			await userCreateDocumentInManyFoldersUsecase.execute({
				userDocumentFoldersWithCapacity,
				nodeSameRawDocumentId,
				documentInFolderName,
			});

			return new OkHttpResponse("documentInFolder.created");
		},
		makeResponseContract(OkHttpResponse, "documentInFolder.created"),
	);

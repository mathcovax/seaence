import { userIdObjecter } from "@business/domains/common/user";
import { documentFolderIdObjecter } from "@business/domains/entities/documentFolder";
import { nodeSameRawDocumentIdObjecter, documentInFolderNameObjecter } from "@business/domains/entities/documentInFolder";
import { endpointCreateManyDocumentInFolderSchema } from "@interfaces/http/schemas/documentInFolder";
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

			const { userDocumentFolders, errors } = await userFindManyDocumentFolderByIdsUsecase
				.execute({
					userId,
					documentFolderIds,
				});

			if (!userDocumentFolders.length) {
				return new NotFoundHttpResponse("documentFolder.noneFound");
			}

			return dropper({
				userDocumentFolders,
				foundErrors: errors,
			});
		},
		["userDocumentFolders", "foundErrors"],
		makeResponseContract(NotFoundHttpResponse, "documentFolder.noneFound"),
	)
	.cut(
		({ pickup, dropper }) => {
			const { userDocumentFolders } = pickup(["userDocumentFolders"]);

			const { userDocumentFoldersWithCapacity, errors } = userCheckManyDocumentFolderCapacityUsecase
				.execute({
					userDocumentFolders,
				});

			if (!userDocumentFoldersWithCapacity.length) {
				return new ForbiddenHttpResponse("documentFolder.noneCapacity");
			}

			return dropper({
				userDocumentFoldersWithCapacity,
				capacityError: errors,
			});
		},
		["userDocumentFoldersWithCapacity", "capacityError"],
		makeResponseContract(ForbiddenHttpResponse, "documentFolder.noneCapacity"),
	)
	.handler(
		async(pickup) => {
			const {
				body: { nodeSameRawDocumentId, documentInFolderName },
				userDocumentFoldersWithCapacity,
				foundErrors,
				capacityError,
			} = pickup(["body", "userDocumentFoldersWithCapacity", "capacityError", "foundErrors"]);

			await userCreateDocumentInManyFoldersUsecase.execute({
				userDocumentFoldersWithCapacity,
				nodeSameRawDocumentId,
				documentInFolderName,
			});

			return new OkHttpResponse("documentInFolder.created", {
				capacityError: capacityError.length,
				foundError: foundErrors.length,
			});
		},
		makeResponseContract(
			OkHttpResponse,
			"documentInFolder.created",
			endpointCreateManyDocumentInFolderSchema,
		),
	);

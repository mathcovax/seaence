import { userIdObjecter } from "@business/domains/common/user";
import { DocumentFolderEntity, documentFolderNameObjecter } from "@business/domains/entities/documentFolder";
import { userCreateDocumentFolderUsecase } from "@interfaces/usecase";
import { match, P } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/create-document-folder")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			documentFolderName: documentFolderNameObjecter.toZodSchema(),
		}),
	})
	.cut(
		async({ pickup, dropper }) => {
			const { userId, documentFolderName } = pickup("body");

			const result = await userCreateDocumentFolderUsecase.execute({
				userId,
				documentFolderName,
			});

			return match({ result })
				.with(
					{ result: { information: "document-folder-already-exist" } },
					() => new ConflictHttpResponse("documentFolder.alreadyExists"),
				)
				.with(
					{ result: { information: "document-folder-max-quantity" } },
					() => new ConflictHttpResponse("documentFolder.maxQuantity"),
				)
				.with(
					{ result: P.instanceOf(DocumentFolderEntity) },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		makeResponseContract(ConflictHttpResponse, ["documentFolder.alreadyExists", "documentFolder.maxQuantity"]),
	)
	.handler(
		() => new OkHttpResponse("documentFolder.created"),
		makeResponseContract(OkHttpResponse, "documentFolder.created"),
	);

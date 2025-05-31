import { nodeSameRawDocumentIdObjecter, documentInFolderNameObjecter, DocumentInFolderEntity } from "@business/domains/entities/documentInFolder";
import { mustBeUserDocumentFolderExistProcess } from "@interfaces/http/processes/mustBeUserDocumentFolderExistProcess";
import { userCreateDocumentInFolderUsecase } from "@interfaces/usecase";
import { match, P } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/create-document-in-folder")
	.execute(
		mustBeUserDocumentFolderExistProcess,
		{ pickup: ["userDocumentFolder"] },
	)
	.extract({
		body: zod.object({
			nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.toZodSchema(),
			documentInFolderName: documentInFolderNameObjecter.toZodSchema(),
		}),
	})
	.cut(
		async({ pickup, dropper }) => {
			const { nodeSameRawDocumentId, documentInFolderName } = pickup("body");
			const { userDocumentFolder } = pickup(["userDocumentFolder"]);

			const result = await userCreateDocumentInFolderUsecase.execute({
				userDocumentFolder,
				nodeSameRawDocumentId,
				documentInFolderName,
			});

			return match({ result })
				.with(
					{ result: { information: "document-in-folder-already-exists" } },
					() => new ConflictHttpResponse("documentInFolder.alreadyExists"),
				)
				.with(
					{ result: { information: "document-in-folder-max-quantity" } },
					() => new ConflictHttpResponse("documentInFolder.maxQuantity"),
				)
				.with(
					{ result: P.instanceOf(DocumentInFolderEntity) },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		makeResponseContract(ConflictHttpResponse, ["documentInFolder.alreadyExists", "documentInFolder.maxQuantity"]),
	)
	.handler(
		() => new OkHttpResponse("documentInFolder.created"),
		makeResponseContract(OkHttpResponse, "documentInFolder.created"),
	);

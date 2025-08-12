import { DocumentFolderEntity, documentFolderNameObjecter } from "@business/domains/entities/documentFolder";
import { mustBeUserDocumentFolderExistProcess } from "@interfaces/http/processes/mustBeUserDocumentFolderExistProcess";
import { userRenameDocumentFolderUsecase } from "@interfaces/usecase";
import { match, P } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/rename-document-folder")
	.extract({
		body: zod.object({
			newDocumentFolderName: documentFolderNameObjecter.toZodSchema(),
		}),
	})
	.execute(
		mustBeUserDocumentFolderExistProcess,
		{ pickup: ["userDocumentFolder"] },
	)
	.cut(
		async({ pickup, dropper }) => {
			const { userDocumentFolder } = pickup(["userDocumentFolder"]);
			const { newDocumentFolderName } = pickup("body");

			const result = await userRenameDocumentFolderUsecase.execute({
				userDocumentFolder,
				newDocumentFolderName,
			});

			return match({ result })
				.with(
					{ result: { information: "document-folder-already-exist" } },
					() => new ConflictHttpResponse("documentFolder.alreadyExists"),
				)
				.with(
					{ result: P.instanceOf(DocumentFolderEntity) },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		makeResponseContract(ConflictHttpResponse, ["documentFolder.alreadyExists"]),
	)
	.handler(
		() => new OkHttpResponse("documentFolder.renamed"),
		makeResponseContract(OkHttpResponse, "documentFolder.renamed"),
	);

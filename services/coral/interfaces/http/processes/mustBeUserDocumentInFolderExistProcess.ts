import { userFindDocumentInFolderByUniqueCombinationUsecase } from "@interfaces/usecase";
import { match } from "ts-pattern";
import { mustBeUserDocumentFolderExistProcess } from "./mustBeUserDocumentFolderExistProcess";
import { nodeSameRawDocumentIdObjecter } from "@business/domains/entities/documentInFolder";

export const mustBeUserDocumentInFolderExistProcess = createProcess("mustBeUserDocumentInFolderExist")
	.execute(
		mustBeUserDocumentFolderExistProcess,
		{ pickup: ["userDocumentFolder"] },
	)
	.extract({
		body: {
			nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.toZodSchema(),
		},
	})
	.cut(
		async({ pickup, dropper }) => {
			const { userDocumentFolder, nodeSameRawDocumentId } = pickup(["userDocumentFolder", "nodeSameRawDocumentId"]);

			const result = await userFindDocumentInFolderByUniqueCombinationUsecase.execute({
				userDocumentFolder,
				nodeSameRawDocumentId,
			});

			return match({ result })
				.with(
					{ result: null },
					() => new NotFoundHttpResponse("documentInFolder.notfound"),
				)
				.with(
					{ result: { _name: "userDocumentInFolder" } },
					({ result: userDocumentInFolder }) => dropper({ userDocumentInFolder }),
				)
				.exhaustive();
		},
		["userDocumentInFolder"],
		makeResponseContract(NotFoundHttpResponse, "documentInFolder.notfound"),
	)
	.exportation(["userDocumentInFolder", "userDocumentFolder"]);

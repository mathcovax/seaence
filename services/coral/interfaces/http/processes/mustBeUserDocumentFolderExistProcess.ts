import { userIdObjecter } from "@business/domains/common/user";
import { documentFolderIdObjecter } from "@business/domains/entities/documentFolder";
import { userFindDocumentFolderByIdUsecase } from "@interfaces/usecase";
import { match } from "ts-pattern";

export const mustBeUserDocumentFolderExistProcess = createProcess("mustBeUserDocumentFolderExist")
	.extract({
		body: zod.object({
			documentFolderId: documentFolderIdObjecter.toZodSchema(),
			userId: userIdObjecter.toZodSchema(),
		}),
	})
	.cut(
		async({ pickup, dropper }) => {
			const { documentFolderId, userId } = pickup("body");

			const result = await userFindDocumentFolderByIdUsecase.execute({
				documentFolderId,
				userId,
			});

			return match({ result })
				.with(
					{ result: { information: "wrong-proprietary" } },
					() => new ForbiddenHttpResponse("documentFolder.wrongProprietary"),
				)
				.with(
					{ result: null },
					() => new NotFoundHttpResponse("documentFolder.notfound"),
				)
				.with(
					{ result: { _name: "userDocumentFolder" } },
					({ result: userDocumentFolder }) => dropper({ userDocumentFolder }),
				)
				.exhaustive();
		},
		["userDocumentFolder"],
		[
			...makeResponseContract(ForbiddenHttpResponse, "documentFolder.wrongProprietary"),
			...makeResponseContract(NotFoundHttpResponse, "documentFolder.notfound"),
		],
	)
	.exportation(["userDocumentFolder"]);

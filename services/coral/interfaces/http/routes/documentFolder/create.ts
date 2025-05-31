import { userIdObjecter } from "@business/domains/common/user";
import { documentFolderNameObjecter } from "@business/domains/entities/documentFolder";
import { createDocumentFolderUsecase } from "@interfaces/usecase";

useBuilder()
	.createRoute("POST", "/create-document-folder")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			title: documentFolderNameObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { userId, title } = pickup("body");

			await createDocumentFolderUsecase.execute({
				userId,
				title,
			});

			return new OkHttpResponse("documentFolder.created");
		},
		makeResponseContract(OkHttpResponse, "documentFolder.created"),
	);

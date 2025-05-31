import { userIdObjecter } from "@business/domains/common/user";
import { endpointGetCountSearchDocumentFolderRouteSchema, endpointSearchDocumentFolderRouteSchema } from "@interfaces/http/schemas/documentFolder";
import { userCountResultOfSearchDocumentFolderUsecase, userSearchDocumentFolderUsecase } from "@interfaces/usecase";
import { intObjecter, positiveIntObjecter, textObjecter } from "@vendors/clean";

useBuilder()
	.createRoute("POST", "/search-document-folders")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			partialDocumentFolderName: textObjecter.toZodSchema(),
			page: intObjecter.toZodSchema(),
			quantityPerPage: positiveIntObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { userId, partialDocumentFolderName, page, quantityPerPage } = pickup("body");

			const documentFolders = await userSearchDocumentFolderUsecase.execute({
				userId,
				partialDocumentFolderName,
				page,
				quantityPerPage,
			});

			const simpleDocumentFolders = documentFolders.map(
				(documentFolder) => documentFolder.toSimpleObject(),
			);

			return new OkHttpResponse("documentFolders.found", simpleDocumentFolders);
		},
		makeResponseContract(OkHttpResponse, "documentFolders.found", endpointSearchDocumentFolderRouteSchema),
	);

useBuilder()
	.createRoute("POST", "/get-search-document-folders-count")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			partialDocumentFolderName: textObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { userId, partialDocumentFolderName } = pickup("body");

			const numberOfDocumentFolders = await userCountResultOfSearchDocumentFolderUsecase.execute({
				userId,
				partialDocumentFolderName,
			});

			return new OkHttpResponse("documentFolders.searchDetails", { total: numberOfDocumentFolders.value });
		},
		makeResponseContract(OkHttpResponse, "documentFolders.searchDetails", endpointGetCountSearchDocumentFolderRouteSchema),
	);

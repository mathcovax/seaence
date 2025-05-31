import { userIdObjecter } from "@business/domains/common/user";
import { documentFolderTitleObjecter } from "@business/domains/entities/documentFolder";
import { endpointGetCountSearchDocumentFolderRouteSchema, endpointSearchDocumentFolderRouteSchema } from "@interfaces/http/schemas/documentFolder";
import { countResultOfFindDocumentFolderUsecase, searchDocumentFolderUsecase } from "@interfaces/usecase";
import { positiveIntObjecter } from "@vendors/clean";

useBuilder()
	.createRoute("POST", "/search-document-folders-per-page")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			partialTitleDocumentFolder: documentFolderTitleObjecter.toZodSchema(),
			page: positiveIntObjecter.toZodSchema(),
			quantityPerPage: positiveIntObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { userId, partialTitleDocumentFolder, page, quantityPerPage } = pickup("body");

			const documentFolders = await searchDocumentFolderUsecase.execute({
				userId,
				documentFolderTitle: partialTitleDocumentFolder,
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
	.createRoute("POST", "get-search-document-folders-count")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			partialTitleDocumentFolder: documentFolderTitleObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { userId, partialTitleDocumentFolder } = pickup("body");

			const numberOfDocumentFolders = await countResultOfFindDocumentFolderUsecase.execute({
				userId,
				documentFolderTitle: partialTitleDocumentFolder,
			});

			return new OkHttpResponse("documentFolders.searchDetails", numberOfDocumentFolders.value);
		},
		makeResponseContract(OkHttpResponse, "documentFolders.searchDetails", endpointGetCountSearchDocumentFolderRouteSchema),
	);

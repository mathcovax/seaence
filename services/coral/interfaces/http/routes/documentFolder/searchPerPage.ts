import { userIdObjecter } from "@business/domains/common/user";
import { documentFolderTitleObjecter } from "@business/domains/entities/documentFolder";
import { endpointGetDetailsSearchDocumentFolderRouteSchema, endpointSearchDocumentFolderRouteSchema } from "@interfaces/http/schemas/documentFolder";
import { getDetailsOfSearchDocumentFolderUsecase, searchDocumentFolderUsecase } from "@interfaces/usecase";
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
	.createRoute("POST", "get-search-document-folders-details")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			partialTitleDocumentFolder: documentFolderTitleObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { userId, partialTitleDocumentFolder } = pickup("body");

			const { numberOfDocumentFolders } = await getDetailsOfSearchDocumentFolderUsecase.execute({
				userId,
				documentFolderTitle: partialTitleDocumentFolder,
			});

			const result = {
				numberOfDocumentFolders: numberOfDocumentFolders.value,
			};

			return new OkHttpResponse("documentFolders.searchDetails", result);
		},
		makeResponseContract(OkHttpResponse, "documentFolders.searchDetails", endpointGetDetailsSearchDocumentFolderRouteSchema),
	);

import { userIdObjecter } from "@business/domains/common/user";
import { documentFolderTitleObjecter } from "@business/domains/entities/documentFolder";
import { endpointSearchDocumentFolderRouteSchema } from "@interfaces/http/schemas/documentFolder";
import { searchDocumentFolderUsecase } from "@interfaces/usecase";
import { positiveIntObjecter } from "@vendors/clean";

const rawDocumentFolderPerPage = 10;
const documentFolderPerPage = positiveIntObjecter.unsafeCreate(rawDocumentFolderPerPage);

useBuilder()
	.createRoute("POST", "/search-document-folders-per-page")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			partialTitleDocumentFolder: documentFolderTitleObjecter.toZodSchema(),
			page: positiveIntObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { userId, partialTitleDocumentFolder, page } = pickup("body");

			const { documentFolders, numberOfDocumentFolder } = await searchDocumentFolderUsecase.execute({
				userId,
				documentFolderTitle: partialTitleDocumentFolder,
				page,
				quantityPerPage: documentFolderPerPage,
			});

			const simpleDocumentFolders = documentFolders.map(
				(documentFolder) => documentFolder.toSimpleObject(),
			);

			const result = {
				documentFolders: simpleDocumentFolders,
				numberOfDocumentFolder: numberOfDocumentFolder.toSimpleObject(),
			};

			return new OkHttpResponse("documentFolders.found", result);
		},
		makeResponseContract(OkHttpResponse, "documentFolders.found", endpointSearchDocumentFolderRouteSchema),
	);

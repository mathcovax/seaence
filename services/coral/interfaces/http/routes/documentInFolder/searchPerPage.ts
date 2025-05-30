import { documentTitleObjecter } from "@business/domains/entities/documentInFolder";
import { mustBeProprietaryOfDocumentFolderRouteBuilder } from "@interfaces/http/process/mustBeProprietaryOfDocumentFolder";
import { endpointSearchDocumentInFolderRouteSchema } from "@interfaces/http/schemas/documentInFolder";
import { searchDocumentInFolderUsecase } from "@interfaces/usecase";
import { positiveIntObjecter } from "@vendors/clean";

mustBeProprietaryOfDocumentFolderRouteBuilder()
	.createRoute("POST", "/search-documents-in-folder-per-page")
	.extract({
		body: zod.object({
			partialTitleDocument: documentTitleObjecter.toZodSchema(),
			page: positiveIntObjecter.toZodSchema(),
			quantityPerPage: positiveIntObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const {
				body: { partialTitleDocument, page, quantityPerPage },
				documentFolder,
			} = pickup(["body", "documentFolder"]);

			const { documentsInFolder, numberOfDocumentInFolder } = await searchDocumentInFolderUsecase.execute({
				documentFolder,
				documentTitle: partialTitleDocument,
				page,
				quantityPerPage,
			});

			const simpleDocumentsInFolder = documentsInFolder.map(
				(documentInFolder) => documentInFolder.toSimpleObject(),
			);

			const result = {
				documentsInFolder: simpleDocumentsInFolder,
				numberOfDocumentInFolder: numberOfDocumentInFolder.value,
			};

			return new OkHttpResponse("documentsInFolder.found", result);
		},
		makeResponseContract(OkHttpResponse, "documentsInFolder.found", endpointSearchDocumentInFolderRouteSchema),
	);

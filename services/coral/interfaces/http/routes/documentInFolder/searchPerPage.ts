import { documentTitleObjecter } from "@business/domains/entities/documentInFolder";
import { mustBeProprietaryOfDocumentFolderRouteBuilder } from "@interfaces/http/process/mustBeProprietaryOfDocumentFolder";
import { endpointGetDetailsSearchDocumentInFolderRouteSchema, endpointSearchDocumentInFolderRouteSchema } from "@interfaces/http/schemas/documentInFolder";
import { getDetailsSearchDocumentInFolderUsecase, searchDocumentInFolderUsecase } from "@interfaces/usecase";
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

			const documentsInFolder = await searchDocumentInFolderUsecase.execute({
				documentFolder,
				documentTitle: partialTitleDocument,
				page,
				quantityPerPage,
			});

			const simpleDocumentsInFolder = documentsInFolder.map(
				(documentInFolder) => documentInFolder.toSimpleObject(),
			);

			return new OkHttpResponse("documentsInFolder.found", simpleDocumentsInFolder);
		},
		makeResponseContract(OkHttpResponse, "documentsInFolder.found", endpointSearchDocumentInFolderRouteSchema),
	);

mustBeProprietaryOfDocumentFolderRouteBuilder()
	.createRoute("POST", "/get-search-documents-in-folder-details")
	.extract({
		body: zod.object({
			partialTitleDocument: documentTitleObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const {
				body: { partialTitleDocument },
				documentFolder,
			} = pickup(["body", "documentFolder"]);

			const { numberOfDocumentsInFolder } = await getDetailsSearchDocumentInFolderUsecase.execute({
				documentFolder,
				documentTitle: partialTitleDocument,
			});

			const result = {
				numberOfDocumentsInFolder: numberOfDocumentsInFolder.value,
			};

			return new OkHttpResponse("documentsInFolder.searchDetails", result);
		},
		makeResponseContract(OkHttpResponse, "documentsInFolder.searchDetails", endpointGetDetailsSearchDocumentInFolderRouteSchema),
	);

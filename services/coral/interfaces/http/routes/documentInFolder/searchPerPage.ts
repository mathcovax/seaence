import { documentInFolderNameObjecter } from "@business/domains/entities/documentInFolder";
import { mustBeProprietaryOfDocumentFolderRouteBuilder } from "@interfaces/http/process/mustBeProprietaryOfDocumentFolder";
import { endpointGetCountSearchDocumentInFolderRouteSchema, endpointSearchDocumentInFolderRouteSchema } from "@interfaces/http/schemas/documentInFolder";
import { countResultOfFindDocumentInFolderUsecase, searchDocumentInFolderUsecase } from "@interfaces/usecase";
import { positiveIntObjecter } from "@vendors/clean";

mustBeProprietaryOfDocumentFolderRouteBuilder()
	.createRoute("POST", "/search-documents-in-folder")
	.extract({
		body: zod.object({
			partialNameDocument: documentInFolderNameObjecter.toZodSchema(),
			page: positiveIntObjecter.toZodSchema(),
			quantityPerPage: positiveIntObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const {
				body: { partialNameDocument, page, quantityPerPage },
				documentFolder,
			} = pickup(["body", "documentFolder"]);

			const documentsInFolder = await searchDocumentInFolderUsecase.execute({
				documentFolder,
				documentInFolderName: partialNameDocument,
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
	.createRoute("POST", "/get-search-documents-in-folder-count")
	.extract({
		body: zod.object({
			partialNameDocument: documentInFolderNameObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const {
				body: { partialNameDocument },
				documentFolder,
			} = pickup(["body", "documentFolder"]);

			const numberOfDocumentsInFolder = await countResultOfFindDocumentInFolderUsecase.execute({
				documentFolder,
				documentInFolderName: partialNameDocument,
			});

			return new OkHttpResponse("documentsInFolder.searchDetails", numberOfDocumentsInFolder.value);
		},
		makeResponseContract(OkHttpResponse, "documentsInFolder.searchDetails", endpointGetCountSearchDocumentInFolderRouteSchema),
	);

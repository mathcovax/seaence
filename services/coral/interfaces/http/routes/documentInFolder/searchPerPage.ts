import { mustBeUserDocumentFolderExistProcess } from "@interfaces/http/processes/mustBeUserDocumentFolderExistProcess";
import { endpointGetCountSearchDocumentInFolderRouteSchema, endpointSearchDocumentInFolderRouteSchema } from "@interfaces/http/schemas/documentInFolder";
import { userCountResultOfSearchDocumentInFolderUsecase, userSearchDocumentInFolderUsecase } from "@interfaces/usecase";
import { intObjecter, positiveIntObjecter, textObjecter } from "@vendors/clean";

useBuilder()
	.createRoute("POST", "/search-documents-in-folder")
	.execute(
		mustBeUserDocumentFolderExistProcess,
		{ pickup: ["userDocumentFolder"] },
	)
	.extract({
		body: zod.object({
			partialDocumentInFolderName: textObjecter.toZodSchema(),
			page: intObjecter.toZodSchema(),
			quantityPerPage: positiveIntObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { partialDocumentInFolderName, page, quantityPerPage } = pickup("body");
			const { userDocumentFolder } = pickup(["userDocumentFolder"]);

			const documentsInFolder = await userSearchDocumentInFolderUsecase.execute({
				userDocumentFolder,
				partialDocumentInFolderName,
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

useBuilder()
	.createRoute("POST", "/get-search-documents-in-folder-count")
	.execute(
		mustBeUserDocumentFolderExistProcess,
		{ pickup: ["userDocumentFolder"] },
	)
	.extract({
		body: {
			partialDocumentInFolderName: textObjecter.toZodSchema(),
		},
	})
	.handler(
		async(pickup) => {
			const {
				userDocumentFolder,
				partialDocumentInFolderName,
			} = pickup(["userDocumentFolder", "partialDocumentInFolderName"]);

			const numberOfDocumentsInFolder = await userCountResultOfSearchDocumentInFolderUsecase.execute({
				userDocumentFolder,
				partialDocumentInFolderName,
			});

			return new OkHttpResponse("documentsInFolder.searchDetails", { total: numberOfDocumentsInFolder.value });
		},
		makeResponseContract(OkHttpResponse, "documentsInFolder.searchDetails", endpointGetCountSearchDocumentInFolderRouteSchema),
	);

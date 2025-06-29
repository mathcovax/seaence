import { userIdObjecter } from "@business/domains/common/user";
import { nodeSameRawDocumentIdObjecter } from "@business/domains/entities/documentInFolder";
import { endpointFindManyDocumentFolderDetailsRouteSchema, endpointFindManyDocumentFolderRouteSchema, endpointFindManyDocumentInWichDocumentExistDetailsRouteSchema, endpointFindManyDocumentInWichDocumentExistRouteSchema } from "@interfaces/http/schemas/documentFolder";
import { countResultOfFindManyDocumentFolderInWichDocumentExistUsecase, findManyDocumentFolderInWichDocumentExistUsecase, userCountResultOfSearchDocumentFolderUsecase, userSearchDocumentFolderUsecase } from "@interfaces/usecase";
import { intObjecter, positiveIntObjecter, textObjecter } from "@vendors/clean";

useBuilder()
	.createRoute("POST", "/find-many-document-folder")
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
		makeResponseContract(OkHttpResponse, "documentFolders.found", endpointFindManyDocumentFolderRouteSchema),
	);

useBuilder()
	.createRoute("POST", "/find-many-document-folders-details")
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

			return new OkHttpResponse("documentFolders.foundDetails", { total: numberOfDocumentFolders.value });
		},
		makeResponseContract(OkHttpResponse, "documentFolders.foundDetails", endpointFindManyDocumentFolderDetailsRouteSchema),
	);

useBuilder()
	.createRoute("POST", "/find-many-document-folders-in-which-document-exist")
	.extract({
		body: zod.object({
			page: intObjecter.toZodSchema(),
			quantityPerPage: positiveIntObjecter.toZodSchema(),
			partialDocumentFolderName: textObjecter.toZodSchema(),
			userId: userIdObjecter.toZodSchema(),
			nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { page, quantityPerPage, partialDocumentFolderName, userId, nodeSameRawDocumentId } = pickup("body");

			const documentFolders = await findManyDocumentFolderInWichDocumentExistUsecase
				.execute({
					page,
					quantityPerPage,
					nodeSameRawDocumentId,
					userId,
					partialDocumentFolderName,
				});

			const simpleDocumentFolders = documentFolders.map(
				(documentFolder) => documentFolder.toSimpleObject(),
			);

			return new OkHttpResponse("documentFolders.found", simpleDocumentFolders);
		},
		makeResponseContract(OkHttpResponse, "documentFolders.found", endpointFindManyDocumentInWichDocumentExistRouteSchema),
	);

useBuilder()
	.createRoute("POST", "/find-many-document-folders-in-which-document-exist-details")
	.extract({
		body: zod.object({
			partialDocumentFolderName: textObjecter.toZodSchema(),
			userId: userIdObjecter.toZodSchema(),
			nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { partialDocumentFolderName, userId, nodeSameRawDocumentId } = pickup("body");

			const numberOfDocumentFolders = await countResultOfFindManyDocumentFolderInWichDocumentExistUsecase
				.execute({
					nodeSameRawDocumentId,
					userId,
					partialDocumentFolderName,
				});

			return new OkHttpResponse("documentFolders.foundDetails", { total: numberOfDocumentFolders.value });
		},
		makeResponseContract(OkHttpResponse, "documentFolders.foundDetails", endpointFindManyDocumentInWichDocumentExistDetailsRouteSchema),
	);

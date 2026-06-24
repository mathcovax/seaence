import { DocumentFolder } from "@business/entities/documentFolder";
import { A, D, O } from "@duplojs/utils";
import { documentFolderConfig } from "@interfaces/configs/documentFolder";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";
import { CoralProvider } from "@interfaces/providers/coral";
import { documentFolderRules } from "@vendors/entity-rules";

useMustBeConnectedBuilder()
	.createRoute("POST", "/find-many-document-folder")
	.extract({
		body: zod.object({
			partialDocumentFolderName: zod
				.string()
				.max(documentFolderRules.name.maxLength),
			page: zod.number().min(
				documentFolderConfig.findMany.pageOffset,
			),
		}),
	})
	.handler(
		async(pickup) => {
			const {
				user,
				body: { partialDocumentFolderName, page },
			} = pickup(["body", "user"]);

			const result = await CoralProvider.findManyDocumentFolder({
				userId: user.id,
				quantityPerPage: documentFolderConfig.findMany.quantityPerPage,
				partialDocumentFolderName,
				page: page - documentFolderConfig.findMany.pageOffset,
			});

			return new OkHttpResponse(
				"documentFolders.found",
				// theDate translation
				A.map(
					result.body,
					O.transformProperty(
						"createdAt",
						D.toISOString,
					),
				),
			);
		},
		makeResponseContract(OkHttpResponse, "documentFolders.found", DocumentFolder.list),
	);

useMustBeConnectedBuilder()
	.createRoute("POST", "/find-many-document-folder-details")
	.extract({
		body: zod.object({
			partialDocumentFolderName: zod
				.string()
				.max(documentFolderRules.name.maxLength),
		}),
	})
	.handler(
		async(pickup) => {
			const {
				user,
				body: { partialDocumentFolderName },
			} = pickup(["body", "user"]);

			const result = await CoralProvider.findManyDocumentFolderDetails({
				userId: user.id,
				partialDocumentFolderName,
			});

			return new OkHttpResponse(
				"documentFolders.foundDetails",
				{
					total: result.body.total,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "documentFolders.foundDetails", DocumentFolder.details),
	);

useMustBeConnectedBuilder()
	.createRoute("POST", "/find-many-document-folders-in-which-document-exist")
	.extract({
		body: zod.object({
			nodeSameRawDocumentId: zod.string(),
			partialDocumentFolderName: zod
				.string()
				.max(documentFolderRules.name.maxLength)
				.default(""),
			page: zod.number().min(
				documentFolderConfig.findManyInWhichDocumentExist.pageOffset,
			),
		}),
	})
	.handler(
		async(pickup) => {
			const {
				user,
				body: { nodeSameRawDocumentId, partialDocumentFolderName, page },
			} = pickup(["user", "body"]);

			const result = await CoralProvider.findManyDocumentFoldersInWhichDocumentExist({
				userId: user.id,
				nodeSameRawDocumentId,
				partialDocumentFolderName,
				page: page - documentFolderConfig.findManyInWhichDocumentExist.pageOffset,
				quantityPerPage: documentFolderConfig.findManyInWhichDocumentExist.quantityPerPage,
			});

			return new OkHttpResponse(
				"documentFolders.found",
				// theDate translation
				A.map(
					result.body,
					O.transformProperty(
						"createdAt",
						D.toISOString,
					),
				),
			);
		},
		makeResponseContract(OkHttpResponse, "documentFolders.found", DocumentFolder.list),
	);

useMustBeConnectedBuilder()
	.createRoute("POST", "/find-many-document-folders-in-which-document-exist-details")
	.extract({
		body: zod.object({
			nodeSameRawDocumentId: zod.string(),
			partialDocumentFolderName: zod
				.string()
				.max(documentFolderRules.name.maxLength)
				.default(""),
		}),
	})
	.handler(
		async(pickup) => {
			const {
				user,
				body: { nodeSameRawDocumentId, partialDocumentFolderName },
			} = pickup(["user", "body"]);

			const result = await CoralProvider.findManyDocumentFoldersInWhichDocumentExistDetails({
				userId: user.id,
				nodeSameRawDocumentId,
				partialDocumentFolderName,
			});

			return new OkHttpResponse(
				"documentFolders.foundDetails",
				{
					total: result.body.total,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "documentFolders.foundDetails", DocumentFolder.details),
	);

import { DocumentFolder } from "@business/entities/documentFolder";
import { documentFolderConfig } from "@interfaces/configs/documentFolder";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/mustBeConnected";
import { CoralAPI } from "@interfaces/providers/coral";
import { documentFolderRules } from "@vendors/entity-rules";

useMustBeConnectedBuilder()
	.createRoute("POST", "/find-many-document-folders")
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

			const { body: list } = await CoralAPI.findManyDocumentFolder({
				userId: user.id,
				quantityPerPage: documentFolderConfig.findMany.quantityPerPage,
				partialDocumentFolderName,
				page,
			});

			const { body: { total } } = await CoralAPI.getfindManyDocumentFolderCount({
				userId: user.id,
				partialDocumentFolderName,
			});

			return new OkHttpResponse(
				"documentFolders.found",
				{
					list,
					total,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "documentFolders.found", DocumentFolder.list),
	);


import { iWantNodeSameRawDocumentExist } from "@interfaces/http/checkers/nodeSameRawDocument";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";
import { CoralAPI } from "@interfaces/providers/coral";
import { documentInFolderRules } from "@vendors/entity-rules";

useMustBeConnectedBuilder()
	.createRoute("POST", "/create-many-document-in-folder")
	.extract({
		body: zod.object({
			documentFolderIds: zod.string().array(),
			nodeSameRawDocumentId: zod.string(),
			documentInFolderName: zod
				.string()
				.min(documentInFolderRules.name.minLength)
				.max(documentInFolderRules.name.maxLength),
		}),
	})
	.presetCheck(
		iWantNodeSameRawDocumentExist,
		(pickup) => pickup("body").nodeSameRawDocumentId,
	)
	.handler(
		async(pickup) => {
			const {
				user,
				body: { nodeSameRawDocumentId, documentInFolderName, documentFolderIds },
			} = pickup(["body", "user"]);

			await CoralAPI.createManyDocumentInFolder({
				userId: user.id,
				documentFolderIds,
				documentInFolderName,
				nodeSameRawDocumentId,
			});

			return new OkHttpResponse("documentInFolder.created");
		},
		makeResponseContract(OkHttpResponse, "documentInFolder.created"),
	);

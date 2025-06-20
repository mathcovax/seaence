import { iWantDocumentFolderExist } from "@interfaces/http/checkers/documentFolder";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/mustBeConnected";
import { CoralAPI } from "@interfaces/providers/coral";
import { documentInFolderRules } from "@vendors/entity-rules";
import { match } from "ts-pattern";

useMustBeConnectedBuilder()
	.createRoute("POST", "/add-document-in-folder")
	.extract({
		body: zod.object({
			documentFolderId: zod.string(),
			nodeSameRawDocumentId: zod.string(),
			documentInFolderName: zod
				.string()
				.min(documentInFolderRules.name.minLength)
				.max(documentInFolderRules.name.maxLength),
		}),
	})
	.presetCheck(
		iWantDocumentFolderExist,
		(pickup) => ({
			userId: pickup("user").id,
			documentFolderId: pickup("body").documentFolderId,
		}),
	)
	.cut(
		async({ pickup, dropper }) => {
			const {
				user,
				documentFolder,
				body: { nodeSameRawDocumentId, documentInFolderName },
			} = pickup(["body", "documentFolder", "user"]);

			const result = await CoralAPI.addDocumentInFolder({
				userId: user.id,
				documentFolderId: documentFolder.id,
				documentInFolderName,
				nodeSameRawDocumentId,
			});

			return match(result)
				.with(
					{ information: "documentInFolder.created" },
					() => dropper(null),
				)
				.with(
					{ information: "documentInFolder.alreadyExists" },
					() => new ConflictHttpResponse("documentInFolder.alreadyExists"),
				)
				.with(
					{ information: "documentInFolder.maxQuantity" },
					() => new UnprocessableEntityHttpResponse("documentInFolder.maxQuantity"),
				)
				.exhaustive();
		},
		[],
		[
			...makeResponseContract(ConflictHttpResponse, "documentInFolder.alreadyExists"),
			...makeResponseContract(UnprocessableEntityHttpResponse, "documentInFolder.maxQuantity"),
		],
	)
	.handler(
		() => new OkHttpResponse("documentInFolder.created"),
		makeResponseContract(OkHttpResponse, "documentInFolder.created"),
	);

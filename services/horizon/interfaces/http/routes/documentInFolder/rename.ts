import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";
import { CoralProvider } from "@interfaces/providers/coral";
import { documentInFolderRules } from "@vendors/entity-rules";
import { match } from "ts-pattern";

useMustBeConnectedBuilder()
	.createRoute("POST", "/rename-document-in-folder")
	.extract({
		body: zod.object({
			documentFolderId: zod.string(),
			nodeSameRawDocumentId: zod.string(),
			newDocumentInFolderName: zod
				.string()
				.min(documentInFolderRules.name.minLength)
				.max(documentInFolderRules.name.maxLength),
		}),
	})
	.handler(
		async(pickup) => {
			const { user, body: { documentFolderId, nodeSameRawDocumentId, newDocumentInFolderName } } = pickup(["body", "user"]);

			const result = await CoralProvider.renameDocumentInFolder({
				userId: user.id,
				documentFolderId,
				nodeSameRawDocumentId,
				newDocumentInFolderName,
			});

			return match(result)
				.with(
					{ information: "documentFolder.notfound" },
					() => new NotFoundHttpResponse("documentFolder.notfound"),
				)
				.with(
					{ information: "documentFolder.wrongProprietary" },
					() => new ForbiddenHttpResponse("documentFolder.wrongProprietary"),
				)
				.with(
					{ information: "documentInFolder.notfound" },
					() => new NotFoundHttpResponse("documentInFolder.notfound"),
				)
				.with(
					{ information: "documentInFolder.renamed" },
					() => new OkHttpResponse("documentInFolder.renamed"),
				)
				.exhaustive();
		},
		[
			...makeResponseContract(NotFoundHttpResponse, "documentFolder.notfound"),
			...makeResponseContract(ForbiddenHttpResponse, "documentFolder.wrongProprietary"),
			...makeResponseContract(NotFoundHttpResponse, "documentInFolder.notfound"),
			...makeResponseContract(OkHttpResponse, "documentInFolder.renamed"),
		],
	);

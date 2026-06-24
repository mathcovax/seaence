import { asyncPipe, O, when } from "@duplojs/utils";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";
import { CoralProvider } from "@interfaces/providers/coral";
import { documentFolderRules } from "@vendors/entity-rules";

useMustBeConnectedBuilder()
	.createRoute("POST", "/rename-document-folder")
	.extract({
		body: zod.object({
			documentFolderId: zod.string(),
			newDocumentFolderName: zod
				.string()
				.min(documentFolderRules.name.minLength)
				.max(documentFolderRules.name.maxLength),
		}),
	})
	.handler(
		async(pickup) => asyncPipe(
			pickup(["body", "user"]),
			(
				{ user, body: { documentFolderId, newDocumentFolderName } },
			) => CoralProvider.renameDocumentFolder({
				userId: user.id,
				documentFolderId,
				newDocumentFolderName,
			}),
			when(
				O.discriminate("information", "documentFolder.notfound"),
				() => new NotFoundHttpResponse("documentFolder.notfound"),
			),
			when(
				O.discriminate("information", "documentFolder.wrongProprietary"),
				() => new ForbiddenHttpResponse("documentFolder.wrongProprietary"),
			),
			when(
				O.discriminate("information", "documentFolder.alreadyExists"),
				() => new ConflictHttpResponse("documentFolder.alreadyExists"),
			),
			when(
				O.discriminate("information", "documentFolder.renamed"),
				() => new NoContentHttpResponse("documentFolder.renamed"),
			),
		),
		[
			...makeResponseContract(NotFoundHttpResponse, "documentFolder.notfound"),
			...makeResponseContract(ConflictHttpResponse, "documentFolder.alreadyExists"),
			...makeResponseContract(ForbiddenHttpResponse, "documentFolder.wrongProprietary"),
			...makeResponseContract(NoContentHttpResponse, "documentFolder.renamed"),
		],
	);

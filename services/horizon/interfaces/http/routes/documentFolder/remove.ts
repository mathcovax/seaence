import { asyncPipe, O, when } from "@duplojs/utils";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";
import { CoralProvider } from "@interfaces/providers/coral";

useMustBeConnectedBuilder()
	.createRoute("POST", "/remove-document-folder")
	.extract({
		body: zod.object({
			documentFolderId: zod.string(),
		}),
	})
	.handler(
		async(pickup) => asyncPipe(
			pickup(["body", "user"]),
			({ user, body }) => CoralProvider.removeDocumentFolder({
				userId: user.id,
				documentFolderId: body.documentFolderId,
			}),
			when(
				O.discriminate("information", "documentFolder.notfound"),
				() => new NotFoundHttpResponse("documentFolder.notfound"),
			),
			when(
				O.discriminate("information", "documentFolder.removed"),
				() => new NoContentHttpResponse("documentFolder.removed"),
			),
		),
		[
			...makeResponseContract(NotFoundHttpResponse, "documentFolder.notfound"),
			...makeResponseContract(NoContentHttpResponse, "documentFolder.removed"),
		],
	);

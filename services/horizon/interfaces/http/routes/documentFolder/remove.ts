import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";
import { CoralAPI } from "@interfaces/providers/coral";
import { match } from "ts-pattern";

useMustBeConnectedBuilder()
	.createRoute("POST", "/remove-document-folder")
	.extract({
		body: zod.object({
			documentFolderId: zod.string(),
		}),
	})
	.cut(
		async({ pickup, dropper }) => {
			const { user, body: { documentFolderId } } = pickup(["body", "user"]);

			const result = await CoralAPI.removeDocumentFolder({
				userId: user.id,
				documentFolderId,
			});

			return match(result)
				.with(
					{ information: "documentFolder.notfound" },
					() => new NotFoundHttpResponse("documentFolder.notfound"),
				)
				.with(
					{ information: "documentFolder.removed" },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		makeResponseContract(NotFoundHttpResponse, "documentFolder.notfound"),
	)
	.handler(
		() => new NoContentHttpResponse("documentFolder.removed"),
		makeResponseContract(NoContentHttpResponse, "documentFolder.removed"),
	);

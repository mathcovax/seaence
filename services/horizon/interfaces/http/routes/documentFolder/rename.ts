import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";
import { CoralAPI } from "@interfaces/providers/coral";
import { documentFolderRules } from "@vendors/entity-rules";
import { match } from "ts-pattern";

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
	.cut(
		async({ pickup, dropper }) => {
			const { user, body: { documentFolderId, newDocumentFolderName } } = pickup(["body", "user"]);

			const result = await CoralAPI.renameDocumentFolder({
				userId: user.id,
				documentFolderId,
				newDocumentFolderName,
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
					{ information: "documentFolder.alreadyExists" },
					() => new ConflictHttpResponse("documentFolder.alreadyExists"),
				)
				.with(
					{ information: "documentFolder.renamed" },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		[
			...makeResponseContract(NotFoundHttpResponse, "documentFolder.notfound"),
			...makeResponseContract(ConflictHttpResponse, "documentFolder.alreadyExists"),
			...makeResponseContract(ForbiddenHttpResponse, "documentFolder.wrongProprietary"),
		],
	)
	.handler(
		() => new OkHttpResponse("documentFolder.renamed"),
		makeResponseContract(OkHttpResponse, "documentFolder.renamed"),
	);

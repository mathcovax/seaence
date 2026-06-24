import { asyncPipe, O, when } from "@duplojs/utils";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";
import { CoralProvider } from "@interfaces/providers/coral";
import { documentFolderRules } from "@vendors/entity-rules";

useMustBeConnectedBuilder()
	.createRoute("POST", "/create-document-folder")
	.extract({
		body: zod.object({
			documentFolderName: zod
				.string()
				.min(documentFolderRules.name.minLength)
				.max(documentFolderRules.name.maxLength),
		}),
	})
	.handler(
		async(pickup) => asyncPipe(
			pickup(["user", "body"]),
			({
				user,
				body: { documentFolderName },
			}) => CoralProvider.createDocumentFolder({
				userId: user.id,
				documentFolderName,
			}),
			when(
				O.discriminate("information", "documentFolder.alreadyExists"),
				() => new ConflictHttpResponse("documentFolder.alreadyExists"),
			),
			when(
				O.discriminate("information", "documentFolder.maxQuantity"),
				() => new ForbiddenHttpResponse("documentFolder.maxQuantity"),
			),
			when(
				O.discriminate("information", "documentFolder.created"),
				() => new CreatedHttpResponse("documentFolder.created"),
			),
		),
		[
			...makeResponseContract(ConflictHttpResponse, "documentFolder.alreadyExists"),
			...makeResponseContract(ForbiddenHttpResponse, "documentFolder.maxQuantity"),
			...makeResponseContract(CreatedHttpResponse, "documentFolder.created"),
		],
	);

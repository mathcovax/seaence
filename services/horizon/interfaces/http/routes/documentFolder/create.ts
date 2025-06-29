import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";
import { CoralAPI } from "@interfaces/providers/coral";
import { documentFolderRules } from "@vendors/entity-rules";
import { match } from "ts-pattern";

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
	.cut(
		async({ pickup, dropper }) => {
			const { user, body: { documentFolderName } } = pickup(["user", "body"]);

			const result = await CoralAPI.createDocumentFolder({
				userId: user.id,
				documentFolderName: documentFolderName,
			});

			return match(result)
				.with(
					{ information: "documentFolder.alreadyExists" },
					() => new ConflictHttpResponse("documentFolder.alreadyExists"),
				)
				.with(
					{ information: "documentFolder.maxQuantity" },
					() => new ForbiddenHttpResponse("documentFolder.maxQuantity"),
				)
				.with(
					{ information: "documentFolder.created" },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		[
			...makeResponseContract(ConflictHttpResponse, "documentFolder.alreadyExists"),
			...makeResponseContract(ForbiddenHttpResponse, "documentFolder.maxQuantity"),
		],
	)
	.handler(
		() => new CreatedHttpResponse("documentFolder.created"),
		makeResponseContract(CreatedHttpResponse, "documentFolder.created"),
	);

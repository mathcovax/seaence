import { DocumentInFolder } from "@business/entities/documentInFolder";
import { documentInFolderConfig } from "@interfaces/configs/documentInFolder";
import { iWantNodeSameRawDocumentExist } from "@interfaces/http/checkers/nodeSameRawDocument";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";
import { CoralProvider } from "@interfaces/providers/coral";
import { documentInFolderRules } from "@vendors/entity-rules";
import { match } from "ts-pattern";

useMustBeConnectedBuilder()
	.createRoute("POST", "/create-many-document-in-folder")
	.extract({
		body: zod.object({
			documentFolderIds: zod
				.string()
				.array()
				.max(documentInFolderConfig.maxCreateManyInSameTime),
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

			const response = await CoralProvider.createManyDocumentInFolder({
				userId: user.id,
				documentFolderIds,
				documentInFolderName,
				nodeSameRawDocumentId,
			});

			return match(response)
				.with(
					{ information: "documentFolder.noneFound" },
					() => new NotFoundHttpResponse("documentFolder.noneFound"),
				)
				.with(
					{ information: "documentFolder.noneCapacity" },
					() => new ForbiddenHttpResponse("documentFolder.noneCapacity"),
				)
				.with(
					{ information: "documentInFolder.created" },
					(response) => new OkHttpResponse("documentInFolder.created", response.body),
				)
				.exhaustive();
		},
		[
			...makeResponseContract(NotFoundHttpResponse, "documentFolder.noneFound"),
			...makeResponseContract(ForbiddenHttpResponse, "documentFolder.noneCapacity"),
			...makeResponseContract(OkHttpResponse, "documentInFolder.created", DocumentInFolder.createManyResult),
		],
	);

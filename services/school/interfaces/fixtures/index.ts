/* eslint-disable @typescript-eslint/no-magic-numbers */
import "@providers/mongo";
import { SC } from "@duplojs/server-utils";
import { A, asyncPipe, DPE, E, O, promiseAll } from "@duplojs/utils";
import { uuidv7 } from "uuidv7";
import { faker, repeater } from "@lib/fixture";
import { Post } from "@domains/entities/post";
import { Answer } from "@domains/entities/answer";
import { UserId, UserName } from "@domains/common/user";
import { useCases } from "@adapters/useCases";

await SC.exec(
	{
		displayName: "School Fixtures",
		options: [
			SC.createOption(
				"nodeSameRawDocumentId",
				Post.NodeSameRawDocumentId,
				{
					aliases: ["-d"],
					description: "document ID",
					required: true,
				},
			),
			SC.createOption(
				"numberOfPost",
				DPE.int().min(0),
				{
					aliases: ["-np"],
					description: "number of posts",
					required: true,
				},
			),
			SC.createOption(
				"numberOfAnswerPerPost",
				DPE.int().min(0),
				{
					aliases: ["-na"],
					description: "number of answers per post",
					required: true,
				},
			),
		],
	},
	async({ options }) => {
		await asyncPipe(
			repeater(
				options.numberOfPost,
				async() => useCases.createPostUseCase(
					{
						nodeSameRawDocumentId: Post.NodeSameRawDocumentId
							.createOrThrow(options.nodeSameRawDocumentId),
						authorId: UserId.createOrThrow(uuidv7()),
						authorName: UserName.createOrThrow(
							faker.internet.displayName(),
						),
						content: Post.Content.createOrThrow(
							faker.lorem.paragraphs({
								min: 1,
								max: 2,
							}),
						),
						topic: Post.Topic.createOrThrow(
							faker.lorem.sentence({
								min: 1,
								max: 2,
							}),
						),
					},
				).then(O.getProperty("post")),
			),
			A.map(
				(post) => repeater(
					options.numberOfAnswerPerPost,
					() => asyncPipe(
						{
							post,
							authorId: UserId.createOrThrow(uuidv7()),
							authorName: UserName.createOrThrow(
								faker.internet.displayName(),
							),
							content: Answer.Content.createOrThrow(
								faker.lorem.paragraphs({
									min: 1,
									max: 2,
								}),
							),
						},
						useCases.replyToPostUseCase,
						E.unwrapByInformationOrThrow("reply-post"),
					),
				),
			),
			promiseAll,
		);
	},
);

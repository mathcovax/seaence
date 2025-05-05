import { program } from "commander";
import { zod } from "@duplojs/core";
import { mongo } from "@interfaces/providers/mongo";
import { mapAsync, repeater } from "@vendors/fixture";
import "../repositories";
import { makeAnswer } from "./entities/answer";
import { makePost } from "./entities/post";

const numberOf = Object.freeze({
	posts: 10,
	answers: 100,
});

const optionsSchema = zod.object({
	nodeSameRawDocumentId: zod.string(),
	numberOfPost: zod.coerce
		.number()
		.int()
		.positive()
		.default(numberOf.posts),
	numberOfAnswersPerPost: zod.coerce
		.number()
		.int()
		.positive()
		.default(numberOf.answers),
});

program
	.requiredOption(
		"-d , --nodeSameRawDocumentId <string>",
	)
	.option(
		"-p, --numberOfPost <number>",
		"Nombre de posts à générer",
		"10",
	)
	.option(
		"-a, --numberOfAnswersPerPost <number>",
		"Nombre de réponses par post",
		"100",
	);

program.parse();

const rawOptions = program.opts();
const { nodeSameRawDocumentId, numberOfPost, numberOfAnswersPerPost } = optionsSchema.parse(rawOptions);

const posts = await repeater(
	numberOfPost,
	() => makePost({
		answerCount: numberOfAnswersPerPost,
		nodeSameRawDocumentId,
	}),
);

await mapAsync(
	posts,
	(post) => repeater(
		numberOfAnswersPerPost,
		() => makeAnswer({
			postId: post.id.toSimpleObject(),
		}),
	),
);

await mongo.client.close();

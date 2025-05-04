import { program } from "commander";
import { zod } from "@duplojs/core";
import { mongo } from "@interfaces/providers/mongo";
import { mapAsync, repeater } from "@vendors/fixture";
import "../repositories";
import { makeAnswer } from "./entities/answer";
import { makePost } from "./entities/post";

const numberOf = Object.freeze({
	posts: 100,
	answers: 10,
});

const optionsSchema = zod.object({
	nodeDocumentId: zod.string(),
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
		"-d , --nodeDocumentId <string>",
	)
	.option(
		"-p, --numberOfPost <number>",
		"Nombre de posts à générer",
		"100",
	)
	.option(
		"-a, --numberOfAnswersPerPost <number>",
		"Nombre de réponses par post",
		"10",
	);

program.parse();

const rawOptions = program.opts();
const { nodeDocumentId, numberOfPost, numberOfAnswersPerPost } = optionsSchema.parse(rawOptions);

const posts = await repeater(
	numberOfPost,
	() => makePost({
		answerCount: numberOfAnswersPerPost,
		nodeDocumentId,
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

import { answerRepository } from "@business/applications/repositories/answer";
import { AnswerEntity, answerIdObjecter } from "@business/domains/entities/answer";
import { postAnswerCountObjecter } from "@business/domains/entities/post";
import { UserEntity } from "@business/domains/entities/user";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler } from "@vendors/clean";
import { uuidv7 } from "uuidv7";

const zero = 0;
const defaultMaxWorld = 50;

function summarizeText(
	text: string,
	maxWords = defaultMaxWorld,
) {
	if (!text) {
		return "";
	}

	const words = text.trim().split(/\s+/);

	if (words.length <= maxWords) {
		return text;
	}

	const truncatedWords = words.slice(zero, maxWords);
	return `${truncatedWords.join(" ")}...`;
}

answerRepository.default = {
	generateAnswerId() {
		return answerIdObjecter.unsafeCreate(uuidv7());
	},
	async findByPostId(postId, { quantityPerPage, page }) {
		return mongo.answerCollection.find(
			{ postId: postId.value },
		)
			.sort(
				{
					createdAt: -1,
				},
			)
			.skip(page.value * quantityPerPage.value)
			.limit(quantityPerPage.value)
			.map(
				(mongoAnswer) => EntityHandler.unsafeMapper(
					AnswerEntity,
					{
						...mongoAnswer,
						author: EntityHandler.unsafeMapper(
							UserEntity,
							mongoAnswer.author,
						),
					},
				),
			)
			.toArray();
	},
	async getCountByPostId(postId) {
		const mongoAnswerCount = await mongo.answerCollection.countDocuments({
			postId: postId.value,
		});
		return postAnswerCountObjecter.unsafeCreate(mongoAnswerCount);
	},
	async save(entity) {
		const simpleEntity = entity.toSimpleObject();

		const mongoAnswer = await mongo.answerCollection.findOne({
			id: simpleEntity.id,
		});

		await mongo.answerCollection.updateOne(
			{
				id: simpleEntity.id,
			},
			{
				$set: simpleEntity,
			},
			{ upsert: true },
		);

		if (!mongoAnswer) {
			await asyncMessage.collections.createReplyToPost.emit({
				postId: simpleEntity.postId,
				usernameOfReplyPost: simpleEntity.author.username,
				summaryOfReplyPost: summarizeText(simpleEntity.content),
			});
		}

		return entity;
	},
	async *findByAuthorId(userId) {
		const startPage = 0;
		const quantityPerPage = 10;

		for (let page = startPage; true; page++) {
			const answers = await mongo.answerCollection.find(
				{ "author.id": userId.value },
			)
				.skip(page * quantityPerPage)
				.limit(quantityPerPage)
				.map(
					(mongoAnswer) => EntityHandler.unsafeMapper(
						AnswerEntity,
						{
							...mongoAnswer,
							author: EntityHandler.unsafeMapper(
								UserEntity,
								mongoAnswer.author,
							),
						},
					),
				)
				.toArray();

			if (!answers.length) {
				break;
			}

			for (const answer of answers) {
				yield answer;
			}
		}
	},
};

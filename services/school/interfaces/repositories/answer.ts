import { answerRepository } from "@business/applications/repositories/answer";
import { AnswerEntity, answerIdObjecter } from "@business/domains/entities/answer";
import { postAnswerCountObjecter } from "@business/domains/entities/post";
import { UserEntity } from "@business/domains/entities/user";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler } from "@vendors/clean";
import { uuidv7 } from "uuidv7";

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
	async save(answer) {
		const mongoAnswer = answer.toSimpleObject();

		await mongo.answerCollection.updateOne(
			{
				id: mongoAnswer.id,
			},
			{
				$set: mongoAnswer,
			},
			{ upsert: true },
		);

		return answer;
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

import { answerRepository } from "@business/applications/repositories/answer";
import { AnswerEntity, answerIdObjecter } from "@business/domains/entities/answer";
import { UserEntity } from "@business/domains/entities/user";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler } from "@vendors/clean";
import { uuidv7 } from "uuidv7";

answerRepository.default = {
	generateAnswerId() {
		return answerIdObjecter.unsafeCreate(uuidv7());
	},
	async findByPostId(postId, { quantityPerPage, page }) {
		const mongoAnswers = mongo.answerCollection.find(
			{ postId: postId.value },
		);

		return mongoAnswers
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
};

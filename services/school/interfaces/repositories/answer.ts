import { answerRepository } from "@business/applications/repositories/answer";
import { AnswerEntity, answerIdObjecter } from "@business/domains/entities/answer";
import { postAnswerCountObjecter } from "@business/domains/entities/post";
import { asyncMessage } from "@interfaces/providers/asyncMessage";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, intObjecter } from "@vendors/clean";
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

		if (!mongoAnswer) {
			await asyncMessage.collections.createAnswer.emit(simpleEntity);
		}

		await mongo.answerCollection.updateOne(
			{
				id: simpleEntity.id,
			},
			{
				$set: simpleEntity,
			},
			{ upsert: true },
		);

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
	async getTotalCountOfUnprocessedAnswers() {
		const mongoResult = await mongo.answerCollection.countDocuments({
			status: "unprocessed",
		});

		return intObjecter.unsafeCreate(mongoResult);
	},
	async findOldestUnprocessedAnswer() {
		const unprocessedOldestMongoAnswer = await mongo.answerCollection.findOne(
			{
				status: "unprocessed",
			},
			{
				sort: {
					createdAt: 1,
				},
			},
		);

		if (!unprocessedOldestMongoAnswer) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			AnswerEntity,
			{
				...unprocessedOldestMongoAnswer,
			},
		);
	},
	async findOneById(id) {
		const mongoAnswer = await mongo.answerCollection.findOne({
			id: id.value,
		});

		if (!mongoAnswer) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			AnswerEntity,
			{
				...mongoAnswer,
			},
		);
	},
};

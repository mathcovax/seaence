import { AnswerPort } from "@applications/ports/answer";
import { C, E, forward, forwardAsserts, innerPipe, pipe, toNative, unwrap } from "@duplojs/utils";
import { Answer } from "@domains/entities/answer";
import { asyncMessage } from "../../providers/asyncMessage";
import { mongo } from "../../providers/mongo";
import { uuidv7 } from "uuidv7";

export const answerPort = AnswerPort.createImplementation({
	generateId() {
		return C.appendEvidence(
			Answer.Id.createOrThrow(uuidv7()),
			"generated",
		);
	},
	async save(entity) {
		const answer = C.unwrapEntity(entity, { transformer: toNative });

		if (answer.authorName !== null) {
			const existingAnswer = await mongo.answerCollection.findOne({
				id: answer.id,
			});

			if (!existingAnswer) {
				await asyncMessage.collections.createAnswer.emit({
					id: answer.id,
					postId: answer.postId,
					content: answer.content,
					authorId: answer.authorId,
					authorName: answer.authorName,
					createdAt: answer.createdAt,
				});
			}
		}

		await mongo.answerCollection.updateOne(
			{
				id: answer.id,
			},
			{
				$set: {
					id: answer.id,
					postId: answer.postId,
					content: answer.content,
					authorId: answer.authorId,
					authorName: answer.authorName,
					createdAt: answer.createdAt,
					status: answer.status,
				},
			},
			{ upsert: true },
		);

		return entity;
	},
	async findOneById(id) {
		const answer = await mongo.answerCollection.findOne({
			id: unwrap(id),
		});

		if (!answer) {
			return C.none("Answer");
		}

		return C.some(Answer.Entity.mapOrThrow(answer));
	},
	async findOldestUnprocessed() {
		const answer = await mongo.answerCollection.findOne(
			{
				status: "unprocessed",
			},
			{
				sort: {
					createdAt: 1,
				},
			},
		);

		if (!answer) {
			return C.appendEvidence(C.none("Answer"), "oldest-unprocessed");
		}

		return pipe(
			answer,
			Answer.Entity.mapOrThrow(
				innerPipe(
					Answer.computeStatus,
					E.whenHasInformationOtherwise(
						"answer.unprocessed",
						E.success,
						(result) => E.left("answer.wrongStatus", result),
					),
				),
			),
			C.some,
			C.appendEvidence("oldest-unprocessed"),
		);
	},
	async findManyAvailableByAvailablePost(params) {
		const postId = unwrap(params.post.id);
		const page = unwrap(params.page);
		const quantityPerPage = unwrap(params.quantityPerPage);

		return mongo.answerCollection
			.find({ postId })
			.sort({ createdAt: -1 })
			.skip(page * quantityPerPage)
			.limit(quantityPerPage)
			.map(
				Answer.Entity.mapOrThrow(
					innerPipe(
						Answer.computeStatus,
						E.whenHasInformationOtherwise(
							["answer.unprocessed", "answer.compliant"],
							E.success,
							(result) => E.left("answer.wrongStatus", result),
						),
					),
				),
			)
			.toArray()
			.then(C.appendEvidence("many-available"));
	},
	async getTotalCountOfUnprocessed() {
		const count = await mongo.answerCollection.countDocuments({
			status: "unprocessed",
		});

		return C.PositiveInt.createOrThrow(count);
	},
});

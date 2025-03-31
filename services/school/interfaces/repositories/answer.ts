import { answerRepository } from "@business/applications/repositories/answer";
import { answerContentObjecter, AnswerEntity, answerIdObjecter } from "@business/domains/entities/answer";
import { postIdObjecter } from "@business/domains/entities/post";
import { userIdObjecter } from "@business/domains/entities/user";
import { mongo } from "@interfaces/providers/mongo";
import { uuidv7 } from "uuidv7";

answerRepository.default = {
	generateAnswerId() {
		return answerIdObjecter.unsafeCreate(uuidv7());
	},
	async findByPostId(postId) {
		const mongoAnswers = mongo.answerCollection.find(
			{ postId: postId.value },
		);

		return mongoAnswers.map(
			(mongoAnswer) => AnswerEntity.create({
				answerId: answerIdObjecter.unsafeCreate(mongoAnswer.answerId),
				postId: postIdObjecter.unsafeCreate(mongoAnswer.postId),
				content: answerContentObjecter.unsafeCreate(mongoAnswer.content),
				responderId: userIdObjecter.unsafeCreate(mongoAnswer.responderId),
			}),
		).toArray();
	},
	async save(answer) {
		await mongo.answerCollection.insertOne({
			answerId: answer.answerId.value,
			postId: answer.postId.value,
			content: answer.content.value,
			responderId: answer.responderId.value,
		});
		return answer;
	},
};

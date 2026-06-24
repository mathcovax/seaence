import { uuidv7 } from "uuidv7";
import { faker } from "@vendors/fixture";
import { EntityHandler, type ToSimpleObject } from "@vendors/clean";
import { AnswerEntity } from "@business/domains/entities/answer";
import { answerRepository } from "@business/applications/repositories/answer";
import { answerRules } from "@vendors/entity-rules";

const start = 0;

export async function makeAnswer(
	answer?: Partial<Omit<ToSimpleObject<AnswerEntity>, "id">>,
) {
	return answerRepository.use.save(
		EntityHandler.unsafeMapper(
			AnswerEntity,
			{
				id: uuidv7(),
				postId: answer?.postId || uuidv7(),
				content: answer?.content || faker.lorem.paragraphs({
					min: 2,
					max: 4,
				}).slice(start, answerRules.content.maxLength),
				authorId: answer?.authorId || uuidv7(),
				authorName: answer?.authorName || faker.internet.displayName(),
				status: answer?.status || "unprocessed",
				createdAt: answer?.createdAt || faker.date.past({
					years: 1,
					refDate: new Date(),
				}),
			},
		),
	);
}

import { uuidv7 } from "uuidv7";
import { faker } from "@vendors/fixture";
import { EntityHandler, type ToSimpleObject } from "@vendors/clean";
import { AnswerEntity } from "@business/domains/entities/answer";
import { answerRepository } from "@business/applications/repositories/answer";
import { UserEntity } from "@business/domains/entities/user";

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
				}),
				author: EntityHandler.unsafeMapper(
					UserEntity,
					{
						id: answer?.author?.id || uuidv7(),
						username: answer?.author?.username || faker.internet.displayName(),
					},
				),
				createdAt: answer?.createdAt || faker.date.past({
					years: 1,
					refDate: new Date(),
				}),
			},
		),
	);
}

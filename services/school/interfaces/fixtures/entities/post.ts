import { uuidv7 } from "uuidv7";
import { faker } from "@vendors/fixture";
import { EntityHandler, type ToSimpleObject } from "@vendors/clean";
import { PostEntity } from "@business/domains/entities/post";
import { postRepository } from "@business/applications/repositories/post";
import { UserEntity } from "@business/domains/entities/user";

const answerDefaultCount = 0;

export async function makePost(
	post?: Partial<Omit<ToSimpleObject<PostEntity>, "id">>,
) {
	return postRepository.use.save(
		EntityHandler.unsafeMapper(
			PostEntity,
			{
				id: uuidv7(),
				nodeSameRawDocumentId: post?.nodeSameRawDocumentId || uuidv7(),
				topic: post?.topic || faker.lorem.sentence({
					min: 3,
					max: 6,
				}),
				content: post?.content || faker.lorem.paragraphs({
					min: 2,
					max: 4,
				}),
				answerCount: post?.answerCount || answerDefaultCount,
				author: EntityHandler.unsafeMapper(
					UserEntity,
					{
						id: post?.author?.id || uuidv7(),
						username: post?.author?.username || faker.internet.displayName(),
					},
				),
				createdAt: post?.createdAt || faker.date.past({
					years: 1,
					refDate: new Date(),
				}),
			},
		),
	);
}

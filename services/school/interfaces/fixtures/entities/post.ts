import { uuidv7 } from "uuidv7";
import { faker } from "@vendors/fixture";
import { EntityHandler, type ToSimpleObject } from "@vendors/clean";
import { PostEntity } from "@business/domains/entities/post";
import { postRepository } from "@business/applications/repositories/post";

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
				authorId: post?.authorId || uuidv7(),
				authorName: post?.authorName || faker.internet.displayName(),
				status: post?.status || "unprocessed",
				createdAt: post?.createdAt || faker.date.past({
					years: 1,
					refDate: new Date(),
				}),
			},
		),
	);
}
